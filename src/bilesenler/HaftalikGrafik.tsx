import { StyleSheet, Text, View } from 'react-native';
import { AY_ADLARI } from '../data/aylar';
import type { HaftaOzeti } from '../logic/islemler';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

const YUKSEKLIK = 110;

/** Son haftaların kılınan kaza ve vakit sayıları, yan yana sütunlar. */
export function HaftalikGrafik({ haftalar }: { haftalar: HaftaOzeti[] }) {
  const enBuyuk = Math.max(1, ...haftalar.flatMap((h) => [h.kaza, h.vakit]));
  return (
    <View style={stil.kart}>
      <Text style={stil.baslik}>{t('gecmis.haftalik')}</Text>
      <View style={stil.grafik}>
        {haftalar.map((h, i) => (
          <View
            key={h.bas.toISOString()}
            style={stil.hafta}
            accessible
            accessibilityLabel={`${t('gecmis.haftaEtiket', { tarih: `${h.bas.getDate()} ${AY_ADLARI[h.bas.getMonth()]}` })}: ${t('gecmis.haftalikKaza')} ${h.kaza}, ${t('gecmis.haftalikVakit')} ${h.vakit}`}
          >
            <View style={stil.sutunlar}>
              <Sutun deger={h.kaza} enBuyuk={enBuyuk} renk={renk.altin} vurgu={i === haftalar.length - 1} />
              <Sutun deger={h.vakit} enBuyuk={enBuyuk} renk={renk.onay} vurgu={i === haftalar.length - 1} />
            </View>
            <Text style={[stil.etiket, i === haftalar.length - 1 && { color: renk.metin }]}>
              {h.bas.getDate()} {AY_ADLARI[h.bas.getMonth()].slice(0, 3)}
            </Text>
          </View>
        ))}
      </View>
      <View style={stil.aciklama}>
        <Nokta renk={renk.altin} metin={t('gecmis.haftalikKaza')} />
        <Nokta renk={renk.onay} metin={t('gecmis.haftalikVakit')} />
      </View>
    </View>
  );
}

function Sutun({ deger, enBuyuk, renk: r, vurgu }: { deger: number; enBuyuk: number; renk: string; vurgu: boolean }) {
  const h = deger > 0 ? Math.max(4, (deger / enBuyuk) * YUKSEKLIK) : 2;
  return (
    <View style={stil.sutunKap}>
      <Text style={stil.deger}>{deger}</Text>
      <View style={[stil.sutun, { height: h, backgroundColor: deger > 0 ? r : renk.pasifCizgi, opacity: vurgu ? 1 : 0.75 }]} />
    </View>
  );
}

function Nokta({ renk: r, metin }: { renk: string; metin: string }) {
  return (
    <View style={stil.nokta}>
      <View style={[stil.noktaDaire, { backgroundColor: r }]} />
      <Text style={stil.noktaMetin}>{metin}</Text>
    </View>
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, gap: 10 },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  grafik: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: 6 },
  hafta: { alignItems: 'center', gap: 6, flex: 1 },
  sutunlar: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: YUKSEKLIK + 18 },
  sutunKap: { alignItems: 'center', justifyContent: 'flex-end', gap: 2 },
  deger: { fontFamily: yaziTipi.kalin, fontSize: 10, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
  sutun: { width: 16, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  etiket: { fontFamily: yaziTipi.normal, fontSize: 11, color: renk.ikincilMetin },
  aciklama: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  nokta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  noktaDaire: { width: 10, height: 10, borderRadius: 5 },
  noktaMetin: { fontFamily: yaziTipi.normal, fontSize: 11, color: renk.ikincilMetin },
});
