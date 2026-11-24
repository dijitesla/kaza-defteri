// Kur'an okuma (hatim) takibi. Sayfa numaraları Türkiye'de yaygın 604 sayfalık mushafa göredir:
// 1. cüz 1–21. sayfalar, sonraki her cüz 20 sayfa (2. cüz 22–41 ... 30. cüz 582–604).

export const MUSHAF_SAYFA = 604;
export const CUZ_SAYISI = 30;

export interface HatimDurumu {
  sayfa: number; // okunan son sayfa, 0 = bu hatime başlanmadı
  hatim: number; // tamamlanan hatim sayısı
  gunluk: Record<string, number>; // 'YYYY-MM-DD' → o gün okunan sayfa
}

export const bosHatim = (): HatimDurumu => ({ sayfa: 0, hatim: 0, gunluk: {} });

const tamSayi = (x: unknown, en: number, cok: number) =>
  typeof x === 'number' && Number.isFinite(x) ? Math.min(cok, Math.max(en, Math.floor(x))) : en;

export function hatmiTamamla(ham: unknown): HatimDurumu {
  const d = (ham ?? {}) as Partial<HatimDurumu>;
  const gunluk: Record<string, number> = {};
  if (d.gunluk && typeof d.gunluk === 'object' && !Array.isArray(d.gunluk)) {
    for (const [g, n] of Object.entries(d.gunluk)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(g) && typeof n === 'number' && n > 0) gunluk[g] = Math.floor(n);
    }
  }
  return { sayfa: tamSayi(d.sayfa, 0, MUSHAF_SAYFA - 1), hatim: tamSayi(d.hatim, 0, 10_000), gunluk };
}

/** Sayfanın bulunduğu cüz (1..30); 0. sayfa için 1. */
export function cuz(sayfa: number): number {
  if (sayfa <= 21) return 1;
  return Math.min(CUZ_SAYISI, Math.ceil((sayfa - 1) / 20));
}

/**
 * `n` sayfa okundu. Mushafın sonuna gelinirse hatim tamamlanır ve sayfa başa döner;
 * artan sayfalar yeni hatime sayılmaz. `tamamlandi` hatim bittiyse true.
 */
export function sayfaOku(d: HatimDurumu, n: number, gun: string): { durum: HatimDurumu; tamamlandi: boolean } {
  const adet = Math.max(0, Math.floor(n));
  if (!adet) return { durum: d, tamamlandi: false };
  const hedef = d.sayfa + adet;
  const tamamlandi = hedef >= MUSHAF_SAYFA;
  const okunan = tamamlandi ? MUSHAF_SAYFA - d.sayfa : adet;
  return {
    tamamlandi,
    durum: {
      sayfa: tamamlandi ? 0 : hedef,
      hatim: d.hatim + (tamamlandi ? 1 : 0),
      gunluk: { ...d.gunluk, [gun]: (d.gunluk[gun] ?? 0) + okunan },
    },
  };
}

/** Kaldığı sayfayı elle düzeltme; günlük sayaçları değiştirmez. */
export function sayfaAyarla(d: HatimDurumu, sayfa: number): HatimDurumu {
  return { ...d, sayfa: tamSayi(sayfa, 0, MUSHAF_SAYFA - 1) };
}

/** bas..son (dahil, 'YYYY-MM-DD') arasında okunan toplam sayfa. */
export function okunanSayfa(d: HatimDurumu, bas: string, son: string): number {
  return Object.entries(d.gunluk).reduce((t, [g, n]) => (g >= bas && g <= son ? t + n : t), 0);
}
