import { bitisTarihi, hedefIlerlemesi } from '../hedef';

const bugun = new Date(2026, 9, 9, 15);

describe('bitisTarihi', () => {
  it('hedef yoksa ya da borç bittiyse null', () => {
    expect(bitisTarihi(100, 0, bugun)).toBeNull();
    expect(bitisTarihi(0, 3, bugun)).toBeNull();
  });
  it('bugün de sayılır', () => {
    expect(bitisTarihi(3, 3, bugun)).toEqual(new Date(2026, 9, 9));
    expect(bitisTarihi(4, 3, bugun)).toEqual(new Date(2026, 9, 10));
  });
  it('ay ve yıl geçişleri', () => {
    // 5112 / 3 = 1704 gün
    expect(bitisTarihi(5112, 3, bugun)).toEqual(new Date(2026, 9, 9 + 1703));
    expect(bitisTarihi(5112, 3, bugun)!.getFullYear()).toBe(2031);
  });
});

it('hedefIlerlemesi', () => {
  expect(hedefIlerlemesi(2, 3)).toEqual({ kilinan: 2, hedef: 3, tamam: false });
  expect(hedefIlerlemesi(3, 3).tamam).toBe(true);
  expect(hedefIlerlemesi(5, 0).tamam).toBe(false);
});
