'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Editable, ImageField, TextField } from '@/components/editable'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import type { PageKey, ServiceItem, TemplateId } from '@/lib/types'
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
  const { site } = useSite()
  return (
    <header className={`pagehead pagehead--${page} pagehead--${site.template}`}>
      <Parallax speed={-0.18} className="pagehead__deco">
        <span />
      </Parallax>
      <div className="wrap pagehead__inner">
        <Editable.Text as="h1" k={titleKey} className="pagehead__title" label="Səhifə başlığı" max={60} />
        <Editable.Text as="p" k={leadKey} className="pagehead__lead" label="Qısa izah" multiline max={240} />
      </div>
    </header>
  )
}

type ServiceVariant = 'rows' | 'stack' | 'bento' | 'menu'

const SERVICE_VARIANT: Record<TemplateId, ServiceVariant> = {
  xidmet: 'stack',
  klinika: 'bento',
  kafe: 'menu',
  bosh: 'rows',
}

const ITEM_CLASS: Record<ServiceVariant, string> = {
  rows: 'svc',
  stack: 'stack__card',
  bento: 'bento__tile',
  menu: 'menu__row',
}

const PART: Record<ServiceVariant, string> = {
  rows: 'svc',
  stack: 'stack',
  bento: 'bento',
  menu: 'menu',
}

const MEDIA_SPEED: Record<ServiceVariant, number> = { rows: 0.06, stack: 0.1, bento: 0.07, menu: 0.05 }

function ServiceRow({ item, index, variant }: { item: ServiceItem; index: number; variant: ServiceVariant }) {
  const { editing, updateService, removeService } = useSite()
  const part = PART[variant]

  return (
    <li className={ITEM_CLASS[variant]} style={{ '--i': index } as CSSProperties}>
      <div className={`${part}__copy`}>
        <TextField
          as="h3"
          className={`${part}__title`}
          label="Xidmətin adı"
          value={item.title}
          max={50}
          onCommit={(title) => updateService(item.id, { title })}
        />
        <TextField
          as="p"
          className={`${part}__text`}
          label="Xidmətin təsviri"
          value={item.text}
          multiline
          max={220}
          onCommit={(text) => updateService(item.id, { text })}
        />
      </div>
      <Parallax speed={MEDIA_SPEED[variant]} bleed className={`${part}__media`}>
        <ImageField
          label={`${item.title} şəkli`}
          value={item.image}
          onCommit={(image) => updateService(item.id, { image })}
        />
      </Parallax>
      {editing && (
        <button
          type="button"
          className="ed-remove svc-remove"
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
  const variant = SERVICE_VARIANT[site.template]

  return (
    <>
      <ul className={cx('svclist', `svclist--${variant}`, editing && 'svclist--editing')}>
        {items.map((item, index) => (
          <ServiceRow key={item.id} item={item} index={index} variant={variant} />
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
