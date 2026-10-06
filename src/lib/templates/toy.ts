import { build } from './build'
import type { SiteConfig } from '../types'

export function createToySite(): SiteConfig {
  return build('toy', { accent: '#2b44c9', text: { 'brand.name': 'Şölən Saray' }, images: [], services: [] })
}
