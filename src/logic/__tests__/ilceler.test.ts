import { ILCELER } from '../../data/ilceler';
import { ILLER } from '../../data/iller';
import { ilceAra, ilceKonumAdi } from '../ilAra';

const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  const x = Math.sin(((c - a) * r) / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(((d - b) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(x));
};

describe('ILCELER', () => {
  it('81 ilin tamamı ve 973 ilçe', () => {
    expect(Object.keys(ILCELER).sort()).toEqual(ILLER.map((i) => i.ad).sort());
    expect(Object.values(ILCELER).reduce((s, l) => s + l.length, 0)).toBe(973);
  });

  it('her ilde ilçe adları tekil', () => {
    for (const liste of Object.values(ILCELER)) {
      expect(new Set(liste.map((i) => i.ad)).size).toBe(liste.length);
    }
  });

  it('her ilçe kendi il merkezine 220 km içinde', () => {
    for (const il of ILLER) {
      for (const ilce of ILCELER[il.ad]) {
        expect(km(il.enlem, il.boylam, ilce.enlem, ilce.boylam)).toBeLessThan(220);
      }
    }
  });

  it('Ordu: 19 ilçe, Piraziz yok (Giresun ilçesi)', () => {
    const ordu = ILCELER['Ordu'].map((i) => i.ad);
    expect(ordu).toHaveLength(19);
    expect(ordu).toContain('Fatsa');
    expect(ordu).not.toContain('Piraziz');
    expect(ILCELER['Giresun'].map((i) => i.ad)).toContain('Piraziz');
  });
});

describe('ilceAra', () => {
  it('Türkçe karakter yazmadan bulur, il bilgisiyle döner', () => {
    const s = ilceAra(ILCELER, 'unye');
    expect(s[0]).toMatchObject({ il: 'Ordu', ilce: { ad: 'Ünye' } });
  });

  it('aynı adlı ilçeler farklı illerden gelir', () => {
    const iller = ilceAra(ILCELER, 'gölbaşı').filter((x) => x.ilce.ad === 'Gölbaşı').map((x) => x.il);
    expect(iller).toEqual(expect.arrayContaining(['Ankara', 'Adıyaman']));
  });

  it('Merkez ilçeleri aramada çıkmaz, boş aramada sonuç yok', () => {
    const s = ilceAra(ILCELER, 'merkez');
    expect(s.some((x) => x.ilce.ad === 'Merkez')).toBe(false);
    expect(s.map((x) => x.ilce.ad)).toContain('Merkezefendi');
    expect(ilceAra(ILCELER, '')).toEqual([]);
  });
});

describe('ilceKonumAdi', () => {
  it('biçim', () => {
    expect(ilceKonumAdi('Ordu', 'Fatsa')).toBe('Fatsa, Ordu');
    expect(ilceKonumAdi('Ordu', 'Merkez')).toBe('Ordu Merkez');
  });
});
