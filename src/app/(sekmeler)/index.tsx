import { router, useFocusEffect } from 'expo-router';
import { DesenZemin } from '../../bilesenler/DesenZemin';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnahtarSatiri } from '../../bilesenler/AnahtarSatiri';
import { GeriAlCubugu, useGeriAlCubugu } from '../../bilesenler/GeriAlCubugu';
import { CumaKarti } from '../../bilesenler/CumaKarti';
import { GokyuzuKarti } from '../../bilesenler/GokyuzuKarti';
import { GunYayi } from '../../bilesenler/GunYayi';
import { HadisKarti } from '../../bilesenler/HadisKarti';
import { NamazlarKarti } from '../../bilesenler/NamazlarKarti';
import { Simge } from '../../bilesenler/Simge';
import { depolama } from '../../depolama';
import { ayEvresi, gokCismi, gunEvresi } from '../../logic/gokyuzu';
import type { ZikirDurumu } from '../../logic/zikir';
import { ReklamBandi } from '../../bilesenler/ReklamBandi';
import { saatlikHadis } from '../../logic/hadis';
import { cevapsizVakitler, ozelHalVar, yayDurumu, type CevapsizVakit } from '../../logic/gunluk';
import { bitisTarihi, hedefIlerlemesi } from '../../logic/hedef';
import { donemdeKilinan, orucOzeti, toplam } from '../../logic/islemler';
import { sayiBicimle } from '../../logic/kazaHesap';
import { ayYilMetni, gunAnahtari, gunAyMetni, gunEkle, kucukHarf, saatMetni, uzunTarihMetni } from '../../logic/tarih';
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
  const { veri, vakitCevapla, geriAl, ozelHal, cevapKaldir } = useVeri();
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
    vakit: v,
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
  const hedef = veri.ayarlar.gunlukHedef;
  const gunBasi = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate());
  const yarin = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate() + 1);
  const ilerleme = hedefIlerlemesi(donemdeKilinan(veri.islemler, gunBasi, yarin), hedef);
  const bitis = bitisTarihi(kalanKaza, hedef, simdi);
  const oruc = orucOzeti(veri.kaza);
  const ozelHalAcik = veri.ayarlar.ozelGun.acik;

  const cevapla = (c: CevapsizVakit, cevap: 'kilindi' | 'kilinamadi' | 'muaf') => {
    const id = vakitCevapla(c.gun, c.vakit, cevap);
    if (cevap === 'kilinamadi') goster(t('bugun.kilamadimKayit', { Vakit: VAKIT_ADLARI[c.vakit] }), id);
    else kapat();
  };

  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
      <DesenZemin />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={stil.icerik}>
          <View>
            <Text style={stil.konum}>{konum.ad}</Text>
            <Text style={stil.tarih} accessibilityRole="header">
              {uzunTarihMetni(simdi)}
            </Text>
          </View>

          <GokyuzuKarti bugun={vakitler} yarin={yarinVakitleri} />

          {simdi.getDay() === 5 ? <CumaKarti ogle={vakitler.ogle} simdi={simdi} /> : null}

        <GunYayi vakitler={yay} cisim={cisim} ayEvre={ayEvresi(simdi)} gece={gunEvresi(simdi, vakitler) === 'gece'} />

          <NamazlarKarti
            satirlar={yay}
            onKildim={(v) => vakitCevapla(bugun, v, 'kilindi')}
            onKaldir={(v) => cevapKaldir(bugun, v)}
          />

          {ilkCevapsiz ? (
            <View style={stil.bant}>
              <Text style={stil.bantMetin}>{cevapsizMetni(ilkCevapsiz, bugun)}</Text>
              <View style={stil.bantDugmeler}>
                <BantDugmesi metin={t('bugun.kildim')} birincil onPress={() => cevapla(ilkCevapsiz, 'kilindi')} />
                <BantDugmesi metin={t('bugun.kilamadim')} onPress={() => cevapla(ilkCevapsiz, 'kilinamadi')} />
              </View>
              {ozelHalAcik ? (
                <Pressable onPress={() => cevapla(ilkCevapsiz, 'muaf')} accessibilityRole="button" hitSlop={8}>
                  <Text style={stil.bantMuaf}>{t('bugun.ozelHalDugme')}</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}

          <View style={stil.kaza}>
            <View style={{ flex: 1 }}>
              <Text style={stil.kazaUst}>{t('bugun.kalanKaza')}</Text>
              <Text style={[buyukSayi, stil.kazaSayi]}>{sayiBicimle(kalanKaza)}</Text>
              {hedef > 0 && kalanKaza > 0 ? (
                <View style={stil.hedef}>
                  <View style={stil.hedefCubuk}>
                    <View
                      style={[
                        stil.hedefDolu,
                        { width: `${Math.min(100, (ilerleme.kilinan / hedef) * 100)}%` },
                        ilerleme.tamam && { backgroundColor: renk.onay },
                      ]}
                    />
                  </View>
                  <Text style={[stil.hedefMetin, ilerleme.tamam && { color: renk.onay }]}>
                    {ilerleme.tamam ? t('bugun.hedefTamam') : t('bugun.hedefIlerleme', { n: ilerleme.kilinan, hedef })}
                  </Text>
                  {bitis ? <Text style={stil.bitis}>{t('bugun.bitisTahmini', { tarih: ayYilMetni(bitis) })}</Text> : null}
                </View>
              ) : null}
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
            onPress={() => router.push('/kaza-orucu')}
            accessibilityRole="button"
            style={({ pressed }) => [stil.oruc, pressed && { opacity: 0.85 }]}
          >
            <View style={{ flex: 1 }}>
              <Text style={stil.kazaUst}>{t('oruc.baslik')}</Text>
              {oruc.ilkBorc > 0 ? (
                <Text style={[buyukSayi, stil.orucSayi]}>{t('oruc.gun', { n: sayiBicimle(oruc.kalan) })}</Text>
              ) : (
                <Text style={stil.orucEkle}>{t('oruc.ekle')}</Text>
              )}
            </View>
            <Simge ad="ok" renk={renk.ikincilMetin} boyut={20} />
          </Pressable>

          {ozelHalAcik ? (
            <AnahtarSatiri
              baslik={t('bugun.ozelHal')}
              alt={t('bugun.ozelHalAlt')}
              deger={ozelHalVar(veri.gunluk, bugun)}
              onChange={(acik) => ozelHal(bugun, acik)}
            />
          ) : null}

          <HadisKarti etiket={t('hadis.saatlik')} hadis={saatlikHadis(simdi)} />

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

          <Pressable
            onPress={() => router.push('/kible')}
            accessibilityRole="button"
            style={({ pressed }) => [stil.kible, pressed && { opacity: 0.85 }]}
          >
            <View style={stil.kibleSimge}>
              <Simge ad="pusula" renk={renk.metin} boyut={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={stil.kibleBaslik}>{t('kible.baslik')}</Text>
              <Text style={stil.kibleAlt}>{t('kible.kartAlt')}</Text>
            </View>
            <Simge ad="ok" renk={renk.ikincilMetin} boyut={20} />
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
      <Text style={[stil.bantDugmeMetin, p.birincil && { color: renk.beyaz }]}>{p.metin}</Text>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 12, paddingBottom: 90 },
  konum: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  tarih: { fontFamily: yaziTipi.baslik, fontSize: 24, color: renk.metin },
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
  bantDugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.metin },
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
  hedef: { marginTop: 6, gap: 4 },
  hedefCubuk: { height: 6, borderRadius: 3, backgroundColor: renk.zemin, overflow: 'hidden' },
  hedefDolu: { height: 6, borderRadius: 3, backgroundColor: renk.altin },
  hedefMetin: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.metin },
  bitis: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  bantMuaf: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.muaf, textAlign: 'center', textDecorationLine: 'underline' },
  oruc: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orucSayi: { fontSize: 22, lineHeight: 30 },
  orucEkle: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin, marginTop: 2 },
  kazaDugme: {
    backgroundColor: renk.altin,
    borderRadius: olcu.dugmeYaricap,
    minHeight: olcu.dokunmaMin,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  kazaDugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.altinUstu },
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
    backgroundColor: renk.altinZemin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zikirBaslik: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.beyaz },
  zikirAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.koyuUstuSoluk },
  zikirSayi: { fontSize: 26, lineHeight: 32, color: renk.beyaz },
  zikirHedef: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.koyuUstuSoluk },
  kible: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kibleSimge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: renk.altinZemin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kibleBaslik: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin },
  kibleAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  cubukKap: { position: 'absolute', left: olcu.ekranBosluk, right: olcu.ekranBosluk, bottom: 12 },
});
