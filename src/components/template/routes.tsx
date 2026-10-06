import { PAGES } from '@/lib/types'
import type { PageKey, TemplateId } from '@/lib/types'
import { TEMPLATES } from '@/lib/template-registry'
import { HomeBosh, HomeKafe, HomeKlinika, HomeXidmet } from './homes'
import { HomeGozellik, HomeHuquq, HomeIdman, HomeKurs, HomeStudiya, HomeTikinti } from './homes-more'
import { AboutPage, ContactPage, ServicesPage } from './pages'

const HOMES = {
  xidmet: HomeXidmet,
  klinika: HomeKlinika,
  kafe: HomeKafe,
  huquq: HomeHuquq,
  gozellik: HomeGozellik,
  idman: HomeIdman,
  tikinti: HomeTikinti,
  kurs: HomeKurs,
  studiya: HomeStudiya,
  bosh: HomeBosh,
}

const VIEWS = {
  services: ServicesPage,
  about: AboutPage,
  contact: ContactPage,
}

export interface TemplateRoute {
  key: PageKey
  label: string
  View: () => React.JSX.Element
}

export function resolveRoute(template: TemplateId, slug?: string[]): TemplateRoute | null {
  if (slug && slug.length > 1) return null
  const path = slug?.[0] ? `/${slug[0]}` : '/'
  const page = PAGES.find((p) => p.path === path)
  if (!page) return null
  const View = page.key === 'home' ? HOMES[template] : VIEWS[page.key]
  return { key: page.key, label: page.label, View }
}

export function templateStaticParams() {
  return TEMPLATES.flatMap((t) => [
    { template: t.id },
    ...PAGES.filter((p) => p.path !== '/').map((p) => ({ template: t.id, slug: [p.path.slice(1)] })),
  ])
}
