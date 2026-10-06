import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:3100'
const OUT = new URL('../public/previews/', import.meta.url).pathname
const TEMPLATES = (process.env.ONLY ?? 'xidmet,klinika,kafe,huquq,gozellik,idman,tikinti,kurs,studiya,bosh').split(',')
const PAGES = [
  ['home', ''],
  ['xidmetler', '/xidmetler'],
  ['haqqimizda', '/haqqimizda'],
  ['elaqe', '/elaqe'],
]
const DEVICES = {
  desktop: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
}

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH })
await mkdir(OUT, { recursive: true })

for (const [device, options] of Object.entries(DEVICES)) {
  const context = await browser.newContext({ ...options, reducedMotion: 'reduce' })
  for (const template of TEMPLATES) {
    for (const [key, path] of PAGES) {
      const page = await context.newPage()
      await page.goto(`${BASE}/shablon/${template}${path}`, { waitUntil: 'networkidle' })
      await page.addStyleTag({
        content: '.demobar{display:none!important}.header{position:static!important}.stack__card{position:static!important}',
      })
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: `${OUT}${template}-${key}-${device}.jpg`, type: 'jpeg', quality: 74, fullPage: true })
      await page.close()
    }
  }
  await context.close()
}

const thumbs = await browser.newContext({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 0.5, reducedMotion: 'reduce' })
for (const template of TEMPLATES) {
  const page = await thumbs.newPage()
  await page.goto(`${BASE}/shablon/${template}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: '.demobar{display:none!important}.header{position:static!important}' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${OUT}${template}-thumb.jpg`, type: 'jpeg', quality: 72 })
  await page.close()
}
await thumbs.close()

await browser.close()
