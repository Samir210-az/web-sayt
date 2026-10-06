import { chromium } from 'playwright'

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:3100'
const TEMPLATES = ['xidmet', 'klinika', 'kafe', 'huquq', 'gozellik', 'idman', 'tikinti', 'kurs', 'studiya', 'usaq', 'emlak', 'avto', 'stomat', 'turizm', 'gul', 'interyer', 'it', 'toy', 'berber', 'bosh']
const SUBPAGES = ['', '/xidmetler', '/haqqimizda', '/elaqe']
const SCROLLER_ROUTES = new Set(['idman'])

const failures = []
const fail = (msg) => failures.push(msg)

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH })

for (const [device, options] of [
  ['desktop', { viewport: { width: 1280, height: 800 } }],
  ['mobile', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
]) {
  const context = await browser.newContext(options)
  for (const template of TEMPLATES) {
    for (const sub of SUBPAGES) {
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', (e) => errors.push(e.message))
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      const response = await page.goto(`${BASE}/shablon/${template}${sub}`, { waitUntil: 'networkidle' })
      const where = `${device} ${template}${sub}`
      if (!response?.ok()) fail(`${where}: HTTP ${response?.status()}`)
      if (errors.length) fail(`${where}: konsol xətası ${errors[0].slice(0, 80)}`)
      const facts = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
      }))
      if (facts.h1 !== 1) fail(`${where}: h1 sayı ${facts.h1}`)
      if (facts.overflow && !SCROLLER_ROUTES.has(template)) fail(`${where}: üfüqi overflow`)
      if (facts.noAlt) fail(`${where}: alt atributu olmayan şəkil ${facts.noAlt}`)
      await page.close()
    }
  }
  await context.close()
}

for (const template of TEMPLATES) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/redaktor/${template}`, { waitUntil: 'networkidle' })
  const field = page.locator('[contenteditable="plaintext-only"]').first()
  if (!(await field.count())) {
    fail(`redaktor ${template}: redaktə olunan mətn yoxdur`)
    await context.close()
    continue
  }
  const marker = ` yoxlama${Date.now() % 10000}`
  await field.click()
  await page.keyboard.press('End')
  await page.keyboard.type(marker)
  await page.keyboard.press('Tab')
  await page.waitForTimeout(1200)
  await page.reload({ waitUntil: 'networkidle' })
  const text = await page.locator('[contenteditable="plaintext-only"]').first().innerText()
  if (!text.includes(marker.trim())) fail(`redaktor ${template}: dəyişiklik reload-dan sonra qalmadı`)
  await context.close()
}

await browser.close()

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('Bütün yoxlamalar keçdi.')
