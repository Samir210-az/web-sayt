import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { resolveRoute, templateStaticParams } from '@/components/template/routes'
import { SiteShell } from '@/components/template/shell'
import { getTemplate } from '@/lib/template-registry'

type Params = Promise<{ template: string; slug?: string[] }>

export const generateStaticParams = templateStaticParams

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { template, slug } = await params
  const meta = getTemplate(template)
  const route = resolveRoute(slug)
  if (!meta || !route) return {}
  return { title: route.key === 'home' ? `${meta.name}: nümunə şablon` : `${route.label} | ${meta.name}` }
}

export default async function Page({ params }: { params: Params }) {
  const { template, slug } = await params
  const meta = getTemplate(template)
  const route = resolveRoute(slug)
  if (!meta || !route) notFound()

  return (
    <SiteShell template={meta.id} editing={false} current={route.key} demoBar>
      <route.View />
    </SiteShell>
  )
}
