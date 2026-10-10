// Reklam (Google AdMob): onay, başlatma ve reklam birimi kimlikleri.
import { Platform } from 'react-native';
import mobileAds, { AdsConsent, AdsConsentPrivacyOptionsRequirementStatus, TestIds } from 'react-native-google-mobile-ads';

/**
 * Gerçek banner reklam birimi kimlikleri (AdMob > Uygulamalar > Kaza Defteri > Reklam birimleri).
 * Uygulama kimlikleri app.json'da İKİ yerde: expo.plugins içindeki react-native-google-mobile-ads
 * eklentisi ve kökteki "react-native-google-mobile-ads" anahtarı (kütüphanenin Android derleme betiği
 * bunu okur). iOS için henüz AdMob uygulaması yok; boş kaldıkça test reklamı gösterilir.
 */
const BANNER_KIMLIKLERI = { android: 'ca-app-pub-4620185704256647/9985042432', ios: '' };

/**
 * Gerçek reklam yalnızca Play Store derlemesinde gösterilir (aab.yml EXPO_PUBLIC_GERCEK_REKLAM=1 verir).
 * Test APK'ları ve geliştirme test reklamı gösterir: geliştiricinin kendi reklamına dokunması
 * AdMob'da geçersiz trafik sayılır.
 */
const GERCEK_REKLAM = process.env.EXPO_PUBLIC_GERCEK_REKLAM === '1';

const gercekKimlik = Platform.OS === 'ios' ? BANNER_KIMLIKLERI.ios : BANNER_KIMLIKLERI.android;
export const BANNER_KIMLIGI = __DEV__ || !GERCEK_REKLAM || !gercekKimlik ? TestIds.ADAPTIVE_BANNER : gercekKimlik;

let hazirlik: Promise<boolean> | null = null;

/**
 * Reklam onayını toplar (gerekiyorsa, ör. AB'de, Google'ın onay penceresi açılır) ve
 * reklam SDK'sını başlatır. Reklam gösterilebiliyorsa true. İnternet yoksa false döner;
 * bir sonraki çağrıda yeniden denenir. Uygulamanın geri kalanı bundan etkilenmez.
 */
export function reklamlariHazirla(): Promise<boolean> {
  if (!hazirlik) {
    hazirlik = (async () => {
      let izin = false;
      try {
        izin = (await AdsConsent.gatherConsent()).canRequestAds;
      } catch {
        // Onay bilgisi alınamadı (ör. internet yok): önceki oturumdaki onay geçerliyse kullanılır.
        izin = await AdsConsent.getConsentInfo()
          .then((b) => b.canRequestAds)
          .catch(() => false);
      }
      if (izin) await mobileAds().initialize();
      return izin;
    })().catch(() => false);
    hazirlik.then((izin) => {
      if (!izin) hazirlik = null; // sonraki açılışta yeniden dene
    });
  }
  return hazirlik;
}

/** Kullanıcının reklam onayını değiştirebileceği seçenek gerekli mi (AB kullanıcıları). */
export async function gizlilikSecenegiGerekli(): Promise<boolean> {
  try {
    const b = await AdsConsent.getConsentInfo();
    return b.privacyOptionsRequirementStatus === AdsConsentPrivacyOptionsRequirementStatus.REQUIRED;
  } catch {
    return false;
  }
}

export async function gizlilikSecenekleriniAc(): Promise<void> {
  try {
    await AdsConsent.showPrivacyOptionsForm();
  } catch {
    // Pencere açılamadı (ör. internet yok); bir şey yapılmaz.
  }
}
