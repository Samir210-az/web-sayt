import { H, W, lin, rad, wrap } from './helpers.mjs'

const peony = (cx, cy, r, rot, tones) => {
  const ring = (count, rr, ry, tone, offset) =>
    Array.from(
      { length: count },
      (_, i) =>
        `<ellipse cx="0" cy="${-rr}" rx="${ry * 0.78}" ry="${ry}" fill="${tone}" transform="rotate(${offset + (i * 360) / count})"/>`,
    ).join('')
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})">
  <circle r="${r * 1.04}" fill="#3a1c2b" opacity="0.07" transform="translate(6 10)"/>
  ${ring(9, r * 0.52, r * 0.56, tones[0], 0)}
  ${ring(8, r * 0.4, r * 0.46, tones[1], 20)}
  ${ring(6, r * 0.27, r * 0.34, tones[2], 8)}
  ${ring(5, r * 0.14, r * 0.2, tones[3], 30)}
  <circle r="${r * 0.08}" fill="#f2c36b"/>
</g>`
}

const leaf = (x, y, len, rot, tone = '#7d9a7b') =>
  `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0C${len * 0.2} ${-len * 0.34} ${len * 0.8} ${-len * 0.34} ${len} 0C${len * 0.8} ${len * 0.34} ${len * 0.2} ${len * 0.34} 0 0z" fill="${tone}"/><path d="M0 0H${len * 0.9}" stroke="#fbeeed" stroke-width="3" opacity="0.5"/></g>`

const dots = (x, y, rot, n, spread) =>
  `<g transform="translate(${x} ${y}) rotate(${rot})" fill="#fffaf5">${Array.from({ length: n }, (_, i) => {
    const a = i * 2.4
    const d = (i / n) * spread
    return `<circle cx="${(Math.cos(a) * d).toFixed(1)}" cy="${(Math.sin(a) * d * 0.8).toFixed(1)}" r="${7 - (i % 3) * 1.6}"/>`
  }).join('')}</g>`

const tulip = (x, y, h, tone, shade) =>
  `<g transform="translate(${x} ${y})">
  <path d="M0 0C-6 ${-h * 0.4} 6 ${-h * 0.7} 0 ${-h}" fill="none" stroke="#7d9a7b" stroke-width="8" stroke-linecap="round"/>
  <path d="M-30 ${-h - 6}C-34 ${-h - 52} -12 ${-h - 74} 0 ${-h - 80}C12 ${-h - 74} 34 ${-h - 52} 30 ${-h - 6}C14 ${-h + 10} -14 ${-h + 10} -30 ${-h - 6}z" fill="${tone}"/>
  <path d="M0 ${-h - 80}C-16 ${-h - 52} -14 ${-h - 20} -6 ${-h + 8}C10 ${-h - 18} 18 ${-h - 52} 0 ${-h - 80}z" fill="${shade}" opacity="0.8"/>
</g>`

