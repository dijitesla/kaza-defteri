import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { VAKIT_NOKTALARI, type GokCismi } from '../logic/gokyuzu';
import type { YayDurumu } from '../logic/gunluk';
import { olcu, renk, yaziTipi } from '../tema';
import { Ay, Gunes } from './GokCismi';

export interface YayVakti {
  ad: string;
  saat: string;
  durum: YayDurumu;
}

// İkinci dereceden eğri, 220 × 70 birimlik kutuda: P0 (12, 60), P1 (110, -16), P2 (208, 60).
const E = { x0: 12, x1: 110, x2: 208, y0: 60, y1: -16, y2: 60, g: 220, h: 70 };
const UST_BOSLUK = 24; // gök cisminin yayın üstüne taşabilmesi için
const ETIKET_YUKSEKLIK = 40;
const ETIKET_GENISLIK = 72;
const CISIM = 44;
const ETIKET_BUYUTME_SINIRI = 1.3;

function nokta(t: number) {
  'worklet';
  const a = (1 - t) * (1 - t);
  const b = 2 * (1 - t) * t;
  const c = t * t;
  return { x: a * E.x0 + b * E.x1 + c * E.x2, y: a * E.y0 + b * E.y1 + c * E.y2 };
}

function yayYolu(bas: number, son: number, olcek: number): string {
  const adim = 40;
  let d = '';
  for (let i = 0; i <= adim; i++) {
    const p = nokta(bas + ((son - bas) * i) / adim);
    d += `${i ? 'L' : 'M'}${(p.x * olcek).toFixed(1)} ${(p.y * olcek + UST_BOSLUK).toFixed(1)}`;
  }
  return d;
}

interface Props {
  vakitler: YayVakti[];
  cisim: GokCismi;
  ayEvre: number;
  /** Gece (yatsıdan imsaka) ilerleme çizgisi çizilmez; ay yay boyunca süzülür. */
  gece: boolean;
}

