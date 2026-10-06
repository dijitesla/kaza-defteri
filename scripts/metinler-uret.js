// docs/METINLER.md tablolarından src/metinler.ts dosyasını üretir.
// Çalıştır: npm run metinler
const fs = require('fs');
const path = require('path');

const kok = path.join(__dirname, '..');
const md = fs.readFileSync(path.join(kok, 'docs/METINLER.md'), 'utf8');

const metinler = {};
for (const satir of md.split('\n')) {
  const m = satir.match(/^\|\s*([a-zA-Z]+\.[a-zA-Z]+)\s*\|\s*(.+?)\s*\|\s*$/);
  if (m) metinler[m[1]] = m[2];
}

// "Vakit adları: Sabah, Öğle, ..." satırı; sıra src/types.ts içindeki KAZA_VAKITLERI ile aynı.
const vakitSatiri = md.match(/Vakit adları:\s*(.+?)\.\s*$/m);
if (!vakitSatiri) throw new Error('METINLER.md içinde "Vakit adları" satırı bulunamadı');
const vakitAdlari = vakitSatiri[1].split(',').map((s) => s.trim());
const vakitAnahtarlari = ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi', 'vitir'];
if (vakitAdlari.length !== vakitAnahtarlari.length) throw new Error('Vakit adı sayısı 6 değil');
const vakitGovde = vakitAnahtarlari
  .map((k, i) => `  ${k}: ${JSON.stringify(vakitAdlari[i])},`)
  .join('\n');

const govde = Object.entries(metinler)
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  .join('\n');

const cikti = `// Bu dosya otomatik üretilir. Elle düzenleme; docs/METINLER.md dosyasını değiştirip \`npm run metinler\` çalıştır.
import type { KazaVakit } from './types';

export const METINLER = {
${govde}
} as const;

export const VAKIT_ADLARI: Record<KazaVakit, string> = {
${vakitGovde}
};

export type MetinAnahtari = keyof typeof METINLER;

/** Metni getirir, {alan} değişkenlerini doldurur. */
export function t(anahtar: MetinAnahtari, degiskenler?: Record<string, string | number>): string {
  const metin: string = METINLER[anahtar];
  if (!degiskenler) return metin;
  return metin.replace(/\\{(\\w+)\\}/g, (tum, ad: string) =>
    ad in degiskenler ? String(degiskenler[ad]) : tum,
  );
}
`;

fs.writeFileSync(path.join(kok, 'src/metinler.ts'), cikti);
console.log(`${Object.keys(metinler).length} metin yazıldı: src/metinler.ts`);
