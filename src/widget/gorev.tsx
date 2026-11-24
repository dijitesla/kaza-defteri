// Widget olayları (eklendi, periyodik güncelleme, boyut değişti). Uygulama kapalıyken arka planda çalışır.
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { depolama } from '../depolama';
import { widgetVerisi } from '../logic/widget';
import { VakitWidget } from './VakitWidget';

export const WIDGET_ADI = 'Vakitler';

export async function guncelWidget() {
  const ayarlar = await depolama.ayarlariOku();
  return <VakitWidget veri={ayarlar.kurulumTamam ? widgetVerisi(ayarlar, new Date()) : null} />;
}

export async function widgetGorevi(p: WidgetTaskHandlerProps): Promise<void> {
  if (p.widgetInfo.widgetName !== WIDGET_ADI) return;
  switch (p.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      p.renderWidget(await guncelWidget());
      break;
    default:
      break;
  }
}
