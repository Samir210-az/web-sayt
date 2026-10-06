'use client'

import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase'
import { notifyOwner } from '@/lib/notify'
import type { TemplateId } from '@/lib/types'

const noticeKey = (uid: string) => `web-sayt:notified:${uid}`

export function useAuthUser(): { user: User | null; checked: boolean } {
  const [state, setState] = useState<{ user: User | null; checked: boolean }>({ user: null, checked: false })
  useEffect(
    () => onAuthStateChanged(getFirebaseAuth(), (user) => setState({ user, checked: true })),
    [],
  )
  return state
}

export function useLoginNotice(user: User, template?: TemplateId) {
  useEffect(() => {
    const key = noticeKey(user.uid)
    try {
      if (window.sessionStorage.getItem(key)) return
      window.sessionStorage.setItem(key, '1')
    } catch {
      /* sessionStorage bağlı ola bilər */
    }
    void notifyOwner(user, { event: 'login', template })
  }, [user, template])
}

export function signOutUser(user: User | null) {
  if (user) {
    try {
      window.sessionStorage.removeItem(noticeKey(user.uid))
    } catch {
      /* sessionStorage bağlı ola bilər */
    }
  }
  void signOut(getFirebaseAuth())
}
