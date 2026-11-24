// Giriş noktası: Expo Router ve Android ana ekran widget'ının arka plan görevi.
import 'expo-router/entry';
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  const { registerWidgetTaskHandler } = require('react-native-android-widget') as typeof import('react-native-android-widget');
  const { widgetGorevi } = require('./src/widget/gorev') as typeof import('./src/widget/gorev');
  registerWidgetTaskHandler(widgetGorevi);
}
