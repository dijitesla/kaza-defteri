// Uygulamanın kullandığı depolama örneği (AsyncStorage'a bağlı).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { depolamaOlustur } from './logic/depolama';

export const depolama = depolamaOlustur(AsyncStorage);
