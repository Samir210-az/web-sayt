import { build } from './build'
import type { SiteConfig } from '../types'

export function createEmlakSite(): SiteConfig {
  return build('emlak', { accent: '#2b44c9', text: { 'brand.name': 'Dəyər Əmlak' }, images: [], services: [] })
}
