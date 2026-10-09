import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated';
import type { YayDurumu } from '../logic/gunluk';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import type { Vakit } from '../types';
import { Simge } from './Simge';

export interface NamazSatiri {
  vakit: Vakit;
  ad: string;
  saat: string;
  durum: YayDurumu;
}

const PARCACIK = 14;
const TESBIHAT_SURE = 8000;

/**
 * Bugünün beş vakti: girmiş vakte dokununca "Kıldım", kılınmış vakte dokununca işaret kalkar.
 * Beşi de kılınınca kısa bir kutlama gösterilir.
 */
export function NamazlarKarti({
  satirlar,
  onKildim,
  onKaldir,
}: {
  satirlar: NamazSatiri[];
  onKildim: (v: Vakit) => void;
  onKaldir: (v: Vakit) => void;
}) {
  const tamam = satirlar.every((s) => s.durum === 'kilindi');
  const [tesbihat, setTesbihat] = useState(false);
  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);
  const patlama = useSharedValue(0);
  const oncekiTamam = useRef(tamam);

  useEffect(() => {
    // Yalnızca bu oturumda tamamlanınca kutlanır (ekran açıldığında zaten tamamsa değil).
    if (tamam && !oncekiTamam.current) {
      patlama.value = 0;
      patlama.value = withTiming(1, { duration: 1100 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
    oncekiTamam.current = tamam;
  }, [tamam, patlama]);

  useEffect(() => () => {
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
  }, []);

  const dokun = (s: NamazSatiri) => {
    if (s.durum === 'kilindi' || s.durum === 'muaf') {
      onKaldir(s.vakit);
      return;
    }
    if (s.durum !== 'devam' && s.durum !== 'cevapsiz') return;
    onKildim(s.vakit);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setTesbihat(true);
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
    zamanlayici.current = setTimeout(() => setTesbihat(false), TESBIHAT_SURE);
  };

  return (
    <View style={stil.kart}>
      <View style={stil.ust}>
        <Text style={stil.baslik}>{t('namaz.baslik')}</Text>
        {tesbihat ? (
          <Pressable
            onPress={() => {
              setTesbihat(false);
              router.push({ pathname: '/zikirmatik', params: { mod: 'tesbihat' } });
            }}
            accessibilityRole="button"
            hitSlop={8}
            style={stil.tesbihat}
          >
            <Simge ad="tespih" renk={renk.altinUstu} boyut={14} />
            <Text style={stil.tesbihatMetin}>{t('namaz.tesbihat')}</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={stil.sira}>
        {satirlar.map((s) => (
          <VakitDairesi key={s.vakit} s={s} onPress={() => dokun(s)} />
        ))}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {Array.from({ length: PARCACIK }, (_, i) => (
            <Parcacik key={i} i={i} p={patlama} />
          ))}
        </View>
      </View>

      <Text style={[stil.alt, tamam && stil.tamam]}>{tamam ? t('namaz.tamam') : t('namaz.ipucu')}</Text>
    </View>
  );
}

function VakitDairesi({ s, onPress }: { s: NamazSatiri; onPress: () => void }) {
  const kilindi = s.durum === 'kilindi';
  const acik = s.durum === 'devam' || s.durum === 'cevapsiz';
  const dokunulur = acik || kilindi || s.durum === 'muaf';
  const daire = [
    stil.daire,
    kilindi && { backgroundColor: renk.onay, borderColor: renk.onay },
    s.durum === 'kilinamadi' && { backgroundColor: renk.kilinamadiZemin, borderColor: renk.kilinamadi },
    s.durum === 'muaf' && { backgroundColor: renk.muafZemin, borderColor: renk.muaf },
    acik && { borderColor: renk.altin, borderWidth: 2.5, backgroundColor: renk.altinZemin },
    s.durum === 'cevapsiz' && { borderColor: renk.kilinamadi },
    (s.durum === 'gelecek' || s.durum === 'siradaki') && stil.gelecek,
  ];
  return (
    <Pressable
      onPress={onPress}
      disabled={!dokunulur}
      accessibilityRole="button"
      accessibilityLabel={kilindi ? t('namaz.kaldirEtiket', { Vakit: s.ad }) : t('namaz.kildimEtiket', { Vakit: s.ad })}
      accessibilityState={{ disabled: !dokunulur, checked: kilindi }}
      style={({ pressed }) => [stil.hucre, pressed && { opacity: 0.7 }]}
    >
      <View style={daire}>
        {kilindi ? <Simge ad="onay" renk={renk.beyaz} boyut={24} /> : null}
        {s.durum === 'kilinamadi' ? (
          <View style={{ transform: [{ rotate: '45deg' }] }}>
            <Simge ad="arti" renk={renk.kilinamadi} boyut={22} />
          </View>
        ) : null}
      </View>
      <Text style={[stil.ad, (s.durum === 'gelecek' || s.durum === 'siradaki') && { color: renk.ikincilMetin }]} numberOfLines={1}>
        {s.ad}
      </Text>
      <Text style={stil.saat}>{s.saat}</Text>
    </Pressable>
  );
}

/** Kutlama parçacığı: merkezden dışa doğru açılıp kaybolur. */
function Parcacik({ i, p }: { i: number; p: SharedValue<number> }) {
  const aci = (i / PARCACIK) * Math.PI * 2;
  const mesafe = 70 + (i % 3) * 22;
  const boyut = 6 + (i % 4) * 2;
  const renkler = [renk.altin, renk.onay, renk.altin, '#F3C969'];
  const s = useAnimatedStyle(() => {
    const v = p.value;
    return {
      opacity: v === 0 || v === 1 ? 0 : 1 - v,
      transform: [
        { translateX: Math.cos(aci) * mesafe * v },
        { translateY: Math.sin(aci) * mesafe * 0.6 * v - 10 * v },
        { scale: 0.6 + v },
        { rotate: `${v * 180}deg` },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        { position: 'absolute', left: '50%', top: '40%', width: boyut, height: boyut, borderRadius: i % 2 ? boyut / 2 : 2, backgroundColor: renkler[i % 4] },
        s,
      ]}
    />
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, gap: 10 },
  ust: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 28 },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  tesbihat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: renk.altin,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tesbihatMetin: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.altinUstu },
  sira: { flexDirection: 'row', justifyContent: 'space-between' },
  hucre: { flex: 1, alignItems: 'center', gap: 4 },
  daire: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: renk.pasifCizgi,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gelecek: { borderStyle: 'dashed', backgroundColor: 'transparent' },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.metin },
  saat: { fontFamily: yaziTipi.normal, fontSize: 11, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
  alt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, textAlign: 'center' },
  tamam: { fontFamily: yaziTipi.kalin, color: renk.onay },
});
