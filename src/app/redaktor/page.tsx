import type { Metadata } from 'next'
import Link from 'next/link'
import { TemplateCards } from '@/components/landing/template-cards'

export const metadata: Metadata = {
  title: 'Şablon seçin',
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
        <h1 className="lp-title">Şablon seçin</h1>
        <p className="lp-sub">Seçdiyiniz şablon redaktorda açılacaq. Dəyişikliklər bu brauzerdə qaralama kimi saxlanılır.</p>
        <TemplateCards mode="edit" />
      </main>
    </div>
  )
}
