import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';
import { renk } from '../tema';

const K = 64; // desen karesi

// Sekiz köşeli yıldız (iç içe iki kare) ve köşeleri bağlayan ince çizgiler.
const YILDIZ = (() => {
  const m = K / 2;
  const a = 13;
  const d = a * Math.SQRT2;
  const kare = `M${m - a} ${m - a}H${m + a}V${m + a}H${m - a}Z`;
  const elmas = `M${m} ${m - d}L${m + d} ${m}L${m} ${m + d}L${m - d} ${m}Z`;
  const baglar = `M0 0L${m - d * 0.72} ${m - d * 0.72}M${K} 0L${m + d * 0.72} ${m - d * 0.72}M0 ${K}L${m - d * 0.72} ${m + d * 0.72}M${K} ${K}L${m + d * 0.72} ${m + d * 0.72}`;
  return `${kare}${elmas}${baglar}`;
})();

/** Ekran arka planı için çok silik İslami geometrik desen. Dokunmayı engellemez. */
export function DesenZemin() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id="desen" x="0" y="0" width={K} height={K} patternUnits="userSpaceOnUse">
            <Path d={YILDIZ} stroke={renk.desen} strokeWidth={1.2} fill="none" />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#desen)" />
      </Svg>
    </View>
  );
}
