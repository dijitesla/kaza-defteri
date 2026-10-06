// Depolama katmanı. AsyncStorage dışarıdan verilir, böylece testte bellek içi depo kullanılabilir.
import type { Ayarlar, GunlukDurum, Islem, KazaDurumu, KazaVakit } from '../types';

/** AsyncStorage'ın kullandığımız kısmı. */
export interface Depo {
  getItem(anahtar: string): Promise<string | null>;
  setItem(anahtar: string, deger: string): Promise<void>;
  removeItem(anahtar: string): Promise<void>;
}

export const ANAHTAR = {
  ayarlar: 'kd:ayarlar',
  kaza: 'kd:kaza',
  gunluk: 'kd:gunluk',
  islemler: 'kd:islemler',
} as const;

export const ISLEM_SINIRI = 2000;

const sifirKaza = (): Record<KazaVakit, number> => ({
  sabah: 0,
  ogle: 0,
  ikindi: 0,
  aksam: 0,
  yatsi: 0,
  vitir: 0,
});

export function varsayilanAyarlar(): Ayarlar {
  return {
    kurulumTamam: false,
    konum: { ad: '', enlem: 0, boylam: 0 },
    mezhep: 'hanefi',
    ozelGun: { acik: false, aydaGun: 7 },
    baslangic: { yukumlulukAy: '', duzenliAy: null },
    bildirim: {
      vakitler: { sabah: true, ogle: true, ikindi: true, aksam: true, yatsi: true },
      girisBildirimi: true,
      soruDakika: 30,
      yatsiSoruSaati: '23:00',
    },
    dakikaDuzeltme: { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0 },
  };
}

export function varsayilanKaza(): KazaDurumu {
  return { ilkBorc: sifirKaza(), kalan: sifirKaza() };
}

const nesneMi = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null && !Array.isArray(x);

/** Kayıtlı ayarları varsayılanlarla birleştirir; sonradan eklenen alanlar varsayılan değer alır. */
export function ayarlariTamamla(kayitli: unknown): Ayarlar {
  const v = varsayilanAyarlar();
  if (!nesneMi(kayitli)) return v;
  const k = kayitli as Partial<Ayarlar>;
  const bildirim = nesneMi(k.bildirim) ? k.bildirim : undefined;
  return {
    ...v,
    ...k,
    konum: { ...v.konum, ...(nesneMi(k.konum) ? k.konum : {}) },
    ozelGun: { ...v.ozelGun, ...(nesneMi(k.ozelGun) ? k.ozelGun : {}) },
    baslangic: { ...v.baslangic, ...(nesneMi(k.baslangic) ? k.baslangic : {}) },
    bildirim: {
      ...v.bildirim,
      ...(bildirim ?? {}),
      vakitler: {
        ...v.bildirim.vakitler,
        ...(nesneMi(bildirim?.vakitler) ? bildirim.vakitler : {}),
      },
    },
    dakikaDuzeltme: {
      ...v.dakikaDuzeltme,
      ...(nesneMi(k.dakikaDuzeltme) ? k.dakikaDuzeltme : {}),
    },
  };
}

export function kazayiTamamla(kayitli: unknown): KazaDurumu {
  const v = varsayilanKaza();
  if (!nesneMi(kayitli)) return v;
  const k = kayitli as Partial<KazaDurumu>;
  return {
    ilkBorc: { ...v.ilkBorc, ...(nesneMi(k.ilkBorc) ? k.ilkBorc : {}) },
    kalan: { ...v.kalan, ...(nesneMi(k.kalan) ? k.kalan : {}) },
  };
}

/** En yeni ISLEM_SINIRI kaydı tutar (liste eskiden yeniye sıralıdır). */
export function islemleriKirp(islemler: Islem[]): Islem[] {
  return islemler.length > ISLEM_SINIRI ? islemler.slice(-ISLEM_SINIRI) : islemler;
}

function jsonCoz(metin: string | null): unknown {
  if (metin == null) return undefined;
  try {
    return JSON.parse(metin);
  } catch {
    return undefined;
  }
}

export function depolamaOlustur(depo: Depo) {
  const oku = async (anahtar: string) => jsonCoz(await depo.getItem(anahtar));
  const yaz = (anahtar: string, deger: unknown) => depo.setItem(anahtar, JSON.stringify(deger));

  return {
    async ayarlariOku(): Promise<Ayarlar> {
      return ayarlariTamamla(await oku(ANAHTAR.ayarlar));
    },
    ayarlariYaz(ayarlar: Ayarlar): Promise<void> {
      return yaz(ANAHTAR.ayarlar, ayarlar);
    },

    async kazaOku(): Promise<KazaDurumu> {
      return kazayiTamamla(await oku(ANAHTAR.kaza));
    },
    kazaYaz(kaza: KazaDurumu): Promise<void> {
      return yaz(ANAHTAR.kaza, kaza);
    },

    async gunlukOku(): Promise<GunlukDurum> {
      const g = await oku(ANAHTAR.gunluk);
      return nesneMi(g) ? (g as GunlukDurum) : {};
    },
    gunlukYaz(gunluk: GunlukDurum): Promise<void> {
      return yaz(ANAHTAR.gunluk, gunluk);
    },

    /** Eskiden yeniye sıralı işlem listesi. */
    async islemleriOku(): Promise<Islem[]> {
      const l = await oku(ANAHTAR.islemler);
      return Array.isArray(l) ? (l as Islem[]) : [];
    },
    islemleriYaz(islemler: Islem[]): Promise<void> {
      return yaz(ANAHTAR.islemler, islemleriKirp(islemler));
    },

    async hepsiniSil(): Promise<void> {
      for (const a of Object.values(ANAHTAR)) await depo.removeItem(a);
    },
  };
}

export type Depolama = ReturnType<typeof depolamaOlustur>;
