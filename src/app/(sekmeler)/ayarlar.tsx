import Constants from 'expo-constants';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Alert, AppState, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { AnahtarSatiri } from '../../bilesenler/AnahtarSatiri';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { Sayac } from '../../bilesenler/HesapFormu';
import { SaatSecici } from '../../bilesenler/SaatSecici';
import { Secenekler } from '../../bilesenler/Secenekler';
import { HEDEF_SECENEKLERI } from '../../logic/hedef';
import { bildirimIzniDurumu, bildirimIzniIste } from '../../bildirimler';
import { toplam } from '../../logic/islemler';
import { formulMetni, kazaHesapla, ayarlardanGirdi, sayiBicimle } from '../../logic/kazaHesap';
import { gunAnahtari, saatMetni, tamTarihMetni } from '../../logic/tarih';
import { girisZamani, gununVakitleri } from '../../logic/vakitler';
import { t, VAKIT_ADLARI } from '../../metinler';
import { olcu, renk, yaziTipi } from '../../tema';
import { VAKITLER, type Ayarlar, type Vakit } from '../../types';
import { gizlilikSecenegiGerekli, gizlilikSecenekleriniAc } from '../../reklam';
import { yedekAl, yedekSec } from '../../yedekleme';
import { useVeri } from '../../veri';

type SoruDakika = Ayarlar['bildirim']['soruDakika'];
const DUZELTME_SINIRI = 10;

// Android 12 (API 31) ve sonrası kesin alarm için kullanıcı izni ister. İznin açık olup olmadığını
// Expo'dan okumanın yolu olmadığı için uyarı bu sürümlerde her zaman gösterilir.
const kesinAlarmUyarisi = Platform.OS === 'android' && Number(Platform.Version) >= 31;

async function kesinAlarmAyariniAc() {
  try {
    await Linking.sendIntent('android.settings.REQUEST_SCHEDULE_EXACT_ALARM');
  } catch {
    await Linking.openSettings();
  }
}

