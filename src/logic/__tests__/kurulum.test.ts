import { bosTaslak, kurulumVerisiOlustur } from '../kurulum';

const BUGUN = new Date(2024, 5, 15);

describe('kurulumVerisiOlustur', () => {
  const taslak = () => ({
    ...bosTaslak(),
    konum: { ad: 'Ankara', enlem: 39.9199, boylam: 32.8543 },
    hesap: {
      yukumlulukAy: '2016-09',
      duzenliAy: '2019-01',
      mezhep: 'hanefi' as const,
      ozelGun: { acik: false, aydaGun: 7 },
    },
  });

  it('ayarları ve borcu üretir, ilk borç = kalan', () => {
    const { ayarlar, kaza } = kurulumVerisiOlustur(taslak(), BUGUN);
    expect(ayarlar.kurulumTamam).toBe(true);
    expect(ayarlar.konum.ad).toBe('Ankara');
    expect(ayarlar.baslangic).toEqual({ yukumlulukAy: '2016-09', duzenliAy: '2019-01' });
    expect(kaza.ilkBorc.sabah).toBe(852);
    expect(kaza.ilkBorc.vitir).toBe(852);
    expect(kaza.kalan).toEqual(kaza.ilkBorc);
    expect(kaza.kalan).not.toBe(kaza.ilkBorc);
  });

  it('bildirim tercihlerini taşır', () => {
    const t = taslak();
    t.bildirim = { ...t.bildirim, soruDakika: 60, vakitler: { ...t.bildirim.vakitler, ogle: false } };
    const { ayarlar } = kurulumVerisiOlustur(t, BUGUN);
    expect(ayarlar.bildirim.soruDakika).toBe(60);
    expect(ayarlar.bildirim.vakitler.ogle).toBe(false);
  });

  it('eksik taslakta hata verir', () => {
    expect(() => kurulumVerisiOlustur(bosTaslak(), BUGUN)).toThrow();
  });
});
