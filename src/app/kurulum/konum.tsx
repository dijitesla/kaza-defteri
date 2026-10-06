import { router } from 'expo-router';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { t } from '../../metinler';

// Aşama 2'de doldurulacak.
export default function KurulumKonum() {
  return (
    <Ekran ust={t('kurulum.adim', { n: 1 })} baslik={t('konum.baslik')}>
      <Dugme metin={t('genel.devam')} onPress={() => router.push('/kurulum/hesap')} />
    </Ekran>
  );
}
