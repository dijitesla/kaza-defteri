import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { ayEvresi, geriSayimMetni, gunEvresi, type GunEvresi } from '../logic/gokyuzu';
import { saatMetni } from '../logic/tarih';
import { girisZamani, siradakiBaslik, type GununVakitleri } from '../logic/vakitler';
import { VAKIT_ADLARI } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { VAKITLER, type Vakit } from '../types';
import { CamiSilueti } from './CamiSilueti';
import { Ay, Gunes } from './GokCismi';

// Gökyüzü renkleri ve siluet renkleri (yakın cami, uzak binalar) günün evresine göre.
const GOK: Record<GunEvresi, { renkler: string[]; yildiz: number; cami: string; uzak: string }> = {
  gece: { renkler: ['#0A1029', '#18224A', '#22305E'], yildiz: 0.9, cami: '#070B1C', uzak: '#121A3A' },
  safak: { renkler: ['#2A2D5C', '#8A6A9E', '#F2A88A'], yildiz: 0.3, cami: '#1E1B3A', uzak: '#4B3F69' },
  gunduz: { renkler: ['#2F6DB5', '#5C9AD6', '#A8D4F2'], yildiz: 0, cami: '#1C3A66', uzak: '#5B87B8' },
  ikindi: { renkler: ['#3E6EA8', '#8EA7C4', '#EBC67E'], yildiz: 0, cami: '#2B3654', uzak: '#7D8AA6' },
  aksam: { renkler: ['#27295C', '#9A4E6B', '#F59A55'], yildiz: 0.25, cami: '#1A1430', uzak: '#5A2F4F' },
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
      <View style={stil.siluet} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <CamiSilueti renk={gok.cami} uzakRenk={gok.uzak} />
      </View>

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
  icerik: { flexDirection: 'row', alignItems: 'center', padding: 18, paddingRight: 8, paddingBottom: 48 },
  siluet: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 64 },
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
