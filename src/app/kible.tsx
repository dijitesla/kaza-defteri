import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { Dugme } from '../bilesenler/Dugme';
import { kibleAcisi, kibleFarki, kibleyeDonuk } from '../logic/kible';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { useVeri } from '../veri';

const BOYUT = 280;
const M = BOYUT / 2;

type Durum = 'bekliyor' | 'izinYok' | 'pusulaYok' | 'calisiyor';

export default function Kible() {
  const { veri } = useVeri();
  const { enlem, boylam } = veri.ayarlar.konum;
  const kible = kibleAcisi(enlem, boylam);
  const [durum, setDurum] = useState<Durum>('bekliyor');
  const [yon, setYon] = useState<number | null>(null);
  const [deneme, setDeneme] = useState(0);

  // Pusula: yalnızca ekran açıkken dinlenir. Konum izni pusulanın gerçek kuzeyi bulması için gerekir.
  useEffect(() => {
    let abonelik: Location.LocationSubscription | null = null;
    let iptal = false;
    let veriGeldi = false;
    (async () => {
      const izin = await Location.getForegroundPermissionsAsync();
      if (!izin.granted) {
        if (!iptal) setDurum('izinYok');
        return;
      }
      abonelik = await Location.watchHeadingAsync((h) => {
        const deger = h.trueHeading >= 0 ? h.trueHeading : h.magHeading;
        if (deger < 0 || !Number.isFinite(deger)) return;
        veriGeldi = true;
        setYon(deger);
        setDurum('calisiyor');
      });
      if (iptal) abonelik.remove();
    })().catch(() => {
      if (!iptal) setDurum('pusulaYok');
    });
    // Birkaç saniyede yön gelmezse telefonda pusula yok sayılır.
    const zaman = setTimeout(() => {
      if (!veriGeldi && !iptal) setDurum((d) => (d === 'bekliyor' ? 'pusulaYok' : d));
    }, 4000);
    return () => {
      iptal = true;
      clearTimeout(zaman);
      abonelik?.remove();
    };
  }, [deneme]);

  const izinIste = async () => {
    const izin = await Location.requestForegroundPermissionsAsync().catch(() => null);
    if (izin?.granted) {
      setDurum('bekliyor');
      setDeneme((d) => d + 1);
    }
  };

  // Gül, telefonun yönünün tersine döner; 359° → 0° geçişinde ters tur atmaması için açı birikimli tutulur.
  const donus = useSharedValue(0);
  const sonAci = useRef(0);
  useEffect(() => {
    if (yon === null) return;
    const hedef = -yon;
    const fark = ((((hedef - sonAci.current) % 360) + 540) % 360) - 180;
    sonAci.current += fark;
    donus.value = withTiming(sonAci.current, { duration: 200 });
  }, [yon, donus]);
  const gulStili = useAnimatedStyle(() => ({ transform: [{ rotate: `${donus.value}deg` }] }));

  const fark = yon === null ? null : kibleFarki(yon, kible);
  const donuk = fark !== null && kibleyeDonuk(fark);
  const oncekiDonuk = useRef(false);
  useEffect(() => {
    if (donuk && !oncekiDonuk.current) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    oncekiDonuk.current = donuk;
  }, [donuk]);

  const vurgu = donuk ? renk.onay : renk.altin;

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('kible.baslik') }} />
      <SafeAreaView style={stil.kap} edges={['bottom', 'left', 'right']}>
        <View style={stil.ust}>
          <Text style={stil.konum}>{veri.ayarlar.konum.ad}</Text>
          <Text style={stil.aci}>{t('kible.aci', { aci: Math.round(kible) })}</Text>
        </View>

        <View style={stil.pusulaKap}>
          {/* Sabit ok: telefonun baktığı yön */}
          <Svg width={28} height={22} style={stil.ok}>
            <Path d="M14 22 L2 0 H26 Z" fill={vurgu} />
          </Svg>
          <Animated.View style={[{ width: BOYUT, height: BOYUT }, durum === 'calisiyor' && gulStili]}>
            <Gul kible={kible} vurgu={vurgu} />
          </Animated.View>
        </View>

        <View style={stil.alt}>
          {durum === 'calisiyor' ? (
            <Text style={[stil.durum, donuk && { color: renk.onay }]}>{donuk ? t('kible.dogru') : t('kible.yonelt')}</Text>
          ) : null}
          {durum === 'pusulaYok' ? <Text style={stil.durum}>{t('kible.pusulaYok')}</Text> : null}
          {durum === 'izinYok' ? (
            <>
              <Text style={stil.durum}>{t('kible.izinGerek')}</Text>
              <Dugme metin={t('kible.izinVer')} onPress={izinIste} />
            </>
          ) : null}
          <Text style={stil.not}>{t('kible.kalibre')}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

/** Pusula gülü: kuzey kırmızı uçla, Kâbe kıble açısında. Gül 0°'de kuzey yukarıdadır. */
function Gul({ kible, vurgu }: { kible: number; vurgu: string }) {
  const r = M - 6;
  const cizgiler = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <Svg width={BOYUT} height={BOYUT}>
      <Circle cx={M} cy={M} r={r} fill={renk.gece} />
      <Circle cx={M} cy={M} r={r - 30} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {cizgiler.map((a) => {
        const uzun = a % 45 === 0;
        return (
          <Line
            key={a}
            x1={M}
            y1={M - r + 6}
            x2={M}
            y2={M - r + (uzun ? 20 : 12)}
            stroke={uzun ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'}
            strokeWidth={uzun ? 2 : 1}
            transform={`rotate(${a} ${M} ${M})`}
          />
        );
      })}
      {/* Kuzey ucu */}
      <Path d={`M${M} ${M - r + 24} l-7 14 h14 Z`} fill={renk.alev} />
      {/* Kıble çizgisi ve Kâbe */}
      <G transform={`rotate(${kible} ${M} ${M})`}>
        <Line x1={M} y1={M} x2={M} y2={M - r + 58} stroke={vurgu} strokeWidth={3} strokeLinecap="round" />
        <G transform={`translate(${M - 15} ${M - r + 28})`}>
          <Rect x={0} y={0} width={30} height={30} rx={3} fill="#0E0E10" stroke={vurgu} strokeWidth={1.5} />
          <Rect x={0} y={8} width={30} height={5} fill={vurgu} />
        </G>
      </G>
      <Circle cx={M} cy={M} r={7} fill={vurgu} />
    </Svg>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin, padding: olcu.ekranBosluk, gap: 20 },
  ust: { alignItems: 'center', gap: 2, marginTop: 8 },
  konum: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  aci: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.metin, textAlign: 'center' },
  pusulaKap: { alignItems: 'center', gap: 6 },
  ok: { marginBottom: -2 },
  alt: { gap: 12, alignItems: 'stretch' },
  durum: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin, textAlign: 'center', lineHeight: 24 },
  not: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin, textAlign: 'center', lineHeight: 20 },
});
