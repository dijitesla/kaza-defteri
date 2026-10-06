import { varsayilanAyarlar, varsayilanKaza } from '../depolama';
import {
  etkiMetni,
  geriAl,
  geriAlinabilir,
  gunlereGore,
  islemAciklamasi,
  kazaDuzelt,
  kazaKil,
  kilinamadiEklenecekler,
  ozet,
  vakitCevapla,
  yenidenHesapla,
  type VeriDurumu,
} from '../islemler';

const SIMDI = new Date(2026, 9, 6, 15, 30);
let sayac = 0;
const id = () => `i${++sayac}`;

function durum(kalan = 10): VeriDurumu {
  const kaza = varsayilanKaza();
  for (const v of Object.keys(kaza.kalan) as (keyof typeof kaza.kalan)[]) {
    kaza.ilkBorc[v] = 10;
    kaza.kalan[v] = kalan;
  }
  return { ayarlar: varsayilanAyarlar(), kaza, gunluk: {}, islemler: [] };
}

describe('kazaKil', () => {
  it('kalanı 1 azaltır ve kayıt yazar', () => {
    const d = kazaKil(durum(), 'sabah', SIMDI, 'a')!;
    expect(d.kaza.kalan.sabah).toBe(9);
    expect(d.kaza.kalan.ogle).toBe(10);
    expect(d.islemler).toEqual([
      { id: 'a', zaman: SIMDI.toISOString(), tur: 'kaza_kilindi', vakit: 'sabah', degisim: { sabah: -1 } },
    ]);
  });

  it('kalan 0 ise değişmez', () => {
    expect(kazaKil(durum(0), 'sabah', SIMDI, 'a')).toBeNull();
  });

  it('girdiyi değiştirmez', () => {
    const d = durum();
    kazaKil(d, 'sabah', SIMDI, 'a');
    expect(d.kaza.kalan.sabah).toBe(10);
    expect(d.islemler).toHaveLength(0);
  });
});

describe('vakitCevapla', () => {
  it('kıldım: yalnızca günlük durum, borç ve kayıt değişmez', () => {
    const d = vakitCevapla(durum(), '2026-10-05', 'yatsi', 'kilindi', SIMDI, id());
    expect(d.gunluk).toEqual({ '2026-10-05': { yatsi: 'kilindi' } });
    expect(d.kaza.kalan.yatsi).toBe(10);
    expect(d.islemler).toHaveLength(0);
  });

  it('kılamadım: yalnızca o vakte +1, kayıt yazar; vitire dokunmaz', () => {
    const d = vakitCevapla(durum(), '2026-10-05', 'yatsi', 'kilinamadi', SIMDI, 'k');
    expect(d.kaza.kalan.yatsi).toBe(11);
    expect(d.kaza.kalan.vitir).toBe(10);
    expect(d.gunluk['2026-10-05'].yatsi).toBe('kilinamadi');
    expect(d.islemler[0]).toMatchObject({ id: 'k', tur: 'kilinamadi', vakit: 'yatsi', gun: '2026-10-05', degisim: { yatsi: 1 } });
  });

  it('aynı günün diğer vakitlerini korur', () => {
    let d = vakitCevapla(durum(), '2026-10-06', 'sabah', 'kilindi', SIMDI, id());
    d = vakitCevapla(d, '2026-10-06', 'ogle', 'kilinamadi', SIMDI, id());
    expect(d.gunluk['2026-10-06']).toEqual({ sabah: 'kilindi', ogle: 'kilinamadi' });
  });

  it('eklenecek vakitler tek yerden belirlenir', () => {
    expect(kilinamadiEklenecekler('yatsi')).toEqual(['yatsi']);
  });
});

