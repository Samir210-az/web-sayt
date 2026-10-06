import type { Metadata } from 'next'
import { PublishedSite } from '@/components/published-site'

type Params = Promise<{ subdomain: string; slug?: string[] }>

export const metadata: Metadata = { title: 'Sayt yüklənir' }

export default async function Page({ params }: { params: Params }) {
  const { subdomain, slug } = await params
  return <PublishedSite name={subdomain} slug={slug} />
}
