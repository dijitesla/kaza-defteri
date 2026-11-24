import { widgetVerisi, WIDGET_SIRASI } from '../widget';
import { gununVakitleri } from '../vakitler';
import { saatMetni } from '../tarih';

const ayarlar = {
  konum: { ad: 'Fatsa, Ordu', enlem: 41.0299, boylam: 37.5013 },
  dakikaDuzeltme: { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0 },
};
const v = gununVakitleri(ayarlar.konum, '2026-11-24', ayarlar.dakikaDuzeltme);

it('altı vakit sırayla, sıradaki işaretli', () => {
  const simdi = new Date(v.ogle.getTime() + 60_000);
  const w = widgetVerisi(ayarlar, simdi);
  expect(w.satirlar.map((s) => s.anahtar)).toEqual(WIDGET_SIRASI);
  expect(w.satirlar.filter((s) => s.siradaki).map((s) => s.anahtar)).toEqual(['ikindi']);
  expect(w.siradaki).toEqual({ anahtar: 'ikindi', saat: saatMetni(v.ikindi), yarin: false });
  expect(w.konum).toBe('Fatsa, Ordu');
});

it('yatsıdan sonra sıradaki yarının imsakı, bugünün satırı işaretsiz', () => {
  const w = widgetVerisi(ayarlar, new Date(v.yatsi.getTime() + 60_000));
  expect(w.siradaki.anahtar).toBe('imsak');
  expect(w.siradaki.yarin).toBe(true);
  expect(w.satirlar.some((s) => s.siradaki)).toBe(false);
});

it('gece yarısından sonra sıradaki bugünün imsakı', () => {
  const w = widgetVerisi(ayarlar, new Date(2026, 10, 24, 1, 0));
  expect(w.siradaki).toMatchObject({ anahtar: 'imsak', yarin: false });
});
