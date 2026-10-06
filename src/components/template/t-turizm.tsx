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

function Postmark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="35" cy="35" r="28" />
      <circle cx="35" cy="35" r="20" strokeDasharray="2 5" />
      <path d="M68 22q8-8 16 0t16 0t16 0M68 35q8-8 16 0t16 0t16 0M68 48q8-8 16 0t16 0t16 0" />
    </svg>
  )
}

export function HomeTurizm() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('tz-hero wrap', !editing && 'tz-hero--enter')}>
          <svg className="tz-route" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M20 560C250 610 380 420 580 470S880 590 950 320S1090 50 1170 70" />
          </svg>
          <svg className="tz-plane" viewBox="0 0 60 50" aria-hidden="true">
            <path d="M2 24L58 2L30 48z" />
            <path d="M2 24L30 48L24 22z" />
          </svg>
          <div className="tz-hero__copy">
            <Editable.Text as="p" k="home.hero.chip" className="tz-hero__stamp" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="tz-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="tz-hero__lead" label="Giriş mətni" multiline max={240} />
            <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
              <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
            </ActionLink>
          </div>
          <div className="tz-hero__collage">
            <Parallax speed={0.06} bleed className="tz-card tz-card--main">
              <Editable.Image k="home.hero.panel" label="Əsas şəkil" />
            </Parallax>
            <Parallax speed={0.12} bleed className="tz-card tz-card--float">
              <Editable.Image k="home.hero.float" label="İkinci şəkil" />
            </Parallax>
            <Parallax speed={0.04} bleed className="tz-card tz-card--third">
              <Editable.Image k="home.hero.third" label="Üçüncü şəkil" />
            </Parallax>
            <Postmark className="tz-hero__postmark" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block tz-band">
          <ServicesHead linkClass="textlink tz-band__link" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Yol xəritəsi">
        <section className="tz-way wrap">
          <Reveal as="div">
            <Editable.Text as="h2" k="home.process.title" className="tz-way__title" label="Bölmənin başlığı" max={60} />
          </Reveal>
          <div className="tz-way__track">
            <svg className="tz-way__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 50C6 50 6 25 12.5 25S31 75 37.5 75S56 25 62.5 25S81 75 87.5 75S94 50 100 50" />
            </svg>
            <Steps className="tz-way__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="tz-cta wrap">
          <div className="tz-ticket">
            <div className="tz-ticket__main">
              <CtaCopy titleClass="tz-ticket__title" textClass="tz-ticket__text" buttonClass="btn btn--primary tz-ticket__btn" />
            </div>
            <Parallax speed={0.08} bleed className="tz-ticket__stub">
              <Editable.Image k="home.cta.bg" label="Bilet şəkli" />
            </Parallax>
            <span className="tz-ticket__code" aria-hidden="true" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutTurizm() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="tz-about wrap">
          <Reveal variant="zoom" className="tz-about__photo">
            <Parallax speed={0.06} bleed className="tz-about__frame">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
            <Postmark className="tz-about__postmark" />
          </Reveal>
          <Reveal variant="up" className="tz-about__copy">
            <StoryCopy leadClass="tz-about__lead" textClass="tz-about__text" />
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="tz-values wrap">
          <ValuesTitle className="tz-values__title" />
          <ValueItems listClass="tz-pass" itemClass="tz-pass__item" stagger={0.1} />
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactTurizm() {
  const { tel } = useContactLinks()

  return (
    <section className="tz-post wrap">
      <Reveal variant="up" className="tz-post__card">
        <div className="tz-post__msg">
          <ActionLink className="tz-post__phone" href={tel}>
            <PhoneField />
          </ActionLink>
          <WhatsappLink className="btn btn--ghost" />
        </div>
        <div className="tz-post__addr">
          <ContactRows wrapClass="tz-post__list" rowClass="tz-post__row" />
        </div>
        <span className="tz-post__stamp" aria-hidden="true" />
        <Postmark className="tz-post__postmark" />
      </Reveal>
    </section>
  )
}
