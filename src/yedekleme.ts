// Yedek dosyasını yazma, paylaşma ve seçme. İçerik ve doğrulama src/logic/yedek.ts'te.
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { yedekDogrula, yedekDosyaAdi, yedekOlustur, type YedekVerisi } from './logic/yedek';
import { t } from './metinler';

/** Tüm veriyi JSON dosyasına yazar ve paylaşma ekranını açar. */
export async function yedekAl(v: YedekVerisi): Promise<void> {
  const simdi = new Date();
  const dosya = new File(Paths.cache, yedekDosyaAdi(simdi));
  if (dosya.exists) dosya.delete();
  dosya.create();
  dosya.write(JSON.stringify(yedekOlustur(v, simdi), null, 2));
  await Sharing.shareAsync(dosya.uri, {
    mimeType: 'application/json',
    UTI: 'public.json',
    dialogTitle: t('ayar.yedekAl'),
  });
}

/**
 * Dosya seçtirir ve doğrular. Kullanıcı vazgeçerse 'iptal', dosya geçersizse null.
 * Mevcut veriye dokunmaz; yükleme onaydan sonra yapılır.
 */
export async function yedekSec(): Promise<{ veri: YedekVerisi; tarih: string } | null | 'iptal'> {
  // Android'de JSON dosyaları farklı türlerle gelebildiği için tür sınırlanmaz.
  const sonuc = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });
  if (sonuc.canceled) return 'iptal';
  try {
    const metin = await new File(sonuc.assets[0].uri).text();
    return yedekDogrula(metin);
  } catch {
    return null;
  }
}
