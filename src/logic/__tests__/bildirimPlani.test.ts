import { varsayilanAyarlar } from '../depolama';
import { bildirimCevabi, bildirimPlani, bildirimVerisiOku, PLAN_GUN_SAYISI, soruZamani } from '../bildirimPlani';
import { gunOglesi, saatMetni } from '../tarih';
import type { Vakit } from '../../types';
import type { VakitAraligi } from '../vakitler';

// Sahte vakitler: sabah 05:00-06:30, öğle 13-16, ikindi 16-19, akşam 19-20:30, yatsı 20:30-ertesi 05:00.
function araliklar(gun: string): Record<Vakit, VakitAraligi> {
  const s = (saat: number, dk = 0) => {
    const d = gunOglesi(gun);
    d.setHours(saat, dk, 0, 0);
    return d;
  };
  return {
    sabah: { giris: s(5), cikis: s(6, 30) },
    ogle: { giris: s(13), cikis: s(16) },
    ikindi: { giris: s(16), cikis: s(19) },
    aksam: { giris: s(19), cikis: s(20, 30) },
    yatsi: { giris: s(20, 30), cikis: s(29) },
  };
}

const ayarlar = () => {
  const a = varsayilanAyarlar();
  a.konum = { ad: 'Ankara', enlem: 39.92, boylam: 32.85 };
  return a;
};
const BUGUN = '2026-10-06';
const SIMDI = new Date(2026, 9, 6, 14, 0);
const plan = (o: Partial<Parameters<typeof bildirimPlani>[0]> = {}) =>
  bildirimPlani({ ayarlar: ayarlar(), gunluk: {}, bugun: BUGUN, simdi: SIMDI, araliklar, ...o });

describe('soruZamani', () => {
  const b = ayarlar().bildirim; // 30 dk, yatsı 23:00
  const a = araliklar(BUGUN);

  it('vakit çıkışından soruDakika önce', () => {
    expect(saatMetni(soruZamani('ogle', BUGUN, a.ogle, b))).toBe('15:30');
  });

  it('sabah: süre vaktin yarısından uzunsa vaktin ortası', () => {
    expect(saatMetni(soruZamani('sabah', BUGUN, a.sabah, b))).toBe('06:00'); // 30 dk ≤ 45 dk
    expect(saatMetni(soruZamani('sabah', BUGUN, a.sabah, { ...b, soruDakika: 60 }))).toBe('05:45'); // orta
  });

  it('yatsı: sabit saat', () => {
    const z = soruZamani('yatsi', BUGUN, a.yatsi, b);
    expect(z).toEqual(new Date(2026, 9, 6, 23, 0));
  });

  it('yatsı: girişten önceki saat gece yarısından sonra sayılır', () => {
    const z = soruZamani('yatsi', BUGUN, a.yatsi, { ...b, yatsiSoruSaati: '00:30' });
    expect(z).toEqual(new Date(2026, 9, 7, 0, 30));
  });

  it('yatsı: saat vakit çıktıktan sonraya düşerse çıkıştan soruDakika önce', () => {
    const z = soruZamani('yatsi', BUGUN, a.yatsi, { ...b, yatsiSoruSaati: '06:00' });
    expect(z).toEqual(new Date(2026, 9, 7, 4, 30));
  });
});

