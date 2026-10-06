import { build } from './build'
import type { SiteConfig } from '../types'

export function createInteryerSite(): SiteConfig {
  return build('interyer', { accent: '#2b44c9', text: { 'brand.name': 'Ölçü Studio' }, images: [], services: [] })
}
