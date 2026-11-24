// expo-notifications ile planlama, kategoriler ve izin. Plan içeriği src/logic/bildirimPlani.ts'te.
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { bildirimPlani, EYLEM } from './logic/bildirimPlani';
import { gunAnahtari } from './logic/tarih';
import { vakitAraliklari } from './logic/vakitler';
import { t } from './metinler';
import { donemdeKilinan } from './logic/islemler';
import type { Ayarlar, GirisSesi, GunlukDurum, Islem } from './types';

// Android'de bildirim sesi kanala bağlıdır ve kanal kurulduktan sonra değiştirilemez;
// bu yüzden vakit girişi (seslendirmeli) ve "Kıldın mı?" (normal ses) ayrı kanallardadır.
const KANAL_SORU = 'vakit';
/** Vakit girişinde çalan seslendirme (app.json > expo-notifications > sounds). */
const GIRIS_SESI = 'vakit_girdi.wav';
/** Vakit girdi bildiriminin her ses seçeneği için Android kanalı ve iOS sesi. */
const GIRIS_KANALI: Record<GirisSesi, { kanal: string; ses: string | null }> = {
  ezan: { kanal: 'vakit_girdi', ses: GIRIS_SESI },
  kisa: { kanal: 'vakit_girdi_kisa', ses: 'default' },
  titresim: { kanal: 'vakit_girdi_titresim', ses: null },
  sessiz: { kanal: 'vakit_girdi_sessiz', ses: null },
};

/**
 * Düğmeler: "Kıldım" ve "Kılamadım" uygulamayı açar, cevap açılışta kaydedilir.
 * Uygulamayı açmadan kaydetmek Android'de expo-task-manager gerektirir, iOS'ta mümkün değildir;
 * güvenilir yol olarak SPEC 6.4'teki yedek seçildi (opensAppToForeground: true).
 * "Sonra" kaydedecek bir şey olmadığı için uygulamayı açmaz.
 */
const dugme = (identifier: string, buttonTitle: string, opensAppToForeground: boolean) => ({
  identifier,
  buttonTitle,
  options: { opensAppToForeground },
});

let hazirlik: Promise<void> | null = null;

/** Bildirim gösterimi, Android kanalı ve düğme kategorileri. Bir kez çalışır. */
export function bildirimleriHazirla(): Promise<void> {
  if (!hazirlik) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    hazirlik = (async () => {
      await androidKanali();
      await Notifications.setNotificationCategoryAsync('GIRIS', [
        dugme(EYLEM.kildim, t('bildirim.dugmeKildim'), true),
      ]);
      await Notifications.setNotificationCategoryAsync('SORU', [
        dugme(EYLEM.kildim, t('bildirim.dugmeKildim'), true),
        dugme(EYLEM.kilamadim, t('bildirim.dugmeKilamadim'), true),
        dugme(EYLEM.sonra, t('bildirim.dugmeSonra'), false),
      ]);
    })().catch(() => {
      hazirlik = null;
    });
  }
  return hazirlik;
}

/** Android 13+ izin penceresi en az bir kanal varken gösterilir; izin istemeden önce de çağrılır. */
export async function androidKanali(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(KANAL_SORU, {
    name: t('bildirim.kanalSoru'),
    importance: Notifications.AndroidImportance.HIGH,
  });
  await Notifications.setNotificationChannelAsync(GIRIS_KANALI.ezan.kanal, {
    name: t('bildirim.kanalGiris'),
    importance: Notifications.AndroidImportance.HIGH,
    sound: GIRIS_SESI,
  });
  await Notifications.setNotificationChannelAsync(GIRIS_KANALI.kisa.kanal, {
    name: t('bildirim.kanalGirisKisa'),
    importance: Notifications.AndroidImportance.HIGH,
  });
  await Notifications.setNotificationChannelAsync(GIRIS_KANALI.titresim.kanal, {
    name: t('bildirim.kanalGirisTitresim'),
    importance: Notifications.AndroidImportance.HIGH,
    sound: null,
    enableVibrate: true,
  });
  await Notifications.setNotificationChannelAsync(GIRIS_KANALI.sessiz.kanal, {
    name: t('bildirim.kanalGirisSessiz'),
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: null,
    enableVibrate: false,
  });
}

export async function bildirimIzniIste(): Promise<boolean> {
  await androidKanali();
  const s = await Notifications.requestPermissionsAsync();
  return s.granted;
}

export async function bildirimIzniVar(): Promise<boolean> {
  return (await Notifications.getPermissionsAsync()).granted;
}

/** İzin durumu; canAskAgain false ise sistem penceresi artık açılmaz, ayarlara yönlendirilir. */
export async function bildirimIzniDurumu(): Promise<{ izinVar: boolean; tekrarSorulabilir: boolean }> {
  const s = await Notifications.getPermissionsAsync();
  return { izinVar: s.granted, tekrarSorulabilir: s.canAskAgain };
}

let sira: Promise<void> = Promise.resolve();

/**
 * Tüm planlanmış bildirimleri iptal eder ve önümüzdeki 6 günü yeniden planlar (SPEC 6.3).
 * Art arda çağrılar sıraya girer; aynı anda iki planlama çalışmaz.
 */
export function bildirimleriPlanla(ayarlar: Ayarlar, gunluk: GunlukDurum, islemler: Islem[] = []): Promise<void> {
  sira = sira
    .then(async () => {
      if (!ayarlar.kurulumTamam) return;
      await bildirimleriHazirla();
      await Notifications.cancelAllScheduledNotificationsAsync();
      if (!(await bildirimIzniVar())) return;
      const simdi = new Date();
      const gunBasi = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate());
      const yarin = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate() + 1);
      const plan = bildirimPlani({
        ayarlar,
        gunluk,
        bugunKilinanKaza: donemdeKilinan(islemler, gunBasi, yarin),
        bugun: gunAnahtari(simdi),
        simdi,
        araliklar: (gun) => vakitAraliklari(ayarlar.konum, gun, ayarlar.dakikaDuzeltme),
        // iOS en fazla 64 bekleyen bildirime izin verir.
        sinir: Platform.OS === 'ios' ? 64 : undefined,
      });
      const giris = GIRIS_KANALI[ayarlar.bildirim.girisSesi] ?? GIRIS_KANALI.ezan;
      for (const b of plan) {
        await Notifications.scheduleNotificationAsync({
          identifier: b.id,
          content: {
            title: b.baslik,
            body: b.govde,
            ...(b.kategori !== 'BILGI' ? { categoryIdentifier: b.kategori } : {}),
            data: { ...b.veri },
            // iOS'ta ses bildirimle gelir; Android'de kanalın sesi çalar.
            ...(b.kategori === 'GIRIS' ? (giris.ses ? { sound: giris.ses } : {}) : { sound: 'default' }),
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: b.zaman,
            channelId: b.kategori === 'GIRIS' ? giris.kanal : KANAL_SORU,
          },
        });
      }
    })
    .catch(() => {});
  return sira;
}
