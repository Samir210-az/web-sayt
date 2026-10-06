'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SiteShell } from '@/components/template/shell'
import { resolveRoute } from '@/components/template/routes'
import { firebaseConfigured } from '@/lib/firebase'
import { loadPublished } from '@/lib/site-storage'
import type { SiteConfig } from '@/lib/types'

type State = { kind: 'loading' } | { kind: 'missing' } | { kind: 'error' } | { kind: 'ready'; site: SiteConfig }

function Notice({ title, text }: { title: string; text: string }) {
  return (
    <main className="lp gate">
      <h1 className="gate__title">{title}</h1>
      <p className="gate__note" role="status">
        {text}
      </p>
      <Link href="/">Platformaya qayıt</Link>
    </main>
  )
}

export function PublishedSite({ name, slug }: { name: string; slug?: string[] }) {
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    if (!firebaseConfigured) {
      setState({ kind: 'missing' })
      return
    }
    let cancelled = false
    loadPublished(name)
      .then((site) => {
        if (!cancelled) setState(site ? { kind: 'ready', site } : { kind: 'missing' })
      })
      .catch(() => {
        if (!cancelled) setState({ kind: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [name])

  const site = state.kind === 'ready' ? state.site : null
  const brand = site?.text['brand.name']
  useEffect(() => {
    if (brand) document.title = brand
  }, [brand])

  if (state.kind === 'loading') return <Notice title="Sayt yüklənir" text="Bir az gözləyin…" />
  if (state.kind === 'missing') return <Notice title="Sayt tapılmadı" text="Bu ünvanda dərc olunmuş sayt yoxdur." />
  if (state.kind === 'error') return <Notice title="Sayt açılmadı" text="Bağlantını yoxlayıb səhifəni yeniləyin." />

  const route = resolveRoute(state.site.template, slug)
  if (!route) return <Notice title="Səhifə tapılmadı" text="Belə səhifə yoxdur." />

  return (
    <SiteShell
      template={state.site.template}
      editing={false}
      current={route.key}
      initialSite={state.site}
      basePath={`/s/${name}`}
    >
      <route.View />
    </SiteShell>
  )
}
