import { StyleSheet, Text, View } from 'react-native';
import type { Ayet } from '../data/sureler';
import { olcu, renk, yaziTipi } from '../tema';

/** Bir ayet: Arapça (sağdan sola), okunuş ve meal. */
export function AyetKarti({ ayet, ayetNo = true }: { ayet: Ayet; ayetNo?: boolean }) {
  return (
    <View style={stil.kart}>
      <View style={stil.ust}>
        {ayetNo ? (
          <View style={stil.no}>
            <Text style={stil.noMetin}>{ayet.no}</Text>
          </View>
        ) : (
          <View />
        )}
        <Text style={stil.arapca}>{ayet.arapca}</Text>
      </View>
      <Text style={stil.okunus}>{ayet.okunus}</Text>
      <Text style={stil.meal}>{ayet.meal}</Text>
    </View>
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, gap: 8 },
  ust: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  no: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: renk.altin, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  noMetin: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.metin },
  arapca: { flex: 1, fontSize: 24, lineHeight: 44, color: renk.metin, textAlign: 'right', writingDirection: 'rtl' },
  okunus: { fontFamily: yaziTipi.kalin, fontSize: 14, lineHeight: 21, color: renk.altin },
  meal: { fontFamily: yaziTipi.normal, fontSize: 14, lineHeight: 21, color: renk.ikincilMetin },
});
