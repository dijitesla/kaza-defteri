import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Secenekler } from '../bilesenler/Secenekler';
import { depolama } from '../depolama';
import { bosZikir, ZIKIR_HEDEFLERI, zikirArttir, zikirHedefi, zikirSifirla, type ZikirDurumu, type ZikirHedefi } from '../logic/zikir';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

const HALKA = 260;
const KALINLIK = 14;
const CEVRE = Math.PI * (HALKA - KALINLIK);
const AnimasyonluDaire = Animated.createAnimatedComponent(Circle);

export default function Zikirmatik() {
  const [d, setD] = useState<ZikirDurumu | null>(null);
  const [mesaj, setMesaj] = useState<string | null>(null);
  const mesajZamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ilerleme = useSharedValue(0);
  const basinc = useSharedValue(1);

  useEffect(() => {
    depolama.zikirOku().then(setD).catch(() => setD(bosZikir()));
    return () => {
      if (mesajZamanlayici.current) clearTimeout(mesajZamanlayici.current);
    };
  }, []);

  useEffect(() => {
    if (!d) return;
    ilerleme.value = withTiming(d.hedef ? d.sayi / d.hedef : 0, { duration: 180 });
  }, [d, ilerleme]);

  const guncelle = (yeni: ZikirDurumu) => {
    setD(yeni);
    depolama.zikirYaz(yeni).catch(() => {});
  };

  const say = () => {
    if (!d) return;
    const { durum, turTamam } = zikirArttir(d);
    basinc.value = withSequence(withTiming(0.96, { duration: 60 }), withSpring(1));
    if (turTamam) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setMesaj(t('zikir.tur', { n: durum.tur }));
      if (mesajZamanlayici.current) clearTimeout(mesajZamanlayici.current);
      mesajZamanlayici.current = setTimeout(() => setMesaj(null), 2500);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    guncelle(durum);
  };

  const sifirla = () => {
    if (!d) return;
    Alert.alert(t('zikir.sifirlaSoru'), undefined, [
      { text: t('genel.vazgec'), style: 'cancel' },
      { text: t('zikir.sifirla'), style: 'destructive', onPress: () => guncelle(zikirSifirla(d)) },
    ]);
  };

  const halkaProps = useAnimatedProps(() => ({ strokeDashoffset: CEVRE * (1 - ilerleme.value) }));
  const basincStili = useAnimatedStyle(() => ({ transform: [{ scale: basinc.value }] }));

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('zikir.baslik') }} />
      <SafeAreaView style={stil.kap} edges={['bottom', 'left', 'right']}>
        {d ? (
          <>
            <View style={stil.ust}>
              <Text style={stil.etiket}>{t('zikir.hedef')}</Text>
              <Secenekler<ZikirHedefi>
                gorunum="cip"
                secenekler={ZIKIR_HEDEFLERI.map((h) => ({ deger: h, etiket: h ? String(h) : t('zikir.serbest') }))}
                deger={d.hedef}
                onChange={(h) => guncelle(zikirHedefi(d, h))}
              />
            </View>

            <Pressable
              onPress={say}
              style={stil.alan}
              accessibilityRole="button"
              accessibilityLabel={`${t('zikir.dokun')}. ${d.sayi}${d.hedef ? ' / ' + d.hedef : ''}`}
            >
              <Animated.View style={[stil.halkaKap, basincStili]}>
                <Svg width={HALKA} height={HALKA} style={StyleSheet.absoluteFill}>
                  <Circle
                    cx={HALKA / 2}
                    cy={HALKA / 2}
                    r={(HALKA - KALINLIK) / 2}
                    stroke="#E3E7EE"
                    strokeWidth={KALINLIK}
                    fill={renk.kart}
                  />
                  {d.hedef ? (
                    <AnimasyonluDaire
                      cx={HALKA / 2}
                      cy={HALKA / 2}
                      r={(HALKA - KALINLIK) / 2}
                      stroke={renk.altin}
                      strokeWidth={KALINLIK}
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${CEVRE} ${CEVRE}`}
                      animatedProps={halkaProps}
                      transform={`rotate(-90 ${HALKA / 2} ${HALKA / 2})`}
                    />
                  ) : null}
                </Svg>
                <Text style={stil.sayi} maxFontSizeMultiplier={1.2}>
                  {d.sayi}
                </Text>
                {d.hedef ? <Text style={stil.hedef}>/ {d.hedef}</Text> : null}
              </Animated.View>
              <Text style={stil.ipucu}>{mesaj ?? t('zikir.dokun')}</Text>
              {d.tur > 0 && !mesaj ? <Text style={stil.tur}>{t('zikir.tur', { n: d.tur })}</Text> : null}
            </Pressable>

            <Pressable onPress={sifirla} accessibilityRole="button" style={stil.sifirla} hitSlop={8}>
              <Text style={stil.sifirlaMetin}>{t('zikir.sifirla')}</Text>
            </Pressable>
          </>
        ) : null}
      </SafeAreaView>
    </>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin, padding: olcu.ekranBosluk },
  ust: { gap: 8 },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece },
  alan: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18 },
  halkaKap: { width: HALKA, height: HALKA, alignItems: 'center', justifyContent: 'center' },
  sayi: { fontFamily: yaziTipi.baslik, fontSize: 72, lineHeight: 84, color: renk.gece, fontVariant: ['tabular-nums'] },
  hedef: { fontFamily: yaziTipi.normal, fontSize: 16, color: renk.ikincilMetin },
  ipucu: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.ikincilMetin, textAlign: 'center' },
  tur: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.onay },
  sifirla: { alignSelf: 'center', minHeight: olcu.dokunmaMin, justifyContent: 'center', paddingHorizontal: 20 },
  sifirlaMetin: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.kilinamadi },
});
