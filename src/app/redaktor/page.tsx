import type { Metadata } from 'next'
import Link from 'next/link'
import { Dashboard } from '@/components/editor/dashboard'
import { TemplateCards } from '@/components/landing/template-cards'

export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <div className="lp">
      <header className="lp-header">
        <div className="lp-header__row wrap">
          <Link href="/" className="lp-brand">
            WEB SAYT
          </Link>
        </div>
      </header>
      <main className="lp-section wrap lp-pick">
        <Dashboard cards={<TemplateCards mode="edit" />} />
      </main>
    </div>
  )
}
