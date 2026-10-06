import { PAGES } from '@/lib/types'
import type { PageKey } from '@/lib/types'
import { TEMPLATES } from '@/lib/template-registry'
import { AboutPage, ContactPage, HomePage, ServicesPage } from './pages'

const VIEWS = {
  home: HomePage,
  services: ServicesPage,
  about: AboutPage,
  contact: ContactPage,
}

export interface TemplateRoute {
  key: PageKey
  label: string
  View: () => React.JSX.Element
}

export function resolveRoute(slug?: string[]): TemplateRoute | null {
  if (slug && slug.length > 1) return null
  const path = slug?.[0] ? `/${slug[0]}` : '/'
  const page = PAGES.find((p) => p.path === path)
  return page ? { key: page.key, label: page.label, View: VIEWS[page.key] } : null
}

export function templateStaticParams() {
  return TEMPLATES.flatMap((t) => [
    { template: t.id },
    ...PAGES.filter((p) => p.path !== '/').map((p) => ({ template: t.id, slug: [p.path.slice(1)] })),
  ])
}
