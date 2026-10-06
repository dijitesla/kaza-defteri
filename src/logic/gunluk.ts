// Günlük vakit durumları. Kaynak: docs/SPEC.md, Bölüm 2.4 ve 3.
import type { GunlukDurum, Vakit, VakitDurumu } from '../types';
import { VAKITLER } from '../types';
import { gunEkle } from './tarih';
import type { VakitAraligi } from './vakitler';

export const CEVAPSIZ_GUN_SAYISI = 3;

/** Gün yayında gösterilen durum. */
export type YayDurumu = 'kilindi' | 'kilinamadi' | 'siradaki' | 'gelecek' | 'devam' | 'cevapsiz';

/** Kayıtlı durum; vakit çıkmış ve kayıt yoksa 'cevapsiz' (kaydedilmez, okurken türetilir). */
export function vakitDurumu(
  gunluk: GunlukDurum,
  gun: string,
  vakit: Vakit,
  cikis: Date,
  simdi: Date,
): VakitDurumu | null {
  const kayit = gunluk[gun]?.[vakit];
  if (kayit && kayit !== 'cevapsiz') return kayit;
  return simdi.getTime() >= cikis.getTime() ? 'cevapsiz' : null;
}

export function yayDurumu(
  gunluk: GunlukDurum,
  gun: string,
  vakit: Vakit,
  aralik: VakitAraligi,
  simdi: Date,
  siradaki: boolean,
): YayDurumu {
  const d = vakitDurumu(gunluk, gun, vakit, aralik.cikis, simdi);
  if (d === 'kilindi' || d === 'kilinamadi' || d === 'cevapsiz') return d;
  if (siradaki) return 'siradaki';
  return simdi.getTime() >= aralik.giris.getTime() ? 'devam' : 'gelecek';
}

export interface CevapsizVakit {
  gun: string;
  vakit: Vakit;
}

/**
 * Son 3 gündeki (bugün dahil) cevapsız vakitler, en eskiden yeniye.
 * Kurulumdan önce çıkmış vakitler sayılmaz. Daha eski cevapsızlar hiç gösterilmez.
 */
export function cevapsizVakitler(
  gunluk: GunlukDurum,
  bugun: string,
  simdi: Date,
  araliklar: (gun: string) => Record<Vakit, VakitAraligi>,
  kurulumZamani: Date | null,
): CevapsizVakit[] {
  const sonuc: CevapsizVakit[] = [];
  for (let fark = CEVAPSIZ_GUN_SAYISI - 1; fark >= 0; fark--) {
    const gun = gunEkle(bugun, -fark);
    const a = araliklar(gun);
    for (const vakit of VAKITLER) {
      const { cikis } = a[vakit];
      if (kurulumZamani && cikis.getTime() <= kurulumZamani.getTime()) continue;
      if (vakitDurumu(gunluk, gun, vakit, cikis, simdi) === 'cevapsiz') sonuc.push({ gun, vakit });
    }
  }
  return sonuc;
}
