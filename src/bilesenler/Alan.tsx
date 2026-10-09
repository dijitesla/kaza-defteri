import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { olcu, renk, yaziTipi } from '../tema';

interface Props {
  etiket: string;
  deger?: string;
  onPress?: () => void;
  children?: ReactNode;
}

/** Beyaz kart: küçük etiket ve altında değer ya da içerik (docs/tasarim.html, .f). */
export function Alan({ etiket, deger, onPress, children }: Props) {
  const icerik = (
    <>
      <Text style={stil.etiket}>{etiket}</Text>
      {deger !== undefined ? <Text style={stil.deger}>{deger}</Text> : null}
      {children}
    </>
  );
  if (!onPress) return <View style={stil.kart}>{icerik}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [stil.kart, pressed && { opacity: 0.7 }]}
    >
      {icerik}
    </Pressable>
  );
}

const stil = StyleSheet.create({
  kart: {
    backgroundColor: renk.kart,
    borderRadius: olcu.kartYaricap,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: olcu.dokunmaMin,
    justifyContent: 'center',
  },
  etiket: { fontFamily: yaziTipi.normal, fontSize: 12, color: renk.ikincilMetin },
  deger: { fontFamily: yaziTipi.kalin, fontSize: 16, color: renk.metin, marginTop: 2 },
});
