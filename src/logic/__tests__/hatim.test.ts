import { bosHatim, cuz, hatmiTamamla, MUSHAF_SAYFA, okunanSayfa, sayfaAyarla, sayfaOku } from '../hatim';

it('cüz sınırları (604 sayfalık mushaf)', () => {
  expect([0, 1, 21, 22, 41, 42, 581, 582, 603, 604].map(cuz)).toEqual([1, 1, 1, 2, 2, 3, 29, 30, 30, 30]);
});

describe('sayfaOku', () => {
  it('sayfa ilerler ve günün sayacı artar', () => {
    const a = sayfaOku(bosHatim(), 5, '2026-11-24').durum;
    const b = sayfaOku(a, 3, '2026-11-24').durum;
    expect(b.sayfa).toBe(8);
    expect(b.gunluk['2026-11-24']).toBe(8);
  });
  it('son sayfada hatim tamamlanır, artan sayfa yeni hatime geçmez', () => {
    const d = { ...bosHatim(), sayfa: 600 };
    const r = sayfaOku(d, 10, '2026-11-24');
    expect(r.tamamlandi).toBe(true);
    expect(r.durum).toEqual({ sayfa: 0, hatim: 1, gunluk: { '2026-11-24': 4 } });
  });
  it('sıfır ya da eksi sayfa bir şey değiştirmez', () => {
    const d = bosHatim();
    expect(sayfaOku(d, 0, '2026-11-24').durum).toBe(d);
    expect(sayfaOku(d, -3, '2026-11-24').durum).toBe(d);
  });
});

it('sayfaAyarla sınırlar içinde tutar', () => {
  expect(sayfaAyarla(bosHatim(), 700).sayfa).toBe(MUSHAF_SAYFA - 1);
  expect(sayfaAyarla(bosHatim(), -2).sayfa).toBe(0);
});

it('okunanSayfa tarih aralığında toplar', () => {
  const d = { ...bosHatim(), gunluk: { '2026-11-20': 4, '2026-11-22': 6, '2026-11-25': 1 } };
  expect(okunanSayfa(d, '2026-11-21', '2026-11-24')).toBe(6);
});

it('hatmiTamamla bozuk veriyi düzeltir', () => {
  expect(hatmiTamamla(undefined)).toEqual(bosHatim());
  expect(hatmiTamamla({ sayfa: 900, hatim: -1, gunluk: { x: 3, '2026-11-24': 2, '2026-11-23': -1 } })).toEqual({
    sayfa: MUSHAF_SAYFA - 1,
    hatim: 0,
    gunluk: { '2026-11-24': 2 },
  });
});
