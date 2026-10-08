import { ayEvresi, geriSayimMetni, gokCismi, gunEvresi, VAKIT_NOKTALARI, yayKonumu, YAY_BAS, YAY_SON } from '../gokyuzu';
import type { GununVakitleri } from '../vakitler';

const gun = (g: number): GununVakitleri => {
  const s = (sa: number, dk = 0) => new Date(2026, 9, g, sa, dk);
  return { imsak: s(5), gunes: s(6, 30), ogle: s(13), ikindi: s(16), aksam: s(18, 30), yatsi: s(20) };
};
const dun = gun(5);
const bugun = gun(6);
const yarin = gun(7);
const an = (g: number, sa: number, dk = 0) => new Date(2026, 9, g, sa, dk);

describe('gunEvresi', () => {
  it.each([
    [an(6, 3), 'gece'],
    [an(6, 5, 30), 'safak'],
    [an(6, 12), 'gunduz'],
    [an(6, 17), 'ikindi'],
    [an(6, 19), 'aksam'],
    [an(6, 22), 'gece'],
  ])('%p → %p', (z, e) => {
    expect(gunEvresi(z, bugun)).toBe(e);
  });
});

describe('yayKonumu', () => {
  it('her vakit kendi noktasında', () => {
    const v = [bugun.imsak, bugun.ogle, bugun.ikindi, bugun.aksam, bugun.yatsi];
    v.forEach((z, i) => expect(yayKonumu(z, bugun)).toBeCloseTo(VAKIT_NOKTALARI[i]));
  });
  it('iki vakit arasında orantılı (öğle 13:00 – ikindi 16:00, 14:30 yarı yol)', () => {
    expect(yayKonumu(an(6, 14, 30), bugun)).toBeCloseTo((VAKIT_NOKTALARI[1] + VAKIT_NOKTALARI[2]) / 2);
  });
  it('dışarıdaki zamanlar uçlara sabitlenir', () => {
    expect(yayKonumu(an(6, 2), bugun)).toBe(YAY_BAS);
    expect(yayKonumu(an(6, 23), bugun)).toBe(YAY_SON);
  });
});

describe('gokCismi', () => {
  it('gündüz güneş', () => {
    const g = gokCismi(an(6, 16), bugun, yarin, dun);
    expect(g.tur).toBe('gunes');
    expect(g.konum).toBeCloseTo(VAKIT_NOKTALARI[2]); // ikindi vakti
  });
  it('şafakta ve akşam sonrası ay, vakit ölçeğinde', () => {
    expect(gokCismi(an(6, 5, 30), bugun, yarin, dun).tur).toBe('ay');
    expect(gokCismi(an(6, 19), bugun, yarin, dun).tur).toBe('ay');
  });
  it('gece ay yatsıdan imsaka yay boyunca ilerler', () => {
    const yatsiSonrasi = gokCismi(an(6, 20), bugun, yarin, dun);
    const geceYarisiSonrasi = gokCismi(an(7, 0, 30), gun(7), gun(8), bugun);
    expect(yatsiSonrasi.tur).toBe('ay');
    expect(yatsiSonrasi.konum).toBeCloseTo(YAY_BAS);
    // 20:00 → 05:00 (9 saat) içinde 00:30 yarı yol
    expect(geceYarisiSonrasi.konum).toBeCloseTo(0.5);
  });
});

describe('ayEvresi', () => {
  it('bilinen dolunay ve yeni aylar (±1 gün)', () => {
    const gunFarki = (e: number, hedef: number) => Math.abs(((e - hedef + 1.5) % 1) - 0.5) * 29.53;
    expect(gunFarki(ayEvresi(new Date(Date.UTC(2024, 3, 23, 23, 49))), 0.5)).toBeLessThan(1); // dolunay
    expect(gunFarki(ayEvresi(new Date(Date.UTC(2025, 8, 21, 19, 54))), 0)).toBeLessThan(1); // yeni ay
    expect(gunFarki(ayEvresi(new Date(Date.UTC(1999, 0, 2, 2, 50))), 0.5)).toBeLessThan(1); // 2000 öncesi
  });
  it('0..1 arasında', () => {
    for (let i = 0; i < 100; i++) {
      const e = ayEvresi(new Date(Date.UTC(2026, 0, 1) + i * 86_400_000 * 3.7));
      expect(e).toBeGreaterThanOrEqual(0);
      expect(e).toBeLessThan(1);
    }
  });
});

describe('geriSayimMetni', () => {
  it.each([
    [0, '00:00'],
    [999, '00:01'],
    [41 * 60_000 + 7_000, '41:07'],
    [3_600_000, '1:00:00'],
    [72 * 60_000 + 5_000, '1:12:05'],
    [-5_000, '00:00'],
  ])('%p ms → %p', (ms, b) => {
    expect(geriSayimMetni(ms)).toBe(b);
  });
});
