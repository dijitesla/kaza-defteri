// Gökyüzü görünümü: günün evresi, güneş/ay konumu, ayın evresi ve saniyeli geri sayım.
import type { GununVakitleri } from './vakitler';

export type GunEvresi = 'gece' | 'safak' | 'gunduz' | 'ikindi' | 'aksam';

/**
 * Günün evresi (bugünün vakitlerine göre):
 * gece: yatsıdan imsaka, şafak: imsaktan güneşe, gündüz: güneşten ikindiye,
 * ikindi: ikindiden akşama, akşam: akşamdan yatsıya.
 */
export function gunEvresi(simdi: Date, v: GununVakitleri): GunEvresi {
  const t = simdi.getTime();
  if (t < v.imsak.getTime() || t >= v.yatsi.getTime()) return 'gece';
  if (t < v.gunes.getTime()) return 'safak';
  if (t < v.ikindi.getTime()) return 'gunduz';
  if (t < v.aksam.getTime()) return 'ikindi';
  return 'aksam';
}

/** Gün yayının başı ve sonu (0..1). */
export const YAY_BAS = 0.05;
export const YAY_SON = 0.95;

/**
 * Beş vaktin yay üzerindeki sabit, eşit aralıklı yerleri (sabah, öğle, ikindi, akşam, yatsı).
 * Gerçek saatlerle orantılı yerleştirilse akşam ile yatsı etiketleri üst üste binerdi.
 */
export const VAKIT_NOKTALARI = [YAY_BAS, 0.275, 0.5, 0.725, YAY_SON] as const;

/**
 * Bir zamanın gün yayındaki yeri: iki vakit arasında, o iki vaktin noktaları arasında
 * geçen süreyle orantılı. İmsaktan önce başa, yatsıdan sonra sona sabitlenir.
 */
export function yayKonumu(zaman: Date, v: GununVakitleri): number {
  const zamanlar = [v.imsak, v.ogle, v.ikindi, v.aksam, v.yatsi].map((d) => d.getTime());
  const t = zaman.getTime();
  if (t <= zamanlar[0]) return VAKIT_NOKTALARI[0];
  for (let i = 0; i < zamanlar.length - 1; i++) {
    if (t < zamanlar[i + 1]) {
      const oran = (t - zamanlar[i]) / (zamanlar[i + 1] - zamanlar[i]);
      return VAKIT_NOKTALARI[i] + oran * (VAKIT_NOKTALARI[i + 1] - VAKIT_NOKTALARI[i]);
    }
  }
  return VAKIT_NOKTALARI[4];
}

export interface GokCismi {
  tur: 'gunes' | 'ay';
  konum: number; // yay üzerinde 0..1
}

/**
 * Yay üzerindeki gök cismi. Güneş doğuştan batışa (güneş → akşam vakti) yay üzerinde ilerler.
 * Geri kalan zamanda ay görünür: imsak–güneş ve akşam–yatsı arasında vakit noktalarıyla aynı
 * ölçekte, gece ise (yatsı → ertesi imsak) yayın başından sonuna doğru ilerler.
 */
export function gokCismi(simdi: Date, bugun: GununVakitleri, yarin: GununVakitleri, dun: GununVakitleri): GokCismi {
  const t = simdi.getTime();
  if (t >= bugun.gunes.getTime() && t < bugun.aksam.getTime()) {
    return { tur: 'gunes', konum: yayKonumu(simdi, bugun) };
  }
  if (t >= bugun.imsak.getTime() && t < bugun.yatsi.getTime()) {
    return { tur: 'ay', konum: yayKonumu(simdi, bugun) };
  }
  // Gece: yatsıdan sonraki imsaka kadar.
  const [bas, son] =
    t >= bugun.yatsi.getTime() ? [bugun.yatsi, yarin.imsak] : [dun.yatsi, bugun.imsak];
  const oran = (t - bas.getTime()) / (son.getTime() - bas.getTime());
  return { tur: 'ay', konum: YAY_BAS + Math.min(1, Math.max(0, oran)) * (YAY_SON - YAY_BAS) };
}

/** Ortalama kavuşum ayı (gün) ve bilinen bir yeni ay anı (6 Ocak 2000, 18:14 UTC). */
const KAVUSUM_GUN = 29.530588853;
const BILINEN_YENI_AY = Date.UTC(2000, 0, 6, 18, 14);

/** Ayın evresi: 0 yeni ay, 0,5 dolunay, 1'e doğru yeniden yeni ay. Yaklaşık (±1 gün). */
export function ayEvresi(zaman: Date): number {
  const gun = (zaman.getTime() - BILINEN_YENI_AY) / 86_400_000;
  const e = (gun / KAVUSUM_GUN) % 1;
  return e < 0 ? e + 1 : e;
}

/** Saniyeli geri sayım: 1 saatten azsa "MM:SS", fazlaysa "S:MM:SS". */
export function geriSayimMetni(ms: number): string {
  const toplam = Math.max(0, Math.ceil(ms / 1000));
  const sa = Math.floor(toplam / 3600);
  const dk = Math.floor((toplam % 3600) / 60);
  const sn = toplam % 60;
  const iki = (n: number) => String(n).padStart(2, '0');
  return sa > 0 ? `${sa}:${iki(dk)}:${iki(sn)}` : `${iki(dk)}:${iki(sn)}`;
}
