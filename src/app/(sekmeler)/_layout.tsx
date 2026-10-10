import { Tabs } from 'expo-router/js-tabs';
import { SekmeCubugu } from '../../bilesenler/SekmeCubugu';
import { t } from '../../metinler';
import { renk } from '../../tema';

export default function SekmeDuzeni() {
  return (
    <Tabs
      tabBar={(p) => <SekmeCubugu {...p} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: renk.zemin } }}
    >
      <Tabs.Screen name="index" options={{ title: t('sekme.bugun') }} />
      <Tabs.Screen name="vakitler" options={{ title: t('sekme.vakitler') }} />
      <Tabs.Screen name="rehber" options={{ title: t('sekme.rehber') }} />
      <Tabs.Screen name="gecmis" options={{ title: t('sekme.gecmis') }} />
      <Tabs.Screen name="ayarlar" options={{ title: t('sekme.ayarlar') }} />
    </Tabs>
  );
}
