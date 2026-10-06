import { gunAnahtari, gunAyMetni, gunEkle, kucukHarf, saatMetni, uzunTarihMetni } from '../tarih';

describe('tarih', () => {
  it('gunAnahtari ve gunEkle', () => {
    expect(gunAnahtari(new Date(2024, 0, 5, 23, 59))).toBe('2024-01-05');
    expect(gunEkle('2024-03-01', -1)).toBe('2024-02-29');
    expect(gunEkle('2024-12-31', 1)).toBe('2025-01-01');
    expect(gunEkle('2025-03-30', 1)).toBe('2025-03-31'); // yaz saati geçişi (eski kural) etkilemez
  });

  it('metinler', () => {
    expect(saatMetni(new Date(2024, 0, 1, 5, 7))).toBe('05:07');
    expect(gunAyMetni('2026-10-06')).toBe('6 Ekim');
    expect(uzunTarihMetni(new Date(2026, 9, 6))).toBe('6 Ekim, Salı');
  });

  it('kucukHarf', () => {
    expect(kucukHarf('İkindi')).toBe('ikindi');
    expect(kucukHarf('Yatsı')).toBe('yatsı');
    expect(kucukHarf('ILIK')).toBe('ılık');
  });
});
