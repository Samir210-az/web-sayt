'use client'

import type { User } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { firebaseConfigured } from '@/lib/firebase'
import { deleteSite, listSites, unpublishSite } from '@/lib/site-storage'
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
  const [failed, setFailed] = useState('')
  const [busy, setBusy] = useState('')
  const [problem, setProblem] = useState('')

  useEffect(() => {
    let alive = true
    listSites(user.uid)
      .then((list) => alive && setSites(list))
      .catch((e: unknown) => alive && setFailed(e instanceof Error ? e.message.slice(0, 160) : 'naməlum xəta'))
    return () => {
      alive = false
    }
  }, [user.uid])

  const unpublish = async (template: SiteSummary['template'], name: string) => {
    if (!window.confirm(`/s/${name} ünvanında dərc olunmuş sayt bağlansın? Qaralama qalır, istədiyiniz vaxt yenidən dərc edə bilərsiniz.`)) return
    setBusy(template)
    setProblem('')
    try {
      await unpublishSite(user.uid, template)
      setSites((list) => list && list.map((s) => (s.template === template ? { ...s, publish: null } : s)))
    } catch {
      setProblem('Dərcdən çıxarmaq alınmadı. Bir az sonra yenidən cəhd edin.')
    }
    setBusy('')
  }

  const remove = async (template: SiteSummary['template'], title: string) => {
    if (!window.confirm(`"${title}" saytı tamamilə silinsin? Qaralama və varsa dərc olunmuş ünvan silinir, geri qaytarmaq olmur.`)) return
    setBusy(template)
    setProblem('')
    try {
      await deleteSite(user.uid, template)
      setSites((list) => list && list.filter((s) => s.template !== template))
    } catch {
      setProblem('Saytı silmək alınmadı. Bir az sonra yenidən cəhd edin.')
    }
    setBusy('')
  }

  if (failed) {
    return (
      <p className="dash__note" role="alert">
        Saytlarınızın siyahısı yüklənmədi. Səhifəni yeniləyin. ({failed})
      </p>
    )
  }
  if (!sites) return <p className="dash__note" role="status">Saytlarınız yüklənir…</p>
  if (sites.length === 0) {
    return <p className="dash__note">Hələ saytınız yoxdur. Aşağıdan şablon seçib başlayın, hər dəyişiklik avtomatik saxlanılır.</p>
  }

  return (
    <>
      {problem && (
        <p className="dash__note" role="alert">
          {problem}
        </p>
      )}
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
                {s.publish && <span className="dash__addr">/s/{s.publish.name}</span>}
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
                {s.publish && (
                  <button
                    type="button"
                    className="lp-btn lp-btn--glass"
                    disabled={busy === s.template}
                    onClick={() => void unpublish(s.template, s.publish!.name)}
                  >
                    Dərcdən çıxar
                  </button>
                )}
                <button
                  type="button"
                  className="lp-btn lp-btn--glass dash__danger"
                  disabled={busy === s.template}
                  onClick={() => void remove(s.template, meta.name)}
                >
                  Saytı sil
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
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
