import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { ayEvresi, geriSayimMetni, gunEvresi, type GunEvresi } from '../logic/gokyuzu';
import { saatMetni } from '../logic/tarih';
import { girisZamani, siradakiBaslik, type GununVakitleri } from '../logic/vakitler';
import { VAKIT_ADLARI } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { VAKITLER, type Vakit } from '../types';
import { Ay, Gunes } from './GokCismi';

const GOK: Record<GunEvresi, { renkler: string[]; yildiz: number }> = {
  gece: { renkler: ['#0A1029', '#18224A', '#22305E'], yildiz: 0.9 },
  safak: { renkler: ['#1C2541', '#56508A', '#E39B7B'], yildiz: 0.35 },
  gunduz: { renkler: ['#2F6DB5', '#5C9AD6', '#9CCBEF'], yildiz: 0 },
  ikindi: { renkler: ['#3E6EA8', '#8EA7C4', '#E7C27A'], yildiz: 0 },
  aksam: { renkler: ['#27295C', '#9A4E6B', '#F09A5B'], yildiz: 0.25 },
};

// Sabit yıldız konumları (yüzde) ve boyutları.
const YILDIZLAR = [
  [8, 18, 1.2], [18, 62, 0.8], [27, 30, 1], [36, 80, 0.7], [44, 14, 0.9], [52, 48, 1.3],
  [60, 72, 0.8], [66, 24, 1], [74, 58, 0.7], [81, 12, 1.1], [88, 40, 0.8], [93, 76, 1],
  [12, 88, 0.7], [40, 58, 0.6], [70, 88, 0.6], [57, 8, 0.7],
] as const;

function siradaki(simdi: Date, bugun: GununVakitleri, yarin: GununVakitleri): { vakit: Vakit; zaman: Date } {
  for (const g of [bugun, yarin]) {
    for (const v of VAKITLER) {
      const z = girisZamani(g, v);
      if (z.getTime() > simdi.getTime()) return { vakit: v, zaman: z };
    }
  }
  return { vakit: 'sabah', zaman: yarin.imsak };
}

/** Sıradaki vakte saniyeli geri sayım; arka plan günün evresine göre gökyüzü. */
export function GokyuzuKarti({ bugun, yarin }: { bugun: GununVakitleri; yarin: GununVakitleri }) {
  const [simdi, setSimdi] = useState(() => new Date());
  useEffect(() => {
    const z = setInterval(() => setSimdi(new Date()), 1000);
    return () => clearInterval(z);
  }, []);

  const evre = gunEvresi(simdi, bugun);
  const gok = GOK[evre];
  const s = siradaki(simdi, bugun, yarin);
  const gunduzMu = simdi >= bugun.gunes && simdi < bugun.aksam;

  return (
    <View style={stil.kart}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <LinearGradient id="gok" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={gok.renkler[0]} />
            <Stop offset="0.55" stopColor={gok.renkler[1]} />
            <Stop offset="1" stopColor={gok.renkler[2]} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gok)" />
        {gok.yildiz > 0
          ? YILDIZLAR.map(([x, y, r], i) => (
              <Circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#FFFFFF" opacity={gok.yildiz * (0.5 + (i % 3) * 0.25)} />
            ))
          : null}
      </Svg>

      <View style={stil.icerik}>
        <View style={{ flex: 1 }}>
          <Text style={stil.ust}>{siradakiBaslik(s.vakit)}</Text>
          <Text
            style={stil.sayac}
            accessibilityLiveRegion="none"
            accessibilityLabel={`${siradakiBaslik(s.vakit)} ${geriSayimMetni(s.zaman.getTime() - simdi.getTime())}`}
          >
            {geriSayimMetni(s.zaman.getTime() - simdi.getTime())}
          </Text>
          <View style={stil.cip}>
            <Text style={stil.cipAd}>{VAKIT_ADLARI[s.vakit]}</Text>
            <Text style={stil.cipSaat}>{saatMetni(s.zaman)}</Text>
          </View>
        </View>
        <View style={stil.cisim} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {gunduzMu ? <Gunes boyut={96} /> : <Ay boyut={96} evre={ayEvresi(simdi)} />}
        </View>
      </View>
    </View>
  );
}

const stil = StyleSheet.create({
  kart: {
    borderRadius: olcu.kartYaricap + 6,
    overflow: 'hidden',
    backgroundColor: renk.gece,
    minHeight: 150,
  },
  icerik: { flexDirection: 'row', alignItems: 'center', padding: 18, paddingRight: 8 },
  ust: { fontFamily: yaziTipi.normal, fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  sayac: {
    fontFamily: yaziTipi.baslik,
    fontSize: 42,
    lineHeight: 50,
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cip: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 8,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(10,16,41,0.32)',
  },
  cipAd: { fontFamily: yaziTipi.kalin, fontSize: 13, color: '#FFFFFF' },
  cipSaat: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.altin, fontVariant: ['tabular-nums'] },
  cisim: { width: 104, height: 104, alignItems: 'center', justifyContent: 'center' },
});
