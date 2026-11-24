import { YURT_DISI } from '../../data/yurtdisi';
import { gununVakitleri } from '../vakitler';

const duzeltme = { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0 };

describe('yurt dışı şehirler', () => {
  const sehirler = Object.entries(YURT_DISI).flatMap(([ulke, l]) => l.map((s) => ({ ulke, ...s })));

  it('her şehrin koordinatı Avrupa ya da Kıbrıs sınırları içinde, adlar ülke içinde tekil', () => {
    for (const s of sehirler) {
      expect(s.enlem).toBeGreaterThan(34);
      expect(s.enlem).toBeLessThan(61);
      expect(s.boylam).toBeGreaterThan(-6);
      expect(s.boylam).toBeLessThan(35);
    }
    for (const l of Object.values(YURT_DISI)) expect(new Set(l.map((s) => s.ad)).size).toBe(l.length);
  });

  it.each(['2027-06-21', '2027-12-21', '2027-03-20'])('%s günü bütün vakitler geçerli ve sıralı', (gun) => {
    for (const s of sehirler) {
      const v = gununVakitleri({ ad: s.ad, enlem: s.enlem, boylam: s.boylam }, gun, duzeltme);
      const sira = [v.imsak, v.gunes, v.ogle, v.ikindi, v.aksam, v.yatsi].map((z) => z.getTime());
      for (const z of sira) expect(Number.isFinite(z)).toBe(true);
      for (let i = 1; i < sira.length; i++) expect(sira[i]).toBeGreaterThan(sira[i - 1]);
    }
  });
});
