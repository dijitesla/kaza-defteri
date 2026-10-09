// Günlük kaza hedefi ve tahmini bitiş tarihi.

/** Ayarlar'da seçilebilen günlük hedefler; 0 = hedef yok. */
export const HEDEF_SECENEKLERI = [0, 1, 2, 3, 5, 10] as const;

/**
 * Her gün `hedef` kadar kaza kılınırsa son kazanın kılınacağı gün (bugün de sayılır).
 * Hedef yoksa ya da borç bittiyse null.
 */
export function bitisTarihi(kalan: number, hedef: number, bugun: Date): Date | null {
  if (hedef <= 0 || kalan <= 0) return null;
  const gun = Math.ceil(kalan / hedef);
  return new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate() + gun - 1);
}

/** Bugünkü ilerleme: kılınan, hedef ve hedefe ulaşıldı mı. */
export function hedefIlerlemesi(bugunKilinan: number, hedef: number): { kilinan: number; hedef: number; tamam: boolean } {
  return { kilinan: bugunKilinan, hedef, tamam: hedef > 0 && bugunKilinan >= hedef };
}
