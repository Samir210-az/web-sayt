import { build } from './build'
import type { SiteConfig } from '../types'

export function createStomatSite(): SiteConfig {
  return build('stomat', { accent: '#2b44c9', text: { 'brand.name': 'Ağ Təbəssüm' }, images: [], services: [] })
}
