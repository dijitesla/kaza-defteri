import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { t } from '../metinler';
import { olcu, renk, yaziTipi } from '../tema';

const SURE_MS = 6000;

/** "X kaydedildi | Geri al" çubuğunun durumu; 6 saniye sonra kendiliğinden kapanır. */
export function useGeriAlCubugu() {
  const [cubuk, setCubuk] = useState<{ metin: string; islemId: string | null } | null>(null);
  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);

  const kapat = useCallback(() => {
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
    setCubuk(null);
  }, []);

  const goster = useCallback((metin: string, islemId: string | null) => {
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
    setCubuk({ metin, islemId });
    zamanlayici.current = setTimeout(() => setCubuk(null), SURE_MS);
  }, []);

  useEffect(() => () => {
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
  }, []);

  return { cubuk, goster, kapat };
}

interface Props {
  metin: string;
  onGeriAl?: () => void;
}

export function GeriAlCubugu({ metin, onGeriAl }: Props) {
  return (
    <View style={stil.cubuk} accessibilityLiveRegion="polite">
      <Text style={stil.metin}>{metin}</Text>
      {onGeriAl ? (
        <Pressable onPress={onGeriAl} accessibilityRole="button" hitSlop={10} style={stil.dugme}>
          <Text style={stil.geriAl}>{t('genel.geriAl')}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const stil = StyleSheet.create({
  cubuk: {
    backgroundColor: renk.gece,
    borderRadius: olcu.kartYaricap - 2,
    paddingHorizontal: 14,
    minHeight: olcu.dokunmaMin + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  metin: { flex: 1, fontFamily: yaziTipi.normal, fontSize: 14, color: renk.beyaz },
  dugme: { minHeight: olcu.dokunmaMin, justifyContent: 'center' },
  geriAl: { fontFamily: yaziTipi.kalin, fontSize: 14, color: renk.altin },
});
