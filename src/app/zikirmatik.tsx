import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Secenekler } from '../bilesenler/Secenekler';
import { depolama } from '../depolama';
import {
  bosTesbihat,
  bosZikir,
  TESBIHAT_ADIMLARI,
  TESBIHAT_SAYISI,
  tesbihatArttir,
  ZIKIR_HEDEFLERI,
  zikirArttir,
  zikirHedefi,
  zikirSifirla,
  type TesbihatDurumu,
  type ZikirDurumu,
  type ZikirHedefi,
} from '../logic/zikir';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

const HALKA = 260;
const KALINLIK = 14;
const CEVRE = Math.PI * (HALKA - KALINLIK);
const AnimasyonluDaire = Animated.createAnimatedComponent(Circle);

type Mod = 'sayac' | 'tesbihat';
const TESBIHAT_KELIMELERI = ['tesbihat.subhanallah', 'tesbihat.elhamdulillah', 'tesbihat.allahuEkber'] as const;

export default function Zikirmatik() {
  const params = useLocalSearchParams<{ mod?: string }>();
  const [mod, setMod] = useState<Mod>(params.mod === 'tesbihat' ? 'tesbihat' : 'sayac');
  const [tes, setTes] = useState<TesbihatDurumu>(bosTesbihat);
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

  const tesBitti = tes.adim >= TESBIHAT_ADIMLARI;
  useEffect(() => {
    if (mod === 'tesbihat') {
      ilerleme.value = withTiming(tesBitti ? 1 : tes.sayi / TESBIHAT_SAYISI, { duration: 180 });
    } else if (d) {
      ilerleme.value = withTiming(d.hedef ? d.sayi / d.hedef : 0, { duration: 180 });
    }
  }, [d, tes, mod, tesBitti, ilerleme]);

  const mesajGoster = (m: string) => {
    setMesaj(m);
    if (mesajZamanlayici.current) clearTimeout(mesajZamanlayici.current);
    mesajZamanlayici.current = setTimeout(() => setMesaj(null), 2500);
  };

  const guncelle = (yeni: ZikirDurumu) => {
    setD(yeni);
    depolama.zikirYaz(yeni).catch(() => {});
  };

  const say = () => {
    if (mod === 'tesbihat') {
      if (tesBitti) return;
      const r = tesbihatArttir(tes);
      basinc.value = withSequence(withTiming(0.96, { duration: 60 }), withSpring(1));
      if (r.adimBitti) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setTes(r.durum);
      return;
    }
    if (!d) return;
    const { durum, turTamam } = zikirArttir(d);
    basinc.value = withSequence(withTiming(0.96, { duration: 60 }), withSpring(1));
    if (turTamam) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      mesajGoster(t('zikir.tur', { n: durum.tur }));
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
            <Secenekler<Mod>
              secenekler={[
                { deger: 'sayac', etiket: t('zikir.modSayac') },
                { deger: 'tesbihat', etiket: t('zikir.modTesbihat') },
              ]}
              deger={mod}
              onChange={(m) => {
                setMod(m);
                setMesaj(null);
              }}
            />
            {mod === 'sayac' ? (
              <View style={stil.ust}>
                <Text style={stil.etiket}>{t('zikir.hedef')}</Text>
                <Secenekler<ZikirHedefi>
                  gorunum="cip"
                  secenekler={ZIKIR_HEDEFLERI.map((h) => ({ deger: h, etiket: h ? String(h) : t('zikir.serbest') }))}
                  deger={d.hedef}
                  onChange={(h) => guncelle(zikirHedefi(d, h))}
                />
              </View>
            ) : (
              <View style={stil.adimlar}>
                {TESBIHAT_KELIMELERI.map((k, i) => (
                  <View key={k} style={[stil.adim, i < tes.adim && stil.adimBitti, i === tes.adim && stil.adimSimdi]}>
                    <Text style={[stil.adimMetin, (i < tes.adim || i === tes.adim) && { color: i < tes.adim ? renk.beyaz : renk.metin }]} numberOfLines={1}>
                      {t(k)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <Pressable
              onPress={say}
              style={stil.alan}
              accessibilityRole="button"
              accessibilityLabel={
                mod === 'tesbihat'
                  ? `${tesBitti ? t('tesbihat.bitti') : t(TESBIHAT_KELIMELERI[tes.adim])}. ${tes.sayi} / ${TESBIHAT_SAYISI}`
                  : `${t('zikir.dokun')}. ${d.sayi}${d.hedef ? ' / ' + d.hedef : ''}`
              }
            >
              <Animated.View style={[stil.halkaKap, basincStili]}>
                <Svg width={HALKA} height={HALKA} style={StyleSheet.absoluteFill}>
                  <Circle
                    cx={HALKA / 2}
                    cy={HALKA / 2}
                    r={(HALKA - KALINLIK) / 2}
                    stroke={renk.yayCizgi}
                    strokeWidth={KALINLIK}
                    fill={renk.kart}
                  />
                  {mod === 'tesbihat' || d.hedef ? (
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
                {mod === 'tesbihat' ? (
                  tesBitti ? (
                    <Text style={stil.bitti}>{t('tesbihat.bitti')}</Text>
                  ) : (
                    <>
                      <Text style={stil.kelime} numberOfLines={1} adjustsFontSizeToFit>
                        {t(TESBIHAT_KELIMELERI[tes.adim])}
                      </Text>
                      <Text style={stil.sayi} maxFontSizeMultiplier={1.2}>
                        {tes.sayi}
                      </Text>
                      <Text style={stil.hedef}>
                        / {TESBIHAT_SAYISI} · {t('tesbihat.adim', { n: tes.adim + 1 })}
                      </Text>
                    </>
                  )
                ) : (
                  <>
                    <Text style={stil.sayi} maxFontSizeMultiplier={1.2}>
                      {d.sayi}
                    </Text>
                    {d.hedef ? <Text style={stil.hedef}>/ {d.hedef}</Text> : null}
                  </>
                )}
              </Animated.View>
              {mod === 'sayac' ? (
                <>
                  <Text style={stil.ipucu}>{mesaj ?? t('zikir.dokun')}</Text>
                  {d.tur > 0 && !mesaj ? <Text style={stil.tur}>{t('zikir.tur', { n: d.tur })}</Text> : null}
                </>
              ) : !tesBitti ? (
                <Text style={stil.ipucu}>{t('zikir.dokun')}</Text>
              ) : null}
            </Pressable>

            {mod === 'sayac' ? (
              <Pressable onPress={sifirla} accessibilityRole="button" style={stil.sifirla} hitSlop={8}>
                <Text style={stil.sifirlaMetin}>{t('zikir.sifirla')}</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setTes(bosTesbihat())} accessibilityRole="button" style={stil.sifirla} hitSlop={8}>
                <Text style={[stil.sifirlaMetin, { color: renk.metin }]}>{t('tesbihat.yeniden')}</Text>
              </Pressable>
            )}
          </>
        ) : null}
      </SafeAreaView>
    </>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin, padding: olcu.ekranBosluk },
  ust: { gap: 8, marginTop: 12 },
  adimlar: { flexDirection: 'row', gap: 6, marginTop: 12 },
  adim: { flex: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 4, backgroundColor: renk.pasifZemin, alignItems: 'center' },
  adimBitti: { backgroundColor: renk.onay },
  adimSimdi: { backgroundColor: renk.altinZemin, borderWidth: 1.5, borderColor: renk.altin },
  adimMetin: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.ikincilMetin },
  kelime: { fontFamily: yaziTipi.baslik, fontSize: 24, color: renk.altin, maxWidth: HALKA - 60 },
  bitti: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.onay, textAlign: 'center', paddingHorizontal: 36, lineHeight: 28 },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.metin },
  alan: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18 },
  halkaKap: { width: HALKA, height: HALKA, alignItems: 'center', justifyContent: 'center' },
  sayi: { fontFamily: yaziTipi.baslik, fontSize: 72, lineHeight: 84, color: renk.metin, fontVariant: ['tabular-nums'] },
  hedef: { fontFamily: yaziTipi.normal, fontSize: 16, color: renk.ikincilMetin },
  ipucu: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.ikincilMetin, textAlign: 'center' },
  tur: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.onay },
  sifirla: { alignSelf: 'center', minHeight: olcu.dokunmaMin, justifyContent: 'center', paddingHorizontal: 20 },
  sifirlaMetin: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.kilinamadi },
});
