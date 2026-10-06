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

export function HomeStomat() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('sm-hero', !editing && 'sm-hero--enter')}>
          <div className="sm-hero__bubbles" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="sm-hero__stage wrap">
            <div className="sm-hero__copy">
              <Editable.Text as="h1" k="home.hero.title" className="sm-hero__title" label="Əsas başlıq" max={110} />
              <Editable.Text as="p" k="home.hero.lead" className="sm-hero__lead" label="Giriş mətni" multiline max={240} />
              <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
              </ActionLink>
            </div>
            <Parallax speed={0.08} bleed className="sm-orb sm-orb--a">
              <Editable.Image k="home.hero.panel" label="Əsas şəkil" />
            </Parallax>
            <Parallax speed={0.14} bleed className="sm-orb sm-orb--b">
              <Editable.Image k="home.hero.float" label="İkinci şəkil" />
            </Parallax>
            <Parallax speed={-0.1} bleed className="sm-orb sm-orb--c">
              <Editable.Image k="home.hero.third" label="Üçüncü şəkil" />
            </Parallax>
            <Editable.Text as="p" k="home.hero.chip" className="sm-pill sm-pill--a" label="Çip yazısı" max={30} />
            <Editable.Text as="p" k="home.hero.tag1" className="sm-pill sm-pill--b" label="Birinci etiket" max={20} />
            <Editable.Text as="p" k="home.hero.tag2" className="sm-pill sm-pill--c" label="İkinci etiket" max={20} />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block sm-showcase">
          <ServicesHead linkClass="sm-more" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Qəbul qaydası">
        <section className="sm-path wrap">
          <Reveal as="div" className="sm-path__head">
            <Editable.Text as="h2" k="home.process.title" className="sm-path__title" label="Bölmənin başlığı" max={60} />
          </Reveal>
          <Steps className="sm-path__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="sm-cta wrap">
          <div className="sm-cta__box">
            <div className="sm-cta__copy">
              <CtaCopy titleClass="sm-cta__title" textClass="sm-cta__text" buttonClass="btn btn--primary" />
            </div>
            <Parallax speed={0.06} bleed className="sm-cta__orb">
              <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutStomat() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="sm-about wrap">
        <div className="sm-about__top">
          <Reveal variant="zoom" className="sm-about__media">
            <Parallax speed={0.06} bleed className="sm-about__orb">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
            <span className="sm-about__dot sm-about__dot--a" aria-hidden="true" />
            <span className="sm-about__dot sm-about__dot--b" aria-hidden="true" />
          </Reveal>
          <Reveal variant="up" className="sm-about__copy">
            <StoryCopy leadClass="sm-about__lead" textClass="sm-about__text" />
          </Reveal>
        </div>
        <div className="sm-faq">
          <ValuesTitle className="sm-faq__title" />
          <ValueItems listClass="sm-faq__list" itemClass="sm-faq__item" stagger={0.1} />
        </div>
      </section>
    </SectionFrame>
  )
}

export function ContactStomat() {
  const { tel } = useContactLinks()
  return (
    <section className="sm-contact wrap">
      <Reveal variant="up" className="sm-contact__card">
        <ActionLink className="sm-contact__phone" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost sm-contact__wa" />
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <ContactRows wrapClass="sm-info" rowClass="sm-info__row" />
      </Reveal>
      <Reveal variant="up" delay={0.15} className="sm-rules">
        <Editable.Text as="h2" k="contact.rules.title" className="sm-rules__title" label="Bölmənin başlığı" max={40} />
        <ul className="sm-rules__list">
          {[1, 2, 3].map((n) => (
            <li key={n} className="sm-rules__item">
              <Editable.Text as="span" k={`contact.rules.${n}`} label={`${n}-ci qayda`} multiline max={90} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
