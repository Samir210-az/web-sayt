import { get, ref, set } from 'firebase/database'
import { getFirebaseDb } from './firebase'
import { createSiteFor } from './template-registry'
import type { ExtraSection, ImageValue, PageKey, ServiceItem, SiteConfig, TemplateId } from './types'

const HEX = /^#[0-9a-fA-F]{6}$/
const IMAGE_SRC =
  /^(data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+/=]+|https:\/\/[^\s"'<>]+|\/images\/[a-z0-9_-]+(\/[a-z0-9_-]+)*\.(webp|jpe?g|png))$/
const PAGE_KEYS: PageKey[] = ['home', 'services', 'about', 'contact']
const MAX_BYTES = 8_000_000

export class SiteTooLargeError extends Error {
  constructor() {
    super('Sayt çox böyükdür')
    this.name = 'SiteTooLargeError'
  }
}

export const siteId = (uid: string, template: TemplateId) => `${uid}_${template}`

const encodeKey = (key: string) => key.replace(/\./g, '~')
const decodeKey = (key: string) => key.replace(/~/g, '.')

function encodeMap<T>(map: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [encodeKey(k), v]))
}

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.filter((v) => v != null)
  if (value && typeof value === 'object') return Object.values(value).filter((v) => v != null)
  return []
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

function cleanImage(value: unknown, fallback: ImageValue): ImageValue {
  if (!isRecord(value)) return fallback
  const src = typeof value.src === 'string' && (value.src === '' || IMAGE_SRC.test(value.src)) ? value.src : ''
  const clamp = (n: unknown) => (typeof n === 'number' && n >= 0 && n <= 100 ? n : 50)
  return {
    src,
    alt: typeof value.alt === 'string' ? value.alt.slice(0, 200) : fallback.alt,
    focusX: clamp(value.focusX),
    focusY: clamp(value.focusY),
  }
}

function cleanStrings(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {}
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(value)) if (typeof v === 'string') out[decodeKey(k)] = v
  return out
}

export function decodeSite(raw: unknown, template: TemplateId): SiteConfig {
  const base = createSiteFor(template)
  if (!isRecord(raw)) return base
  const empty: ImageValue = { src: '', alt: '', focusX: 50, focusY: 50 }

  const images: Record<string, ImageValue> = {}
  if (isRecord(raw.images)) {
    for (const [k, v] of Object.entries(raw.images)) {
      const key = decodeKey(k)
      images[key] = cleanImage(v, base.images[key] ?? empty)
    }
  }

  const services: ServiceItem[] = toArray(raw.services).flatMap((item) => {
    if (!isRecord(item) || typeof item.id !== 'string') return []
    return [
      {
        id: item.id.slice(0, 40),
        title: typeof item.title === 'string' ? item.title : '',
        text: typeof item.text === 'string' ? item.text : '',
        image: cleanImage(item.image, empty),
      },
    ]
  })

  const extras = { home: [], services: [], about: [], contact: [] } as Record<PageKey, ExtraSection[]>
  const rawExtras = isRecord(raw.extras) ? raw.extras : {}
  for (const page of PAGE_KEYS) {
    extras[page] = toArray(rawExtras[page]).flatMap((item) => {
      if (!isRecord(item) || typeof item.id !== 'string') return []
      return [
        {
          id: item.id.slice(0, 40),
          title: typeof item.title === 'string' ? item.title : '',
          body: typeof item.body === 'string' ? item.body : '',
          image: cleanImage(item.image, empty),
          imageSide: item.imageSide === 'left' ? 'left' : 'right',
        },
      ]
    })
  }

  const hidden: Record<string, boolean> = {}
  if (isRecord(raw.hidden)) {
    for (const [k, v] of Object.entries(raw.hidden)) if (v === true) hidden[decodeKey(k)] = true
  }

  const accent = isRecord(raw.theme) && typeof raw.theme.accent === 'string' ? raw.theme.accent : ''

  return {
    version: 1,
    template,
    theme: { accent: HEX.test(accent) ? accent : base.theme.accent },
    logo: cleanImage(raw.logo, base.logo),
    text: cleanStrings(raw.text),
    images,
    services,
    extras,
    hidden,
  }
}

export function encodeSite(site: SiteConfig) {
  return JSON.parse(
    JSON.stringify({
      version: site.version,
      theme: site.theme,
      logo: site.logo,
      text: encodeMap(site.text),
      images: encodeMap(site.images),
      services: site.services,
      extras: site.extras,
      hidden: encodeMap(site.hidden),
    }),
  )
}

export async function loadSite(uid: string, template: TemplateId): Promise<SiteConfig | null> {
  const snap = await get(ref(getFirebaseDb(), `sites/${siteId(uid, template)}`))
  if (!snap.exists()) return null
  const value = snap.val()
  if (!isRecord(value) || value.ownerId !== uid) return null
  return decodeSite(value.draft, template)
}

export async function saveSite(uid: string, site: SiteConfig): Promise<void> {
  const draft = encodeSite(site)
  if (JSON.stringify(draft).length > MAX_BYTES) throw new SiteTooLargeError()
  await set(ref(getFirebaseDb(), `sites/${siteId(uid, site.template)}`), {
    ownerId: uid,
    template: site.template,
    updatedAt: Date.now(),
    draft,
  })
}
