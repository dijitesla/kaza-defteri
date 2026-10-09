// Günlük vakit durumları. Kaynak: docs/SPEC.md, Bölüm 2.4 ve 3.
import type { GunlukDurum, Vakit, VakitDurumu } from '../types';
import { VAKITLER } from '../types';
import { gunEkle } from './tarih';
import type { VakitAraligi } from './vakitler';

export const CEVAPSIZ_GUN_SAYISI = 3;

/** Gün yayında gösterilen durum. */
export type YayDurumu = 'kilindi' | 'kilinamadi' | 'muaf' | 'siradaki' | 'gelecek' | 'devam' | 'cevapsiz';

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
  if (d === 'kilindi' || d === 'kilinamadi' || d === 'muaf' || d === 'cevapsiz') return d;
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

/**
 * Özel hal günü: açılınca günün cevaplanmamış (ve henüz gelmemiş) vakitleri "muaf" olur;
 * kapanınca o günün "muaf" kayıtları silinir. Kılındı/kılınamadı cevaplarına dokunulmaz.
 * Borcu değiştirmez.
 */
export function ozelHalGunu(gunluk: GunlukDurum, gun: string, acik: boolean): GunlukDurum {
  const once = gunluk[gun] ?? {};
  const sonra: Partial<Record<Vakit, VakitDurumu>> = {};
  for (const v of VAKITLER) {
    const d = once[v];
    if (d === 'kilindi' || d === 'kilinamadi') sonra[v] = d;
    else if (acik) sonra[v] = 'muaf';
    else if (d && d !== 'muaf') sonra[v] = d;
  }
  return { ...gunluk, [gun]: sonra };
}

/** Günde en az bir "muaf" vakit var mı (özel hal günü düğmesinin durumu). */
export function ozelHalVar(gunluk: GunlukDurum, gun: string): boolean {
  const g = gunluk[gun];
  return !!g && VAKITLER.some((v) => g[v] === 'muaf');
}

/**
 * "Kıldım" (ya da özel hal) işaretini kaldırır. Borcu değiştirmeyen cevaplar için geçerlidir;
 * "kılınamadı" kayıt defterinden geri alınır, burada değişmez.
 */
export function cevabiKaldir(gunluk: GunlukDurum, gun: string, vakit: Vakit): GunlukDurum {
  const d = gunluk[gun]?.[vakit];
  if (d !== 'kilindi' && d !== 'muaf') return gunluk;
  const { [vakit]: _silinen, ...kalan } = gunluk[gun];
  return { ...gunluk, [gun]: kalan };
}
