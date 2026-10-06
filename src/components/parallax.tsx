'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface Layer {
  frame: HTMLElement
  inner: HTMLElement
  speed: number
  bleed: boolean
  visible: boolean
}

const layers = new Set<Layer>()
let frameRequested = false
let listening = false
let reduced = false
let narrow = false

function measureBleed(layer: Layer) {
  if (!layer.bleed) return
  const factor = narrow ? 0.55 : 1
  const travel = reduced ? 0 : Math.abs(layer.speed) * factor * (window.innerHeight / 2 + layer.frame.offsetHeight / 2)
  layer.frame.style.setProperty('--px-bleed', `${Math.ceil(travel) + 2}px`)
}

function paint() {
  frameRequested = false
  const half = window.innerHeight / 2
  layers.forEach((layer) => {
    if (!layer.visible) return
    const rect = layer.frame.getBoundingClientRect()
    const offset = rect.top + rect.height / 2 - half
    const factor = narrow ? 0.55 : 1
    layer.inner.style.transform = `translate3d(0, ${(-offset * layer.speed * factor).toFixed(1)}px, 0)`
  })
}

function request() {
  if (frameRequested) return
  frameRequested = true
  window.requestAnimationFrame(paint)
}

function syncEnvironment() {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  narrow = window.matchMedia('(max-width: 720px)').matches
  layers.forEach((layer) => {
    measureBleed(layer)
    if (reduced) layer.inner.style.transform = ''
  })
  if (!reduced) request()
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', () => !reduced && request(), { passive: true })
  window.addEventListener('resize', syncEnvironment, { passive: true })
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', syncEnvironment)
  syncEnvironment()
}

interface ParallaxProps {
  speed?: number
  bleed?: boolean
  className?: string
  children: ReactNode
}

export function Parallax({ speed = 0.1, bleed = false, className, children }: ParallaxProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return

    startListening()
    const layer: Layer = { frame, inner, speed, bleed, visible: false }
    measureBleed(layer)
    layers.add(layer)

    const observer = new IntersectionObserver(
      ([entry]) => {
        layer.visible = entry.isIntersecting
        if (layer.visible && !reduced) request()
      },
      { rootMargin: '20% 0px' },
    )
    observer.observe(frame)

    return () => {
      observer.disconnect()
      layers.delete(layer)
    }
  }, [speed, bleed])

  return (
    <div ref={frameRef} data-px-speed={speed} className={['px', bleed ? 'px--bleed' : '', className].filter(Boolean).join(' ')}>
      <div ref={innerRef} className="px__inner">
        {children}
      </div>
    </div>
  )
}
