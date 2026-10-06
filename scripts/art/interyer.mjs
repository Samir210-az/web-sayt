import { H, W, lin, rad, wrap } from './helpers.mjs'

const stem = (x, y, rot, len, leaves) =>
  `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0 0V${-len}" stroke="#4d5a44" stroke-width="7" stroke-linecap="round"/>
  ${leaves
    .map(
      ([t, side, size]) =>
        `<ellipse cx="${side * size * 0.52}" cy="${-len * t}" rx="${size * 0.5}" ry="${size * 0.3}" fill="${side > 0 ? '#5d6b52' : '#6c7a5f'}" transform="rotate(${side * -28} ${side * size * 0.52} ${-len * t})"/>`,
    )
    .join('')}
  <ellipse cx="0" cy="${-len - 40}" rx="${leaves[0][2] * 0.3}" ry="${leaves[0][2] * 0.52}" fill="#5d6b52"/>
</g>`

export const scene = () =>
  wrap(
    lin('wall', [[0, '#e7e1d6'], [1, '#d8cfbf']], 0, 0, 0, 1) +
      lin('floor', [[0, '#c8bda9'], [1, '#b3a78f']], 0, 0, 0, 1) +
      lin('chair', [[0, '#f4efe6'], [1, '#e2d9c9']], 0, 0, 1, 1) +
      lin('shade', [[0, '#9a7d58'], [1, '#7a5f40']], 0, 0, 1, 1) +
      lin('beam', [[0, '#fff6dc', 0.55], [1, '#fff6dc', 0]], 0, 0, 0, 1) +
      rad('window', [[0, '#fff', 0.7], [1, '#fff', 0]]),
    `<rect width="${W}" height="${H}" fill="url(#wall)"/>
<circle cx="800" cy="360" r="560" fill="url(#window)"/>
<rect y="800" width="${W}" height="300" fill="url(#floor)"/>
<rect y="792" width="${W}" height="10" fill="#232220" opacity="0.1"/>
<path d="M0 800H${W}" stroke="#232220" stroke-opacity="0.2" stroke-width="2"/>

<g transform="translate(800 170)">
  <path d="M-170 380V110a170 170 0 0 1 340 0V380z" fill="#efe9de" stroke="#232220" stroke-opacity="0.55" stroke-width="3"/>
  <path d="M-142 352V110a142 142 0 0 1 284 0V352z" fill="#dcd2c0"/>
  <circle cx="26" cy="116" r="74" fill="#8a6f4d" opacity="0.88"/>
  <path d="M-142 352V300C-60 240 40 330 142 270V352z" fill="#232220" opacity="0.85"/>
</g>

<ellipse cx="800" cy="900" rx="470" ry="62" fill="#cbbfa8"/>
<ellipse cx="800" cy="900" rx="450" ry="52" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>

<g transform="translate(800 880)">
  <ellipse cx="0" cy="26" rx="280" ry="26" fill="#232220" opacity="0.22" filter="url(#soft)"/>
  <rect x="-200" y="-330" width="400" height="290" rx="90" fill="#b9a78c"/>
  <rect x="-170" y="-300" width="340" height="230" rx="70" fill="#c7b79d"/>
  <rect x="-296" y="-196" width="120" height="176" rx="52" fill="#ad9b80"/>
  <rect x="176" y="-196" width="120" height="176" rx="52" fill="#ad9b80"/>
  <rect x="-210" y="-110" width="420" height="84" rx="38" fill="#d9ccb5"/>
  <path d="M-180 -68H180" stroke="#232220" stroke-opacity="0.1" stroke-width="3"/>
  <path d="M-246 -20L-262 34M246 -20L262 34" stroke="#232220" stroke-width="10" stroke-linecap="round"/>
  <path d="M-130 -26L-138 34M130 -26L138 34" stroke="#232220" stroke-width="10" stroke-linecap="round"/>
</g>

<g transform="translate(330 800)">
  <ellipse cx="0" cy="18" rx="130" ry="16" fill="#232220" opacity="0.2" filter="url(#soft)"/>
  ${stem(-10, -150, -22, 230, [[0.4, 1, 150], [0.6, -1, 160], [0.8, 1, 130]])}
  ${stem(12, -150, 6, 330, [[0.3, -1, 170], [0.5, 1, 180], [0.7, -1, 150], [0.88, 1, 120]])}
  ${stem(30, -150, 28, 240, [[0.45, 1, 150], [0.7, -1, 130]])}
  <path d="M-96 -170H96L74 0H-74z" fill="#efe9de"/>
  <path d="M-96 -170H96" stroke="#232220" stroke-opacity="0.25" stroke-width="3"/>
  <path d="M-74 0L-96 -170 -40 -170 -30 0z" fill="#232220" opacity="0.06"/>
</g>

<g transform="translate(1260 800)">
  <ellipse cx="0" cy="14" rx="130" ry="14" fill="#232220" opacity="0.2" filter="url(#soft)"/>
  <ellipse cx="0" cy="0" rx="82" ry="12" fill="#232220"/>
  <path d="M0 -4V-420C0 -560 -140 -590 -220 -480" fill="none" stroke="#232220" stroke-width="7" stroke-linecap="round"/>
  <path d="M-262 -490H-178L-132 -390H-308z" fill="url(#shade)"/>
  <path d="M-300 -384H-140L-60 -10H-380z" fill="url(#beam)"/>
</g>`,
    0.05,
  )
