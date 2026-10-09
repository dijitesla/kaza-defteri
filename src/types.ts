// Veri modeli. Kaynak: docs/SPEC.md, Bölüm 3.

export type Vakit = 'sabah' | 'ogle' | 'ikindi' | 'aksam' | 'yatsi';
export type KazaVakit = Vakit | 'vitir';
export type Mezhep = 'hanefi' | 'safii';

export const VAKITLER: readonly Vakit[] = ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi'];
export const KAZA_VAKITLERI: readonly KazaVakit[] = [...VAKITLER, 'vitir'];

export interface Ayarlar {
  kurulumTamam: boolean;
  // Kurulumun bittiği an (ISO). Bundan önce çıkmış vakitler "cevapsız" sayılmaz.
  // SPEC'teki modele eklendi; eski kayıtlarda yoksa ilk açılışta yazılır.
  kurulumZamani?: string;
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
  // Günde kaç kaza kılınması hedefleniyor; 0 = hedef yok. Bitiş tarihi tahmini buna göre. (Sürüm 1.3)
  gunlukHedef: number;
}

export interface KazaDurumu {
  ilkBorc: Record<KazaVakit, number>; // kurulumda hesaplanan
  kalan: Record<KazaVakit, number>;
  // Kaza orucu (gün). Kullanıcı kendisi girer, uygulama hesaplamaz. (Sürüm 1.3)
  oruc: { ilkBorc: number; kalan: number };
}

// Günlük vakit durumu, anahtar 'YYYY-MM-DD'
// 'muaf': özel hal (kadınlar); borca eklenmez, seriyi bozmaz. (Sürüm 1.3)
export type VakitDurumu = 'kilindi' | 'kilinamadi' | 'cevapsiz' | 'muaf';
export type GunlukDurum = Record<string, Partial<Record<Vakit, VakitDurumu>>>;

export type IslemTuru =
  | 'kaza_kilindi'
  | 'kilinamadi'
  | 'manuel_duzeltme'
  | 'yeniden_hesap'
  | 'geri_alindi'
  | 'oruc_tutuldu'
  | 'oruc_duzeltme';

export interface Islem {
  id: string;
  zaman: string; // ISO
  tur: IslemTuru;
  vakit?: KazaVakit;
  // 'YYYY-MM-DD'. Günlük vakit durumunu da değiştiren işlemlerde (kılınamadı) dolu;
  // geri alırken o günün durumu da geri alınır. SPEC'teki modele eklendi.
  gun?: string;
  degisim: Partial<Record<KazaVakit, number>>; // kalan üzerindeki etki, ör. { sabah: -1 }
  geriAlinanId?: string;
  // Yalnızca oruç işlemleri: oruç kalanına ve (düzeltmede) oruç başlangıç borcuna etkisi.
  oruc?: number;
  orucIlk?: number;
  // Yalnızca 'yeniden_hesap': önceki başlangıç borcu ve kaza ayarları; geri alınınca bunlar da
  // eski haline döner. SPEC'teki modele eklendi.
  onceki?: { ilkBorc: Record<KazaVakit, number> } & KazaAyarlari;
}

export type KazaAyarlari = Pick<Ayarlar, 'mezhep' | 'ozelGun' | 'baslangic'>;
