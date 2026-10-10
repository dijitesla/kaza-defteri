import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dugme } from '../bilesenler/Dugme';
import { GeriAlCubugu, useGeriAlCubugu } from '../bilesenler/GeriAlCubugu';
import { etkiMetni, islemAciklamasi, orucOzeti } from '../logic/islemler';
import { gunAyMetni, gunAnahtari, saatMetni } from '../logic/tarih';
import { sayiBicimle } from '../logic/kazaHesap';
import { t } from '../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../tema';
import { useVeri } from '../veri';

const SAYI = /^\d{1,5}$/;

export default function KazaOrucu() {
  const { veri, orucTut, orucDuzelt, geriAl } = useVeri();
  const o = orucOzeti(veri.kaza);
  // Oruçla ilgili son kayıtlar (oruç alanı olan her işlem, geri almalar dahil), yeniden eskiye.
  const kayitlar = veri.islemler.filter((i) => i.oruc !== undefined).slice(-10).reverse();
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

          <View style={stil.kart}>
            <Text style={stil.kartBaslik}>{t('oruc.kayitlar')}</Text>
            {kayitlar.length === 0 ? <Text style={stil.not}>{t('oruc.kayitYok')}</Text> : null}
            {kayitlar.map((k) => {
              const z = new Date(k.zaman);
              return (
                <View key={k.id} style={stil.kayit}>
                  <View style={{ flex: 1 }}>
                    <Text style={stil.kayitMetin}>{islemAciklamasi(k, veri.islemler)}</Text>
                    <Text style={stil.not}>
                      {gunAyMetni(gunAnahtari(z))} · {saatMetni(z)}
                    </Text>
                  </View>
                  <Text style={stil.etki}>{etkiMetni(k)}</Text>
                </View>
              );
            })}
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
  kayit: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderTopWidth: 1, borderTopColor: renk.zemin },
  kayitMetin: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.metin },
  etki: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
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
