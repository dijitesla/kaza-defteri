// Uygulama verisi: yükleme, ekranlara dağıtma ve her değişiklikte depolamaya yazma.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { bildirimleriPlanla } from './bildirimler';
import { depolama } from './depolama';
import { bildirimCevabi } from './logic/bildirimPlani';
import type { HesapGirdisi } from './logic/kazaHesap';
import * as islem from './logic/islemler';
import type { Ayarlar, GunlukDurum, Islem, KazaDurumu, KazaVakit, Vakit } from './types';

export interface Veri {
  ayarlar: Ayarlar;
  kaza: KazaDurumu;
  gunluk: GunlukDurum;
  islemler: Islem[];
}

interface VeriIslemleri {
  veri: Veri;
  /** Kurulumun sonunda ayarları ve borcu kaydeder, uygulamayı sekmelere geçirir. */
  kurulumTamamla: (v: { ayarlar: Ayarlar; kaza: KazaDurumu }) => Promise<void>;
  /** Kaza kılındı. Kaydedilen işlemin kimliğini döner (geri al için); kalan 0 ise null. */
  kazaKil: (vakit: KazaVakit) => string | null;
  /** Günün vaktine cevap. "Kılamadım" ise oluşan işlemin kimliğini döner. */
  vakitCevapla: (gun: string, vakit: Vakit, cevap: 'kilindi' | 'kilinamadi') => string | null;
  /** Son işlemi geri alır; beklenenId verilirse yalnızca o işlem sıradaysa. */
  geriAl: (beklenenId?: string) => boolean;
  /** Bildirim düğmesi cevabını kaydeder (zaten cevaplanmış vakit için bir şey yapmaz). */
  bildirimCevabiIsle: (bildirimVerisi: unknown, eylem: string) => void;
  /** Bildirimleri iptal edip yeniden planlar. */
  bildirimleriYenile: () => void;
  /** Ayarları değiştirir, kaydeder ve bildirimleri yeniden planlar. */
  ayarlariGuncelle: (degistir: (a: Ayarlar) => Ayarlar) => void;
  /** Başlangıç bilgileri değişti: borç yeniden hesaplanır (kılınanlar korunur). */
  yenidenHesapla: (girdi: HesapGirdisi) => void;
  /** Kalan sayıları elle düzeltir. Değişiklik yoksa false. */
  kazaDuzelt: (yeniKalan: Record<KazaVakit, number>) => boolean;
  /** Yedekteki veriyi mevcut verinin yerine yazar. */
  yedektenYukle: (v: Veri) => Promise<void>;
}

const VeriBaglami = createContext<VeriIslemleri | null>(null);

export function useVeri(): VeriIslemleri {
  const v = useContext(VeriBaglami);
  if (!v) throw new Error('useVeri, VeriSaglayici içinde kullanılmalı');
  return v;
}

const yeniId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

async function veriYukle(): Promise<Veri> {
  const [ayarlar, kaza, gunluk, islemler] = await Promise.all([
    depolama.ayarlariOku(),
    depolama.kazaOku(),
    depolama.gunlukOku(),
    depolama.islemleriOku(),
  ]);
  // Aşama 2'de kurulan cihazlarda kurulum zamanı yok: bu andan itibaren sayılır.
  if (ayarlar.kurulumTamam && !ayarlar.kurulumZamani) {
    ayarlar.kurulumZamani = new Date().toISOString();
    await depolama.ayarlariYaz(ayarlar);
  }
  return { ayarlar, kaza, gunluk, islemler };
}

