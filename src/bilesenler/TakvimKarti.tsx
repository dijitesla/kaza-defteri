import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AY_ADLARI, GUN_KISA } from '../data/aylar';
import { ayIzgarasi, ayKaydir, gunRengi, type GunRengi } from '../logic/takvim';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';
import type { GunlukDurum } from '../types';
import { Simge } from './Simge';

const RENKLER: Record<GunRengi, { zemin: string; metin: string }> = {
  tam: { zemin: renk.onay, metin: renk.kart },
  kismi: { zemin: '#F3E3B5', metin: '#6E4A12' },
  kilinamadi: { zemin: '#F6D9D1', metin: renk.kilinamadi },
  muaf: { zemin: '#E9E1F3', metin: '#6E4FA0' },
  bos: { zemin: 'transparent', metin: renk.gece },
};

const ACIKLAMA: { renk: GunRengi; anahtar: 'takvim.tam' | 'takvim.kismi' | 'takvim.kilinamadi' | 'takvim.muaf' }[] = [
  { renk: 'tam', anahtar: 'takvim.tam' },
  { renk: 'kismi', anahtar: 'takvim.kismi' },
  { renk: 'kilinamadi', anahtar: 'takvim.kilinamadi' },
  { renk: 'muaf', anahtar: 'takvim.muaf' },
];

/** Ay takvimi: her gün beş vaktin durumuna göre renklenir. */
export function TakvimKarti({ gunluk, bugun, ozelHal }: { gunluk: GunlukDurum; bugun: string; ozelHal: boolean }) {
  const [y, a] = bugun.split('-').map(Number);
  const [ay, setAy] = useState({ yil: y, ay: a - 1 });
  const buAy = ay.yil === y && ay.ay === a - 1;
  const haftalar = ayIzgarasi(ay.yil, ay.ay);
  const aciklama = ozelHal ? ACIKLAMA : ACIKLAMA.filter((x) => x.renk !== 'muaf');

  return (
    <View style={stil.kart}>
      <View style={stil.ust}>
        <Text style={stil.baslik}>
          {AY_ADLARI[ay.ay]} {ay.yil}
        </Text>
        <View style={stil.oklar}>
          <Pressable
            onPress={() => setAy((x) => ayKaydir(x.yil, x.ay, -1))}
            accessibilityRole="button"
            accessibilityLabel={t('takvim.onceki')}
            hitSlop={8}
            style={stil.ok}
          >
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <Simge ad="ok" renk={renk.gece} boyut={18} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => setAy((x) => ayKaydir(x.yil, x.ay, 1))}
            disabled={buAy}
            accessibilityRole="button"
            accessibilityLabel={t('takvim.sonraki')}
            accessibilityState={{ disabled: buAy }}
            hitSlop={8}
            style={[stil.ok, buAy && { opacity: 0.3 }]}
          >
            <Simge ad="ok" renk={renk.gece} boyut={18} />
          </Pressable>
        </View>
      </View>

      <View style={stil.hafta}>
        {GUN_KISA.map((g) => (
          <Text key={g} style={stil.gunAdi}>
            {g}
          </Text>
        ))}
      </View>
      {haftalar.map((hafta, i) => (
        <View key={i} style={stil.hafta}>
          {hafta.map((gun, j) => {
            if (!gun) return <View key={j} style={stil.hucre} />;
            const r = RENKLER[gunRengi(gunluk, gun)];
            const gelecek = gun > bugun;
            return (
              <View key={j} style={stil.hucre}>
                <View
                  style={[
                    stil.daire,
                    { backgroundColor: r.zemin },
                    gun === bugun && stil.bugun,
                    gelecek && { opacity: 0.35 },
                  ]}
                >
                  <Text style={[stil.gunNo, { color: r.metin }]}>{Number(gun.slice(8))}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}

      <View style={stil.aciklama}>
        {aciklama.map((x) => (
          <View key={x.renk} style={stil.aciklamaOge}>
            <View style={[stil.nokta, { backgroundColor: RENKLER[x.renk].zemin }]} />
            <Text style={stil.aciklamaMetin}>{t(x.anahtar)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, gap: 6 },
  ust: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  baslik: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.gece },
  oklar: { flexDirection: 'row', gap: 6 },
  ok: { width: 34, height: 34, borderRadius: 17, backgroundColor: renk.zemin, alignItems: 'center', justifyContent: 'center' },
  hafta: { flexDirection: 'row' },
  gunAdi: { flex: 1, textAlign: 'center', fontFamily: yaziTipi.kalin, fontSize: 11, color: renk.ikincilMetin },
  hucre: { flex: 1, alignItems: 'center', paddingVertical: 2 },
  daire: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  bugun: { borderWidth: 2, borderColor: renk.altin },
  gunNo: { fontFamily: yaziTipi.kalin, fontSize: 13, fontVariant: ['tabular-nums'] },
  aciklama: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6, justifyContent: 'center' },
  aciklamaOge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  nokta: { width: 10, height: 10, borderRadius: 5 },
  aciklamaMetin: { fontFamily: yaziTipi.normal, fontSize: 11, color: renk.ikincilMetin },
});
