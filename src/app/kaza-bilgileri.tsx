import { router, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { Dugme } from '../bilesenler/Dugme';
import { Ekran } from '../bilesenler/Ekran';
import { useHesapFormu } from '../bilesenler/HesapFormu';
import { ayarlardanGirdi } from '../logic/kazaHesap';
import { t } from '../metinler';
import { renk, yaziTipi } from '../tema';
import { useVeri } from '../veri';

export default function KazaBilgileri() {
  const { veri, yenidenHesapla } = useVeri();
  const { girdi, form } = useHesapFormu(ayarlardanGirdi(veri.ayarlar));

  const kaydet = () => {
    if (!girdi) return;
    yenidenHesapla(girdi);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <Ekran
        baslik={t('ayar.kazaBilgileri')}
        alt={<Dugme metin={t('genel.kaydet')} onPress={kaydet} pasif={!girdi} />}
      >
        <Text style={stil.not}>{t('ayar.kazaBilgileriAlt')}</Text>
        {form}
      </Ekran>
    </>
  );
}

const stil = StyleSheet.create({
  not: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin, lineHeight: 19 },
});
