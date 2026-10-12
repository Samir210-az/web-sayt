import { H, W, lin, rad, wrap } from './helpers.mjs'

const INK = '#14171a'
const ROAD = '#23272c'
const SAND = '#f1ead9'
const SKY = '#fbf4e2'
const AMBER = '#f0b400'
const TEAL = '#1f6f6b'

const dashes = Array.from({ length: 11 }, (_, i) => `<rect x="${40 + i * 150}" y="914" width="84" height="12" rx="6" fill="${AMBER}"/>`).join('')

const wheel = (cx) => `<g transform="translate(${cx} 205)">
  <circle r="74" fill="#0d0f11"/>
  <circle r="58" fill="url(#tyre)"/>
  <circle r="36" fill="url(#rim)"/>
  <circle r="30" fill="#2a2f35"/>
  ${[0, 72, 144, 216, 288].map((a) => `<rect x="-4" y="-28" width="8" height="22" rx="4" fill="#cfd4d9" transform="rotate(${a})"/>`).join('')}
  <circle r="8" fill="#cfd4d9"/>
</g>`

export const scene = () =>
  wrap(
    lin('sky', [[0, SKY], [1, '#f2dfb4']], 0, 0, 0, 1) +
      rad('sun', [[0, '#fff', 0.9], [1, '#fff', 0]]) +
      lin('hillA', [[0, '#c9b78c'], [1, '#b39f70']], 0, 0, 0, 1) +
      lin('hillB', [[0, '#9fb59a'], [1, '#6f8f84']], 0, 0, 0, 1) +
      lin('body', [[0, '#2a8d86'], [0.55, TEAL], [1, '#164f4c']], 0, 0, 0, 1) +
      lin('glass', [[0, '#cfe9ee'], [1, '#7fb0bb']], 0, 0, 1, 1) +
      lin('tyre', [[0, '#3a3f45'], [1, '#14171a']], 0, 0, 0, 1) +
      lin('rim', [[0, '#eef1f4'], [1, '#98a0a8']], 0, 0, 1, 1) +
      lin('asphalt', [[0, '#2c3137'], [1, ROAD]], 0, 0, 0, 1) +
      lin('metal', [[0, '#f5f6f7'], [0.5, '#b6bcc2'], [1, '#7b838b']], 0, 0, 1, 1),
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>
<circle cx="1220" cy="300" r="420" fill="url(#sun)"/>
<circle cx="1220" cy="300" r="150" fill="${AMBER}" opacity="0.92"/>
<path d="M0 760C180 640 330 600 520 650C700 698 820 560 1020 560C1240 560 1380 690 1600 640V840H0Z" fill="url(#hillA)"/>
<path d="M0 820C220 730 400 740 620 790C860 845 1080 700 1320 730C1440 745 1530 780 1600 770V860H0Z" fill="url(#hillB)"/>

<g stroke="${INK}" stroke-opacity="0.16" stroke-width="3" stroke-dasharray="2 16" stroke-linecap="round" fill="none">
  <path d="M250 330C420 160 760 140 980 340"/>
</g>

<g transform="translate(1000 340)">
  <path d="M0 0C-62 -92 -86 -128 -86 -170A86 86 0 1 1 86 -170C86 -128 62 -92 0 0Z" fill="${INK}"/>
  <circle cx="0" cy="-170" r="34" fill="${AMBER}"/>
  <ellipse cx="0" cy="16" rx="44" ry="10" fill="#000" opacity="0.2" filter="url(#soft)"/>
</g>

<g transform="translate(250 330) rotate(-14)">
  <ellipse cx="14" cy="120" rx="120" ry="16" fill="#000" opacity="0.18" filter="url(#soft)"/>
  <rect x="-40" y="-30" width="130" height="64" rx="22" fill="url(#metal)"/>
  <rect x="-24" y="-18" width="96" height="40" rx="14" fill="${INK}" opacity="0.85"/>
  <circle cx="-8" cy="2" r="9" fill="${AMBER}"/>
  <circle cx="34" cy="2" r="9" fill="#cfd4d9"/>
  <path d="M90 2H150" stroke="#8d949b" stroke-width="10" stroke-linecap="round"/>
  <circle cx="190" cy="2" r="42" fill="none" stroke="url(#metal)" stroke-width="14"/>
</g>

<rect x="0" y="800" width="${W}" height="${H - 800}" fill="url(#asphalt)"/>
<rect x="0" y="800" width="${W}" height="10" fill="#f1ead9" opacity="0.5"/>
${dashes}

<g transform="translate(430 735)">
  <ellipse cx="380" cy="266" rx="430" ry="26" fill="#000" opacity="0.4" filter="url(#soft)"/>
  <path d="M0 196V146Q0 122 26 116L132 98Q178 36 268 28H466Q558 32 610 96L700 112Q744 122 744 154V196Q744 206 732 206H12Q0 206 0 196Z" fill="url(#body)"/>
  <path d="M26 116L132 98Q178 36 268 28H466Q558 32 610 96" fill="none" stroke="#fff" stroke-opacity="0.28" stroke-width="5" stroke-linecap="round"/>
  <path d="M168 100L214 58Q226 46 248 46H330V100Z" fill="url(#glass)"/>
  <path d="M346 46H440Q474 52 500 100H346Z" fill="url(#glass)"/>
  <path d="M338 46V196" stroke="#0e3a38" stroke-width="4" opacity="0.55"/>
  <rect x="352" y="132" width="44" height="9" rx="4.5" fill="#d7efe9" opacity="0.8"/>
  <rect x="705" y="128" width="30" height="26" rx="10" fill="#fff3c4"/>
  <rect x="6" y="124" width="22" height="26" rx="8" fill="#e5483b"/>
  <rect x="0" y="176" width="744" height="14" fill="#0d2f2d" opacity="0.45"/>
  ${wheel(170)}${wheel(580)}
</g>

<g transform="translate(1262 868)">
  <rect x="0" y="0" width="300" height="86" rx="18" fill="${INK}"/>
  <rect x="8" y="8" width="284" height="70" rx="12" fill="none" stroke="${AMBER}" stroke-width="3"/>
  <path d="M48 44h44M92 44l-16-14M92 44l-16 14" stroke="${AMBER}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <rect x="116" y="30" width="148" height="10" rx="5" fill="${SAND}" opacity="0.9"/>
  <rect x="116" y="50" width="96" height="10" rx="5" fill="${SAND}" opacity="0.55"/>
</g>`,
    0.09,
  )
