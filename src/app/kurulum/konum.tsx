import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { ILLER } from '../../data/iller';
import { useTaslak } from '../../kurulumTaslagi';
import { ilAra } from '../../logic/ilAra';
import { t } from '../../metinler';
import { olcu, renk, yaziTipi } from '../../tema';
import type { Ayarlar } from '../../types';

const KONUM_ZAMAN_ASIMI_MS = 20_000;

/** Ön planda, tek seferlik konum. İzin yoksa null, konum alınamazsa hata fırlatır. */
async function gpsKonumu(): Promise<Ayarlar['konum'] | null> {
  const izin = await Location.requestForegroundPermissionsAsync();
  if (izin.status !== 'granted') return null;
  const konum = await Promise.race([
    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
    new Promise<never>((_, reddet) =>
      setTimeout(() => reddet(new Error('zaman aşımı')), KONUM_ZAMAN_ASIMI_MS),
    ),
  ]);
  return { ad: t('konum.gpsAdi'), enlem: konum.coords.latitude, boylam: konum.coords.longitude };
}

export default function KurulumKonum() {
  const { taslak, guncelle } = useTaslak();
  const [secim, setSecim] = useState(taslak.konum);
  const [aranan, setAranan] = useState('');
  const [bulunuyor, setBulunuyor] = useState(false);
  const [hata, setHata] = useState(false);

  const liste = useMemo(() => ilAra(ILLER, aranan), [aranan]);
  const gpsSecili = secim?.ad === t('konum.gpsAdi');

  const konumumuBul = async () => {
    setHata(false);
    setBulunuyor(true);
    try {
      const k = await gpsKonumu();
      // İzin reddedildiyse sessizce il listesine dönülür (SPEC 2.1).
      if (k) setSecim(k);
    } catch {
      setHata(true);
    } finally {
      setBulunuyor(false);
    }
  };

  const devam = () => {
    if (!secim) return;
    guncelle({ konum: secim });
    router.push('/kurulum/hesap');
  };

  return (
    <Ekran
      ust={t('kurulum.adim', { n: 1 })}
      baslik={t('konum.baslik')}
      alt={
        <>
          {!secim ? <Text style={stil.not}>{t('konum.secimYok')}</Text> : null}
          <Dugme metin={t('genel.devam')} onPress={devam} pasif={!secim} />
        </>
      }
    >
      <Dugme metin={t('konum.bul')} onPress={konumumuBul} yukleniyor={bulunuyor} />
      {hata ? <Text style={stil.hata}>{t('konum.hata')}</Text> : null}

      {gpsSecili && secim ? <Satir ad={secim.ad} secili ilk son onPress={() => {}} /> : null}

      <Text style={stil.yaDa}>{t('konum.yaDa')}</Text>
      <TextInput
        value={aranan}
        onChangeText={setAranan}
        placeholder={t('konum.ara')}
        placeholderTextColor={renk.sekmePasif}
        style={stil.ara}
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel={t('konum.ara')}
      />
      <View>
        {liste.map((il, i) => (
          <Satir
            key={il.ad}
            ad={il.ad}
            secili={!gpsSecili && secim?.ad === il.ad}
            ilk={i === 0}
            son={i === liste.length - 1}
            onPress={() => setSecim({ ad: il.ad, enlem: il.enlem, boylam: il.boylam })}
          />
        ))}
      </View>
      <Text style={stil.not}>{t('konum.gizlilik')}</Text>
    </Ekran>
  );
}

function Satir(p: { ad: string; secili: boolean; ilk: boolean; son: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={p.onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: p.secili }}
      style={[stil.satir, p.ilk && stil.ilk, p.son && stil.son, p.secili && stil.seciliSatir]}
    >
      <Text style={[stil.satirMetin, p.secili && { fontFamily: yaziTipi.kalin }]}>{p.ad}</Text>
      {p.secili ? <Text style={stil.onay}>✓</Text> : null}
    </Pressable>
  );
}

const stil = StyleSheet.create({
  yaDa: {
    fontFamily: yaziTipi.normal,
    fontSize: 13,
    color: renk.ikincilMetin,
    textAlign: 'center',
    marginTop: 4,
  },
  ara: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 14,
    minHeight: olcu.dokunmaMin + 4,
    fontFamily: yaziTipi.normal,
    fontSize: 15,
    color: renk.gece,
  },
  satir: {
    backgroundColor: renk.kart,
    minHeight: olcu.dokunmaMin + 4,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: renk.zemin,
  },
  ilk: { borderTopLeftRadius: olcu.kartYaricap, borderTopRightRadius: olcu.kartYaricap },
  son: {
    borderBottomLeftRadius: olcu.kartYaricap,
    borderBottomRightRadius: olcu.kartYaricap,
    borderBottomWidth: 0,
  },
  seciliSatir: { backgroundColor: '#F6F8FA' },
  satirMetin: { fontFamily: yaziTipi.normal, fontSize: 15, color: renk.gece },
  onay: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.onay },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
  hata: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.kilinamadi },
});
