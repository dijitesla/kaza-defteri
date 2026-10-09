import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GokyuzuKarti } from '../../bilesenler/GokyuzuKarti';
import { HadisKarti } from '../../bilesenler/HadisKarti';
import { ReklamBandi } from '../../bilesenler/ReklamBandi';
import { simdikiVakit, vakitHadisi } from '../../logic/hadis';
import { gunAnahtari, gunEkle, saatMetni, uzunTarihMetni } from '../../logic/tarih';
import { gununVakitleri } from '../../logic/vakitler';
import { t, VAKIT_ADLARI } from '../../metinler';
import { olcu, renk, yaziTipi } from '../../tema';
import { useSimdi } from '../../useSimdi';
import { useVeri } from '../../veri';

export default function Vakitler() {
  const { veri } = useVeri();
  const simdi = useSimdi();
  const { konum, dakikaDuzeltme } = veri.ayarlar;
  const bugun = gunAnahtari(simdi);
  const v = useMemo(() => gununVakitleri(konum, bugun, dakikaDuzeltme), [konum, bugun, dakikaDuzeltme]);
  const yarin = useMemo(
    () => gununVakitleri(konum, gunEkle(bugun, 1), dakikaDuzeltme),
    [konum, bugun, dakikaDuzeltme],
  );

  const dun = useMemo(
    () => gununVakitleri(konum, gunEkle(bugun, -1), dakikaDuzeltme),
    [konum, bugun, dakikaDuzeltme],
  );
  // Hadis yalnızca vakit değişince yenilenir (bildirimdeki hadisle aynı).
  const vakitSimdi = simdikiVakit(simdi, v, dun);
  const hadis = vakitHadisi(vakitSimdi.vakit, vakitSimdi.giris);

  const satirlar = [
    { ad: t('vakitler.imsak'), zaman: v.imsak },
    { ad: t('vakitler.gunes'), zaman: v.gunes },
    { ad: VAKIT_ADLARI.ogle, zaman: v.ogle },
    { ad: VAKIT_ADLARI.ikindi, zaman: v.ikindi },
    { ad: VAKIT_ADLARI.aksam, zaman: v.aksam },
    { ad: VAKIT_ADLARI.yatsi, zaman: v.yatsi },
  ];
  // İçinde bulunulan vakit: başlangıcı geçmiş son satır (imsaktan önce dünün yatsısı sürer).
  let simdiki = -1;
  satirlar.forEach((s, i) => {
    if (s.zaman.getTime() <= simdi.getTime()) simdiki = i;
  });
  if (simdiki === -1) simdiki = satirlar.length - 1;
  const siradaki = satirlar.findIndex((s) => s.zaman.getTime() > simdi.getTime());

  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={stil.icerik}>
        <View>
          <Text style={stil.konum}>{konum.ad}</Text>
          <Text style={stil.baslik} accessibilityRole="header">
            {t('vakitler.baslik')}
          </Text>
          <Text style={stil.tarih}>{uzunTarihMetni(simdi)}</Text>
        </View>

        <GokyuzuKarti bugun={v} yarin={yarin} />

        <View style={stil.liste}>
          {satirlar.map((s, i) => {
            const aktif = i === simdiki;
            const sonraki = i === siradaki;
            return (
              <View key={s.ad} style={[stil.satir, aktif && stil.aktif, i === satirlar.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={[stil.isaret, aktif && { backgroundColor: renk.altin }, sonraki && stil.isaretSonraki]} />
                <Text style={[stil.ad, aktif && stil.aktifMetin]}>{s.ad}</Text>
                {aktif ? (
                  <View style={stil.cip}>
                    <Text style={stil.cipMetin}>{t('vakitler.simdi')}</Text>
                  </View>
                ) : null}
                <Text style={[stil.saat, aktif && stil.aktifMetin, sonraki && { color: renk.gece }]}>
                  {saatMetni(s.zaman)}
                </Text>
              </View>
            );
          })}
        </View>

        <HadisKarti etiket={t('hadis.vakit', { Vakit: VAKIT_ADLARI[vakitSimdi.vakit] })} hadis={hadis} />
      </ScrollView>
      <ReklamBandi />
    </SafeAreaView>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, gap: 14, paddingBottom: 24 },
  konum: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 26, color: renk.gece },
  tarih: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin },
  liste: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap + 2, padding: 6 },
  satir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    minHeight: 54,
    borderBottomWidth: 1,
    borderBottomColor: renk.zemin,
    borderRadius: olcu.kartYaricap,
  },
  aktif: { backgroundColor: renk.gece, borderBottomColor: 'transparent' },
  isaret: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D3D8E1' },
  isaretSonraki: { backgroundColor: renk.kart, borderWidth: 2, borderColor: renk.altin, width: 10, height: 10, borderRadius: 5 },
  ad: { flex: 1, fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.gece },
  saat: { fontFamily: yaziTipi.baslik, fontSize: 20, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
  aktifMetin: { color: renk.kart },
  cip: { backgroundColor: 'rgba(212,168,83,0.2)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  cipMetin: { fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.altin },
});
