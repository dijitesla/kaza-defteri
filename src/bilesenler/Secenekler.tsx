import { Pressable, StyleSheet, Text, View } from 'react-native';
import { olcu, renk, yaziTipi } from '../tema';

interface Props<T extends string | number> {
  secenekler: { deger: T; etiket: string }[];
  deger: T;
  onChange: (deger: T) => void;
  gorunum?: 'segment' | 'cip'; // segment: gri zemin içinde; cip: ayrı beyaz kutular
}

/** Tek seçimli düğme grubu (docs/tasarim.html, .seg ve .chipsA). */
export function Secenekler<T extends string | number>({
  secenekler,
  deger,
  onChange,
  gorunum = 'segment',
}: Props<T>) {
  return (
    <View style={gorunum === 'segment' ? stil.segment : stil.cipler} accessibilityRole="radiogroup">
      {secenekler.map((s) => {
        const secili = s.deger === deger;
        return (
          <Pressable
            key={String(s.deger)}
            onPress={() => onChange(s.deger)}
            accessibilityRole="radio"
            accessibilityState={{ selected: secili }}
            style={[stil.secenek, gorunum === 'cip' && stil.cip, secili && stil.secili]}
          >
            <Text style={[stil.metin, gorunum === 'cip' && stil.cipMetin, secili && stil.seciliMetin]}>{s.etiket}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const stil = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    backgroundColor: renk.zemin,
    borderRadius: olcu.dugmeYaricap,
    padding: 3,
    marginTop: 6,
  },
  cipler: { flexDirection: 'row', gap: 8 },
  secenek: {
    flex: 1,
    minHeight: olcu.dokunmaMin - 4,
    borderRadius: olcu.dugmeYaricap - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cip: { backgroundColor: renk.kart, minHeight: olcu.dokunmaMin },
  secili: { backgroundColor: renk.gece },
  metin: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin },
  cipMetin: { color: renk.metin },
  seciliMetin: { fontFamily: yaziTipi.kalin, color: renk.beyaz },
});
