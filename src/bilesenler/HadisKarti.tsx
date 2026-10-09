import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Hadis } from '../data/hadisler';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

const KISA_SATIR = 5;
const UZUN_METIN = 220;

/** Hadis kartı: başlık, metin (uzunsa kısaltılmış, dokununca açılır) ve kaynak. */
export function HadisKarti({ etiket, hadis, koyu }: { etiket: string; hadis: Hadis; koyu?: boolean }) {
  const [acik, setAcik] = useState(false);
  // Hadis değişince yeniden kısaltılmış gösterilir.
  useEffect(() => setAcik(false), [hadis]);
  const uzun = hadis.metin.length > UZUN_METIN;
  const metinRengi = koyu ? renk.beyaz : renk.metin;

  return (
    <Pressable
      onPress={uzun ? () => setAcik((a) => !a) : undefined}
      accessibilityRole={uzun ? 'button' : undefined}
      accessibilityHint={uzun ? (acik ? t('hadis.kisalt') : t('hadis.devami')) : undefined}
      style={[stil.kart, koyu && stil.koyu]}
    >
      <View style={stil.ust}>
        <Text style={stil.tirnak}>“</Text>
        <Text style={[stil.etiket, koyu && { color: renk.altin }]}>{etiket}</Text>
      </View>
      <Text style={[stil.metin, { color: metinRengi }]} numberOfLines={uzun && !acik ? KISA_SATIR : undefined}>
        {hadis.metin}
      </Text>
      <View style={stil.alt}>
        <Text style={[stil.kaynak, koyu && { color: renk.koyuUstuSoluk }]}>{hadis.kaynak}</Text>
        {uzun ? (
          <Text style={[stil.devami, koyu && { color: renk.altin }]}>{acik ? t('hadis.kisalt') : t('hadis.devami')}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  kart: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    padding: 16,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: renk.altin,
  },
  koyu: { backgroundColor: renk.gece },
  ust: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tirnak: { fontFamily: yaziTipi.baslik, fontSize: 34, lineHeight: 34, color: renk.altin, marginTop: 8 },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.ikincilMetin, letterSpacing: 0.3 },
  metin: { fontFamily: yaziTipi.normal, fontSize: 14, lineHeight: 22 },
  alt: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kaynak: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.ikincilMetin },
  devami: { fontFamily: yaziTipi.kalin, fontSize: 12, color: renk.metin, textDecorationLine: 'underline' },
});
