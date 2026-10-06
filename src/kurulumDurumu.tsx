import { createContext, useContext } from 'react';

interface KurulumDurumu {
  kurulumTamam: boolean;
  kurulumTamamla: () => Promise<void>;
}

export const KurulumBaglami = createContext<KurulumDurumu>({
  kurulumTamam: false,
  kurulumTamamla: async () => {},
});

export const useKurulum = () => useContext(KurulumBaglami);