export const scene = () =>
  wrap(
    lin('bg', [[0, '#fcefee'], [1, '#f6d3d4']], 0, 0, 0.4, 1) +
      lin('arch', [[0, '#fff7f3'], [1, '#fbe2e0']], 0, 0, 0, 1) +
      lin('table', [[0, '#e9b3bb'], [1, '#d995a3']], 0, 0, 0, 1) +
      lin('paper', [[0, '#fffaf6'], [1, '#f3dedb']], 0, 0, 1, 0) +
      lin('glass', [[0, '#ffffff', 0.85], [1, '#f6d3d4', 0.65]], 0, 0, 1, 0) +
      rad('glow', [[0, '#fff', 0.8], [1, '#fff', 0]]),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="800" cy="480" r="600" fill="url(#glow)"/>
<path d="M440 1010V470a360 360 0 0 1 720 0v540z" fill="none" stroke="#3a1c2b" stroke-opacity="0.45" stroke-width="2" transform="translate(30 -24)"/>
<path d="M440 1010V470a360 360 0 0 1 720 0v540z" fill="url(#arch)"/>
<path d="M500 1010V490a300 300 0 0 1 600 0v520z" fill="#f6cfd0" opacity="0.5"/>
<rect y="1000" width="${W}" height="100" fill="url(#table)"/>
<rect y="1000" width="${W}" height="6" fill="#3a1c2b" opacity="0.1"/>

<g>
  ${leaf(800, 800, 300, -150)}${leaf(800, 800, 320, -30)}${leaf(800, 780, 260, -110, '#a1b9a0')}${leaf(800, 780, 270, -70, '#a1b9a0')}
  ${leaf(780, 700, 190, -168, '#8fae8c')}${leaf(820, 700, 190, -12, '#8fae8c')}
  ${dots(640, 330, -10, 26, 74)}${dots(980, 300, 12, 24, 66)}${dots(800, 220, 0, 18, 56)}
  ${peony(800, 450, 150, 0, ['#cf5878', '#e07b97', '#eca0b4', '#f7c8d3'])}
  ${peony(628, 560, 118, 28, ['#b8325f', '#cf5878', '#e07b97', '#eea8bb'])}
  ${peony(980, 570, 124, -16, ['#f2b2c0', '#f6c8d2', '#fadde3', '#fff0f2'])}
  ${peony(720, 330, 78, 12, ['#fff0ed', '#fbdcdc', '#f6c6cc', '#f2b2c0'])}
  ${peony(900, 340, 72, -30, ['#e98aa6', '#f0a6bb', '#f6c4d1', '#fbdce4'])}
  <path d="M640 720L960 720L836 1020H764Z" fill="url(#paper)"/>
  <path d="M640 720L800 780L764 1020z" fill="#e8c9c9" opacity="0.5"/>
  <path d="M800 770L836 1020" stroke="#3a1c2b" stroke-opacity="0.08" stroke-width="3"/>
  <g transform="translate(800 770)">
    <path d="M0 0C-50 -50 -130 -40 -120 10C-110 50 -40 40 0 0z" fill="#3a1c2b"/>
    <path d="M0 0C50 -50 130 -40 120 10C110 50 40 40 0 0z" fill="#53283c"/>
    <path d="M-6 6C-30 70 -50 130 -66 190L-30 176 -6 220z" fill="#3a1c2b"/>
    <path d="M6 6C34 70 56 120 80 170L44 168 22 214z" fill="#53283c"/>
    <rect x="-22" y="-20" width="44" height="40" rx="12" fill="#2b1320"/>
  </g>
</g>

<g transform="translate(300 1000)">
  <ellipse cx="0" cy="4" rx="96" ry="14" fill="#3a1c2b" opacity="0.18"/>
  ${tulip(-34, -140, 330, '#b8325f', '#8c1f48')}
  ${tulip(20, -150, 410, '#e98aa6', '#cf5878')}
  ${tulip(60, -130, 280, '#f6c0cb', '#e98aa6')}
  ${leaf(-6, -110, 190, -128)}${leaf(8, -100, 170, -52)}
  <path d="M-62 -170C-78 -80 -84 -20 -52 0H52C84 -20 78 -80 62 -170z" fill="url(#glass)" stroke="#fff" stroke-width="3"/>
  <path d="M-48 -90H48" stroke="#b8325f" stroke-opacity="0.25" stroke-width="4"/>
</g>

<g transform="translate(1290 1000)">
  <ellipse cx="0" cy="6" rx="190" ry="20" fill="#3a1c2b" opacity="0.2"/>
  <rect x="-170" y="-210" width="340" height="210" rx="14" fill="#3a1c2b"/>
  <rect x="-186" y="-262" width="372" height="64" rx="12" fill="#53283c"/>
  <rect x="-20" y="-262" width="40" height="262" fill="#7d9a7b"/>
  <g transform="translate(0 -262)">
    <path d="M0 0C-40 -70 -120 -70 -100 -14C-90 14 -30 14 0 0z" fill="#7d9a7b"/>
    <path d="M0 0C40 -70 120 -70 100 -14C90 14 30 14 0 0z" fill="#93ad90"/>
    <circle r="16" fill="#7d9a7b"/>
  </g>
  ${peony(-60, -330, 60, 10, ['#f2b2c0', '#f6c8d2', '#fadde3', '#fff0f2'])}
  ${leaf(-40, -290, 120, -150, '#8fae8c')}
</g>

<g fill="#b8325f" opacity="0.55">
  <ellipse cx="170" cy="260" rx="16" ry="26" transform="rotate(30 170 260)"/>
  <ellipse cx="1430" cy="250" rx="14" ry="22" transform="rotate(-24 1430 250)"/>
  <ellipse cx="1180" cy="120" rx="10" ry="16" transform="rotate(40 1180 120)"/>
  <ellipse cx="420" cy="120" rx="12" ry="18" transform="rotate(-30 420 120)"/>
</g>`,
    0.05,
  )
