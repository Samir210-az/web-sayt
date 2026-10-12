import { H, W, lin, rad, wrap } from './helpers.mjs'

const EMBER = '#e0561f'
const FLAME = '#ffb84d'
const CREAM = '#f1e8d8'
const WINE = '#7a1530'

const flame = (x, y, s, o = 1) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
  <path d="M0 0C-46 -52 -40 -118 -6 -176C-2 -128 22 -112 34 -80C48 -44 36 -14 0 0Z" fill="url(#flame)"/>
  <path d="M2 -6C-18 -32 -14 -66 2 -92C8 -64 22 -56 22 -34C22 -18 14 -8 2 -6Z" fill="#fff0b8" opacity="0.85"/>
</g>`

const chunk = (x, y, w, h, r, fill) => `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>
  <rect x="${x + 6}" y="${y + 5}" width="${w - 16}" height="${h * 0.28}" rx="${r / 2}" fill="#fff" opacity="0.14"/>
</g>`

const skewer = (y, items) => `<g>
  <rect x="400" y="${y - 4}" width="800" height="8" rx="4" fill="url(#metal)"/>
  <circle cx="1214" cy="${y}" r="13" fill="none" stroke="#b9bec4" stroke-width="5"/>
  ${items.map(([x, w, h, fill, r]) => chunk(x, y - h / 2, w, h, r, fill)).join('')}
</g>`

const tomato = (x, y, r) => `<g>
  <circle cx="${x}" cy="${y}" r="${r}" fill="#d63a2a"/>
  <circle cx="${x - r * 0.3}" cy="${y - r * 0.35}" r="${r * 0.28}" fill="#fff" opacity="0.28"/>
  <path d="M${x - r * 0.5} ${y - r * 0.85}l${r * 0.5} ${r * 0.3}l${r * 0.5} -${r * 0.3}" stroke="#3f7d3a" stroke-width="${r * 0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

const leaf = (x, y, rot) => `<path d="M0 0C20 -34 58 -34 74 0C58 34 20 34 0 0Z" fill="#4f8f45" transform="translate(${x} ${y}) rotate(${rot})"/>`

const planks = Array.from({ length: 6 }, (_, i) => `<rect x="0" y="${790 + i * 58}" width="${W}" height="3" fill="#1b110a" opacity="0.45"/>`).join('')

