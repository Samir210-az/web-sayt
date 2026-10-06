'use client'

import { createElement, useEffect, useRef } from 'react'
import type { ElementType, KeyboardEvent, ClipboardEvent } from 'react'
import { useSite } from '@/lib/site-context'

interface TextFieldProps {
  value: string
  onCommit: (value: string) => void
  as?: ElementType
  className?: string
  label: string
  multiline?: boolean
  max?: number
}

export function TextField({
  value,
  onCommit,
  as = 'span',
  className,
  label,
  multiline = false,
  max = 600,
}: TextFieldProps) {
  const { editing } = useSite()
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (editing && el && document.activeElement !== el && el.textContent !== value) {
      el.textContent = value
    }
  }, [value, editing])

  if (!editing) return createElement(as, { className }, value)

  const commit = (el: HTMLElement) => {
    const next = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, max)
    if (next !== value) onCommit(next)
    if (el.textContent !== next) el.textContent = next
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  const onPaste = (e: ClipboardEvent<HTMLElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text/plain').replace(/\s+/g, ' ')
    document.execCommand('insertText', false, pasted)
  }

  return createElement(
    as,
    {
      ref,
      className: [className, 'ed-text'].filter(Boolean).join(' '),
      contentEditable: 'plaintext-only',
      suppressContentEditableWarning: true,
      spellCheck: true,
      role: 'textbox',
      'aria-label': label,
      'aria-multiline': multiline,
      tabIndex: 0,
      onBlur: (e: React.FocusEvent<HTMLElement>) => commit(e.currentTarget),
      onKeyDown,
      onPaste,
    },
    value,
  )
}
