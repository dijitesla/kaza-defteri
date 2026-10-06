import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { useKurulum } from '../../kurulumDurumu';
import { t } from '../../metinler';

// Aşama 2'de doldurulacak. Şimdilik "Devam et" kurulumu bitirip sekmelere geçer.
export default function KurulumHatirlatma() {
  const { kurulumTamamla } = useKurulum();
  return (
    <Ekran ust={t('kurulum.adim', { n: 3 })} baslik={t('hatirlat.baslik')}>
      <Dugme metin={t('genel.devam')} onPress={kurulumTamamla} />
    </Ekran>
  );
}
