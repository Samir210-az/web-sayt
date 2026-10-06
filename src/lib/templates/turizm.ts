import { build } from './build'
import type { SiteConfig } from '../types'

export function createTurizmSite(): SiteConfig {
  return build('turizm', { accent: '#2b44c9', text: { 'brand.name': 'Yol Əhli' }, images: [], services: [] })
}
