// app.json'daki Android versionCode'u verilen sayıya ayarlar (CI'da her yüklemede artan çalıştırma numarası).
// Play Store her yüklemede daha büyük bir versionCode ister. Yalnızca CI'daki çalışma kopyasını değiştirir.
const fs = require('fs');
const path = require('path');

const kod = Number(process.argv[2]);
if (!Number.isInteger(kod) || kod < 1) throw new Error('Geçerli bir versionCode verilmeli');
const dosya = path.join(__dirname, '..', 'app.json');
const app = JSON.parse(fs.readFileSync(dosya, 'utf8'));
app.expo.android.versionCode = kod;
fs.writeFileSync(dosya, JSON.stringify(app, null, 2) + '\n');
console.log(`versionCode = ${kod}`);
