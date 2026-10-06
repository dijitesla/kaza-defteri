import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { KonumSecici } from '../../bilesenler/KonumSecici';
import { useTaslak } from '../../kurulumTaslagi';
import { t } from '../../metinler';
import { renk, yaziTipi } from '../../tema';

export default function KurulumKonum() {
  const { taslak, guncelle } = useTaslak();
  const [secim, setSecim] = useState(taslak.konum);

  const devam = () => {
    if (!secim) return;
    guncelle({ konum: secim });
    router.push('/kurulum/hesap');
  };

  return (
    <Ekran
      ust={t('kurulum.adim', { n: 1 })}
      baslik={t('konum.baslik')}
      alt={
        <>
          {!secim ? <Text style={stil.not}>{t('konum.secimYok')}</Text> : null}
          <Dugme metin={t('genel.devam')} onPress={devam} pasif={!secim} />
        </>
      }
    >
      <KonumSecici secim={secim} onSecim={setSecim} />
    </Ekran>
  );
}

const stil = StyleSheet.create({
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
});
