import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, G, Path, RadialGradient, Stop } from 'react-native-svg';

/** Güneş: sıcak tonlu çekirdek, yumuşak hale ve yavaşça dönen ışınlar. */
export function Gunes({ boyut }: { boyut: number }) {
  const donus = useSharedValue(0);
  const nabiz = useSharedValue(1);
  useEffect(() => {
    donus.value = withRepeat(withTiming(360, { duration: 40_000, easing: Easing.linear }), -1);
    nabiz.value = withRepeat(
      withSequence(withTiming(1.08, { duration: 2200 }), withTiming(1, { duration: 2200 })),
      -1,
    );
  }, [donus, nabiz]);
  const isinStili = useAnimatedStyle(() => ({ transform: [{ rotate: `${donus.value}deg` }] }));
  const haleStili = useAnimatedStyle(() => ({ transform: [{ scale: nabiz.value }] }));
  const r = boyut / 2;

  return (
    <Animated.View style={{ width: boyut, height: boyut }}>
      <Animated.View style={[{ position: 'absolute', width: boyut, height: boyut }, haleStili]}>
        <Svg width={boyut} height={boyut}>
          <Defs>
            <RadialGradient id="hale" cx="50%" cy="50%" r="50%">
              <Stop offset="0.35" stopColor="#FFD873" stopOpacity="0.55" />
              <Stop offset="1" stopColor="#FFB547" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx={r} cy={r} r={r} fill="url(#hale)" />
        </Svg>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', width: boyut, height: boyut }, isinStili]}>
        <Svg width={boyut} height={boyut}>
          <G opacity={0.7}>
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * Math.PI) / 6;
              const ic = r * 0.5;
              const dis = r * (i % 2 ? 0.72 : 0.82);
              return (
                <Path
                  key={i}
                  d={`M${r + Math.cos(a) * ic} ${r + Math.sin(a) * ic}L${r + Math.cos(a) * dis} ${r + Math.sin(a) * dis}`}
                  stroke="#FFC94D"
                  strokeWidth={boyut * 0.035}
                  strokeLinecap="round"
                />
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      <Svg width={boyut} height={boyut} style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="cekirdek" cx="40%" cy="38%" r="65%">
            <Stop offset="0" stopColor="#FFF6C9" />
            <Stop offset="0.55" stopColor="#FFD24A" />
            <Stop offset="1" stopColor="#F59E1B" />
          </RadialGradient>
        </Defs>
        <Circle cx={r} cy={r} r={r * 0.38} fill="url(#cekirdek)" />
      </Svg>
    </Animated.View>
  );
}

/**
 * Ay: evresine göre aydınlık kısmı çizilir (0 yeni ay, 0,5 dolunay).
 * Karanlık kısım hafifçe görünür; ay yavaşça süzülür.
 */
export function Ay({ boyut, evre, acikZemin = false }: { boyut: number; evre: number; acikZemin?: boolean }) {
  const suzulme = useSharedValue(0);
  useEffect(() => {
    suzulme.value = withRepeat(
      withSequence(withTiming(-2, { duration: 3000 }), withTiming(2, { duration: 3000 })),
      -1,
      true,
    );
  }, [suzulme]);
  const stilAnim = useAnimatedStyle(() => ({ transform: [{ translateY: suzulme.value }] }));

  const r = boyut / 2;
  const ar = r * (acikZemin ? 0.6 : 0.42); // ay diskinin yarıçapı
  const yol = ayAydinlikYolu(r, r, ar, evre);

  return (
    <Animated.View style={[{ width: boyut, height: boyut }, stilAnim]}>
      <Svg width={boyut} height={boyut}>
        <Defs>
          <RadialGradient id="ayHale" cx="50%" cy="50%" r="50%">
            <Stop offset="0.4" stopColor="#E9EEF8" stopOpacity="0.35" />
            <Stop offset="1" stopColor="#E9EEF8" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        {acikZemin ? null : <Circle cx={r} cy={r} r={r} fill="url(#ayHale)" />}
        <Circle
          cx={r}
          cy={r}
          r={ar}
          fill={acikZemin ? '#2E3A63' : '#3A4466'}
          opacity={acikZemin ? 0.9 : 0.55}
          stroke={acikZemin ? '#1C2541' : 'none'}
          strokeWidth={1}
        />
        {yol ? <Path d={yol} fill={acikZemin ? '#F2E3B3' : '#F4F1E4'} /> : null}
        <Circle cx={r - ar * 0.3} cy={r - ar * 0.2} r={ar * 0.12} fill="#000" opacity={0.06} />
        <Circle cx={r + ar * 0.25} cy={r + ar * 0.3} r={ar * 0.17} fill="#000" opacity={0.05} />
      </Svg>
    </Animated.View>
  );
}

/** Ayın aydınlık kısmının SVG yolu. Büyüyen ayda sağ, küçülen ayda sol taraf aydınlıktır. */
export function ayAydinlikYolu(cx: number, cy: number, r: number, evre: number): string | null {
  const e = ((evre % 1) + 1) % 1;
  const aydinlik = (1 - Math.cos(2 * Math.PI * e)) / 2; // 0..1
  if (aydinlik < 0.02) return null; // yeni ay
  const ust = `${cx} ${cy - r}`;
  const alt = `${cx} ${cy + r}`;
  const rx = r * Math.abs(Math.cos(2 * Math.PI * e)); // ayrım çizgisinin (terminatör) yarı genişliği
  const buyuyen = e < 0.5;
  const kenar = buyuyen ? 1 : 0; // dış kenarın çizim yönü
  const hilal = aydinlik < 0.5;
  // Hilalde terminatör aydınlık tarafa, şişkin ayda karanlık tarafa doğru kavislenir.
  const ic = buyuyen ? (hilal ? 0 : 1) : hilal ? 1 : 0;
  return `M${ust} A${r} ${r} 0 0 ${kenar} ${alt} A${rx} ${r} 0 0 ${ic} ${ust} Z`;
}
