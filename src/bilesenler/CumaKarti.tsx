import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { saatMetni } from '../logic/tarih';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { CamiSilueti } from './CamiSilueti';

/** Cuma günleri ana ekranda: cuma namazı öğle vaktinde kılınır. */
export function CumaKarti({ ogle, simdi }: { ogle: Date; simdi: Date }) {
  const gecti = simdi.getTime() >= ogle.getTime();
  return (
    <View style={stil.kart}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <LinearGradient id="cuma" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#E9C46A" />
            <Stop offset="1" stopColor="#C8963E" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#cuma)" />
      </Svg>
      <View style={stil.siluet} pointerEvents="none">
        <CamiSilueti renk="rgba(28,37,65,0.22)" uzakRenk="rgba(28,37,65,0.1)" />
      </View>
      <Text style={stil.baslik}>{t('cuma.baslik')}</Text>
      <Text style={stil.alt}>
        {gecti ? t('cuma.gecti', { saat: saatMetni(ogle) }) : t('cuma.vakit', { saat: saatMetni(ogle) })}
      </Text>
    </View>
  );
}

const stil = StyleSheet.create({
  kart: { borderRadius: olcu.kartYaricap, overflow: 'hidden', padding: 16, paddingBottom: 30, gap: 2 },
  siluet: { position: 'absolute', right: -40, bottom: 0, width: 260, height: 50 },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.altinUstu },
  alt: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.altinUstu, opacity: 0.85 },
});
