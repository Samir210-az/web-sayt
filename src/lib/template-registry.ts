import { createDefaultSite } from './default-site'
import { createBoshSite } from './templates/bosh'
import { createKafeSite } from './templates/kafe'
import { createKlinikaSite } from './templates/klinika'
import type { SiteConfig, TemplateId } from './types'

export interface TemplateMeta {
  id: TemplateId
  name: string
  kind: string
  create: () => SiteConfig
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'xidmet', name: 'Evdar', kind: 'Xidmət şirkətləri', create: createDefaultSite },
  { id: 'klinika', name: 'Nur Klinika', kind: 'Klinika və tibb mərkəzləri', create: createKlinikaSite },
  { id: 'kafe', name: 'Dəmlik Kafe', kind: 'Kafe və restoranlar', create: createKafeSite },
  { id: 'bosh', name: 'Sıfırdan başla', kind: 'Boş şablon, özünüz qurun', create: createBoshSite },
]

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

export function createSiteFor(id: TemplateId): SiteConfig {
  const meta = getTemplate(id)
  return (meta ?? TEMPLATES[0]).create()
}
