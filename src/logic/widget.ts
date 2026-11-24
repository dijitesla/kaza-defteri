// Ana ekran widget'ının içeriği: bugünün altı vakti ve sıradaki vakit. Widget çizimi src/widget/.
import type { Ayarlar } from '../types';
import { gunAnahtari, gunEkle, saatMetni } from './tarih';
import { gununVakitleri, type GununVakitleri } from './vakitler';

export const WIDGET_SIRASI: readonly (keyof GununVakitleri)[] = ['imsak', 'gunes', 'ogle', 'ikindi', 'aksam', 'yatsi'];

export interface WidgetSatiri {
  anahtar: keyof GununVakitleri;
  saat: string;
  siradaki: boolean;
}

export interface WidgetVerisi {
  konum: string;
  satirlar: WidgetSatiri[];
  /** Sıradaki vakit; bugünün vakitleri bittiyse yarının imsakı (yarin: true). */
  siradaki: { anahtar: keyof GununVakitleri; saat: string; yarin: boolean };
}

export function widgetVerisi(ayarlar: Pick<Ayarlar, 'konum' | 'dakikaDuzeltme'>, simdi: Date): WidgetVerisi {
  const bugun = gunAnahtari(simdi);
  const v = gununVakitleri(ayarlar.konum, bugun, ayarlar.dakikaDuzeltme);
  const sonraki = WIDGET_SIRASI.find((k) => v[k].getTime() > simdi.getTime());
  const siradaki = sonraki
    ? { anahtar: sonraki, saat: saatMetni(v[sonraki]), yarin: false }
    : {
        anahtar: 'imsak' as const,
        saat: saatMetni(gununVakitleri(ayarlar.konum, gunEkle(bugun, 1), ayarlar.dakikaDuzeltme).imsak),
        yarin: true,
      };
  return {
    konum: ayarlar.konum.ad,
    satirlar: WIDGET_SIRASI.map((k) => ({ anahtar: k, saat: saatMetni(v[k]), siradaki: k === sonraki })),
    siradaki,
  };
}
