import type { Metadata } from 'next'
import { SiteShell } from '@/components/template/shell'
import { ContactPage } from '@/components/template/pages'

export const metadata: Metadata = { title: 'Əlaqə' }

export default function Page() {
  return (
    <SiteShell editing={false} current="contact">
      <ContactPage />
    </SiteShell>
  )
}
