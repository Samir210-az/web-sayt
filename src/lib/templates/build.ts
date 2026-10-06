import { img, service } from '../default-site'
import type { SiteConfig, TemplateId } from '../types'

export interface Spec {
  accent: string
  text: Record<string, string>
  images: [string, string, string?, number?, number?][]
  services: [string, string, string, string?][]
}

export function build(template: TemplateId, spec: Spec): SiteConfig {
  return {
    version: 1,
    template,
    theme: { accent: spec.accent },
    logo: img('Loqo'),
    text: { 'footer.text': 'Bütün hüquqlar qorunur.', ...spec.text },
    images: Object.fromEntries(spec.images.map(([key, alt, src, fx, fy]) => [key, img(alt, fx, fy, src)])),
    services: spec.services.map(([title, text, alt, src], i) => service(`s${i + 1}`, title, text, alt, src)),
    extras: { home: [], services: [], about: [], contact: [] },
    hidden: {},
  }
}
