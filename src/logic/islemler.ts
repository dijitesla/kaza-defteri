// Borcu değiştiren işlemler, geri alma ve işlem geçmişi. Kaynak: docs/SPEC.md, Bölüm 2.5, 2.6, 3.
import { t, VAKIT_ADLARI } from '../metinler';
import type { GunlukDurum, Islem, KazaDurumu, KazaVakit, Vakit } from '../types';
import { KAZA_VAKITLERI } from '../types';
import { islemleriKirp } from './depolama';
import { gunAnahtari } from './tarih';

export interface VeriDurumu {
  kaza: KazaDurumu;
  gunluk: GunlukDurum;
  islemler: Islem[]; // eskiden yeniye
}

/**
 * "Kılamadım" denince kazaya eklenecek vakitler. İlk sürümde yalnızca seçilen vakit.
 * (Yatsı kılınamadıysa vitir de eklensin mi? İmam kontrolünden sonra burası değişebilir.)
 */
export function kilinamadiEklenecekler(vakit: Vakit): KazaVakit[] {
  return [vakit];
}

function islemEkle(islemler: Islem[], islem: Islem): Islem[] {
  return islemleriKirp([...islemler, islem]);
}

/** Kalanlara değişimi uygular; hiçbir vakit 0'ın altına düşmez. Gerçekte uygulanan değişimi döner. */
function kalanaUygula(
  kalan: Record<KazaVakit, number>,
  degisim: Partial<Record<KazaVakit, number>>,
): { kalan: Record<KazaVakit, number>; uygulanan: Partial<Record<KazaVakit, number>> } {
  const yeni = { ...kalan };
  const uygulanan: Partial<Record<KazaVakit, number>> = {};
  for (const v of KAZA_VAKITLERI) {
    const d = degisim[v];
    if (!d) continue;
    const sonra = Math.max(0, yeni[v] + d);
    if (sonra !== yeni[v]) uygulanan[v] = sonra - yeni[v];
    yeni[v] = sonra;
  }
  return { kalan: yeni, uygulanan };
}

/** Kaza kıl: o vaktin kalanı 1 azalır. Kalan 0 ise değişiklik yapılmaz (null). */
export function kazaKil(d: VeriDurumu, vakit: KazaVakit, simdi: Date, id: string): VeriDurumu | null {
  if (d.kaza.kalan[vakit] <= 0) return null;
  const degisim = { [vakit]: -1 };
  return {
    ...d,
    kaza: { ...d.kaza, kalan: kalanaUygula(d.kaza.kalan, degisim).kalan },
    islemler: islemEkle(d.islemler, { id, zaman: simdi.toISOString(), tur: 'kaza_kilindi', vakit, degisim }),
  };
}

/**
 * Günün vaktine cevap. "Kıldım" borcu değiştirmez, yalnızca günlük durumu yazar (kayıt defterine girmez).
 * "Kılamadım" kalana ekler, günlük durumu yazar ve işlem kaydı oluşturur.
 */
export function vakitCevapla(
  d: VeriDurumu,
  gun: string,
  vakit: Vakit,
  cevap: 'kilindi' | 'kilinamadi',
  simdi: Date,
  id: string,
): VeriDurumu {
  const gunluk: GunlukDurum = { ...d.gunluk, [gun]: { ...d.gunluk[gun], [vakit]: cevap } };
  if (cevap === 'kilindi') return { ...d, gunluk };

  const degisim: Partial<Record<KazaVakit, number>> = {};
  for (const v of kilinamadiEklenecekler(vakit)) degisim[v] = (degisim[v] ?? 0) + 1;
  return {
    kaza: { ...d.kaza, kalan: kalanaUygula(d.kaza.kalan, degisim).kalan },
    gunluk,
    islemler: islemEkle(d.islemler, {
      id,
      zaman: simdi.toISOString(),
      tur: 'kilinamadi',
      vakit,
      gun,
      degisim,
    }),
  };
}

