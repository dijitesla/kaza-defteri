import * as Location from 'expo-location';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ILCELER } from '../data/ilceler';
import { ILLER } from '../data/iller';
import { ilAra, ilceAra, ilceKonumAdi } from '../logic/ilAra';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import type { Ayarlar } from '../types';
import { Dugme } from './Dugme';

type Konum = Ayarlar['konum'];

const KONUM_ZAMAN_ASIMI_MS = 20_000;

/** Ön planda, tek seferlik konum. İzin yoksa null, konum alınamazsa hata fırlatır. */
async function gpsKonumu(): Promise<Konum | null> {
  const izin = await Location.requestForegroundPermissionsAsync();
  if (izin.status !== 'granted') return null;
  let zamanlayici: ReturnType<typeof setTimeout> | undefined;
  const konum = await Promise.race([
    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
    new Promise<never>((_, reddet) => {
      zamanlayici = setTimeout(() => reddet(new Error('zaman aşımı')), KONUM_ZAMAN_ASIMI_MS);
    }),
  ]).finally(() => clearTimeout(zamanlayici));
  return { ad: t('konum.gpsAdi'), enlem: konum.coords.latitude, boylam: konum.coords.longitude };
}

interface Props {
  secim: Konum | null;
  onSecim: (k: Konum) => void;
}

/** "Konumumu bul" ve aranabilir il listesi (kurulum 1/3 ve Ayarlar). */
export function KonumSecici({ secim, onSecim }: Props) {
  const [aranan, setAranan] = useState('');
  const [bulunuyor, setBulunuyor] = useState(false);
  const [hata, setHata] = useState(false);

  const [acikIl, setAcikIl] = useState<string | null>(null);

  const ilListesi = useMemo(() => ilAra(ILLER, aranan), [aranan]);
  const ilceListesi = useMemo(() => ilceAra(ILCELER, aranan), [aranan]);
  const gpsSecili = secim?.ad === t('konum.gpsAdi');

  const ilceSec = (il: string, ilce: { ad: string; enlem: number; boylam: number }) =>
    onSecim({ ad: ilceKonumAdi(il, ilce.ad), enlem: ilce.enlem, boylam: ilce.boylam });

  // Bir il açıksa ilçeleri (Merkez en üstte), değilse il listesi ve aramada eşleşen ilçeler.
  const satirlar: { anahtar: string; ad: string; alt?: string; secili: boolean; ok?: boolean; onPress: () => void }[] =
    acikIl
      ? [...ILCELER[acikIl]]
          .sort((a, b) => (a.ad === 'Merkez' ? -1 : b.ad === 'Merkez' ? 1 : 0))
          .map((ilce) => ({
            anahtar: ilce.ad,
            ad: ilce.ad,
            secili: secim?.ad === ilceKonumAdi(acikIl, ilce.ad),
            onPress: () => ilceSec(acikIl, ilce),
          }))
      : [
          ...ilListesi.map((il) => ({
            anahtar: il.ad,
            ad: il.ad,
            secili: !gpsSecili && (secim?.ad === il.ad || !!secim?.ad.endsWith(`, ${il.ad}`) || secim?.ad === `${il.ad} Merkez`),
            ok: true,
            onPress: () => {
              setAcikIl(il.ad);
              setAranan('');
            },
          })),
          ...ilceListesi.map(({ il, ilce }) => ({
            anahtar: `${il}/${ilce.ad}`,
            ad: ilce.ad,
            alt: il,
            secili: secim?.ad === ilceKonumAdi(il, ilce.ad),
            onPress: () => ilceSec(il, ilce),
          })),
        ];

  const konumumuBul = async () => {
    setHata(false);
    setBulunuyor(true);
    try {
      const k = await gpsKonumu();
      // İzin reddedildiyse sessizce il listesine dönülür (SPEC 2.1).
      if (k) onSecim(k);
    } catch {
      setHata(true);
    } finally {
      setBulunuyor(false);
    }
  };

  return (
    <>
      <Dugme metin={t('konum.bul')} onPress={konumumuBul} yukleniyor={bulunuyor} />
      {hata ? <Text style={stil.hata}>{t('konum.hata')}</Text> : null}

      {gpsSecili && secim ? <Satir ad={secim.ad} secili ilk son onPress={() => {}} /> : null}

      <Text style={stil.yaDa}>{t('konum.yaDa')}</Text>
      {acikIl ? (
        <Pressable onPress={() => setAcikIl(null)} accessibilityRole="button" style={stil.geri} hitSlop={8}>
          <Text style={stil.geriMetin}>‹ {t('konum.tumIller')}</Text>
          <Text style={stil.ilBaslik}>{t('konum.ilceler', { il: acikIl })}</Text>
        </Pressable>
      ) : (
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
      )}
      <View>
        {satirlar.map((r, i) => (
          <Satir
            key={r.anahtar}
            ad={r.ad}
            alt={r.alt}
            ok={r.ok}
            secili={r.secili}
            ilk={i === 0}
            son={i === satirlar.length - 1}
            onPress={r.onPress}
          />
        ))}
      </View>
      <Text style={stil.not}>{t('konum.gizlilik')}</Text>
    </>
  );
}

function Satir(p: {
  ad: string;
  alt?: string;
  ok?: boolean;
  secili: boolean;
  ilk: boolean;
  son: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={p.onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: p.secili }}
      style={[stil.satir, p.ilk && stil.ilk, p.son && stil.son, p.secili && stil.seciliSatir]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[stil.satirMetin, p.secili && { fontFamily: yaziTipi.kalin }]}>{p.ad}</Text>
        {p.alt ? <Text style={stil.satirAlt}>{p.alt}</Text> : null}
      </View>
      {p.secili ? <Text style={stil.onay}>✓</Text> : p.ok ? <Text style={stil.ok}>›</Text> : null}
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
    color: renk.metin,
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
  seciliSatir: { backgroundColor: renk.seciliSatir },
  satirMetin: { fontFamily: yaziTipi.normal, fontSize: 15, color: renk.metin },
  satirAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  ok: { fontFamily: yaziTipi.kalin, fontSize: 18, color: renk.sekmePasif },
  geri: { gap: 2, paddingVertical: 4 },
  geriMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.ikincilMetin },
  ilBaslik: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin },
  onay: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.onay },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
  hata: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.kilinamadi },
});
