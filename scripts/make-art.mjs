import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const W = 1600
const H = 1100
const OUT = new URL('../public/images/', import.meta.url).pathname

const grain = `<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/>
  <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/>
</filter>
<filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="softer"><feGaussianBlur stdDeviation="40"/></filter>`

const wrap = (defs, body, grainOpacity = 0.1) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${grain}${defs}</defs>${body}
<rect width="${W}" height="${H}" filter="url(#grain)" opacity="${grainOpacity}"/>
</svg>`

const lin = (id, stops, x1 = 0, y1 = 0, x2 = 1, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join('')}</linearGradient>`

const rad = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join('')}</radialGradient>`

const scenes = {}

scenes.xidmet = () =>
  wrap(
    lin('bg', [[0, '#09122b'], [1, '#1b2f84']]) +
      rad('glow', [[0, '#f2a900', 0.55], [1, '#f2a900', 0]]) +
      lin('pipe', [[0, '#e6ecff'], [0.5, '#9fb0f5'], [1, '#6a7fe0']], 0, 0, 0, 1) +
      lin('steel', [[0, '#f4f6ff'], [1, '#aab6f0']], 0, 0, 1, 1) +
      `<mask id="notch"><rect width="400" height="400" fill="#fff"/><rect x="150" y="-10" width="100" height="170" fill="#000"/></mask>`,
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="1180" cy="330" r="620" fill="url(#glow)"/>
<g stroke="#fff" stroke-opacity="0.06" stroke-width="2">${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 110} 0V${H}"/>`).join('')}${Array.from({ length: 11 }, (_, i) => `<path d="M0 ${i * 110}H${W}"/>`).join('')}</g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M120 860H620a130 130 0 0 0 130-130V440" stroke="#050b1f" stroke-width="86" opacity="0.35" transform="translate(14 22)"/>
  <path d="M120 860H620a130 130 0 0 0 130-130V440" stroke="url(#pipe)" stroke-width="80"/>
  <path d="M120 836H620a106 106 0 0 0 106-106V440" stroke="#fff" stroke-opacity="0.35" stroke-width="10"/>
</g>
<rect x="690" y="400" width="120" height="50" rx="10" fill="url(#steel)"/>
<rect x="76" y="816" width="50" height="120" rx="10" fill="url(#steel)"/>
<g transform="translate(750 560)">
  <circle r="120" fill="#f2a900"/>
  <circle r="92" fill="none" stroke="#7a5200" stroke-width="10" stroke-opacity="0.45"/>
  ${[0, 60, 120].map((a) => `<rect x="-8" y="-100" width="16" height="200" rx="8" fill="#7a5200" fill-opacity="0.55" transform="rotate(${a})"/>`).join('')}
  <circle r="22" fill="#fff3cf"/>
</g>
<g transform="translate(1180 640) rotate(-32)">
  <g transform="translate(-200 -330)">
    <circle cx="200" cy="130" r="120" fill="url(#steel)" mask="url(#notch)"/>
    <rect x="152" y="220" width="96" height="560" rx="48" fill="url(#steel)"/>
    <rect x="176" y="260" width="12" height="440" rx="6" fill="#fff" opacity="0.7"/>
  </g>
</g>
<g transform="translate(330 330)" fill="none" stroke="#ffe4a0" stroke-width="9" stroke-linecap="round">
  <path d="M-70 -20a90 90 0 1 1 140 0c-24 26-30 50-30 78h-80c0-28-6-52-30-78z" fill="#f2a900" fill-opacity="0.18"/>
  <path d="M-38 90h76M-30 120h60"/>
  <path d="M0 -20v50M-26 -4l26 34 26-34" stroke-width="7"/>
