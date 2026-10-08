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

export interface IlceSonucu<T> {
  il: string;
  ilce: T;
}

/**
 * İlçe adında arama (tüm illerde). Önce adı arananla başlayanlar, sonra içinde geçenler.
 * "Merkez" ilçeleri yalnızca il adıyla aranınca bulunur.
 */
export function ilceAra<T extends { ad: string }>(
  ilceler: Record<string, readonly T[]>,
  aranan: string,
  sinir = 50,
): IlceSonucu<T>[] {
  const a = sadelestir(aranan);
  if (!a) return [];
  const basta: IlceSonucu<T>[] = [];
  const icinde: IlceSonucu<T>[] = [];
  for (const [il, liste] of Object.entries(ilceler)) {
    for (const ilce of liste) {
      if (ilce.ad === 'Merkez') continue;
      const s = sadelestir(ilce.ad);
      if (s.startsWith(a)) basta.push({ il, ilce });
      else if (s.includes(a)) icinde.push({ il, ilce });
    }
  }
  return [...basta, ...icinde].slice(0, sinir);
}

/** Kaydedilen konum adı: "Fatsa, Ordu"; Merkez ilçe için "Ordu Merkez". */
export function ilceKonumAdi(il: string, ilce: string): string {
  return ilce === 'Merkez' ? `${il} Merkez` : `${ilce}, ${il}`;
}
