import { get, ref, update } from 'firebase/database'
import { getFirebaseApp, getFirebaseDb } from './firebase'
import { createSiteFor, getTemplate, TEMPLATES } from './template-registry'
import type { ExtraSection, ImageValue, PageKey, ServiceItem, SiteConfig, TemplateId } from './types'

const HEX = /^#[0-9a-fA-F]{6}$/
const IMAGE_SRC =
  /^(data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+/=]+|https:\/\/[^\s"'<>]+|\/images\/[a-z0-9_-]+(\/[a-z0-9_-]+)*\.(webp|jpe?g|png))$/
const PAGE_KEYS: PageKey[] = ['home', 'services', 'about', 'contact']
const MAX_BYTES = 8_000_000

export const SUBDOMAIN = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/
export const RESERVED_SUBDOMAINS = ['www', 'admin', 'api', 'app', 'mail', 'redaktor', 'static', 'cdn', 'dashboard', 'login']

export interface PublishInfo {
  name: string
  publishedAt: number
}

export class SubdomainTakenError extends Error {
  constructor() {
    super('Ünvan tutulub')
    this.name = 'SubdomainTakenError'
  }
}

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

async function readSiteNode(uid: string, template: TemplateId): Promise<unknown> {
  try {
    const snap = await get(ref(getFirebaseDb(), `sites/${siteId(uid, template)}`))
    return snap.val()
  } catch (e) {
    // qaydalar boş düyünü oxumağa icazə vermir, yəni sayt hələ yaradılmayıb
    if (isRecord(e) && e.code === 'PERMISSION_DENIED') return null
    throw e
  }
}

export async function loadSite(uid: string, template: TemplateId): Promise<SiteConfig | null> {
  const value = await readSiteNode(uid, template)
  if (!isRecord(value) || value.ownerId !== uid) return null
  return decodeSite(value.draft, template)
}

export interface SiteSummary {
  template: TemplateId
  updatedAt: number
  publish: PublishInfo | null
}

export async function listSites(uid: string): Promise<SiteSummary[]> {
  const values = await Promise.all(TEMPLATES.map((t) => readSiteNode(uid, t.id)))
  const out: SiteSummary[] = []
  values.forEach((value, i) => {
    if (!isRecord(value) || value.ownerId !== uid) return
    const published =
      typeof value.subdomain === 'string' && typeof value.publishedAt === 'number'
        ? { name: value.subdomain, publishedAt: value.publishedAt }
        : null
    out.push({
      template: TEMPLATES[i].id,
      updatedAt: typeof value.updatedAt === 'number' ? value.updatedAt : 0,
      publish: published,
    })
  })
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function saveSite(uid: string, site: SiteConfig): Promise<void> {
  const draft = encodeSite(site)
  if (JSON.stringify(draft).length > MAX_BYTES) throw new SiteTooLargeError()
  await update(ref(getFirebaseDb(), `sites/${siteId(uid, site.template)}`), {
    ownerId: uid,
    template: site.template,
    updatedAt: Date.now(),
    draft,
  })
}

export async function uploadDataUrl(uid: string, dataUrl: string): Promise<string> {
  const { getDownloadURL, getStorage, ref: storageRef, uploadBytes } = await import('firebase/storage')
  const blob = await (await fetch(dataUrl)).blob()
  const target = storageRef(getStorage(getFirebaseApp()), `sites/${uid}/${crypto.randomUUID()}.webp`)
  await uploadBytes(target, blob, { contentType: 'image/webp' })
  return getDownloadURL(target)
}

export async function moveImagesToStorage(
  site: SiteConfig,
  upload: (dataUrl: string) => Promise<string>,
): Promise<SiteConfig> {
  const cache = new Map<string, Promise<string>>()
  const move = async (image: ImageValue): Promise<ImageValue> => {
    if (!image.src.startsWith('data:')) return image
    let url = cache.get(image.src)
    if (!url) {
      url = upload(image.src)
      cache.set(image.src, url)
    }
    return { ...image, src: await url }
  }

  const images = Object.fromEntries(await Promise.all(Object.entries(site.images).map(async ([k, v]) => [k, await move(v)])))
  const services = await Promise.all(site.services.map(async (item) => ({ ...item, image: await move(item.image) })))
  const extras = { ...site.extras }
  for (const page of PAGE_KEYS) {
    extras[page] = await Promise.all(site.extras[page].map(async (item) => ({ ...item, image: await move(item.image) })))
  }
  return { ...site, logo: await move(site.logo), images, services, extras }
}

export async function loadPublishInfo(uid: string, template: TemplateId): Promise<PublishInfo | null> {
  const value = await readSiteNode(uid, template)
  if (!isRecord(value) || value.ownerId !== uid) return null
  if (typeof value.subdomain !== 'string' || typeof value.publishedAt !== 'number') return null
  return { name: value.subdomain, publishedAt: value.publishedAt }
}

export async function publishSite(uid: string, site: SiteConfig, name: string): Promise<void> {
  if (!SUBDOMAIN.test(name) || RESERVED_SUBDOMAINS.includes(name)) throw new Error('Ünvan düzgün deyil')
  const db = getFirebaseDb()
  const id = siteId(uid, site.template)

  const existing = await get(ref(db, `subdomains/${name}`))
  const owner = existing.exists() && isRecord(existing.val()) ? existing.val().ownerId : null
  if (existing.exists() && owner !== uid) throw new SubdomainTakenError()

  const draft = encodeSite(site)
  if (JSON.stringify(draft).length > MAX_BYTES) throw new SiteTooLargeError()

  const previous = await loadPublishInfo(uid, site.template)
  const now = Date.now()
  const changes: Record<string, unknown> = {
    [`sites/${id}/subdomain`]: name,
    [`sites/${id}/publishedAt`]: now,
    [`published/${name}`]: { template: site.template, publishedAt: now, draft },
  }
  if (!existing.exists()) changes[`subdomains/${name}`] = { ownerId: uid, siteId: id }
  if (previous && previous.name !== name) {
    changes[`subdomains/${previous.name}`] = null
    changes[`published/${previous.name}`] = null
  }
  await update(ref(db), changes)
}

export async function unpublishSite(uid: string, template: TemplateId): Promise<void> {
  const previous = await loadPublishInfo(uid, template)
  if (!previous) return
  const id = siteId(uid, template)
  await update(ref(getFirebaseDb()), {
    [`sites/${id}/subdomain`]: null,
    [`sites/${id}/publishedAt`]: null,
    [`subdomains/${previous.name}`]: null,
    [`published/${previous.name}`]: null,
  })
}

export async function loadPublished(name: string): Promise<SiteConfig | null> {
  if (!SUBDOMAIN.test(name)) return null
  const snap = await get(ref(getFirebaseDb(), `published/${name}`))
  const value = snap.val()
  if (!isRecord(value) || typeof value.template !== 'string') return null
  const meta = getTemplate(value.template)
  return meta ? decodeSite(value.draft, meta.id) : null
}
