import { H, W, lin, rad, wrap } from './helpers.mjs'

const INK = '#15130f'
const RED = '#b3261e'
const NAVY = '#1d2b4f'
const CREAM = '#efe5d0'
const COPPER = '#b0743a'

const tooth = (i, x, y) => `<rect x="${x + 14 + i * 21}" y="${y + 60}" width="11" height="${i % 5 === 4 ? 70 : 58}" rx="5" fill="url(#shell)"/>`

export const scene = () =>
  wrap(
    lin('bg', [[0, '#f3ead7'], [1, '#e2d4b6']], 0, 0, 0, 1) +
      rad('vig', [[0.6, '#000', 0], [1, '#3a2a12', 0.28]], 0.5, 0.5, 0.75) +
      `<pattern id="stripes" width="88" height="88" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
        <rect width="88" height="88" fill="${CREAM}"/><rect width="26" height="88" fill="${RED}"/><rect x="44" width="26" height="88" fill="${NAVY}"/>
      </pattern>` +
      lin('steel', [[0, '#f6f3ec'], [0.5, '#b9b6ae'], [1, '#7c7a74']], 0, 0, 0, 1) +
      lin('copper', [[0, '#e0a56a'], [0.5, '#b0743a'], [1, '#6f4119']], 0, 0, 1, 0) +
      lin('glass', [[0, '#fff', 0.55], [0.25, '#fff', 0], [0.8, '#000', 0], [1, '#000', 0.35]], 0, 0, 1, 0) +
      lin('shell', [[0, '#4a3524'], [1, '#1c130c']], 0, 0, 0, 1) +
      `<clipPath id="tube"><rect x="0" y="0" width="150" height="640" rx="30"/></clipPath>`,
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="640" cy="560" r="430" fill="${NAVY}"/>
<circle cx="640" cy="560" r="396" fill="none" stroke="${CREAM}" stroke-width="3" stroke-dasharray="3 14" stroke-linecap="round" opacity="0.7"/>
<circle cx="640" cy="560" r="350" fill="none" stroke="${COPPER}" stroke-width="3" opacity="0.8"/>
<rect x="0" y="0" width="${W}" height="42" fill="url(#stripes)"/><rect x="0" y="${H - 42}" width="${W}" height="42" fill="url(#stripes)"/>
<rect x="0" y="42" width="${W}" height="5" fill="${INK}"/><rect x="0" y="${H - 47}" width="${W}" height="5" fill="${INK}"/>

<g transform="translate(1150 210)">
  <ellipse cx="75" cy="700" rx="130" ry="26" fill="#000" opacity="0.28" filter="url(#soft)"/>
  <rect x="-6" y="-22" width="162" height="40" rx="14" fill="url(#copper)"/>
  <circle cx="75" cy="-42" r="22" fill="url(#copper)"/>
  <g clip-path="url(#tube)"><rect width="150" height="640" fill="url(#stripes)"/><rect width="150" height="640" fill="url(#glass)"/></g>
  <rect x="-6" y="622" width="162" height="48" rx="14" fill="url(#copper)"/>
  <rect x="16" y="14" width="12" height="600" rx="6" fill="#fff" opacity="0.4"/>
</g>

<g transform="translate(560 540) rotate(-26)">
  <ellipse cx="60" cy="130" rx="400" ry="22" fill="#000" opacity="0.3" filter="url(#soft)"/>
  <path d="M-420 -26H-10V26H-400Q-424 26 -424 0Q-424 -26 -400 -26Z" fill="url(#shell)"/>
  <path d="M-400 -18H-20" stroke="#fff" stroke-opacity="0.18" stroke-width="5"/>
  <circle cx="-380" cy="0" r="9" fill="url(#copper)"/><circle cx="-60" cy="0" r="9" fill="url(#copper)"/>
  <path d="M-10 -34H318Q362 -34 362 4Q362 18 336 22L-10 38Z" fill="url(#steel)"/>
  <path d="M-10 -34H318Q354 -34 358 -8" fill="none" stroke="#5d5b56" stroke-width="5"/>
  <path d="M10 30L326 16" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <circle cx="-4" cy="2" r="16" fill="url(#copper)"/><circle cx="-4" cy="2" r="6" fill="${INK}"/>
</g>

<g transform="translate(860 840) rotate(7)">
  <rect x="10" y="22" width="460" height="80" rx="30" fill="#000" opacity="0.28" filter="url(#soft)"/>
  <rect x="0" y="0" width="450" height="64" rx="22" fill="url(#shell)"/>
  <rect x="14" y="8" width="420" height="10" rx="5" fill="#fff" opacity="0.2"/>
  ${Array.from({ length: 20 }, (_, i) => tooth(i, 0, 0)).join('')}
</g>

<g transform="translate(180 880)">
  <ellipse cx="0" cy="104" rx="120" ry="18" fill="#000" opacity="0.3" filter="url(#soft)"/>
  <path d="M-60 -10h120l-12 100H-48z" fill="${RED}"/>
  <path d="M-60 -10h120v22H-60z" fill="${INK}" opacity="0.35"/>
  <ellipse cx="0" cy="-10" rx="60" ry="14" fill="#e7d9bd"/>
  <path d="M-52 -14c-8-70 20-120 52-120s60 50 52 120z" fill="#fbf6ea"/>
  <path d="M-30 -30c0-50 14-86 30-92" fill="none" stroke="#d6c7a8" stroke-width="5"/>
</g>

<g fill="${COPPER}" opacity="0.9"><circle cx="1480" cy="180" r="8"/><circle cx="120" cy="170" r="8"/><circle cx="1470" cy="940" r="8"/><circle cx="1400" cy="640" r="6"/></g>`,
    0.1,
  )
