import { Stack } from 'expo-router';
import { Ekran } from '../bilesenler/Ekran';
import { t } from '../metinler';

// Aşama 3'te doldurulacak.
export default function KazaKil() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <Ekran baslik={t('kaza.baslik')} />
    </>
  );
}
