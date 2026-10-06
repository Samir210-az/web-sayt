import { resolveRoute } from '@/components/template/routes'
import { SiteShell } from '@/components/template/shell'
import { createSiteFor } from './template-registry'
import { PAGES, TEMPLATE_PREFIX } from './types'
import type { SiteConfig, TemplateId } from './types'

const FONT_FAMILIES: Record<TemplateId, string[]> = {
  xidmet: ['Bricolage Grotesque Variable', 'Instrument Sans Variable'],
  bosh: ['Bricolage Grotesque Variable', 'Instrument Sans Variable'],
  klinika: ['Manrope Variable', 'Instrument Sans Variable'],
  kafe: ['Fraunces Variable', 'Instrument Sans Variable'],
  huquq: ['Fraunces Variable', 'Instrument Sans Variable'],
  gozellik: ['Manrope Variable', 'Instrument Sans Variable'],
  idman: ['Bricolage Grotesque Variable', 'Instrument Sans Variable'],
  tikinti: ['Bricolage Grotesque Variable', 'Instrument Sans Variable'],
  kurs: ['Manrope Variable', 'Instrument Sans Variable'],
  studiya: ['Fraunces Variable', 'Instrument Sans Variable'],
  usaq: ['Bricolage Grotesque Variable', 'Instrument Sans Variable'],
}

const IMAGE_ATTR = /src="(data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+/=]+)"/g
const STOCK_ATTR = /src="(\/images\/[a-z0-9_/-]+\.(webp|jpe?g|png))"/g

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function slugify(value: string): string {
  const folded = value
    .toLowerCase()
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
  return folded.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'sayt'
}

async function fetchBytes(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fayl yüklənmədi: ${url}`)
  return res.arrayBuffer()
}

async function collectCss(): Promise<{ text: string; base: string }[]> {
  const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
  const sheets = await Promise.all(
    links.map(async (link) => {
      const res = await fetch(link.href)
      if (!res.ok) throw new Error('Stil faylı yüklənmədi')
      return { text: await res.text(), base: link.href }
    }),
  )
  if (sheets.length) return sheets
  const text = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText))
    .join('\n')
  return [{ text, base: window.location.href }]
}

async function buildCss(template: TemplateId, addFile: (path: string, data: ArrayBuffer) => void): Promise<string> {
  const families = FONT_FAMILIES[template]
  const sheets = await collectCss()
  const fetched = new Map<string, string>()
  let combined = ''

  for (const sheet of sheets) {
    const blocks = sheet.text.match(/@font-face\s*\{[^}]*\}/g) ?? []
    let css = sheet.text
    for (const block of blocks) {
      const family = /font-family:\s*["']?([^;"']+)/.exec(block)?.[1]?.trim() ?? ''
      const url = /url\(\s*["']?([^)"']+)["']?\s*\)/.exec(block)?.[1]
      const wanted = url && families.includes(family) && /-latin(-ext)?-/.test(url) && !/italic/.test(url)
      if (!wanted) {
        css = css.replace(block, '')
        continue
      }
      const absolute = new URL(url, sheet.base).href
      const name = absolute.split('?')[0].split('/').pop() ?? 'font.woff2'
      if (!fetched.has(absolute)) {
        addFile(`assets/fonts/${name}`, await fetchBytes(absolute))
        fetched.set(absolute, name)
      }
      css = css.replace(block, block.replace(url, `fonts/${name}`))
    }
    combined += css + '\n'
  }
  return combined
}

function extension(mime: string): string {
  return mime === 'jpeg' ? 'jpg' : mime
}

function dataToBytes(dataUrl: string): Uint8Array {
  const binary = atob(dataUrl.slice(dataUrl.indexOf(',') + 1))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

const README = `Bu qovluq hazır saytınızdır. Heç bir proqram və ya verilənlər bazası tələb etmir.

Yükləmək üçün:
1. ZIP faylını açın.
2. Bütün faylları və qovluqları hostinqin əsas qovluğuna yükləyin (adətən public_html və ya www).
3. Domeninizi açın. index.html ana səhifədir.

Qovluqlar:
- index.html, xidmetler, haqqimizda, elaqe: saytın səhifələri
- assets: stil, skript və şriftlər
- images: yüklədiyiniz şəkillər

Bu fayllar statikdir: mətni və şəkli dəyişmək üçün redaktorda dəyişib ZIP-i yenidən yükləyin.
`

export async function buildSiteZip(site: SiteConfig): Promise<Blob> {
  const [{ default: JSZip }, { renderToStaticMarkup }] = await Promise.all([import('jszip'), import('react-dom/server')])

  const zip = new JSZip()
  const defaults = createSiteFor(site.template)
  const text = (key: string) => site.text[key] ?? defaults.text[key] ?? ''
  const brand = text('brand.name')
  const base = `${TEMPLATE_PREFIX}/${site.template}`

  zip.file(
    'assets/site.css',
    await buildCss(site.template, (path, data) => void zip.file(path, data)),
  )
  zip.file('assets/site.js', await fetchBytes('/export/site.js'))

  const images = new Map<string, string>()
  const stock = new Map<string, string>()
  const imageName = (dataUrl: string, mime: string) => {
    let name = images.get(dataUrl)
    if (!name) {
      name = `img-${images.size + 1}.${extension(mime)}`
      images.set(dataUrl, name)
      zip.file(`images/${name}`, dataToBytes(dataUrl))
    }
    return name
  }

  for (const page of PAGES) {
    const route = resolveRoute(site.template, page.path === '/' ? undefined : [page.path.slice(1)])
    if (!route) continue
    const depth = page.path === '/' ? 0 : 1
    const prefix = depth ? '../' : ''

    let body = renderToStaticMarkup(
      <SiteShell template={site.template} editing={false} current={page.key} initialSite={site}>
        <route.View />
      </SiteShell>,
    )

    body = body.replace(new RegExp(`href="${base}(/[a-z]+)?"`, 'g'), (_m, sub?: string) => {
      const target = sub ? `${sub.slice(1)}/` : ''
      return `href="${target ? prefix + target : depth ? '../' : './'}"`
    })
    body = body.replace(IMAGE_ATTR, (_m, dataUrl: string, mime: string) => `src="${prefix}images/${imageName(dataUrl, mime)}"`)

    for (const [, path] of body.matchAll(STOCK_ATTR)) {
      if (!stock.has(path)) {
        const name = `stock-${stock.size + 1}.${path.split('.').pop()}`
        zip.file(`images/${name}`, await fetchBytes(path))
        stock.set(path, name)
      }
    }
    body = body.replace(STOCK_ATTR, (_m, path: string) => `src="${prefix}images/${stock.get(path)}"`)

    const title = page.path === '/' ? brand : `${page.label} | ${brand}`
    const html = `<!doctype html>
<html lang="az">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(text('home.hero.lead'))}">
<meta name="theme-color" content="${escapeHtml(site.theme.accent)}">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="${prefix}assets/site.css">
</head>
<body>
${body}
<script src="${prefix}assets/site.js" defer></script>
</body>
</html>
`
    zip.file(page.path === '/' ? 'index.html' : `${page.path.slice(1)}/index.html`, html)
  }

  zip.file('README.txt', README)
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
}

export async function downloadSiteZip(site: SiteConfig): Promise<void> {
  const blob = await buildSiteZip(site)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${slugify(site.text['brand.name'] ?? 'sayt')}.zip`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
