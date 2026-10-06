import { withArt } from './art'
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
  createUsaqSite,
} from './templates/more'
import type { SiteConfig, TemplateId } from './types'

export interface TemplateMeta {
  id: TemplateId
  name: string
  kind: string
  create: () => SiteConfig
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'xidmet', name: 'Evdar', kind: 'Xidmət şirkətləri', create: () => withArt('xidmet', createDefaultSite()) },
  { id: 'klinika', name: 'Nur Klinika', kind: 'Klinika və tibb mərkəzləri', create: () => withArt('klinika', createKlinikaSite()) },
  { id: 'usaq', name: 'Kiçik Addım', kind: 'Uşaq psixoloji mərkəzləri', create: () => withArt('usaq', createUsaqSite()) },
  { id: 'kafe', name: 'Dəmlik Kafe', kind: 'Kafe və restoranlar', create: () => withArt('kafe', createKafeSite()) },
  { id: 'huquq', name: 'Hüquq Evi', kind: 'Hüquq və vəkil bürosları', create: createHuquqSite },
  { id: 'gozellik', name: 'Lalə Gözəllik', kind: 'Gözəllik salonları', create: () => withArt('gozellik', createGozellikSite()) },
  { id: 'idman', name: 'Güc Zal', kind: 'İdman zalları və studiyalar', create: () => withArt('idman', createIdmanSite()) },
  { id: 'tikinti', name: 'Təməl Tikinti', kind: 'Tikinti və təmir şirkətləri', create: () => withArt('tikinti', createTikintiSite()) },
  { id: 'kurs', name: 'Bilik Mərkəzi', kind: 'Kurs və təhsil mərkəzləri', create: () => withArt('kurs', createKursSite()) },
  { id: 'studiya', name: 'Kadr Studio', kind: 'Foto və video studiyaları', create: () => withArt('studiya', createStudiyaSite()) },
  { id: 'bosh', name: 'Sıfırdan başla', kind: 'Boş şablon, özünüz qurun', create: createBoshSite },
]

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

export function createSiteFor(id: TemplateId): SiteConfig {
  const meta = getTemplate(id)
  return (meta ?? TEMPLATES[0]).create()
}
