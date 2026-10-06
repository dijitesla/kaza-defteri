// Türkçe karakterlere duyarsız il araması: "sanliurfa", "Şanlıurfa" ve "ŞANLIURFA" aynı ili bulur.

const DONUSUM: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
  â: 'a',
  î: 'i',
  û: 'u',
};

export function sadelestir(metin: string): string {
  return metin
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLowerCase()
    .replace(/[çğıöşüâîû]/g, (h) => DONUSUM[h])
    .trim();
}

/** Önce adı arananla başlayanlar, sonra adın içinde geçenler; kendi sıraları korunur. */
export function ilAra<T extends { ad: string }>(iller: readonly T[], aranan: string): T[] {
  const a = sadelestir(aranan);
  if (!a) return [...iller];
  const basta: T[] = [];
  const icinde: T[] = [];
  for (const il of iller) {
    const s = sadelestir(il.ad);
    if (s.startsWith(a)) basta.push(il);
    else if (s.includes(a)) icinde.push(il);
  }
  return [...basta, ...icinde];
}
