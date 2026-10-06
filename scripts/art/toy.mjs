import { H, W, lin, rad, wrap } from './helpers.mjs'

const GOLD = '#c9a24a'
const GOLD_LIGHT = '#f0d996'
const IVORY = '#fbf3e4'

const arch = (cx, top, halfWidth, bottom) =>
  `M${cx - halfWidth} ${bottom}V${top + halfWidth}a${halfWidth} ${halfWidth} 0 0 1 ${halfWidth * 2} 0V${bottom}Z`

const candle = (x, y, height = 46) => `
<g>
  <circle cx="${x}" cy="${y - height - 10}" r="38" fill="url(#flame)"/>
  <rect x="${x - 7}" y="${y - height}" width="14" height="${height}" rx="3" fill="${IVORY}"/>
  <path d="M${x} ${y - height - 24}c10 12 10 20 0 24c-10-4-10-12 0-24z" fill="#ffe7a8"/>
</g>`

const candelabra = (x, y) => `
<g>
  <ellipse cx="${x}" cy="${y + 8}" rx="54" ry="10" fill="#000" opacity="0.3" filter="url(#soft)"/>
  <path d="M${x - 46} ${y - 56}c0 40 40 42 46 42s46-2 46-42M${x} ${y - 14}V${y + 6}" fill="none" stroke="${GOLD}" stroke-width="7" stroke-linecap="round"/>
  <rect x="${x - 36}" y="${y + 2}" width="72" height="9" rx="4.5" fill="${GOLD}"/>
  ${candle(x - 46, y - 50, 40)}${candle(x, y - 64, 54)}${candle(x + 46, y - 50, 40)}
</g>`

const table = (x, y) => `
<g>
  <ellipse cx="${x}" cy="${y + 120}" rx="230" ry="34" fill="#000" opacity="0.4" filter="url(#soft)"/>
  <path d="M${x - 200} ${y + 20}L${x - 230} ${y + 120}Q${x} ${y + 160} ${x + 230} ${y + 120}L${x + 200} ${y + 20}Z" fill="url(#cloth)"/>
  <ellipse cx="${x}" cy="${y + 20}" rx="200" ry="40" fill="${IVORY}"/>
  <ellipse cx="${x}" cy="${y + 20}" rx="150" ry="26" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.7"/>
  ${candelabra(x, y + 10)}
</g>`

const drape = (x, flip) => `
<g transform="translate(${x} 0) scale(${flip} 1)">
  <path d="M0 0H120C110 180 70 300 80 520C84 640 60 740 70 830H0Z" fill="url(#drape)"/>
  <path d="M30 0C40 200 10 380 24 560M62 0C74 220 40 420 52 700" fill="none" stroke="#1e0510" stroke-opacity="0.35" stroke-width="6"/>
  <path d="M0 220Q60 260 110 200" fill="none" stroke="${GOLD}" stroke-width="5" opacity="0.8"/>
</g>`

export const scene = () =>
  wrap(
    lin('bg', [[0, '#2a0712'], [1, '#541426']], 0, 0, 0, 1) +
      lin('floor', [[0, '#3c0c1b'], [1, '#1f050d']], 0, 0, 0, 1) +
      rad('room', [[0, '#ffd8a0', 0.95], [0.55, '#c26a4a', 0.55], [1, '#6d1b30', 0.1]], 0.5, 0.55, 0.6) +
      rad('flame', [[0, '#ffe3a0', 0.85], [1, '#ffe3a0', 0]]) +
      rad('glow', [[0, '#ffcf86', 0.45], [1, '#ffcf86', 0]]) +
      lin('drape', [[0, '#6c1830'], [0.5, '#8a2440'], [1, '#4a0f1f']], 0, 0, 1, 0) +
      lin('cloth', [[0, '#e9dcc6'], [0.5, '#fbf3e4'], [1, '#d9c9ad']], 0, 0, 1, 0) +
      lin('gold', [[0, GOLD_LIGHT], [1, '#a47f2c']], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="800" cy="480" r="720" fill="url(#glow)"/>

<g>
  <path d="${arch(800, 150, 330, 840)}" fill="#1a040b" stroke="url(#gold)" stroke-width="14"/>
  <path d="${arch(800, 190, 290, 840)}" fill="url(#room)" stroke="${GOLD}" stroke-width="4" stroke-opacity="0.8"/>
  <path d="M800 190V840M610 400V840M990 400V840" stroke="#7a1d34" stroke-opacity="0.18" stroke-width="3"/>
</g>
<g>
  <path d="${arch(290, 330, 150, 840)}" fill="#1a040b" stroke="url(#gold)" stroke-width="9"/>
  <path d="${arch(290, 358, 122, 840)}" fill="url(#room)" opacity="0.85"/>
  <path d="${arch(1310, 330, 150, 840)}" fill="#1a040b" stroke="url(#gold)" stroke-width="9"/>
  <path d="${arch(1310, 358, 122, 840)}" fill="url(#room)" opacity="0.85"/>
</g>
${drape(40, 1)}${drape(1560, -1)}

<g>
  <path d="M800 0V250" stroke="${GOLD}" stroke-width="5"/>
  <circle cx="800" cy="280" r="150" fill="url(#flame)" opacity="0.8"/>
  <path d="M800 250c-34 14-34 52 0 70c34-18 34-56 0-70z" fill="url(#gold)"/>
  <path d="M690 330Q800 380 910 330M720 300Q800 270 880 300" fill="none" stroke="url(#gold)" stroke-width="8" stroke-linecap="round"/>
  <path d="M660 320Q690 380 740 360M940 320Q910 380 860 360" fill="none" stroke="${GOLD}" stroke-width="6"/>
  ${[-130, -70, 0, 70, 130].map((dx) => `<circle cx="${800 + dx}" cy="${322 - Math.abs(dx) * 0.06}" r="22" fill="url(#flame)"/><path d="M${800 + dx} ${288}c8 9 8 16 0 20c-8-4-8-11 0-20z" fill="#fff0c0"/>`).join('')}
  ${[-100, -35, 35, 100].map((dx) => `<path d="M${800 + dx} 380v40" stroke="${GOLD_LIGHT}" stroke-width="3" opacity="0.8"/><circle cx="${800 + dx}" cy="430" r="7" fill="${GOLD_LIGHT}"/>`).join('')}
</g>

<rect x="0" y="830" width="${W}" height="270" fill="url(#floor)"/>
<path d="M0 830H${W}" stroke="${GOLD}" stroke-width="5" stroke-opacity="0.7"/>
<g stroke="${GOLD}" stroke-opacity="0.14" stroke-width="3">${[900, 980, 1050].map((y) => `<path d="M0 ${y}H${W}"/>`).join('')}</g>
${table(340, 840)}${table(1260, 840)}
<g fill="${GOLD_LIGHT}" opacity="0.8">${[[560, 130, 5], [1060, 90, 4], [1450, 220, 6], [160, 160, 5], [700, 700, 4], [930, 640, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`,
    0.08,
  )
