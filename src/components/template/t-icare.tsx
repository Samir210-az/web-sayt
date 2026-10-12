'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps } from './homes'
import { ContactRows, PhoneField, ValueItems, ValuesTitle, WhatsappLink, useContactLinks } from './page-parts'

export function HomeIcare() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('ic-hero', !editing && 'ic-hero--enter')}>
          <div className="wrap ic-hero__grid">
            <div className="ic-hero__copy">
              <Editable.Text as="p" k="home.hero.chip" className="ic-hero__chip" label="Qısa məlumat" max={50} />
              <Editable.Text as="h1" k="home.hero.title" className="ic-hero__title" label="Əsas başlıq" max={110} />
              <Editable.Text as="p" k="home.hero.lead" className="ic-hero__lead" label="Giriş mətni" multiline max={240} />
              <div className="ic-hero__actions">
                <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                  <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
                </ActionLink>
              </div>
            </div>
            <div className="ic-hero__media">
              <Parallax speed={0.07} bleed className="ic-hero__panel">
                <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
              </Parallax>
              <Parallax speed={-0.1} bleed className="ic-hero__tag">
                <Editable.Image k="home.hero.float" label="Dəyirmi şəkil" />
              </Parallax>
            </div>
          </div>
          <div className="ic-hero__road" aria-hidden="true" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Avtomobil sinifləri">
        <section className="block ic-fleet">
          <ServicesHead />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İcarə qaydası">
        <section className="ic-route">
          <div className="wrap">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="ic-route__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="ic-route__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="ic-cta">
          <div className="wrap ic-cta__inner">
            <div className="ic-cta__copy">
              <CtaCopy titleClass="ic-cta__title" textClass="ic-cta__text" buttonClass="btn btn--primary" />
            </div>
            <Parallax speed={0.07} bleed className="ic-cta__media">
              <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutIcare() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="ic-about wrap">
          <Reveal variant="left" className="ic-about__media">
            <Parallax speed={0.07} bleed className="ic-about__frame">
              <Editable.Image k="about.main" label="Əsas şəkil" />
            </Parallax>
          </Reveal>
          <Reveal variant="right" className="ic-about__copy">
            <Editable.Text as="p" k="about.body1" className="ic-about__lead" label="Birinci abzas" multiline max={400} />
            <Editable.Text as="p" k="about.body2" className="ic-about__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </section>
      </SectionFrame>

      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="ic-values">
          <div className="wrap">
            <ValuesTitle className="ic-values__title" />
            <ValueItems listClass="ic-values__list" itemClass="ic-ticket" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactIcare() {
  const { tel } = useContactLinks()
  return (
    <section className="ic-contact wrap">
      <Reveal variant="up" className="ic-desk">
        <div className="ic-desk__card">
          <div className="ic-desk__call">
            <ActionLink className="ic-desk__phone" href={tel}>
              <PhoneField />
            </ActionLink>
            <WhatsappLink className="btn btn--ghost" />
          </div>
          <ContactRows wrapClass="ic-desk__list" rowClass="ic-desk__row" />
        </div>
      </Reveal>
    </section>
  )
}
