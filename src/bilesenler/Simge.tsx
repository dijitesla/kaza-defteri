import Svg, { Circle, Path } from 'react-native-svg';

export type SimgeAdi =
  | 'gunes'
  | 'saat'
  | 'defter'
  | 'ayar'
  | 'onay'
  | 'arti'
  | 'kalem'
  | 'yenile'
  | 'geri'
  | 'tespih'
  | 'pusula'
  | 'alev'
  | 'ok'
  | 'kitap'
  | 'hilal'
  | 'yildiz'
  | 'eller'
  | 'takvim'
  | 'zil';

// 24 × 24 birimlik, çizgi tarzı simgeler.
const CIZIMLER: Record<SimgeAdi, (r: string) => React.ReactNode> = {
  gunes: (r) => (
    <>
      <Circle cx={12} cy={12} r={4.2} stroke={r} strokeWidth={2} fill="none" />
      <Path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
        stroke={r}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </>
  ),
  saat: (r) => (
    <>
      <Circle cx={12} cy={12} r={8.5} stroke={r} strokeWidth={2} fill="none" />
      <Path d="M12 7.5V12l3 2" stroke={r} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  defter: (r) => (
    <Path
      d="M5 4.5h10.5a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12ZM5 16.5a3 3 0 0 1 3-3h10.5M9 8.5h6"
      stroke={r}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  ayar: (r) => (
    <>
      <Path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke={r} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={15} cy={7} r={2.2} stroke={r} strokeWidth={2} fill="none" />
      <Circle cx={9} cy={17} r={2.2} stroke={r} strokeWidth={2} fill="none" />
    </>
  ),
  onay: (r) => (
    <Path d="M5.5 12.5l4 4 9-9" stroke={r} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  arti: (r) => <Path d="M12 5.5v13M5.5 12h13" stroke={r} strokeWidth={2.4} strokeLinecap="round" />,
  kalem: (r) => (
    <Path
      d="M5 19l1-4 9.5-9.5a2 2 0 0 1 3 3L9 18l-4 1Z"
      stroke={r}
      strokeWidth={2}
      strokeLinejoin="round"
      fill="none"
    />
  ),
  yenile: (r) => (
    <Path
      d="M19 8.5A7.5 7.5 0 1 0 19.5 14M19.5 4v4.5H15"
      stroke={r}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  geri: (r) => (
    <Path
      d="M9 7L4.5 11.5 9 16M5 11.5h9a5 5 0 0 1 0 10h-2"
      stroke={r}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  tespih: (r) => (
    <>
      <Circle cx={12} cy={5} r={2} stroke={r} strokeWidth={1.8} fill="none" />
      <Circle cx={6.5} cy={9} r={2} stroke={r} strokeWidth={1.8} fill="none" />
      <Circle cx={17.5} cy={9} r={2} stroke={r} strokeWidth={1.8} fill="none" />
      <Circle cx={8} cy={15} r={2} stroke={r} strokeWidth={1.8} fill="none" />
      <Circle cx={16} cy={15} r={2} stroke={r} strokeWidth={1.8} fill="none" />
      <Path d="M12 17v4.5" stroke={r} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  pusula: (r) => (
    <>
      <Circle cx={12} cy={12} r={8.5} stroke={r} strokeWidth={2} fill="none" />
      <Path d="M14.8 9.2l-1.6 4-4 1.6 1.6-4 4-1.6Z" stroke={r} strokeWidth={1.8} strokeLinejoin="round" fill="none" />
    </>
  ),
  alev: (r) => (
    <Path
      d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5 3.4-8.4 2.2 1.4 2.6 3.4 2.4 5 1-.6 1.8-1.8 2-3.2 1.8 1.6 2.2 3.6 2.2 5.6 0 3.6-2.4 6.6-4 6.6Z"
      stroke={r}
      strokeWidth={2}
      strokeLinejoin="round"
      fill="none"
    />
  ),
  kitap: (r) => (
    <Path
      d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5c-3.5-.5-6.5 0-8.5 1.5ZM12 6.5v13"
      stroke={r}
      strokeWidth={2}
      strokeLinejoin="round"
      fill="none"
    />
  ),
  hilal: (r) => (
    <>
      <Path d="M15.5 4.2A8.5 8.5 0 1 0 19.8 15 7 7 0 0 1 15.5 4.2Z" stroke={r} strokeWidth={2} strokeLinejoin="round" fill="none" />
      <Path d="M18 5.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" fill={r} />
    </>
  ),
  yildiz: (r) => (
    <Path
      d="M12 3.5l2.4 3.3 4-.9-.9 4L21 12l-3.5 2.1.9 4-4-.9L12 20.5l-2.4-3.3-4 .9.9-4L3 12l3.5-2.1-.9-4 4 .9Z"
      stroke={r}
      strokeWidth={1.8}
      strokeLinejoin="round"
      fill="none"
    />
  ),
  eller: (r) => (
    <Path
      d="M11 20c-3 0-5-2-5-5V9.5a1.5 1.5 0 0 1 3 0V13M11 20V7a1.5 1.5 0 0 0-3 0M13 20c3 0 5-2 5-5V9.5a1.5 1.5 0 0 0-3 0V13M13 20V7a1.5 1.5 0 0 1 3 0"
      stroke={r}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  takvim: (r) => (
    <>
      <Path d="M5 6.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1ZM4 10.5h16M8.5 4v4M15.5 4v4" stroke={r} strokeWidth={2} strokeLinecap="round" fill="none" />
      <Circle cx={8.5} cy={14.5} r={1.2} fill={r} />
      <Circle cx={12} cy={14.5} r={1.2} fill={r} />
      <Circle cx={15.5} cy={14.5} r={1.2} fill={r} />
    </>
  ),
  zil: (r) => (
    <Path
      d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15ZM10 20.5a2 2 0 0 0 4 0"
      stroke={r}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  ok: (r) => (
    <Path d="M9 5.5l6.5 6.5L9 18.5" stroke={r} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
};

export function Simge({ ad, renk, boyut = 24 }: { ad: SimgeAdi; renk: string; boyut?: number }) {
  return (
    <Svg width={boyut} height={boyut} viewBox="0 0 24 24" accessible={false}>
      {CIZIMLER[ad](renk)}
    </Svg>
  );
}
