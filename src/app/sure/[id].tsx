import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AltEkran } from '../../bilesenler/AltEkran';
import { AyetKarti } from '../../bilesenler/AyetKarti';
import { SURELER } from '../../data/sureler';
import { t } from '../../metinler';
import { olcu, renk, yaziTipi } from '../../tema';

const BESMELE = { arapca: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', okunus: 'Bismillahirrahmanirrahim' };

export default function Sure() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sure = SURELER.find((s) => s.id === id) ?? SURELER[0];
  return (
    <AltEkran baslik={sure.ad}>
      {sure.besmele ? (
        <View style={stil.besmele}>
          <Text style={stil.besmeleArapca}>{BESMELE.arapca}</Text>
          <Text style={stil.besmeleOkunus}>{BESMELE.okunus}</Text>
        </View>
      ) : null}
      {sure.ayetler.map((a) => (
        <AyetKarti key={a.no} ayet={a} />
      ))}
      <Text style={stil.not}>{t('rehber.sureKaynak')}</Text>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  besmele: { backgroundColor: renk.gece, borderRadius: olcu.kartYaricap, padding: 16, alignItems: 'center', gap: 4 },
  besmeleArapca: { fontSize: 26, lineHeight: 46, color: renk.altin, writingDirection: 'rtl' },
  besmeleOkunus: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.koyuUstuSoluk },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18, marginTop: 6 },
});
