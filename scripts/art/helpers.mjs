export const W = 1600
export const H = 1100

const grain = `<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/>
  <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/>
</filter>
<filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="softer"><feGaussianBlur stdDeviation="40"/></filter>`

export const wrap = (defs, body, grainOpacity = 0.1) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${grain}${defs}</defs>${body}
<rect width="${W}" height="${H}" filter="url(#grain)" opacity="${grainOpacity}"/>
</svg>`

export const lin = (id, stops, x1 = 0, y1 = 0, x2 = 1, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join('')}</linearGradient>`

export const rad = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join('')}</radialGradient>`

