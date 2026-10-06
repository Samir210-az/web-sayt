'use client'

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import Link from 'next/link'
import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { getFirebaseAuth } from '@/lib/firebase'

type Mode = 'signin' | 'signup'

const MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'E-poçt ünvanı düzgün deyil.',
  'auth/invalid-credential': 'E-poçt və ya parol səhvdir.',
  'auth/user-not-found': 'E-poçt və ya parol səhvdir.',
  'auth/wrong-password': 'E-poçt və ya parol səhvdir.',
  'auth/email-already-in-use': 'Bu e-poçtla hesab artıq var. Daxil olun.',
  'auth/weak-password': 'Parol ən azı 6 simvol olmalıdır.',
  'auth/too-many-requests': 'Çox cəhd edildi. Bir az sonra yenidən yoxlayın.',
  'auth/network-request-failed': 'İnternet bağlantısı yoxdur.',
  'auth/popup-blocked': 'Brauzer Google pəncərəsini blokladı. İcazə verin.',
  'auth/unauthorized-domain': 'Bu domen Firebase-də icazəli deyil.',
  'auth/operation-not-allowed': 'Bu giriş üsulu Firebase-də hələ aktiv edilməyib.',
}

function messageFor(error: unknown): string {
  const code = typeof error === 'object' && error && 'code' in error ? String((error as { code: unknown }).code) : ''
  return MESSAGES[code] ?? 'Giriş alınmadı. Bir az sonra yenidən cəhd edin.'
}

export function LoginPanel() {
  const ids = { email: useId(), password: useId(), error: useId() }
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const run = async (action: () => Promise<unknown>) => {
    setBusy(true)
    setError('')
    setInfo('')
    try {
      await action()
    } catch (e) {
      if (typeof e === 'object' && e && 'code' in e && (e as { code: unknown }).code === 'auth/popup-closed-by-user') {
        setBusy(false)
        return
      }
      setError(messageFor(e))
    }
    setBusy(false)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const auth = getFirebaseAuth()
    void run(() =>
      mode === 'signin'
        ? signInWithEmailAndPassword(auth, email.trim(), password)
        : createUserWithEmailAndPassword(auth, email.trim(), password),
    )
  }

  const reset = () => {
    if (!email.trim()) {
      setError('Əvvəlcə e-poçt ünvanınızı yazın.')
      return
    }
    void run(async () => {
      await sendPasswordResetEmail(getFirebaseAuth(), email.trim())
      setInfo('Əgər bu e-poçtla hesab varsa, parolu yeniləmək üçün məktub göndərildi.')
    })
  }

  return (
    <div className="lp gate">
      <header className="lp-header">
        <div className="lp-header__row wrap">
          <Link href="/" className="lp-brand">
            WEB SAYT
          </Link>
        </div>
      </header>
      <main className="gate__main">
        <form className="gate__card" onSubmit={submit} noValidate>
          <h1 className="gate__title">{mode === 'signin' ? 'Hesabınıza daxil olun' : 'Hesab yaradın'}</h1>
          <p className="gate__lead">Saytınız hesabınızda saxlanılır və yalnız siz redaktə edə bilərsiniz.</p>

          <label className="gate__label" htmlFor={ids.email}>
            E-poçt
          </label>
          <input
            id={ids.email}
            className="gate__input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="gate__label" htmlFor={ids.password}>
            Parol
          </label>
          <input
            id={ids.password}
            className="gate__input"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p id={ids.error} className="gate__error" role="alert">
            {error}
          </p>
          {info && (
            <p className="gate__info" role="status">
              {info}
            </p>
          )}

          <button type="submit" className="lp-btn lp-btn--glow gate__submit" disabled={busy}>
            {mode === 'signin' ? 'Daxil ol' : 'Hesab yarat'}
          </button>
          <button
            type="button"
            className="lp-btn lp-btn--glass gate__submit"
            disabled={busy}
            onClick={() => void run(() => signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider()))}
          >
            Google ilə davam et
          </button>

          <div className="gate__links">
            <button type="button" className="gate__link" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? 'Hesabınız yoxdur? Yaradın' : 'Hesabınız var? Daxil olun'}
            </button>
            {mode === 'signin' && (
              <button type="button" className="gate__link" onClick={reset}>
                Parolu unutmusunuz?
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
