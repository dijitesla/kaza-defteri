// Renk, yazı tipi ve ölçüler. Kaynak: docs/SPEC.md, Bölüm 8.
import { Appearance, type TextStyle } from 'react-native';

// Açık ve koyu palet aynı anahtarlara sahiptir. Uygulama açılırken telefonun temasına göre seçilir
// (stiller modül yüklenirken oluştuğu için tema değişikliği bir sonraki açılışta uygulanır).
const ACIK = {
  gece: '#1C2541', // marka laciverti: koyu kartlar, birincil düğme
  metin: '#1C2541', // ana metin
  beyaz: '#FFFFFF', // koyu yüzeyler üstündeki metin
  altinUstu: '#1C2541', // altın düğme üstündeki metin (iki temada da koyu)
  altin: '#D4A853',
  zemin: '#EEF1F4',
  kart: '#FFFFFF',
  onay: '#2E7D5B',
  kilinamadi: '#B5523B',
  uyariZemin: '#FBF1DC',
  uyariMetin: '#6E4A12',
  ikincilMetin: '#6B7286',
  sekmePasif: '#8A90A0', // docs/tasarim.html, .nav span
  koyuUstuSoluk: '#C9CFE0', // koyu kart üstündeki ikincil metin
  onayZemin: '#E3F1EA',
  kilinamadiZemin: '#F6E5E0',
  muaf: '#6E4FA0',
  muafZemin: '#E9E1F3',
  kismiZemin: '#F3E3B5',
  pasifZemin: '#ECEEF2',
  pasifCizgi: '#D3D8E1',
  pasifSimge: '#AEB4C0',
  altinZemin: 'rgba(212,168,83,0.18)',
  yayCizgi: '#E6EAF0',
  yayEtiket: '#3B4152',
  perde: 'rgba(28,37,65,0.45)',
  seciliSatir: '#F6F8FA',
  formulZemin: '#FBF8F1',
  formulCizgi: '#B9A06A',
  formulMetin: '#5A5040',
  vurguMavi: '#4B5A9A',
  vurguMaviZemin: '#E6E9F5',
  vurguSari: '#A57C22',
  vurguSariZemin: '#F7EEDA',
  oruc: '#2C7A8C',
  orucZemin: '#E0F0F3',
  alev: '#E0604A',
  alevZemin: 'rgba(224,96,74,0.14)',
  desen: 'rgba(28,37,65,0.045)',
};

const KOYU: typeof ACIK = {
  gece: '#26325C',
  metin: '#E8EBF3',
  beyaz: '#FFFFFF',
  altinUstu: '#1C2541',
  altin: '#DDB665',
  zemin: '#0E1326',
  kart: '#182039',
  onay: '#4DB088',
  kilinamadi: '#E3826B',
  uyariZemin: '#3A2F17',
  uyariMetin: '#F1D9A6',
  ikincilMetin: '#9BA4B9',
  sekmePasif: '#7E879C',
  koyuUstuSoluk: '#B9C1D6',
  onayZemin: '#1D3A30',
  kilinamadiZemin: '#43261F',
  muaf: '#BBA0E4',
  muafZemin: '#2F2747',
  kismiZemin: '#4A3E17',
  pasifZemin: '#232B48',
  pasifCizgi: '#323B5C',
  pasifSimge: '#5D6684',
  altinZemin: 'rgba(221,182,101,0.16)',
  yayCizgi: '#2A3354',
  yayEtiket: '#C9CFDD',
  perde: 'rgba(0,0,0,0.6)',
  seciliSatir: '#202945',
  formulZemin: '#2A2618',
  formulCizgi: '#8C7A4E',
  formulMetin: '#E3D8BD',
  vurguMavi: '#98A6E6',
  vurguMaviZemin: '#262F52',
  vurguSari: '#E1BB62',
  vurguSariZemin: '#3A3119',
  oruc: '#6BC3D6',
  orucZemin: '#183640',
  alev: '#F08068',
  alevZemin: 'rgba(240,128,104,0.16)',
  desen: 'rgba(221,182,101,0.05)',
};

export const koyuTema = Appearance.getColorScheme() === 'dark';
export const renk = koyuTema ? KOYU : ACIK;

// useFonts ile yüklenen adlar (src/app/_layout.tsx).
export const yaziTipi = {
  baslik: 'Lora_600SemiBold',
  normal: 'Poppins_400Regular',
  kalin: 'Poppins_600SemiBold',
} as const;

export const olcu = {
  ekranBosluk: 16,
  kartYaricap: 14,
  dugmeYaricap: 11,
  dokunmaMin: 44,
} as const;

// Büyük sayılar (kalan kaza, geri sayım) için.
export const buyukSayi: TextStyle = {
  fontFamily: yaziTipi.baslik,
  fontVariant: ['tabular-nums'],
  color: renk.metin,
};
