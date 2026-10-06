// Renk, yazı tipi ve ölçüler. Kaynak: docs/SPEC.md, Bölüm 8.
import type { TextStyle } from 'react-native';

export const renk = {
  gece: '#1C2541',
  altin: '#D4A853',
  zemin: '#EEF1F4',
  kart: '#FFFFFF',
  onay: '#2E7D5B',
  kilinamadi: '#B5523B',
  uyariZemin: '#FBF1DC',
  uyariMetin: '#6E4A12',
  ikincilMetin: '#6B7286',
  sekmePasif: '#8A90A0', // docs/tasarim.html, .nav span
} as const;

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
  color: renk.gece,
};
