import { H, W, lin, rad, wrap } from './helpers.mjs'

const windows = (x, y, cols, rows, w, h, gx, gy, litRule) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const px = x + c * (w + gx)
      const py = y + r * (h + gy)
      const fill = litRule(r, c) ? 'url(#lit)' : 'url(#glass)'
      return `<rect x="${px}" y="${py}" width="${w}" height="${h}" rx="4" fill="${fill}"/><rect x="${px}" y="${py + h - 5}" width="${w}" height="5" fill="#0b2a1c" opacity="0.35"/>`
    }).join(''),
  ).join('')

const tree = (cx, cy, r) => `<g>
  <ellipse cx="${cx}" cy="${cy + r * 0.95}" rx="${r * 0.9}" ry="${r * 0.14}" fill="#071a10" opacity="0.35"/>
  <rect x="${cx - 9}" y="${cy + r * 0.2}" width="18" height="${r * 0.8}" rx="6" fill="#4b3a22"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#crown)"/>
  <circle cx="${cx - r * 0.38}" cy="${cy - r * 0.22}" r="${r * 0.52}" fill="#3f8b5f" opacity="0.55"/>
  <circle cx="${cx + r * 0.42}" cy="${cy + r * 0.18}" r="${r * 0.4}" fill="#0f3523" opacity="0.28"/>
</g>`

const skyline = [
  [0, 700, 150], [140, 650, 120], [250, 720, 110], [350, 610, 90], [1420, 680, 120], [1530, 640, 110], [1600, 700, 90],
  [1000, 640, 90], [440, 690, 80],
]
  .map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${880 - y}" fill="#c3cab4" opacity="0.5"/>`)
  .join('')

export const scene = () =>
  wrap(
    lin('sky', [[0, '#f8f2e4'], [0.6, '#ebe0c6'], [1, '#d8caa6']], 0, 0, 0, 1) +
      rad('sun', [[0, '#fffaf0', 0.95], [1, '#fffaf0', 0]]) +
      lin('wallA', [[0, '#1d5f41'], [1, '#14452f']], 0, 0, 0, 1) +
      lin('wallB', [[0, '#2f7150'], [1, '#235a3f']], 0, 0, 0, 1) +
      lin('glass', [[0, '#0f3a29'], [1, '#0a2a1d']], 0, 0, 0, 1) +
      lin('lit', [[0, '#f8dd9b'], [1, '#e0a949']], 0, 0, 0, 1) +
      lin('ground', [[0, '#2a6445'], [1, '#0f3523']], 0, 0, 0, 1) +
      lin('copper', [[0, '#e0b36a'], [0.5, '#b8893b'], [1, '#8a5f1d']], 0, 0, 1, 1) +
      rad('crown', [[0, '#2f7a50'], [1, '#17492f']], 0.4, 0.35, 0.8),
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>
<circle cx="1230" cy="260" r="380" fill="url(#sun)"/>
${skyline}
<g>
  <rect x="1040" y="250" width="72" height="630" fill="#0d3524"/>
  <rect x="520" y="250" width="520" height="630" fill="url(#wallA)"/>
  <rect x="496" y="226" width="640" height="30" fill="#f0e7d0"/>
  <rect x="496" y="256" width="640" height="10" fill="#071a10" opacity="0.28"/>
  ${windows(553, 305, 5, 7, 62, 50, 36, 34, (r, c) => (r * 3 + c * 5) % 7 < 2)}
  ${[1, 3, 5].map((r) => `<rect x="520" y="${305 + r * 84 + 52}" width="520" height="8" fill="#e7dcc0" opacity="0.8"/>`).join('')}
  <rect x="736" y="782" width="96" height="98" rx="6" fill="url(#copper)"/>
  <rect x="746" y="792" width="76" height="88" rx="4" fill="#0a2a1d"/>
  <rect x="780" y="792" width="4" height="88" fill="#b8893b"/>
</g>
<g>
  <rect x="1150" y="470" width="340" height="410" fill="url(#wallB)"/>
  <rect x="1150" y="470" width="16" height="410" fill="url(#copper)"/>
  <rect x="1130" y="452" width="380" height="22" fill="#f0e7d0"/>
  ${windows(1190, 515, 3, 4, 76, 56, 28, 30, (r, c) => (r + c * 2) % 5 === 1)}
</g>
<g>
  <rect x="150" y="610" width="330" height="270" fill="#fbf5e6"/>
  <path d="M110 622 L315 466 L520 622 Z" fill="url(#copper)"/>
  <path d="M110 622 L520 622 L500 640 L130 640 Z" fill="#6c4812" opacity="0.5"/>
  <rect x="400" y="480" width="38" height="80" fill="#8a5f1d"/>
  <rect x="200" y="680" width="90" height="82" rx="6" fill="#14452f"/>
  <rect x="210" y="690" width="70" height="62" rx="3" fill="url(#lit)"/>
  <path d="M245 690v62M210 721h70" stroke="#14452f" stroke-width="5"/>
  <rect x="340" y="720" width="84" height="160" rx="6" fill="#14452f"/>
  <circle cx="408" cy="806" r="6" fill="#e0b36a"/>
</g>
<rect x="0" y="880" width="${W}" height="${H - 880}" fill="url(#ground)"/>
<path d="M650 880 L1070 880 L1290 1100 L560 1100 Z" fill="#e8ddc2" opacity="0.92"/>
<path d="M700 880 L1020 880 L1160 1100 L640 1100 Z" fill="#f3ead2" opacity="0.7"/>
${tree(560, 800, 92)}${tree(1110, 812, 70)}${tree(1530, 790, 104)}${tree(70, 790, 84)}
<g transform="translate(300 985) rotate(-16)">
  <ellipse cx="190" cy="78" rx="270" ry="22" fill="#041109" opacity="0.4"/>
  <rect x="62" y="-22" width="400" height="44" rx="12" fill="url(#copper)"/>
  <rect x="400" y="22" width="30" height="62" rx="6" fill="url(#copper)"/>
  <rect x="340" y="22" width="26" height="42" rx="6" fill="url(#copper)"/>
  <rect x="86" y="-14" width="340" height="9" rx="4" fill="#fff" opacity="0.38"/>
  <circle cx="0" cy="0" r="82" fill="url(#copper)"/>
  <circle cx="0" cy="0" r="38" fill="#173f2b"/>
  <path d="M-62 -34a72 72 0 0 1 60-44" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="9" stroke-linecap="round"/>
</g>
<g transform="translate(1260 985) rotate(12)">
  <ellipse cx="0" cy="68" rx="170" ry="16" fill="#041109" opacity="0.4"/>
  <path d="M-120 -52H60Q82 -52 102 -30L134 0 102 30Q82 52 60 52H-120Q-142 52-142 30V-30Q-142-52-120-52Z" fill="#f7f1e3"/>
  <path d="M-120 -52H60Q82 -52 102 -30L134 0 102 30Q82 52 60 52H-120Q-142 52-142 30V-30Q-142-52-120-52Z" fill="none" stroke="#b8893b" stroke-width="5"/>
  <circle cx="102" cy="0" r="13" fill="#173f2b"/>
  <rect x="-112" y="-24" width="132" height="16" rx="8" fill="#b8893b"/>
  <rect x="-112" y="8" width="84" height="12" rx="6" fill="#14452f" opacity="0.5"/>
  <path d="M115 -4C170 -50 220 -20 190 -80" fill="none" stroke="#e8ddc2" stroke-width="5" stroke-linecap="round"/>
</g>`,
    0.07,
  )
