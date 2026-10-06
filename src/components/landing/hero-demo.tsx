'use client'

import { useEffect, useState } from 'react'
import { Parallax } from '@/components/parallax'

const SAMPLES = [
  { brand: 'Evdar', headline: 'Eyni gün gəlirik, qiyməti işə başlamazdan əvvəl deyirik', color: '#e9a93b', tint: '#2b44c9' },
  { brand: 'Nur Klinikası', headline: 'Qəbula yazılın, növbəsiz və vaxtında qəbul olunun', color: '#34c8a0', tint: '#0f6b5c' },
  { brand: 'Dəniz Kafe', headline: 'Səhər yeməyindən axşam süfrəsinə qədər açığıq', color: '#ff7a59', tint: '#8c2f4a' },
]

const TYPE_MS = 38
const ERASE_MS = 14
const HOLD_MS = 2400

export function HeroDemo() {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(SAMPLES[0].headline)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!animate) return
    const target = SAMPLES[index].headline
    let timer: number
    let pos = 0
    let erasing = false
    setTyped('')

    const tick = () => {
      if (!erasing) {
        pos += 1
        setTyped(target.slice(0, pos))
        if (pos >= target.length) {
          erasing = true
          timer = window.setTimeout(tick, HOLD_MS)
          return
        }
        timer = window.setTimeout(tick, TYPE_MS)
      } else {
        pos -= 3
        if (pos <= 0) {
          setIndex((i) => (i + 1) % SAMPLES.length)
          return
        }
        setTyped(target.slice(0, pos))
        timer = window.setTimeout(tick, ERASE_MS)
      }
    }

    timer = window.setTimeout(tick, 400)
    return () => window.clearTimeout(timer)
  }, [index, animate])

  const sample = SAMPLES[index]

  return (
    <div className="lp-stage" aria-hidden="true">
      <Parallax speed={0.08} className="lp-stage__glow">
        <span />
      </Parallax>

      <div
        className="lp-browser"
        style={{ '--demo-accent': sample.color, '--demo-tint': sample.tint } as React.CSSProperties}
      >
        <div className="lp-browser__bar">
          <i />
          <i />
          <i />
          <span className="lp-browser__url">sirketiniz.az</span>
        </div>
        <div className="lp-browser__page">
          <div className="lp-site__nav">
            <b>{sample.brand}</b>
            <span>Ana səhifə</span>
            <span>Xidmətlər</span>
            <span>Haqqımızda</span>
            <span>Əlaqə</span>
          </div>
          <div className="lp-site__hero">
            <p className="lp-site__title">
              {typed}
              <em className="lp-site__caret" />
            </p>
            <span className="lp-site__btn">Zəng et</span>
          </div>
        </div>
      </div>

      <Parallax speed={-0.14} className="lp-chip lp-chip--a">
        <span>Şəkli dəyiş</span>
      </Parallax>
      <Parallax speed={0.12} className="lp-chip lp-chip--b">
        <span className="lp-swatches">
          <i style={{ background: '#e9a93b' }} />
          <i style={{ background: '#34c8a0' }} />
          <i style={{ background: '#ff7a59' }} />
        </span>
        <span>Rəngi seç</span>
      </Parallax>
      <Parallax speed={-0.08} className="lp-chip lp-chip--c">
        <span>+ Bölmə əlavə et</span>
      </Parallax>
    </div>
  )
}
