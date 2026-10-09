import type { GunlukDurum } from '../../types';
import { ayIzgarasi, ayKaydir, gunRengi } from '../takvim';

const tam = { sabah: 'kilindi', ogle: 'kilindi', ikindi: 'kilindi', aksam: 'kilindi', yatsi: 'kilindi' } as const;

describe('gunRengi', () => {
  const g: GunlukDurum = {
    a: tam,
    b: { ...tam, ikindi: 'kilinamadi' },
    c: { sabah: 'kilindi', ogle: 'kilindi' },
    d: { ...tam, ogle: 'muaf', ikindi: 'muaf' },
    e: { sabah: 'muaf' },
    f: {},
  };
  it.each([
    ['a', 'tam'],
    ['b', 'kilinamadi'],
    ['c', 'kismi'],
    ['d', 'muaf'],
    ['e', 'muaf'],
    ['f', 'bos'],
    ['yok', 'bos'],
  ])('%s → %s', (gun, renk) => {
    expect(gunRengi(g, gun)).toBe(renk);
  });
});

describe('ayIzgarasi', () => {
  it("Ekim 2026: 1 Ekim Perşembe, Pazartesi'den başlar", () => {
    const h = ayIzgarasi(2026, 9);
    expect(h[0]).toEqual([null, null, null, '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04']);
    expect(h.flat().filter(Boolean)).toHaveLength(31);
    expect(h.every((hafta) => hafta.length === 7)).toBe(true);
    expect(h[h.length - 1]).toContain('2026-10-31');
  });
  it('Şubat 2028 artık yıl', () => {
    expect(ayIzgarasi(2028, 1).flat().filter(Boolean)).toHaveLength(29);
  });
});

it('ayKaydir', () => {
  expect(ayKaydir(2026, 11, 1)).toEqual({ yil: 2027, ay: 0 });
  expect(ayKaydir(2026, 0, -1)).toEqual({ yil: 2025, ay: 11 });
});
