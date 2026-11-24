// Uygulama açıldığında ya da konum değiştiğinde widget'ı hemen yeniler (yalnızca Android).
import { Platform } from 'react-native';

export function widgetiYenile(): void {
  if (Platform.OS !== 'android') return;
  // Modül yalnızca Android'de yüklenir; web önizlemesinde ve iOS'ta yoktur.
  const { requestWidgetUpdate } = require('react-native-android-widget') as typeof import('react-native-android-widget');
  const { guncelWidget, WIDGET_ADI } = require('./gorev') as typeof import('./gorev');
  requestWidgetUpdate({ widgetName: WIDGET_ADI, renderWidget: () => guncelWidget() }).catch(() => {});
}
