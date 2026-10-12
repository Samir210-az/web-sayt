'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, Sections, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps } from './homes'
import { ContactRows, PhoneField, ValueItems, ValuesTitle, WhatsappLink, useContactLinks } from './page-parts'

export function HomeRestoran() {
  const { editing, text } = useSite()

  return (
    <Sections>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('rs-hero', !editing && 'rs-hero--enter')}>
          <div className="wrap rs-hero__grid">
            <div className="rs-hero__copy">
              <Editable.Text as="p" k="home.hero.chip" className="rs-hero__chip" label="Qısa məlumat" max={50} />
              <Editable.Text as="h1" k="home.hero.title" className="rs-hero__title" label="Əsas başlıq" max={90} />
              <Editable.Text as="p" k="home.hero.lead" className="rs-hero__lead" label="Giriş mətni" multiline max={240} />
              <div className="rs-hero__actions">
                <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                  <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
                </ActionLink>
              </div>
            </div>
            <div className="rs-hero__media">
              <Parallax speed={0.06} bleed className="rs-hero__panel">
                <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
              </Parallax>
              <Parallax speed={-0.03} bleed className="rs-hero__tag">
                <Editable.Image k="home.hero.float" label="Dəyirmi şəkil" />
              </Parallax>
            </div>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Menyu">
        <section className="block rs-menu">
          <ServicesHead />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Masa ayırma qaydası">
        <section className="rs-steps">
          <div className="wrap">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="rs-steps__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="rs-steps__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="rs-cta">
          <div className="wrap rs-cta__inner">
            <div className="rs-cta__copy">
              <CtaCopy titleClass="rs-cta__title" textClass="rs-cta__text" buttonClass="btn btn--primary" />
            </div>
            <Parallax speed={0.06} bleed className="rs-cta__media">
              <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </Sections>
  )
}

export function AboutRestoran() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="rs-about wrap">
          <Reveal variant="left" className="rs-about__media">
            <Parallax speed={0.06} bleed className="rs-about__frame">
              <Editable.Image k="about.main" label="Əsas şəkil" />
            </Parallax>
          </Reveal>
          <Reveal variant="right" className="rs-about__copy">
            <Editable.Text as="p" k="about.body1" className="rs-about__lead" label="Birinci abzas" multiline max={400} />
            <Editable.Text as="p" k="about.body2" className="rs-about__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </section>
      </SectionFrame>

      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="rs-values">
          <div className="wrap">
            <ValuesTitle className="rs-values__title" />
            <ValueItems listClass="rs-values__list" itemClass="rs-note" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactRestoran() {
  const { tel } = useContactLinks()
  return (
    <section className="rs-contact wrap">
      <Reveal variant="up" className="rs-desk">
        <div className="rs-desk__book">
          <ActionLink className="rs-desk__phone" href={tel}>
            <PhoneField />
          </ActionLink>
          <WhatsappLink className="btn btn--ghost" />
        </div>
        <ContactRows wrapClass="rs-desk__list" rowClass="rs-desk__row" />
      </Reveal>
    </section>
  )
}
