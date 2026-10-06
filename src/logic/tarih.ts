// Tarih yardımcıları. Tüm hesaplar telefonun yerel saatine göredir.
import { AY_ADLARI, GUN_ADLARI } from '../data/aylar';

/** 'YYYY-MM-DD' (yerel). */
export function gunAnahtari(d: Date): string {
  const a = String(d.getMonth() + 1).padStart(2, '0');
  const g = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${a}-${g}`;
}

/** Gün anahtarının yerel öğle saati (yaz saati geçişlerinden etkilenmez). */
export function gunOglesi(gun: string): Date {
  const [y, a, g] = gun.split('-').map(Number);
  return new Date(y, a - 1, g, 12, 0, 0, 0);
}

export function gunEkle(gun: string, fark: number): string {
  const d = gunOglesi(gun);
  d.setDate(d.getDate() + fark);
  return gunAnahtari(d);
}

/** "HH:mm" (yerel). */
export function saatMetni(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** "6 Ekim" */
export function gunAyMetni(gun: string): string {
  const d = gunOglesi(gun);
  return `${d.getDate()} ${AY_ADLARI[d.getMonth()]}`;
}

/** "6 Ekim, Salı" */
export function uzunTarihMetni(d: Date): string {
  return `${d.getDate()} ${AY_ADLARI[d.getMonth()]}, ${GUN_ADLARI[d.getDay()]}`;
}

/** Türkçe küçük harf: "İkindi" → "ikindi", "Işık" → "ışık". */
export function kucukHarf(s: string): string {
  return s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
}
