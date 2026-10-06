import {
  aydaGunSinirla,
  ayGecerliMi,
  formulMetni,
  hesapDogrula,
  kazaHesapla,
  sayiBicimle,
  vakitBorclari,
  type HesapGirdisi,
} from '../kazaHesap';

const BUGUN = new Date(2024, 5, 15); // 15 Haziran 2024

const girdi = (o: Partial<HesapGirdisi> = {}): HesapGirdisi => ({
  yukumlulukAy: '2016-09',
  duzenliAy: '2019-01',
  mezhep: 'hanefi',
  ozelGun: { acik: false, aydaGun: 7 },
  ...o,
});

describe('kazaHesapla', () => {
  it('SPEC örneği: 2016-09 → 2019-01, Hanefi, özel gün kapalı', () => {
    const s = kazaHesapla(girdi(), BUGUN);
    expect(s).toEqual({ gunSayisi: 852, dusulecek: 0, vakitBasiBorc: 852, vakitSayisi: 6, toplam: 5112 });
  });

  it('SPEC örneği: özel gün açık, ayda 7 gün → 28 ay × 7 = 196', () => {
    const s = kazaHesapla(girdi({ ozelGun: { acik: true, aydaGun: 7 } }), BUGUN);
    expect(s.dusulecek).toBe(196);
    expect(s.vakitBasiBorc).toBe(656);
    expect(s.toplam).toBe(3936);
  });

  it('Şafii: 5 vakit, vitir yok', () => {
    const s = kazaHesapla(girdi({ mezhep: 'safii' }), BUGUN);
    expect(s.vakitSayisi).toBe(5);
    expect(s.toplam).toBe(852 * 5);
    expect(vakitBorclari(s).vitir).toBe(0);
  });

  it('artık yılı sayar: 2020-01 → 2021-01 = 366 gün', () => {
    expect(kazaHesapla(girdi({ yukumlulukAy: '2020-01', duzenliAy: '2021-01' }), BUGUN).gunSayisi).toBe(366);
  });

  it('başlangıç ve bitiş aynı ay → borç 0', () => {
    const s = kazaHesapla(girdi({ yukumlulukAy: '2019-01', duzenliAy: '2019-01' }), BUGUN);
    expect(s.toplam).toBe(0);
  });

  it('henüz başlamadıysa bitiş bugün (bugün hariç)', () => {
    const s = kazaHesapla(girdi({ yukumlulukAy: '2024-06', duzenliAy: null }), BUGUN);
    expect(s.gunSayisi).toBe(14); // 1-14 Haziran
  });

  it('henüz başlamadıysa ay farkı içinde bulunulan ayı saymaz', () => {
    const s = kazaHesapla(
      girdi({ yukumlulukAy: '2024-01', duzenliAy: null, ozelGun: { acik: true, aydaGun: 5 } }),
      BUGUN,
    );
    expect(s.gunSayisi).toBe(31 + 29 + 31 + 30 + 31 + 14);
    expect(s.dusulecek).toBe(5 * 5);
  });

  it('düşülecek gün gün sayısını aşarsa borç 0 olur, eksiye düşmez', () => {
    const s = kazaHesapla(
      girdi({ yukumlulukAy: '2024-05', duzenliAy: '2024-06', ozelGun: { acik: true, aydaGun: 15 } }),
      BUGUN,
    );
    expect(s.gunSayisi).toBe(31);
    expect(s.vakitBasiBorc).toBe(16);
  });

  it('yaz saati geçişinden etkilenmez (Mart ayı 31 gün)', () => {
    expect(kazaHesapla(girdi({ yukumlulukAy: '2015-03', duzenliAy: '2015-04' }), BUGUN).gunSayisi).toBe(31);
  });
});

describe('vakitBorclari', () => {
  it('Hanefi: altı vakit eşit', () => {
    expect(vakitBorclari(kazaHesapla(girdi(), BUGUN))).toEqual({
      sabah: 852,
      ogle: 852,
      ikindi: 852,
      aksam: 852,
      yatsi: 852,
      vitir: 852,
    });
  });
});

describe('formulMetni', () => {
  it('özel gün kapalı', () => {
    expect(formulMetni(kazaHesapla(girdi(), BUGUN), false)).toBe('852 gün × 6 vakit = 5.112');
  });

  it('özel gün açık', () => {
    const s = kazaHesapla(girdi({ ozelGun: { acik: true, aydaGun: 7 } }), BUGUN);
    expect(formulMetni(s, true)).toBe('(852 gün - 196 gün) × 6 vakit = 3.936');
  });

  it('Şafii', () => {
    expect(formulMetni(kazaHesapla(girdi({ mezhep: 'safii' }), BUGUN), false)).toBe('852 gün × 5 vakit = 4.260');
  });
});

describe('sayiBicimle', () => {
  it.each([
    [0, '0'],
    [999, '999'],
    [1000, '1.000'],
    [5112, '5.112'],
    [1234567, '1.234.567'],
    [-4812, '-4.812'],
  ])('%p → %p', (n, beklenen) => {
    expect(sayiBicimle(n)).toBe(beklenen);
  });
});

describe('hesapDogrula', () => {
  it('geçerli giriş', () => {
    expect(hesapDogrula('2016-09', '2019-01', BUGUN)).toBeNull();
    expect(hesapDogrula('2016-09', null, BUGUN)).toBeNull();
    expect(hesapDogrula('2024-06', '2024-06', BUGUN)).toBeNull();
  });

  it('başlangıç bitişten sonra olamaz', () => {
    expect(hesapDogrula('2019-02', '2019-01', BUGUN)).toBe('hesap.hataSira');
  });

  it('gelecekteki tarih seçilemez', () => {
    expect(hesapDogrula('2024-07', null, BUGUN)).toBe('hesap.hataGelecek');
    expect(hesapDogrula('2016-09', '2024-07', BUGUN)).toBe('hesap.hataGelecek');
  });
});

describe('yardımcılar', () => {
  it('ayGecerliMi', () => {
    expect(ayGecerliMi('2016-09')).toBe(true);
    expect(ayGecerliMi('2016-13')).toBe(false);
    expect(ayGecerliMi('')).toBe(false);
  });

  it('aydaGunSinirla 1..15', () => {
    expect(aydaGunSinirla(0)).toBe(1);
    expect(aydaGunSinirla(7)).toBe(7);
    expect(aydaGunSinirla(20)).toBe(15);
  });
});
