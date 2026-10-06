'use client'

import type { ReactNode } from 'react'
import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps } from './homes'
import { ContactRows, PhoneField, ValueItems, ValuesTitle, WhatsappLink, useContactLinks } from './page-parts'

function Ornament({ className }: { className?: string }) {
  return (
    <svg className={cx('ty-orn', className)} viewBox="0 0 240 24" aria-hidden="true" focusable="false">
      <path d="M0 12H92M148 12H240" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M120 3l9 9-9 9-9-9z" fill="currentColor" />
      <path d="M98 12l7-4.5 7 4.5-7 4.5zM128 12l7-4.5 7 4.5-7 4.5z" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function Arch({ className, speed = 0.06, children }: { className?: string; speed?: number; children: ReactNode }) {
  return (
    <div className={cx('ty-arch', className)}>
      <Parallax speed={speed} bleed className="ty-arch__img">
        {children}
      </Parallax>
    </div>
  )
}

export function HomeToy() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('ty-dark ty-hero', !editing && 'ty-hero--enter')}>
          <div className="wrap ty-hero__top">
            <Editable.Text as="p" k="home.hero.chip" className="ty-hero__chip" label="Qısa məlumat" max={50} />
            <Editable.Text as="h1" k="home.hero.title" className="ty-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="ty-hero__lead" label="Giriş mətni" multiline max={240} />
            <div className="ty-hero__actions">
              <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
              </ActionLink>
            </div>
          </div>
          <div className="wrap ty-hero__arches">
            <Arch className="ty-arch--side" speed={0.04}>
              <Editable.Image k="home.hero.float" label="Sol tağ şəkli" />
            </Arch>
            <Arch className="ty-arch--main" speed={0.08}>
              <Editable.Image k="home.hero.panel" label="Əsas tağ şəkli" />
            </Arch>
            <Arch className="ty-arch--side" speed={0.04}>
              <Editable.Image k="home.hero.third" label="Sağ tağ şəkli" />
            </Arch>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Zal növləri">
        <section className="block ty-services">
          <Ornament className="ty-orn--wine" />
          <ServicesHead linkClass="textlink ty-link" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Məclisə qədər">
        <section className="ty-dark ty-proc">
          <div className="wrap">
            <Reveal as="div" className="ty-proc__head">
              <Editable.Text as="h2" k="home.process.title" className="ty-proc__title" label="Bölmənin başlığı" max={60} />
              <Ornament />
            </Reveal>
            <Steps className="ty-proc__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="ty-cta wrap">
          <div className="ty-cta__frame">
            <Parallax speed={0.08} bleed className="ty-cta__bg">
              <Editable.Image k="home.cta.bg" label="Fon şəkli" />
            </Parallax>
            <div className="ty-cta__copy">
              <CtaCopy titleClass="ty-cta__title" textClass="ty-cta__text" buttonClass="btn btn--primary" />
            </div>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutToy() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="ty-about wrap">
          <Reveal variant="zoom" className="ty-about__media">
            <Arch className="ty-arch--lg" speed={0.07}>
              <Editable.Image k="about.main" label="Zal şəkli" />
            </Arch>
          </Reveal>
          <Reveal variant="up" className="ty-about__copy">
            <Ornament className="ty-orn--wine" />
            <Editable.Text as="p" k="about.body1" className="ty-about__lead" label="Birinci abzas" multiline max={400} />
            <Editable.Text as="p" k="about.body2" className="ty-about__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </section>
      </SectionFrame>

      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="ty-dark ty-values">
          <div className="wrap">
            <ValuesTitle className="ty-values__title" />
            <Ornament />
            <ValueItems listClass="ty-values__list" itemClass="ty-values__item" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactToy() {
  const { tel } = useContactLinks()
  return (
    <section className="ty-dark ty-contact">
      <div className="wrap">
        <Reveal variant="up" className="ty-card">
          <Ornament className="ty-orn--wine" />
          <ActionLink className="ty-card__phone" href={tel}>
            <PhoneField />
          </ActionLink>
          <WhatsappLink className="btn btn--ghost" />
          <ContactRows wrapClass="ty-card__list" rowClass="ty-card__row" />
        </Reveal>
      </div>
    </section>
  )
}