describe('bildirimPlani', () => {
  it('geçmiş zamanları atlar, sıralıdır, kimlik biçimi doğru', () => {
    const p = plan();
    expect(p[0].id).toBe('2026-10-06_ogle_soru'); // 15:30; öğle girişi 13:00 geçti
    expect(p.every((b) => b.zaman.getTime() > SIMDI.getTime())).toBe(true);
    const z = p.map((b) => b.zaman.getTime());
    expect([...z].sort((x, y) => x - y)).toEqual(z);
    expect(new Set(p.map((b) => b.id)).size).toBe(p.length);
  });

  it(`${PLAN_GUN_SAYISI} gün ileriye planlar ve 64 sınırını aşmaz`, () => {
    const p = plan();
    expect(p[p.length - 1].veri.gun).toBe('2026-10-11');
    expect(p.length).toBeLessThanOrEqual(64);
  });

  it('metinler', () => {
    const p = plan();
    const giris = p.find((b) => b.id === '2026-10-06_ikindi_giris')!;
    expect(giris).toMatchObject({
      kategori: 'GIRIS',
      baslik: 'İkindi vakti girdi',
      govde: 'Ankara için ikindi vakti 16:00.',
    });
    const soru = p.find((b) => b.id === '2026-10-06_ikindi_soru')!;
    expect(soru).toMatchObject({
      kategori: 'SORU',
      baslik: 'İkindi namazını kıldın mı?',
      govde: "İkindi vakti 19:00'te çıkıyor.",
    });
    expect(p.find((b) => b.id === '2026-10-06_yatsi_soru')!.govde).toBe(
      'Bugünün yatsı namazını işaretlemeyi unutma.',
    );
  });

  it('yalnızca son soru bildirimine "uygulamayı aç" uyarısı eklenir', () => {
    const p = plan();
    const uyarili = p.filter((b) => b.govde.includes('uygulamayı bir kez aç'));
    expect(uyarili).toHaveLength(1);
    expect(uyarili[0].id).toBe('2026-10-11_yatsi_soru');
  });

  it('kapalı vakit için bildirim yok', () => {
    const a = ayarlar();
    a.bildirim.vakitler.ikindi = false;
    expect(plan({ ayarlar: a }).some((b) => b.veri.vakit === 'ikindi')).toBe(false);
  });

  it('giriş bildirimi kapalıysa yalnızca soru gelir', () => {
    const a = ayarlar();
    a.bildirim.girisBildirimi = false;
    expect(plan({ ayarlar: a }).every((b) => b.kategori === 'SORU')).toBe(true);
  });

  it('cevaplanmış vaktin sorusu planlanmaz (SPEC 6.1.3)', () => {
    const p = plan({ gunluk: { '2026-10-06': { ogle: 'kilindi' } } });
    expect(p.some((b) => b.id === '2026-10-06_ogle_soru')).toBe(false);
    expect(p.some((b) => b.id === '2026-10-06_ikindi_soru')).toBe(true);
  });

  it('dünün yatsı sorusu gece yarısından sonra ise planlanır', () => {
    const a = ayarlar();
    a.bildirim.yatsiSoruSaati = '01:00';
    const p = plan({ ayarlar: a, simdi: new Date(2026, 9, 6, 0, 15) });
    expect(p[0].id).toBe('2026-10-05_yatsi_soru');
  });
});

describe('bildirimCevabi', () => {
  const veri = { gun: '2026-10-06', vakit: 'ogle', tur: 'soru' };

  it('Kıldım ve Kılamadım', () => {
    expect(bildirimCevabi({}, veri, 'KILDIM')).toEqual({ gun: '2026-10-06', vakit: 'ogle', cevap: 'kilindi' });
    expect(bildirimCevabi({}, veri, 'KILAMADIM')).toEqual({ gun: '2026-10-06', vakit: 'ogle', cevap: 'kilinamadi' });
  });

  it('Sonra ve bildirime dokunma kaydedilmez', () => {
    expect(bildirimCevabi({}, veri, 'SONRA')).toBeNull();
    expect(bildirimCevabi({}, veri, 'expo.modules.notifications.actions.DEFAULT')).toBeNull();
  });

  it('giriş bildiriminde yalnızca Kıldım var', () => {
    expect(bildirimCevabi({}, { ...veri, tur: 'giris' }, 'KILAMADIM')).toBeNull();
    expect(bildirimCevabi({}, { ...veri, tur: 'giris' }, 'KILDIM')).not.toBeNull();
  });

  it('zaten cevaplanmış vakit ikinci kez işlenmez', () => {
    expect(bildirimCevabi({ '2026-10-06': { ogle: 'kilinamadi' } }, veri, 'KILAMADIM')).toBeNull();
  });

  it('geçersiz veri', () => {
    expect(bildirimVerisiOku(null)).toBeNull();
    expect(bildirimVerisiOku({ gun: '2026-10-06', vakit: 'vitir', tur: 'soru' })).toBeNull();
    expect(bildirimVerisiOku({ gun: 'dün', vakit: 'ogle', tur: 'soru' })).toBeNull();
  });
});

describe('bildirimPlani: geçersiz zaman', () => {
  it('hesaplanamayan vakit (NaN) planlanmaz', () => {
    const bozuk = (gun: string) => ({ ...araliklar(gun), yatsi: { giris: new Date(NaN), cikis: new Date(NaN) } });
    const p = bildirimPlani({ ayarlar: ayarlar(), gunluk: {}, bugun: BUGUN, simdi: SIMDI, araliklar: bozuk });
    expect(p.some((b) => b.veri.vakit === 'yatsi')).toBe(false);
    expect(p.length).toBeGreaterThan(0);
  });
});
