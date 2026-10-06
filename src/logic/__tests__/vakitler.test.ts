import { ILLER } from '../../data/iller';
import { saatMetni } from '../tarih';
import {
  gununVakitleri,
  kalanSureMetni,
  siradakiBaslik,
  siradakiVakit,
  vakitAraliklari,
} from '../vakitler';

const sifir = { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0 };
const il = (ad: string) => ILLER.find((i) => i.ad === ad)!;

const saatler = (ad: string, gun: string) => {
  const v = gununVakitleri(il(ad), gun, sifir);
  return [v.imsak, v.gunes, v.ogle, v.ikindi, v.aksam, v.yatsi].map(saatMetni);
};

/**
 * DİYANET TAKVİMİYLE KARŞILAŞTIRMA TABLOSU
 * Uygulamanın hesapladığı vakitler (il merkezi koordinatı, düzeltme 0, Türkiye saati).
 * Sıra: İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı.
 * https://namazvakitleri.diyanet.gov.tr adresindeki aynı günle karşılaştır;
 * birkaç dakikalık fark Ayarlar'daki vakit düzeltmesiyle giderilebilir.
 */
const BEKLENEN: Record<string, Record<string, string[]>> = {
  İstanbul: {
    '2025-01-15': ['06:50', '08:20', '13:19', '15:46', '18:08', '19:32'],
    '2025-03-20': ['05:35', '07:01', '13:17', '16:42', '19:23', '20:43'],
    '2025-06-21': ['03:24', '05:25', '13:11', '17:11', '20:47', '22:38'],
  },
  Ankara: {
    '2025-01-15': ['06:33', '08:01', '13:03', '15:33', '17:55', '19:18'],
    '2025-03-20': ['05:21', '06:45', '13:01', '16:26', '19:08', '20:26'],
    '2025-06-21': ['03:17', '05:13', '12:55', '16:53', '20:28', '22:15'],
  },
};

describe('gununVakitleri: Diyanet karşılaştırma tablosu', () => {
  for (const [ad, gunler] of Object.entries(BEKLENEN)) {
    for (const [gun, beklenen] of Object.entries(gunler)) {
      it(`${ad} ${gun}`, () => {
        expect(saatler(ad, gun)).toEqual(beklenen);
      });
    }
  }
});

describe('gununVakitleri', () => {
  it('vakitler sıralı', () => {
    const v = gununVakitleri(il('Erzurum'), '2025-12-21', sifir);
    const l = [v.imsak, v.gunes, v.ogle, v.ikindi, v.aksam, v.yatsi].map((d) => d.getTime());
    expect([...l].sort((a, b) => a - b)).toEqual(l);
  });

  it('dakika düzeltmesi vakte eklenir, güneşe eklenmez', () => {
    const d = { sabah: -3, ogle: 2, ikindi: 0, aksam: 10, yatsi: -10 };
    const a = gununVakitleri(il('Ankara'), '2025-03-20', sifir);
    const b = gununVakitleri(il('Ankara'), '2025-03-20', d);
    const fark = (x: Date, y: Date) => (y.getTime() - x.getTime()) / 60_000;
    expect(fark(a.imsak, b.imsak)).toBe(-3);
    expect(fark(a.ogle, b.ogle)).toBe(2);
    expect(fark(a.aksam, b.aksam)).toBe(10);
    expect(fark(a.yatsi, b.yatsi)).toBe(-10);
    expect(fark(a.gunes, b.gunes)).toBe(0);
  });
});

describe('vakitAraliklari', () => {
  it('çıkışlar SPEC 5 ile uyumlu', () => {
    const k = il('Ankara');
    const a = vakitAraliklari(k, '2025-03-20', sifir);
    const g = gununVakitleri(k, '2025-03-20', sifir);
    const yarin = gununVakitleri(k, '2025-03-21', sifir);
    expect(a.sabah).toEqual({ giris: g.imsak, cikis: g.gunes });
    expect(a.ogle).toEqual({ giris: g.ogle, cikis: g.ikindi });
    expect(a.ikindi).toEqual({ giris: g.ikindi, cikis: g.aksam });
    expect(a.aksam).toEqual({ giris: g.aksam, cikis: g.yatsi });
    expect(a.yatsi).toEqual({ giris: g.yatsi, cikis: yarin.imsak });
  });
});

describe('siradakiVakit', () => {
  const k = il('Ankara');
  it('gün içinde sıradaki vakit', () => {
    const s = siradakiVakit(k, '2025-03-20', new Date(2025, 2, 20, 14, 0), sifir);
    expect(s.vakit).toBe('ikindi');
    expect(s.gun).toBe('2025-03-20');
    expect(saatMetni(s.zaman)).toBe('16:26');
  });

  it('yatsıdan sonra yarının sabahı', () => {
    const s = siradakiVakit(k, '2025-03-20', new Date(2025, 2, 20, 23, 0), sifir);
    expect(s.vakit).toBe('sabah');
    expect(s.gun).toBe('2025-03-21');
  });

  it('gece yarısından sonra, imsaktan önce: bugünün sabahı', () => {
    const s = siradakiVakit(k, '2025-03-21', new Date(2025, 2, 21, 2, 0), sifir);
    expect(s).toMatchObject({ vakit: 'sabah', gun: '2025-03-21' });
  });
});

describe('kalanSureMetni', () => {
  it.each([
    [0, '0 dk'],
    [30_000, '1 dk'],
    [41 * 60_000, '41 dk'],
    [59 * 60_000 + 1, '1 sa 0 dk'],
    [72 * 60_000, '1 sa 12 dk'],
    [-5000, '0 dk'],
  ])('%p ms → %p', (ms, beklenen) => {
    expect(kalanSureMetni(ms)).toBe(beklenen);
  });

  it('başlık', () => {
    expect(siradakiBaslik('ikindi')).toBe('İkindi vaktine kalan');
  });
});
