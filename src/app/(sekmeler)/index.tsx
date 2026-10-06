import { router } from 'expo-router';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { t } from '../../metinler';

// Aşama 3'te doldurulacak.
export default function Bugun() {
  return (
    <Ekran baslik={t('sekme.bugun')}>
      <Dugme metin={t('bugun.kazaKil')} onPress={() => router.push('/kaza-kil')} />
    </Ekran>
  );
}
