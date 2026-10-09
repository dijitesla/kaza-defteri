// Kurulum sihirbazında toplanan bilgilerden kaydedilecek veriyi üretir.
import type { Ayarlar, KazaDurumu } from '../types';
import { varsayilanAyarlar } from './depolama';
import { kazaHesapla, vakitBorclari, type HesapGirdisi } from './kazaHesap';

export interface KurulumTaslagi {
  konum: Ayarlar['konum'] | null;
  hesap: HesapGirdisi | null;
  bildirim: Ayarlar['bildirim'];
}

export function bosTaslak(): KurulumTaslagi {
  return { konum: null, hesap: null, bildirim: varsayilanAyarlar().bildirim };
}

export function kurulumVerisiOlustur(
  t: KurulumTaslagi,
  bugun: Date,
): { ayarlar: Ayarlar; kaza: KazaDurumu } {
  if (!t.konum || !t.hesap) throw new Error('Kurulum taslağı eksik');
  const borc = vakitBorclari(kazaHesapla(t.hesap, bugun));
  const ayarlar: Ayarlar = {
    ...varsayilanAyarlar(),
    kurulumTamam: true,
    kurulumZamani: bugun.toISOString(),
    konum: t.konum,
    mezhep: t.hesap.mezhep,
    ozelGun: t.hesap.ozelGun,
    baslangic: { yukumlulukAy: t.hesap.yukumlulukAy, duzenliAy: t.hesap.duzenliAy },
    bildirim: t.bildirim,
  };
  return { ayarlar, kaza: { ilkBorc: { ...borc }, kalan: { ...borc }, oruc: { ilkBorc: 0, kalan: 0 } } };
}
