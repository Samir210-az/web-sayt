import { build } from './build'
import type { SiteConfig } from '../types'

export function createBerberSite(): SiteConfig {
  return build('berber', { accent: '#2b44c9', text: { 'brand.name': 'Tiğ Bərbər' }, images: [], services: [] })
}
