import { HADISLER, type Hadis } from '../../data/hadisler';
import { gunNumarasi, saatlikHadis, simdikiVakit, vakitHadisi } from '../hadis';
import type { GununVakitleri } from '../vakitler';

const gun = (g: number): GununVakitleri => {
  const s = (sa: number, dk = 0) => new Date(2026, 9, g, sa, dk);
  return { imsak: s(5), gunes: s(6, 30), ogle: s(13), ikindi: s(16), aksam: s(18, 30), yatsi: s(20) };
};

describe('hadis verisi', () => {
  it('her hadisin metni ve kaynağı var, editör notu kalmamış', () => {
    expect(HADISLER.length).toBeGreaterThanOrEqual(30);
    for (const h of HADISLER) {
      expect(h.metin.length).toBeGreaterThan(40);
      expect(h.kaynak).toMatch(/^Buhârî, \d+$/);
      expect(h.metin).not.toMatch(/Tekrar[ı]?\s*:|Diğer tahric/);
    }
  });
  it('kaynaklar tekrarsız', () => {
    expect(new Set(HADISLER.map((h) => h.kaynak)).size).toBe(HADISLER.length);
  });
  it('her vakit için en az bir özel hadis var', () => {
    for (const v of ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi'] as const) {
      expect(HADISLER.some((h) => h.vakitler.includes(v))).toBe(true);
    }
  });
});

describe('gunNumarasi', () => {
  it('ardışık günler birer artar, gün içinde değişmez', () => {
    const a = gunNumarasi(new Date(2026, 9, 6, 0, 5));
    expect(gunNumarasi(new Date(2026, 9, 6, 23, 55))).toBe(a);
    expect(gunNumarasi(new Date(2026, 9, 7, 0, 5))).toBe(a + 1);
  });
});

describe('saatlikHadis', () => {
  it('aynı saat içinde aynı, sonraki saatte farklı', () => {
    const h = saatlikHadis(new Date(2026, 9, 6, 10, 1));
    expect(saatlikHadis(new Date(2026, 9, 6, 10, 59))).toBe(h);
    expect(saatlikHadis(new Date(2026, 9, 6, 11, 0))).not.toBe(h);
  });
  it('liste bitmeden tekrar etmez', () => {
    const goruldu = new Set<Hadis>();
    for (let i = 0; i < HADISLER.length; i++) goruldu.add(saatlikHadis(new Date(2026, 9, 6, i)));
    expect(goruldu.size).toBe(HADISLER.length);
  });
});

describe('vakitHadisi', () => {
  it('vakte uygun hadis seçer', () => {
    for (let g = 1; g < 20; g++) {
      const h = vakitHadisi('aksam', new Date(2026, 9, g, 18, 30));
      expect(h.vakitler.length === 0 || h.vakitler.includes('aksam')).toBe(true);
    }
  });
  it('aynı vakit içinde aynı, ertesi gün farklı', () => {
    const h = vakitHadisi('ogle', new Date(2026, 9, 6, 13, 0));
    expect(vakitHadisi('ogle', new Date(2026, 9, 6, 13, 0))).toBe(h);
    expect(vakitHadisi('ogle', new Date(2026, 9, 7, 13, 1))).not.toBe(h);
  });
  it('aynı gün farklı vakitlerde farklı', () => {
    const z = new Date(2026, 9, 6, 12);
    expect(vakitHadisi('ogle', z)).not.toBe(vakitHadisi('ikindi', z));
  });
});

describe('simdikiVakit', () => {
  const bugun = gun(6);
  const dun = gun(5);
  it.each([
    [new Date(2026, 9, 6, 3), 'yatsi', dun.yatsi],
    [new Date(2026, 9, 6, 5, 10), 'sabah', bugun.imsak],
    [new Date(2026, 9, 6, 9), 'sabah', bugun.imsak],
    [new Date(2026, 9, 6, 13), 'ogle', bugun.ogle],
    [new Date(2026, 9, 6, 17), 'ikindi', bugun.ikindi],
    [new Date(2026, 9, 6, 19), 'aksam', bugun.aksam],
    [new Date(2026, 9, 6, 23), 'yatsi', bugun.yatsi],
  ])('%p', (z, vakit, giris) => {
    expect(simdikiVakit(z, bugun, dun)).toEqual({ vakit, giris });
  });
});
