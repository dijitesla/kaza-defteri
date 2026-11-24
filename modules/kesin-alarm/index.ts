// Android kesin alarm izni (modules/kesin-alarm, yerel Expo modülü). Diğer platformlarda izin gerekmez.
import { requireOptionalNativeModule } from 'expo-modules-core';

interface KesinAlarmModulu {
  izinVar(): boolean;
  ayariAc(): boolean;
}

const modul = requireOptionalNativeModule<KesinAlarmModulu>('KesinAlarm');

/** Bildirimler tam dakikasında planlanabiliyor mu? Modül yoksa (web, iOS) true. */
export function kesinAlarmIzniVar(): boolean {
  try {
    return modul ? modul.izinVar() : true;
  } catch {
    return true;
  }
}

/** Uygulamanın kesin alarm ayarını açar; açamazsa false. */
export function kesinAlarmAyariniAc(): boolean {
  try {
    return modul ? modul.ayariAc() : false;
  } catch {
    return false;
  }
}
