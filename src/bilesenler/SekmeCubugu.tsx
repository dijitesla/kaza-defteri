import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { Tabs } from 'expo-router/js-tabs';
import { olcu, renk, yaziTipi } from '../tema';
import { Simge, type SimgeAdi } from './Simge';

type SekmeCubuguProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const SIMGELER: Record<string, SimgeAdi> = {
  index: 'gunes',
  vakitler: 'saat',
  gecmis: 'defter',
  ayarlar: 'ayar',
};

/** Yüzen, yuvarlak köşeli sekme çubuğu: seçili sekme koyu bir hap içinde simge ve adıyla görünür. */
export function SekmeCubugu({ state, descriptors, navigation, insets }: SekmeCubuguProps) {
  return (
    <View style={[stil.dis, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={stil.cubuk}>
        {state.routes.map((rota, i) => {
          const { options } = descriptors[rota.key];
          const etiket = typeof options.title === 'string' ? options.title : rota.name;
          const secili = state.index === i;
          const bas = () => {
            const olay = navigation.emit({ type: 'tabPress', target: rota.key, canPreventDefault: true });
            if (!secili && !olay.defaultPrevented) navigation.navigate(rota.name, rota.params);
          };
          return (
            <SekmeDugmesi
              key={rota.key}
              etiket={etiket}
              simge={SIMGELER[rota.name] ?? 'gunes'}
              secili={secili}
              onPress={bas}
            />
          );
        })}
      </View>
    </View>
  );
}

function SekmeDugmesi(p: { etiket: string; simge: SimgeAdi; secili: boolean; onPress: () => void }) {
  const ilerleme = useSharedValue(p.secili ? 1 : 0);
  useEffect(() => {
    ilerleme.value = withSpring(p.secili ? 1 : 0, { damping: 18, stiffness: 180 });
  }, [p.secili, ilerleme]);

  const hapStili = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(ilerleme.value, [0, 1], ['rgba(28,37,65,0)', renk.gece]),
    transform: [{ scale: 0.92 + ilerleme.value * 0.08 }],
  }));
  const etiketStili = useAnimatedStyle(() => ({
    opacity: ilerleme.value,
    maxWidth: ilerleme.value * 90,
    marginLeft: ilerleme.value * 6,
  }));

  return (
    <Pressable
      onPress={p.onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: p.secili }}
      accessibilityLabel={p.etiket}
      style={stil.dugme}
      hitSlop={4}
    >
      <Animated.View style={[stil.hap, hapStili]}>
        <Simge ad={p.simge} renk={p.secili ? renk.altin : renk.sekmePasif} boyut={22} />
        <Animated.View style={[stil.etiketKap, etiketStili]}>
          <Text style={stil.etiket} numberOfLines={1}>
            {p.etiket}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const stil = StyleSheet.create({
  dis: { backgroundColor: renk.zemin, paddingHorizontal: olcu.ekranBosluk, paddingTop: 6 },
  cubuk: {
    flexDirection: 'row',
    backgroundColor: renk.kart,
    borderRadius: 28,
    padding: 6,
    justifyContent: 'space-between',
    shadowColor: renk.gece,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  dugme: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  hap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 44,
  },
  etiketKap: { overflow: 'hidden' },
  etiket: { fontFamily: yaziTipi.kalin, fontSize: 13, color: renk.beyaz },
});