describe('geriAl', () => {
  it('kaza kılmayı geri alır', () => {
    const d1 = kazaKil(durum(), 'ogle', SIMDI, 'a')!;
    const d2 = geriAl(d1, SIMDI, 'g')!;
    expect(d2.kaza.kalan.ogle).toBe(10);
    expect(d2.islemler[1]).toMatchObject({ tur: 'geri_alindi', geriAlinanId: 'a', degisim: { ogle: 1 } });
    expect(geriAlinabilir(d2.islemler)).toBeNull();
  });

  it('kılamadımı geri alır, günlük durumu da siler (vakit yeniden cevapsız olur)', () => {
    let d = vakitCevapla(durum(), '2026-10-05', 'sabah', 'kilindi', SIMDI, id());
    d = vakitCevapla(d, '2026-10-05', 'yatsi', 'kilinamadi', SIMDI, 'k');
    d = geriAl(d, SIMDI, 'g')!;
    expect(d.kaza.kalan.yatsi).toBe(10);
    expect(d.gunluk['2026-10-05']).toEqual({ sabah: 'kilindi' });
  });

  it('sırayla geriye doğru gider', () => {
    let d = kazaKil(durum(), 'sabah', SIMDI, 'a')!;
    d = kazaKil(d, 'ogle', SIMDI, 'b')!;
    d = geriAl(d, SIMDI, 'g1')!;
    expect(geriAlinabilir(d.islemler)?.id).toBe('a');
    d = geriAl(d, SIMDI, 'g2')!;
    expect(d.kaza.kalan.sabah).toBe(10);
    expect(d.kaza.kalan.ogle).toBe(10);
    expect(geriAl(d, SIMDI, 'g3')).toBeNull();
  });

  it('beklenen işlem sırada değilse geri almaz', () => {
    let d = kazaKil(durum(), 'sabah', SIMDI, 'a')!;
    d = kazaKil(d, 'ogle', SIMDI, 'b')!;
    expect(geriAl(d, SIMDI, 'g', 'a')).toBeNull();
    expect(geriAl(d, SIMDI, 'g', 'b')).not.toBeNull();
  });

  it('kalan 0 altına düşmez, uygulanan değişim kaydedilir', () => {
    let d = vakitCevapla(durum(0), '2026-10-05', 'sabah', 'kilinamadi', SIMDI, 'k'); // 0 → 1
    d = kazaKil(d, 'sabah', SIMDI, 'a')!; // 1 → 0
    d = geriAl(d, SIMDI, 'g1')!; // kaza kılma geri: 0 → 1
    d = geriAl(d, SIMDI, 'g2')!; // kılamadım geri: 1 → 0
    expect(d.kaza.kalan.sabah).toBe(0);
  });
});

describe('gösterim', () => {
  it('açıklama ve etki', () => {
    let d = kazaKil(durum(), 'sabah', SIMDI, 'a')!;
    d = geriAl(d, SIMDI, 'g')!;
    const [kil, geri] = d.islemler;
    expect(islemAciklamasi(kil, d.islemler)).toBe('Sabah kazası kılındı');
    expect(etkiMetni(kil)).toBe('-1');
    expect(islemAciklamasi(geri, d.islemler)).toBe('İşlem geri alındı: Sabah kazası kılındı');
    expect(etkiMetni(geri)).toBe('+1');
    const k = vakitCevapla(durum(), '2026-10-05', 'ikindi', 'kilinamadi', SIMDI, 'k').islemler[0];
    expect(islemAciklamasi(k, [k])).toBe('İkindi kılınamadı, kazaya eklendi');
  });

  it('özet', () => {
    const d = kazaKil(durum(), 'sabah', SIMDI, 'a')!;
    expect(ozet(d.kaza)).toEqual({ ilkBorc: 60, kilinan: 1, kalan: 59 });
  });

  it('güne göre gruplar, en yeni önce', () => {
    let d = kazaKil(durum(), 'sabah', new Date(2026, 9, 5, 10), 'a')!;
    d = kazaKil(d, 'ogle', new Date(2026, 9, 6, 9), 'b')!;
    d = kazaKil(d, 'ikindi', new Date(2026, 9, 6, 11), 'c')!;
    const g = gunlereGore(d.islemler);
    expect(g.map((x) => x.gun)).toEqual(['2026-10-06', '2026-10-05']);
    expect(g[0].islemler.map((i) => i.id)).toEqual(['c', 'b']);
  });
});

