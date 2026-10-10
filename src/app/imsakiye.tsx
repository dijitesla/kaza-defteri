import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AltEkran } from '../bilesenler/AltEkran';
import { GUN_ADLARI } from '../data/aylar';
import { ramazanGunu } from '../logic/diniGun';
import { imsakiye } from '../logic/rehber';
import { gunAnahtari, gunAyMetni, gunOglesi, saatMetni } from '../logic/tarih';
import { t, VAKIT_ADLARI } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { useSimdi } from '../useSimdi';
import { useVeri } from '../veri';

export default function Imsakiye() {
  const { veri } = useVeri();
  const { konum, dakikaDuzeltme } = veri.ayarlar;
  const bugun = gunAnahtari(useSimdi());
  const satirlar = useMemo(() => imsakiye(konum, bugun, dakikaDuzeltme), [konum, bugun, dakikaDuzeltme]);
  const basliklar = [t('vakitler.imsak'), t('vakitler.gunes'), VAKIT_ADLARI.ogle, VAKIT_ADLARI.ikindi, VAKIT_ADLARI.aksam, VAKIT_ADLARI.yatsi];

  return (
    <AltEkran baslik={t('rehber.imsakiye')}>
      <Text style={stil.not}>{t('rehber.imsakiyeNot', { konum: konum.ad })}</Text>
      <View style={stil.tablo}>
        <View style={[stil.satir, stil.baslikSatir]}>
          <Text style={[stil.tarih, stil.baslik]}>{t('rehber.imsakiyeTarih')}</Text>
          {basliklar.map((b) => (
            <Text key={b} style={[stil.hucre, stil.baslik]} numberOfLines={1} adjustsFontSizeToFit>
              {b}
            </Text>
          ))}
        </View>
        {satirlar.map(({ gun, vakitler: v }, i) => {
          const bugunMu = i === 0;
          const ramazan = ramazanGunu(gun) !== null;
          const d = gunOglesi(gun);
          return (
            <View key={gun} style={[stil.satir, i % 2 === 1 && stil.cift, bugunMu && stil.bugun]}>
              <View style={stil.tarih}>
                <Text style={[stil.tarihMetin, bugunMu && stil.bugunMetin]}>{gunAyMetni(gun)}</Text>
                <Text style={[stil.gunAdi, bugunMu && { color: renk.koyuUstuSoluk }]}>
                  {GUN_ADLARI[d.getDay()].slice(0, 3)}
                  {ramazan ? ' ☾' : ''}
                </Text>
              </View>
              {[v.imsak, v.gunes, v.ogle, v.ikindi, v.aksam, v.yatsi].map((z, j) => (
                <Text key={j} style={[stil.hucre, stil.saat, bugunMu && stil.bugunMetin]}>
                  {saatMetni(z)}
                </Text>
              ))}
            </View>
          );
        })}
      </View>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  tablo: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, overflow: 'hidden' },
  satir: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  baslikSatir: { backgroundColor: renk.pasifZemin },
  cift: { backgroundColor: renk.seciliSatir },
  bugun: { backgroundColor: renk.gece },
  tarih: { width: 62 },
  tarihMetin: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.metin },
  gunAdi: { fontFamily: yaziTipi.normal, fontSize: 10, color: renk.ikincilMetin },
  hucre: { flex: 1, textAlign: 'center' },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 10, color: renk.ikincilMetin },
  saat: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.metin, fontVariant: ['tabular-nums'] },
  bugunMetin: { color: renk.beyaz, fontFamily: yaziTipi.kalin },
});