</g>`,
  )

scenes.klinika = () =>
  wrap(
    lin('bg', [[0, '#eaf8f4'], [1, '#bfe5de']]) +
      lin('a1', [[0, '#0f766e'], [1, '#0b4f55']], 0, 0, 0, 1) +
      lin('a2', [[0, '#2a9d8f'], [1, '#1b6f78']], 0, 0, 0, 1) +
      lin('a3', [[0, '#8fd6c8'], [1, '#4eb3ae']], 0, 0, 0, 1) +
      rad('sun', [[0, '#fff', 0.95], [1, '#fff', 0]]),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="1060" cy="380" r="420" fill="url(#sun)"/>
<circle cx="1060" cy="400" r="190" fill="#fff" opacity="0.8"/>
<g>
  <path d="M330 1000V430a270 270 0 0 1 540 0V1000z" fill="url(#a3)"/>
  <path d="M420 1000V470a180 180 0 0 1 360 0V1000z" fill="url(#a2)"/>
  <path d="M510 1000V510a90 90 0 0 1 180 0V1000z" fill="url(#a1)"/>
</g>
<g transform="translate(1040 400)" fill="#0f766e">
  <rect x="-24" y="-96" width="48" height="192" rx="14"/>
  <rect x="-96" y="-24" width="192" height="48" rx="14"/>
</g>
<g fill="#fff" opacity="0.9">
  <circle cx="180" cy="220" r="14"/><circle cx="1420" cy="760" r="18"/><circle cx="1280" cy="170" r="10"/>
  <rect x="1330" y="520" width="36" height="12" rx="6"/><rect x="1342" y="508" width="12" height="36" rx="6"/>
  <rect x="150" y="620" width="36" height="12" rx="6"/><rect x="162" y="608" width="12" height="36" rx="6"/>
</g>
<g>
  <ellipse cx="1210" cy="990" rx="170" ry="30" fill="#0b4f55" opacity="0.18"/>
  <path d="M1210 990C1190 880 1100 800 1030 780c20 100 80 180 180 210z" fill="#2a9d8f"/>
  <path d="M1210 990C1230 860 1330 790 1420 780c-24 110-100 190-210 210z" fill="#0f766e"/>
  <path d="M1210 990C1210 900 1220 840 1250 760c24 90 10 170-40 230z" fill="#8fd6c8"/>
</g>
<rect x="0" y="1000" width="${W}" height="100" fill="#0b4f55" opacity="0.12"/>`,
    0.07,
  )

