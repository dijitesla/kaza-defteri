// Play Store'da puanlama ve uygulamayı paylaşma.
import * as StoreReview from 'expo-store-review';
import { Linking, Share } from 'react-native';
import { depolama } from './depolama';
import { puanIstenmeli } from './logic/puanIstegi';
import { t } from './metinler';
import type { Veri } from './veri';

const PAKET = 'com.dijitesla.kazadefteri';
export const MAGAZA_ADRESI = `https://play.google.com/store/apps/details?id=${PAKET}`;

/** Ayarlar'daki "Uygulamayı puanla": Play Store uygulamasını, yoksa tarayıcıyı açar. */
export async function magazadaPuanla(): Promise<void> {
  try {
    await Linking.openURL(`market://details?id=${PAKET}`);
  } catch {
    await Linking.openURL(MAGAZA_ADRESI);
  }
}

/** Ayarlar'daki "Arkadaşına öner": telefonun paylaş menüsünü açar. */
export async function arkadasinaOner(): Promise<void> {
  await Share.share({ message: t('ayar.onerMesaj', { link: MAGAZA_ADRESI }) });
}

/** Yeterince kullanıldıysa Play'in puan penceresini bir kez dener. Hata uygulamayı etkilemez. */
export async function puanIsteginiDene(veri: Veri, simdi = new Date()): Promise<void> {
  try {
    const durum = await depolama.puanOku();
    const istenmeli = puanIstenmeli({
      durum,
      kurulumZamani: veri.ayarlar.kurulumZamani,
      simdi,
      islemler: veri.islemler,
      gunluk: veri.gunluk,
    });
    if (!istenmeli || !(await StoreReview.isAvailableAsync())) return;
    await depolama.puanYaz({ istendi: simdi.toISOString() });
    await StoreReview.requestReview();
  } catch {
    // Puan penceresi gösterilemezse sessizce geç.
  }
}
