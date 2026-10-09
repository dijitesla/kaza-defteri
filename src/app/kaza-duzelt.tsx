import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Dugme } from '../bilesenler/Dugme';
import { Ekran } from '../bilesenler/Ekran';
import { t, VAKIT_ADLARI } from '../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../tema';
import { KAZA_VAKITLERI, VAKITLER, type KazaVakit } from '../types';
import { useVeri } from '../veri';

const SAYI = /^\d{1,6}$/;

export default function KazaDuzelt() {
  const { veri, kazaDuzelt } = useVeri();
  const vakitler = veri.ayarlar.mezhep === 'hanefi' ? KAZA_VAKITLERI : VAKITLER;
  const [degerler, setDegerler] = useState<Record<KazaVakit, string>>(() => {
    const d = {} as Record<KazaVakit, string>;
    for (const v of KAZA_VAKITLERI) d[v] = String(veri.kaza.kalan[v]);
    return d;
  });

  const gecerli = vakitler.every((v) => SAYI.test(degerler[v]));

  const kaydet = () => {
    if (!gecerli) return;
    const yeni = { ...veri.kaza.kalan };
    for (const v of vakitler) yeni[v] = Number(degerler[v]);
    kazaDuzelt(yeni); // değişiklik yoksa kayıt yazılmaz
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <Ekran
        baslik={t('ayar.kazaDuzelt')}
        alt={<Dugme metin={t('genel.kaydet')} onPress={kaydet} pasif={!gecerli} />}
      >
        <Text style={stil.not}>{t('ayar.kazaDuzeltAlt')}</Text>
        {vakitler.map((v) => (
          <View key={v} style={stil.satir}>
            <Text style={stil.ad}>{VAKIT_ADLARI[v]}</Text>
            <TextInput
              value={degerler[v]}
              onChangeText={(m) => setDegerler((d) => ({ ...d, [v]: m.replace(/[^0-9]/g, '') }))}
              keyboardType="number-pad"
              maxLength={6}
              selectTextOnFocus
              accessibilityLabel={`${VAKIT_ADLARI[v]}, ${t('kaza.kalan')}`}
              style={[buyukSayi, stil.giris, !SAYI.test(degerler[v]) && { borderColor: renk.kilinamadi }]}
            />
          </View>
        ))}
      </Ekran>
    </>
  );
}

const stil = StyleSheet.create({
  not: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin, lineHeight: 19 },
  satir: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  giris: {
    minWidth: 110,
    minHeight: olcu.dokunmaMin,
    textAlign: 'right',
    fontSize: 22,
    borderWidth: 1.5,
    borderColor: renk.zemin,
    borderRadius: olcu.dugmeYaricap,
    paddingHorizontal: 10,
  },
});
