import {
  ANAHTAR,
  Depo,
  ISLEM_SINIRI,
  ayarlariTamamla,
  depolamaOlustur,
  islemleriKirp,
  varsayilanAyarlar,
  varsayilanKaza,
} from '../depolama';
import type { Islem } from '../../types';

function bellekDepo(): Depo & { veri: Map<string, string> } {
  const veri = new Map<string, string>();
  return {
    veri,
    async getItem(a) {
      return veri.get(a) ?? null;
    },
    async setItem(a, d) {
      veri.set(a, d);
    },
    async removeItem(a) {
      veri.delete(a);
    },
  };
}

const islem = (n: number): Islem => ({
  id: String(n),
  zaman: new Date(2024, 0, 1, 0, n).toISOString(),
  tur: 'kaza_kilindi',
  vakit: 'sabah',
  degisim: { sabah: -1 },
});

describe('varsayılanlar', () => {
  it('SPEC değerlerini taşır', () => {
    const a = varsayilanAyarlar();
    expect(a.kurulumTamam).toBe(false);
    expect(a.mezhep).toBe('hanefi');
    expect(a.ozelGun).toEqual({ acik: false, aydaGun: 7 });
    expect(a.bildirim.soruDakika).toBe(30);
    expect(a.bildirim.yatsiSoruSaati).toBe('23:00');
    expect(Object.values(a.bildirim.vakitler).every(Boolean)).toBe(true);
    expect(Object.values(a.dakikaDuzeltme).every((d) => d === 0)).toBe(true);
  });

  it('her çağrıda yeni nesne döner', () => {
    const a = varsayilanAyarlar();
    a.bildirim.vakitler.sabah = false;
    expect(varsayilanAyarlar().bildirim.vakitler.sabah).toBe(true);
  });
});

describe('ayarlariTamamla', () => {
  it('eksik iç içe alanları varsayılanla doldurur', () => {
    const a = ayarlariTamamla({ mezhep: 'safii', bildirim: { vakitler: { sabah: false } } });
    expect(a.mezhep).toBe('safii');
    expect(a.bildirim.vakitler).toEqual({
      sabah: false,
      ogle: true,
      ikindi: true,
      aksam: true,
      yatsi: true,
    });
    expect(a.bildirim.soruDakika).toBe(30);
  });

  it('geçersiz girdide varsayılanı döner', () => {
    expect(ayarlariTamamla(null)).toEqual(varsayilanAyarlar());
    expect(ayarlariTamamla([1, 2])).toEqual(varsayilanAyarlar());
  });
});

describe('islemleriKirp', () => {
  it('sınırın altındaysa dokunmaz', () => {
    const l = [islem(1), islem(2)];
    expect(islemleriKirp(l)).toBe(l);
  });

  it('en eskileri siler, en yeni ISLEM_SINIRI kaydı tutar', () => {
    const l = Array.from({ length: ISLEM_SINIRI + 5 }, (_, i) => islem(i));
    const k = islemleriKirp(l);
    expect(k).toHaveLength(ISLEM_SINIRI);
    expect(k[0].id).toBe('5');
    expect(k[k.length - 1].id).toBe(String(ISLEM_SINIRI + 4));
  });
});

describe('depolamaOlustur', () => {
  it('boş depoda varsayılanları okur', async () => {
    const d = depolamaOlustur(bellekDepo());
    expect(await d.ayarlariOku()).toEqual(varsayilanAyarlar());
    expect(await d.kazaOku()).toEqual(varsayilanKaza());
    expect(await d.gunlukOku()).toEqual({});
    expect(await d.islemleriOku()).toEqual([]);
  });

  it('yazılanı geri okur', async () => {
    const d = depolamaOlustur(bellekDepo());
    const a = { ...varsayilanAyarlar(), kurulumTamam: true };
    const kaza = varsayilanKaza();
    kaza.kalan.sabah = 852;
    await d.ayarlariYaz(a);
    await d.kazaYaz(kaza);
    await d.gunlukYaz({ '2024-01-01': { sabah: 'kilindi' } });
    await d.islemleriYaz([islem(1)]);
    expect(await d.ayarlariOku()).toEqual(a);
    expect(await d.kazaOku()).toEqual(kaza);
    expect(await d.gunlukOku()).toEqual({ '2024-01-01': { sabah: 'kilindi' } });
    expect(await d.islemleriOku()).toEqual([islem(1)]);
  });

  it('bozuk JSON varsa çökmez, varsayılanı döner', async () => {
    const depo = bellekDepo();
    depo.veri.set(ANAHTAR.ayarlar, '{bozuk');
    depo.veri.set(ANAHTAR.islemler, '"liste değil"');
    const d = depolamaOlustur(depo);
    expect(await d.ayarlariOku()).toEqual(varsayilanAyarlar());
    expect(await d.islemleriOku()).toEqual([]);
  });

  it('yazarken işlem sınırını uygular', async () => {
    const depo = bellekDepo();
    const d = depolamaOlustur(depo);
    await d.islemleriYaz(Array.from({ length: ISLEM_SINIRI + 1 }, (_, i) => islem(i)));
    expect(await d.islemleriOku()).toHaveLength(ISLEM_SINIRI);
  });

  it('hepsiniSil tüm anahtarları kaldırır', async () => {
    const depo = bellekDepo();
    const d = depolamaOlustur(depo);
    await d.ayarlariYaz(varsayilanAyarlar());
    await d.kazaYaz(varsayilanKaza());
    await d.hepsiniSil();
    expect(depo.veri.size).toBe(0);
  });
});
