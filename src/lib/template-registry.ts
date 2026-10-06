import { createDefaultSite } from './default-site'
import { createBoshSite } from './templates/bosh'
import { createKafeSite } from './templates/kafe'
import { createKlinikaSite } from './templates/klinika'
import {
  createGozellikSite,
  createHuquqSite,
  createIdmanSite,
  createKursSite,
  createStudiyaSite,
  createTikintiSite,
} from './templates/more'
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
  { id: 'huquq', name: 'Hüquq Evi', kind: 'Hüquq və vəkil bürosları', create: createHuquqSite },
  { id: 'gozellik', name: 'Lalə Gözəllik', kind: 'Gözəllik salonları', create: createGozellikSite },
  { id: 'idman', name: 'Güc Zal', kind: 'İdman zalları və studiyalar', create: createIdmanSite },
  { id: 'tikinti', name: 'Təməl Tikinti', kind: 'Tikinti və təmir şirkətləri', create: createTikintiSite },
  { id: 'kurs', name: 'Bilik Mərkəzi', kind: 'Kurs və təhsil mərkəzləri', create: createKursSite },
  { id: 'studiya', name: 'Kadr Studio', kind: 'Foto və video studiyaları', create: createStudiyaSite },
  { id: 'bosh', name: 'Sıfırdan başla', kind: 'Boş şablon, özünüz qurun', create: createBoshSite },
]

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

export function createSiteFor(id: TemplateId): SiteConfig {
  const meta = getTemplate(id)
  return (meta ?? TEMPLATES[0]).create()
}
