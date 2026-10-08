// Zikirmatik sayacı.

export type ZikirHedefi = 33 | 99 | 0; // 0 = serbest (hedefsiz)

export interface ZikirDurumu {
  sayi: number; // bu turdaki sayı
  hedef: ZikirHedefi;
  tur: number; // tamamlanan tur sayısı
}

export const ZIKIR_HEDEFLERI: readonly ZikirHedefi[] = [33, 99, 0];

export function bosZikir(): ZikirDurumu {
  return { sayi: 0, hedef: 33, tur: 0 };
}

/** Bir sayım. Hedefe ulaşınca tur tamamlanır ve sayı sıfırdan başlar. */
export function zikirArttir(d: ZikirDurumu): { durum: ZikirDurumu; turTamam: boolean } {
  const sayi = d.sayi + 1;
  if (d.hedef > 0 && sayi >= d.hedef) {
    return { durum: { ...d, sayi: 0, tur: d.tur + 1 }, turTamam: true };
  }
  return { durum: { ...d, sayi }, turTamam: false };
}

export function zikirSifirla(d: ZikirDurumu): ZikirDurumu {
  return { ...d, sayi: 0, tur: 0 };
}

/** Hedef değişince sayaç sıfırlanır. */
export function zikirHedefi(d: ZikirDurumu, hedef: ZikirHedefi): ZikirDurumu {
  return hedef === d.hedef ? d : { sayi: 0, tur: 0, hedef };
}

/** Kayıttan okunan veriyi doğrular; geçersizse boş sayaç. */
export function zikriTamamla(x: unknown): ZikirDurumu {
  const v = (typeof x === 'object' && x !== null ? x : {}) as Partial<ZikirDurumu>;
  const tamsayi = (n: unknown) => (typeof n === 'number' && Number.isInteger(n) && n >= 0 ? n : 0);
  const hedef = ZIKIR_HEDEFLERI.includes(v.hedef as ZikirHedefi) ? (v.hedef as ZikirHedefi) : 33;
  return { sayi: tamsayi(v.sayi), tur: tamsayi(v.tur), hedef };
}
