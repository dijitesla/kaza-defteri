// Geçmiş ekranındaki ay takvimi: ay ızgarası ve her günün durumu.
import type { GunlukDurum } from '../types';
import { VAKITLER } from '../types';
import { gunAnahtari } from './tarih';

/**
 * Günün takvim rengi:
 * tam: beş vakit kılındı; muaf: kılındı ya da özel hal (en az biri özel hal);
 * kilinamadi: en az bir vakit kılınamadı; kismi: bazı vakitler kılındı; bos: kayıt yok.
 */
export type GunRengi = 'tam' | 'kismi' | 'kilinamadi' | 'muaf' | 'bos';

export function gunRengi(gunluk: GunlukDurum, gun: string): GunRengi {
  const g = gunluk[gun];
  if (!g) return 'bos';
  const durumlar = VAKITLER.map((v) => g[v]);
  if (durumlar.includes('kilinamadi')) return 'kilinamadi';
  const tamam = durumlar.every((d) => d === 'kilindi' || d === 'muaf');
  if (tamam) return durumlar.includes('muaf') ? 'muaf' : 'tam';
  if (durumlar.includes('kilindi')) return 'kismi';
  if (durumlar.includes('muaf')) return 'muaf';
  return 'bos';
}

/**
 * Ayın haftaları, Pazartesi'den başlayarak. Her hücre 'YYYY-MM-DD' ya da ay dışı için null.
 * `ay` 0 tabanlı (Ocak = 0).
 */
export function ayIzgarasi(yil: number, ay: number): (string | null)[][] {
  const ilk = new Date(yil, ay, 1, 12);
  const gunSayisi = new Date(yil, ay + 1, 0, 12).getDate();
  const bosluk = (ilk.getDay() + 6) % 7; // Pazartesi = 0
  const hucreler: (string | null)[] = Array(bosluk).fill(null);
  for (let g = 1; g <= gunSayisi; g++) hucreler.push(gunAnahtari(new Date(yil, ay, g, 12)));
  while (hucreler.length % 7) hucreler.push(null);
  const haftalar: (string | null)[][] = [];
  for (let i = 0; i < hucreler.length; i += 7) haftalar.push(hucreler.slice(i, i + 7));
  return haftalar;
}

/** Bir sonraki/önceki ay: { yil, ay } (ay 0 tabanlı). */
export function ayKaydir(yil: number, ay: number, fark: number): { yil: number; ay: number } {
  const d = new Date(yil, ay + fark, 1);
  return { yil: d.getFullYear(), ay: d.getMonth() };
}
