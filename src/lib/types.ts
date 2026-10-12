export type TemplateId =
  | 'xidmet'
  | 'klinika'
  | 'kafe'
  | 'huquq'
  | 'gozellik'
  | 'idman'
  | 'tikinti'
  | 'kurs'
  | 'studiya'
  | 'usaq'
  | 'emlak'
  | 'avto'
  | 'stomat'
  | 'turizm'
  | 'gul'
  | 'interyer'
  | 'it'
  | 'toy'
  | 'berber'
  | 'icare'
  | 'restoran'
  | 'bosh'

export type PageKey = 'home' | 'services' | 'about' | 'contact'

export interface ImageValue {
  src: string
  alt: string
  focusX: number
  focusY: number
}

export interface ServiceItem {
  id: string
  title: string
  text: string
  image: ImageValue
}

export interface ExtraSection {
  id: string
  title: string
  body: string
  image: ImageValue
  imageSide: 'left' | 'right'
}

export type NavStyle = 'top' | 'center' | 'left' | 'right' | 'bottom'

export const NAV_STYLES: { key: NavStyle; label: string }[] = [
  { key: 'top', label: 'Yuxarıda' },
  { key: 'center', label: 'Ortada' },
  { key: 'left', label: 'Solda' },
  { key: 'right', label: 'Sağda' },
  { key: 'bottom', label: 'Aşağıda' },
]

export type HeroStyle = 'mirror'

export const HERO_MIRROR_TEMPLATES: TemplateId[] = [
  'klinika',
  'gozellik',
  'idman',
  'tikinti',
  'kurs',
  'usaq',
  'emlak',
  'turizm',
  'gul',
  'it',
  'icare',
  'restoran',
]

export interface LayoutConfig {
  nav?: NavStyle
  hero?: HeroStyle
  order?: string[]
}

export interface SiteConfig {
  version: 1
  template: TemplateId
  theme: { accent: string }
  logo: ImageValue
  text: Record<string, string>
  images: Record<string, ImageValue>
  services: ServiceItem[]
  extras: Record<PageKey, ExtraSection[]>
  hidden: Record<string, boolean>
  layout?: LayoutConfig
}

export const PAGES: { key: PageKey; label: string; path: string }[] = [
  { key: 'home', label: 'Ana səhifə', path: '/' },
  { key: 'services', label: 'Xidmətlər', path: '/xidmetler' },
  { key: 'about', label: 'Haqqımızda', path: '/haqqimizda' },
  { key: 'contact', label: 'Əlaqə', path: '/elaqe' },
]

export const EDITOR_PREFIX = '/redaktor'
export const TEMPLATE_PREFIX = '/shablon'
