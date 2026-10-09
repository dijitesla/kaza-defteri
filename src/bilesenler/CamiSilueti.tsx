import Svg, { Circle, Path } from 'react-native-svg';

// 360 x 64 birimlik siluet: ortada büyük kubbeli cami, iki minare, uzakta küçük kubbeler.
const UZAK =
  'M0 64V54h18a10 10 0 0 1 20 0h14v-6h10v6h8a8 8 0 0 1 16 0h10V64Z' +
  'M270 64V55h12a9 9 0 0 1 18 0h10v-7h9v7h12a8 8 0 0 1 16 0h13V64Z';
const CAMI =
  // gövde ve ana kubbe
  'M128 64V40h10a12 12 0 0 1 22 -4a20 20 0 0 1 40 0a12 12 0 0 1 22 4h10V64Z' +
  // minareler (külah, şerefe, gövde)
  'M110 64V22h-1v-3h10v3h-1V64Z M111 19L114 2L117 19Z' +
  'M242 64V22h-1v-3h10v3h-1V64Z M243 19L246 2L249 19Z' +
  // alem
  'M179.3 17h1.4v-7h-1.4Z';

/** Gökyüzü kartının altındaki cami silueti. */
export function CamiSilueti({ renk, uzakRenk }: { renk: string; uzakRenk: string }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 360 64" preserveAspectRatio="xMidYMax slice">
      <Path d={UZAK} fill={uzakRenk} />
      <Path d={CAMI} fill={renk} />
      <Circle cx={180} cy={8.5} r={2} fill={renk} />
    </Svg>
  );
}
