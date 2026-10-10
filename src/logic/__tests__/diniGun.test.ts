import { DINI_GUNLER, RAMAZANLAR } from '../../data/diniGunler';
import { bugunkuGunler, enYakinDiniGun, gunFarki, ramazanGunu, ramazanSayaci, yaklasanGunler } from '../diniGun';
import type { GununVakitleri } from '../vakitler';

describe('dini günler tablosu', () => {
  it('tarihler geçerli ve sıralı', () => {
    for (const g of DINI_GUNLER) expect(g.tarih).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const s = DINI_GUNLER.map((g) => g.tarih);
    expect([...s].sort()).toEqual(s);
  });
  it('Ramazan başlangıcı ve bayram Ramazan tablosuyla uyumlu', () => {
    for (const r of RAMAZANLAR) {
      expect(DINI_GUNLER.some((g) => g.tur === 'ramazan' && g.tarih === r.bas)).toBe(true);
      const bayram = DINI_GUNLER.find((g) => g.tur === 'bayram' && g.tarih > r.son);
      expect(gunFarki(r.son, bayram!.tarih)).toBe(1);
    }
  });
});

it('gunFarki', () => {
  expect(gunFarki('2026-10-10', '2026-12-10')).toBe(61);
  expect(gunFarki('2027-03-28', '2027-03-29')).toBe(1); // yaz saati geçişinde de 1
});

it('yaklasanGunler ve bugunkuGunler', () => {
  const y = yaklasanGunler('2027-01-05');
  expect(y[0].ad).toBe('Berat Kandili');
  expect(bugunkuGunler('2026-12-10').map((g) => g.ad)).toEqual(['Üç Ayların Başlangıcı', 'Regaip Kandili']);
  expect(bugunkuGunler('2026-12-11')).toEqual([]);
});

describe('ramazanGunu', () => {
  it('ilk ve son gün', () => {
    expect(ramazanGunu('2027-02-08')).toEqual({ gun: 1, toplam: 29, bas: '2027-02-08' });
    expect(ramazanGunu('2027-03-08')!.gun).toBe(29);
  });
  it('Ramazan dışında null', () => {
    expect(ramazanGunu('2027-02-07')).toBeNull();
    expect(ramazanGunu('2027-03-09')).toBeNull();
  });
});

describe('ramazanSayaci', () => {
  const g = (d: number): GununVakitleri => {
    const s = (sa: number, dk = 0) => new Date(2027, 1, d, sa, dk);
    return { imsak: s(5, 50), gunes: s(7, 20), ogle: s(12, 40), ikindi: s(15, 30), aksam: s(18, 0), yatsi: s(19, 20) };
  };
  const bugun = g(10);
  const yarin = g(11);
  it('gece imsaka, gündüz iftara sayar', () => {
    expect(ramazanSayaci(new Date(2027, 1, 10, 3), bugun, yarin, true, true)).toEqual({ tur: 'imsak', zaman: bugun.imsak });
    expect(ramazanSayaci(new Date(2027, 1, 10, 13), bugun, yarin, true, true)).toEqual({ tur: 'iftar', zaman: bugun.aksam });
  });
  it('iftardan sonra ertesi günün imsakına sayar', () => {
    expect(ramazanSayaci(new Date(2027, 1, 10, 20), bugun, yarin, true, true)).toEqual({ tur: 'imsak', zaman: yarin.imsak });
  });
  it('son günün iftarından sonra null', () => {
    expect(ramazanSayaci(new Date(2027, 1, 10, 20), bugun, yarin, true, false)).toBeNull();
  });
  it('Ramazan arifesi: yatsıdan sonra ilk sahura sayar', () => {
    expect(ramazanSayaci(new Date(2027, 1, 10, 21), bugun, yarin, false, true)).toEqual({ tur: 'imsak', zaman: yarin.imsak });
    expect(ramazanSayaci(new Date(2027, 1, 10, 13), bugun, yarin, false, true)).toBeNull();
  });
});

it('enYakinDiniGun aynı günleri birleştirir', () => {
  expect(enYakinDiniGun('2026-10-10')).toEqual({ tarih: '2026-12-10', ad: 'Üç Ayların Başlangıcı · Regaip Kandili', tur: 'kandil' });
  expect(enYakinDiniGun('2027-01-01')!.ad).toBe('Miraç Kandili');
  expect(enYakinDiniGun('2028-01-01')).toBeNull();
});
