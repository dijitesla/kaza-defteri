// Hadis seçimi: ana ekranda saatte bir, Vakitler ekranında ve vakit bildiriminde vakit girince değişir.
import { HADISLER, type Hadis } from '../data/hadisler';
import type { Vakit } from '../types';
import { VAKITLER } from '../types';
import { gunAnahtari, gunOglesi } from './tarih';
import type { GununVakitleri } from './vakitler';

const GUN_MS = 86_400_000;

/** Yerel takvim günü sayısı (1970'ten beri); yaz saati geçişlerinden etkilenmez. */
export function gunNumarasi(d: Date): number {
  return Math.round(gunOglesi(gunAnahtari(d)).getTime() / GUN_MS);
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Ana ekran hadisi: her saat başı sıradaki hadis. Liste bitmeden aynı hadis tekrar gelmez. */
export function saatlikHadis(simdi: Date, liste: readonly Hadis[] = HADISLER): Hadis {
  return liste[mod(gunNumarasi(simdi) * 24 + simdi.getHours(), liste.length)];
}

/**
 * Bir vaktin hadisi: o vakte ayrılmış hadisler ve genel hadisler arasından, vaktin giriş gününe göre.
 * Aynı vakit için gün boyunca (bildirimde ve ekranda) aynı hadis seçilir.
 */
export function vakitHadisi(vakit: Vakit, giris: Date, liste: readonly Hadis[] = HADISLER): Hadis {
  const havuz = liste.filter((h) => h.vakitler.length === 0 || h.vakitler.includes(vakit));
  const secilen = havuz.length > 0 ? havuz : liste;
  return secilen[mod(gunNumarasi(giris) + VAKITLER.indexOf(vakit) * 7, secilen.length)];
}

/**
 * İçinde bulunulan vaktin adı ve girişi. Güneş doğduktan öğleye kadar sabahın hadisi sürer,
 * imsaktan önce dünün yatsısı sürer.
 */
export function simdikiVakit(simdi: Date, bugun: GununVakitleri, dun: GununVakitleri): { vakit: Vakit; giris: Date } {
  const t = simdi.getTime();
  if (t < bugun.imsak.getTime()) return { vakit: 'yatsi', giris: dun.yatsi };
  let sonuc: { vakit: Vakit; giris: Date } = { vakit: 'sabah', giris: bugun.imsak };
  for (const vakit of VAKITLER) {
    const giris = vakit === 'sabah' ? bugun.imsak : bugun[vakit];
    if (giris.getTime() <= t) sonuc = { vakit, giris };
  }
  return sonuc;
}