scenes.kafe = () =>
  wrap(
    lin('bg', [[0, '#240a12'], [1, '#6e2140']], 0.3, 0, 0.7, 1) +
      rad('lamp', [[0, '#ffb36b', 0.8], [1, '#ffb36b', 0]]) +
      lin('wood', [[0, '#4d2217'], [1, '#2a110b']], 0, 0, 0, 1) +
      lin('cup', [[0, '#fff6ea'], [1, '#e8cdb2']], 0, 0, 1, 0) +
      lin('ray', [[0, '#ffd9a8', 0.25], [1, '#ffd9a8', 0]], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g fill="url(#ray)"><path d="M1180 0L1600 0 1600 700 800 760z" opacity="0.7"/><path d="M1000 0L1120 0 1000 800 760 800z" opacity="0.5"/></g>
<circle cx="520" cy="360" r="420" fill="url(#lamp)"/>
<path d="M520 0V210" stroke="#1a0709" stroke-width="6"/>
<path d="M410 330a110 110 0 0 1 220 0z" fill="#f2b479"/>
<path d="M410 330a110 110 0 0 1 220 0z" fill="#000" opacity="0.18" transform="translate(0 0)"/>
<ellipse cx="520" cy="334" rx="110" ry="14" fill="#ffe3b8"/>
<rect x="0" y="780" width="${W}" height="320" fill="url(#wood)"/>
<g stroke="#000" stroke-opacity="0.18" stroke-width="3">${[840, 910, 990].map((y) => `<path d="M0 ${y}H${W}"/>`).join('')}</g>
<g transform="translate(900 640)">
  <ellipse cx="0" cy="150" rx="330" ry="56" fill="#000" opacity="0.35" filter="url(#soft)"/>
  <ellipse cx="0" cy="130" rx="300" ry="52" fill="#d9bc9c"/>
  <ellipse cx="0" cy="116" rx="300" ry="50" fill="#f5e6d2"/>
  <path d="M-190 -10h380l-30 190c-8 50-60 90-160 90s-152-40-160-90z" fill="url(#cup)" transform="translate(0 -30)"/>
  <ellipse cx="0" cy="-40" rx="190" ry="40" fill="#fff6ea"/>
  <ellipse cx="0" cy="-34" rx="164" ry="30" fill="#3a1a10"/>
  <ellipse cx="-30" cy="-42" rx="80" ry="10" fill="#b7733f" opacity="0.7"/>
  <path d="M188 20c90-10 110 70 40 110-20 12-50 16-70 8" fill="none" stroke="#f1dcc3" stroke-width="30" stroke-linecap="round"/>
</g>
<g fill="none" stroke="#ffe9cf" stroke-linecap="round" stroke-width="16" opacity="0.45" filter="url(#soft)">
  <path d="M820 560c-40-70 40-110 0-190s40-110 10-170"/>
  <path d="M920 560c-30-60 40-100 0-170s30-100 10-150"/>
  <path d="M1010 560c-40-70 40-110 0-190"/>
</g>
<g transform="translate(260 880)">
  <ellipse cx="0" cy="60" rx="130" ry="22" fill="#000" opacity="0.3" filter="url(#soft)"/>
  <ellipse cx="0" cy="50" rx="120" ry="20" fill="#cfa985"/>
  <path d="M-80 -30h160l-18 70c-6 22-30 34-62 34s-56-12-62-34z" fill="#e7cdb0"/>
  <ellipse cx="0" cy="-30" rx="80" ry="14" fill="#2a110b"/>
</g>`,
    0.1,
  )

scenes.gozellik = () => {
  const petals = Array.from({ length: 9 }, (_, i) => `<ellipse cx="0" cy="-170" rx="82" ry="190" fill="url(#pt)" opacity="0.9" transform="rotate(${i * 40})"/>`).join('')
  const inner = Array.from({ length: 9 }, (_, i) => `<ellipse cx="0" cy="-92" rx="46" ry="104" fill="#fff" opacity="0.35" transform="rotate(${i * 40 + 20})"/>`).join('')
  return wrap(
    lin('bg', [[0, '#fff0f2'], [0.6, '#f6d3da'], [1, '#e9aebd']]) +
      lin('pt', [[0, '#f7bccb'], [1, '#c8567a']], 0, 0, 0, 1) +
      rad('core', [[0, '#fff2c7'], [1, '#e8a85b']]) +
      rad('halo', [[0, '#fff', 0.9], [1, '#fff', 0]]),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="800" cy="540" r="520" fill="url(#halo)"/>
<g fill="#b03a63" opacity="0.12"><circle cx="260" cy="260" r="150"/><circle cx="1400" cy="830" r="210"/></g>
<g transform="translate(800 540)">${petals}${inner}<circle r="76" fill="url(#core)"/><circle r="30" fill="#fff" opacity="0.5" cx="-18" cy="-18"/></g>
<g fill="#3b1a26">
  <path d="M300 640c-40 60-60 100-60 130a60 60 0 0 0 120 0c0-30-20-70-60-130z" opacity="0.9"/>
  <path d="M1340 280c-26 40-40 66-40 86a40 40 0 0 0 80 0c0-20-14-46-40-86z" opacity="0.85"/>
</g>
<g transform="rotate(-24 1260 760)"><rect x="1160" y="730" width="220" height="64" rx="32" fill="#f2c9d2"/><rect x="1270" y="730" width="110" height="64" rx="32" fill="#b03a63"/></g>
<g transform="rotate(32 340 330)"><rect x="240" y="300" width="200" height="56" rx="28" fill="#fff" opacity="0.85"/><rect x="340" y="300" width="100" height="56" rx="28" fill="#e9aebd"/></g>
<g fill="none" stroke="#b03a63" stroke-opacity="0.35" stroke-width="3"><circle cx="800" cy="540" r="470"/><circle cx="800" cy="540" r="520" stroke-dasharray="4 14"/></g>`,
    0.06,
  )
}

