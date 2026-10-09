// Vakit serisi ve rozetler. Hepsi mevcut veriden hesaplanır, ayrıca saklanmaz.
import type { GunlukDurum, KazaDurumu } from '../types';
import { VAKITLER } from '../types';
import { ozet } from './islemler';
import { gunEkle } from './tarih';

/** Beş vaktin hepsi "kılındı" olarak işaretlenmiş gün. */
export function tamGun(gunluk: GunlukDurum, gun: string): boolean {
  return gunTuru(gunluk, gun) === 'tam';
}

/**
 * Seri açısından gün: tam (beşi de kılındı), muaf (kılındı ya da özel hal; en az biri özel hal)
 * ya da bozuk. Muaf gün seriyi bozmaz ama seriye sayılmaz.
 */
export function gunTuru(gunluk: GunlukDurum, gun: string): 'tam' | 'muaf' | 'bozuk' {
  const g = gunluk[gun];
  if (!g) return 'bozuk';
  let muaf = false;
  for (const v of VAKITLER) {
    if (g[v] === 'muaf') muaf = true;
    else if (g[v] !== 'kilindi') return 'bozuk';
  }
  return muaf ? 'muaf' : 'tam';
}

/**
 * Süren seri: dünden geriye art arda tam günler (özel hal günleri atlanır); bugün tamamlandıysa
 * o da sayılır. Bugün henüz bitmediği için tamamlanmamış olması seriyi bozmaz.
 */
export function vakitSerisi(gunluk: GunlukDurum, bugun: string): number {
  let n = 0;
  let g = gunTuru(gunluk, bugun) === 'bozuk' ? gunEkle(bugun, -1) : bugun;
  for (let tur = gunTuru(gunluk, g); tur !== 'bozuk'; tur = gunTuru(gunluk, g)) {
    if (tur === 'tam') n++;
    g = gunEkle(g, -1);
  }
  return n;
}

/** Kayıtlardaki en uzun seri (özel hal günleri seriyi bozmaz). */
export function enUzunSeri(gunluk: GunlukDurum): number {
  const gunler = Object.keys(gunluk)
    .filter((g) => gunTuru(gunluk, g) !== 'bozuk')
    .sort();
  let enUzun = 0;
  let suren = 0;
  let onceki: string | null = null;
  for (const g of gunler) {
    if (!(onceki && gunEkle(onceki, 1) === g)) suren = 0;
    if (gunTuru(gunluk, g) === 'tam') suren++;
    enUzun = Math.max(enUzun, suren);
    onceki = g;
  }
  return enUzun;
}

export type RozetTuru = 'ilkKaza' | 'kaza' | 'seri' | 'borcBitti';

export interface Rozet {
  id: string;
  tur: RozetTuru;
  esik: number;
  kazanildi: boolean;
}

export const KAZA_ESIKLERI = [10, 50, 100, 500, 1000, 5000] as const;
export const SERI_ESIKLERI = [3, 7, 30, 40] as const;

/** Tüm rozetler, kazanılmış olsun olmasın, sabit sırayla. */
export function rozetler(kaza: KazaDurumu, gunluk: GunlukDurum): Rozet[] {
  const o = ozet(kaza);
  const seri = enUzunSeri(gunluk);
  return [
    { id: 'ilkKaza', tur: 'ilkKaza', esik: 1, kazanildi: o.kilinan >= 1 },
    ...KAZA_ESIKLERI.map((esik) => ({ id: `kaza${esik}`, tur: 'kaza' as const, esik, kazanildi: o.kilinan >= esik })),
    ...SERI_ESIKLERI.map((esik) => ({ id: `seri${esik}`, tur: 'seri' as const, esik, kazanildi: seri >= esik })),
    { id: 'borcBitti', tur: 'borcBitti', esik: 0, kazanildi: o.ilkBorc > 0 && o.kalan === 0 },
  ];
}
