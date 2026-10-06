import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

/** Her dakika başında ve uygulama öne geldiğinde güncellenen "şimdi". */
export function useSimdi(): Date {
  const [simdi, setSimdi] = useState(() => new Date());

  useEffect(() => {
    let zamanlayici: ReturnType<typeof setTimeout>;
    const planla = () => {
      const d = new Date();
      const bekle = 60_000 - (d.getSeconds() * 1000 + d.getMilliseconds()) + 50;
      zamanlayici = setTimeout(() => {
        setSimdi(new Date());
        planla();
      }, bekle);
    };
    planla();
    const abonelik = AppState.addEventListener('change', (durum) => {
      if (durum === 'active') {
        clearTimeout(zamanlayici);
        setSimdi(new Date());
        planla();
      }
    });
    return () => {
      clearTimeout(zamanlayici);
      abonelik.remove();
    };
  }, []);

  return simdi;
}