scenes.idman = () =>
  wrap(
    lin('bg', [[0, '#06080a'], [1, '#161b20']], 0, 0, 1, 1) +
      rad('glow', [[0, '#d6ff3c', 0.38], [1, '#d6ff3c', 0]]) +
      lin('metal', [[0, '#6c7580'], [0.45, '#2c3239'], [1, '#12161a']], 0, 0, 0, 1) +
      lin('bar', [[0, '#c4ccd4'], [0.5, '#6e7780'], [1, '#2a3037']], 0, 0, 0, 1) +
      lin('bell', [[0, '#4a525b'], [1, '#101418']], 0.2, 0, 0.8, 1),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="900" cy="500" r="620" fill="url(#glow)"/>
<g fill="#d6ff3c" opacity="0.9">${Array.from({ length: 6 }, (_, i) => `<rect x="${1010 + i * 90}" y="-200" width="34" height="1600" transform="rotate(24 1200 500)" opacity="${0.55 - i * 0.07}"/>`).join('')}</g>
<g transform="translate(800 520) rotate(-18)">
  <ellipse cx="0" cy="330" rx="620" ry="40" fill="#000" opacity="0.5" filter="url(#soft)"/>
  <rect x="-520" y="-22" width="1040" height="44" rx="22" fill="url(#bar)"/>
  ${[-1, 1]
    .map(
      (s) => `<g transform="scale(${s} 1)">
    <rect x="300" y="-210" width="64" height="420" rx="20" fill="url(#metal)"/>
    <rect x="370" y="-160" width="56" height="320" rx="18" fill="url(#metal)"/>
    <rect x="432" y="-110" width="44" height="220" rx="14" fill="url(#metal)"/>
    <rect x="304" y="-200" width="10" height="400" rx="5" fill="#fff" opacity="0.22"/>
    <rect x="300" y="-18" width="64" height="12" fill="#d6ff3c"/>
  </g>`,
    )
    .join('')}
</g>
<g transform="translate(330 790)">
  <ellipse cx="0" cy="170" rx="190" ry="26" fill="#000" opacity="0.5" filter="url(#soft)"/>
  <path d="M-110 -70a110 110 0 0 1 220 0" fill="none" stroke="url(#bell)" stroke-width="44" stroke-linecap="round" transform="translate(0 -40)"/>
  <circle cx="0" cy="50" r="160" fill="url(#bell)"/>
  <ellipse cx="-56" cy="-4" rx="46" ry="76" fill="#fff" opacity="0.14" transform="rotate(25 -56 -4)"/>
  <rect x="-70" y="40" width="140" height="42" rx="21" fill="#d6ff3c"/>
</g>`,
    0.1,
  )

scenes.tikinti = () => {
  const gridLines =
    Array.from({ length: 33 }, (_, i) => `<path d="M${i * 50} 0V${H}"/>`).join('') +
    Array.from({ length: 23 }, (_, i) => `<path d="M0 ${i * 50}H${W}"/>`).join('')
  const lattice = Array.from({ length: 14 }, (_, i) => {
    const y = 120 + i * 60
    return `<path d="M1180 ${y}l60 60M1240 ${y}l-60 60M1180 ${y}h60"/>`
  }).join('')
  return wrap(
    lin('bg', [[0, '#f0eee9'], [1, '#dedad2']], 0, 0, 0, 1) +
      lin('slab', [[0, '#3a3f47'], [1, '#1c1f24']], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g stroke="#1c1f24" stroke-opacity="0.09" stroke-width="2">${gridLines}</g>
<g>
  <rect x="200" y="900" width="760" height="40" fill="url(#slab)"/>
  ${[0, 1, 2, 3]
    .map((f) => `<rect x="200" y="${900 - (f + 1) * 180}" width="760" height="26" fill="url(#slab)"/>`)
    .join('')}
  ${[0, 1, 2, 3, 4]
    .map((c) => `<rect x="${200 + c * 175}" y="${900 - 4 * 180}" width="26" height="${4 * 180}" fill="#1c1f24"/>`)
    .join('')}
  <rect x="226" y="${900 - 180}" width="149" height="154" fill="#f2a900" opacity="0.92"/>
  <rect x="401" y="${900 - 360}" width="149" height="154" fill="#f2a900" opacity="0.55"/>
  <rect x="576" y="${900 - 540}" width="149" height="154" fill="#f2a900" opacity="0.8"/>
  <path d="M226 720L375 574M401 540L550 394" stroke="#1c1f24" stroke-width="6" opacity="0.5"/>
</g>
<g stroke="#1c1f24" stroke-width="10" fill="none" stroke-linecap="square">
  <path d="M1180 940V120M1240 940V120"/>
  <g stroke-width="5">${lattice}</g>
  <path d="M1150 120H1240" /><path d="M1210 120H520" stroke="#f2a900" stroke-width="16"/>
  <path d="M1210 120L1000 60M1210 120l60-60" stroke-width="6"/>
  <path d="M640 124V420" stroke-width="4"/>
  <rect x="610" y="420" width="60" height="44" fill="#f2a900" stroke="none"/>
  <rect x="1160" y="50" width="120" height="60" fill="#1c1f24" stroke="none"/>
  <rect x="1130" y="940" width="160" height="30" fill="#1c1f24" stroke="none"/>
</g>
<rect x="0" y="940" width="${W}" height="160" fill="#1c1f24"/>
<rect x="0" y="940" width="${W}" height="14" fill="#f2a900"/>
<g stroke="#1c1f24" stroke-width="3" fill="none" opacity="0.7">
  <path d="M200 990v26M960 990v26M200 1003H960"/>
  <path d="M1020 900V240M1006 900h28M1006 240h28"/>
</g>`,
    0.08,
  )
}

