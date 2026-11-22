// android:screenOrientation="portrait", Play'de android.hardware.screen.portrait özelliğini zorunlu sayar
// ve bazı tablet, Chromebook ve masaüstü cihazlarda yüklemeyi engeller. Özelliği isteğe bağlı olarak bildirir.
const { withAndroidManifest } = require('expo/config-plugins');

const OZELLIK = 'android.hardware.screen.portrait';

module.exports = function dikeyEkranIstegeBagli(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    const ozellikler = (manifest['uses-feature'] ??= []);
    const mevcut = ozellikler.find((o) => o.$?.['android:name'] === OZELLIK);
    if (mevcut) mevcut.$['android:required'] = 'false';
    else ozellikler.push({ $: { 'android:name': OZELLIK, 'android:required': 'false' } });
    return cfg;
  });
};
