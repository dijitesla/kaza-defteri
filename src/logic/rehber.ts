// Rehber ekranı yardımcıları: günün esması ve imsakiye satırları.
import { ESMA, type Esma } from '../data/esma';
import type { Ayarlar } from '../types';
import { gunNumarasi } from './hadis';
import { gunAyMetni, gunEkle, saatMetni } from './tarih';
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

/** İmsakiyeyi mesajla paylaşmak için düz metin: başlık, her gün imsak ve iftar (akşam), son satır. */
export function imsakiyeMetni(
  satirlar: { gun: string; vakitler: GununVakitleri }[],
  p: { baslik: string; satir: (s: { tarih: string; imsak: string; iftar: string }) => string; son: string },
): string {
  const govde = satirlar.map(({ gun, vakitler }) =>
    p.satir({ tarih: gunAyMetni(gun), imsak: saatMetni(vakitler.imsak), iftar: saatMetni(vakitler.aksam) }),
  );
  return [p.baslik, '', ...govde, '', p.son].join('\n');
}
