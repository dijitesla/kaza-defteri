import { useMemo } from 'react';
import { DesenZemin } from '../../bilesenler/DesenZemin';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { ReklamBandi } from '../../bilesenler/ReklamBandi';
import { HaftalikGrafik } from '../../bilesenler/HaftalikGrafik';
import { RozetIzgarasi, SeriKarti } from '../../bilesenler/Rozetler';
import { TakvimKarti } from '../../bilesenler/TakvimKarti';
import { Simge, type SimgeAdi } from '../../bilesenler/Simge';
import {
  ayBasi,
  donemdeKilinan,
  etkiMetni,
  geriAlinabilir,
  gunlereGore,
  haftaBasi,
  haftalikOzet,
  islemAciklamasi,
  ozet,
} from '../../logic/islemler';
import { sayiBicimle } from '../../logic/kazaHesap';
import { enUzunSeri, rozetler, vakitSerisi } from '../../logic/rozetler';
import { bitisTarihi } from '../../logic/hedef';
import { ayYilMetni, gunAnahtari, gunAyMetni, gunEkle, saatMetni } from '../../logic/tarih';
import { t } from '../../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../../tema';
import type { Islem, IslemTuru } from '../../types';
import { useSimdi } from '../../useSimdi';
import { useVeri } from '../../veri';

const TUR_GORUNUMU: Record<IslemTuru, { simge: SimgeAdi; renk: string; zemin: string }> = {
  kaza_kilindi: { simge: 'onay', renk: renk.onay, zemin: renk.onayZemin },
  kilinamadi: { simge: 'arti', renk: renk.kilinamadi, zemin: renk.kilinamadiZemin },
  manuel_duzeltme: { simge: 'kalem', renk: renk.vurguMavi, zemin: renk.vurguMaviZemin },
  yeniden_hesap: { simge: 'yenile', renk: renk.vurguSari, zemin: renk.vurguSariZemin },
  geri_alindi: { simge: 'geri', renk: renk.ikincilMetin, zemin: renk.pasifZemin },
  oruc_tutuldu: { simge: 'onay', renk: renk.oruc, zemin: renk.orucZemin },
  oruc_duzeltme: { simge: 'kalem', renk: renk.oruc, zemin: renk.orucZemin },
};

function gunBasligi(gun: string, bugun: string): string {
  if (gun === bugun) return t('gecmis.bugun');
  if (gun === gunEkle(bugun, -1)) return t('gecmis.dun');
  return gunAyMetni(gun);
}

export default function Gecmis() {
  const { veri, geriAl } = useVeri();
  const simdi = useSimdi();
  const bugun = gunAnahtari(simdi);
  const { islemler } = veri;
  const o = ozet(veri.kaza);
  const geriAlinacak = geriAlinabilir(islemler);
  const yuzde = o.ilkBorc > 0 ? Math.min(100, Math.round((o.kilinan / o.ilkBorc) * 100)) : 0;
  const yarin = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate() + 1);
  const buHafta = donemdeKilinan(islemler, haftaBasi(simdi), yarin);
  const buAy = donemdeKilinan(islemler, ayBasi(simdi), yarin);

  const bitis = bitisTarihi(o.kalan, veri.ayarlar.gunlukHedef, simdi);
  const seri = vakitSerisi(veri.gunluk, bugun);
  const enUzun = useMemo(() => enUzunSeri(veri.gunluk), [veri.gunluk]);
  const haftalar = haftalikOzet(islemler, veri.gunluk, simdi);
  const rozetListesi = useMemo(() => rozetler(veri.kaza, veri.gunluk), [veri.kaza, veri.gunluk]);

  const bolumler = useMemo(
    () => gunlereGore(islemler).map((g) => ({ gun: g.gun, data: g.islemler })),
    [islemler],
  );

  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
      <DesenZemin />
      <SectionList
        sections={bolumler}
        keyExtractor={(i) => i.id}
        contentContainerStyle={stil.icerik}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View style={{ gap: 12 }}>
            <Text style={stil.baslik} accessibilityRole="header">
              {t('gecmis.baslik')}
            </Text>

            <View style={stil.ozet}>
              <IlerlemeHalkasi yuzde={yuzde} />
              <View style={stil.ozetSag}>
                <OzetSatiri etiket={t('gecmis.ilkBorc')} sayi={o.ilkBorc} />
                <OzetSatiri etiket={t('gecmis.kilinan')} sayi={o.kilinan} vurgu />
                <OzetSatiri etiket={t('gecmis.kalan')} sayi={o.kalan} />
                {bitis ? <Text style={stil.bitis}>{t('bugun.bitisTahmini', { tarih: ayYilMetni(bitis) })}</Text> : null}
              </View>
            </View>

            <View style={stil.donemler}>
              <Donem etiket={t('gecmis.buHafta')} sayi={buHafta} />
              <Donem etiket={t('gecmis.buAy')} sayi={buAy} />
            </View>

            <HaftalikGrafik haftalar={haftalar} />
            <TakvimKarti gunluk={veri.gunluk} bugun={bugun} ozelHal={veri.ayarlar.ozelGun.acik} />
            <SeriKarti seri={seri} enUzun={enUzun} />
            <RozetIzgarasi liste={rozetListesi} />

            {islemler.length === 0 ? <Text style={stil.bos}>{t('gecmis.bos')}</Text> : null}
          </View>
        }
        renderSectionHeader={({ section }) => <Text style={stil.gun}>{gunBasligi(section.gun, bugun)}</Text>}
        renderItem={({ item, index, section }) => (
          <Satir
            islem={item}
            aciklama={islemAciklamasi(item, islemler)}
            ilk={index === 0}
            son={index === section.data.length - 1}
            onGeriAl={geriAlinacak?.id === item.id ? () => geriAl(item.id) : undefined}
          />
        )}
      />
      <ReklamBandi />
    </SafeAreaView>
  );
}