export default function AyarlarEkrani() {
  const { veri, ayarlariGuncelle, yedektenYukle, bildirimleriYenile } = useVeri();
  const a = veri.ayarlar;
  const b = a.bildirim;
  const [izin, setIzin] = useState<{ izinVar: boolean; tekrarSorulabilir: boolean } | null>(null);
  const [saatAcik, setSaatAcik] = useState(false);
  const [yedekMesgul, setYedekMesgul] = useState(false);
  const [reklamGizlilik, setReklamGizlilik] = useState(false);

  useEffect(() => {
    gizlilikSecenegiGerekli().then(setReklamGizlilik);
  }, []);

  const izniDenetle = useCallback(() => {
    bildirimIzniDurumu().then(setIzin).catch(() => {});
  }, []);
  useFocusEffect(izniDenetle);
  useEffect(() => {
    const abonelik = AppState.addEventListener('change', (d) => d === 'active' && izniDenetle());
    return () => abonelik.remove();
  }, [izniDenetle]);

  const izinVer = async () => {
    if (izin && !izin.tekrarSorulabilir) {
      await Linking.openSettings();
      return;
    }
    if (await bildirimIzniIste()) bildirimleriYenile();
    izniDenetle();
  };

  const bildirimDegistir = (d: Partial<Ayarlar['bildirim']>) =>
    ayarlariGuncelle((x) => ({ ...x, bildirim: { ...x.bildirim, ...d } }));

  const duzeltmeDegistir = (v: Vakit, n: number) =>
    ayarlariGuncelle((x) => ({ ...x, dakikaDuzeltme: { ...x.dakikaDuzeltme, [v]: n } }));

  const bugun = gunAnahtari(new Date());
  const vakitler = gununVakitleri(a.konum, bugun, a.dakikaDuzeltme);
  const hesap = kazaHesapla(ayarlardanGirdi(a), new Date());

  const yedegiAl = async () => {
    setYedekMesgul(true);
    try {
      await yedekAl(veri);
    } catch {
      // Paylaşma ekranı kapatıldı ya da açılamadı; veri değişmez.
    } finally {
      setYedekMesgul(false);
    }
  };

  const geriYukle = async () => {
    setYedekMesgul(true);
    let sonuc: Awaited<ReturnType<typeof yedekSec>>;
    try {
      sonuc = await yedekSec();
    } catch {
      sonuc = null;
    } finally {
      setYedekMesgul(false);
    }
    if (sonuc === 'iptal') return;
    if (!sonuc) {
      Alert.alert(t('yedek.hata'));
      return;
    }
    const { veri: yeni, tarih } = sonuc;
    Alert.alert(
      t('yedek.onayBaslik'),
      t('yedek.onayGovde', { n: sayiBicimle(toplam(yeni.kaza.kalan)), tarih: tamTarihMetni(new Date(tarih)) }),
      [
        { text: t('genel.vazgec'), style: 'cancel' },
        {
          text: t('yedek.onayDugme'),
          style: 'destructive',
          onPress: async () => {
            await yedektenYukle(yeni);
            Alert.alert(t('yedek.basarili'));
          },
        },
      ],
    );
  };

  return (
    <Ekran baslik={t('ayar.baslik')} reklam>
      {izin && !izin.izinVar ? (
        <Uyari metin={t('ayar.izinYok')} dugme={t('ayar.izinVer')} onPress={izinVer} />
      ) : null}
      {kesinAlarmUyarisi && izin?.izinVar ? (
        <Uyari metin={t('ayar.kesinAlarm')} dugme={t('ayar.kesinAlarmDugme')} onPress={kesinAlarmAyariniAc} />
      ) : null}

      <Bolum baslik={t('ayar.konum')}>
        <SatirDugme baslik={a.konum.ad} sag={t('ayar.konumDegistir')} onPress={() => router.push('/konum-sec')} />
      </Bolum>

      <Bolum baslik={t('ayar.kazaBilgileri')}>
        <SatirDugme
          baslik={formulMetni(hesap, a.ozelGun.acik)}
          alt={t('ayar.kazaBilgileriAlt')}
          sag="›"
          onPress={() => router.push('/kaza-bilgileri')}
        />
        <SatirDugme
          baslik={t('ayar.kazaDuzelt')}
          alt={t('ayar.kazaDuzeltAlt')}
          sag="›"
          onPress={() => router.push('/kaza-duzelt')}
        />
      </Bolum>

      <Bolum baslik={t('ayar.hedef')} alt={t('ayar.hedefAlt')}>
        <Secenekler<number>
          gorunum="cip"
          secenekler={HEDEF_SECENEKLERI.map((h) => ({ deger: h, etiket: h ? String(h) : t('ayar.hedefYok') }))}
          deger={a.gunlukHedef}
          onChange={(h) => ayarlariGuncelle((x) => ({ ...x, gunlukHedef: h }))}
        />
      </Bolum>

      <Bolum baslik={t('ayar.bildirimler')}>
        {VAKITLER.map((v) => (
          <AnahtarSatiri
            key={v}
            baslik={VAKIT_ADLARI[v]}
            alt={v === 'yatsi' ? t('hatirlat.yatsiAlt', { saat: b.yatsiSoruSaati }) : undefined}
            deger={b.vakitler[v]}
            onChange={(acik) => bildirimDegistir({ vakitler: { ...b.vakitler, [v]: acik } })}
          />
        ))}
        <AnahtarSatiri
          baslik={t('ayar.girisBildirimi')}
          alt={t('ayar.girisBildirimiAlt')}
          deger={b.girisBildirimi}
          onChange={(acik) => bildirimDegistir({ girisBildirimi: acik })}
        />
        <Text style={stil.etiket}>{t('ayar.soruZamani')}</Text>
        <Secenekler<SoruDakika>
          gorunum="cip"
          secenekler={([15, 30, 60] as const).map((n) => ({ deger: n, etiket: t('hatirlat.dk', { n }) }))}
          deger={b.soruDakika}
          onChange={(n) => bildirimDegistir({ soruDakika: n })}
        />
        <SatirDugme baslik={t('ayar.yatsiSaati')} sag={b.yatsiSoruSaati} onPress={() => setSaatAcik(true)} />
        <SaatSecici
          baslik={t('ayar.yatsiSaati')}
          acik={saatAcik}
          deger={b.yatsiSoruSaati}
          onKapat={() => setSaatAcik(false)}
          onSec={(s) => bildirimDegistir({ yatsiSoruSaati: s })}
        />
      </Bolum>

      <Bolum baslik={t('ayar.vakitDuzelt')} alt={t('ayar.vakitDuzeltAlt')}>
        {VAKITLER.map((v) => (
          <View key={v} style={stil.kart}>
            <View style={{ flex: 1 }}>
              <Text style={stil.kartBaslik}>{VAKIT_ADLARI[v]}</Text>
              <Text style={stil.kartAlt}>{saatMetni(girisZamani(vakitler, v))}</Text>
            </View>
            <Sayac
              deger={a.dakikaDuzeltme[v]}
              min={-DUZELTME_SINIRI}
              max={DUZELTME_SINIRI}
              onChange={(n) => duzeltmeDegistir(v, Math.max(-DUZELTME_SINIRI, Math.min(DUZELTME_SINIRI, n)))}
            />
          </View>
        ))}
      </Bolum>

      <Bolum baslik={t('ayar.yedekleme')}>
        <Text style={stil.not}>{t('ayar.yedekAlAlt')}</Text>
        <Dugme metin={t('ayar.yedekAl')} onPress={yedegiAl} yukleniyor={yedekMesgul} />
        <Dugme tur="metin" metin={t('ayar.geriYukle')} onPress={geriYukle} pasif={yedekMesgul} />
      </Bolum>

      {reklamGizlilik ? (
        <SatirDugme baslik={t('ayar.reklamGizlilik')} sag="›" onPress={gizlilikSecenekleriniAc} />
      ) : null}

      <Bolum baslik={t('ayar.hakkinda')}>
        <Text style={stil.metin}>{t('hakkinda.metin')}</Text>
        <Text style={stil.metin}>{t('hakkinda.vakit')}</Text>
        <Text style={stil.metin}>{t('hakkinda.gizlilik')}</Text>
        <Text style={stil.metin}>{t('hadis.kaynakNotu')}</Text>
        <Text style={stil.not}>{t('hakkinda.surum', { surum: Constants.expoConfig?.version ?? '' })}</Text>
      </Bolum>
    </Ekran>
  );
}

