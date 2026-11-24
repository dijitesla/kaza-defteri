// Sarı uyarı kartı: kısa açıklama ve tek bir düğme (izin ver, ayarı aç...).
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { olcu, renk, yaziTipi } from '../tema';

export function UyariKarti(p: { metin: string; dugme: string; onPress: () => void }) {
  return (
    <View style={stil.uyari}>
      <Text style={stil.metin}>{p.metin}</Text>
      <Pressable onPress={p.onPress} accessibilityRole="button" style={stil.dugme}>
        <Text style={stil.dugmeMetin}>{p.dugme}</Text>
      </Pressable>
    </View>
  );
}

const stil = StyleSheet.create({
  uyari: { backgroundColor: renk.uyariZemin, borderRadius: olcu.kartYaricap, padding: 12, gap: 8 },
  metin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.uyariMetin, lineHeight: 20 },
  dugme: {
    alignSelf: 'flex-start',
    backgroundColor: renk.gece,
    borderRadius: olcu.dugmeYaricap,
    minHeight: olcu.dokunmaMin,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  dugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.beyaz },
});
