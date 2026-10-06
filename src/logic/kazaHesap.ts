// Kaza borcu hesabı. Kaynak: docs/SPEC.md, Bölüm 4.
import type { Ayarlar, KazaVakit, Mezhep } from '../types';

/** 'YYYY-MM' biçiminde ay. */
export type Ay = string;

const AY_DESENI = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function ayGecerliMi(ay: string): boolean {
  return AY_DESENI.test(ay);
}

function ayParcala(ay: Ay): { yil: number; ay: number } {
  const m = AY_DESENI.exec(ay);
  if (!m) throw new Error(`Geçersiz ay: ${ay}`);
  return { yil: Number(m[1]), ay: Number(m[2]) };
}

export function ayOlustur(yil: number, ay: number): Ay {
  return `${yil}-${String(ay).padStart(2, '0')}`;
}

/** Verilen tarihin ayı. */
export function buAy(bugun: Date): Ay {
  return ayOlustur(bugun.getFullYear(), bugun.getMonth() + 1);
}

/** Takvim günü farkı; yaz saati kaymalarından etkilenmesin diye UTC ile hesaplanır. */
function gunFarki(y1: number, a1: number, g1: number, y2: number, a2: number, g2: number): number {
  return Math.round((Date.UTC(y2, a2 - 1, g2) - Date.UTC(y1, a1 - 1, g1)) / 86_400_000);
}

export interface HesapGirdisi {
  yukumlulukAy: Ay;
  duzenliAy: Ay | null; // null = henüz düzenli başlamadı, bitiş bugün
  mezhep: Mezhep;
  ozelGun: { acik: boolean; aydaGun: number };
}

export interface HesapSonucu {
  gunSayisi: number;
  dusulecek: number; // özel gün kapalıysa 0
  vakitBasiBorc: number;
  vakitSayisi: 5 | 6;
  toplam: number;
}

/**
 * gunSayisi: yükümlülük ayının 1. gününden bitişe kadar geçen gün, bitiş hariç.
 *   Bitiş, düzenli başlama ayının 1. günü; başlamadıysa bugün.
 * ay farkı: başlangıç ayı ile bitiş ayı arasındaki takvim ayı farkı
 *   (bitiş bugünse içinde bulunulan ay sayılmaz). SPEC örneği: 2016-09 → 2019-01 = 28 ay.
 */
export function kazaHesapla(g: HesapGirdisi, bugun: Date): HesapSonucu {
  const bas = ayParcala(g.yukumlulukAy);
  let gunSayisi: number;
  let ayFarki: number;
  if (g.duzenliAy) {
    const bit = ayParcala(g.duzenliAy);
    gunSayisi = gunFarki(bas.yil, bas.ay, 1, bit.yil, bit.ay, 1);
    ayFarki = (bit.yil - bas.yil) * 12 + (bit.ay - bas.ay);
  } else {
    const y = bugun.getFullYear();
    const a = bugun.getMonth() + 1;
    gunSayisi = gunFarki(bas.yil, bas.ay, 1, y, a, bugun.getDate());
    ayFarki = (y - bas.yil) * 12 + (a - bas.ay);
  }
  gunSayisi = Math.max(0, gunSayisi);
  ayFarki = Math.max(0, ayFarki);

  const dusulecek = g.ozelGun.acik ? g.ozelGun.aydaGun * ayFarki : 0;
  const vakitBasiBorc = Math.max(0, gunSayisi - dusulecek);
  const vakitSayisi = g.mezhep === 'hanefi' ? 6 : 5;
  return { gunSayisi, dusulecek, vakitBasiBorc, vakitSayisi, toplam: vakitBasiBorc * vakitSayisi };
}

/** Vakit bazlı borç. Şafii'de vitir 0. */
export function vakitBorclari(s: HesapSonucu): Record<KazaVakit, number> {
  const v = s.vakitBasiBorc;
  return {
    sabah: v,
    ogle: v,
    ikindi: v,
    aksam: v,
    yatsi: v,
    vitir: s.vakitSayisi === 6 ? v : 0,
  };
}

/** Türkçe binlik ayırıcı (nokta): 5112 → "5.112". */
export function sayiBicimle(n: number): string {
  const isaret = n < 0 ? '-' : '';
  return isaret + String(Math.abs(Math.trunc(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** SPEC 4.2: "852 gün × 6 vakit = 5.112" ya da "(852 gün - 196 gün) × 6 vakit = 3.936". */
export function formulMetni(s: HesapSonucu, ozelGunAcik: boolean): string {
  const gun = `${sayiBicimle(s.gunSayisi)} gün`;
  const sol = ozelGunAcik ? `(${gun} - ${sayiBicimle(s.dusulecek)} gün)` : gun;
  return `${sol} × ${s.vakitSayisi} vakit = ${sayiBicimle(s.toplam)}`;
}

export type HesapHatasi = 'hesap.hataGelecek' | 'hesap.hataSira';

/** Kurulum 2/3 doğrulaması. Hata yoksa null. */
export function hesapDogrula(
  yukumlulukAy: Ay,
  duzenliAy: Ay | null,
  bugun: Date,
): HesapHatasi | null {
  const simdi = buAy(bugun);
  // 'YYYY-MM' metinleri sözlük sırasıyla karşılaştırılabilir.
  if (yukumlulukAy > simdi || (duzenliAy !== null && duzenliAy > simdi)) return 'hesap.hataGelecek';
  if (duzenliAy !== null && yukumlulukAy > duzenliAy) return 'hesap.hataSira';
  return null;
}

export const OZEL_GUN_MIN = 1;
export const OZEL_GUN_MAX = 15;

export function aydaGunSinirla(n: number): number {
  return Math.min(OZEL_GUN_MAX, Math.max(OZEL_GUN_MIN, Math.round(n)));
}

/** Ayarlar'daki kaza bilgilerinden hesap girdisi. */
export function ayarlardanGirdi(a: Pick<Ayarlar, 'baslangic' | 'mezhep' | 'ozelGun'>): HesapGirdisi {
  return {
    yukumlulukAy: a.baslangic.yukumlulukAy,
    duzenliAy: a.baslangic.duzenliAy,
    mezhep: a.mezhep,
    ozelGun: a.ozelGun,
  };
}
