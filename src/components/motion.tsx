'use client'

import { createElement, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useSite } from '@/lib/site-context'
import { cx } from '@/lib/utils'

type RevealTag = 'div' | 'li' | 'section' | 'p' | 'h2' | 'header'
export type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'line'

interface RevealProps {
  as?: RevealTag
  variant?: RevealVariant
  delay?: number
  className?: string
  children?: ReactNode
}

export function Reveal({ as = 'div', variant = 'up', delay = 0, className, children }: RevealProps) {
  const { editing } = useSite()
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (editing || !el) return
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [editing])

  return createElement(
    as,
    {
      ref,
      className: cx(className, shown && 'is-in'),
      'data-reveal': editing ? undefined : variant,
      style: delay ? ({ '--d': `${delay}s` } as CSSProperties) : undefined,
    },
    children,
  )
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const words = items.filter(Boolean)
  if (!words.length) return null

  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {[...words, ...words].map((word, i) => (
        <li key={`${word}-${i}`} className="marquee__item">
          {word}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cx('marquee', className)}>
      {row(false)}
      {row(true)}
    </div>
  )
}
