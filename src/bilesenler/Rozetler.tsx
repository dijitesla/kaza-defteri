import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { sayiBicimle } from '../logic/kazaHesap';
import type { Rozet } from '../logic/rozetler';
import { t } from '../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../tema';
import { Simge, type SimgeAdi } from './Simge';

const ROZET_SIMGESI: Record<Rozet['tur'], SimgeAdi> = {
  ilkKaza: 'onay',
  kaza: 'defter',
  seri: 'alev',
  borcBitti: 'gunes',
};

function rozetAdi(r: Rozet): string {
  switch (r.tur) {
    case 'ilkKaza':
      return t('rozet.ilkKaza');
    case 'kaza':
      return t('rozet.kazaSayisi', { n: sayiBicimle(r.esik) });
    case 'seri':
      return t('rozet.seriRozet', { n: r.esik });
    case 'borcBitti':
      return t('rozet.borcBitti');
  }
}

/** Vakit serisi kartı: süren seri ve en uzun seri. */
export function SeriKarti({ seri, enUzun }: { seri: number; enUzun: number }) {
  return (
    <View style={stil.seri}>
      <View style={[stil.seriSimge, seri > 0 && { backgroundColor: 'rgba(224,96,74,0.14)' }]}>
        <Simge ad="alev" renk={seri > 0 ? '#E0604A' : renk.sekmePasif} boyut={26} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={stil.seriEtiket}>{t('rozet.seri')}</Text>
        <Text style={[buyukSayi, stil.seriSayi]}>{t('rozet.seriGun', { n: seri })}</Text>
        <Text style={stil.seriAlt}>{t('rozet.seriAlt')}</Text>
      </View>
      {enUzun > 0 ? (
        <View style={stil.enUzun}>
          <Text style={stil.enUzunMetin}>{t('rozet.enUzun', { n: enUzun })}</Text>
        </View>
      ) : null}
    </View>
  );
}

/** Rozet ızgarası: kazanılanlar altın, kazanılmayanlar soluk. */
export function RozetIzgarasi({ liste }: { liste: Rozet[] }) {
  const kazanilan = liste.filter((r) => r.kazanildi).length;
  return (
    <View style={stil.kart}>
      <View style={stil.ust}>
        <Text style={stil.baslik}>{t('rozet.baslik')}</Text>
        <Text style={stil.sayac}>{t('rozet.kazanilan', { n: kazanilan, toplam: liste.length })}</Text>
      </View>
      <View style={stil.izgara}>
        {liste.map((r) => (
          <View
            key={r.id}
            style={stil.hucre}
            accessible
            accessibilityLabel={rozetAdi(r)}
            accessibilityState={{ disabled: !r.kazanildi }}
          >
            <Madalya kazanildi={r.kazanildi} simge={ROZET_SIMGESI[r.tur]} />
            <Text style={[stil.ad, !r.kazanildi && { color: renk.sekmePasif }]} numberOfLines={2}>
              {rozetAdi(r)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Madalya({ kazanildi, simge }: { kazanildi: boolean; simge: SimgeAdi }) {
  const B = 56;
  // Altıgen madalya
  const altigen = 'M28 3 L49.6 15.5 V40.5 L28 53 L6.4 40.5 V15.5 Z';
  return (
    <View style={{ width: B, height: B, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={B} height={B} style={StyleSheet.absoluteFill}>
        <Path d={altigen} fill={kazanildi ? renk.gece : '#E4E7EC'} />
        <Path
          d={altigen}
          fill="none"
          stroke={kazanildi ? renk.altin : '#D3D8E1'}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {kazanildi ? <Circle cx={28} cy={28} r={15} fill="rgba(212,168,83,0.18)" /> : null}
      </Svg>
      <View style={{ zIndex: 1 }}>
        <Simge ad={simge} renk={kazanildi ? renk.altin : '#AEB4C0'} boyut={22} />
      </View>
    </View>
  );
}

const stil = StyleSheet.create({
  seri: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  seriSimge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECEEF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seriEtiket: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  seriSayi: { fontSize: 24, lineHeight: 30 },
  seriAlt: { fontFamily: yaziTipi.normal, fontSize: 11, color: renk.ikincilMetin, lineHeight: 15 },
  enUzun: { backgroundColor: renk.uyariZemin, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  enUzunMetin: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.uyariMetin },
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, gap: 12 },
  ust: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  sayac: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  izgara: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 14 },
  hucre: { width: '25%', alignItems: 'center', gap: 4, paddingHorizontal: 2 },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.gece, textAlign: 'center', lineHeight: 14 },
});
