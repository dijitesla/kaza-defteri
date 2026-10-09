import { bosTesbihat, bosZikir, tesbihatArttir, zikirArttir, zikirHedefi, zikirSifirla, zikriTamamla } from '../zikir';

describe('zikir', () => {
  it('sayar, hedefte tur tamamlar ve sıfırdan başlar', () => {
    let d = bosZikir();
    for (let i = 0; i < 32; i++) d = zikirArttir(d).durum;
    expect(d).toEqual({ sayi: 32, hedef: 33, tur: 0 });
    const s = zikirArttir(d);
    expect(s.turTamam).toBe(true);
    expect(s.durum).toEqual({ sayi: 0, hedef: 33, tur: 1 });
  });

  it('serbest hedefte tur yok', () => {
    let d = zikirHedefi(bosZikir(), 0);
    for (let i = 0; i < 150; i++) d = zikirArttir(d).durum;
    expect(d).toEqual({ sayi: 150, hedef: 0, tur: 0 });
  });

  it('hedef değişince ve sıfırlanınca sayaç sıfırlanır', () => {
    const d = { sayi: 10, hedef: 33 as const, tur: 2 };
    expect(zikirHedefi(d, 99)).toEqual({ sayi: 0, hedef: 99, tur: 0 });
    expect(zikirHedefi(d, 33)).toBe(d);
    expect(zikirSifirla(d)).toEqual({ sayi: 0, hedef: 33, tur: 0 });
  });

  it('bozuk kayıtta boş sayaç', () => {
    expect(zikriTamamla(null)).toEqual(bosZikir());
    expect(zikriTamamla({ sayi: -1, hedef: 7, tur: 'x' })).toEqual(bosZikir());
    expect(zikriTamamla({ sayi: 5, hedef: 99, tur: 1 })).toEqual({ sayi: 5, hedef: 99, tur: 1 });
  });
});

describe('tesbihat', () => {
  it('33 sayımda bir adım ilerler, 99 sayımda biter', () => {
    let d = bosTesbihat();
    const olaylar: string[] = [];
    for (let i = 0; i < 99; i++) {
      const r = tesbihatArttir(d);
      d = r.durum;
      if (r.adimBitti) olaylar.push(`${i + 1}:${r.bitti ? 'bitti' : 'adim'}`);
    }
    expect(olaylar).toEqual(['33:adim', '66:adim', '99:bitti']);
    expect(d).toEqual({ adim: 3, sayi: 0 });
  });
  it('bittikten sonra sayım değişmez', () => {
    const r = tesbihatArttir({ adim: 3, sayi: 0 });
    expect(r).toEqual({ durum: { adim: 3, sayi: 0 }, adimBitti: false, bitti: true });
  });
});
