import { Pressable, StyleSheet, Text } from 'react-native';
import { olcu, renk, yaziTipi } from '../tema';

interface Props {
  metin: string;
  onPress: () => void;
  pasif?: boolean;
}

export function Dugme({ metin, onPress, pasif }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={pasif}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!pasif }}
      style={({ pressed }) => [stil.dugme, (pressed || pasif) && { opacity: pasif ? 0.45 : 0.8 }]}
    >
      <Text style={stil.metin}>{metin}</Text>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  dugme: {
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap,
    backgroundColor: renk.altin,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metin: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.gece },
});
