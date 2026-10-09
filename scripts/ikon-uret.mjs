// İkon PNG'lerini üretir: node scripts/ikon-uret.mjs (playwright-core gerekir; çıktılar assets/ klasörüne kopyalanır).
import { chromium } from 'playwright-core';
import { sanat } from './ikon-sanat.js';
const LACI = '#1C2541';
const isler = [
  // [dosya, boyut, arka plan, ölçek (sanatın kapladığı oran), tek renk]
  ['icon.png', 1024, LACI, 0.78, null],
  ['android-icon-foreground.png', 512, null, 0.56, null],
  ['android-icon-background.png', 512, LACI, 0, null],
  ['android-icon-monochrome.png', 432, null, 0.56, '#FFFFFF'],
  ['splash-icon.png', 1024, null, 0.9, null],
  ['favicon.png', 48, LACI, 0.86, null],
];
const t = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await t.newPage();
for (const [ad, n, zemin, olcek, tek] of isler) {
  const kay = (100 - 100 * olcek) / 2;
  const ic = olcek ? `<g transform="translate(${kay} ${kay}) scale(${olcek})">${sanat(undefined, tek)}</g>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}" viewBox="0 0 100 100">${zemin ? `<rect width="100" height="100" fill="${zemin}"/>` : ''}${ic}</svg>`;
  await p.setViewportSize({ width: n, height: n });
  await p.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await p.screenshot({ path: ad, omitBackground: true, clip: { x: 0, y: 0, width: n, height: n } });
  console.log('yazıldı', ad);
}
await t.close();
