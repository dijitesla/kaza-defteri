import { t } from '../../metinler';

describe('t', () => {
  it('metni döner', () => {
    expect(t('sekme.bugun')).toBe('Bugün');
  });

  it('değişkenleri doldurur', () => {
    expect(t('kurulum.adim', { n: 2 })).toBe('Kurulum, 2 / 3');
    expect(t('kaza.kaydedildi', { Vakit: 'Sabah' })).toBe('Sabah kazası kaydedildi');
  });

  it('verilmeyen değişkene dokunmaz', () => {
    expect(t('kaza.toplam', {})).toBe('Toplam kalan: {n}');
  });
});
