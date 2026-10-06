import type { Metadata } from 'next'
import { SiteShell } from '@/components/template/shell'
import { ServicesPage } from '@/components/template/pages'

export const metadata: Metadata = { title: 'Xidmətlər' }

export default function Page() {
  return (
    <SiteShell editing={false} current="services">
      <ServicesPage />
    </SiteShell>
  )
}
