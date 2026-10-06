import { build } from './build'
import type { SiteConfig } from '../types'

export function createGulSite(): SiteConfig {
  return build('gul', { accent: '#2b44c9', text: { 'brand.name': 'Qönçə' }, images: [], services: [] })
}
