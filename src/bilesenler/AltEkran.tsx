import { Stack } from 'expo-router';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { olcu, renk } from '../tema';
import { DesenZemin } from './DesenZemin';

/** Başlık çubuklu, kaydırılabilir alt ekran (Rehber sayfaları). */
export function AltEkran({ baslik, children }: { baslik: string; children: ReactNode }) {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: baslik }} />
      <SafeAreaView style={stil.kap} edges={['bottom', 'left', 'right']}>
        <DesenZemin />
        <ScrollView contentContainerStyle={stil.icerik}>{children}</ScrollView>
      </SafeAreaView>
    </>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 12, paddingBottom: 32 },
});
