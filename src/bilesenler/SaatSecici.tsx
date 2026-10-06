import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import { Dugme } from './Dugme';

const SAATLER = Array.from({ length: 24 }, (_, i) => i);
const DAKIKALAR = Array.from({ length: 12 }, (_, i) => i * 5);
const iki = (n: number) => String(n).padStart(2, '0');

interface Props {
  baslik: string;
  acik: boolean;
  deger: string; // 'HH:mm'
  onKapat: () => void;
  onSec: (deger: string) => void;
}

/** Saat ve 5 dakikalık adımlarla dakika seçimi. */
export function SaatSecici({ baslik, acik, deger, onKapat, onSec }: Props) {
  const [sa, setSa] = useState(0);
  const [dk, setDk] = useState(0);

  const goster = () => {
    const [s, d] = deger.split(':').map(Number);
    setSa(s);
    setDk(d - (d % 5));
  };

  return (
    <Modal visible={acik} transparent animationType="fade" onShow={goster} onRequestClose={onKapat}>
      <View style={stil.perde}>
        <View style={stil.pencere}>
          <Text style={stil.baslik}>{baslik}</Text>
          <Text style={stil.onizleme}>{`${iki(sa)}:${iki(dk)}`}</Text>
          <ScrollView style={{ maxHeight: 360 }} contentContainerStyle={{ gap: 12 }}>
            <Izgara degerler={SAATLER} secili={sa} onSec={setSa} />
            <Izgara degerler={DAKIKALAR} secili={dk} onSec={setDk} />
          </ScrollView>
          <View style={stil.dugmeler}>
            <View style={{ flex: 1 }}>
              <Dugme tur="metin" metin={t('genel.vazgec')} onPress={onKapat} />
            </View>
            <View style={{ flex: 1 }}>
              <Dugme
                metin={t('genel.tamam')}
                onPress={() => {
                  onSec(`${iki(sa)}:${iki(dk)}`);
                  onKapat();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Izgara(p: { degerler: number[]; secili: number; onSec: (n: number) => void }) {
  return (
    <View style={stil.izgara}>
      {p.degerler.map((n) => {
        const s = n === p.secili;
        return (
          <Pressable
            key={n}
            onPress={() => p.onSec(n)}
            accessibilityRole="radio"
            accessibilityState={{ selected: s }}
            style={[stil.hucre, s && stil.secili]}
          >
            <Text style={[stil.metin, s && stil.seciliMetin]}>{iki(n)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const stil = StyleSheet.create({
  perde: { flex: 1, backgroundColor: 'rgba(28,37,65,0.45)', justifyContent: 'center', padding: olcu.ekranBosluk },
  pencere: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap + 2, padding: 16, gap: 12 },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  onizleme: { fontFamily: yaziTipi.baslik, fontSize: 28, color: renk.gece, textAlign: 'center', fontVariant: ['tabular-nums'] },
  izgara: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  hucre: {
    width: '15%',
    flexGrow: 1,
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap - 2,
    backgroundColor: renk.zemin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secili: { backgroundColor: renk.gece },
  metin: { fontFamily: yaziTipi.normal, fontSize: 15, color: renk.gece, fontVariant: ['tabular-nums'] },
  seciliMetin: { fontFamily: yaziTipi.kalin, color: renk.kart },
  dugmeler: { flexDirection: 'row', gap: 10 },
});
