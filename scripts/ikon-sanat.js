// 100x100 birimlik ikon çizimi: hilal + yıldız + açık defter
export function sanat(r = { a: '#D4A853', b: '#F0D9A4', defter: '#F6EBD0' }, tek = null) {
  const A = tek || r.a, B = tek || r.b, D = tek || r.defter;
  return `
  <defs>
    <mask id="hilal"><rect width="100" height="100" fill="#fff"/><circle cx="58.5" cy="31" r="20.5" fill="#000"/></mask>
    <linearGradient id="altin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${B}"/><stop offset="1" stop-color="${A}"/></linearGradient>
  </defs>
  <circle cx="50" cy="38" r="23" fill="${tek ? A : 'url(#altin)'}" mask="url(#hilal)"/>
  <path d="M63.5 30.5 l1.6 3.9 4.2 .3 -3.2 2.7 1 4.1 -3.6 -2.2 -3.6 2.2 1 -4.1 -3.2 -2.7 4.2 -.3z" fill="${B}"/>
  <path d="M50 67 C42 62 31 61 22 63 V80 C31 78 42 79 50 84 Z" fill="${D}"/>
  <path d="M50 67 C58 62 69 61 78 63 V80 C69 78 58 79 50 84 Z" fill="${D}" opacity="${tek ? 1 : 0.88}"/>
  <path d="M50 67 V84" stroke="${A}" stroke-width="1.6"/>
  <path d="M27 68.5 C33 67.5 39 68 45 70.5 M27 73.5 C33 72.5 39 73 45 75.5 M55 70.5 C61 68 67 67.5 73 68.5 M55 75.5 C61 73 67 72.5 73 73.5" stroke="${A}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.7"/>`;
}
