// Kıble yönü: konumdan Kâbe'ye büyük daire başlangıç açısı (kuzeyden saat yönünde).

export const KABE = { enlem: 21.422487, boylam: 39.826206 } as const;

const rad = (d: number) => (d * Math.PI) / 180;
const der = (r: number) => (r * 180) / Math.PI;
const normal = (d: number) => ((d % 360) + 360) % 360;

/** Kıble açısı (0–360°, gerçek kuzeyden saat yönünde). */
export function kibleAcisi(enlem: number, boylam: number): number {
  const f1 = rad(enlem);
  const f2 = rad(KABE.enlem);
  const dl = rad(KABE.boylam - boylam);
  const y = Math.sin(dl) * Math.cos(f2);
  const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
  return normal(der(Math.atan2(y, x)));
}

/**
 * Telefonun baktığı yöne göre kıblenin ekrandaki açısı (-180..180°).
 * 0: tam karşıda, pozitif: sağda, negatif: solda.
 */
export function kibleFarki(yon: number, kible: number): number {
  const f = normal(kible - yon);
  return f > 180 ? f - 360 : f;
}

/** Kıble yönüne yeterince yakın mı (varsayılan ±5°). */
export function kibleyeDonuk(fark: number, tolerans = 5): boolean {
  return Math.abs(fark) <= tolerans;
}
