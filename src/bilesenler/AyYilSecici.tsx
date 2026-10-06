import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AY_ADLARI } from '../data/aylar';
import { ayOlustur, type Ay } from '../logic/kazaHesap';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { Alan } from './Alan';
import { Dugme } from './Dugme';

const YIL_ARALIGI = 90;

export function ayEtiketi(ay: Ay | null): string {
  if (!ay) return '—';
  const [y, a] = ay.split('-').map(Number);
  return `${AY_ADLARI[a - 1]} ${y}`;
}

interface Props {
  etiket: string;
  deger: Ay | null;
  onChange: (ay: Ay) => void;
}

/** Ay + yıl seçici: kartta seçili ay görünür, dokununca seçim penceresi açılır. */
export function AyYilSecici({ etiket, deger, onChange }: Props) {
  const buYil = new Date().getFullYear();
  const [acik, setAcik] = useState(false);
  const [yil, setYil] = useState(buYil);
  const [ay, setAy] = useState<number | null>(null);

  const ac = () => {
    if (deger) {
      const [y, a] = deger.split('-').map(Number);
      setYil(y);
      setAy(a);
    } else {
      setYil(buYil);
      setAy(null);
    }
    setAcik(true);
  };

  const tamam = () => {
    if (ay !== null) onChange(ayOlustur(yil, ay));
    setAcik(false);
  };

  const yillar = Array.from({ length: YIL_ARALIGI }, (_, i) => buYil - i);

  return (
    <>
      <Alan etiket={etiket} deger={ayEtiketi(deger)} onPress={ac} />
      <Modal visible={acik} transparent animationType="fade" onRequestClose={() => setAcik(false)}>
        <View style={stil.perde}>
          <View style={stil.pencere}>
            <Text style={stil.baslik}>{etiket}</Text>
            <View style={stil.govde}>
              <ScrollView style={stil.yillar} contentContainerStyle={{ gap: 2 }}>
                {yillar.map((y) => (
                  <Pressable
                    key={y}
                    onPress={() => setYil(y)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: y === yil }}
                    style={[stil.yil, y === yil && stil.secili]}
                  >
                    <Text style={[stil.metin, y === yil && stil.seciliMetin]}>{y}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <View style={stil.aylar}>
                {AY_ADLARI.map((ad, i) => {
                  const secili = ay === i + 1;
                  return (
                    <Pressable
                      key={ad}
                      onPress={() => setAy(i + 1)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: secili }}
                      style={[stil.ay, secili && stil.secili]}
                    >
                      <Text style={[stil.metin, secili && stil.seciliMetin]} numberOfLines={1}>
                        {ad}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View style={stil.dugmeler}>
              <View style={{ flex: 1 }}>
                <Dugme tur="metin" metin={t('genel.vazgec')} onPress={() => setAcik(false)} />
              </View>
              <View style={{ flex: 1 }}>
                <Dugme metin={t('genel.tamam')} onPress={tamam} pasif={ay === null} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const stil = StyleSheet.create({
  perde: {
    flex: 1,
    backgroundColor: 'rgba(28,37,65,0.45)',
    justifyContent: 'center',
    padding: olcu.ekranBosluk,
  },
  pencere: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap + 2, padding: 16, gap: 12 },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  govde: { flexDirection: 'row', gap: 10, height: 300 },
  yillar: { width: 84, flexGrow: 0 },
  yil: {
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aylar: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignContent: 'flex-start' },
  ay: {
    width: '48%',
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap - 2,
    backgroundColor: renk.zemin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secili: { backgroundColor: renk.gece },
  metin: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.gece },
  seciliMetin: { fontFamily: yaziTipi.kalin, color: renk.kart },
  dugmeler: { flexDirection: 'row', gap: 10 },
});
