import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dugme } from '../bilesenler/Dugme';
import { GeriAlCubugu, useGeriAlCubugu } from '../bilesenler/GeriAlCubugu';
import { orucOzeti } from '../logic/islemler';
import { sayiBicimle } from '../logic/kazaHesap';
import { t } from '../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../tema';
import { useVeri } from '../veri';

const SAYI = /^\d{1,5}$/;

export default function KazaOrucu() {
  const { veri, orucTut, orucDuzelt, geriAl } = useVeri();
  const o = orucOzeti(veri.kaza);
  const { cubuk, goster, kapat } = useGeriAlCubugu();
  const [giris, setGiris] = useState(String(o.kalan));
  // Kalan değişince (tuttum, geri al) giriş kutusu güncel sayıyı gösterir.
  useEffect(() => setGiris(String(o.kalan)), [o.kalan]);

  const tut = () => {
    const id = orucTut();
    if (!id) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    goster(t('oruc.kaydedildi'), id);
  };

  const gecerli = SAYI.test(giris) && Number(giris) !== o.kalan;
  const kaydet = () => {
    if (!gecerli) return;
    orucDuzelt(Number(giris));
    kapat();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('oruc.baslik') }} />
      <SafeAreaView style={stil.kap} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={stil.icerik} keyboardShouldPersistTaps="handled">
          <View style={stil.ozet}>
            <Text style={stil.ozetEtiket}>{t('oruc.kalan')}</Text>
            <Text style={[buyukSayi, stil.ozetSayi]}>{t('oruc.gun', { n: sayiBicimle(o.kalan) })}</Text>
            {o.ilkBorc > 0 ? (
              <View style={stil.ozetAlt}>
                <Text style={stil.ozetAltMetin}>
                  {t('oruc.tutulan')}: <Text style={stil.vurgu}>{sayiBicimle(o.tutulan)}</Text>
                </Text>
                <Text style={stil.ozetAltMetin}>
                  {t('oruc.toplam')}: <Text style={stil.beyaz}>{sayiBicimle(o.ilkBorc)}</Text>
                </Text>
              </View>
            ) : null}
          </View>

          {o.ilkBorc > 0 && o.kalan === 0 ? <Text style={stil.bitti}>{t('oruc.bitti')}</Text> : null}
          {o.kalan > 0 ? <Dugme metin={t('oruc.tuttum')} onPress={tut} /> : null}

          <View style={stil.kart}>
            <Text style={stil.kartBaslik}>{o.ilkBorc > 0 ? t('oruc.duzelt') : t('oruc.ekle')}</Text>
            <Text style={stil.not}>{t('oruc.duzeltAlt')}</Text>
            <View style={stil.satir}>
              <TextInput
                value={giris}
                onChangeText={(m) => setGiris(m.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                maxLength={5}
                selectTextOnFocus
                accessibilityLabel={t('oruc.kalan')}
                style={[buyukSayi, stil.giris]}
              />
              <View style={{ flex: 1 }}>
                <Dugme metin={t('genel.kaydet')} onPress={kaydet} pasif={!gecerli} />
              </View>
            </View>
          </View>
        </ScrollView>
        {cubuk ? (
          <View style={stil.cubukKap}>
            <GeriAlCubugu
              metin={cubuk.metin}
              onGeriAl={
                cubuk.islemId
                  ? () => {
                      geriAl(cubuk.islemId!);
                      kapat();
                    }
                  : undefined
              }
            />
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 14, paddingBottom: 90 },
  ozet: { backgroundColor: renk.gece, borderRadius: olcu.kartYaricap + 4, padding: 20, gap: 4 },
  ozetEtiket: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.koyuUstuSoluk },
  ozetSayi: { fontSize: 40, lineHeight: 50, color: renk.beyaz },
  ozetAlt: { flexDirection: 'row', gap: 18, marginTop: 4 },
  ozetAltMetin: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.koyuUstuSoluk },
  vurgu: { fontFamily: yaziTipi.kalin, color: renk.altin },
  beyaz: { fontFamily: yaziTipi.kalin, color: renk.beyaz },
  bitti: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.onay, textAlign: 'center', lineHeight: 22 },
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 16, gap: 10 },
  kartBaslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  not: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin, lineHeight: 19 },
  satir: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  giris: {
    width: 110,
    minHeight: olcu.dokunmaMin,
    textAlign: 'center',
    fontSize: 22,
    borderWidth: 1.5,
    borderColor: renk.zemin,
    borderRadius: olcu.dugmeYaricap,
    paddingHorizontal: 10,
  },
  cubukKap: { position: 'absolute', left: olcu.ekranBosluk, right: olcu.ekranBosluk, bottom: 16 },
});
