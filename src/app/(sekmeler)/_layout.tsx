import { Tabs } from 'expo-router/js-tabs';
import { t } from '../../metinler';
import { renk, yaziTipi } from '../../tema';

// Tasarımdaki gibi yalnızca yazılı sekmeler (docs/tasarim.html, .nav).
export default function SekmeDuzeni() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: renk.zemin },
        tabBarActiveTintColor: renk.gece,
        tabBarInactiveTintColor: renk.sekmePasif,
        tabBarStyle: { backgroundColor: renk.kart },
        tabBarIcon: () => null,
        tabBarIconStyle: { display: 'none' },
        tabBarLabelStyle: { fontFamily: yaziTipi.kalin, fontSize: 13 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('sekme.bugun') }} />
      <Tabs.Screen name="gecmis" options={{ title: t('sekme.gecmis') }} />
      <Tabs.Screen name="ayarlar" options={{ title: t('sekme.ayarlar') }} />
    </Tabs>
  );
}
