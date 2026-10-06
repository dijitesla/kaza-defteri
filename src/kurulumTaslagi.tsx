import { createContext, useContext } from 'react';
import type { KurulumTaslagi } from './logic/kurulum';
import { bosTaslak } from './logic/kurulum';

// Kurulum adımları arasında taşınan, henüz kaydedilmemiş seçimler.
export const TaslakBaglami = createContext<{
  taslak: KurulumTaslagi;
  guncelle: (degisiklik: Partial<KurulumTaslagi>) => void;
}>({ taslak: bosTaslak(), guncelle: () => {} });

export const useTaslak = () => useContext(TaslakBaglami);
