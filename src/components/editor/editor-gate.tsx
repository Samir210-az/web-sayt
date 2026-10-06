'use client'

import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { firebaseConfigured, getFirebaseAuth, storageConfigured } from '@/lib/firebase'
import { notifyOwner } from '@/lib/notify'
import { PersistenceProvider } from '@/lib/site-context'
import type { Persistence } from '@/lib/site-context'
import {
  loadPublishInfo,
  loadSite,
  moveImagesToStorage,
  publishSite,
  saveSite,
  unpublishSite,
  uploadDataUrl,
} from '@/lib/site-storage'
import type { TemplateId } from '@/lib/types'
import { AccountContext } from './account'
import { LoginPanel } from './login-panel'

function SignedIn({ user, template, children }: { user: User; template: TemplateId; children: ReactNode }) {
  const persistence = useMemo<Persistence>(
    () => {
      const upload = (dataUrl: string) => (storageConfigured ? uploadDataUrl(user.uid, dataUrl) : Promise.resolve(dataUrl))
      return {
        load: () => loadSite(user.uid, template),
        save: (site) => saveSite(user.uid, site),
        upload,
        uploadAll: (site) => (storageConfigured ? moveImagesToStorage(site, upload) : Promise.resolve(site)),
        publishInfo: () => loadPublishInfo(user.uid, template),
        publish: async (site, name) => {
          await publishSite(user.uid, site, name)
          void notifyOwner(user, { event: 'publish', template: site.template, name })
        },
        unpublish: () => unpublishSite(user.uid, template),
      }
    },
    [user, template],
  )
  useEffect(() => {
    const key = `web-sayt:notified:${user.uid}`
    try {
      if (window.sessionStorage.getItem(key)) return
      window.sessionStorage.setItem(key, '1')
    } catch {
      /* sessionStorage bağlı ola bilər */
    }
    void notifyOwner(user, { event: 'login', template })
  }, [user, template])

  const account = useMemo(
    () => ({ email: user.email ?? '', signOut: () => void signOut(getFirebaseAuth()) }),
    [user.email],
  )

  return (
    <AccountContext.Provider value={account}>
      <PersistenceProvider value={persistence}>{children}</PersistenceProvider>
    </AccountContext.Provider>
  )
}

function Gate({ template, children }: { template: TemplateId; children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(
    () =>
      onAuthStateChanged(getFirebaseAuth(), (next) => {
        setUser(next)
        setChecked(true)
      }),
    [],
  )

  if (!checked) {
    return (
      <div className="lp gate">
        <p className="gate__note" role="status">
          Giriş yoxlanılır…
        </p>
      </div>
    )
  }
  if (!user) return <LoginPanel />
  return (
    <SignedIn user={user} template={template}>
      {children}
    </SignedIn>
  )
}

export function EditorGate({ template, children }: { template: TemplateId; children: ReactNode }) {
  if (!firebaseConfigured) return <>{children}</>
  return <Gate template={template}>{children}</Gate>
}