/** Geri alınabilecek son işlem: geri_alindi olmayan ve daha önce geri alınmamış en yeni işlem. */
export function geriAlinabilir(islemler: Islem[]): Islem | null {
  const geriAlinanlar = new Set(islemler.filter((i) => i.tur === 'geri_alindi').map((i) => i.geriAlinanId));
  for (let i = islemler.length - 1; i >= 0; i--) {
    const islem = islemler[i];
    if (islem.tur !== 'geri_alindi' && !geriAlinanlar.has(islem.id)) return islem;
  }
  return null;
}

/**
 * Son geri alınmamış işlemi geri alır: değişimin tersini uygular, geri_alindi kaydı yazar,
 * günlük durumu da geri alır. `beklenenId` verilirse yalnızca o işlem sıradaysa geri alınır.
 */
export function geriAl(d: VeriDurumu, simdi: Date, id: string, beklenenId?: string): VeriDurumu | null {
  const hedef = geriAlinabilir(d.islemler);
  if (!hedef || (beklenenId && hedef.id !== beklenenId)) return null;

  const ters: Partial<Record<KazaVakit, number>> = {};
  for (const v of KAZA_VAKITLERI) if (hedef.degisim[v]) ters[v] = -hedef.degisim[v]!;
  const { kalan, uygulanan } = kalanaUygula(d.kaza.kalan, ters);

  let gunluk = d.gunluk;
  if (hedef.gun && hedef.vakit && hedef.vakit !== 'vitir') {
    const { [hedef.vakit]: _silinen, ...kalanVakitler } = gunluk[hedef.gun] ?? {};
    gunluk = { ...gunluk, [hedef.gun]: kalanVakitler };
  }

  return {
    kaza: { ...d.kaza, kalan },
    gunluk,
    islemler: islemEkle(d.islemler, {
      id,
      zaman: simdi.toISOString(),
      tur: 'geri_alindi',
      vakit: hedef.vakit,
      degisim: uygulanan,
      geriAlinanId: hedef.id,
    }),
  };
}

// --- Gösterim ---

export function toplam(r: Record<KazaVakit, number>): number {
  return KAZA_VAKITLERI.reduce((s, v) => s + r[v], 0);
}

/** Geçmiş özeti. Kılınan = başlangıç borcu - kalan (SPEC 4.3 ile aynı tanım), eksiye düşmez. */
export function ozet(kaza: KazaDurumu): { ilkBorc: number; kilinan: number; kalan: number } {
  const ilkBorc = toplam(kaza.ilkBorc);
  const kalan = toplam(kaza.kalan);
  return { ilkBorc, kilinan: Math.max(0, ilkBorc - kalan), kalan };
}

export function islemAciklamasi(islem: Islem, islemler: Islem[]): string {
  const Vakit = islem.vakit ? VAKIT_ADLARI[islem.vakit] : '';
  switch (islem.tur) {
    case 'kaza_kilindi':
      return t('gecmis.kazaKilindi', { Vakit });
    case 'kilinamadi':
      return t('gecmis.kilinamadi', { Vakit });
    case 'manuel_duzeltme':
      return t('gecmis.manuel');
    case 'yeniden_hesap':
      return t('gecmis.yenidenHesap');
    case 'geri_alindi': {
      const asil = islemler.find((i) => i.id === islem.geriAlinanId);
      return t('gecmis.geriAlindi', { aciklama: asil ? islemAciklamasi(asil, islemler) : '' });
    }
  }
}

/** Kalana toplam etki: "-1", "+1", "0". */
export function etkiMetni(islem: Islem): string {
  const n = KAZA_VAKITLERI.reduce((s, v) => s + (islem.degisim[v] ?? 0), 0);
  return n > 0 ? `+${n}` : String(n);
}

export interface IslemGunu {
  gun: string;
  islemler: Islem[]; // yeniden eskiye
}

/** En yeniden eskiye, güne göre gruplu. */
export function gunlereGore(islemler: Islem[]): IslemGunu[] {
  const gruplar: IslemGunu[] = [];
  for (let i = islemler.length - 1; i >= 0; i--) {
    const islem = islemler[i];
    const gun = gunAnahtari(new Date(islem.zaman));
    const son = gruplar[gruplar.length - 1];
    if (son && son.gun === gun) son.islemler.push(islem);
    else gruplar.push({ gun, islemler: [islem] });
  }
  return gruplar;
}
