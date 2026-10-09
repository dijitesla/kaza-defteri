import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { olcu, renk, yaziTipi } from '../tema';

interface Props {
  metin: string;
  onPress: () => void;
  pasif?: boolean;
  yukleniyor?: boolean;
  tur?: 'birincil' | 'metin';
}

export function Dugme({ metin, onPress, pasif, yukleniyor, tur = 'birincil' }: Props) {
  const kapali = pasif || yukleniyor;
  return (
    <Pressable
      onPress={onPress}
      disabled={kapali}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!kapali, busy: !!yukleniyor }}
      style={({ pressed }) => [
        stil.taban,
        tur === 'birincil' && stil.birincil,
        pasif && stil.pasif,
        pressed && stil.basili,
      ]}
    >
      {yukleniyor ? (
        <ActivityIndicator color={tur === 'birincil' ? renk.altinUstu : renk.metin} />
      ) : (
        <Text style={[stil.metin, tur === 'birincil' && { color: renk.altinUstu }, tur === 'metin' && stil.metinTuru]}>{metin}</Text>
      )}
    </Pressable>
  );
}

const stil = StyleSheet.create({
  taban: {
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  birincil: { backgroundColor: renk.altin },
  pasif: { opacity: 0.45 },
  basili: { opacity: 0.8 },
  metin: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin },
  metinTuru: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin },
});
