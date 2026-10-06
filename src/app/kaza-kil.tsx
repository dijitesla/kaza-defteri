import { router, Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GeriAlCubugu, useGeriAlCubugu } from '../bilesenler/GeriAlCubugu';
import { Ekran } from '../bilesenler/Ekran';
import { toplam } from '../logic/islemler';
import { sayiBicimle } from '../logic/kazaHesap';
import { t, VAKIT_ADLARI } from '../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../tema';
import { KAZA_VAKITLERI, VAKITLER, type KazaVakit } from '../types';
import { useVeri } from '../veri';

const VURGU_MS = 1200;

export default function KazaKil() {
  const { veri, kazaKil, geriAl } = useVeri();
  const { cubuk, goster, kapat } = useGeriAlCubugu();
  const [vurgulu, setVurgulu] = useState<KazaVakit | null>(null);
  const vurguZamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (vurguZamanlayici.current) clearTimeout(vurguZamanlayici.current);
  }, []);

  // Şafii'de vitir yok (SPEC 2.5).
  const vakitler = veri.ayarlar.mezhep === 'hanefi' ? KAZA_VAKITLERI : VAKITLER;
  const kalan = veri.kaza.kalan;
  const toplamKalan = toplam(kalan);

  const kil = (v: KazaVakit) => {
    const id = kazaKil(v);
    if (!id) return;
    setVurgulu(v);
    if (vurguZamanlayici.current) clearTimeout(vurguZamanlayici.current);
    vurguZamanlayici.current = setTimeout(() => setVurgulu(null), VURGU_MS);
    goster(t('kaza.kaydedildi', { Vakit: VAKIT_ADLARI[v] }), id);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: '', headerBackTitle: t('sekme.bugun') }} />
      <Ekran baslik={t('kaza.baslik')}>
        {toplamKalan === 0 ? (
          <Text style={stil.tebrik}>{t('kaza.hepsiBitti')}</Text>
        ) : (
          <Text style={stil.soru}>{t('kaza.soru')}</Text>
        )}

        <View style={stil.izgara}>
          {vakitler.map((v) => {
            const bitti = kalan[v] === 0;
            const hit = vurgulu === v;
            return (
              <View key={v} style={[stil.kutu, hit && stil.kutuHit]}>
                <Text style={stil.kutuAd}>{VAKIT_ADLARI[v]}</Text>
                <Text style={[buyukSayi, stil.kutuSayi]}>{sayiBicimle(kalan[v])}</Text>
                <Text style={stil.kutuAlt}>{bitti ? t('kaza.bitti') : t('kaza.kalan')}</Text>
                <Pressable
                  onPress={() => kil(v)}
                  disabled={bitti}
                  accessibilityRole="button"
                  accessibilityLabel={`${VAKIT_ADLARI[v]} +1`}
                  accessibilityState={{ disabled: bitti }}
                  hitSlop={6}
                  style={({ pressed }) => [
                    stil.arti,
                    hit && { backgroundColor: renk.onay },
                    bitti && { opacity: 0.3 },
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <Text style={stil.artiMetin}>{hit ? '✓' : '+1'}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        {cubuk ? (
          <GeriAlCubugu
            metin={cubuk.metin}
            onGeriAl={() => {
              if (cubuk.islemId) geriAl(cubuk.islemId);
              setVurgulu(null);
              kapat();
            }}
          />
        ) : null}

        <View style={stil.altSatir}>
          <Text style={stil.toplam}>{t('kaza.toplam', { n: sayiBicimle(toplamKalan) })}</Text>
          <Pressable onPress={() => router.navigate('/gecmis')} accessibilityRole="link" hitSlop={10} style={stil.baglanti}>
            <Text style={stil.baglantiMetin}>{t('kaza.gecmis')}</Text>
          </Pressable>
        </View>
      </Ekran>
    </>
  );
}

const stil = StyleSheet.create({
  soru: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin },
  tebrik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.onay, lineHeight: 22 },
  izgara: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kutu: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    padding: 12,
    paddingRight: 60,
    minHeight: 96,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  kutuHit: { borderColor: renk.onay },
  kutuAd: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  kutuSayi: { fontSize: 26, lineHeight: 34 },
  kutuAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  arti: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: olcu.dokunmaMin,
    height: olcu.dokunmaMin,
    borderRadius: olcu.dokunmaMin / 2,
    backgroundColor: renk.gece,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artiMetin: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.kart },
  altSatir: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  toplam: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece, flexShrink: 1 },
  baglanti: { minHeight: olcu.dokunmaMin, justifyContent: 'center' },
  baglantiMetin: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin, textDecorationLine: 'underline' },
});
