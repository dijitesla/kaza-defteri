import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AltEkran } from '../bilesenler/AltEkran';
import { AyetKarti } from '../bilesenler/AyetKarti';
import { DUALAR, ORUC_DUALARI, type Dua } from '../data/dualar';
import { KURAN_DUALARI } from '../data/sureler';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

function DuaKarti({ d }: { d: Dua }) {
  return (
    <View style={stil.kart}>
      <Text style={stil.ad}>{d.ad}</Text>
      <Text style={stil.aciklama}>{d.aciklama}</Text>
      <Text style={stil.etiket}>{t('rehber.okunus')}</Text>
      <Text style={stil.okunus}>{d.okunus}</Text>
      <Text style={stil.etiket}>{t('rehber.anlam')}</Text>
      <Text style={stil.anlam}>{d.anlam}</Text>
      <Text style={stil.kaynak}>{t('rehber.duaKaynak', { kaynak: d.kaynak })}</Text>
    </View>
  );
}

export default function Dualar() {
  // Ramazan kartından gelindiğinde oruç duaları başta gösterilir.
  const { bolum } = useLocalSearchParams<{ bolum?: string }>();
  const oruc = (
    <View key="oruc" style={{ gap: 12 }}>
      <Text style={stil.bolum}>{t('rehber.orucDualari')}</Text>
      {ORUC_DUALARI.map((d) => (
        <DuaKarti key={d.id} d={d} />
      ))}
    </View>
  );
  return (
    <AltEkran baslik={t('rehber.dualar')}>
      {bolum === 'oruc' ? oruc : null}
      {DUALAR.map((d) => (
        <DuaKarti key={d.id} d={d} />
      ))}
      {KURAN_DUALARI.map((d) => (
        <View key={d.id} style={{ gap: 8 }}>
          <Text style={[stil.ad, { marginTop: 6 }]}>{d.ad}</Text>
          {d.ayetler.map((a) => (
            <AyetKarti key={a.no} ayet={a} ayetNo={false} />
          ))}
        </View>
      ))}
      {bolum === 'oruc' ? null : oruc}
      <Text style={stil.not}>{t('rehber.duaNot')}</Text>
      <Text style={stil.not}>{t('rehber.sureKaynak')}</Text>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  bolum: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin, marginTop: 6 },
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 16, gap: 4 },
  ad: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.metin },
  aciklama: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, marginBottom: 6 },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.ikincilMetin, letterSpacing: 0.4, marginTop: 6 },
  okunus: { fontFamily: yaziTipi.kalin, fontSize: 15, lineHeight: 23, color: renk.altin },
  anlam: { fontFamily: yaziTipi.normal, fontSize: 14, lineHeight: 21, color: renk.metin },
  kaynak: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.ikincilMetin, marginTop: 8 },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
});
