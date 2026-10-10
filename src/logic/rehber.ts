// Rehber ekranı yardımcıları: günün esması ve imsakiye satırları.
import { ESMA, type Esma } from '../data/esma';
import type { Ayarlar } from '../types';
import { gunNumarasi } from './hadis';
import { gunEkle } from './tarih';
import { gununVakitleri, type GununVakitleri } from './vakitler';

/** Günün esması: her gün sıradaki isim. */
export function gununEsmasi(simdi: Date, liste: readonly Esma[] = ESMA): Esma {
  const n = gunNumarasi(simdi) % liste.length;
  return liste[(n + liste.length) % liste.length];
}

/** Bugünden başlayarak `gunSayisi` günün vakitleri (imsakiye). */
export function imsakiye(
  konum: Ayarlar['konum'],
  bugun: string,
  duzeltme: Ayarlar['dakikaDuzeltme'],
  gunSayisi = 30,
): { gun: string; vakitler: GununVakitleri }[] {
  return Array.from({ length: gunSayisi }, (_, i) => {
    const gun = gunEkle(bugun, i);
    return { gun, vakitler: gununVakitleri(konum, gun, duzeltme) };
  });
}
