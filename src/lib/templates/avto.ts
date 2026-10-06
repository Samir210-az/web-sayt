import { build } from './build'
import type { SiteConfig } from '../types'

export function createAvtoSite(): SiteConfig {
  return build('avto', { accent: '#2b44c9', text: { 'brand.name': 'Mator Servis' }, images: [], services: [] })
}
