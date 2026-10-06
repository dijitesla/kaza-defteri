// Namaz vakitleri. Kaynak: docs/SPEC.md, Bölüm 5.
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';
import { t, VAKIT_ADLARI } from '../metinler';
import type { Ayarlar, Vakit } from '../types';
import { VAKITLER } from '../types';
import { gunEkle, gunOglesi } from './tarih';

export interface GununVakitleri {
  imsak: Date; // sabah vaktinin başlangıcı
  gunes: Date;
  ogle: Date;
  ikindi: Date;
  aksam: Date;
  yatsi: Date;
}

export interface VakitAraligi {
  giris: Date;
  cikis: Date;
}

type Konum = Ayarlar['konum'];
type Duzeltme = Ayarlar['dakikaDuzeltme'];

const DK = 60_000;
const ekle = (d: Date, dk: number) => new Date(d.getTime() + dk * DK);

/**
 * Diyanet yöntemi: adhan'ın CalculationMethod.Turkey() parametreleri (imsak 18°, yatsı 17°,
 * Diyanet'in temkin süreleri).
 * İkindi: Diyanet ikindiyi asr-ı evvel (gölge boyu = cisim boyu + fey-i zeval) ile verir;
 * adhan'da bu Madhab.Shafi'dir. Kullanıcının mezhep seçimi ikindi hesabını DEĞİŞTİRMEZ.
 */
function parametreler() {
  const p = CalculationMethod.Turkey();
  p.madhab = Madhab.Shafi;
  return p;
}

/** Verilen günün vakitleri, kullanıcının dakika düzeltmeleriyle. Güneş düzeltilmez. */
export function gununVakitleri(konum: Konum, gun: string, duzeltme: Duzeltme): GununVakitleri {
  const v = new PrayerTimes(new Coordinates(konum.enlem, konum.boylam), gunOglesi(gun), parametreler());
  return {
    imsak: ekle(v.fajr, duzeltme.sabah),
    gunes: v.sunrise,
    ogle: ekle(v.dhuhr, duzeltme.ogle),
    ikindi: ekle(v.asr, duzeltme.ikindi),
    aksam: ekle(v.maghrib, duzeltme.aksam),
    yatsi: ekle(v.isha, duzeltme.yatsi),
  };
}

export function girisZamani(g: GununVakitleri, vakit: Vakit): Date {
  return vakit === 'sabah' ? g.imsak : g[vakit];
}

/**
 * Vakit giriş ve çıkışları: sabah → güneş, öğle → ikindi, ikindi → akşam,
 * akşam → yatsı, yatsı → ertesi günün imsakı.
 */
export function vakitAraliklari(konum: Konum, gun: string, duzeltme: Duzeltme): Record<Vakit, VakitAraligi> {
  const g = gununVakitleri(konum, gun, duzeltme);
  const yarin = gununVakitleri(konum, gunEkle(gun, 1), duzeltme);
  return {
    sabah: { giris: g.imsak, cikis: g.gunes },
    ogle: { giris: g.ogle, cikis: g.ikindi },
    ikindi: { giris: g.ikindi, cikis: g.aksam },
    aksam: { giris: g.aksam, cikis: g.yatsi },
    yatsi: { giris: g.yatsi, cikis: yarin.imsak },
  };
}

/** Şu andan sonra girecek ilk vakit (bugün ya da yarın). */
export function siradakiVakit(
  konum: Konum,
  bugun: string,
  simdi: Date,
  duzeltme: Duzeltme,
): { gun: string; vakit: Vakit; zaman: Date } {
  for (const gun of [bugun, gunEkle(bugun, 1)]) {
    const g = gununVakitleri(konum, gun, duzeltme);
    for (const vakit of VAKITLER) {
      const zaman = girisZamani(g, vakit);
      if (zaman.getTime() > simdi.getTime()) return { gun, vakit, zaman };
    }
  }
  // Ulaşılamaz: yarının imsakı her zaman ileridedir.
  throw new Error('Sıradaki vakit bulunamadı');
}

/** Kalan süre: 60 dk altı "41 dk", üstü "1 sa 12 dk". Dakika yukarı yuvarlanır. */
export function kalanSureMetni(ms: number): string {
  const toplamDk = Math.max(0, Math.ceil(ms / DK));
  if (toplamDk < 60) return t('bugun.kalanSure', { dk: toplamDk });
  return t('bugun.kalanSaat', { sa: Math.floor(toplamDk / 60), dk: toplamDk % 60 });
}

export function siradakiBaslik(vakit: Vakit): string {
  return t('bugun.kalan', { Vakit: VAKIT_ADLARI[vakit] });
}
