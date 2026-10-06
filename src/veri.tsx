// Uygulama verisi: yükleme, ekranlara dağıtma ve her değişiklikte depolamaya yazma.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { depolama } from './depolama';
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

  useEffect(() => {
    veriYukle().then((v) => {
      son.current = v;
      setVeri(v);
    });
  }, []);

  /** Borç verisini günceller ve yazar. */
  const uygula = useCallback((yeni: islem.VeriDurumu) => {
    const onceki = son.current!;
    const v: Veri = { ...onceki, ...yeni };
    son.current = v;
    setVeri(v);
    if (yeni.kaza !== onceki.kaza) depolama.kazaYaz(yeni.kaza);
    if (yeni.gunluk !== onceki.gunluk) depolama.gunlukYaz(yeni.gunluk);
    if (yeni.islemler !== onceki.islemler) depolama.islemleriYaz(yeni.islemler);
  }, []);

  const kurulumTamamla = useCallback(async (k: { ayarlar: Ayarlar; kaza: KazaDurumu }) => {
    // Önce borç, sonra kurulumTamam içeren ayarlar: yarıda kesilirse kurulum yeniden açılır.
    await depolama.kazaYaz(k.kaza);
    await depolama.ayarlariYaz(k.ayarlar);
    const v: Veri = { ...son.current!, ayarlar: k.ayarlar, kaza: k.kaza };
    son.current = v;
    setVeri(v);
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

  const deger = useMemo(
    () => (veri ? { veri, kurulumTamamla, kazaKil, vakitCevapla, geriAl } : null),
    [veri, kurulumTamamla, kazaKil, vakitCevapla, geriAl],
  );

  return <VeriBaglami.Provider value={deger}>{children(deger !== null)}</VeriBaglami.Provider>;
}
