import { teravihDegistir, teravihiTamamla, teravihSayisi } from '../teravih';

it('teravihiTamamla bozuk ve tekrarlı veriyi temizler', () => {
  expect(teravihiTamamla(undefined)).toEqual([]);
  expect(teravihiTamamla(['2027-02-10', 'x', 5, '2027-02-09', '2027-02-10'])).toEqual(['2027-02-09', '2027-02-10']);
});

it('teravihDegistir işaretler ve kaldırır', () => {
  const a = teravihDegistir([], '2027-02-10');
  expect(a).toEqual(['2027-02-10']);
  expect(teravihDegistir(a, '2027-02-08')).toEqual(['2027-02-08', '2027-02-10']);
  expect(teravihDegistir(a, '2027-02-10')).toEqual([]);
});

it('teravihSayisi yalnızca o Ramazan aralığını sayar', () => {
  const l = ['2026-03-01', '2027-02-08', '2027-02-20', '2027-03-08', '2027-03-09'];
  expect(teravihSayisi(l, '2027-02-08', '2027-03-08')).toBe(3);
});
