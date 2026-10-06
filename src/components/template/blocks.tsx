'use client'

import type { ReactNode } from 'react'
import { Editable, ImageField, TextField } from '@/components/editable'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import type { PageKey, ServiceItem } from '@/lib/types'
import { cx } from '@/lib/utils'

export function SectionFrame({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const { editing, site, toggleHidden } = useSite()
  const hidden = Boolean(site.hidden[id])
  if (hidden && !editing) return null

  return (
    <div className={cx('frame', hidden && 'frame--hidden')}>
      {editing && (
        <div className="frame__bar wrap">
          <span>{label}</span>
          {hidden && <span className="frame__note">Ziyarətçilərə görünmür</span>}
          <button type="button" className="frame__btn" onClick={() => toggleHidden(id)}>
            {hidden ? 'Göstər' : 'Gizlət'}
          </button>
        </div>
      )}
      {children}
    </div>
  )
}

export function ActionLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string | undefined
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const { editing } = useSite()
  if (editing || !href) return <span className={className}>{children}</span>
  return (
    <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

export function PageHead({ page, titleKey, leadKey }: { page: string; titleKey: string; leadKey: string }) {
  return (
    <header className={`pagehead pagehead--${page}`}>
      <div className="wrap">
        <Editable.Text as="h1" k={titleKey} className="pagehead__title" label="Səhifə başlığı" max={60} />
        <Editable.Text as="p" k={leadKey} className="pagehead__lead" label="Qısa izah" multiline max={240} />
      </div>
    </header>
  )
}

function ServiceRow({ item }: { item: ServiceItem }) {
  const { editing, updateService, removeService } = useSite()

  return (
    <li className="svc">
      <TextField
        as="h3"
        className="svc__title"
        label="Xidmətin adı"
        value={item.title}
        max={50}
        onCommit={(title) => updateService(item.id, { title })}
      />
      <TextField
        as="p"
        className="svc__text"
        label="Xidmətin təsviri"
        value={item.text}
        multiline
        max={220}
        onCommit={(text) => updateService(item.id, { text })}
      />
      <Parallax speed={0.06} bleed className="svc__media">
        <ImageField
          label={`${item.title} şəkli`}
          value={item.image}
          onCommit={(image) => updateService(item.id, { image })}
        />
      </Parallax>
      {editing && (
        <button
          type="button"
          className="ed-remove"
          onClick={() => {
            if (window.confirm(`"${item.title}" xidməti silinsin?`)) removeService(item.id)
          }}
        >
          Xidməti sil
        </button>
      )}
    </li>
  )
}

export function ServiceList({ limit }: { limit?: number }) {
  const { site, editing, addService } = useSite()
  const items = limit ? site.services.slice(0, limit) : site.services

  return (
    <>
      <ul className="svclist">
        {items.map((item) => (
          <ServiceRow key={item.id} item={item} />
        ))}
      </ul>
      {editing && !limit && (
        <div className="wrap">
          <button type="button" className="ed-add" onClick={addService}>
            Xidmət əlavə et
          </button>
        </div>
      )}
    </>
  )
}

export function ExtraBlocks({ page }: { page: PageKey }) {
  const { site, editing, addExtra, updateExtra, removeExtra } = useSite()
  const blocks = site.extras[page]

  return (
    <>
      {blocks.map((block) => (
        <section key={block.id} className={cx('split', block.imageSide === 'left' && 'split--flip')}>
          <div className="split__copy wrap-inner">
            <TextField
              as="h2"
              className="split__title"
              label="Bölmənin başlığı"
              value={block.title}
              max={80}
              onCommit={(title) => updateExtra(page, block.id, { title })}
            />
            <TextField
              as="p"
              className="split__body"
              label="Bölmənin mətni"
              value={block.body}
              multiline
              max={800}
              onCommit={(body) => updateExtra(page, block.id, { body })}
            />
            {editing && (
              <div className="ed-row">
                <button
                  type="button"
                  className="ed-small"
                  onClick={() =>
                    updateExtra(page, block.id, { imageSide: block.imageSide === 'left' ? 'right' : 'left' })
                  }
                >
                  Şəkli tərəfə keçir
                </button>
                <button
                  type="button"
                  className="ed-remove"
                  onClick={() => {
                    if (window.confirm(`"${block.title}" bölməsi silinsin?`)) removeExtra(page, block.id)
                  }}
                >
                  Bölməni sil
                </button>
              </div>
            )}
          </div>
          <Parallax speed={0.08} bleed className="split__media">
            <ImageField
              label={`${block.title} şəkli`}
              value={block.image}
              onCommit={(image) => updateExtra(page, block.id, { image })}
            />
          </Parallax>
        </section>
      ))}
      {editing && (
        <div className="wrap">
          <button type="button" className="ed-add" onClick={() => addExtra(page)}>
            Bölmə əlavə et
          </button>
        </div>
      )}
    </>
  )
}
