// Play Store sürümü için imza ayarı (CI'da `expo prebuild` sonrasında çalışır).
// android/app/build.gradle'a ortam değişkenlerinden okunan bir "release" imza ayarı ekler ve release
// derlemesini bu ayarla imzalar. Anahtar dosyası ve şifreler depoda tutulmaz; GitHub Secrets'tan gelir.
//
// Gerekli ortam değişkenleri: KD_ANAHTAR_DOSYA, KD_ANAHTAR_SIFRE, KD_ANAHTAR_ADI, KD_ANAHTAR_ADI_SIFRE
const fs = require('fs');
const path = require('path');

const dosya = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
let gradle = fs.readFileSync(dosya, 'utf8');

for (const ad of ['KD_ANAHTAR_DOSYA', 'KD_ANAHTAR_SIFRE', 'KD_ANAHTAR_ADI', 'KD_ANAHTAR_ADI_SIFRE']) {
  if (!process.env[ad]) throw new Error(`${ad} tanımlı değil (GitHub Secrets'ı kontrol et)`);
}

const imza = `signingConfigs {
        release {
            storeFile file(System.getenv("KD_ANAHTAR_DOSYA"))
            storePassword System.getenv("KD_ANAHTAR_SIFRE")
            keyAlias System.getenv("KD_ANAHTAR_ADI")
            keyPassword System.getenv("KD_ANAHTAR_ADI_SIFRE")
        }`;
if (!gradle.includes('signingConfigs {')) throw new Error('build.gradle: signingConfigs bulunamadı');
gradle = gradle.replace('signingConfigs {', imza);

// buildTypes > release içindeki debug imzasını release imzasıyla değiştir.
const releaseBlogu = /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig signingConfigs\.debug/;
if (!releaseBlogu.test(gradle)) throw new Error('build.gradle: release imza satırı bulunamadı');
gradle = gradle.replace(releaseBlogu, '$1signingConfig signingConfigs.release');

fs.writeFileSync(dosya, gradle);
console.log('Release imza ayarı eklendi.');
