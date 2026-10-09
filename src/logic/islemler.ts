// Borcu değiştiren işlemler, geri alma ve işlem geçmişi. Kaynak: docs/SPEC.md, Bölüm 2.5, 2.6, 3.
import { t, VAKIT_ADLARI } from '../metinler';
import type { Ayarlar, GunlukDurum, Islem, KazaAyarlari, KazaDurumu, KazaVakit, Vakit } from '../types';
import { KAZA_VAKITLERI } from '../types';
import { islemleriKirp } from './depolama';
import { kazaHesapla, vakitBorclari, type HesapGirdisi } from './kazaHesap';
import { gunAnahtari } from './tarih';

export interface VeriDurumu {
  ayarlar: Ayarlar;
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
 * Günün vaktine cevap. "Kıldım" ve "Özel hal" borcu değiştirmez, yalnızca günlük durumu yazar
 * (kayıt defterine girmez).
 * "Kılamadım" kalana ekler, günlük durumu yazar ve işlem kaydı oluşturur.
 */
export function vakitCevapla(
  d: VeriDurumu,
  gun: string,
  vakit: Vakit,
  cevap: 'kilindi' | 'kilinamadi' | 'muaf',
  simdi: Date,
  id: string,
): VeriDurumu {
  const gunluk: GunlukDurum = { ...d.gunluk, [gun]: { ...d.gunluk[gun], [vakit]: cevap } };
  if (cevap !== 'kilinamadi') return { ...d, gunluk };

  const degisim: Partial<Record<KazaVakit, number>> = {};
  for (const v of kilinamadiEklenecekler(vakit)) degisim[v] = (degisim[v] ?? 0) + 1;
  return {
    ayarlar: d.ayarlar,
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

  // Oruç işlemi: oruç kalanı ve (düzeltmede) başlangıç borcu geri döner.
  let oruc = d.kaza.oruc;
  let orucUygulanan: number | undefined;
  let orucIlkUygulanan: number | undefined;
  if (hedef.oruc || hedef.orucIlk) {
    const kalanOruc = Math.max(0, oruc.kalan - (hedef.oruc ?? 0));
    const ilkOruc = Math.max(0, oruc.ilkBorc - (hedef.orucIlk ?? 0));
    orucUygulanan = kalanOruc - oruc.kalan;
    orucIlkUygulanan = ilkOruc - oruc.ilkBorc;
    oruc = { ilkBorc: ilkOruc, kalan: kalanOruc };
  }

  // Yeniden hesap geri alınınca başlangıç borcu ve kaza ayarları da eski haline döner.
  let ayarlar = d.ayarlar;
  let ilkBorc = d.kaza.ilkBorc;
  if (hedef.tur === 'yeniden_hesap' && hedef.onceki) {
    const { ilkBorc: oncekiIlk, ...oncekiAyar } = hedef.onceki;
    ilkBorc = { ...oncekiIlk };
    ayarlar = { ...ayarlar, ...oncekiAyar };
  }

  return {
    ayarlar,
    kaza: { ilkBorc, kalan, oruc },
    gunluk,
    islemler: islemEkle(d.islemler, {
      id,
      zaman: simdi.toISOString(),
      tur: 'geri_alindi',
      vakit: hedef.vakit,
      degisim: uygulanan,
      geriAlinanId: hedef.id,
      ...(orucUygulanan !== undefined ? { oruc: orucUygulanan, orucIlk: orucIlkUygulanan } : {}),
    }),
  };
}

function farklar(
  once: Record<KazaVakit, number>,
  sonra: Record<KazaVakit, number>,
): Partial<Record<KazaVakit, number>> {
  const d: Partial<Record<KazaVakit, number>> = {};
  for (const v of KAZA_VAKITLERI) if (sonra[v] !== once[v]) d[v] = sonra[v] - once[v];
  return d;
}

/**
 * Başlangıç bilgileri değişti (SPEC 4.3): yeni ilk borç hesaplanır, kılınan kaza sayısı korunur.
 * yeniKalan = max(0, yeniIlkBorc - (eskiIlkBorc - eskiKalan)). Geri alınabilsin diye önceki
 * değerler işleme yazılır.
 */
export function yenidenHesapla(
  d: VeriDurumu,
  girdi: HesapGirdisi,
  simdi: Date,
  id: string,
): VeriDurumu | null {
  const yeniIlk = vakitBorclari(kazaHesapla(girdi, simdi));
  const yeniKalan = { ...d.kaza.kalan };
  for (const v of KAZA_VAKITLERI) {
    yeniKalan[v] = Math.max(0, yeniIlk[v] - (d.kaza.ilkBorc[v] - d.kaza.kalan[v]));
  }
  const onceki: Islem['onceki'] = {
    ilkBorc: { ...d.kaza.ilkBorc },
    mezhep: d.ayarlar.mezhep,
    ozelGun: d.ayarlar.ozelGun,
    baslangic: d.ayarlar.baslangic,
  };
  const yeniAyar: KazaAyarlari = {
    mezhep: girdi.mezhep,
    ozelGun: girdi.ozelGun,
    baslangic: { yukumlulukAy: girdi.yukumlulukAy, duzenliAy: girdi.duzenliAy },
  };
  const ayniAyar =
    JSON.stringify(yeniAyar) ===
    JSON.stringify({ mezhep: d.ayarlar.mezhep, ozelGun: d.ayarlar.ozelGun, baslangic: d.ayarlar.baslangic });
  const ayniBorc = KAZA_VAKITLERI.every((v) => yeniIlk[v] === d.kaza.ilkBorc[v]);
  if (ayniAyar && ayniBorc) return null; // değişiklik yok, kayıt yazılmaz
  return {
    ...d,
    ayarlar: { ...d.ayarlar, ...yeniAyar },
    kaza: { ...d.kaza, ilkBorc: yeniIlk, kalan: yeniKalan },
    islemler: islemEkle(d.islemler, {
      id,
      zaman: simdi.toISOString(),
      tur: 'yeniden_hesap',
      degisim: farklar(d.kaza.kalan, yeniKalan),
      onceki,
    }),
  };
}

/** Kalan sayıların elle düzeltilmesi. Değişiklik yoksa ya da geçersiz sayı varsa null. */
export function kazaDuzelt(
  d: VeriDurumu,
  yeniKalan: Record<KazaVakit, number>,
  simdi: Date,
  id: string,
): VeriDurumu | null {
  if (KAZA_VAKITLERI.some((v) => !Number.isInteger(yeniKalan[v]) || yeniKalan[v] < 0)) return null;
  const degisim = farklar(d.kaza.kalan, yeniKalan);
  if (Object.keys(degisim).length === 0) return null;
  return {
    ...d,
    kaza: { ...d.kaza, kalan: { ...yeniKalan } },
    islemler: islemEkle(d.islemler, { id, zaman: simdi.toISOString(), tur: 'manuel_duzeltme', degisim }),
  };
}

/** Bir gün kaza orucu tutuldu: oruç kalanı 1 azalır. Kalan 0 ise null. */
export function orucTut(d: VeriDurumu, simdi: Date, id: string): VeriDurumu | null {
  if (d.kaza.oruc.kalan <= 0) return null;
  return {
    ...d,
    kaza: { ...d.kaza, oruc: { ...d.kaza.oruc, kalan: d.kaza.oruc.kalan - 1 } },
    islemler: islemEkle(d.islemler, { id, zaman: simdi.toISOString(), tur: 'oruc_tutuldu', degisim: {}, oruc: -1 }),
  };
}

/**
 * Oruç borcunu kullanıcının girdiği sayıya ayarlar. Bu bir borç düzeltmesidir: başlangıç borcu da
 * aynı miktarda değişir, böylece tutulan oruç sayısı korunur. Geçersiz sayı ya da değişiklik yoksa null.
 */
export function orucDuzelt(d: VeriDurumu, yeniKalan: number, simdi: Date, id: string): VeriDurumu | null {
  if (!Number.isInteger(yeniKalan) || yeniKalan < 0) return null;
  const { ilkBorc, kalan } = d.kaza.oruc;
  const fark = yeniKalan - kalan;
  if (fark === 0) return null;
  const yeniIlk = Math.max(0, ilkBorc + fark);
  return {
    ...d,
    kaza: { ...d.kaza, oruc: { ilkBorc: yeniIlk, kalan: yeniKalan } },
    islemler: islemEkle(d.islemler, {
      id,
      zaman: simdi.toISOString(),
      tur: 'oruc_duzeltme',
      degisim: {},
      oruc: fark,
      orucIlk: yeniIlk - ilkBorc,
    }),
  };
}

/** Oruç özeti: tutulan = başlangıç borcu - kalan. */
export function orucOzeti(kaza: KazaDurumu): { ilkBorc: number; tutulan: number; kalan: number } {
  const { ilkBorc, kalan } = kaza.oruc;
  return { ilkBorc, tutulan: Math.max(0, ilkBorc - kalan), kalan };
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
    case 'oruc_tutuldu':
      return t('gecmis.orucTutuldu');
    case 'oruc_duzeltme':
      return t('gecmis.orucDuzeltme');
  }
}

/** Kalana toplam etki: "-1", "+1", "0". */
export function etkiMetni(islem: Islem): string {
  const n = KAZA_VAKITLERI.reduce((s, v) => s + (islem.degisim[v] ?? 0), 0) + (islem.oruc ?? 0);
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

/** Haftanın başı (Pazartesi 00:00, yerel). */
export function haftaBasi(d: Date): Date {
  const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  b.setDate(b.getDate() - ((b.getDay() + 6) % 7));
  return b;
}

export function ayBasi(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** [bas, son) aralığında kılınıp geri alınmamış kaza sayısı. */
export function donemdeKilinan(islemler: Islem[], bas: Date, son: Date): number {
  const geriAlinanlar = new Set(islemler.filter((i) => i.tur === 'geri_alindi').map((i) => i.geriAlinanId));
  let n = 0;
  for (const i of islemler) {
    if (i.tur !== 'kaza_kilindi' || geriAlinanlar.has(i.id)) continue;
    const z = Date.parse(i.zaman);
    if (z >= bas.getTime() && z < son.getTime()) n++;
  }
  return n;
}
