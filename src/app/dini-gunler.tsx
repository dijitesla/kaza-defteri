import { StyleSheet, Text, View } from 'react-native';
import { AltEkran } from '../bilesenler/AltEkran';
import { GUN_ADLARI } from '../data/aylar';
import type { DiniGunTuru } from '../data/diniGunler';
import { gunFarki, kalanGunMetni, yaklasanGunler } from '../logic/diniGun';
import { gunAnahtari, gunAyMetni, gunOglesi } from '../logic/tarih';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { useSimdi } from '../useSimdi';

const TUR_RENGI: Record<DiniGunTuru, string> = {
  kandil: renk.altin,
  bayram: renk.onay,
  arefe: renk.vurguSari,
  ramazan: renk.muaf,
  gun: renk.vurguMavi,
};

export default function DiniGunler() {
  const bugun = gunAnahtari(useSimdi());
  const liste = yaklasanGunler(bugun);
  let sonYil = '';

  return (
    <AltEkran baslik={t('rehber.diniGunler')}>
      {liste.length === 0 ? <Text style={stil.not}>{t('rehber.diniGunYok')}</Text> : null}
      {liste.map((g, i) => {
        const yil = g.tarih.slice(0, 4);
        const yilBasligi = yil !== sonYil;
        sonYil = yil;
        const fark = gunFarki(bugun, g.tarih);
        return (
          <View key={`${g.tarih}-${g.ad}`}>
            {yilBasligi ? <Text style={[stil.yil, i > 0 && { marginTop: 10 }]}>{yil}</Text> : null}
            <View style={[stil.satir, fark === 0 && stil.bugun]}>
              <View style={[stil.serit, { backgroundColor: TUR_RENGI[g.tur] }]} />
              <View style={stil.tarih}>
                <Text style={stil.gunNo}>{Number(g.tarih.slice(8))}</Text>
                <Text style={stil.ay}>{gunAyMetni(g.tarih).split(' ')[1].slice(0, 3)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={stil.ad}>{g.ad}</Text>
                <Text style={stil.gunAdi}>{GUN_ADLARI[gunOglesi(g.tarih).getDay()]}</Text>
              </View>
              <Text style={[stil.kalan, fark <= 1 && { color: renk.altin }]}>{kalanGunMetni(fark, g.tur === 'kandil')}</Text>
            </View>
          </View>
        );
      })}
      <Text style={stil.not}>{t('rehber.diniGunlerNot')}</Text>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  yil: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.metin, marginBottom: 8 },
  satir: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingVertical: 12,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    overflow: 'hidden',
  },
  bugun: { borderWidth: 2, borderColor: renk.altin },
  serit: { width: 5, alignSelf: 'stretch' },
  tarih: { width: 44, alignItems: 'center' },
  gunNo: { fontFamily: yaziTipi.baslik, fontSize: 22, color: renk.metin, lineHeight: 26 },
  ay: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.ikincilMetin },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  gunAdi: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  kalan: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.ikincilMetin },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18, marginTop: 6 },
});
