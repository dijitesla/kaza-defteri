import { router } from 'expo-router';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { t } from '../../metinler';

// Aşama 2'de doldurulacak.
export default function KurulumHesap() {
  return (
    <Ekran ust={t('kurulum.adim', { n: 2 })} baslik={t('hesap.baslik')}>
      <Dugme metin={t('genel.devam')} onPress={() => router.push('/kurulum/hatirlatma')} />
    </Ekran>
  );
}
