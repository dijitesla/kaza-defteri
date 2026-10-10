// Dini günler ve Ramazan: tablo okuma, kalan gün, Ramazan günü ve iftar/imsak sayacı.
import { DINI_GUNLER, RAMAZANLAR, type DiniGun } from '../data/diniGunler';
import { t } from '../metinler';
import { gunOglesi } from './tarih';
import type { GununVakitleri } from './vakitler';

const GUN_MS = 86_400_000;

/** İki gün anahtarı arasındaki gün farkı (b − a). */
export function gunFarki(a: string, b: string): number {
  return Math.round((gunOglesi(b).getTime() - gunOglesi(a).getTime()) / GUN_MS);
}

/** Bugün ve sonrasındaki dini günler, tarihe göre. */
export function yaklasanGunler(bugun: string, liste: readonly DiniGun[] = DINI_GUNLER): DiniGun[] {
  return liste.filter((g) => g.tarih >= bugun).sort((x, y) => x.tarih.localeCompare(y.tarih));
}

/**
 * En yakın dini gün; aynı tarihe düşen günler tek kayıtta birleşir ("Üç Ayların Başlangıcı · Regaip Kandili").
 * Birleşen günlerden biri kandilse tür kandil sayılır (bildirim ve "bu gece" metni için).
 */
export function enYakinDiniGun(bugun: string, liste: readonly DiniGun[] = DINI_GUNLER): DiniGun | null {
  const y = yaklasanGunler(bugun, liste);
  if (y.length === 0) return null;
  const ayni = y.filter((g) => g.tarih === y[0].tarih);
  return {
    tarih: y[0].tarih,
    ad: ayni.map((g) => g.ad).join(' · '),
    tur: ayni.some((g) => g.tur === 'kandil') ? 'kandil' : y[0].tur,
  };
}

/** Bugünün dini günleri (ör. aynı gün hem Üç Aylar hem Regaip olabilir). */
export function bugunkuGunler(bugun: string, liste: readonly DiniGun[] = DINI_GUNLER): DiniGun[] {
  return liste.filter((g) => g.tarih === bugun);
}

/** Ramazan'daysa kaçıncı gün olduğu ve ayın gün sayısı; değilse null. */
export function ramazanGunu(
  gun: string,
  ramazanlar: readonly { bas: string; son: string }[] = RAMAZANLAR,
): { gun: number; toplam: number; bas: string } | null {
  const r = ramazanlar.find((x) => gun >= x.bas && gun <= x.son);
  if (!r) return null;
  return { gun: gunFarki(r.bas, gun) + 1, toplam: gunFarki(r.bas, r.son) + 1, bas: r.bas };
}

/**
 * Ramazan sayacı: oruçlu saatlerde iftara (akşam), diğer saatlerde imsaka kalan süre.
 * İftardan sonra ertesi gün de Ramazan ise ertesi günün imsakına sayar; değilse null (normal sayaç).
 */
export function ramazanSayaci(
  simdi: Date,
  bugun: GununVakitleri,
  yarin: GununVakitleri,
  bugunRamazan: boolean,
  yarinRamazan: boolean,
): { tur: 'iftar' | 'imsak'; zaman: Date } | null {
  const t = simdi.getTime();
  if (bugunRamazan) {
    if (t < bugun.imsak.getTime()) return { tur: 'imsak', zaman: bugun.imsak };
    if (t < bugun.aksam.getTime()) return { tur: 'iftar', zaman: bugun.aksam };
  }
  // Ramazan arifesinde ilk sahur sayacı yatsıdan sonra başlar.
  const esik = bugunRamazan ? bugun.aksam : bugun.yatsi;
  if (yarinRamazan && t >= esik.getTime()) {
    return { tur: 'imsak', zaman: yarin.imsak };
  }
  return null;
}

/** Kalan gün metni: bugün, yarın ya da "n gün kaldı"; kandiller için "bu gece". */
export function kalanGunMetni(fark: number, kandil: boolean): string {
  if (fark === 0) return kandil ? t('rehber.buGece') : t('rehber.bugun');
  if (fark === 1) return t('rehber.yarin');
  return t('rehber.kalanGun', { n: fark });
}
