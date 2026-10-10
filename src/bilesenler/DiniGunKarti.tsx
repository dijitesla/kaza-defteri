import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DiniGun } from '../data/diniGunler';
import { kalanGunMetni } from '../logic/diniGun';
import { gunAyMetni } from '../logic/tarih';
import { olcu, renk, yaziTipi } from '../tema';
import { Simge } from './Simge';

/** Ana ekranda yaklaşan (7 gün içindeki) dini gün. */
export function DiniGunKarti({ gun, fark }: { gun: DiniGun; fark: number }) {
  const bugun = fark === 0;
  return (
    <Pressable
      onPress={() => router.push('/dini-gunler')}
      accessibilityRole="button"
      style={({ pressed }) => [stil.kart, bugun && stil.bugun, pressed && { opacity: 0.85 }]}
    >
      <View style={[stil.simge, bugun && { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
        <Simge ad="hilal" renk={renk.altin} boyut={22} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[stil.ad, bugun && { color: renk.beyaz }]}>{gun.ad}</Text>
        <Text style={[stil.tarih, bugun && { color: renk.koyuUstuSoluk }]}>{gunAyMetni(gun.tarih)}</Text>
      </View>
      <Text style={[stil.kalan, bugun && { color: renk.altin }]}>{kalanGunMetni(fark, gun.tur === 'kandil')}</Text>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  kart: { backgroundColor: renk.kart, borderRadius: olcu.kartYaricap, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  bugun: { backgroundColor: renk.gece },
  simge: { width: 42, height: 42, borderRadius: 21, backgroundColor: renk.altinZemin, alignItems: 'center', justifyContent: 'center' },
  ad: { fontFamily: yaziTipi.kalin, fontSize: 15, color: renk.metin },
  tarih: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  kalan: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.metin },
});
