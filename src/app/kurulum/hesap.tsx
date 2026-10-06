import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Alan } from '../../bilesenler/Alan';
import { AnahtarSatiri } from '../../bilesenler/AnahtarSatiri';
import { AyYilSecici } from '../../bilesenler/AyYilSecici';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { Secenekler } from '../../bilesenler/Secenekler';
import { useTaslak } from '../../kurulumTaslagi';
import {
  aydaGunSinirla,
  formulMetni,
  hesapDogrula,
  kazaHesapla,
  OZEL_GUN_MAX,
  OZEL_GUN_MIN,
  type Ay,
  type HesapGirdisi,
} from '../../logic/kazaHesap';
import { t } from '../../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../../tema';
import type { Mezhep } from '../../types';

export default function KurulumHesap() {
  const { taslak, guncelle } = useTaslak();
  const ilk = taslak.hesap;
  const [yukumlulukAy, setYukumlulukAy] = useState<Ay | null>(ilk?.yukumlulukAy ?? null);
  const [duzenliAy, setDuzenliAy] = useState<Ay | null>(ilk?.duzenliAy ?? null);
  const [baslamadim, setBaslamadim] = useState(ilk ? ilk.duzenliAy === null : false);
  const [mezhep, setMezhep] = useState<Mezhep>(ilk?.mezhep ?? 'hanefi');
  const [ozelGunAcik, setOzelGunAcik] = useState(ilk?.ozelGun.acik ?? false);
  const [aydaGun, setAydaGun] = useState(ilk?.ozelGun.aydaGun ?? 7);

  const bugun = new Date();
  const bitis = baslamadim ? null : duzenliAy;
  const tamam = yukumlulukAy !== null && (baslamadim || duzenliAy !== null);
  const hata = tamam ? hesapDogrula(yukumlulukAy, bitis, bugun) : null;

  const girdi: HesapGirdisi | null =
    tamam && !hata
      ? { yukumlulukAy, duzenliAy: bitis, mezhep, ozelGun: { acik: ozelGunAcik, aydaGun } }
      : null;
  const sonuc = girdi ? kazaHesapla(girdi, bugun) : null;

  const devam = () => {
    if (!girdi) return;
    guncelle({ hesap: girdi });
    router.push('/kurulum/hatirlatma');
  };

  return (
    <Ekran
      ust={t('kurulum.adim', { n: 2 })}
      baslik={t('hesap.baslik')}
      alt={<Dugme metin={t('genel.devam')} onPress={devam} pasif={!girdi} />}
    >
      <AyYilSecici etiket={t('hesap.yukumluluk')} deger={yukumlulukAy} onChange={setYukumlulukAy} />
      <Text style={stil.not}>{t('hesap.yukumlulukYardim')}</Text>

      {!baslamadim ? (
        <AyYilSecici etiket={t('hesap.duzenli')} deger={duzenliAy} onChange={setDuzenliAy} />
      ) : null}
      <AnahtarSatiri baslik={t('hesap.henuzBaslamadim')} deger={baslamadim} onChange={setBaslamadim} />

      {hata ? <Text style={stil.hata}>{t(hata)}</Text> : null}

      <Alan etiket={t('hesap.mezhep')}>
        <Secenekler
          secenekler={[
            { deger: 'hanefi' as Mezhep, etiket: t('hesap.hanefi') },
            { deger: 'safii' as Mezhep, etiket: t('hesap.safii') },
          ]}
          deger={mezhep}
          onChange={setMezhep}
        />
      </Alan>

      <AnahtarSatiri
        baslik={t('hesap.ozelGun')}
        alt={t('hesap.ozelGunAlt')}
        deger={ozelGunAcik}
        onChange={setOzelGunAcik}
      />
      {ozelGunAcik ? (
        <Alan etiket={t('hesap.ozelGunGiris')}>
          <Sayac
            deger={aydaGun}
            onChange={(n) => setAydaGun(aydaGunSinirla(n))}
            min={OZEL_GUN_MIN}
            max={OZEL_GUN_MAX}
          />
        </Alan>
      ) : null}

      {sonuc ? (
        <View style={stil.formul}>
          <Text style={stil.formulMetin}>{t('hesap.formulBaslik')}</Text>
          <Text style={stil.formulSonuc}>{formulMetni(sonuc, ozelGunAcik)}</Text>
          {sonuc.toplam === 0 ? (
            <Text style={stil.formulMetin}>{t('hesap.borcYok')}</Text>
          ) : (
            <Text style={stil.formulMetin}>
              {t(mezhep === 'hanefi' ? 'hesap.formulHanefi' : 'hesap.formulSafii', {
                gun: sonuc.vakitBasiBorc,
              })}{' '}
              {t('hesap.formulDuzelt')}
            </Text>
          )}
        </View>
      ) : null}

      <Text style={stil.not}>{t('hesap.uyari')}</Text>
    </Ekran>
  );
}

function Sayac(p: { deger: number; onChange: (n: number) => void; min: number; max: number }) {
  return (
    <View style={stil.sayac}>
      <SayacDugmesi isaret="−" pasif={p.deger <= p.min} onPress={() => p.onChange(p.deger - 1)} />
      <Text style={[buyukSayi, stil.sayacDeger]} accessibilityLiveRegion="polite">
        {p.deger}
      </Text>
      <SayacDugmesi isaret="+" pasif={p.deger >= p.max} onPress={() => p.onChange(p.deger + 1)} />
    </View>
  );
}

function SayacDugmesi(p: { isaret: string; pasif: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={p.onPress}
      disabled={p.pasif}
      accessibilityRole="button"
      accessibilityLabel={p.isaret === '+' ? '+1' : '-1'}
      style={[stil.sayacDugme, p.pasif && { opacity: 0.35 }]}
    >
      <Text style={stil.sayacIsaret}>{p.isaret}</Text>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
  hata: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.kilinamadi },
  formul: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#B9A06A',
    borderRadius: olcu.kartYaricap,
    backgroundColor: '#FBF8F1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  formulMetin: { fontFamily: yaziTipi.normal, fontSize: 13, color: '#5A5040', lineHeight: 19 },
  formulSonuc: { ...buyukSayi, fontSize: 20 },
  sayac: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 6 },
  sayacDeger: { fontSize: 22, minWidth: 32, textAlign: 'center' },
  sayacDugme: {
    width: olcu.dokunmaMin,
    height: olcu.dokunmaMin,
    borderRadius: olcu.dokunmaMin / 2,
    backgroundColor: renk.gece,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sayacIsaret: { fontFamily: yaziTipi.kalin, fontSize: 20, color: renk.kart, lineHeight: 24 },
});
