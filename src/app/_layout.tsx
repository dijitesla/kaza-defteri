import { Lora_600SemiBold } from '@expo-google-fonts/lora';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { depolama } from '../depolama';
import { KurulumBaglami } from '../kurulumDurumu';
import { renk, yaziTipi } from '../tema';
import type { Ayarlar, KazaDurumu } from '../types';

SplashScreen.preventAutoHideAsync();

export default function KokDuzen() {
  const [fontlarHazir, fontHatasi] = useFonts({
    Lora_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const [kurulumTamam, setKurulumTamam] = useState<boolean | null>(null);

  useEffect(() => {
    depolama.ayarlariOku().then((a) => setKurulumTamam(a.kurulumTamam));
  }, []);

  const hazir = (fontlarHazir || fontHatasi != null) && kurulumTamam !== null;

  useEffect(() => {
    if (hazir) SplashScreen.hide();
  }, [hazir]);

  const kurulumTamamla = useCallback(async (veri: { ayarlar: Ayarlar; kaza: KazaDurumu }) => {
    // Önce borç, sonra kurulumTamam içeren ayarlar: yarıda kesilirse kurulum yeniden açılır.
    await depolama.kazaYaz(veri.kaza);
    await depolama.ayarlariYaz(veri.ayarlar);
    setKurulumTamam(true);
  }, []);

  const baglam = useMemo(
    () => ({ kurulumTamam: !!kurulumTamam, kurulumTamamla }),
    [kurulumTamam, kurulumTamamla],
  );

  if (!hazir) return null;

  return (
    <KurulumBaglami.Provider value={baglam}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: renk.zemin },
          headerStyle: { backgroundColor: renk.zemin },
          headerTintColor: renk.gece,
          headerTitleStyle: { fontFamily: yaziTipi.kalin },
          headerShadowVisible: false,
        }}
      >
        <Stack.Protected guard={kurulumTamam}>
          <Stack.Screen name="(sekmeler)" />
          <Stack.Screen name="kaza-kil" />
        </Stack.Protected>
        <Stack.Protected guard={!kurulumTamam}>
          <Stack.Screen name="kurulum" />
        </Stack.Protected>
      </Stack>
    </KurulumBaglami.Provider>
  );
}
