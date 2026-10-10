import { router, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DesenZemin } from '../../bilesenler/DesenZemin';
import { ReklamBandi } from '../../bilesenler/ReklamBandi';
import { Simge, type SimgeAdi } from '../../bilesenler/Simge';
import { enYakinDiniGun, gunFarki, kalanGunMetni } from '../../logic/diniGun';
import { gununEsmasi } from '../../logic/rehber';
import { gunAnahtari, gunAyMetni } from '../../logic/tarih';
import { t } from '../../metinler';
import { olcu, renk, yaziTipi } from '../../tema';
import { useSimdi } from '../../useSimdi';
import type { MetinAnahtari } from '../../metinler';

const KUTULAR: { baslik: MetinAnahtari; alt?: MetinAnahtari; simge: SimgeAdi; yol: Href }[] = [
  { baslik: 'rehber.diniGunler', alt: 'rehber.diniGunlerAlt', simge: 'hilal', yol: '/dini-gunler' },
  { baslik: 'rehber.esma', alt: 'rehber.esmaAlt', simge: 'yildiz', yol: '/esma' },
  { baslik: 'rehber.sureler', alt: 'rehber.surelerAlt', simge: 'kitap', yol: '/sureler' },
  { baslik: 'rehber.dualar', alt: 'rehber.dualarAlt', simge: 'eller', yol: '/dualar' },
  { baslik: 'rehber.imsakiye', alt: 'rehber.imsakiyeAlt', simge: 'takvim', yol: '/imsakiye' },
  { baslik: 'rehber.kible', simge: 'pusula', yol: '/kible' },
  { baslik: 'rehber.zikirmatik', simge: 'tespih', yol: '/zikirmatik' },
  { baslik: 'rehber.kazaOrucu', simge: 'defter', yol: '/kaza-orucu' },
];

export default function Rehber() {
  const simdi = useSimdi();
  const bugun = gunAnahtari(simdi);
  const esma = gununEsmasi(simdi);
  const yaklasan = enYakinDiniGun(bugun);

  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
      <DesenZemin />
      <ScrollView contentContainerStyle={stil.icerik}>
        <Text style={stil.baslik} accessibilityRole="header">
          {t('rehber.baslik')}
        </Text>

        <Pressable onPress={() => router.push('/esma')} accessibilityRole="button" style={({ pressed }) => [stil.esma, pressed && { opacity: 0.9 }]}>
          <Text style={stil.esmaEtiket}>{t('rehber.gununEsmasi')}</Text>
          <Text style={stil.esmaArapca}>{esma.arapca}</Text>
          <Text style={stil.esmaAd}>{esma.ad}</Text>
          <Text style={stil.esmaAnlam}>{esma.anlam}</Text>
        </Pressable>

        {yaklasan ? (
          <Pressable
            onPress={() => router.push('/dini-gunler')}
            accessibilityRole="button"
            style={({ pressed }) => [stil.yaklasan, pressed && { opacity: 0.85 }]}
          >
            <View style={stil.yaklasanSimge}>
              <Simge ad="hilal" renk={renk.altin} boyut={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={stil.kucuk}>{t('rehber.yaklasan')}</Text>
              <Text style={stil.yaklasanAd}>{yaklasan.ad}</Text>
              <Text style={stil.kucuk}>{gunAyMetni(yaklasan.tarih)}</Text>
            </View>
            <View style={stil.rozet}>
              <Text style={stil.rozetMetin}>{kalanGunMetni(gunFarki(bugun, yaklasan.tarih), yaklasan.tur === 'kandil')}</Text>
            </View>
          </Pressable>
        ) : null}

        <View style={stil.izgara}>
          {KUTULAR.map((k) => (
            <Pressable
              key={String(k.yol)}
              onPress={() => router.push(k.yol)}
              accessibilityRole="button"
              style={({ pressed }) => [stil.kutu, pressed && { opacity: 0.85 }]}
            >
              <View style={stil.kutuSimge}>
                <Simge ad={k.simge} renk={renk.altin} boyut={22} />
              </View>
              <Text style={stil.kutuBaslik} numberOfLines={1}>
                {t(k.baslik)}
              </Text>
              {k.alt ? (
                <Text style={stil.kucuk} numberOfLines={2}>
                  {t(k.alt)}
                </Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ReklamBandi />
    </SafeAreaView>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 12, paddingBottom: 24 },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 26, color: renk.metin },
  esma: { backgroundColor: renk.gece, borderRadius: olcu.kartYaricap + 4, padding: 20, alignItems: 'center', gap: 4 },
  esmaEtiket: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.altin, letterSpacing: 0.5 },
  esmaArapca: { fontSize: 40, lineHeight: 64, color: renk.altin, writingDirection: 'rtl' },
  esmaAd: { fontFamily: yaziTipi.baslik, fontSize: 22, color: renk.beyaz },
  esmaAnlam: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.koyuUstuSoluk, textAlign: 'center', lineHeight: 21 },
  yaklasan: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  yaklasanSimge: { width: 46, height: 46, borderRadius: 23, backgroundColor: renk.altinZemin, alignItems: 'center', justifyContent: 'center' },
  yaklasanAd: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin },
  kucuk: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 17 },
  rozet: { backgroundColor: renk.altinZemin, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5 },
  rozetMetin: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.metin },
  izgara: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kutu: { width: '48.4%', flexGrow: 1, backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, gap: 6, minHeight: 112 },
  kutuSimge: { width: 40, height: 40, borderRadius: 20, backgroundColor: renk.altinZemin, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  kutuBaslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
});
