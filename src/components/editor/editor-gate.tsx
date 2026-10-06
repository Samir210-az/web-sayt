'use client'

import type { User } from 'firebase/auth'
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { firebaseConfigured, storageConfigured } from '@/lib/firebase'
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
import { signOutUser, useAuthUser, useLoginNotice } from './use-auth-user'

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
  useLoginNotice(user, template)

  const account = useMemo(
    () => ({ email: user.email ?? '', signOut: () => signOutUser(user) }),
    [user],
  )

  return (
    <AccountContext.Provider value={account}>
      <PersistenceProvider value={persistence}>{children}</PersistenceProvider>
    </AccountContext.Provider>
  )
}

function Gate({ template, children }: { template: TemplateId; children: ReactNode }) {
  const { user, checked } = useAuthUser()

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
