'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps } from './homes'
import {
  ContactRows,
  PhoneField,
  StoryCopy,
  ValueItems,
  ValuesTitle,
  WhatsappLink,
  useContactLinks,
} from './page-parts'

function Sprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 260" fill="none" aria-hidden="true">
      <path d="M62 256C58 190 70 120 56 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="34" cy="80" rx="26" ry="11" transform="rotate(-38 34 80)" />
        <ellipse cx="86" cy="116" rx="26" ry="11" transform="rotate(38 86 116)" />
        <ellipse cx="32" cy="150" rx="28" ry="11" transform="rotate(-34 32 150)" />
        <ellipse cx="88" cy="190" rx="28" ry="11" transform="rotate(34 88 190)" />
        <ellipse cx="54" cy="28" rx="20" ry="9" transform="rotate(-70 54 28)" />
      </g>
    </svg>
  )
}

export function HomeGul() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('gl-hero wrap', !editing && 'gl-hero--enter')}>
          <div className="gl-hero__copy">
            <Editable.Text as="p" k="home.hero.chip" className="gl-hero__kicker" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="gl-hero__title" label="Əsas başlıq" max={110} />
            <div className="gl-hero__note">
              <Editable.Text as="p" k="home.hero.lead" className="gl-hero__lead" label="Giriş mətni" multiline max={240} />
              <svg className="gl-hero__arrow" viewBox="0 0 90 60" fill="none" aria-hidden="true">
                <path d="M4 8C40 2 74 14 76 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M64 40l12 12 10-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
              <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
            </ActionLink>
          </div>
          <div className="gl-hero__art">
            <span className="gl-hero__outline" aria-hidden="true" />
            <Parallax speed={0.08} bleed className="gl-arch">
              <Editable.Image k="home.hero.panel" label="Əsas şəkil" />
            </Parallax>
            <Parallax speed={0.14} bleed className="gl-oval">
              <Editable.Image k="home.hero.float" label="İkinci şəkil" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Kataloq">
        <section className="block gl-cat">
          <ServicesHead linkClass="textlink gl-cat__link" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Sifariş qaydası">
        <section className="gl-steps">
          <div className="gl-steps__inner wrap">
            <div className="gl-steps__head">
              <Reveal as="div">
                <Editable.Text as="h2" k="home.process.title" className="gl-steps__title" label="Bölmənin başlığı" max={60} />
              </Reveal>
              <Sprig className="gl-steps__sprig" />
            </div>
            <Steps className="gl-steps__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="gl-cta wrap">
          <div className="gl-cta__panel">
            <div className="gl-cta__copy">
              <CtaCopy titleClass="gl-cta__title" textClass="gl-cta__text" buttonClass="btn btn--primary gl-cta__btn" />
            </div>
            <Parallax speed={0.06} bleed className="gl-cta__arch">
              <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutGul() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="gl-about wrap">
          <Reveal variant="zoom" className="gl-about__art">
            <span className="gl-about__outline" aria-hidden="true" />
            <Parallax speed={0.07} bleed className="gl-about__arch">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
          </Reveal>
          <Reveal variant="up" className="gl-about__copy">
            <StoryCopy leadClass="gl-about__lead" textClass="gl-about__text" />
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="gl-rules wrap">
          <ValuesTitle className="gl-rules__title" />
          <ValueItems listClass="gl-rules__list" itemClass="gl-rules__item" stagger={0.1} />
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactGul() {
  const { tel } = useContactLinks()

  return (
    <section className="gl-order wrap">
      <Reveal variant="up" className="gl-order__card">
        <ActionLink className="gl-order__phone" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--primary" />
      </Reveal>
      <Reveal variant="up" delay={0.12} className="gl-order__info">
        <ContactRows wrapClass="gl-order__list" rowClass="gl-order__row" />
        <Sprig className="gl-order__sprig" />
      </Reveal>
    </section>
  )
}
