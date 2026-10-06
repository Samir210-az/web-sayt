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

export function HomeAvto() {
  const { editing, text } = useSite()
  const { tel } = useContactLinks()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('av-hero', !editing && 'av-hero--enter')}>
          <span className="av-hero__word" aria-hidden="true" data-word={text('brand.name')} />
          <span className="av-hero__slash" aria-hidden="true" />
          <Parallax speed={0.1} bleed className="av-hero__photo">
            <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
          </Parallax>
          <div className="av-hero__copy wrap">
            <Editable.Text as="p" k="home.hero.chip" className="av-tag" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="av-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="av-hero__lead" label="Giriş mətni" multiline max={240} />
            <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
              <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
            </ActionLink>
          </div>
          <Parallax speed={-0.1} bleed className="av-hero__float">
            <Editable.Image k="home.hero.float" label="Kiçik şəkil" />
          </Parallax>
          <div className="av-hazard" aria-hidden="true" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block av-jobs">
          <ServicesHead linkClass="av-more" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="av-flow">
          <div className="wrap">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="av-flow__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="av-flow__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.hours" label="Qəbul saatları">
        <section className="av-hours">
          <div className="wrap">
            <div className="av-hours__panel">
              <div className="av-hours__head">
                <Editable.Text as="h2" k="home.hours.title" className="av-hours__title" label="Bölmənin başlığı" max={40} />
                <Editable.Text as="p" k="home.hours.note" className="av-hours__note" label="Qeyd" multiline max={120} />
              </div>
              <div className="av-hours__time">
                <Editable.Text as="p" k="contact.hours" className="av-hours__big" label="İş saatları" max={80} />
                <ActionLink className="av-hours__phone" href={tel}>
                  <PhoneField />
                </ActionLink>
              </div>
            </div>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="av-cta">
          <Parallax speed={0.08} bleed className="av-cta__img">
            <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
          </Parallax>
          <div className="av-cta__copy wrap">
            <CtaCopy titleClass="av-cta__title" textClass="av-cta__text" buttonClass="btn btn--primary" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutAvto() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="av-about wrap">
        <Reveal variant="left" className="av-about__media">
          <Parallax speed={0.08} bleed className="av-about__photo">
            <Editable.Image k="about.main" label="Komanda şəkli" />
          </Parallax>
        </Reveal>
        <Reveal variant="right" className="av-about__copy">
          <StoryCopy leadClass="av-about__lead" textClass="av-about__text" />
        </Reveal>
        <div className="av-check">
          <ValuesTitle className="av-check__title" />
          <ValueItems listClass="av-check__list" itemClass="av-check__item" stagger={0.1} />
        </div>
      </section>
    </SectionFrame>
  )
}

export function ContactAvto() {
  const { tel } = useContactLinks()
  return (
    <section className="av-contact wrap">
      <Reveal variant="up" className="av-board">
        <div className="av-board__head">
          <Editable.Text as="p" k="contact.board.title" className="av-board__title" label="Lövhənin başlığı" max={40} />
        </div>
        <Editable.Text as="p" k="contact.hours" className="av-board__hours" label="İş saatları" max={80} />
        <Editable.Text as="p" k="contact.board.note" className="av-board__note" label="Qeyd" multiline max={120} />
      </Reveal>
      <Reveal variant="up" delay={0.1} className="av-contact__side">
        <ActionLink className="btn btn--primary av-contact__call" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost" />
        <ContactRows wrapClass="av-rows" rowClass="av-rows__row" />
      </Reveal>
    </section>
  )
}
