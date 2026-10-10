import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AltEkran } from '../bilesenler/AltEkran';
import { Simge } from '../bilesenler/Simge';
import { SURELER } from '../data/sureler';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

export default function Sureler() {
  return (
    <AltEkran baslik={t('rehber.sureler')}>
      {SURELER.map((s, i) => (
        <Pressable
          key={s.id}
          onPress={() => router.push({ pathname: '/sure/[id]', params: { id: s.id } })}
          accessibilityRole="button"
          style={({ pressed }) => [stil.satir, pressed && { opacity: 0.85 }]}
        >
          <View style={stil.no}>
            <Text style={stil.noMetin}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={stil.ad}>{s.ad}</Text>
            <Text style={stil.alt} numberOfLines={1}>
              {t('rehber.ayetSayisi', { n: s.ayetler.length })} · {s.ayetler[0].okunus}
            </Text>
          </View>
          <Simge ad="ok" renk={renk.ikincilMetin} boyut={18} />
        </Pressable>
      ))}
      <Text style={stil.not}>{t('rehber.sureKaynak')}</Text>
    </AltEkran>
  );
}

const stil = StyleSheet.create({
  satir: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  no: { width: 34, height: 34, borderRadius: 17, backgroundColor: renk.altinZemin, alignItems: 'center', justifyContent: 'center' },
  noMetin: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.metin },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  alt: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  not: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin, lineHeight: 18, marginTop: 6 },
});
