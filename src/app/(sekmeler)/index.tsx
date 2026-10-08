import { router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeriAlCubugu, useGeriAlCubugu } from '../../bilesenler/GeriAlCubugu';
import { GokyuzuKarti } from '../../bilesenler/GokyuzuKarti';
import { GunYayi } from '../../bilesenler/GunYayi';
import { Simge } from '../../bilesenler/Simge';
import { depolama } from '../../depolama';
import { ayEvresi, gokCismi, gunEvresi } from '../../logic/gokyuzu';
import type { ZikirDurumu } from '../../logic/zikir';
import { ReklamBandi } from '../../bilesenler/ReklamBandi';
import { cevapsizVakitler, yayDurumu, type CevapsizVakit } from '../../logic/gunluk';
import { toplam } from '../../logic/islemler';
import { sayiBicimle } from '../../logic/kazaHesap';
import { gunAnahtari, gunAyMetni, gunEkle, kucukHarf, saatMetni, uzunTarihMetni } from '../../logic/tarih';
import { girisZamani, gununVakitleri, siradakiVakit, vakitAraliklari } from '../../logic/vakitler';
import { t, VAKIT_ADLARI } from '../../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../../tema';
import { VAKITLER } from '../../types';
import { useSimdi } from '../../useSimdi';
import { useVeri } from '../../veri';

function cevapsizMetni(c: CevapsizVakit, bugun: string): string {
  const ad = VAKIT_ADLARI[c.vakit];
  if (c.gun === bugun) return t('bugun.cevapsizBugun', { Vakit: ad });
  if (c.gun === gunEkle(bugun, -1)) return t('bugun.cevapsizDun', { vakit: kucukHarf(ad) });
  return t('bugun.cevapsizTarih', { tarih: gunAyMetni(c.gun), vakit: kucukHarf(ad) });
}

export default function Bugun() {
  const { veri, vakitCevapla, geriAl } = useVeri();
  const simdi = useSimdi();
  const { cubuk, goster, kapat } = useGeriAlCubugu();
  const { konum, dakikaDuzeltme, kurulumZamani } = veri.ayarlar;
  const bugun = gunAnahtari(simdi);

  // Vakit hesapları gün, konum ya da düzeltme değişince yenilenir.
  const araliklar = useMemo(() => {
    const onbellek = new Map<string, ReturnType<typeof vakitAraliklari>>();
    return (gun: string) => {
      let a = onbellek.get(gun);
      if (!a) {
        a = vakitAraliklari(konum, gun, dakikaDuzeltme);
        onbellek.set(gun, a);
      }
      return a;
    };
  }, [konum, dakikaDuzeltme]);
  const vakitler = useMemo(() => gununVakitleri(konum, bugun, dakikaDuzeltme), [konum, bugun, dakikaDuzeltme]);
  const yarinVakitleri = useMemo(
    () => gununVakitleri(konum, gunEkle(bugun, 1), dakikaDuzeltme),
    [konum, bugun, dakikaDuzeltme],
  );
  const dunVakitleri = useMemo(
    () => gununVakitleri(konum, gunEkle(bugun, -1), dakikaDuzeltme),
    [konum, bugun, dakikaDuzeltme],
  );
  const cisim = gokCismi(simdi, vakitler, yarinVakitleri, dunVakitleri);

  const [zikir, setZikir] = useState<ZikirDurumu | null>(null);
  useFocusEffect(
    useCallback(() => {
      depolama.zikirOku().then(setZikir).catch(() => {});
    }, []),
  );

  const siradaki = siradakiVakit(konum, bugun, simdi, dakikaDuzeltme);
  const bugunAraliklar = araliklar(bugun);
  const yay = VAKITLER.map((v) => ({
    ad: VAKIT_ADLARI[v],
    saat: saatMetni(girisZamani(vakitler, v)),
    durum: yayDurumu(veri.gunluk, bugun, v, bugunAraliklar[v], simdi, siradaki.gun === bugun && siradaki.vakit === v),
  }));

  const cevapsizlar = cevapsizVakitler(
    veri.gunluk,
    bugun,
    simdi,
    araliklar,
    kurulumZamani ? new Date(kurulumZamani) : null,
  );
  const ilkCevapsiz = cevapsizlar[0];
  const kalanKaza = toplam(veri.kaza.kalan);

  const cevapla = (c: CevapsizVakit, cevap: 'kilindi' | 'kilinamadi') => {
    const id = vakitCevapla(c.gun, c.vakit, cevap);
    if (cevap === 'kilinamadi') goster(t('bugun.kilamadimKayit', { Vakit: VAKIT_ADLARI[c.vakit] }), id);
    else kapat();
  };

  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={stil.icerik}>
          <View>
            <Text style={stil.konum}>{konum.ad}</Text>
            <Text style={stil.tarih} accessibilityRole="header">
              {uzunTarihMetni(simdi)}
            </Text>
          </View>

          <GokyuzuKarti bugun={vakitler} yarin={yarinVakitleri} />

        <GunYayi vakitler={yay} cisim={cisim} ayEvre={ayEvresi(simdi)} gece={gunEvresi(simdi, vakitler) === 'gece'} />

          {ilkCevapsiz ? (
            <View style={stil.bant}>
              <Text style={stil.bantMetin}>{cevapsizMetni(ilkCevapsiz, bugun)}</Text>
              <View style={stil.bantDugmeler}>
                <BantDugmesi metin={t('bugun.kildim')} birincil onPress={() => cevapla(ilkCevapsiz, 'kilindi')} />
                <BantDugmesi metin={t('bugun.kilamadim')} onPress={() => cevapla(ilkCevapsiz, 'kilinamadi')} />
              </View>
            </View>
          ) : null}

          <View style={stil.kaza}>
            <View style={{ flex: 1 }}>
              <Text style={stil.kazaUst}>{t('bugun.kalanKaza')}</Text>
              <Text style={[buyukSayi, stil.kazaSayi]}>{sayiBicimle(kalanKaza)}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/kaza-kil')}
              accessibilityRole="button"
              style={({ pressed }) => [stil.kazaDugme, pressed && { opacity: 0.8 }]}
            >
              <Text style={stil.kazaDugmeMetin}>{t('bugun.kazaKil')}</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push('/zikirmatik')}
            accessibilityRole="button"
            style={({ pressed }) => [stil.zikir, pressed && { opacity: 0.85 }]}
          >
            <View style={stil.zikirSimge}>
              <Simge ad="tespih" renk={renk.altin} boyut={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={stil.zikirBaslik}>{t('zikir.baslik')}</Text>
              {zikir && zikir.tur > 0 ? <Text style={stil.zikirAlt}>{t('zikir.tur', { n: zikir.tur })}</Text> : null}
            </View>
            <Text style={[buyukSayi, stil.zikirSayi]}>
              {zikir ? zikir.sayi : 0}
              {zikir?.hedef ? <Text style={stil.zikirHedef}> / {zikir.hedef}</Text> : null}
            </Text>
          </Pressable>
        </ScrollView>
        {cubuk ? (
          <View style={stil.cubukKap}>
            <GeriAlCubugu
              metin={cubuk.metin}
              onGeriAl={
                cubuk.islemId
                  ? () => {
                      geriAl(cubuk.islemId!);
                      kapat();
                    }
                  : undefined
              }
            />
          </View>
        ) : null}
      </View>
      <ReklamBandi />
    </SafeAreaView>
  );
}

