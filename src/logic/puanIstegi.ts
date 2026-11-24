// Play Store puan penceresinin ne zaman bir kez gösterileceğine karar verir.
// Kullanıcı uygulamayı birkaç gün gerçekten kullandıktan sonra sorulur; bir kez sorulduktan sonra bir daha sorulmaz
// (Play zaten pencereyi sınırlar, ama gereksiz denemeyi de istemiyoruz).
import type { GunlukDurum, Islem } from '../types';

export const PUAN_EN_AZ_GUN = 5; // kurulumdan bu yana geçen gün
export const PUAN_EN_AZ_KAZA = 10; // kılınan kaza namazı
export const PUAN_EN_AZ_AKTIF_GUN = 4; // en az bir vaktin "kıldım" işaretlendiği gün

export interface PuanDurumu {
  istendi: string | null; // ISO; pencere denendiği an
}

export const bosPuanDurumu = (): PuanDurumu => ({ istendi: null });

export function puanDurumunuTamamla(ham: unknown): PuanDurumu {
  const d = ham as Partial<PuanDurumu> | null | undefined;
  return { istendi: typeof d?.istendi === 'string' ? d.istendi : null };
}

/** Kılınan kaza sayısı; geri alınan işlemler düşülür. */
export function kilinanKazaSayisi(islemler: Islem[]): number {
  const geriAlinan = new Set(islemler.filter((i) => i.tur === 'geri_alindi' && i.geriAlinanId).map((i) => i.geriAlinanId));
  return islemler.filter((i) => i.tur === 'kaza_kilindi' && !geriAlinan.has(i.id)).length;
}

/** En az bir vaktin kılındı olarak işaretlendiği gün sayısı. */
export function aktifGunSayisi(gunluk: GunlukDurum): number {
  return Object.values(gunluk).filter((g) => Object.values(g).some((d) => d === 'kilindi')).length;
}

export function puanIstenmeli(p: {
  durum: PuanDurumu;
  kurulumZamani: string | undefined;
  simdi: Date;
  islemler: Islem[];
  gunluk: GunlukDurum;
}): boolean {
  if (p.durum.istendi || !p.kurulumZamani) return false;
  const kurulum = new Date(p.kurulumZamani).getTime();
  if (Number.isNaN(kurulum)) return false;
  const gecenGun = (p.simdi.getTime() - kurulum) / 86_400_000;
  if (gecenGun < PUAN_EN_AZ_GUN) return false;
  return kilinanKazaSayisi(p.islemler) >= PUAN_EN_AZ_KAZA || aktifGunSayisi(p.gunluk) >= PUAN_EN_AZ_AKTIF_GUN;
}
