import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { gunEkle } from '../logic/tarih';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import type { RamazanDurumu } from '../types';
import { Simge } from './Simge';

/** Ramazan'da ana ekranda: kaçıncı gün, ayın şeridi ve "Bugün oruç tuttun mu?". */
export function RamazanKarti({
  gun,
  toplam,
  bas,
  bugun,
  kayit,
  onCevap,
  teravihBugun,
  teravihSayi,
  onTeravih,
}: {
  gun: number;
  toplam: number;
  bas: string;
  bugun: string;
  kayit: RamazanDurumu;
  onCevap: (c: 'tuttu' | 'tutamadi') => void;
  teravihBugun: boolean;
  teravihSayi: number;
  onTeravih: () => void;
}) {
  const cevap = kayit[bugun];
  return (
    <View style={stil.kart}>
      <View style={stil.ust}>
        <Simge ad="hilal" renk={renk.altin} boyut={22} />
        <View style={{ flex: 1 }}>
          <Text style={stil.etiket}>{t('ramazan.hayirli')}</Text>
          <Text style={stil.baslik}>{t('ramazan.gun', { n: gun })}</Text>
        </View>
        <Text style={stil.sayi}>
          {gun}/{toplam}
        </Text>
      </View>

      <View style={stil.serit}>
        {Array.from({ length: toplam }, (_, i) => {
          const g = gunEkle(bas, i);
          const k = kayit[g];
          return (
            <View
              key={g}
              style={[
                stil.parca,
                k === 'tuttu' && { backgroundColor: renk.onay },
                k === 'tutamadi' && { backgroundColor: renk.kilinamadi },
                g === bugun && !k && { backgroundColor: renk.altin },
                g > bugun && { opacity: 0.35 },
              ]}
            />
          );
        })}
      </View>

      {cevap ? (
        <Text style={[stil.durum, { color: cevap === 'tuttu' ? renk.onay : renk.koyuUstuSoluk }]}>
          {cevap === 'tuttu' ? t('ramazan.tutuldu') : t('ramazan.tutulamadi')}
        </Text>
      ) : (
        <>
          <Text style={stil.soru}>{t('ramazan.soru')}</Text>
          <View style={stil.dugmeler}>
            <Pressable onPress={() => onCevap('tuttu')} accessibilityRole="button" style={({ pressed }) => [stil.dugme, stil.birincil, pressed && { opacity: 0.8 }]}>
              <Text style={[stil.dugmeMetin, { color: renk.altinUstu }]}>{t('ramazan.tuttum')}</Text>
            </Pressable>
            <Pressable onPress={() => onCevap('tutamadi')} accessibilityRole="button" style={({ pressed }) => [stil.dugme, pressed && { opacity: 0.8 }]}>
              <Text style={stil.dugmeMetin}>{t('ramazan.tutamadim')}</Text>
            </Pressable>
          </View>
        </>
      )}

      <View style={stil.alt}>
        <Pressable
          onPress={onTeravih}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: teravihBugun }}
          style={({ pressed }) => [stil.teravih, pressed && { opacity: 0.8 }]}
        >
          <View style={[stil.kutu, teravihBugun && stil.kutuDolu]}>
            {teravihBugun ? <Simge ad="onay" renk={renk.altinUstu} boyut={14} /> : null}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={stil.teravihBaslik}>{t('ramazan.teravih')}</Text>
            <Text style={stil.teravihAlt}>{t('ramazan.teravihSayi', { n: teravihSayi, toplam })}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => router.push('/dualar?bolum=oruc')}
          accessibilityRole="link"
          style={({ pressed }) => [stil.dua, pressed && { opacity: 0.8 }]}
        >
          <Text style={stil.duaMetin}>{t('ramazan.iftarDuasi')} ›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.gece, borderRadius: olcu.kartYaricap + 2, padding: 16, gap: 12 },
  ust: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.altin },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.beyaz },
  sayi: { fontFamily: yaziTipi.baslik, fontSize: 18, color: renk.koyuUstuSoluk, fontVariant: ['tabular-nums'] },
  serit: { flexDirection: 'row', gap: 3 },
  parca: { flex: 1, height: 8, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.18)' },
  soru: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.beyaz },
  dugmeler: { flexDirection: 'row', gap: 8 },
  dugme: {
    flex: 1,
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  birincil: { backgroundColor: renk.altin },
  dugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.beyaz },
  durum: { fontFamily: yaziTipi.kalin, fontSize: 13 },
  alt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.18)',
    paddingTop: 10,
  },
  teravih: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: olcu.dokunmaMin },
  kutu: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: renk.altin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kutuDolu: { backgroundColor: renk.altin },
  teravihBaslik: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.beyaz },
  teravihAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.koyuUstuSoluk },
  dua: { minHeight: olcu.dokunmaMin, justifyContent: 'center', paddingHorizontal: 4 },
  duaMetin: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.altin },
});
