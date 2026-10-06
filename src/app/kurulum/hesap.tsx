import { router } from 'expo-router';
import { Dugme } from '../../bilesenler/Dugme';
import { Ekran } from '../../bilesenler/Ekran';
import { useHesapFormu } from '../../bilesenler/HesapFormu';
import { useTaslak } from '../../kurulumTaslagi';
import { t } from '../../metinler';

export default function KurulumHesap() {
  const { taslak, guncelle } = useTaslak();
  const { girdi, form } = useHesapFormu(taslak.hesap);

  const devam = () => {
    if (!girdi) return;
    guncelle({ hesap: girdi });
    router.push('/kurulum/hatirlatma');
  };

  return (
    <Ekran
      ust={t('kurulum.adim', { n: 2 })}
      baslik={t('hesap.baslik')}
      alt={<Dugme metin={t('genel.devam')} onPress={devam} pasif={!girdi} />}
    >
      {form}
    </Ekran>
  );
}
