'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useSite } from '@/lib/site-context'
import { RESERVED_SUBDOMAINS, SUBDOMAIN } from '@/lib/site-storage'
import type { PublishInfo } from '@/lib/site-storage'

const publicUrl = (name: string) => `${window.location.origin}/s/${name}`

function errorText(error: unknown): string {
  const name = error instanceof Error ? error.name : ''
  if (name === 'SubdomainTakenError') return 'Bu ünvan artıq tutulub. Başqa ad seçin.'
  if (name === 'SiteTooLargeError') return 'Sayt çox böyükdür. Şəkilləri kiçildin və ya sayını azaldın.'
  return 'Dərc etmək alınmadı. Bağlantını yoxlayıb yenidən cəhd edin.'
}

export function PublishPanel() {
  const { site, cloud, replaceSite } = useSite()
  const dialog = useRef<HTMLDialogElement>(null)
  const ids = { name: useId(), hint: useId(), msg: useId() }
  const [info, setInfo] = useState<PublishInfo | null>(null)
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open || !cloud) return
    let cancelled = false
    cloud
      .publishInfo()
      .then((value) => {
        if (cancelled) return
        setInfo(value)
        if (value) setName(value.name)
      })
      .catch(() => {
        if (!cancelled) setError('Dərc vəziyyəti yoxlanılmadı. Bağlantını yoxlayın.')
      })
    return () => {
      cancelled = true
    }
  }, [open, cloud])

  if (!cloud) return null

  const show = () => {
    setError('')
    setDone('')
    setOpen(true)
    dialog.current?.showModal()
  }
  const close = () => {
    dialog.current?.close()
    setOpen(false)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const value = name.trim().toLowerCase()
    setError('')
    setDone('')
    if (!SUBDOMAIN.test(value) || RESERVED_SUBDOMAINS.includes(value)) {
      setError('Ünvan 3–30 simvol olmalıdır: kiçik latın hərfləri, rəqəmlər və tire.')
      return
    }
    setBusy(true)
    try {
      const prepared = await cloud.uploadAll(site)
      if (prepared !== site) replaceSite(prepared)
      await cloud.save(prepared)
      await cloud.publish(prepared, value)
      setInfo({ name: value, publishedAt: Date.now() })
      setName(value)
      setDone(`Sayt dərc olundu: ${publicUrl(value)}`)
    } catch (e) {
      setError(errorText(e))
    } finally {
      setBusy(false)
    }
  }

  const unpublish = async () => {
    if (!window.confirm('Sayt dərcdən çıxarılsın? Ünvan açılmayacaq.')) return
    setBusy(true)
    setError('')
    setDone('')
    try {
      await cloud.unpublish()
      setInfo(null)
      setDone('Sayt dərcdən çıxarıldı.')
    } catch {
      setError('Dərcdən çıxarmaq alınmadı. Yenidən cəhd edin.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button type="button" className="editbar__btn" onClick={show}>
        Dərc et
      </button>
      <dialog ref={dialog} className="pubdlg" onClose={() => setOpen(false)} aria-labelledby={`${ids.name}-title`}>
        <form onSubmit={submit} className="pubdlg__form">
          <h2 id={`${ids.name}-title`} className="pubdlg__title">
            {info ? 'Dərc olunmuş sayt' : 'Saytı dərc et'}
          </h2>
          {info && (
            <p className="pubdlg__live">
              Ünvan:{' '}
              <a href={`/s/${info.name}`} target="_blank" rel="noopener noreferrer">
                {open ? publicUrl(info.name) : ''}
              </a>
            </p>
          )}
          <label htmlFor={ids.name} className="pubdlg__label">
            Saytın ünvanı
          </label>
          <div className="pubdlg__row">
            <span aria-hidden="true">/s/</span>
            <input
              id={ids.name}
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
              maxLength={30}
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`${ids.hint} ${ids.msg}`}
              placeholder="sirket-adi"
            />
          </div>
          <p id={ids.hint} className="pubdlg__hint">
            Kiçik latın hərfləri, rəqəmlər və tire. Sonradan dəyişə bilərsiniz.
          </p>
          <p id={ids.msg} className={error ? 'pubdlg__error' : 'pubdlg__done'} role="status">
            {error || done}
          </p>
          <div className="pubdlg__actions">
            <button type="submit" className="pubdlg__btn pubdlg__btn--main" disabled={busy}>
              {busy ? 'Gözləyin…' : info ? 'Yenilə' : 'Dərc et'}
            </button>
            {info && (
              <button type="button" className="pubdlg__btn" onClick={unpublish} disabled={busy}>
                Dərcdən çıxar
              </button>
            )}
            <button type="button" className="pubdlg__btn" onClick={close}>
              Bağla
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
