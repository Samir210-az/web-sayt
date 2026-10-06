import { H, W, lin, rad, wrap } from './helpers.mjs'

const TOOTH =
  'M-140 -120C-140 -194 -70 -204 0 -172C70 -204 140 -194 140 -120C140 -40 110 20 100 100C92 162 80 192 52 192C24 192 22 122 0 122C-22 122 -24 192 -52 192C-80 192 -92 162 -100 100C-110 20 -140 -40 -140 -120Z'

const sparkle = (x, y, s, c = '#fff') =>
  `<path d="M${x} ${y - s}C${x + s * 0.12} ${y - s * 0.12} ${x + s * 0.12} ${y - s * 0.12} ${x + s} ${y}C${x + s * 0.12} ${y + s * 0.12} ${x + s * 0.12} ${y + s * 0.12} ${x} ${y + s}C${x - s * 0.12} ${y + s * 0.12} ${x - s * 0.12} ${y + s * 0.12} ${x - s} ${y}C${x - s * 0.12} ${y - s * 0.12} ${x - s * 0.12} ${y - s * 0.12} ${x} ${y - s}Z" fill="${c}"/>`

const drop = (x, y, s, c) =>
  `<path d="M${x} ${y - s}C${x + s * 0.2} ${y - s * 0.5} ${x + s * 0.7} ${y - s * 0.1} ${x + s * 0.7} ${y + s * 0.35}A${s * 0.7} ${s * 0.7} 0 0 1 ${x - s * 0.7} ${y + s * 0.35}C${x - s * 0.7} ${y - s * 0.1} ${x - s * 0.2} ${y - s * 0.5} ${x} ${y - s}Z" fill="${c}"/>`

const bristles = Array.from({ length: 3 }, (_, r) =>
  Array.from({ length: 6 }, (_, c) => `<rect x="${-42 + c * 15}" y="${-232 + r * 44}" width="11" height="34" rx="5.5" fill="${(r + c) % 2 ? '#ffffff' : '#9fe0d6'}"/>`).join(''),
).join('')

export const scene = () =>
  wrap(
    lin('bg', [[0, '#eaf9f5'], [1, '#bde6dd']], 0, 0, 0.6, 1) +
      rad('halo', [[0, '#fff', 0.95], [1, '#fff', 0]]) +
      lin('tooth', [[0, '#ffffff'], [1, '#dcefeb']], 0, 0, 0.4, 1) +
      lin('brush', [[0, '#17a79c'], [1, '#0b3a40']], 0, 0, 1, 1),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="800" cy="540" r="560" fill="url(#halo)"/>
<g fill="#fff" opacity="0.55"><circle cx="190" cy="210" r="150"/><circle cx="1420" cy="190" r="120"/><circle cx="1470" cy="830" r="210"/><circle cx="110" cy="880" r="120"/><circle cx="640" cy="1010" r="70"/></g>
<g fill="#0f8f86" opacity="0.12"><circle cx="330" cy="520" r="90"/><circle cx="1250" cy="540" r="60"/><circle cx="900" cy="150" r="50"/><circle cx="1330" cy="980" r="70"/></g>
<g transform="translate(800 520) scale(1.55)">
  <path d="${TOOTH}" fill="#0b3a40" opacity="0.14" transform="translate(16 26)" filter="url(#soft)"/>
  <path d="${TOOTH}" fill="url(#tooth)"/>
  <path d="${TOOTH}" fill="none" stroke="#0f8f86" stroke-width="5" opacity="0.4"/>
  <path d="M-108 -124C-108 -158 -80 -168 -52 -156" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
  <circle cx="-52" cy="-36" r="11" fill="#0b3a40"/><circle cx="52" cy="-36" r="11" fill="#0b3a40"/>
  <circle cx="-86" cy="-6" r="17" fill="#f6b8b0" opacity="0.75"/><circle cx="86" cy="-6" r="17" fill="#f6b8b0" opacity="0.75"/>
  <path d="M-46 -2Q0 46 46 -2" fill="none" stroke="#0b3a40" stroke-width="10" stroke-linecap="round"/>
</g>
<g transform="translate(330 640) rotate(-28)">
  <ellipse cx="14" cy="300" rx="70" ry="480" fill="#0b3a40" opacity="0.1" filter="url(#soft)"/>
  <rect x="-35" y="-120" width="70" height="560" rx="35" fill="url(#brush)"/>
  <rect x="-22" y="-100" width="12" height="440" rx="6" fill="#fff" opacity="0.4"/>
  <rect x="-58" y="-270" width="116" height="190" rx="26" fill="#0b3a40"/>
  <g>${bristles}</g>
  <path d="M-30 -276C-30 -330 30 -330 30 -276C30 -262 20 -258 0 -258C-20 -258 -30 -262 -30 -276Z" fill="#fff"/>
</g>
<g transform="translate(1240 730) rotate(14) scale(0.72)">
  <path d="${TOOTH}" fill="#0b3a40" opacity="0.14" transform="translate(14 22)" filter="url(#soft)"/>
  <path d="${TOOTH}" fill="url(#tooth)"/>
  <path d="${TOOTH}" fill="none" stroke="#0f8f86" stroke-width="6" opacity="0.4"/>
  <path d="M-108 -124C-108 -158 -80 -168 -52 -156" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
</g>
${sparkle(1130, 280, 46)}${sparkle(1440, 560, 34, '#0f8f86')}${sparkle(470, 250, 38, '#0f8f86')}${sparkle(1000, 930, 28)}
${drop(1340, 340, 54, '#0f8f86')}${drop(560, 930, 34, '#fff')}`,
    0.05,
  )
