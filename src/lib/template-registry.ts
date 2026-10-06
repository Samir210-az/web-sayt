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
import { createEmlakSite } from './templates/emlak'
import { createAvtoSite } from './templates/avto'
import { createStomatSite } from './templates/stomat'
import { createTurizmSite } from './templates/turizm'
import { createGulSite } from './templates/gul'
import { createInteryerSite } from './templates/interyer'
import { createItSite } from './templates/it'
import { createToySite } from './templates/toy'
import { createBerberSite } from './templates/berber'
import type { SiteConfig, TemplateId } from './types'

export interface TemplateMeta {
  id: TemplateId
  name: string
  kind: string
  create: () => SiteConfig
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'xidmet', name: 'Usta', kind: 'Xidmət şirkətləri', create: () => withArt('xidmet', createDefaultSite()) },
  { id: 'klinika', name: 'Nur Klinika', kind: 'Klinika və tibb mərkəzləri', create: () => withArt('klinika', createKlinikaSite()) },
  { id: 'usaq', name: 'Kiçik Addım', kind: 'Uşaq psixoloji mərkəzləri', create: () => withArt('usaq', createUsaqSite()) },
  { id: 'kafe', name: 'Dəmlik Kafe', kind: 'Kafe və restoranlar', create: () => withArt('kafe', createKafeSite()) },
  { id: 'huquq', name: 'Hüquq Evi', kind: 'Hüquq və vəkil bürosları', create: createHuquqSite },
  { id: 'gozellik', name: 'Lalə Gözəllik', kind: 'Gözəllik salonları', create: () => withArt('gozellik', createGozellikSite()) },
  { id: 'idman', name: 'Güc Zal', kind: 'İdman zalları və studiyalar', create: () => withArt('idman', createIdmanSite()) },
  { id: 'tikinti', name: 'Təməl Tikinti', kind: 'Tikinti və təmir şirkətləri', create: () => withArt('tikinti', createTikintiSite()) },
  { id: 'kurs', name: 'Bilik Mərkəzi', kind: 'Kurs və təhsil mərkəzləri', create: () => withArt('kurs', createKursSite()) },
  { id: 'studiya', name: 'Kadr Studio', kind: 'Foto və video studiyaları', create: () => withArt('studiya', createStudiyaSite()) },
  { id: 'emlak', name: 'Dəyər Əmlak', kind: 'Əmlak agentlikləri', create: () => withArt('emlak', createEmlakSite()) },
  { id: 'avto', name: 'Mator Servis', kind: 'Avtoservis və avtosalonlar', create: () => withArt('avto', createAvtoSite()) },
  { id: 'stomat', name: 'Ağ Təbəssüm', kind: 'Stomatologiya klinikaları', create: () => withArt('stomat', createStomatSite()) },
  { id: 'turizm', name: 'Yol Əhli', kind: 'Turizm agentlikləri', create: () => withArt('turizm', createTurizmSite()) },
  { id: 'gul', name: 'Qönçə', kind: 'Gül və hədiyyə mağazaları', create: () => withArt('gul', createGulSite()) },
  { id: 'interyer', name: 'Ölçü Studio', kind: 'İnteryer və mebel studiyaları', create: () => withArt('interyer', createInteryerSite()) },
  { id: 'it', name: 'Kod Zavodu', kind: 'IT və proqram şirkətləri', create: () => withArt('it', createItSite()) },
  { id: 'toy', name: 'Şölən Saray', kind: 'Toy və tədbir salonları', create: () => withArt('toy', createToySite()) },
  { id: 'berber', name: 'Tiğ Bərbər', kind: 'Bərbər və kişi salonları', create: () => withArt('berber', createBerberSite()) },
  { id: 'bosh', name: 'Sıfırdan başla', kind: 'Boş şablon, özünüz qurun', create: createBoshSite },
]

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

export function createSiteFor(id: TemplateId): SiteConfig {
  const meta = getTemplate(id)
  return (meta ?? TEMPLATES[0]).create()
}
