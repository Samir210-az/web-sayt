'use client'

import { useId, useRef, useState } from 'react'
import { useSite } from '@/lib/site-context'
import { ImageError, processImage } from '@/lib/process-image'
import type { ImageValue } from '@/lib/types'

interface ImageFieldProps {
  value: ImageValue
  onCommit: (value: ImageValue) => void
  className?: string
  label: string
  fit?: 'cover' | 'contain'
}

export function ImageField({ value, onCommit, className, label, fit = 'cover' }: ImageFieldProps) {
  const { editing } = useSite()
  const inputRef = useRef<HTMLInputElement>(null)
  const errorId = useId()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const style = { objectFit: fit, objectPosition: `${value.focusX}% ${value.focusY}%` } as const

  const media = value.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="img-media" src={value.src} alt={value.alt} style={style} loading="lazy" decoding="async" />
  ) : (
    <div className="img-empty" role="img" aria-label={value.alt} />
  )

  if (!editing) return <div className={['img-box', className].filter(Boolean).join(' ')}>{media}</div>

  const onFile = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const src = await processImage(file)
      onCommit({ ...value, src })
    } catch (e) {
      setError(e instanceof ImageError ? e.message : 'Şəkli yükləmək alınmadı.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className={['img-box', 'ed-image', className].filter(Boolean).join(' ')}>
      {media}
      <button
        type="button"
        className="ed-image__btn"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        aria-describedby={error ? errorId : undefined}
      >
        {busy ? 'Yüklənir…' : value.src ? 'Şəkli dəyiş' : 'Şəkil əlavə et'}
        <span className="visually-hidden"> — {label}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {error && (
        <p id={errorId} className="ed-image__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
