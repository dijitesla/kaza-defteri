import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { YayDurumu } from '../logic/gunluk';
import { olcu, renk, yaziTipi } from '../tema';

export interface YayVakti {
  ad: string;
  saat: string;
  durum: YayDurumu;
}

// Yay, tasarımdaki gibi ikinci dereceden bir eğri (docs/tasarim.html, .a-arc).
// Kutu: 220 × 70 birim; P0 (14, 58), P1 (110, -12), P2 (206, 58).
const EGRI = { x: [14, 110, 206], y: [58, -12, 58], g: 220, y0: 70 };
const NOKTALAR = [0.06, 0.3, 0.55, 0.77, 0.95]; // beş vaktin eğri üzerindeki konumu
const KESIK_SAYISI = 36;
const ETIKET_GENISLIK = 76;
const ETIKET_YUKSEKLIK = 40;

function egriNoktasi(t: number) {
  const a = (1 - t) * (1 - t);
  const b = 2 * (1 - t) * t;
  const c = t * t;
  return {
    x: a * EGRI.x[0] + b * EGRI.x[1] + c * EGRI.x[2],
    y: a * EGRI.y[0] + b * EGRI.y[1] + c * EGRI.y[2],
  };
}

const ACIKLAMA: Record<YayDurumu, string> = {
  kilindi: '✓',
  kilinamadi: '✕',
  siradaki: '',
  gelecek: '',
  devam: '',
  cevapsiz: '',
};

export function GunYayi({ vakitler }: { vakitler: YayVakti[] }) {
  const [genislik, setGenislik] = useState(0);
  const olcek = genislik / EGRI.g;
  const yukseklik = EGRI.y0 * olcek + ETIKET_YUKSEKLIK - 6;

  return (
    <View
      style={stil.kart}
      onLayout={(e) => setGenislik(e.nativeEvent.layout.width - 16)}
      accessible
      accessibilityLabel={vakitler.map((v) => `${v.ad} ${v.saat}`).join(', ')}
    >
      {genislik > 0 ? (
        <View style={{ width: genislik, height: yukseklik }}>
          {Array.from({ length: KESIK_SAYISI }, (_, i) => {
            const p = egriNoktasi(i / (KESIK_SAYISI - 1));
            return <View key={i} style={[stil.kesik, { left: p.x * olcek - 1.5, top: p.y * olcek - 1.5 + 10 }]} />;
          })}
          {vakitler.map((v, i) => {
            const p = egriNoktasi(NOKTALAR[i]);
            const x = p.x * olcek;
            const y = p.y * olcek + 10;
            const r = v.durum === 'siradaki' ? 9 : 8;
            const sol = Math.min(Math.max(x - ETIKET_GENISLIK / 2, 0), genislik - ETIKET_GENISLIK);
            return (
              <View key={v.ad} pointerEvents="none" style={StyleSheet.absoluteFill}>
                {v.durum === 'siradaki' ? (
                  <View style={[stil.hale, { left: x - 14, top: y - 14 }]} />
                ) : null}
                <View
                  style={[
                    stil.daire,
                    { left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r },
                    daireStili[v.durum],
                  ]}
                >
                  <Text style={stil.isaret}>{ACIKLAMA[v.durum]}</Text>
                </View>
                <View style={[stil.etiket, { left: sol, top: y + r + 2 }]}>
                  <Text style={[stil.etiketMetin, etiketStili[v.durum]]} numberOfLines={1}>
                    {v.ad}
                  </Text>
                  <Text style={[stil.etiketMetin, etiketStili[v.durum]]} numberOfLines={1}>
                    {v.saat}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const GRI_CERCEVE = '#B5BCC9';

const daireStili = StyleSheet.create({
  kilindi: { backgroundColor: renk.onay },
  kilinamadi: { backgroundColor: renk.kilinamadi },
  siradaki: { backgroundColor: renk.kart, borderWidth: 2, borderColor: renk.altin },
  gelecek: { backgroundColor: renk.kart, borderWidth: 1.5, borderColor: GRI_CERCEVE },
  devam: { backgroundColor: renk.kart, borderWidth: 1.5, borderColor: GRI_CERCEVE },
  cevapsiz: { backgroundColor: renk.kart, borderWidth: 1.5, borderColor: GRI_CERCEVE },
});

const etiketStili = StyleSheet.create({
  kilindi: {},
  kilinamadi: {},
  siradaki: { fontFamily: yaziTipi.kalin, color: renk.gece },
  gelecek: { color: renk.sekmePasif },
  devam: {},
  cevapsiz: {},
});

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 8 },
  kesik: { position: 'absolute', width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#D9DEE6' },
  hale: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: renk.altin,
    opacity: 0.25,
  },
  daire: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  isaret: { color: renk.kart, fontSize: 10, lineHeight: 12, fontFamily: yaziTipi.kalin },
  etiket: { position: 'absolute', width: ETIKET_GENISLIK, alignItems: 'center' },
  etiketMetin: { fontFamily: yaziTipi.normal, fontSize: 12, color: '#3B4152' },
});