/** Günün beş vakti yay üzerinde; güneş ya da ay o anki yerinde, kayarak ilerler. */
export function GunYayi({ vakitler, cisim, ayEvre, gece }: Props) {
  const [genislik, setGenislik] = useState(0);
  const olcek = genislik / E.g;
  const yukseklik = E.h * olcek + UST_BOSLUK + ETIKET_YUKSEKLIK;

  const konum = useSharedValue(cisim.konum);
  const olcekDeger = useSharedValue(olcek);
  useEffect(() => {
    konum.value = withTiming(cisim.konum, { duration: 1200, easing: Easing.out(Easing.cubic) });
  }, [cisim.konum, konum]);
  useEffect(() => {
    olcekDeger.value = olcek;
  }, [olcek, olcekDeger]);

  const cisimStili = useAnimatedStyle(() => {
    const p = nokta(konum.value);
    return {
      transform: [
        { translateX: p.x * olcekDeger.value - CISIM / 2 },
        { translateY: p.y * olcekDeger.value + UST_BOSLUK - CISIM / 2 },
      ],
    };
  });

  const gunduz = cisim.tur === 'gunes';

  return (
    <View
      style={stil.kart}
      onLayout={(e) => setGenislik(e.nativeEvent.layout.width - 24)}
      accessible
      accessibilityLabel={vakitler.map((v) => `${v.ad} ${v.saat}`).join(', ')}
    >
      {genislik > 0 ? (
        <View style={{ width: genislik, height: yukseklik }}>
          <Svg width={genislik} height={yukseklik} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="gecilen" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={gunduz ? '#F3C969' : '#7E8BC4'} />
                <Stop offset="1" stopColor={gunduz ? renk.altin : '#4B5A9A'} />
              </LinearGradient>
            </Defs>
            {/* ufuk çizgisi */}
            <Path
              d={`M0 ${E.y0 * olcek + UST_BOSLUK + 2} H${genislik}`}
              stroke="#E6EAF0"
              strokeWidth={1}
            />
            {/* tüm yay (kesikli) ve geçilen kısım */}
            <Path d={yayYolu(0, 1, olcek)} stroke="#D9DEE6" strokeWidth={2} strokeDasharray="4 5" fill="none" />
            {gece ? null : (
              <Path
                d={yayYolu(0, Math.max(0.001, cisim.konum), olcek)}
                stroke="url(#gecilen)"
                strokeWidth={3.5}
                strokeLinecap="round"
                fill="none"
              />
            )}
            {vakitler.map((v, i) => {
              const p = nokta(VAKIT_NOKTALARI[i]);
              return <VakitNoktasi key={v.ad} x={p.x * olcek} y={p.y * olcek + UST_BOSLUK} durum={v.durum} />;
            })}
          </Svg>

          <Animated.View style={[stil.cisim, cisimStili]} pointerEvents="none">
            {gunduz ? <Gunes boyut={CISIM} /> : <Ay boyut={CISIM} evre={ayEvre} acikZemin />}
          </Animated.View>

          {vakitler.map((v, i) => {
            const p = nokta(VAKIT_NOKTALARI[i]);
            const x = p.x * olcek;
            const sol = Math.min(Math.max(x - ETIKET_GENISLIK / 2, 0), genislik - ETIKET_GENISLIK);
            return (
              <View key={v.ad} pointerEvents="none" style={[stil.etiket, { left: sol, top: p.y * olcek + UST_BOSLUK + 12 }]}>
                <Text style={[stil.etiketAd, etiketStili[v.durum]]} numberOfLines={1} maxFontSizeMultiplier={ETIKET_BUYUTME_SINIRI}>
                  {v.ad}
                </Text>
                <Text style={[stil.etiketSaat, etiketStili[v.durum]]} numberOfLines={1} maxFontSizeMultiplier={ETIKET_BUYUTME_SINIRI}>
                  {v.saat}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

function VakitNoktasi({ x, y, durum }: { x: number; y: number; durum: YayDurumu }) {
  switch (durum) {
    case 'kilindi':
      return (
        <>
          <Circle cx={x} cy={y} r={8} fill={renk.onay} />
          <Path d={`M${x - 3.5} ${y}l2.5 2.5l4.5 -5`} stroke="#FFF" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 'kilinamadi':
      return (
        <>
          <Circle cx={x} cy={y} r={8} fill={renk.kilinamadi} />
          <Path d={`M${x - 3} ${y - 3}l6 6M${x + 3} ${y - 3}l-6 6`} stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" />
        </>
      );
    case 'muaf':
      return <Circle cx={x} cy={y} r={7} fill="#E9E1F3" stroke="#8E6BB8" strokeWidth={1.8} />;
    case 'siradaki':
      return (
        <>
          <Circle cx={x} cy={y} r={13} fill={renk.altin} opacity={0.22} />
          <Circle cx={x} cy={y} r={7.5} fill={renk.kart} stroke={renk.altin} strokeWidth={2.5} />
        </>
      );
    default:
      return <Circle cx={x} cy={y} r={6.5} fill={renk.kart} stroke="#B5BCC9" strokeWidth={1.5} />;
  }
}

const etiketStili = StyleSheet.create({
  kilindi: {},
  kilinamadi: {},
  muaf: { color: '#8E6BB8' },
  siradaki: { fontFamily: yaziTipi.kalin, color: renk.gece },
  gelecek: { color: renk.sekmePasif },
  devam: {},
  cevapsiz: {},
});

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap + 2, paddingHorizontal: 12, paddingTop: 4, paddingBottom: 2 },
  cisim: { position: 'absolute', left: 0, top: 0, width: CISIM, height: CISIM },
  etiket: { position: 'absolute', width: ETIKET_GENISLIK, alignItems: 'center' },
  etiketAd: { fontFamily: yaziTipi.normal, fontSize: 12, color: '#3B4152' },
  etiketSaat: { fontFamily: yaziTipi.kalin, fontSize: 12, color: '#3B4152', fontVariant: ['tabular-nums'] },
});
