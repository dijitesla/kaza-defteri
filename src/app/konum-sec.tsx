import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Dugme } from '../bilesenler/Dugme';
import { Ekran } from '../bilesenler/Ekran';
import { KonumSecici } from '../bilesenler/KonumSecici';
import { t } from '../metinler';
import { useVeri } from '../veri';

export default function KonumSec() {
  const { veri, ayarlariGuncelle } = useVeri();
  const [secim, setSecim] = useState(veri.ayarlar.konum);

  const kaydet = () => {
    ayarlariGuncelle((a) => ({ ...a, konum: secim }));
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <Ekran baslik={t('konum.baslik')} alt={<Dugme metin={t('genel.kaydet')} onPress={kaydet} />}>
        <KonumSecici secim={secim} onSecim={setSecim} />
      </Ekran>
    </>
  );
}
