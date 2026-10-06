import type { Metadata } from 'next'
import { SiteShell } from '@/components/template/shell'
import { AboutPage } from '@/components/template/pages'

export const metadata: Metadata = { title: 'Haqqımızda' }

export default function Page() {
  return (
    <SiteShell editing={false} current="about">
      <AboutPage />
    </SiteShell>
  )
}
