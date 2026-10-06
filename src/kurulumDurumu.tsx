import { createContext, useContext } from 'react';
import type { Ayarlar, KazaDurumu } from './types';

interface KurulumDurumu {
  kurulumTamam: boolean;
  /** Kurulumun sonunda ayarları ve borcu kaydeder, uygulamayı sekmelere geçirir. */
  kurulumTamamla: (veri: { ayarlar: Ayarlar; kaza: KazaDurumu }) => Promise<void>;
}

export const KurulumBaglami = createContext<KurulumDurumu>({
  kurulumTamam: false,
  kurulumTamamla: async () => {},
});

export const useKurulum = () => useContext(KurulumBaglami);
