'use client'

import { useId } from 'react'
import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps } from './homes'
import { ContactRows, PhoneField, ValueItems, ValuesTitle, WhatsappLink, useContactLinks } from './page-parts'

function Stamp({ className }: { className?: string }) {
  const { text } = useSite()
  const id = useId()
  const label = `${text('brand.name')} · kişi salonu · `.toLocaleUpperCase('az')
  return (
    <svg className={cx('bb-stamp', className)} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text className="bb-stamp__text">
        <textPath href={`#${id}`} textLength="468" lengthAdjust="spacing">
          {label}
        </textPath>
      </text>
      <path d="M100 66l9.4 19.6 21.6 2.8-15.8 15 4 21.4L100 114l-19.2 10.8 4-21.4-15.8-15 21.6-2.8z" fill="currentColor" />
    </svg>
  )
}

export function HomeBerber() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('bb-hero', !editing && 'bb-hero--enter')}>
          <div className="wrap">
            <div className="bb-poster">
              <div className="bb-poster__in">
                <Editable.Text as="p" k="home.hero.chip" className="bb-hero__chip" label="Qısa məlumat" max={50} />
                <Editable.Text as="h1" k="home.hero.title" className="bb-hero__title" label="Əsas başlıq" max={110} />
                <Editable.Text as="p" k="home.hero.lead" className="bb-hero__lead" label="Giriş mətni" multiline max={240} />
                <div className="bb-hero__actions">
                  <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                    <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
                  </ActionLink>
                </div>
                <div className="bb-hero__figure">
                  <Parallax speed={0.07} bleed className="bb-frame bb-hero__panel">
                    <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
                  </Parallax>
                  <Parallax speed={-0.1} bleed className="bb-hero__round">
                    <Editable.Image k="home.hero.float" label="Dəyirmi şəkil" />
                  </Parallax>
                  <Stamp className="bb-hero__stamp" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmət siyahısı">
        <section className="block bb-services">
          <ServicesHead linkClass="textlink bb-link" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Növbə qaydası">
        <section className="bb-proc">
          <div className="wrap">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="bb-proc__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="bb-proc__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="bb-cta">
          <div className="wrap bb-cta__inner">
            <div className="bb-cta__copy">
              <CtaCopy titleClass="bb-cta__title" textClass="bb-cta__text" buttonClass="btn btn--primary" />
            </div>
            <div className="bb-cta__pic">
              <Parallax speed={0.07} bleed className="bb-cta__img">
                <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
              </Parallax>
              <Stamp className="bb-cta__stamp" />
            </div>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutBerber() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="bb-about wrap">
          <Reveal variant="left" className="bb-about__media">
            <Parallax speed={0.07} bleed className="bb-frame bb-about__frame">
              <Editable.Image k="about.main" label="Salon şəkli" />
            </Parallax>
            <Stamp className="bb-about__stamp" />
          </Reveal>
          <Reveal variant="right" className="bb-about__copy">
            <Editable.Text as="p" k="about.body1" className="bb-about__lead" label="Birinci abzas" multiline max={400} />
            <Editable.Text as="p" k="about.body2" className="bb-about__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </section>
      </SectionFrame>

      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="bb-values">
          <div className="wrap">
            <ValuesTitle className="bb-values__title" />
            <ValueItems listClass="bb-values__list" itemClass="bb-ticket" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactBerber() {
  const { tel } = useContactLinks()
  return (
    <section className="bb-contact wrap">
      <Reveal variant="up" className="bb-visit">
        <div className="bb-visit__card">
          <div className="bb-visit__call">
            <ActionLink className="bb-visit__phone" href={tel}>
              <PhoneField />
            </ActionLink>
            <WhatsappLink className="btn btn--ghost" />
          </div>
          <ContactRows wrapClass="bb-visit__list" rowClass="bb-visit__row" />
          <Stamp className="bb-visit__stamp" />
        </div>
      </Reveal>
    </section>
  )
}