function BantDugmesi(p: { metin: string; birincil?: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={p.onPress}
      accessibilityRole="button"
      style={({ pressed }) => [stil.bantDugme, p.birincil && stil.bantBirincil, pressed && { opacity: 0.8 }]}
    >
      <Text style={[stil.bantDugmeMetin, p.birincil && { color: renk.kart }]}>{p.metin}</Text>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 12, paddingBottom: 90 },
  konum: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  tarih: { fontFamily: yaziTipi.baslik, fontSize: 24, color: renk.gece },
  bant: { backgroundColor: renk.uyariZemin, borderRadius: olcu.kartYaricap, padding: 12, gap: 10 },
  bantMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.uyariMetin },
  bantDugmeler: { flexDirection: 'row', gap: 8 },
  bantDugme: {
    flex: 1,
    minHeight: olcu.dokunmaMin,
    borderRadius: olcu.dugmeYaricap,
    backgroundColor: renk.kart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bantBirincil: { backgroundColor: renk.gece },
  bantDugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece },
  kaza: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kazaUst: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  kazaSayi: { fontSize: 28, lineHeight: 36 },
  kazaDugme: {
    backgroundColor: renk.altin,
    borderRadius: olcu.dugmeYaricap,
    minHeight: olcu.dokunmaMin,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  kazaDugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  zikir: {
    backgroundColor: renk.gece,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  zikirSimge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(212,168,83,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zikirBaslik: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.kart },
  zikirAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: '#C9CFE0' },
  zikirSayi: { fontSize: 26, lineHeight: 32, color: renk.kart },
  zikirHedef: { fontFamily: yaziTipi.normal, fontSize: 14, color: '#C9CFE0' },
  cubukKap: { position: 'absolute', left: olcu.ekranBosluk, right: olcu.ekranBosluk, bottom: 12 },
});
