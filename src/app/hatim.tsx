import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AltEkran } from '../bilesenler/AltEkran';
import { Dugme } from '../bilesenler/Dugme';
import { depolama } from '../depolama';
import { bosHatim, cuz, MUSHAF_SAYFA, okunanSayfa, sayfaAyarla, sayfaOku, type HatimDurumu } from '../logic/hatim';
import { gunAnahtari, gunEkle } from '../logic/tarih';
import { t } from '../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../tema';
import { useSimdi } from '../useSimdi';

const EKLE = [1, 5, 10, 20];
const SAYFA = /^\d{1,3}$/;

export default function Hatim() {
  const bugun = gunAnahtari(useSimdi());
  const [d, setD] = useState<HatimDurumu | null>(null);
  const [tebrik, setTebrik] = useState(false);
  const [giris, setGiris] = useState('');

  useEffect(() => {
    depolama.hatimOku().then(setD).catch(() => setD(bosHatim()));
  }, []);
  useEffect(() => {
    if (d) setGiris(String(d.sayfa));
  }, [d?.sayfa]);

  if (!d) return <AltEkran baslik={t('hatim.baslik')}>{null}</AltEkran>;

  const kaydet = (yeni: HatimDurumu) => {
    setD(yeni);
    depolama.hatimYaz(yeni).catch(() => {});
  };
  const ekle = (n: number) => {
    const r = sayfaOku(d, n, bugun);
    kaydet(r.durum);
    setTebrik(r.tamamlandi);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };
  const gecerli = SAYFA.test(giris) && Number(giris) < MUSHAF_SAYFA && Number(giris) !== d.sayfa;
  const oran = d.sayfa / MUSHAF_SAYFA;

  return (
    <AltEkran baslik={t('hatim.baslik')}>
      <View style={stil.kart}>
        {d.sayfa === 0 ? (
          <Text style={stil.bos}>{tebrik ? t('hatim.tebrik') : t('hatim.basla')}</Text>
        ) : (
          <>
            <Text style={stil.etiket}>{t('hatim.kaldigin')}</Text>
            <Text style={[buyukSayi, stil.sayi]} maxFontSizeMultiplier={1.3}>
              {t('hatim.sayfa', { sayfa: d.sayfa, toplam: MUSHAF_SAYFA })}
            </Text>
            <Text style={stil.cuz}>{t('hatim.cuz', { n: cuz(d.sayfa) })}</Text>
          </>
        )}
        <View style={stil.cubuk} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: MUSHAF_SAYFA, now: d.sayfa }}>
          <View style={[stil.dolu, { width: `${Math.round(oran * 100)}%` }]} />
        </View>
        <View style={stil.ozet}>
          <Text style={stil.ozetMetin}>{t('hatim.bugun', { n: okunanSayfa(d, bugun, bugun) })}</Text>
          <Text style={stil.ozetMetin}>{t('hatim.hafta', { n: okunanSayfa(d, gunEkle(bugun, -6), bugun) })}</Text>
          <Text style={stil.ozetMetin}>{t('hatim.tamamlanan', { n: d.hatim })}</Text>
        </View>
      </View>

      <Text style={stil.baslik}>{t('hatim.okudum')}</Text>
      <View style={stil.dugmeler}>
        {EKLE.map((n) => (
          <Pressable
            key={n}
            onPress={() => ekle(n)}
            accessibilityRole="button"
            style={({ pressed }) => [stil.ekle, pressed && { opacity: 0.8 }]}
          >
            <Text style={stil.ekleMetin}>{t('hatim.ekle', { n })}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={stil.baslik}>{t('hatim.duzelt')}</Text>
      <Text style={stil.not}>{t('hatim.duzeltAlt')}</Text>
      <View style={stil.duzelt}>
        <TextInput
          value={giris}
          onChangeText={setGiris}
          keyboardType="number-pad"
          maxLength={3}
          style={stil.girdi}
          accessibilityLabel={t('hatim.duzelt')}
        />
        <View style={{ flex: 1 }}>
          <Dugme
            metin={t('hatim.kaydet')}
            pasif={!gecerli}
            onPress={() => {
              kaydet(sayfaAyarla(d, Number(giris)));
              setTebrik(false);
            }}
          />
        </View>
      </View>
      <Text style={stil.not}>{t('hatim.not')}</Text>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.gece, borderRadius: olcu.kartYaricap + 2, padding: 18, gap: 8 },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.altin },
  sayi: { fontSize: 36, lineHeight: 44, color: renk.beyaz },
  cuz: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.koyuUstuSoluk },
  bos: { fontFamily: yaziTipi.kalin, fontSize: 15, lineHeight: 22, color: renk.beyaz },
  cubuk: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.18)', overflow: 'hidden', marginTop: 4 },
  dolu: { height: 8, backgroundColor: renk.altin },
  ozet: { gap: 2, marginTop: 4 },
  ozetMetin: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.koyuUstuSoluk },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin, marginTop: 8 },
  dugmeler: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ekle: {
    flexGrow: 1,
    minWidth: 72,
    minHeight: olcu.dokunmaMin + 4,
    borderRadius: olcu.dugmeYaricap,
    backgroundColor: renk.altin,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  ekleMetin: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.altinUstu },
  duzelt: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  girdi: {
    width: 90,
    minHeight: olcu.dokunmaMin + 4,
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 14,
    fontFamily: yaziTipi.kalin,
    fontSize: 18,
    color: renk.metin,
    textAlign: 'center',
  },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
});
