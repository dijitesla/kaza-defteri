import { StyleSheet, Text, View } from 'react-native';
import { AltEkran } from '../bilesenler/AltEkran';
import { ESMA } from '../data/esma';
import { gununEsmasi } from '../logic/rehber';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { useSimdi } from '../useSimdi';

export default function Esma() {
  const bugunku = gununEsmasi(useSimdi());
  return (
    <AltEkran baslik={t('rehber.esma')}>
      {ESMA.map((e) => {
        const secili = e.sira === bugunku.sira;
        return (
          <View key={e.sira} style={[stil.satir, secili && stil.secili]}>
            <View style={[stil.no, secili && { backgroundColor: renk.altin }]}>
              <Text style={[stil.noMetin, secili && { color: renk.altinUstu }]}>{e.sira}</Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={stil.ad}>{e.ad}</Text>
              <Text style={stil.anlam}>{e.anlam}</Text>
            </View>
            <Text style={stil.arapca}>{e.arapca}</Text>
          </View>
        );
      })}
      <Text style={stil.not}>{t('rehber.esmaKaynak')}</Text>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  satir: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  secili: { borderWidth: 2, borderColor: renk.altin },
  no: { width: 32, height: 32, borderRadius: 16, backgroundColor: renk.pasifZemin, alignItems: 'center', justifyContent: 'center' },
  noMetin: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.metin },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  anlam: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin, lineHeight: 19 },
  arapca: { fontSize: 22, color: renk.altin, writingDirection: 'rtl', minWidth: 60, textAlign: 'right' },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, marginTop: 6 },
});