scenes.kurs = () =>
  wrap(
    lin('bg', [[0, '#f7f3ff'], [1, '#e1d8ff']]) +
      lin('b1', [[0, '#312a74'], [1, '#201a4d']], 0, 0, 1, 0) +
      lin('b2', [[0, '#ff6b45'], [1, '#e84a22']], 0, 0, 1, 0) +
      lin('b3', [[0, '#ffd45e'], [1, '#f5b810']], 0, 0, 1, 0),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="1230" cy="300" r="230" fill="#ffc83d"/>
<circle cx="1230" cy="300" r="230" fill="none" stroke="#201a4d" stroke-width="6" transform="translate(18 18)"/>
<path d="M260 380l170 290H90z" fill="#ff5a36"/>
<rect x="1180" y="700" width="200" height="200" rx="18" fill="#201a4d" transform="rotate(14 1280 800)"/>
<g fill="#201a4d" opacity="0.35">${Array.from({ length: 7 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<circle cx="${160 + c * 28}" cy="${760 + r * 28}" r="4"/>`).join('')).join('')}</g>
<g transform="translate(800 560)">
  <ellipse cx="0" cy="330" rx="460" ry="34" fill="#201a4d" opacity="0.22" filter="url(#soft)"/>
  <rect x="-380" y="170" width="760" height="130" rx="14" fill="url(#b1)"/>
  <rect x="-368" y="184" width="730" height="102" rx="8" fill="#fff" opacity="0.92"/>
  <path d="M-368 210H362M-368 238H362M-368 262H362" stroke="#201a4d" stroke-opacity="0.18" stroke-width="3"/>
  <rect x="-330" y="30" width="660" height="130" rx="14" fill="url(#b2)" transform="rotate(-2)"/>
  <rect x="-318" y="44" width="630" height="102" rx="8" fill="#fff" opacity="0.92" transform="rotate(-2)"/>
  <rect x="-290" y="-100" width="580" height="130" rx="14" fill="url(#b3)" transform="rotate(3)"/>
  <rect x="-278" y="-86" width="556" height="102" rx="8" fill="#fff" opacity="0.92" transform="rotate(3)"/>
  <rect x="-300" y="170" width="40" height="130" fill="#ffc83d" opacity="0.9"/>
</g>
<g transform="translate(800 340) rotate(-28)">
  <rect x="-240" y="-18" width="440" height="36" rx="4" fill="#ffc83d"/>
  <path d="M200 -18l60 18-60 18z" fill="#f5d9b0"/><path d="M236 -6l24 6-24 6z" fill="#201a4d"/>
  <rect x="-270" y="-18" width="34" height="36" rx="8" fill="#ff5a36"/>
</g>
<g fill="#201a4d">${[[420, 200, 26], [1400, 640, 20], [640, 940, 22]]
      .map(([x, y, s]) => `<path d="M${x} ${y - s}l${s * 0.3} ${s * 0.7} ${s * 0.7} ${s * 0.3}-${s * 0.7} ${s * 0.3}-${s * 0.3} ${s * 0.7}-${s * 0.3}-${s * 0.7}-${s * 0.7}-${s * 0.3} ${s * 0.7}-${s * 0.3}z"/>`)
      .join('')}</g>`,
    0.05,
  )

scenes.studiya = () => {
  const blades = Array.from({ length: 7 }, (_, i) => `<path d="M0 -150L120 -62 40 -110z" fill="#1b1b1d" stroke="#000" stroke-width="2" transform="rotate(${i * (360 / 7)})"/>`).join('')
  const holes = (y) => Array.from({ length: 22 }, (_, i) => `<rect x="${-40 + i * 78}" y="${y}" width="30" height="20" rx="4" fill="#101010"/>`).join('')
  return wrap(
    lin('bg', [[0, '#0b0b0c'], [1, '#2a1812']], 0, 0, 1, 1) +
      rad('leak', [[0, '#e4572e', 0.65], [1, '#e4572e', 0]]) +
      rad('leak2', [[0, '#ffb067', 0.35], [1, '#ffb067', 0]]) +
      lin('ring', [[0, '#4a4a4f'], [0.5, '#161618'], [1, '#2c2c30']], 0, 0, 1, 1) +
      rad('glass', [[0, '#3a4b66'], [0.5, '#101827'], [1, '#05070c']], 0.4, 0.35, 0.8) +
      rad('shine', [[0, '#fff', 0.9], [1, '#fff', 0]]),
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="120" cy="260" r="620" fill="url(#leak)"/>
<circle cx="1500" cy="900" r="480" fill="url(#leak2)"/>
<g transform="translate(800 520)">
  <circle r="400" fill="#000" opacity="0.5" filter="url(#softer)" cy="30"/>
  <circle r="360" fill="url(#ring)"/>
  <circle r="338" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="3"/>
  <circle r="300" fill="#0b0b0d"/>
  ${Array.from({ length: 48 }, (_, i) => `<rect x="-3" y="-356" width="6" height="26" fill="#fff" opacity="0.18" transform="rotate(${i * 7.5})"/>`).join('')}
  <circle r="250" fill="url(#glass)"/>
  <circle r="170" fill="#05070c"/>
  <g opacity="0.95">${blades}</g>
  <circle r="64" fill="#02030a"/>
  <circle r="250" fill="none" stroke="#e4572e" stroke-width="3" opacity="0.7"/>
  <ellipse cx="-96" cy="-110" rx="86" ry="46" fill="url(#shine)" opacity="0.65" transform="rotate(-38 -96 -110)"/>
  <circle cx="110" cy="96" r="22" fill="#e4572e" opacity="0.8"/>
</g>
<g transform="translate(-100 930) rotate(-4)">
  <rect width="1900" height="150" fill="#0d0d0e"/>
  ${holes(14)}${holes(116)}
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${20 + i * 312}" y="46" width="270" height="58" fill="#1d1d20" stroke="#e4572e" stroke-opacity="0.35" stroke-width="2"/>`).join('')}
</g>`,
    0.12,
  )
}

scenes.usaq = () => {
  const cloud = (x, y, k = 1, o = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})" opacity="${o}" fill="#fff"><ellipse cx="0" cy="40" rx="150" ry="46"/><circle cx="-50" cy="12" r="52"/><circle cx="26" cy="-6" r="68"/><circle cx="92" cy="22" r="44"/></g>`
  const cube = (x, y, s, c, shade, rot, letter) =>
    `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="${-s / 2 + 10}" y="${-s / 2 + 16}" width="${s}" height="${s}" rx="22" fill="#17314a" opacity="0.16"/>
  <rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="22" fill="${c}"/>
  <rect x="${-s / 2}" y="${s / 2 - 26}" width="${s}" height="26" rx="13" fill="${shade}" opacity="0.55"/>
  <text x="0" y="${s * 0.22}" font-family="Arial, sans-serif" font-weight="800" font-size="${s * 0.6}" fill="#fff" text-anchor="middle">${letter}</text>
</g>`
  return wrap(
    lin('sky', [[0, '#a9d4ef'], [1, '#e8f4fb']], 0, 0, 0, 1) +
      rad('sun', [[0, '#fff3c4', 0.95], [1, '#fff3c4', 0]]) +
      lin('hill', [[0, '#bfe3c0'], [1, '#8ccb9a']], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>
<circle cx="1280" cy="250" r="360" fill="url(#sun)"/>
${cloud(260, 220, 1.1, 0.95)}${cloud(1240, 140, 0.8, 0.9)}${cloud(1380, 560, 0.7, 0.8)}${cloud(120, 700, 0.6, 0.8)}
<path d="M0 860 C 300 760 560 800 820 850 C 1080 900 1340 790 1600 840 L1600 1100 L0 1100 Z" fill="url(#hill)"/>
<path d="M0 950 C 360 880 700 960 1020 940 C 1260 925 1450 900 1600 930 L1600 1100 L0 1100 Z" fill="#a6d8a8"/>
<g transform="translate(1130 330) rotate(14)">
  <path d="M0 -150 L110 0 L0 190 L-110 0 Z" fill="#ffa987"/>
  <path d="M0 -150 L110 0 L0 20 Z" fill="#ffd86b"/>
  <path d="M0 -150 L-110 0 L0 20 Z" fill="#f48e66"/>
  <path d="M0 20 L110 0 L0 190 Z" fill="#e97a52" opacity="0.9"/>
  <path d="M0 190 C -60 300 60 380 -10 480 C -50 540 40 590 0 650" fill="none" stroke="#17314a" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
  <circle cx="-26" cy="330" r="16" fill="#4d8fc0"/><circle cx="30" cy="420" r="16" fill="#ffa987"/><circle cx="-14" cy="520" r="16" fill="#ffd86b"/>
</g>
${cube(560, 810, 250, '#4d8fc0', '#2f78b7', -6, 'A')}
${cube(830, 860, 210, '#ffa987', '#e97a52', 8, 'B')}
${cube(700, 610, 220, '#f2c14e', '#d9a21f', 5, 'C')}
${cube(1010, 735, 170, '#6bbf8a', '#3f9c67', -10, 'D')}
${cube(380, 905, 150, '#c7a4e8', '#9d73cc', 12, 'E')}`,
    0.06,
  )
}

await mkdir(OUT, { recursive: true })
for (const [id, make] of Object.entries(scenes)) {
  await mkdir(`${OUT}${id}`, { recursive: true })
  await sharp(Buffer.from(make())).webp({ quality: 82, effort: 5 }).toFile(`${OUT}${id}/art.webp`)
  console.log(id)
}
