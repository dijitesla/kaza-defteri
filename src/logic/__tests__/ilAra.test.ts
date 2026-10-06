import { ILLER } from '../../data/iller';
import { ilAra, sadelestir } from '../ilAra';

describe('sadelestir', () => {
  it('Türkçe harfleri sadeleştirir', () => {
    expect(sadelestir('İSTANBUL')).toBe('istanbul');
    expect(sadelestir('Şanlıurfa')).toBe('sanliurfa');
    expect(sadelestir('IĞDIR')).toBe('igdir');
    expect(sadelestir(' Çorum ')).toBe('corum');
  });
});

describe('ilAra', () => {
  const ad = (aranan: string) => ilAra(ILLER, aranan).map((i) => i.ad);

  it('boş aramada tüm liste', () => {
    expect(ad('')).toHaveLength(81);
  });

  it('Türkçe karakter yazmadan bulur', () => {
    expect(ad('sanliurfa')).toEqual(['Şanlıurfa']);
    expect(ad('istanbul')).toEqual(['İstanbul']);
    expect(ad('izmir')).toEqual(['İzmir']);
  });

  it('başta eşleşenler önce gelir, sonra içinde geçenler', () => {
    const l = ad('kar');
    expect(l.slice(0, 3)).toEqual(['Karabük', 'Karaman', 'Kars']);
    expect(l.slice(3)).toEqual(['Afyonkarahisar', 'Ankara', 'Hakkari', 'Sakarya']);
  });

  it('eşleşme yoksa boş', () => {
    expect(ad('xyz')).toEqual([]);
  });
});

describe('ILLER', () => {
  it('81 il, adlar tekil', () => {
    expect(ILLER).toHaveLength(81);
    expect(new Set(ILLER.map((i) => i.ad)).size).toBe(81);
  });

  it('koordinatlar Türkiye sınırları içinde', () => {
    for (const il of ILLER) {
      expect(il.enlem).toBeGreaterThan(35.8);
      expect(il.enlem).toBeLessThan(42.2);
      expect(il.boylam).toBeGreaterThan(25.6);
      expect(il.boylam).toBeLessThan(44.9);
    }
  });
});
