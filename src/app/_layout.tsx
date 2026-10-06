import { Lora_600SemiBold } from '@expo-google-fonts/lora';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { renk, yaziTipi } from '../tema';
import { useBildirimCevaplari } from '../useBildirimCevaplari';
import { useVeri, VeriSaglayici } from '../veri';

SplashScreen.preventAutoHideAsync();

export default function KokDuzen() {
  const [fontlarHazir, fontHatasi] = useFonts({
    Lora_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const fontlar = fontlarHazir || fontHatasi != null;

  return (
    <VeriSaglayici>
      {(veriHazir) => (veriHazir && fontlar ? <Gezinme /> : null)}
    </VeriSaglayici>
  );
}

function Gezinme() {
  const { veri } = useVeri();
  const kurulumTamam = veri.ayarlar.kurulumTamam;
  useBildirimCevaplari();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
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
    </>
  );
}
