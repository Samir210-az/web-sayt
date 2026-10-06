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
}

export const PAGES: { key: PageKey; label: string; path: string }[] = [
  { key: 'home', label: 'Ana səhifə', path: '/' },
  { key: 'services', label: 'Xidmətlər', path: '/xidmetler' },
  { key: 'about', label: 'Haqqımızda', path: '/haqqimizda' },
  { key: 'contact', label: 'Əlaqə', path: '/elaqe' },
]

export const EDITOR_PREFIX = '/redaktor'
export const TEMPLATE_PREFIX = '/shablon'
