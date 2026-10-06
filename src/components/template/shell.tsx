'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useAccount } from '@/components/editor/account'
import { Editable } from '@/components/editable'
import { SiteProvider, useSite } from '@/lib/site-context'
import { EDITOR_PREFIX, PAGES } from '@/lib/types'
import type { TemplateId } from '@/lib/types'
import { cx, pageHref } from '@/lib/utils'

function Header({ current }: { current: string }) {
  const { editing, site } = useSite()
  const [open, setOpen] = useState(false)

  const brand = (
    <>
      {(site.logo.src || editing) && <Editable.Logo className="brand__logo" />}
      <Editable.Text as="span" k="brand.name" className="brand__name" label="Sayt adı" max={40} />
    </>
  )

  return (
    <header className="header">
      <div className="header__row wrap">
        {editing ? (
          <div className="brand">{brand}</div>
        ) : (
          <Link href={pageHref('/', false, site.template)} className="brand" aria-label="Ana səhifə">
            {brand}
          </Link>
        )}

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Bağla' : 'Menyu'}
        </button>

        <nav id="main-nav" className={cx('nav', open && 'nav--open')} aria-label="Əsas menyu">
          {PAGES.map((page) => (
            <Link
              key={page.key}
              href={pageHref(page.path, editing, site.template)}
              className={cx('nav__link', current === page.key && 'nav__link--current')}
              aria-current={current === page.key ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row wrap">
        <Editable.Text as="span" k="brand.name" className="footer__brand" label="Sayt adı" max={40} />
        <Editable.Text as="span" k="footer.text" className="footer__text" label="Alt yazı" max={120} />
        <a
          className="footer__credit"
          href="https://instagram.com/securtiy_group"
          target="_blank"
          rel="noopener noreferrer"
        >
          By securtiy_group
        </a>
      </div>
    </footer>
  )
}

const STATUS: Record<string, string> = {
  saving: 'Hesabınıza yazılır…',
  error: 'Saxlamaq alınmadı. Bağlantını yoxlayın, dəyişiklik təkrar cəhd olunacaq.',
  'too-large': 'Sayt çox böyükdür. Şəkilləri kiçildin və ya sayını azaldın.',
  'load-error': 'Hesabdan yükləmək alınmadı. Səhifəni yeniləyin, indiki dəyişikliklər saxlanılmayacaq.',
}

function EditorBar() {
  const { site, setAccent, reset, saveState, storage } = useSite()
  const account = useAccount()

  const status =
    STATUS[saveState] ??
    (saveState === 'saved'
      ? storage === 'account'
        ? 'Hesabınıza saxlanıldı'
        : 'Qaralama bu brauzerdə saxlanıldı'
      : storage === 'account'
        ? 'Mətnə və ya şəkilə klik edib dəyişin'
        : 'Hesab qoşulmayıb: dəyişikliklər yalnız bu brauzerdə saxlanılır')

  return (
    <div className="editbar" role="region" aria-label="Redaktor paneli">
      <strong className="editbar__title">Redaktor</strong>
      <span className="editbar__status" aria-live="polite">
        {status}
      </span>
      <label className="editbar__color">
        <span>Əsas rəng</span>
        <input type="color" value={site.theme.accent} onChange={(e) => setAccent(e.target.value)} />
      </label>
      <Link href={pageHref('/', false, site.template)} className="editbar__btn">
        Önizləmə
      </Link>
      <button
        type="button"
        className="editbar__btn editbar__btn--quiet"
        onClick={() => {
          if (window.confirm('Bütün dəyişikliklər silinsin və nümunə məzmun qaytarılsın?')) reset()
        }}
      >
        Sıfırla
      </button>
      {account && (
        <button type="button" className="editbar__btn editbar__btn--quiet" onClick={account.signOut}>
          Çıxış
        </button>
      )}
    </div>
  )
}

export function SiteShell({
  template,
  editing,
  current,
  children,
}: {
  template: TemplateId
  editing: boolean
  current: string
  children: ReactNode
}) {
  return (
    <SiteProvider template={template} editing={editing}>
      <a className="skip" href="#content">
        Məzmuna keç
      </a>
      {!editing && (
        <div className="demobar">
          <span>Bu, nümunə şablondur.</span>
          <Link href={`${EDITOR_PREFIX}/${template}`}>Redaktorda aç</Link>
          <Link href="/">Platformaya qayıt</Link>
        </div>
      )}
      <Header current={current} />
      <main id="content" className={cx(editing && 'main--editing')}>
        {children}
      </main>
      <Footer />
      {editing && <EditorBar />}
    </SiteProvider>
  )
}
