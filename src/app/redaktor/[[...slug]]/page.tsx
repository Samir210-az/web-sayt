import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutPage, ContactPage, HomePage, ServicesPage } from '@/components/template/pages'
import { SiteShell } from '@/components/template/shell'

export const metadata: Metadata = {
  title: 'Redaktor',
  robots: { index: false, follow: false },
}

const ROUTES = {
  '': { current: 'home', View: HomePage },
  xidmetler: { current: 'services', View: ServicesPage },
  haqqimizda: { current: 'about', View: AboutPage },
  elaqe: { current: 'contact', View: ContactPage },
} as const

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  if (slug && slug.length > 1) notFound()
  const key = (slug?.[0] ?? '') as keyof typeof ROUTES
  const route = Object.prototype.hasOwnProperty.call(ROUTES, key) ? ROUTES[key] : null
  if (!route) notFound()

  return (
    <SiteShell editing current={route.current}>
      <route.View />
    </SiteShell>
  )
}
