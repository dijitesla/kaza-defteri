import { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { etkiMetni, geriAlinabilir, gunlereGore, islemAciklamasi, ozet } from '../../logic/islemler';
import { sayiBicimle } from '../../logic/kazaHesap';
import { gunAnahtari, gunAyMetni, gunEkle, saatMetni } from '../../logic/tarih';
import { t } from '../../metinler';
import { buyukSayi, olcu, renk, yaziTipi } from '../../tema';
import type { Islem } from '../../types';
import { useSimdi } from '../../useSimdi';
import { useVeri } from '../../veri';

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

  const bolumler = useMemo(
    () => gunlereGore(islemler).map((g) => ({ gun: g.gun, data: g.islemler })),
    [islemler],
  );

  return (
    <SafeAreaView style={stil.kap} edges={['top', 'left', 'right']}>
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
              <OzetKalemi etiket={t('gecmis.ilkBorc')} sayi={o.ilkBorc} />
              <OzetKalemi etiket={t('gecmis.kilinan')} sayi={o.kilinan} />
              <OzetKalemi etiket={t('gecmis.kalan')} sayi={o.kalan} />
            </View>
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
    </SafeAreaView>
  );
}

function OzetKalemi({ etiket, sayi }: { etiket: string; sayi: number }) {
  return (
    <View style={stil.ozetKalem}>
      <Text style={stil.ozetEtiket}>{etiket}</Text>
      <Text style={[buyukSayi, stil.ozetSayi]}>{sayiBicimle(sayi)}</Text>
    </View>
  );
}

function Satir(p: { islem: Islem; aciklama: string; ilk: boolean; son: boolean; onGeriAl?: () => void }) {
  return (
    <View style={[stil.satir, p.ilk && stil.ilk, p.son && stil.son]}>
      <Text style={stil.saat}>{saatMetni(new Date(p.islem.zaman))}</Text>
      <View style={{ flex: 1 }}>
        <Text style={stil.aciklama}>{p.aciklama}</Text>
        {p.onGeriAl ? (
          <Pressable onPress={p.onGeriAl} accessibilityRole="button" hitSlop={8} style={stil.geriAl}>
            <Text style={stil.geriAlMetin}>{t('genel.geriAl')}</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={stil.etki}>{etkiMetni(p.islem)}</Text>
    </View>
  );
}

const stil = StyleSheet.create({
  kap: { flex: 1, backgroundColor: renk.zemin },
  icerik: { padding: olcu.ekranBosluk, paddingBottom: 32 },
  baslik: { fontFamily: yaziTipi.baslik, fontSize: 26, color: renk.gece },
  ozet: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    padding: 14,
    flexDirection: 'row',
    gap: 8,
  },
  ozetKalem: { flex: 1 },
  ozetEtiket: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  ozetSayi: { fontSize: 20, lineHeight: 28 },
  bos: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.ikincilMetin, lineHeight: 21 },
  gun: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece, marginTop: 18, marginBottom: 8 },
  satir: {
    backgroundColor: renk.kart,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: renk.zemin,
  },
  ilk: { borderTopLeftRadius: olcu.kartYaricap, borderTopRightRadius: olcu.kartYaricap },
  son: { borderBottomLeftRadius: olcu.kartYaricap, borderBottomRightRadius: olcu.kartYaricap, borderBottomWidth: 0 },
  saat: { fontFamily: yaziTipi.normal, fontSize: 13, color: renk.ikincilMetin, fontVariant: ['tabular-nums'] },
  aciklama: { fontFamily: yaziTipi.normal, fontSize: 14, color: renk.gece, lineHeight: 20 },
  geriAl: { minHeight: 32, justifyContent: 'center', alignSelf: 'flex-start' },
  geriAlMetin: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece, textDecorationLine: 'underline' },
  etki: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.gece, fontVariant: ['tabular-nums'] },
});
