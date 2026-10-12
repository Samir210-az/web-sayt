'use client'

import { useRef, useState } from 'react'
import type { JSX } from 'react'
import { useSite } from '@/lib/site-context'
import { HERO_MIRROR_TEMPLATES, NAV_STYLES } from '@/lib/types'
import type { NavStyle } from '@/lib/types'

const SHAPES: Record<NavStyle, JSX.Element> = {
  top: <rect x="4" y="4" width="48" height="6" rx="2" />,
  center: (
    <>
      <rect x="22" y="4" width="12" height="4" rx="2" />
      <rect x="10" y="11" width="36" height="3" rx="1.5" />
    </>
  ),
  left: <rect x="4" y="4" width="9" height="32" rx="2" />,
  right: <rect x="43" y="4" width="9" height="32" rx="2" />,
  bottom: <rect x="12" y="30" width="32" height="6" rx="3" />,
}

function NavIcon({ kind }: { kind: NavStyle }) {
  return (
    <svg viewBox="0 0 56 40" width="56" height="40" aria-hidden="true" className="laydlg__icon">
      <rect x="1" y="1" width="54" height="38" rx="5" className="laydlg__frame" />
      <g className="laydlg__shape">{SHAPES[kind]}</g>
    </svg>
  )
}

export function LayoutPanel() {
  const { site, sections, setNav, setHeroMirror, setOrder, toggleHidden, resetLayout } = useSite()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  const nav = site.layout?.nav ?? 'top'
  const saved = site.layout?.order ?? []
  const rank = (id: string) => {
    if (id.endsWith('.hero')) return -1
    const i = saved.indexOf(id)
    return i >= 0 ? i : 1000
  }
  const ordered = [...sections].sort((a, b) => rank(a.id) - rank(b.id))
  const movable = ordered.filter((s) => !s.id.endsWith('.hero'))

  const move = (id: string, step: -1 | 1) => {
    const ids = movable.map((s) => s.id)
    const from = ids.indexOf(id)
    const to = from + step
    if (from < 0 || to < 0 || to >= ids.length) return
    ;[ids[from], ids[to]] = [ids[to], ids[from]]
    const onPage = new Set(sections.map((s) => s.id))
    setOrder([...ids, ...saved.filter((id) => !onPage.has(id))])
  }

  const show = () => {
    setOpen(true)
    dialog.current?.showModal()
  }
  const close = () => {
    dialog.current?.close()
    setOpen(false)
  }

  return (
    <>
      <button type="button" className="editbar__btn" onClick={show}>
        Düzülüş
      </button>
      <dialog ref={dialog} className="pubdlg laydlg" onClose={() => setOpen(false)} aria-labelledby="laydlg-title">
        {open && (
          <div className="pubdlg__form">
            <h2 id="laydlg-title" className="pubdlg__title">
              Saytın düzülüşü
            </h2>

            <fieldset className="laydlg__group">
              <legend className="pubdlg__label">Menyunun yeri</legend>
              <div className="laydlg__navs">
                {NAV_STYLES.map((item) => (
                  <label key={item.key} className="laydlg__nav">
                    <input
                      type="radio"
                      name="nav-style"
                      value={item.key}
                      checked={nav === item.key}
                      onChange={() => setNav(item.key)}
                    />
                    <NavIcon kind={item.key} />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              <p className="pubdlg__hint">
                Yan menyu geniş ekranda yan panel kimi görünür. Telefonda menyu həmişə düyməli açılan siyahı olur.
              </p>
            </fieldset>

            {HERO_MIRROR_TEMPLATES.includes(site.template) && (
              <label className="laydlg__switch">
                <input
                  type="checkbox"
                  checked={site.layout?.hero === 'mirror'}
                  onChange={(e) => setHeroMirror(e.target.checked)}
                />
                <span>Giriş bölməsinin düzülüşünü dəyiş</span>
              </label>
            )}

            <div className="laydlg__group">
              <p className="pubdlg__label">Bu səhifənin bölmələri</p>
              <ol className="laydlg__list">
                {ordered.map((section) => {
                  const fixed = section.id.endsWith('.hero')
                  const index = movable.findIndex((s) => s.id === section.id)
                  const hidden = Boolean(site.hidden[section.id])
                  return (
                    <li key={section.id} className={hidden ? 'laydlg__item laydlg__item--off' : 'laydlg__item'}>
                      <span className="laydlg__name">{section.label}</span>
                      {fixed ? (
                        <span className="laydlg__fixed">Həmişə birinci</span>
                      ) : (
                        <span className="laydlg__tools">
                          <button
                            type="button"
                            className="laydlg__btn"
                            onClick={() => move(section.id, -1)}
                            disabled={index === 0}
                            aria-label={`${section.label} bölməsini yuxarı apar`}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="laydlg__btn"
                            onClick={() => move(section.id, 1)}
                            disabled={index === movable.length - 1}
                            aria-label={`${section.label} bölməsini aşağı apar`}
                          >
                            ↓
                          </button>
                        </span>
                      )}
                      <button type="button" className="laydlg__btn laydlg__btn--text" onClick={() => toggleHidden(section.id)}>
                        {hidden ? 'Göstər' : 'Gizlət'}
                      </button>
                    </li>
                  )
                })}
              </ol>
              <p className="pubdlg__hint">Sıra yalnız bu səhifəyə aiddir. Digər səhifələrə keçib orada da dəyişə bilərsiniz.</p>
            </div>

            <div className="pubdlg__actions">
              <button type="button" className="pubdlg__btn pubdlg__btn--main" onClick={close}>
                Hazırdır
              </button>
              <button type="button" className="pubdlg__btn" onClick={resetLayout}>
                Standart düzülüşə qayıt
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
