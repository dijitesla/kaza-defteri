// Vakit serisi ve rozetler. Hepsi mevcut veriden hesaplanır, ayrıca saklanmaz.
import type { GunlukDurum, KazaDurumu } from '../types';
import { VAKITLER } from '../types';
import { ozet } from './islemler';
import { gunEkle } from './tarih';

/** Beş vaktin hepsi "kılındı" olarak işaretlenmiş gün. */
export function tamGun(gunluk: GunlukDurum, gun: string): boolean {
  const g = gunluk[gun];
  return !!g && VAKITLER.every((v) => g[v] === 'kilindi');
}

/**
 * Süren seri: dünden geriye art arda tam günler; bugün tamamlandıysa o da sayılır.
 * Bugün henüz bitmediği için tamamlanmamış olması seriyi bozmaz.
 */
export function vakitSerisi(gunluk: GunlukDurum, bugun: string): number {
  let n = 0;
  let g = tamGun(gunluk, bugun) ? bugun : gunEkle(bugun, -1);
  while (tamGun(gunluk, g)) {
    n++;
    g = gunEkle(g, -1);
  }
  return n;
}

/** Kayıtlardaki en uzun seri. */
export function enUzunSeri(gunluk: GunlukDurum): number {
  const tamlar = Object.keys(gunluk)
    .filter((g) => tamGun(gunluk, g))
    .sort();
  let enUzun = 0;
  let suren = 0;
  let onceki: string | null = null;
  for (const g of tamlar) {
    suren = onceki && gunEkle(onceki, 1) === g ? suren + 1 : 1;
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