export const scene = () =>
  wrap(
    lin('wall', [[0, '#150f0c'], [1, '#2c1d15']], 0, 0, 0, 1) +
      lin('wood', [[0, '#7a5435'], [1, '#3b2618']], 0, 0, 0, 1) +
      rad('glow', [[0, EMBER, 0.55], [0.5, EMBER, 0.14], [1, EMBER, 0]], 0.5, 0.58, 0.5) +
      rad('lamplight', [[0, '#ffd88a', 0.7], [1, '#ffd88a', 0]]) +
      lin('flame', [[0, FLAME], [0.55, EMBER], [1, '#a82a10']], 0, 0, 0, 1) +
      lin('coal', [[0, '#ff8a3c'], [0.5, '#e0561f'], [1, '#6f1d0a']], 0, 0, 0, 1) +
      lin('metal', [[0, '#eef0f2'], [0.5, '#a9aeb4'], [1, '#6b7178']], 0, 0, 0, 1) +
      lin('iron', [[0, '#3b3532'], [1, '#161210']], 0, 0, 0, 1) +
      lin('wine', [[0, '#a3203f'], [1, '#5e0f26']], 0, 0, 0, 1) +
      lin('bottle', [[0, '#1f3a2c'], [0.45, '#2c5640'], [1, '#12241b']], 0, 0, 1, 0) +
      lin('plate', [[0, '#fffaf0'], [1, '#d9ccb6']], 0, 0, 0, 1) +
      lin('bread', [[0, '#e6b878'], [1, '#bd8444']], 0, 0, 0, 1) +
      lin('shade', [[0, '#3a2a1f'], [1, '#17100b']], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#wall)"/>
<rect x="0" y="0" width="${W}" height="770" fill="url(#glow)"/>
<rect x="0" y="770" width="${W}" height="${H - 770}" fill="url(#wood)"/>
${planks}
<rect x="0" y="766" width="${W}" height="8" fill="#0f0a07" opacity="0.7"/>

<rect x="798" y="0" width="4" height="170" fill="#0b0806"/>
<circle cx="800" cy="300" r="300" fill="url(#lamplight)"/>
<path d="M690 252C690 196 736 168 800 168C864 168 910 196 910 252Z" fill="url(#shade)"/>
<ellipse cx="800" cy="252" rx="110" ry="11" fill="#ffe3a4"/>

<g transform="translate(150 360)">
  <rect x="20" y="0" width="76" height="190" rx="22" fill="url(#bottle)"/>
  <rect x="40" y="-70" width="36" height="90" rx="10" fill="url(#bottle)"/>
  <rect x="44" y="-80" width="28" height="18" rx="5" fill="#0d1a13"/>
  <rect x="28" y="64" width="60" height="78" rx="6" fill="${CREAM}" opacity="0.92"/>
  <rect x="38" y="80" width="40" height="7" rx="3" fill="${WINE}"/>
  <rect x="38" y="96" width="28" height="6" rx="3" fill="${WINE}" opacity="0.6"/>
  <rect x="30" y="8" width="12" height="170" rx="6" fill="#fff" opacity="0.1"/>
  <rect x="20" y="190" width="76" height="410" rx="22" fill="url(#bottle)"/>
</g>

<g transform="translate(330 300)">
  <path d="M0 0H190C190 128 168 196 95 214C22 196 0 128 0 0Z" fill="#fff" opacity="0.1"/>
  <path d="M6 70H184C182 148 160 194 95 208C30 194 8 148 6 70Z" fill="url(#wine)"/>
  <path d="M6 70C50 82 140 58 184 70" stroke="#d96a86" stroke-width="3" fill="none" opacity="0.7"/>
  <path d="M0 0H190C190 128 168 196 95 214C22 196 0 128 0 0Z" fill="none" stroke="#f3e9dc" stroke-width="4" opacity="0.7"/>
  <path d="M26 18C24 80 36 140 62 176" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.4"/>
  <rect x="87" y="212" width="16" height="282" fill="#e9e1d6" opacity="0.85"/>
  <ellipse cx="95" cy="498" rx="104" ry="17" fill="#f3e9dc" opacity="0.88"/>
  <ellipse cx="95" cy="504" rx="130" ry="24" fill="#000" opacity="0.32" filter="url(#soft)"/>
</g>

<g transform="translate(0 0)">
  <ellipse cx="800" cy="884" rx="520" ry="34" fill="#000" opacity="0.45" filter="url(#soft)"/>
  <path d="M420 630H1180L1150 806H450Z" fill="url(#iron)"/>
  <rect x="408" y="620" width="784" height="26" rx="10" fill="#0e0b09"/>
  <rect x="446" y="796" width="26" height="86" rx="6" fill="#0e0b09"/>
  <rect x="1128" y="796" width="26" height="86" rx="6" fill="#0e0b09"/>
  ${Array.from({ length: 11 }, (_, i) => `<ellipse cx="${492 + i * 62}" cy="${648 + (i % 2) * 7}" rx="34" ry="17" fill="url(#coal)"/>`).join('')}
  ${Array.from({ length: 11 }, (_, i) => `<ellipse cx="${492 + i * 62}" cy="${647 + (i % 2) * 7}" rx="16" ry="7" fill="${FLAME}" opacity="0.55"/>`).join('')}
  ${flame(540, 640, 0.9, 0.95)}${flame(668, 642, 1.15)}${flame(800, 640, 1.3)}${flame(930, 642, 1.1)}${flame(1062, 640, 0.9, 0.95)}
  ${skewer(548, [[470, 92, 76, '#7a3a22', 22], [572, 66, 66, '#c8452e', 30], [648, 100, 78, '#8a4426', 24], [758, 60, 62, '#9bbf62', 28], [828, 100, 76, '#74351f', 22], [938, 68, 66, '#c8452e', 30], [1016, 96, 76, '#8a4426', 22]])}
  ${skewer(470, [[500, 96, 70, '#8a4426', 22], [606, 62, 60, '#e6c04a', 28], [678, 100, 72, '#74351f', 22], [788, 66, 62, '#c8452e', 30], [866, 98, 72, '#8a4426', 22], [974, 62, 60, '#9bbf62', 28]])}
</g>

<g transform="translate(1330 880)">
  <ellipse cx="0" cy="24" rx="260" ry="48" fill="#000" opacity="0.4" filter="url(#soft)"/>
  <ellipse cx="0" cy="0" rx="250" ry="62" fill="url(#plate)"/>
  <ellipse cx="0" cy="-4" rx="190" ry="40" fill="none" stroke="#c9b99f" stroke-width="3" opacity="0.8"/>
  <ellipse cx="-30" cy="-16" rx="124" ry="30" fill="url(#bread)"/>
  <ellipse cx="-30" cy="-22" rx="96" ry="18" fill="#f3d9a8" opacity="0.5"/>
  ${leaf(24, -44, -30)}${leaf(60, -40, 18)}${leaf(-6, -48, -70)}
  ${tomato(110, -26, 26)}${tomato(150, -4, 22)}${tomato(80, -2, 20)}
  ${chunk(-168, -34, 78, 40, 16, '#8a4426')}${chunk(-150, -8, 70, 34, 14, '#74351f')}
</g>
<circle cx="1260" cy="136" r="5" fill="#ffd88a" opacity="0.7"/><circle cx="1360" cy="90" r="3" fill="#ffd88a" opacity="0.5"/><circle cx="1150" cy="240" r="4" fill="#ffd88a" opacity="0.6"/>`,
    0.08,
  )
