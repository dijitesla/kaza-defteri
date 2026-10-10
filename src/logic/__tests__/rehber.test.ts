import { DUALAR } from '../../data/dualar';
import { ESMA } from '../../data/esma';
import { KURAN_DUALARI, SURELER } from '../../data/sureler';
import { gununEsmasi, imsakiye } from '../rehber';

describe('veri', () => {
  it('99 esma, sıra numaraları 1..99', () => {
    expect(ESMA).toHaveLength(99);
    expect(ESMA.map((e) => e.sira)).toEqual(Array.from({ length: 99 }, (_, i) => i + 1));
    for (const e of ESMA) {
      expect(e.ad.length).toBeGreaterThan(1);
      expect(e.arapca.length).toBeGreaterThan(1);
      expect(e.anlam.length).toBeGreaterThan(3);
    }
  });
  it('surelerin ayet sayıları', () => {
    const sayi = Object.fromEntries(SURELER.map((s) => [s.id, s.ayetler.length]));
    expect(sayi).toMatchObject({ fatiha: 7, ayetelkursi: 1, amenerrasulu: 2, fil: 5, kevser: 3, ihlas: 4, felak: 5, nas: 6 });
    for (const s of [...SURELER, ...KURAN_DUALARI]) {
      for (const a of s.ayetler) {
        expect(a.arapca.length).toBeGreaterThan(0);
        expect(a.okunus.length).toBeGreaterThan(0);
        expect(a.meal.length).toBeGreaterThan(0);
      }
    }
  });
  it('besmele Fâtiha dışında ayet metninden ayrılmış', () => {
    const ihlas = SURELER.find((s) => s.id === 'ihlas')!;
    expect(ihlas.besmele).toBe(true);
    expect(ihlas.ayetler[0].arapca.startsWith('بِسْمِ')).toBe(false);
  });
  it('dualar kaynaklı', () => {
    for (const d of DUALAR) expect(d.kaynak).toMatch(/\d+$/);
  });
});

it('gununEsmasi: gün içinde aynı, ertesi gün sıradaki', () => {
  const a = gununEsmasi(new Date(2026, 9, 10, 1));
  expect(gununEsmasi(new Date(2026, 9, 10, 23))).toBe(a);
  const b = gununEsmasi(new Date(2026, 9, 11, 1));
  expect(b.sira).toBe((a.sira % 99) + 1);
});

it('imsakiye 30 gün, ardışık tarihler', () => {
  const l = imsakiye({ ad: 'Ankara', enlem: 39.92, boylam: 32.85 }, '2026-10-30', { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0 });
  expect(l).toHaveLength(30);
  expect(l[0].gun).toBe('2026-10-30');
  expect(l[2].gun).toBe('2026-11-01');
  expect(l[0].vakitler.imsak.getTime()).toBeLessThan(l[0].vakitler.aksam.getTime());
});
