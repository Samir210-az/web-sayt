import fs from 'node:fs'
import { chromium } from 'playwright'

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:3100'
const TEMPLATES = (process.env.ONLY ?? 'xidmet').split(',')
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8')
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH })
let bad = 0

for (const [device, viewport] of [
  ['desktop', { width: 1280, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport })
  for (const template of TEMPLATES) {
    for (const sub of ['', '/xidmetler', '/haqqimizda', '/elaqe']) {
      await page.goto(`${BASE}/shablon/${template}${sub}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1200)
      await page.addScriptTag({ content: axe })
      const found = await page.evaluate(async () => {
        const result = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })
        return result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.slice(0, 2).map((n) => ({
            text: n.html.replace(/<[^>]*>/g, '').slice(0, 30) || n.html.slice(0, 60),
            ratio: n.any[0]?.data?.contrastRatio,
          })),
        }))
      })
      for (const v of found) {
        bad += 1
        console.log(`${device} ${template}${sub}: ${v.id} ${JSON.stringify(v.nodes)}`)
      }
    }
  }
  await page.close()
}

await browser.close()
console.log(bad ? `${bad} pozuntu tapıldı.` : 'WCAG A/AA pozuntusu yoxdur.')
process.exit(bad ? 1 : 0)
