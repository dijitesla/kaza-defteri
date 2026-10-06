import { Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { TaslakBaglami } from '../../kurulumTaslagi';
import { bosTaslak, type KurulumTaslagi } from '../../logic/kurulum';
import { renk } from '../../tema';

export default function KurulumDuzeni() {
  const [taslak, setTaslak] = useState<KurulumTaslagi>(bosTaslak);
  const guncelle = useCallback(
    (d: Partial<KurulumTaslagi>) => setTaslak((onceki) => ({ ...onceki, ...d })),
    [],
  );
  const deger = useMemo(() => ({ taslak, guncelle }), [taslak, guncelle]);
  return (
    <TaslakBaglami.Provider value={deger}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: renk.zemin } }} />
    </TaslakBaglami.Provider>
  );
}
