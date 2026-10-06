import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { olcu, renk, yaziTipi } from '../tema';
import { ReklamBandi } from './ReklamBandi';

interface Props {
  baslik: string;
  ust?: string; // başlığın üstündeki küçük satır, ör. "Kurulum, 1 / 3"
  alt?: ReactNode; // ekranın altına sabitlenen alan, ör. "Devam et" düğmesi
  reklam?: boolean; // en altta banner reklam (yalnızca sekme ekranları)
  children?: ReactNode;
}

export function Ekran({ baslik, ust, alt, reklam, children }: Props) {
  return (
    <SafeAreaView style={stil.kap} edges={alt ? ['top', 'left', 'right', 'bottom'] : ['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={stil.icerik} keyboardShouldPersistTaps="handled">
        {ust ? <Text style={stil.ust}>{ust}</Text> : null}
        <Text style={stil.baslik} accessibilityRole="header">
          {baslik}
        </Text>
        {children}
      </ScrollView>
      {alt ? <View style={stil.alt}>{alt}</View> : null}
      {reklam ? <ReklamBandi /> : null}
    </SafeAreaView>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 10 },
  ust: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 26, color: renk.gece, marginBottom: 6 },
  alt: { paddingHorizontal: olcu.ekranBosluk, paddingTop: 8, paddingBottom: 12, gap: 4 },
});
