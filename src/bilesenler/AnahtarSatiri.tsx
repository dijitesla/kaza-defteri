import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { olcu, renk, yaziTipi } from '../tema';

interface Props {
  baslik: string;
  alt?: string;
  deger: boolean;
  onChange: (deger: boolean) => void;
}

/** Başlık, isteğe bağlı açıklama ve anahtar (docs/tasarim.html, .f2 / .tg). */
export function AnahtarSatiri({ baslik, alt, deger, onChange }: Props) {
  return (
    <Pressable
      onPress={() => onChange(!deger)}
      accessibilityRole="switch"
      accessibilityState={{ checked: deger }}
      accessibilityLabel={baslik}
      style={stil.kart}
    >
      <View style={stil.metinler}>
        <Text style={stil.baslik}>{baslik}</Text>
        {alt ? <Text style={stil.alt}>{alt}</Text> : null}
      </View>
      <Switch
        value={deger}
        onValueChange={onChange}
        trackColor={{ true: renk.onay, false: '#C9CED8' }}
        thumbColor={renk.kart}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
    </Pressable>
  );
}

const stil = StyleSheet.create({
  kart: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: olcu.dokunmaMin + 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metinler: { flex: 1 },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  alt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, marginTop: 2 },
});
