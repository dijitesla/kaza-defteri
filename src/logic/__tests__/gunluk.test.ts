import type { Vakit } from '../../types';
import { cevapsizVakitler, vakitDurumu, yayDurumu } from '../gunluk';
import { gunOglesi } from '../tarih';
import type { VakitAraligi } from '../vakitler';

// Basit sahte vakitler: sabah 05-07, öğle 13-16, ikindi 16-19, akşam 19-20, yatsı 20-ertesi 05.
function araliklar(gun: string): Record<Vakit, VakitAraligi> {
  const s = (saat: number) => {
    const d = gunOglesi(gun);
    d.setHours(saat, 0, 0, 0);
    return d;
  };
  return {
    sabah: { giris: s(5), cikis: s(7) },
    ogle: { giris: s(13), cikis: s(16) },
    ikindi: { giris: s(16), cikis: s(19) },
    aksam: { giris: s(19), cikis: s(20) },
    yatsi: { giris: s(20), cikis: s(29) },
  };
}

const t = (gun: number, saat: number, dk = 0) => new Date(2026, 9, gun, saat, dk);

describe('vakitDurumu', () => {
  const a = araliklar('2026-10-06');
  it('çıkmamış ve kayıtsız: null', () => {
    expect(vakitDurumu({}, '2026-10-06', 'ogle', a.ogle.cikis, t(6, 14))).toBeNull();
  });
  it('çıkmış ve kayıtsız: cevapsız', () => {
    expect(vakitDurumu({}, '2026-10-06', 'ogle', a.ogle.cikis, t(6, 16))).toBe('cevapsiz');
  });
  it('kayıt varsa kayıt', () => {
    const g = { '2026-10-06': { ogle: 'kilindi' as const } };
    expect(vakitDurumu(g, '2026-10-06', 'ogle', a.ogle.cikis, t(6, 14))).toBe('kilindi');
  });
});

describe('yayDurumu', () => {
  const a = araliklar('2026-10-06');
  it('sıradaki, devam, gelecek', () => {
    expect(yayDurumu({}, '2026-10-06', 'ikindi', a.ikindi, t(6, 15), true)).toBe('siradaki');
    expect(yayDurumu({}, '2026-10-06', 'ogle', a.ogle, t(6, 15), false)).toBe('devam');
    expect(yayDurumu({}, '2026-10-06', 'aksam', a.aksam, t(6, 15), false)).toBe('gelecek');
    expect(yayDurumu({}, '2026-10-06', 'sabah', a.sabah, t(6, 15), false)).toBe('cevapsiz');
  });
  it('kılınamadı kaydı', () => {
    const g = { '2026-10-06': { sabah: 'kilinamadi' as const } };
    expect(yayDurumu(g, '2026-10-06', 'sabah', a.sabah, t(6, 15), false)).toBe('kilinamadi');
  });
});

describe('cevapsizVakitler', () => {
  it('son 3 gün, en eskiden yeniye; daha eskiler yok', () => {
    const l = cevapsizVakitler({}, '2026-10-06', t(6, 8), araliklar, null);
    expect(l[0]).toEqual({ gun: '2026-10-04', vakit: 'sabah' });
    expect(l).toHaveLength(5 + 5 + 1); // 4 ve 5 Ekim'in tümü + bugün sabah
    expect(l.some((c) => c.gun === '2026-10-03')).toBe(false);
  });

  it('dünün yatsısı ancak bugünün imsakından sonra cevapsız olur', () => {
    const once = cevapsizVakitler({}, '2026-10-06', t(6, 4), araliklar, t(5, 21));
    expect(once).toEqual([]);
    const sonra = cevapsizVakitler({}, '2026-10-06', t(6, 6), araliklar, t(5, 21));
    expect(sonra).toEqual([{ gun: '2026-10-05', vakit: 'yatsi' }]);
  });

  it('cevaplanmış vakitler çıkar', () => {
    const g = { '2026-10-05': { yatsi: 'kilindi' as const }, '2026-10-06': { sabah: 'kilinamadi' as const } };
    expect(cevapsizVakitler(g, '2026-10-06', t(6, 8), araliklar, t(5, 21))).toEqual([]);
  });

  it('kurulumdan önce çıkmış vakitler sayılmaz, kurulum sırasında devam eden sayılır', () => {
    const l = cevapsizVakitler({}, '2026-10-06', t(6, 17), araliklar, t(6, 15));
    expect(l).toEqual([{ gun: '2026-10-06', vakit: 'ogle' }]);
  });
});
