// Yedek dosyası: oluşturma ve doğrulama. Kaynak: docs/SPEC.md, Bölüm 7.
import type { Ayarlar, GunlukDurum, Islem, KazaDurumu, VakitDurumu } from '../types';
import { KAZA_VAKITLERI, VAKITLER } from '../types';
import { ayarlariTamamla, ISLEM_SINIRI, orucuTamamla } from './depolama';
import { gunAnahtari } from './tarih';

export const YEDEK_SURUMU = 1;

export interface Yedek {
  surum: typeof YEDEK_SURUMU;
  tarih: string; // ISO
  ayarlar: Ayarlar;
  kaza: KazaDurumu;
  gunluk: GunlukDurum;
  islemler: Islem[];
}

export interface YedekVerisi {
  ayarlar: Ayarlar;
  kaza: KazaDurumu;
  gunluk: GunlukDurum;
  islemler: Islem[];
}

export function yedekOlustur(v: YedekVerisi, simdi: Date): Yedek {
  return { surum: YEDEK_SURUMU, tarih: simdi.toISOString(), ...v };
}

export function yedekDosyaAdi(simdi: Date): string {
  return `kaza-defteri-yedek-${gunAnahtari(simdi)}.json`;
}

const nesneMi = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null && !Array.isArray(x);

const sayiMi = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x) && x >= 0;

function kazaKaydi(x: unknown): x is Record<string, number> {
  return nesneMi(x) && KAZA_VAKITLERI.every((v) => sayiMi(x[v]));
}

const DURUMLAR: readonly VakitDurumu[] = ['kilindi', 'kilinamadi', 'cevapsiz', 'muaf'];
const ISLEM_TURLERI: readonly Islem['tur'][] = [
  'kaza_kilindi',
  'kilinamadi',
  'manuel_duzeltme',
  'yeniden_hesap',
  'geri_alindi',
  'oruc_tutuldu',
  'oruc_duzeltme',
];

function gunlukGecerli(x: unknown): x is GunlukDurum {
  if (!nesneMi(x)) return false;
  return Object.entries(x).every(
    ([gun, d]) =>
      /^\d{4}-\d{2}-\d{2}$/.test(gun) &&
      nesneMi(d) &&
      Object.entries(d).every(
        ([v, s]) => VAKITLER.includes(v as never) && DURUMLAR.includes(s as VakitDurumu),
      ),
  );
}

function islemGecerli(x: unknown): x is Islem {
  return (
    nesneMi(x) &&
    typeof x.id === 'string' &&
    typeof x.zaman === 'string' &&
    !Number.isNaN(Date.parse(x.zaman)) &&
    ISLEM_TURLERI.includes(x.tur as Islem['tur']) &&
    nesneMi(x.degisim)
  );
}

/**
 * Dosya içeriğini doğrular. Geçerliyse yüklenecek veriyi, değilse null döner
 * (çağıran mevcut veriye dokunmaz).
 */
export function yedekDogrula(metin: string): { veri: YedekVerisi; tarih: string } | null {
  let x: unknown;
  try {
    x = JSON.parse(metin);
  } catch {
    return null;
  }
  if (!nesneMi(x) || x.surum !== YEDEK_SURUMU) return null;
  if (typeof x.tarih !== 'string' || Number.isNaN(Date.parse(x.tarih))) return null;
  if (!nesneMi(x.ayarlar) || !nesneMi(x.ayarlar.konum)) return null;
  const konum = x.ayarlar.konum;
  if (typeof konum.ad !== 'string' || typeof konum.enlem !== 'number' || typeof konum.boylam !== 'number') return null;
  if (!nesneMi(x.kaza) || !kazaKaydi(x.kaza.ilkBorc) || !kazaKaydi(x.kaza.kalan)) return null;
  if (!gunlukGecerli(x.gunluk)) return null;
  if (!Array.isArray(x.islemler) || !x.islemler.every(islemGecerli)) return null;

  const kaza = x.kaza as unknown as KazaDurumu;
  return {
    tarih: x.tarih,
    veri: {
      ayarlar: ayarlariTamamla(x.ayarlar),
      // Sürüm 1.3'ten eski yedeklerde oruç kaydı yoktur; sıfır sayılır.
      kaza: { ilkBorc: { ...kaza.ilkBorc }, kalan: { ...kaza.kalan }, oruc: orucuTamamla(kaza.oruc) },
      gunluk: x.gunluk,
      islemler: (x.islemler as Islem[]).slice(-ISLEM_SINIRI),
    },
  };
}
