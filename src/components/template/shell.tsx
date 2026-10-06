'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Editable } from '@/components/editable'
import { SiteProvider, useSite } from '@/lib/site-context'
import { PAGES, TEMPLATE_PREFIX } from '@/lib/types'
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
          <Link href={TEMPLATE_PREFIX} className="brand" aria-label="Ana səhifə">
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
              href={pageHref(page.path, editing)}
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

function EditorBar() {
  const { site, setAccent, reset, saveState } = useSite()

  const status =
    saveState === 'saved'
      ? 'Qaralama saxlanıldı'
      : saveState === 'error'
        ? 'Saxlamaq alınmadı: brauzer yaddaşı doludur'
        : 'Mətnə və ya şəkilə klik edib dəyişin'

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
      <Link href={TEMPLATE_PREFIX} className="editbar__btn">
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
    </div>
  )
}

export function SiteShell({ editing, current, children }: { editing: boolean; current: string; children: ReactNode }) {
  return (
    <SiteProvider editing={editing}>
      <a className="skip" href="#content">
        Məzmuna keç
      </a>
      {!editing && (
        <div className="demobar">
          <span>Bu, nümunə şablondur.</span>
          <Link href="/redaktor">Redaktorda aç</Link>
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