describe('yenidenHesapla', () => {
  const girdi = {
    yukumlulukAy: '2016-09',
    duzenliAy: '2019-01',
    mezhep: 'hanefi' as const,
    ozelGun: { acik: false, aydaGun: 7 },
  };

  it('kılınan kaza korunur (SPEC 4.3)', () => {
    const d = durum(); // ilk 10, kalan 10
    d.kaza.kalan.sabah = 7; // 3 kılınmış
    const y = yenidenHesapla(d, girdi, SIMDI, 'r')!;
    expect(y.kaza.ilkBorc.sabah).toBe(852);
    expect(y.kaza.kalan.sabah).toBe(849);
    expect(y.kaza.kalan.ogle).toBe(852);
    expect(y.ayarlar.baslangic).toEqual({ yukumlulukAy: '2016-09', duzenliAy: '2019-01' });
    expect(y.islemler[0]).toMatchObject({ tur: 'yeniden_hesap', degisim: { sabah: 842, ogle: 842 } });
  });

  it('yeni borç kılınandan azsa kalan 0', () => {
    const d = durum(0); // ilk 10, kalan 0 → 10 kılınmış
    const y = yenidenHesapla(d, { ...girdi, yukumlulukAy: '2019-01' }, SIMDI, 'r')!;
    expect(y.kaza.kalan.sabah).toBe(0);
  });

  it('Şafii: vitir borcu sıfırlanır', () => {
    const y = yenidenHesapla(durum(), { ...girdi, mezhep: 'safii' }, SIMDI, 'r')!;
    expect(y.kaza.ilkBorc.vitir).toBe(0);
    expect(y.kaza.kalan.vitir).toBe(0);
    expect(y.ayarlar.mezhep).toBe('safii');
  });

  it('geri alınınca ilk borç, kalan ve ayarlar eski haline döner', () => {
    const d = durum();
    d.kaza.kalan.sabah = 7;
    const once = { ...d.ayarlar };
    const y = geriAl(yenidenHesapla(d, { ...girdi, mezhep: 'safii' }, SIMDI, 'r')!, SIMDI, 'g')!;
    expect(y.kaza.ilkBorc).toEqual(d.kaza.ilkBorc);
    expect(y.kaza.kalan).toEqual(d.kaza.kalan);
    expect(y.ayarlar.mezhep).toBe(once.mezhep);
    expect(y.ayarlar.baslangic).toEqual(once.baslangic);
    expect(islemAciklamasi(y.islemler[1], y.islemler)).toBe(
      'İşlem geri alındı: Başlangıç bilgileri değişti, borç yeniden hesaplandı',
    );
  });
});

describe('yenidenHesapla: değişiklik yok', () => {
  it('aynı bilgilerle kaydedilirse kayıt yazılmaz', () => {
    const g = { yukumlulukAy: '2016-09', duzenliAy: '2019-01', mezhep: 'hanefi' as const, ozelGun: { acik: false, aydaGun: 7 } };
    const y = yenidenHesapla(durum(), g, SIMDI, 'r')!;
    expect(yenidenHesapla(y, g, SIMDI, 'r2')).toBeNull();
  });
});

describe('kazaDuzelt', () => {
  it('yalnızca değişen vakitleri kaydeder, geri alınabilir', () => {
    const d = durum();
    const yeni = { ...d.kaza.kalan, sabah: 4, vitir: 12 };
    const y = kazaDuzelt(d, yeni, SIMDI, 'm')!;
    expect(y.kaza.kalan).toEqual(yeni);
    expect(y.kaza.ilkBorc).toEqual(d.kaza.ilkBorc);
    expect(y.islemler[0]).toMatchObject({ tur: 'manuel_duzeltme', degisim: { sabah: -6, vitir: 2 } });
    expect(islemAciklamasi(y.islemler[0], y.islemler)).toBe('Kaza sayıları elle düzeltildi');
    expect(etkiMetni(y.islemler[0])).toBe('-4');
    expect(geriAl(y, SIMDI, 'g')!.kaza.kalan).toEqual(d.kaza.kalan);
  });

  it('değişiklik yoksa ya da sayı geçersizse null', () => {
    const d = durum();
    expect(kazaDuzelt(d, { ...d.kaza.kalan }, SIMDI, 'm')).toBeNull();
    expect(kazaDuzelt(d, { ...d.kaza.kalan, sabah: -1 }, SIMDI, 'm')).toBeNull();
    expect(kazaDuzelt(d, { ...d.kaza.kalan, sabah: 1.5 }, SIMDI, 'm')).toBeNull();
  });
});