function IlerlemeHalkasi({ yuzde }: { yuzde: number }) {
  const boyut = 112;
  const kalinlik = 10;
  const r = (boyut - kalinlik) / 2;
  const cevre = 2 * Math.PI * r;
  return (
    <View style={{ width: boyut, height: boyut, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={boyut} height={boyut} style={StyleSheet.absoluteFill}>
        <Circle cx={boyut / 2} cy={boyut / 2} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth={kalinlik} fill="none" />
        <Circle
          cx={boyut / 2}
          cy={boyut / 2}
          r={r}
          stroke={renk.altin}
          strokeWidth={kalinlik}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${(cevre * yuzde) / 100} ${cevre}`}
          transform={`rotate(-90 ${boyut / 2} ${boyut / 2})`}
        />
      </Svg>
      <Text style={stil.yuzde}>%{yuzde}</Text>
    </View>
  );
}

function OzetSatiri({ etiket, sayi, vurgu }: { etiket: string; sayi: number; vurgu?: boolean }) {
  return (
    <View style={stil.ozetSatir}>
      <Text style={stil.ozetEtiket}>{etiket}</Text>
      <Text style={[buyukSayi, stil.ozetSayi, vurgu && { color: renk.altin }]}>{sayiBicimle(sayi)}</Text>
    </View>
  );
}

function Donem({ etiket, sayi }: { etiket: string; sayi: number }) {
  return (
    <View style={stil.donem}>
      <Text style={stil.donemEtiket}>{etiket}</Text>
      <Text style={[buyukSayi, stil.donemSayi]}>{sayiBicimle(sayi)}</Text>
    </View>
  );
}

function Satir(p: { islem: Islem; aciklama: string; ilk: boolean; son: boolean; onGeriAl?: () => void }) {
  const g = TUR_GORUNUMU[p.islem.tur];
  const etki = etkiMetni(p.islem);
  const azalis = etki.startsWith('-');
  const artis = etki.startsWith('+');
  return (
    <View style={[stil.satir, p.ilk && stil.ilk, p.son && stil.son]}>
      <View style={[stil.simge, { backgroundColor: g.zemin }]}>
        <Simge ad={g.simge} renk={g.renk} boyut={18} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={stil.aciklama}>{p.aciklama}</Text>
        <View style={stil.altSatir}>
          <Text style={stil.saat}>{saatMetni(new Date(p.islem.zaman))}</Text>
          {p.onGeriAl ? (
            <Pressable onPress={p.onGeriAl} accessibilityRole="button" hitSlop={10}>
              <Text style={stil.geriAl}>{t('genel.geriAl')}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
      <View style={[stil.etki, azalis && { backgroundColor: renk.onayZemin }, artis && { backgroundColor: renk.kilinamadiZemin }]}>
        <Text style={[stil.etkiMetin, azalis && { color: renk.onay }, artis && { color: renk.kilinamadi }]}>{etki}</Text>
      </View>
    </View>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, paddingBottom: 32 },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 26, color: renk.metin },
  ozet: {
    backgroundColor: renk.gece,
    borderRadius: olcu.kartYaricap + 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  yuzde: { fontFamily: yaziTipi.baslik, fontSize: 22, color: renk.beyaz },
  ozetSag: { flex: 1, gap: 6 },
  ozetSatir: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  ozetEtiket: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.koyuUstuSoluk },
  bitis: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.altin, marginTop: 2 },
  ozetSayi: { fontSize: 18, lineHeight: 24, color: renk.beyaz },
  donemler: { flexDirection: 'row', gap: 10 },
  donem: { flex: 1, backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14 },
  donemEtiket: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  donemSayi: { fontSize: 24, lineHeight: 32 },
  bos: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin, lineHeight: 21 },
  gun: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.ikincilMetin, marginTop: 20, marginBottom: 8, marginLeft: 4 },
  satir: {
    backgroundColor: renk.kart,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: renk.zemin,
  },
  ilk: { borderTopLeftRadius: olcu.kartYaricap, borderTopRightRadius: olcu.kartYaricap },
  son: { borderBottomLeftRadius: olcu.kartYaricap, borderBottomRightRadius: olcu.kartYaricap, borderBottomWidth: 0 },
  simge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  aciklama: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.metin, lineHeight: 20 },
  altSatir: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 2 },
  saat: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
  geriAl: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.metin, textDecorationLine: 'underline' },
  etki: { minWidth: 40, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, backgroundColor: renk.pasifZemin, alignItems: 'center' },
  etkiMetin: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
});
