'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { EDITOR_PREFIX, TEMPLATE_PREFIX } from '@/lib/types'
import type { TemplateId } from '@/lib/types'

const PAGES = [
  { key: 'home', label: 'Ana səhifə' },
  { key: 'xidmetler', label: 'Xidmətlər' },
  { key: 'haqqimizda', label: 'Haqqımızda' },
  { key: 'elaqe', label: 'Əlaqə' },
] as const

type Device = 'desktop' | 'mobile'

export function TemplatePreview({ id, name }: { id: TemplateId; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const [opened, setOpened] = useState(false)
  const [device, setDevice] = useState<Device>('desktop')
  const [page, setPage] = useState<(typeof PAGES)[number]['key']>('home')

  function open() {
    setDevice(window.matchMedia('(max-width: 720px)').matches ? 'mobile' : 'desktop')
    setPage('home')
    setOpened(true)
    dialog.current?.showModal()
  }

  function show(next: { device?: Device; page?: (typeof PAGES)[number]['key'] }) {
    if (next.device) setDevice(next.device)
    if (next.page) setPage(next.page)
    screen.current?.scrollTo({ top: 0 })
  }

  const label = PAGES.find((p) => p.key === page)?.label ?? ''

  return (
    <>
      <button type="button" className="lp-card__preview" onClick={open}>
        Tam görünüş
      </button>
      <dialog
        ref={dialog}
        className="pv"
        aria-label={`${name} şablonunun tam görünüşü`}
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
      >
        <div className="pv__bar">
          <strong className="pv__name">{name}</strong>
          <div className="pv__seg" role="group" aria-label="Cihaz">
            <button type="button" aria-pressed={device === 'desktop'} onClick={() => show({ device: 'desktop' })}>
              Kompüter
            </button>
            <button type="button" aria-pressed={device === 'mobile'} onClick={() => show({ device: 'mobile' })}>
              Telefon
            </button>
          </div>
          <button type="button" className="pv__close" onClick={() => dialog.current?.close()}>
            Bağla
          </button>
        </div>
        <div className="pv__tabs" role="group" aria-label="Səhifə">
          {PAGES.map((p) => (
            <button key={p.key} type="button" aria-pressed={page === p.key} onClick={() => show({ page: p.key })}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="pv__stage">
          <div className={`pv__device pv__device--${device}`}>
            <div className="pv__chrome" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="pv__screen" ref={screen} tabIndex={0} aria-label={`${label} səhifəsinin görünüşü, aşağı sürüşdürün`}>
              {opened && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${device}-${page}`}
                  src={`/previews/${id}-${page}-${device}.jpg`}
                  alt={`${name} şablonu, ${label} səhifəsi`}
                  decoding="async"
                />
              )}
            </div>
          </div>
        </div>
        <div className="pv__actions">
          <Link className="pv__go" href={`${EDITOR_PREFIX}/${id}`}>
            Bu şablonla başla
          </Link>
          <Link className="pv__live" href={`${TEMPLATE_PREFIX}/${id}`}>
            Canlı bax
          </Link>
        </div>
      </dialog>
    </>
  )
}
