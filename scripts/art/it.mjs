import { H, W, lin, rad, wrap } from './helpers.mjs'

const LIME = '#b6f23c'
const STEEL = '#7fa3bf'
const DIM = '#2c4052'

const bars = (x, y, rows) =>
  rows
    .map(([indent, width, color, opacity = 1], i) => `<rect x="${x + indent * 26}" y="${y + i * 34}" width="${width}" height="14" rx="7" fill="${color}" opacity="${opacity}"/>`)
    .join('')

const window_ = (x, y, w, h, rows, accent = LIME) => `
<g>
  <rect x="${x + 14}" y="${y + 22}" width="${w}" height="${h}" rx="16" fill="#000" opacity="0.45" filter="url(#soft)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#0e1822" stroke="${accent}" stroke-opacity="0.55" stroke-width="2"/>
  <path d="M${x} ${y + 56}H${x + w}" stroke="#8fb0c8" stroke-opacity="0.22" stroke-width="2"/>
  <circle cx="${x + 32}" cy="${y + 28}" r="7" fill="#3a4f61"/><circle cx="${x + 58}" cy="${y + 28}" r="7" fill="#3a4f61"/><circle cx="${x + 84}" cy="${y + 28}" r="7" fill="${accent}"/>
  <rect x="${x + w - 190}" y="${y + 21}" width="150" height="14" rx="7" fill="#8fb0c8" opacity="0.28"/>
  ${bars(x + 36, y + 92, rows)}
</g>`

const nodes = [
  [150, 250], [330, 170], [480, 330], [260, 440], [90, 520], [420, 560], [610, 210],
]
const links = [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [2, 5], [1, 6], [6, 2], [5, 3]]

export const scene = () =>
  wrap(
    lin('bg', [[0, '#0a0f14'], [1, '#0e1a25']], 0, 0, 0.7, 1) +
      rad('glow', [[0, LIME, 0.3], [1, LIME, 0]]) +
      rad('glow2', [[0, '#4aa3ff', 0.18], [1, '#4aa3ff', 0]]) +
      lin('led', [[0, LIME], [1, '#6fb814']], 0, 0, 0, 1) +
      lin('rack', [[0, '#17232f'], [1, '#0d151d']], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g stroke="#8fb0c8" stroke-opacity="0.08" stroke-width="2">${Array.from({ length: 21 }, (_, i) => `<path d="M${i * 80} 0V${H}"/>`).join('')}${Array.from({ length: 15 }, (_, i) => `<path d="M0 ${i * 80}H${W}"/>`).join('')}</g>
<circle cx="1180" cy="330" r="640" fill="url(#glow)"/>
<circle cx="300" cy="860" r="520" fill="url(#glow2)"/>

<g stroke="${LIME}" stroke-opacity="0.45" stroke-width="3" fill="none">
  ${links.map(([a, b]) => `<path d="M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}"/>`).join('')}
</g>
<g>
  ${nodes.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 20 : 12}" fill="#0a0f14" stroke="${i % 3 === 0 ? LIME : STEEL}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 7 : 4}" fill="${i % 3 === 0 ? LIME : STEEL}"/>`).join('')}
</g>

${window_(660, 150, 780, 520, [
      [0, 150, LIME], [1, 300, STEEL, 0.8], [1, 230, STEEL, 0.55], [1, 360, DIM, 1], [2, 200, LIME, 0.75],
      [2, 280, STEEL, 0.6], [1, 120, DIM], [0, 90, LIME], [0, 20, '#8fb0c8', 0.9], [1, 330, STEEL, 0.5], [1, 260, DIM],
    ])}
${window_(380, 600, 560, 330, [
      [0, 120, STEEL, 0.8], [1, 250, LIME, 0.8], [1, 180, DIM], [1, 300, STEEL, 0.5], [0, 60, LIME, 0.9], [1, 220, DIM],
    ], '#6fa9d6')}

<g transform="translate(1100 760)">
  <rect x="12" y="20" width="420" height="320" rx="14" fill="#000" opacity="0.4" filter="url(#soft)"/>
  ${[0, 1, 2].map((i) => `<g transform="translate(0 ${i * 106})">
    <rect width="420" height="92" rx="12" fill="url(#rack)" stroke="#8fb0c8" stroke-opacity="0.3" stroke-width="2"/>
    ${Array.from({ length: 8 }, (_, k) => `<rect x="${28 + k * 22}" y="30" width="10" height="32" rx="3" fill="#0a0f14" stroke="#8fb0c8" stroke-opacity="0.4"/>`).join('')}
    <circle cx="${356}" cy="46" r="8" fill="url(#led)"/><circle cx="${384}" cy="46" r="8" fill="${i === 1 ? '#8fb0c8' : LIME}" opacity="${i === 1 ? 0.5 : 1}"/>
    <rect x="224" y="38" width="98" height="16" rx="8" fill="#8fb0c8" opacity="0.2"/>
  </g>`).join('')}
</g>

<g transform="translate(180 850)" fill="none" stroke="${LIME}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
  <path d="M0 -90L78 -45V45L0 90L-78 45V-45Z" stroke-opacity="0.85"/>
  <path d="M0 0L78 -45M0 0L-78 -45M0 0V90" stroke-opacity="0.5"/>
  <path d="M-30 -122L30 -122" stroke-opacity="0.4" stroke-width="3"/>
</g>

<rect x="1290" y="110" width="26" height="50" fill="${LIME}" opacity="0.9"/>
<g fill="${LIME}" opacity="0.8"><rect x="1000" y="720" width="14" height="14"/><rect x="760" y="1010" width="10" height="10"/><rect x="1500" y="640" width="12" height="12"/><rect x="120" y="680" width="10" height="10"/></g>`,
    0.08,
  )
