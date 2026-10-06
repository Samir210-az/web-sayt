'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps, useServiceTitles } from './homes'
import { ContactRows, PhoneField, ValueItems, ValuesTitle, WhatsappLink, useContactLinks } from './page-parts'

function WindowBar() {
  return (
    <div className="it-bar" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  )
}

function CodeWindow() {
  const titles = useServiceTitles().slice(0, 5)
  return (
    <div className="it-win" aria-hidden="true">
      <WindowBar />
      <div className="it-win__code">
        <p className="it-win__line">
          <b>const</b> xidmetler <b>=</b> [
        </p>
        {titles.map((title, i) => (
          <p key={i} className="it-win__line it-win__line--item">
            <span>&quot;{title}&quot;</span>,
          </p>
        ))}
        <p className="it-win__line">]</p>
        <p className="it-win__line it-win__line--note">{'// növbəti sətir: sizin layihəniz'}</p>
      </div>
    </div>
  )
}

export function HomeIt() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('it-hero', !editing && 'it-hero--enter')}>
          <div className="it-hero__grid" aria-hidden="true" />
          <div className="wrap it-hero__inner">
            <div className="it-hero__copy">
              <Editable.Text as="p" k="home.hero.chip" className="it-hero__chip" label="Qısa məlumat" max={50} />
              <Editable.Text as="h1" k="home.hero.title" className="it-hero__title" label="Əsas başlıq" max={110} />
              <Editable.Text as="p" k="home.hero.lead" className="it-hero__lead" label="Giriş mətni" multiline max={240} />
              <div className="it-hero__actions">
                <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                  <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
                </ActionLink>
              </div>
            </div>
            <div className="it-hero__stage">
              <Parallax speed={0.07} bleed className="it-hero__panel">
                <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
              </Parallax>
              <CodeWindow />
              <Parallax speed={-0.1} bleed className="it-hero__float">
                <Editable.Image k="home.hero.float" label="Üzən şəkil" />
              </Parallax>
            </div>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block it-services">
          <ServicesHead linkClass="it-link" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="it-proc">
          <div className="wrap it-proc__inner">
            <Reveal as="div" className="it-proc__head">
              <Editable.Text as="h2" k="home.process.title" className="it-proc__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="it-proc__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="it-cta wrap">
          <div className="it-cta__box">
            <Parallax speed={0.1} bleed className="it-cta__bg">
              <Editable.Image k="home.cta.bg" label="Fon şəkli" />
            </Parallax>
            <div className="it-cta__copy">
              <CtaCopy titleClass="it-cta__title" textClass="it-cta__text" buttonClass="btn btn--primary" />
            </div>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutIt() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="it-about wrap">
          <Reveal variant="up" className="it-about__lead">
            <Editable.Text as="p" k="about.body1" className="it-about__statement" label="Birinci abzas" multiline max={400} />
          </Reveal>
          <div className="it-about__row">
            <Reveal variant="left" className="it-about__window">
              <WindowBar />
              <Parallax speed={0.08} bleed className="it-about__media">
                <Editable.Image k="about.main" label="Komanda şəkli" />
              </Parallax>
            </Reveal>
            <Reveal variant="right" className="it-about__side">
              <Editable.Text as="p" k="about.body2" className="it-about__text" label="İkinci abzas" multiline max={400} />
            </Reveal>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="it-values">
          <div className="wrap it-values__inner">
            <ValuesTitle className="it-values__title" />
            <ValueItems listClass="it-values__list" itemClass="it-values__item" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactIt() {
  const { tel } = useContactLinks()
  return (
    <section className="it-contact wrap">
      <Reveal variant="left" className="it-contact__call">
        <WindowBar />
        <div className="it-contact__body">
          <ActionLink className="it-contact__phone" href={tel}>
            <PhoneField />
          </ActionLink>
          <WhatsappLink className="btn btn--ghost" />
        </div>
      </Reveal>
      <Reveal variant="right" className="it-contact__info">
        <ContactRows wrapClass="it-contact__list" rowClass="it-contact__row" />
      </Reveal>
    </section>
  )
}
