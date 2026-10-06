import { H, W, lin, rad, wrap } from './helpers.mjs'

const rad2 = (a) => (a * Math.PI) / 180

const arcBand = (cx, cy, r1, r2, a1, a2) => {
  const p = (r, a) => `${(cx + r * Math.cos(rad2(a))).toFixed(1)} ${(cy + r * Math.sin(rad2(a))).toFixed(1)}`
  return `M${p(r2, a1)}A${r2} ${r2} 0 0 1 ${p(r2, a2)}L${p(r1, a2)}A${r1} ${r1} 0 0 0 ${p(r1, a1)}Z`
}

const slots = Array.from(
  { length: 40 },
  (_, i) => `<rect x="-9" y="-296" width="18" height="86" rx="9" fill="#101215" transform="rotate(${i * 9})"/>`,
).join('')

const bolts = Array.from({ length: 5 }, (_, i) => {
  const a = rad2(i * 72 - 90)
  const x = (Math.cos(a) * 96).toFixed(1)
  const y = (Math.sin(a) * 96).toFixed(1)
  return `<circle cx="${x}" cy="${y}" r="24" fill="#0c0d0f"/><circle cx="${x}" cy="${y}" r="24" fill="none" stroke="#9aa1a9" stroke-width="4"/>`
}).join('')

const ticks = Array.from({ length: 28 }, (_, i) => {
  const hot = i >= 22
  return `<rect x="-3" y="-156" width="6" height="${i % 3 === 0 ? 30 : 18}" rx="3" fill="${hot ? '#ff5a1f' : '#aab0b8'}" opacity="${hot ? 1 : 0.75}" transform="rotate(${-135 + i * 10})"/>`
}).join('')

const sparks = [[140, 780, 9], [250, 920, 6], [1440, 300, 10], [1500, 520, 6], [610, 120, 7], [1360, 960, 8]]
  .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ff5a1f"/>`)
  .join('')

export const scene = () =>
  wrap(
    lin('bg', [[0, '#0b0c0e'], [1, '#1d2126']], 0, 0, 1, 1) +
      rad('glow', [[0, '#ff5a1f', 0.38], [1, '#ff5a1f', 0]]) +
      rad('steel', [[0, '#e4e8ec'], [0.55, '#9199a2'], [1, '#4c5259']], 0.4, 0.35, 0.8) +
      lin('hat', [[0, '#363b41'], [1, '#17191c']], 0, 0, 1, 1) +
      lin('wr', [[0, '#eef1f4'], [0.5, '#a5adb6'], [1, '#5a6068']], 0, 0, 0, 1) +
      lin('cal', [[0, '#ff7a45'], [1, '#e04510']], 0, 0, 1, 1) +
      `<pattern id="haz" width="84" height="84" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="42" height="84" fill="#ff5a1f"/><rect x="42" width="42" height="84" fill="#0c0d0f"/></pattern>` +
      `<mask id="jaw"><rect x="-120" y="-120" width="240" height="240" fill="#fff"/><rect x="-140" y="-34" width="136" height="68" fill="#000"/></mask>`,
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g stroke="#fff" stroke-opacity="0.045" stroke-width="2">${Array.from({ length: 17 }, (_, i) => `<path d="M${i * 100} 0V${H}"/>`).join('')}${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${i * 100}H${W}"/>`).join('')}</g>
<circle cx="1000" cy="560" r="760" fill="url(#glow)"/>
<path d="M1040 -20H1300L780 1120H520Z" fill="#ff5a1f"/>
<path d="M1300 -20H1360L840 1120H780Z" fill="#ff5a1f" opacity="0.4"/>
<g transform="translate(860 540)">
  <circle r="340" cy="26" fill="#000" opacity="0.5" filter="url(#soft)"/>
  <circle r="332" fill="url(#steel)"/>
  <circle r="318" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="3"/>
  ${slots}
  <circle r="196" fill="none" stroke="#c3c9cf" stroke-width="6" opacity="0.7"/>
  <circle r="160" fill="url(#hat)"/>
  <circle r="160" fill="none" stroke="#7d848c" stroke-width="5"/>
  ${bolts}
  <circle r="48" fill="#0c0d0f"/>
  <circle r="48" fill="none" stroke="#b6bcc3" stroke-width="5"/>
  <ellipse cx="-120" cy="-190" rx="120" ry="34" fill="#fff" opacity="0.26" transform="rotate(-38 -120 -190)"/>
</g>
<g>
  <path d="${arcBand(860, 540, 236, 392, -58, 24)}" fill="#000" opacity="0.4" transform="translate(12 16)"/>
  <path d="${arcBand(860, 540, 236, 392, -58, 24)}" fill="url(#cal)"/>
  <path d="${arcBand(860, 540, 330, 346, -52, 18)}" fill="#fff" opacity="0.3"/>
  <circle cx="${(860 + 330 * Math.cos(rad2(-34))).toFixed(1)}" cy="${(540 + 330 * Math.sin(rad2(-34))).toFixed(1)}" r="20" fill="#2a2e33"/>
  <circle cx="${(860 + 330 * Math.cos(rad2(4))).toFixed(1)}" cy="${(540 + 330 * Math.sin(rad2(4))).toFixed(1)}" r="20" fill="#2a2e33"/>
</g>
<g transform="translate(400 330)">
  <circle r="196" cy="16" fill="#000" opacity="0.45" filter="url(#soft)"/>
  <circle r="184" fill="#262a2f"/>
  <circle r="184" fill="none" stroke="#6a7179" stroke-width="6"/>
  <circle r="168" fill="#0e1013"/>
  ${ticks}
  <path d="M0 0L84 -66" stroke="#ff5a1f" stroke-width="12" stroke-linecap="round"/>
  <circle r="26" fill="#d6dade"/>
  <circle r="10" fill="#0c0d0f"/>
</g>
<g transform="translate(1180 840) rotate(-34)">
  <ellipse cx="260" cy="120" rx="330" ry="26" fill="#000" opacity="0.45" filter="url(#soft)"/>
  <rect x="20" y="-30" width="560" height="60" rx="30" fill="url(#wr)"/>
  <rect x="60" y="-20" width="480" height="10" rx="5" fill="#fff" opacity="0.5"/>
  <circle cx="0" cy="0" r="92" fill="url(#wr)" mask="url(#jaw)"/>
  <circle cx="560" cy="0" r="22" fill="#0c0d0f" opacity="0.7"/>
</g>
${sparks}
<rect x="-20" y="1010" width="${W + 40}" height="60" fill="url(#haz)" transform="rotate(-2 800 1040)"/>`,
    0.1,
  )
