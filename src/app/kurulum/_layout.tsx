import { Stack } from 'expo-router';
import { renk } from '../../tema';

export default function KurulumDuzeni() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: renk.zemin } }} />;
}
