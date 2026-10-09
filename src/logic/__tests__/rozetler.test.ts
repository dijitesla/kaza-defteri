import type { GunlukDurum, KazaDurumu, KazaVakit } from '../../types';
import { enUzunSeri, rozetler, tamGun, vakitSerisi } from '../rozetler';

const tam = { sabah: 'kilindi', ogle: 'kilindi', ikindi: 'kilindi', aksam: 'kilindi', yatsi: 'kilindi' } as const;
const eksik = { ...tam, ikindi: 'kilinamadi' } as const;

const kaza = (ilk: number, kalan: number): KazaDurumu => {
  const r = (n: number) => ({ sabah: n, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 }) as Record<KazaVakit, number>;
  return { ilkBorc: r(ilk), kalan: r(kalan), oruc: { ilkBorc: 0, kalan: 0 } };
};

describe('tamGun', () => {
  it('beş vakit kılındıysa tam', () => {
    expect(tamGun({ '2026-10-06': tam }, '2026-10-06')).toBe(true);
    expect(tamGun({ '2026-10-06': eksik }, '2026-10-06')).toBe(false);
    expect(tamGun({ '2026-10-06': { sabah: 'kilindi' } }, '2026-10-06')).toBe(false);
    expect(tamGun({}, '2026-10-06')).toBe(false);
  });
});

describe('vakitSerisi', () => {
  const g: GunlukDurum = { '2026-10-03': tam, '2026-10-04': tam, '2026-10-05': tam, '2026-10-02': eksik };
  it('bugün henüz tamamlanmadıysa dünden sayar', () => {
    expect(vakitSerisi({ ...g, '2026-10-06': { sabah: 'kilindi' } }, '2026-10-06')).toBe(3);
  });
  it('bugün tamamlandıysa bugünü de sayar', () => {
    expect(vakitSerisi({ ...g, '2026-10-06': tam }, '2026-10-06')).toBe(4);
  });
  it('dün eksikse seri sıfırdır', () => {
    expect(vakitSerisi({ ...g, '2026-10-05': eksik }, '2026-10-06')).toBe(0);
  });
});

describe('enUzunSeri', () => {
  it('aradaki boşluk seriyi böler', () => {
    const g: GunlukDurum = {
      '2026-09-28': tam,
      '2026-09-29': tam,
      '2026-09-30': tam,
      '2026-10-01': eksik,
      '2026-10-02': tam,
      '2026-10-04': tam,
    };
    expect(enUzunSeri(g)).toBe(3);
  });
  it('ay geçişinde kesintisiz sayar', () => {
    expect(enUzunSeri({ '2026-09-30': tam, '2026-10-01': tam })).toBe(2);
  });
  it('boş kayıt', () => {
    expect(enUzunSeri({})).toBe(0);
  });
});

describe('rozetler', () => {
  const kazanilan = (k: KazaDurumu, g: GunlukDurum = {}) =>
    rozetler(k, g)
      .filter((r) => r.kazanildi)
      .map((r) => r.id);

  it('kılınan kazaya göre', () => {
    expect(kazanilan(kaza(100, 100))).toEqual([]);
    expect(kazanilan(kaza(100, 99))).toEqual(['ilkKaza']);
    expect(kazanilan(kaza(100, 40))).toEqual(['ilkKaza', 'kaza10', 'kaza50']);
  });
  it('borç bitince', () => {
    expect(kazanilan(kaza(10, 0))).toEqual(['ilkKaza', 'kaza10', 'borcBitti']);
    expect(kazanilan(kaza(0, 0))).toEqual([]);
  });
  it('en uzun seriye göre', () => {
    const g: GunlukDurum = {};
    for (let i = 1; i <= 7; i++) g[`2026-10-0${i}`] = tam;
    expect(kazanilan(kaza(0, 0), g)).toEqual(['seri3', 'seri7']);
  });
  it('sabit sırada 12 rozet', () => {
    expect(rozetler(kaza(0, 0), {})).toHaveLength(12);
  });
});

describe('özel hal günleri', () => {
  const muaf = { sabah: 'kilindi', ogle: 'muaf', ikindi: 'muaf', aksam: 'muaf', yatsi: 'muaf' } as const;
  it('seriyi bozmaz ama sayılmaz', () => {
    const g: GunlukDurum = { '2026-10-02': tam, '2026-10-03': muaf, '2026-10-04': muaf, '2026-10-05': tam };
    expect(vakitSerisi(g, '2026-10-06')).toBe(2);
    expect(enUzunSeri(g)).toBe(2);
  });
  it('bugün özel hal ise dünden önceki seri sürer', () => {
    const g: GunlukDurum = { '2026-10-05': tam, '2026-10-06': muaf };
    expect(vakitSerisi(g, '2026-10-06')).toBe(1);
  });
  it('yalnızca özel hal günleri seri değildir', () => {
    expect(enUzunSeri({ '2026-10-05': muaf, '2026-10-06': muaf })).toBe(0);
  });
});
