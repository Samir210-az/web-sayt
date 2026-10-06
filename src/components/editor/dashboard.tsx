'use client'

import type { User } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { firebaseConfigured } from '@/lib/firebase'
import { listSites } from '@/lib/site-storage'
import type { SiteSummary } from '@/lib/site-storage'
import { getTemplate } from '@/lib/template-registry'
import { EDITOR_PREFIX } from '@/lib/types'
import { LoginPanel } from './login-panel'
import { signOutUser, useAuthUser, useLoginNotice } from './use-auth-user'

const formatDate = (ms: number) =>
  ms
    ? new Intl.DateTimeFormat('az-AZ', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(ms)
    : ''

function MySites({ user }: { user: User }) {
  const [sites, setSites] = useState<SiteSummary[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    listSites(user.uid)
      .then((list) => alive && setSites(list))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [user.uid])

  if (failed) return <p className="dash__note" role="alert">Saytlarınızın siyahısı yüklənmədi. Səhifəni yeniləyin.</p>
  if (!sites) return <p className="dash__note" role="status">Saytlarınız yüklənir…</p>
  if (sites.length === 0) {
    return <p className="dash__note">Hələ saytınız yoxdur. Aşağıdan şablon seçib başlayın, hər dəyişiklik avtomatik saxlanılır.</p>
  }

  return (
    <ul className="dash__list">
      {sites.map((s) => {
        const meta = getTemplate(s.template)
        if (!meta) return null
        return (
          <li key={s.template} className="dash__item">
            <div className="dash__info">
              <strong>{meta.name}</strong>
              <span>{meta.kind}</span>
              <span className={s.publish ? 'dash__tag dash__tag--live' : 'dash__tag'}>
                {s.publish ? 'Dərc olunub' : 'Qaralama'}
              </span>
              {s.updatedAt > 0 && <span>Son dəyişiklik: {formatDate(s.updatedAt)}</span>}
            </div>
            <div className="dash__actions">
              <Link className="lp-btn lp-btn--glow" href={`${EDITOR_PREFIX}/${s.template}`}>
                Redaktəyə davam et
              </Link>
              {s.publish && (
                <a className="lp-btn lp-btn--glass" href={`/s/${s.publish.name}`} target="_blank" rel="noopener noreferrer">
                  Saytı aç
                </a>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function Panel({ user, cards }: { user: User; cards: ReactNode }) {
  useLoginNotice(user)
  return (
    <>
      <div className="dash__top">
        <div>
          <h1 className="lp-title">Panel</h1>
          <p className="dash__mail">{user.email}</p>
        </div>
        <button type="button" className="lp-btn lp-btn--glass" onClick={() => signOutUser(user)}>
          Çıxış
        </button>
      </div>
      <section aria-labelledby="dash-mine">
        <h2 id="dash-mine" className="dash__h">
          Saytlarım
        </h2>
        <MySites user={user} />
      </section>
      <section aria-labelledby="dash-new">
        <h2 id="dash-new" className="dash__h">
          Yeni sayt başla
        </h2>
        <p className="lp-sub">Hər şablon üçün bir sayt saxlanılır. Artıq başladığınız şablonu seçsəniz, qaldığınız yerdən davam edirsiniz.</p>
        {cards}
      </section>
    </>
  )
}

export function Dashboard({ cards }: { cards: ReactNode }) {
  if (!firebaseConfigured) {
    return (
      <>
        <h1 className="lp-title">Şablon seçin</h1>
        <p className="lp-sub">Seçdiyiniz şablon redaktorda açılacaq. Dəyişikliklər bu brauzerdə qaralama kimi saxlanılır.</p>
        {cards}
      </>
    )
  }
  return <Authed cards={cards} />
}

function Authed({ cards }: { cards: ReactNode }) {
  const { user, checked } = useAuthUser()
  if (!checked) return <p className="dash__note" role="status">Giriş yoxlanılır…</p>
  if (!user) return <LoginPanel embedded />
  return <Panel user={user} cards={cards} />
}
