import { build } from './build'
import type { SiteConfig } from '../types'

export function createItSite(): SiteConfig {
  return build('it', { accent: '#2b44c9', text: { 'brand.name': 'Kod Zavodu' }, images: [], services: [] })
}
