import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { olcu, renk, yaziTipi } from '../tema';

interface Props {
  baslik: string;
  ust?: string; // başlığın üstündeki küçük satır, ör. "Kurulum, 1 / 3"
  children?: ReactNode;
}

export function Ekran({ baslik, ust, children }: Props) {
  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={stil.icerik}>
        {ust ? <Text style={stil.ust}>{ust}</Text> : null}
        <Text style={stil.baslik} accessibilityRole="header">
          {baslik}
        </Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 12 },
  ust: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 26, color: renk.gece },
});