function Bolum({ baslik, alt, children }: { baslik: string; alt?: string; children: ReactNode }) {
  return (
    <View style={stil.bolum}>
      <Text style={stil.bolumBaslik} accessibilityRole="header">
        {baslik}
      </Text>
      {alt ? <Text style={stil.not}>{alt}</Text> : null}
      {children}
    </View>
  );
}

function SatirDugme(p: { baslik: string; alt?: string; sag?: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={p.onPress}
      accessibilityRole="button"
      style={({ pressed }) => [stil.kart, pressed && { opacity: 0.7 }]}
    >
      <View style={{ flex: 1 }}>
        <Text style={stil.kartBaslik}>{p.baslik}</Text>
        {p.alt ? <Text style={stil.kartAlt}>{p.alt}</Text> : null}
      </View>
      {p.sag ? <Text style={stil.sag}>{p.sag}</Text> : null}
    </Pressable>
  );
}

function Uyari(p: { metin: string; dugme: string; onPress: () => void }) {
  return (
    <View style={stil.uyari}>
      <Text style={stil.uyariMetin}>{p.metin}</Text>
      <Pressable onPress={p.onPress} accessibilityRole="button" style={stil.uyariDugme}>
        <Text style={stil.uyariDugmeMetin}>{p.dugme}</Text>
      </Pressable>
    </View>
  );
}

const stil = StyleSheet.create({
  bolum: { gap: 8, marginTop: 10 },
  bolumBaslik: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.metin, marginTop: 4 },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
  metin: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.metin, lineHeight: 20 },
  kart: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: olcu.dokunmaMin + 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kartBaslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  kartAlt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, marginTop: 2, lineHeight: 17 },
  sag: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.ikincilMetin },
  uyari: { backgroundColor: renk.uyariZemin, borderRadius: olcu.kartYaricap, padding: 12, gap: 8 },
  uyariMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.uyariMetin, lineHeight: 20 },
  uyariDugme: {
    alignSelf: 'flex-start',
    backgroundColor: renk.gece,
    borderRadius: olcu.dugmeYaricap,
    minHeight: olcu.dokunmaMin,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  uyariDugmeMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.beyaz },
});
