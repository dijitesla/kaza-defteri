// expo-notifications ile planlama, kategoriler ve izin. Plan içeriği src/logic/bildirimPlani.ts'te.
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { bildirimPlani, EYLEM } from './logic/bildirimPlani';
import { gunAnahtari } from './logic/tarih';
import { vakitAraliklari } from './logic/vakitler';
import { t } from './metinler';
import type { Ayarlar, GunlukDurum } from './types';

const KANAL = 'vakit';

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
  await Notifications.setNotificationChannelAsync(KANAL, {
    name: t('uygulama.ad'),
    importance: Notifications.AndroidImportance.HIGH,
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

let sira: Promise<void> = Promise.resolve();

/**
 * Tüm planlanmış bildirimleri iptal eder ve önümüzdeki 6 günü yeniden planlar (SPEC 6.3).
 * Art arda çağrılar sıraya girer; aynı anda iki planlama çalışmaz.
 */
export function bildirimleriPlanla(ayarlar: Ayarlar, gunluk: GunlukDurum): Promise<void> {
  sira = sira
    .then(async () => {
      if (!ayarlar.kurulumTamam) return;
      await bildirimleriHazirla();
      await Notifications.cancelAllScheduledNotificationsAsync();
      if (!(await bildirimIzniVar())) return;
      const simdi = new Date();
      const plan = bildirimPlani({
        ayarlar,
        gunluk,
        bugun: gunAnahtari(simdi),
        simdi,
        araliklar: (gun) => vakitAraliklari(ayarlar.konum, gun, ayarlar.dakikaDuzeltme),
      });
      for (const b of plan) {
        await Notifications.scheduleNotificationAsync({
          identifier: b.id,
          content: {
            title: b.baslik,
            body: b.govde,
            categoryIdentifier: b.kategori,
            data: { ...b.veri },
          },
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: b.zaman, channelId: KANAL },
        });
      }
    })
    .catch(() => {});
  return sira;
}
