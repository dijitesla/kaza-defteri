import { KABE, kibleAcisi, kibleFarki, kibleyeDonuk } from '../kible';

describe('kibleAcisi', () => {
  it('İstanbul ≈ 151.6°', () => {
    expect(kibleAcisi(41.0082, 28.9784)).toBeCloseTo(151.6, 0);
  });
  it("Kâbe'nin tam kuzeyinden güney (180°), tam güneyinden kuzey (0°)", () => {
    expect(kibleAcisi(40, KABE.boylam)).toBeCloseTo(180);
    expect(kibleAcisi(0, KABE.boylam)).toBeCloseTo(0);
  });
  it('Türkiye\'de batıdan doğuya gidildikçe açı büyür (güneydoğu → güney)', () => {
    const edirne = kibleAcisi(41.68, 26.56);
    const ankara = kibleAcisi(39.93, 32.86);
    const van = kibleAcisi(38.5, 43.37);
    expect(edirne).toBeLessThan(ankara);
    expect(ankara).toBeLessThan(van);
    expect(edirne).toBeGreaterThan(140);
    expect(van).toBeLessThan(195);
  });
  it('0–360 aralığında', () => {
    for (const [e, b] of [[60, 120], [-30, -60], [21, 40]]) {
      const a = kibleAcisi(e, b);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThan(360);
    }
  });
});

describe('kibleFarki', () => {
  it.each([
    [150, 150, 0],
    [140, 150, 10],
    [160, 150, -10],
    [350, 10, 20],
    [10, 350, -20],
    [0, 180, 180],
  ])('yön %p, kıble %p → %p', (yon, kible, fark) => {
    expect(kibleFarki(yon, kible)).toBeCloseTo(fark);
  });
});

it('kibleyeDonuk', () => {
  expect(kibleyeDonuk(4)).toBe(true);
  expect(kibleyeDonuk(-5)).toBe(true);
  expect(kibleyeDonuk(6)).toBe(false);
});
