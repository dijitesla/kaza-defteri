import {
  aktifGunSayisi,
  bosPuanDurumu,
  kilinanKazaSayisi,
  puanDurumunuTamamla,
  puanIstenmeli,
} from '../puanIstegi';
import type { GunlukDurum, Islem } from '../../types';

const kaza = (id: string): Islem => ({ id, zaman: '2026-11-01T10:00:00Z', tur: 'kaza_kilindi', vakit: 'sabah', degisim: { sabah: -1 } });
const geriAl = (id: string, hedef: string): Islem => ({ id, zaman: '2026-11-01T10:01:00Z', tur: 'geri_alindi', geriAlinanId: hedef, degisim: { sabah: 1 } });
const kazalar = (n: number) => Array.from({ length: n }, (_, i) => kaza(`k${i}`));

const kurulumZamani = '2026-11-01T08:00:00Z';
const yediGunSonra = new Date('2026-11-08T08:00:00Z');

describe('kilinanKazaSayisi', () => {
  it('geri alınanları düşer', () => {
    expect(kilinanKazaSayisi([kaza('a'), kaza('b'), geriAl('c', 'a')])).toBe(1);
  });
  it('başka işlemleri saymaz', () => {
    expect(kilinanKazaSayisi([{ ...kaza('a'), tur: 'kilinamadi' }])).toBe(0);
  });
});

it('aktifGunSayisi yalnızca kılınan vakti olan günleri sayar', () => {
  const g: GunlukDurum = {
    '2026-11-01': { sabah: 'kilindi', ogle: 'cevapsiz' },
    '2026-11-02': { sabah: 'cevapsiz' },
    '2026-11-03': { yatsi: 'kilindi' },
    '2026-11-04': { aksam: 'muaf' },
  };
  expect(aktifGunSayisi(g)).toBe(2);
});

describe('puanIstenmeli', () => {
  const temel = { durum: bosPuanDurumu(), kurulumZamani, simdi: yediGunSonra, islemler: kazalar(10), gunluk: {} };

  it('yeterli kullanımdan sonra ister', () => {
    expect(puanIstenmeli(temel)).toBe(true);
  });
  it('kurulumdan beri az gün geçtiyse istemez', () => {
    expect(puanIstenmeli({ ...temel, simdi: new Date('2026-11-04T08:00:00Z') })).toBe(false);
  });
  it('kullanım azsa istemez', () => {
    expect(puanIstenmeli({ ...temel, islemler: kazalar(9) })).toBe(false);
  });
  it('kaza kılmayan ama vakitleri işaretleyen kullanıcıya da ister', () => {
    const gunluk: GunlukDurum = {};
    for (let d = 1; d <= 4; d++) gunluk[`2026-11-0${d}`] = { sabah: 'kilindi' };
    expect(puanIstenmeli({ ...temel, islemler: [], gunluk })).toBe(true);
  });
  it('bir kez istendiyse tekrar istemez', () => {
    expect(puanIstenmeli({ ...temel, durum: { istendi: '2026-11-07T10:00:00Z' } })).toBe(false);
  });
  it('kurulum zamanı yoksa ya da bozuksa istemez', () => {
    expect(puanIstenmeli({ ...temel, kurulumZamani: undefined })).toBe(false);
    expect(puanIstenmeli({ ...temel, kurulumZamani: 'bozuk' })).toBe(false);
  });
});

it('puanDurumunuTamamla bozuk veriyi düzeltir', () => {
  expect(puanDurumunuTamamla(undefined)).toEqual({ istendi: null });
  expect(puanDurumunuTamamla({ istendi: 5 })).toEqual({ istendi: null });
  expect(puanDurumunuTamamla({ istendi: 'x' })).toEqual({ istendi: 'x' });
});
