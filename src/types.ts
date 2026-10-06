// Veri modeli. Kaynak: docs/SPEC.md, Bölüm 3.

export type Vakit = 'sabah' | 'ogle' | 'ikindi' | 'aksam' | 'yatsi';
export type KazaVakit = Vakit | 'vitir';
export type Mezhep = 'hanefi' | 'safii';

export const VAKITLER: readonly Vakit[] = ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi'];
export const KAZA_VAKITLERI: readonly KazaVakit[] = [...VAKITLER, 'vitir'];

export interface Ayarlar {
  kurulumTamam: boolean;
  konum: { ad: string; enlem: number; boylam: number };
  mezhep: Mezhep;
  ozelGun: { acik: boolean; aydaGun: number };
  baslangic: { yukumlulukAy: string; duzenliAy: string | null }; // 'YYYY-MM', null = henüz başlamadı
  bildirim: {
    vakitler: Record<Vakit, boolean>;
    girisBildirimi: boolean;
    soruDakika: 15 | 30 | 60;
    yatsiSoruSaati: string; // 'HH:mm'
  };
  dakikaDuzeltme: Record<Vakit, number>; // -10..+10
}

export interface KazaDurumu {
  ilkBorc: Record<KazaVakit, number>; // kurulumda hesaplanan
  kalan: Record<KazaVakit, number>;
}

// Günlük vakit durumu, anahtar 'YYYY-MM-DD'
export type VakitDurumu = 'kilindi' | 'kilinamadi' | 'cevapsiz';
export type GunlukDurum = Record<string, Partial<Record<Vakit, VakitDurumu>>>;

export type IslemTuru =
  | 'kaza_kilindi'
  | 'kilinamadi'
  | 'manuel_duzeltme'
  | 'yeniden_hesap'
  | 'geri_alindi';

export interface Islem {
  id: string;
  zaman: string; // ISO
  tur: IslemTuru;
  vakit?: KazaVakit;
  degisim: Partial<Record<KazaVakit, number>>; // kalan üzerindeki etki, ör. { sabah: -1 }
  geriAlinanId?: string;
}
