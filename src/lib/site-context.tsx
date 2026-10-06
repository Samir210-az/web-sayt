'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_ACCENT } from './default-site'
import { createSiteFor } from './template-registry'
import type { ExtraSection, ImageValue, PageKey, ServiceItem, SiteConfig, TemplateId } from './types'

const draftKey = (template: TemplateId) => `web-sayt:draft:v1:${template}`
const HEX = /^#[0-9a-fA-F]{6}$/

export interface Persistence {
  load: () => Promise<SiteConfig | null>
  save: (site: SiteConfig) => Promise<void>
}

const PersistenceContext = createContext<Persistence | null>(null)
export const PersistenceProvider = PersistenceContext.Provider

export type SaveState = 'idle' | 'saving' | 'saved' | 'error' | 'too-large' | 'load-error'

interface SiteApi {
  site: SiteConfig
  editing: boolean
  saveState: SaveState
  storage: 'account' | 'local'
  text: (key: string) => string
  image: (key: string) => ImageValue
  setText: (key: string, value: string) => void
  setImage: (key: string, value: ImageValue) => void
  setLogo: (value: ImageValue) => void
  setAccent: (value: string) => void
  updateService: (id: string, patch: Partial<Omit<ServiceItem, 'id'>>) => void
  addService: () => void
  removeService: (id: string) => void
  addExtra: (page: PageKey) => void
  updateExtra: (page: PageKey, id: string, patch: Partial<Omit<ExtraSection, 'id'>>) => void
  removeExtra: (page: PageKey, id: string) => void
  toggleHidden: (id: string) => void
  reset: () => void
}

const SiteContext = createContext<SiteApi | null>(null)

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID().slice(0, 8)
  return Math.random().toString(36).slice(2, 10)
}

function emptyImage(alt: string): ImageValue {
  return { src: '', alt, focusX: 50, focusY: 50 }
}

function readDraft(template: TemplateId): SiteConfig | null {
  try {
    const raw = window.localStorage.getItem(draftKey(template))
    if (!raw) return null
    const parsed = JSON.parse(raw) as SiteConfig
    if (parsed.version !== 1 || parsed.template !== template || !HEX.test(parsed.theme?.accent ?? '')) return null
    return parsed
  } catch {
    return null
  }
}

export function SiteProvider({
  template,
  editing,
  initialSite,
  children,
}: {
  template: TemplateId
  editing: boolean
  initialSite?: SiteConfig
  children: ReactNode
}) {
  const [site, setSite] = useState<SiteConfig>(() => initialSite ?? createSiteFor(template))
  const persistence = useContext(PersistenceContext)
  const remote = editing && persistence !== null
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [ready, setReady] = useState(!remote)
  const loaded = useRef(false)

  useEffect(() => {
    let cancelled = false
    loaded.current = false

    if (remote && persistence) {
      setReady(false)
      persistence
        .load()
        .then((stored) => {
          if (cancelled) return
          if (stored) setSite(stored)
          loaded.current = true
          setReady(true)
        })
        .catch(() => {
          if (cancelled) return
          setSaveState('load-error')
          setReady(true)
        })
    } else {
      const draft = readDraft(template)
      if (draft) setSite(draft)
      loaded.current = true
      setReady(true)
    }

    return () => {
      cancelled = true
    }
  }, [remote, persistence, template])

  useEffect(() => {
    if (!editing || !loaded.current) return
    const timer = window.setTimeout(async () => {
      if (remote && persistence) {
        setSaveState('saving')
        try {
          await persistence.save(site)
          setSaveState('saved')
        } catch (e) {
          setSaveState(e instanceof Error && e.name === 'SiteTooLargeError' ? 'too-large' : 'error')
        }
        return
      }
      try {
        window.localStorage.setItem(draftKey(template), JSON.stringify(site))
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    }, remote ? 1200 : 600)
    return () => window.clearTimeout(timer)
  }, [site, editing, template, remote, persistence])

  const update = useCallback((fn: (prev: SiteConfig) => SiteConfig) => setSite(fn), [])

  const api = useMemo<SiteApi>(() => {
    const defaults = createSiteFor(template)
    return {
      site,
      editing,
      saveState,
      storage: remote ? 'account' : 'local',
      text: (key) => site.text[key] ?? defaults.text[key] ?? '',
      image: (key) => site.images[key] ?? defaults.images[key] ?? emptyImage(''),
      setText: (key, value) => update((s) => ({ ...s, text: { ...s.text, [key]: value } })),
      setImage: (key, value) => update((s) => ({ ...s, images: { ...s.images, [key]: value } })),
      setLogo: (value) => update((s) => ({ ...s, logo: value })),
      setAccent: (value) => {
        if (!HEX.test(value)) return
        update((s) => ({ ...s, theme: { ...s.theme, accent: value } }))
      },
      updateService: (id, patch) =>
        update((s) => ({ ...s, services: s.services.map((it) => (it.id === id ? { ...it, ...patch } : it)) })),
      addService: () =>
        update((s) => ({
          ...s,
          services: [
            ...s.services,
            { id: newId(), title: 'Yeni xidmət', text: 'Xidmətin qısa təsvirini yazın.', image: emptyImage('Xidmət şəkli') },
          ],
        })),
      removeService: (id) => update((s) => ({ ...s, services: s.services.filter((it) => it.id !== id) })),
      addExtra: (page) =>
        update((s) => ({
          ...s,
          extras: {
            ...s.extras,
            [page]: [
              ...s.extras[page],
              {
                id: newId(),
                title: 'Yeni bölmə',
                body: 'Bölmənin mətnini yazın.',
                image: emptyImage('Bölmə şəkli'),
                imageSide: s.extras[page].length % 2 === 0 ? 'right' : 'left',
              },
            ],
          },
        })),
      updateExtra: (page, id, patch) =>
        update((s) => ({
          ...s,
          extras: { ...s.extras, [page]: s.extras[page].map((it) => (it.id === id ? { ...it, ...patch } : it)) },
        })),
      removeExtra: (page, id) =>
        update((s) => ({ ...s, extras: { ...s.extras, [page]: s.extras[page].filter((it) => it.id !== id) } })),
      toggleHidden: (id) => update((s) => ({ ...s, hidden: { ...s.hidden, [id]: !s.hidden[id] } })),
      reset: () => {
        try {
          window.localStorage.removeItem(draftKey(template))
        } catch {
          /* storage may be blocked */
        }
        setSite(createSiteFor(template))
        setSaveState('idle')
      },
    }
  }, [site, editing, saveState, remote, template, update])

  const accent = HEX.test(site.theme.accent) ? site.theme.accent : DEFAULT_ACCENT

  return (
    <SiteContext.Provider value={api}>
      <div className="site" data-template={template} style={{ ['--accent' as string]: accent }}>
        {ready ? children : <p className="site__loading">Saytınız yüklənir…</p>}
      </div>
    </SiteContext.Provider>
  )
}

export function useSite(): SiteApi {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite yalnız SiteProvider daxilində işləyir')
  return ctx
}
