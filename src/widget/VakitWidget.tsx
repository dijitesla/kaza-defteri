// Ana ekran widget'ı (Android). Yalnızca react-native-android-widget bileşenleri kullanılır.
import { FlexWidget, TextWidget } from 'react-native-android-widget';
import type { WidgetVerisi } from '../logic/widget';
import { t, VAKIT_ADLARI } from '../metinler';

// Widget her zaman uygulamanın koyu kartı gibi görünür (telefon temasından bağımsız).
const GECE = '#1C2541';
const ALTIN = '#D4A853';
const BEYAZ = '#FFFFFF';
const SOLUK = '#C9CFE0';
const SATIR = 'rgba(255, 255, 255, 0.08)';

const AD: Record<string, string> = {
  imsak: t('vakitler.imsak'),
  gunes: t('vakitler.gunes'),
  ogle: VAKIT_ADLARI.ogle,
  ikindi: VAKIT_ADLARI.ikindi,
  aksam: VAKIT_ADLARI.aksam,
  yatsi: VAKIT_ADLARI.yatsi,
};

export function VakitWidget({ veri }: { veri: WidgetVerisi | null }) {
  if (!veri) {
    return (
      <FlexWidget
        clickAction="OPEN_APP"
        style={{ height: 'match_parent', width: 'match_parent', backgroundColor: GECE, borderRadius: 20, padding: 16, justifyContent: 'center' }}
      >
        <TextWidget text={t('widget.kurulum')} style={{ color: BEYAZ, fontSize: 14 }} />
      </FlexWidget>
    );
  }
  const s = veri.siradaki;
  const siradakiMetni = t(s.yarin ? 'widget.yarin' : 'widget.siradaki', { vakit: AD[s.anahtar], saat: s.saat });
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: GECE,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', width: 'match_parent', alignItems: 'center' }}>
        <TextWidget text={veri.konum} maxLines={1} truncate="END" style={{ color: SOLUK, fontSize: 12 }} />
        <TextWidget text={siradakiMetni} maxLines={1} style={{ color: ALTIN, fontSize: 13, fontWeight: 'bold' }} />
      </FlexWidget>
      <FlexWidget style={{ flexDirection: 'row', width: 'match_parent', justifyContent: 'space-between' }}>
        {veri.satirlar.map((r) => (
          <FlexWidget
            key={r.anahtar}
            style={{
              flex: 1,
              marginHorizontal: 2,
              paddingVertical: 6,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: r.siradaki ? ALTIN : SATIR,
            }}
          >
            <TextWidget text={AD[r.anahtar]} maxLines={1} style={{ color: r.siradaki ? GECE : SOLUK, fontSize: 11 }} />
            <TextWidget
              text={r.saat}
              maxLines={1}
              style={{ color: r.siradaki ? GECE : BEYAZ, fontSize: 15, fontWeight: 'bold' }}
            />
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
}
