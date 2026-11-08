// Yayın derlemesinde R8 kod küçültmeyi ve kullanılmayan kaynakların atılmasını açar.
// Play Console, DEX kodunun küçültülmesini istiyor; Expo'nun build.gradle'ı bu iki özelliği
// android/gradle.properties'ten okur. `expo prebuild` sonrasında CI'da çalıştırılır.
const fs = require('fs');
const path = require('path');

const dosya = path.join(__dirname, '..', 'android', 'gradle.properties');
if (!fs.existsSync(dosya)) throw new Error('android/gradle.properties yok; önce expo prebuild çalıştırılmalı');

const ayarlar = {
  'android.enableMinifyInReleaseBuilds': 'true',
  'android.enableShrinkResourcesInReleaseBuilds': 'true',
};

let metin = fs.readFileSync(dosya, 'utf8');
for (const [anahtar, deger] of Object.entries(ayarlar)) {
  const satir = new RegExp(`^${anahtar.replace(/\./g, '\\.')}=.*$`, 'm');
  metin = satir.test(metin) ? metin.replace(satir, `${anahtar}=${deger}`) : `${metin.trimEnd()}\n${anahtar}=${deger}\n`;
}
fs.writeFileSync(dosya, metin);
console.log('R8 kod küçültme açık');
