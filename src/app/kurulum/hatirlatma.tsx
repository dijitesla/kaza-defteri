import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { bildirimIzniIste } from '../../bildirimler';
import { AnahtarSatiri } from '../../bilesenler/AnahtarSatiri';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { Secenekler } from '../../bilesenler/Secenekler';
import { useVeri } from '../../veri';
import { useTaslak } from '../../kurulumTaslagi';
import { kurulumVerisiOlustur } from '../../logic/kurulum';
import { t, VAKIT_ADLARI } from '../../metinler';
import { renk, yaziTipi } from '../../tema';
import { VAKITLER, type Ayarlar } from '../../types';

type SoruDakika = Ayarlar['bildirim']['soruDakika'];

export default function KurulumHatirlatma() {
  const { taslak, guncelle } = useTaslak();
  const { kurulumTamamla } = useVeri();
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const b = taslak.bildirim;

  const bitir = async (izinIste: boolean) => {
    setKaydediliyor(true);
    try {
      // İzin reddedilse de kurulum biter (SPEC 2.3).
      if (izinIste) await bildirimIzniIste().catch(() => {});
      await kurulumTamamla(kurulumVerisiOlustur(taslak, new Date()));
    } finally {
      setKaydediliyor(false);
    }
  };

  return (
    <Ekran
      ust={t('kurulum.adim', { n: 3 })}
      baslik={t('hatirlat.baslik')}
      alt={
        <>
          <Dugme metin={t('hatirlat.izin')} onPress={() => bitir(true)} yukleniyor={kaydediliyor} />
          <Dugme
            tur="metin"
            metin={t('hatirlat.izinsiz')}
            onPress={() => bitir(false)}
            pasif={kaydediliyor}
          />
        </>
      }
    >
      <Text style={stil.etiket}>{t('hatirlat.hangi')}</Text>
      {VAKITLER.map((v) => (
        <AnahtarSatiri
          key={v}
          baslik={VAKIT_ADLARI[v]}
          alt={v === 'yatsi' ? t('hatirlat.yatsiAlt', { saat: b.yatsiSoruSaati }) : undefined}
          deger={b.vakitler[v]}
          onChange={(acik) => guncelle({ bildirim: { ...b, vakitler: { ...b.vakitler, [v]: acik } } })}
        />
      ))}

      <Text style={[stil.etiket, { marginTop: 8 }]}>{t('hatirlat.zaman')}</Text>
      <Secenekler<SoruDakika>
        gorunum="cip"
        secenekler={([15, 30, 60] as const).map((n) => ({ deger: n, etiket: t('hatirlat.dk', { n }) }))}
        deger={b.soruDakika}
        onChange={(n) => guncelle({ bildirim: { ...b, soruDakika: n } })}
      />
      <Text style={stil.not}>{t('hatirlat.zamanAlt')}</Text>
    </Ekran>
  );
}

const stil = StyleSheet.create({
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18 },
});
