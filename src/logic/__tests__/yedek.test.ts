import { varsayilanAyarlar, varsayilanKaza } from '../depolama';
import { yedekDogrula, yedekDosyaAdi, yedekOlustur, type YedekVerisi } from '../yedek';

const SIMDI = new Date(2026, 9, 6, 15, 30);

function veri(): YedekVerisi {
  const ayarlar = { ...varsayilanAyarlar(), kurulumTamam: true, konum: { ad: 'Ankara', enlem: 39.92, boylam: 32.85 } };
  const kaza = varsayilanKaza();
  kaza.ilkBorc.sabah = 852;
  kaza.kalan.sabah = 800;
  return {
    ayarlar,
    kaza,
    gunluk: { '2026-10-05': { yatsi: 'kilinamadi' } },
    islemler: [{ id: 'a', zaman: SIMDI.toISOString(), tur: 'kaza_kilindi', vakit: 'sabah', degisim: { sabah: -1 } }],
  };
}

describe('yedek', () => {
  it('dosya adı', () => {
    expect(yedekDosyaAdi(SIMDI)).toBe('kaza-defteri-yedek-2026-10-06.json');
  });

  it('oluştur → JSON → doğrula aynı veriyi verir', () => {
    const y = yedekOlustur(veri(), SIMDI);
    expect(y.surum).toBe(1);
    const sonuc = yedekDogrula(JSON.stringify(y));
    expect(sonuc).not.toBeNull();
    expect(sonuc!.veri).toEqual(veri());
    expect(sonuc!.tarih).toBe(SIMDI.toISOString());
  });

  it('eksik ayar alanları varsayılanla tamamlanır', () => {
    const y = yedekOlustur(veri(), SIMDI) as unknown as Record<string, any>;
    delete y.ayarlar.dakikaDuzeltme;
    expect(yedekDogrula(JSON.stringify(y))!.veri.ayarlar.dakikaDuzeltme.sabah).toBe(0);
  });

  const boz = (f: (y: Record<string, any>) => void) => {
    const y = JSON.parse(JSON.stringify(yedekOlustur(veri(), SIMDI)));
    f(y);
    return yedekDogrula(JSON.stringify(y));
  };

  it.each([
    ['JSON değil', null],
    ['sürüm yanlış', (y: any) => (y.surum = 2)],
    ['kaza eksik', (y: any) => delete y.kaza],
    ['kalan eksi', (y: any) => (y.kaza.kalan.sabah = -1)],
    ['kalan metin', (y: any) => (y.kaza.kalan.ogle = '5')],
    ['vitir yok', (y: any) => delete y.kaza.ilkBorc.vitir],
    ['konum yok', (y: any) => delete y.ayarlar.konum],
    ['günlük durum geçersiz', (y: any) => (y.gunluk['2026-10-05'].yatsi = 'belki')],
    ['günlük anahtar geçersiz', (y: any) => (y.gunluk.dun = {})],
    ['işlem türü geçersiz', (y: any) => (y.islemler[0].tur = 'sil')],
    ['işlemler dizi değil', (y: any) => (y.islemler = {})],
  ])('geçersiz: %s', (_ad, f) => {
    expect(f ? boz(f as (y: any) => void) : yedekDogrula('{bozuk')).toBeNull();
  });
});
