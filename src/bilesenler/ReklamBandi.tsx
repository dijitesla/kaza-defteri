import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_KIMLIGI, reklamlariHazirla } from '../reklam';
import { renk } from '../tema';

/**
 * Ekranın altındaki banner reklam. Onay yoksa, internet yoksa ya da reklam yüklenemezse
 * hiç yer kaplamaz; uygulama reklamsız da tam çalışır.
 */
export function ReklamBandi() {
  const [izin, setIzin] = useState(false);
  const [hata, setHata] = useState(false);

  useEffect(() => {
    let etkin = true;
    reklamlariHazirla().then((v) => etkin && setIzin(v));
    return () => {
      etkin = false;
    };
  }, []);

  if (!izin || hata) return null;
  return (
    <View style={stil.kap}>
      <BannerAd
        unitId={BANNER_KIMLIGI}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={() => setHata(true)}
      />
    </View>
  );
}

const stil = StyleSheet.create({
  kap: { alignItems: 'center', backgroundColor: renk.zemin },
});
