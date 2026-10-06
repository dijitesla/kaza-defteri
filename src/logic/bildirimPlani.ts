// Bildirim planı ve bildirim cevapları. Kaynak: docs/SPEC.md, Bölüm 6.
import { t, VAKIT_ADLARI } from '../metinler';
import type { Ayarlar, GunlukDurum, Vakit } from '../types';
import { VAKITLER } from '../types';
import { gunEkle, gunOglesi, kucukHarf, saatMetni } from './tarih';
import type { VakitAraligi } from './vakitler';

/** Bugünden itibaren kaç gün planlanır (iOS'ta bekleyen bildirim sınırı 64). */
export const PLAN_GUN_SAYISI = 6;

export type BildirimTuru = 'giris' | 'soru';
export type Kategori = 'GIRIS' | 'SORU';

/** Bildirim düğmelerinin kimlikleri. */
export const EYLEM = { kildim: 'KILDIM', kilamadim: 'KILAMADIM', sonra: 'SONRA' } as const;

export interface BildirimVerisi {
  gun: string;
  vakit: Vakit;
  tur: BildirimTuru;
}

export interface PlanliBildirim {
  id: string; // '{YYYY-MM-DD}_{vakit}_giris' | '{YYYY-MM-DD}_{vakit}_soru'
  zaman: Date;
  kategori: Kategori;
  baslik: string;
  govde: string;
  veri: BildirimVerisi;
}

export const bildirimId = (gun: string, vakit: Vakit, tur: BildirimTuru) => `${gun}_${vakit}_${tur}`;

const DK = 60_000;

/**
 * "Kıldın mı?" zamanı: vakit çıkışından soruDakika önce.
 * Sabah: bu süre vaktin yarısından uzunsa vaktin ortası (SPEC 6.1.4). Aynı koruma diğer vakitlerde de
 * uygulanır, soru vakit girmeden gelmesin.
 * Yatsı: sabit saat (yatsiSoruSaati). Saat yatsı girişinden önceyse gece yarısından sonrası sayılır;
 * yine de vakit çıkmış oluyorsa diğer vakitlerin kuralı uygulanır.
 */
export function soruZamani(
  vakit: Vakit,
  gun: string,
  aralik: VakitAraligi,
  bildirim: Ayarlar['bildirim'],
): Date {
  const giris = aralik.giris.getTime();
  const cikis = aralik.cikis.getTime();
  const orta = new Date(giris + (cikis - giris) / 2);
  const oncesi = () => (bildirim.soruDakika * DK > (cikis - giris) / 2 ? orta : new Date(cikis - bildirim.soruDakika * DK));

  if (vakit !== 'yatsi') return oncesi();

  const [sa, dk] = bildirim.yatsiSoruSaati.split(':').map(Number);
  const z = gunOglesi(gun);
  z.setHours(sa, dk, 0, 0);
  if (z.getTime() <= giris) z.setDate(z.getDate() + 1);
  return z.getTime() < cikis ? z : oncesi();
}

interface PlanGirdisi {
  ayarlar: Pick<Ayarlar, 'konum' | 'bildirim'>;
  gunluk: GunlukDurum;
  bugun: string;
  simdi: Date;
  araliklar: (gun: string) => Record<Vakit, VakitAraligi>;
}

/** Planlanacak bildirimler, zamana göre sıralı. Cevaplanmış vakitler ve geçmiş zamanlar atlanır. */
export function bildirimPlani(g: PlanGirdisi): PlanliBildirim[] {
  const { bildirim, konum } = g.ayarlar;
  const liste: PlanliBildirim[] = [];
  // Dünün yatsı sorusu gece yarısından sonraya düşebilir; bu yüzden dünden başlanır.
  for (let fark = -1; fark < PLAN_GUN_SAYISI; fark++) {
    const gun = gunEkle(g.bugun, fark);
    const a = g.araliklar(gun);
    for (const vakit of VAKITLER) {
      if (!bildirim.vakitler[vakit]) continue;
      if (g.gunluk[gun]?.[vakit] && g.gunluk[gun][vakit] !== 'cevapsiz') continue;
      const Vakit = VAKIT_ADLARI[vakit];
      const aralik = a[vakit];

      if (bildirim.girisBildirimi) {
        liste.push({
          id: bildirimId(gun, vakit, 'giris'),
          zaman: aralik.giris,
          kategori: 'GIRIS',
          baslik: t('bildirim.girisBaslik', { Vakit }),
          govde: t('bildirim.girisGovde', { Konum: konum.ad, vakit: kucukHarf(Vakit), saat: saatMetni(aralik.giris) }),
          veri: { gun, vakit, tur: 'giris' },
        });
      }
      liste.push({
        id: bildirimId(gun, vakit, 'soru'),
        zaman: soruZamani(vakit, gun, aralik, bildirim),
        kategori: 'SORU',
        baslik: t('bildirim.soruBaslik', { Vakit }),
        govde:
          vakit === 'yatsi'
            ? t('bildirim.yatsiSoruGovde')
            : t('bildirim.soruGovde', { Vakit, saat: saatMetni(aralik.cikis) }),
        veri: { gun, vakit, tur: 'soru' },
      });
    }
  }

  const gelecek = liste
    .filter((b) => b.zaman.getTime() > g.simdi.getTime())
    .sort((x, y) => x.zaman.getTime() - y.zaman.getTime());

  // Planın son soru bildirimi: kullanıcı uygulamayı açmazsa hatırlatmalar burada biter (SPEC 6.3).
  for (let i = gelecek.length - 1; i >= 0; i--) {
    if (gelecek[i].kategori === 'SORU') {
      gelecek[i] = { ...gelecek[i], govde: `${gelecek[i].govde} ${t('bildirim.sonUyari')}` };
      break;
    }
  }
  return gelecek;
}

/** Bildirim verisini doğrular (bildirim içeriği dışarıdan gelir). */
export function bildirimVerisiOku(x: unknown): BildirimVerisi | null {
  if (typeof x !== 'object' || x === null) return null;
  const v = x as Record<string, unknown>;
  if (typeof v.gun !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v.gun)) return null;
  if (!VAKITLER.includes(v.vakit as Vakit)) return null;
  if (v.tur !== 'giris' && v.tur !== 'soru') return null;
  return { gun: v.gun, vakit: v.vakit as Vakit, tur: v.tur };
}

/**
 * Bildirim düğmesine basıldı: kaydedilecek cevap. "Sonra", bildirime dokunma ve
 * zaten cevaplanmış vakit için null (aynı vakit iki kez kazaya eklenmez).
 */
export function bildirimCevabi(
  gunluk: GunlukDurum,
  veri: unknown,
  eylem: string,
): { gun: string; vakit: Vakit; cevap: 'kilindi' | 'kilinamadi' } | null {
  const v = bildirimVerisiOku(veri);
  if (!v) return null;
  let cevap: 'kilindi' | 'kilinamadi';
  if (eylem === EYLEM.kildim) cevap = 'kilindi';
  else if (eylem === EYLEM.kilamadim && v.tur === 'soru') cevap = 'kilinamadi';
  else return null;
  const mevcut = gunluk[v.gun]?.[v.vakit];
  if (mevcut && mevcut !== 'cevapsiz') return null;
  return { gun: v.gun, vakit: v.vakit, cevap };
}
