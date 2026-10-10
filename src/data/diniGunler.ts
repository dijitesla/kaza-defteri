// Dini günler. Kaynak: Diyanet İşleri Başkanlığı 2027 dini günler takvimi (Ağustos 2026'da yayımlandı; Diyanet'i
// kaynak gösteren haberlerden derlendi). Kandiller gecenin başladığı (akşamki) tarihle yazılır.
// Diyanet her yılın takvimini yayımlayınca bu tabloya eklenmelidir; tabloda olmayan yıllar için gösterim yapılmaz.

export type DiniGunTuru = 'kandil' | 'bayram' | 'arefe' | 'ramazan' | 'gun';

export interface DiniGun {
  tarih: string; // 'YYYY-MM-DD'
  ad: string;
  tur: DiniGunTuru;
}

export const DINI_GUNLER: readonly DiniGun[] = [
  { tarih: '2026-12-10', ad: 'Üç Ayların Başlangıcı', tur: 'gun' },
  { tarih: '2026-12-10', ad: 'Regaip Kandili', tur: 'kandil' },
  { tarih: '2027-01-04', ad: 'Miraç Kandili', tur: 'kandil' },
  { tarih: '2027-01-22', ad: 'Berat Kandili', tur: 'kandil' },
  { tarih: '2027-02-08', ad: 'Ramazan Başlangıcı', tur: 'ramazan' },
  { tarih: '2027-03-05', ad: 'Kadir Gecesi', tur: 'kandil' },
  { tarih: '2027-03-08', ad: 'Ramazan Bayramı Arefesi', tur: 'arefe' },
  { tarih: '2027-03-09', ad: 'Ramazan Bayramı 1. Gün', tur: 'bayram' },
  { tarih: '2027-03-10', ad: 'Ramazan Bayramı 2. Gün', tur: 'bayram' },
  { tarih: '2027-03-11', ad: 'Ramazan Bayramı 3. Gün', tur: 'bayram' },
  { tarih: '2027-05-15', ad: 'Kurban Bayramı Arefesi', tur: 'arefe' },
  { tarih: '2027-05-16', ad: 'Kurban Bayramı 1. Gün', tur: 'bayram' },
  { tarih: '2027-05-17', ad: 'Kurban Bayramı 2. Gün', tur: 'bayram' },
  { tarih: '2027-05-18', ad: 'Kurban Bayramı 3. Gün', tur: 'bayram' },
  { tarih: '2027-05-19', ad: 'Kurban Bayramı 4. Gün', tur: 'bayram' },
  { tarih: '2027-06-06', ad: 'Hicri Yılbaşı', tur: 'gun' },
  { tarih: '2027-06-15', ad: 'Aşure Günü', tur: 'gun' },
  { tarih: '2027-08-13', ad: 'Mevlid Kandili', tur: 'kandil' },
  { tarih: '2027-11-29', ad: 'Üç Ayların Başlangıcı', tur: 'gun' },
  { tarih: '2027-12-02', ad: 'Regaip Kandili', tur: 'kandil' },
  { tarih: '2027-12-24', ad: 'Miraç Kandili', tur: 'kandil' },
];

/** Ramazan ayları: ilk ve son oruç günü (Diyanet takvimi). */
export const RAMAZANLAR: readonly { bas: string; son: string }[] = [{ bas: '2027-02-08', son: '2027-03-08' }];