export function VeriSaglayici({ children }: { children: (hazir: boolean) => ReactNode }) {
  const [veri, setVeri] = useState<Veri | null>(null);
  const son = useRef<Veri | null>(null);

  const bildirimleriYenile = useCallback(() => {
    const v = son.current;
    if (v) bildirimleriPlanla(v.ayarlar, v.gunluk);
  }, []);

  useEffect(() => {
    veriYukle().then((v) => {
      son.current = v;
      setVeri(v);
      bildirimleriYenile(); // her açılışta (SPEC 6.3)
    });
    const abonelik = AppState.addEventListener('change', (durum) => {
      if (durum === 'active') bildirimleriYenile();
    });
    return () => abonelik.remove();
  }, [bildirimleriYenile]);

  /** Borç verisini günceller ve yazar. */
  const uygula = useCallback((yeni: islem.VeriDurumu) => {
    const onceki = son.current!;
    const v: Veri = { ...onceki, ...yeni };
    son.current = v;
    setVeri(v);
    if (yeni.ayarlar !== onceki.ayarlar) depolama.ayarlariYaz(yeni.ayarlar);
    if (yeni.kaza !== onceki.kaza) depolama.kazaYaz(yeni.kaza);
    if (yeni.gunluk !== onceki.gunluk) depolama.gunlukYaz(yeni.gunluk);
    if (yeni.islemler !== onceki.islemler) depolama.islemleriYaz(yeni.islemler);
    // Cevaplanan vaktin sorusu iptal olur; geri alınan cevabın sorusu yeniden planlanır.
    if (yeni.gunluk !== onceki.gunluk || yeni.ayarlar !== onceki.ayarlar) {
      bildirimleriPlanla(v.ayarlar, v.gunluk);
    }
  }, []);

  const kurulumTamamla = useCallback(async (k: { ayarlar: Ayarlar; kaza: KazaDurumu }) => {
    // Önce borç, sonra kurulumTamam içeren ayarlar: yarıda kesilirse kurulum yeniden açılır.
    await depolama.kazaYaz(k.kaza);
    await depolama.ayarlariYaz(k.ayarlar);
    const v: Veri = { ...son.current!, ayarlar: k.ayarlar, kaza: k.kaza };
    son.current = v;
    setVeri(v);
    bildirimleriPlanla(v.ayarlar, v.gunluk);
  }, []);

  const kazaKil = useCallback(
    (vakit: KazaVakit) => {
      const id = yeniId();
      const yeni = islem.kazaKil(son.current!, vakit, new Date(), id);
      if (!yeni) return null;
      uygula(yeni);
      return id;
    },
    [uygula],
  );

  const vakitCevapla = useCallback(
    (gun: string, vakit: Vakit, cevap: 'kilindi' | 'kilinamadi') => {
      const id = yeniId();
      uygula(islem.vakitCevapla(son.current!, gun, vakit, cevap, new Date(), id));
      return cevap === 'kilinamadi' ? id : null;
    },
    [uygula],
  );

  const geriAl = useCallback(
    (beklenenId?: string) => {
      const yeni = islem.geriAl(son.current!, new Date(), yeniId(), beklenenId);
      if (!yeni) return false;
      uygula(yeni);
      return true;
    },
    [uygula],
  );

  const bildirimCevabiIsle = useCallback(
    (bildirimVerisi: unknown, eylem: string) => {
      const v = son.current;
      if (!v) return;
      const c = bildirimCevabi(v.gunluk, bildirimVerisi, eylem);
      if (c) vakitCevapla(c.gun, c.vakit, c.cevap);
    },
    [vakitCevapla],
  );

  const ayarlariGuncelle = useCallback(
    (degistir: (a: Ayarlar) => Ayarlar) => uygula({ ...son.current!, ayarlar: degistir(son.current!.ayarlar) }),
    [uygula],
  );

  const yenidenHesapla = useCallback(
    (girdi: HesapGirdisi) => {
      const yeni = islem.yenidenHesapla(son.current!, girdi, new Date(), yeniId());
      if (yeni) uygula(yeni);
    },
    [uygula],
  );

  const kazaDuzelt = useCallback(
    (yeniKalan: Record<KazaVakit, number>) => {
      const yeni = islem.kazaDuzelt(son.current!, yeniKalan, new Date(), yeniId());
      if (!yeni) return false;
      uygula(yeni);
      return true;
    },
    [uygula],
  );

  const yedektenYukle = useCallback(async (v: Veri) => {
    await depolama.kazaYaz(v.kaza);
    await depolama.gunlukYaz(v.gunluk);
    await depolama.islemleriYaz(v.islemler);
    await depolama.ayarlariYaz(v.ayarlar);
    son.current = v;
    setVeri(v);
    bildirimleriPlanla(v.ayarlar, v.gunluk);
  }, []);

  const deger = useMemo(
    () =>
      veri
        ? {
            veri,
            kurulumTamamla,
            kazaKil,
            vakitCevapla,
            geriAl,
            bildirimCevabiIsle,
            bildirimleriYenile,
            ayarlariGuncelle,
            yenidenHesapla,
            kazaDuzelt,
            yedektenYukle,
          }
        : null,
    [
      veri,
      kurulumTamamla,
      kazaKil,
      vakitCevapla,
      geriAl,
      bildirimCevabiIsle,
      bildirimleriYenile,
      ayarlariGuncelle,
      yenidenHesapla,
      kazaDuzelt,
      yedektenYukle,
    ],
  );

  return <VeriBaglami.Provider value={deger}>{children(deger !== null)}</VeriBaglami.Provider>;
}
