// Teravih takibi: kılındı olarak işaretlenen Ramazan geceleri ('YYYY-MM-DD', gecenin ait olduğu gün).
// Kaza borcunu etkilemez; yalnızca kişinin kendi takibi içindir.

export type TeravihDurumu = string[];

const GUN = /^\d{4}-\d{2}-\d{2}$/;

/** Bozuk veriyi atar, tekrarları kaldırır, sıralar. */
export function teravihiTamamla(ham: unknown): TeravihDurumu {
  if (!Array.isArray(ham)) return [];
  return [...new Set(ham.filter((g): g is string => typeof g === 'string' && GUN.test(g)))].sort();
}

/** Günü işaretler ya da işareti kaldırır. */
export function teravihDegistir(liste: TeravihDurumu, gun: string): TeravihDurumu {
  return liste.includes(gun) ? liste.filter((g) => g !== gun) : [...liste, gun].sort();
}

/** bas..son (dahil) arasında kılınan gece sayısı. */
export function teravihSayisi(liste: TeravihDurumu, bas: string, son: string): number {
  return liste.filter((g) => g >= bas && g <= son).length;
}
