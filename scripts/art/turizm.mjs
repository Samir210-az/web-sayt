import { H, W, lin, rad, wrap } from './helpers.mjs'

const waves = (rows) =>
  rows
    .map(
      ([y, x0, count, size, opacity]) =>
        `<path d="M${x0} ${y}${Array.from({ length: count }, () => `q${size / 2} ${-size / 3} ${size} 0`).join('')}" fill="none" stroke="#fff4e3" stroke-width="4" stroke-linecap="round" opacity="${opacity}"/>`,
    )
    .join('')

const cloud = (x, y, k, o = 1) =>
  `<g transform="translate(${x} ${y}) scale(${k})" opacity="${o}" fill="#fffaf0"><ellipse cx="0" cy="34" rx="130" ry="32"/><circle cx="-44" cy="12" r="38"/><circle cx="14" cy="-4" r="50"/><circle cx="68" cy="16" r="32"/></g>`

const palm = (x, y, k, flip = 1) => {
  const leaf = (rot, len) =>
    `<path d="M0 0C${len * 0.3} ${-len * 0.34} ${len * 0.75} ${-len * 0.3} ${len} ${len * 0.1}C${len * 0.7} ${-len * 0.08} ${len * 0.3} ${-len * 0.1} 0 0z" fill="#17707a" transform="rotate(${rot})"/>`
  return `<g transform="translate(${x} ${y}) scale(${k * flip} ${k})">
  <path d="M0 0C-10 -90 8 -170 -6 -250" fill="none" stroke="#7a4b2a" stroke-width="16" stroke-linecap="round"/>
  <g transform="translate(-6 -250)">${[-160, -120, -75, -30, 15, 60].map((r, i) => leaf(r, 150 - (i % 2) * 24)).join('')}</g>
  <circle cx="-10" cy="-244" r="9" fill="#5b3820"/><circle cx="4" cy="-238" r="9" fill="#5b3820"/>
</g>`
}

export const scene = () =>
  wrap(
    lin('sky', [[0, '#ffd9ae'], [0.55, '#ffeccd'], [1, '#fff4e3']], 0, 0, 0, 1) +
      rad('halo', [[0, '#fff0b8', 0.95], [1, '#fff0b8', 0]]) +
      lin('sea', [[0, '#2a9aa0'], [0.45, '#14727e'], [1, '#0b3a47']], 0, 0, 0, 1) +
      lin('far', [[0, '#5aa7a6'], [1, '#8cc3b9']], 0, 0, 0, 1) +
      lin('mid', [[0, '#2b8590'], [1, '#1b6571']], 0, 0, 0, 1) +
      lin('near', [[0, '#14505e'], [1, '#0e3f4c']], 0, 0, 0, 1),
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>
<circle cx="1040" cy="350" r="460" fill="url(#halo)"/>
<circle cx="1040" cy="350" r="186" fill="#e2543b"/>
<circle cx="1040" cy="350" r="228" fill="none" stroke="#e2543b" stroke-width="4" stroke-dasharray="3 16" stroke-linecap="round" opacity="0.7"/>
${cloud(250, 250, 1.1, 0.95)}${cloud(1380, 520, 0.8, 0.9)}${cloud(620, 160, 0.7, 0.85)}

<path d="M0 790V560L170 430L300 550L450 380L620 570L740 470L890 620L1020 490L1160 630L1290 560L1400 640L1600 560V790z" fill="url(#far)"/>
<path d="M450 380l-62 66 34-12 32 34 26-32 38 22z" fill="#fff4e3" opacity="0.9"/>
<path d="M170 430l-52 52 36-10 22 28 30-24 24 6z" fill="#fff4e3" opacity="0.85"/>
<path d="M0 810V700L230 540l190 160 200-110 220 150 250-170 230 190 280-110V810z" fill="url(#mid)"/>
<path d="M230 540l-58 54 40-10 26 26 28-28 38 20z" fill="#fff4e3" opacity="0.95"/>
<path d="M1100 570l-62 58 44-10 26 24 30-28 40 18z" fill="#fff4e3" opacity="0.95"/>
<path d="M0 830V760C240 700 420 760 640 800s440 20 700-60c120-36 200-20 260 0v190z" fill="url(#near)"/>

<rect y="800" width="${W}" height="300" fill="url(#sea)"/>
<rect y="800" width="${W}" height="8" fill="#0b3a47" opacity="0.25"/>
${waves([[850, 60, 4, 70, 0.55], [920, 300, 5, 80, 0.45], [990, 40, 6, 90, 0.38], [1050, 520, 4, 100, 0.3], [880, 900, 4, 60, 0.4]])}

<g transform="translate(430 800)">
  <ellipse cx="0" cy="58" rx="120" ry="14" fill="#0b3a47" opacity="0.5"/>
  <path d="M-96 18H100l-34 42H-60z" fill="#e2543b"/>
  <path d="M-96 18H100" stroke="#fff4e3" stroke-width="5"/>
  <path d="M0 10V-190" stroke="#0e3f4c" stroke-width="6" stroke-linecap="round"/>
  <path d="M10 -184V-8L108 -8z" fill="#fff4e3"/>
  <path d="M-8 -150V-8L-86 -8z" fill="#f6c453"/>
  <path d="M0 -190l34 10-34 10z" fill="#e2543b"/>
</g>

<g transform="translate(1240 960)">
  <ellipse cx="0" cy="0" rx="250" ry="52" fill="#f1c36b"/>
  <ellipse cx="0" cy="-12" rx="226" ry="40" fill="#f8d98e"/>
  ${palm(-70, -26, 0.95)}
  ${palm(90, -22, 0.72, -1)}
</g>

<path d="M90 700C340 600 470 330 800 290S1160 140 1330 190" fill="none" stroke="#0e3f4c" stroke-width="5" stroke-dasharray="2 20" stroke-linecap="round" opacity="0.8"/>
<g transform="translate(1368 178) rotate(-14)">
  <path d="M-52 14L66 -34 8 42z" fill="#0e3f4c"/>
  <path d="M-52 14L8 42 -2 12z" fill="#e2543b"/>
  <path d="M-2 12L66 -34" stroke="#fff4e3" stroke-width="3"/>
</g>
<g transform="translate(130 720)" fill="none" stroke="#e2543b" stroke-width="7" stroke-linecap="round">
  <path d="M-22 -22l44 44M22 -22l-44 44"/>
</g>`,
    0.06,
  )
