'use client'

import type { ReactNode } from 'react'
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

function DimLine({ children }: { children?: ReactNode }) {
  return (
    <div className="in-dim">
      <span className="in-dim__line" aria-hidden="true" />
      {children}
      {children && <span className="in-dim__line" aria-hidden="true" />}
    </div>
  )
}

export function HomeInteryer() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('in-hero wrap', !editing && 'in-hero--enter')}>
          <Editable.Text as="p" k="contact.address" className="in-hero__side" label="Ünvan" max={120} />
          <div className="in-hero__copy">
            <Editable.Text as="h1" k="home.hero.title" className="in-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="in-hero__lead" label="Giriş mətni" multiline max={240} />
            <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
              <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
            </ActionLink>
          </div>
          <div className="in-hero__plate">
            <div className="in-frame">
              <Parallax speed={0.06} bleed className="in-frame__img">
                <Editable.Image k="home.hero.panel" label="Əsas şəkil" />
              </Parallax>
            </div>
            <Parallax speed={0.1} bleed className="in-hero__detail">
              <Editable.Image k="home.hero.float" label="İkinci şəkil" />
            </Parallax>
            <span className="in-hero__vdim" aria-hidden="true" />
            <DimLine>
              <Editable.Text as="p" k="home.hero.chip" className="in-dim__label" label="Ölçü yazısı" max={30} />
            </DimLine>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block in-svc">
          <ServicesHead linkClass="textlink in-svc__link" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="in-proc wrap">
          <Reveal as="div" className="in-proc__head">
            <Editable.Text as="h2" k="home.process.title" className="in-proc__title" label="Bölmənin başlığı" max={60} />
          </Reveal>
          <div className="in-proc__body">
            <span className="in-proc__rule" aria-hidden="true" />
            <Steps className="in-proc__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="in-cta wrap">
          <div className="in-cta__grid">
            <div className="in-cta__copy">
              <CtaCopy titleClass="in-cta__title" textClass="in-cta__text" buttonClass="btn btn--ghost in-cta__btn" />
            </div>
            <Parallax speed={0.06} bleed className="in-cta__img">
              <Editable.Image k="home.cta.bg" label="Fon şəkli" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutInteryer() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="in-about wrap">
          <Reveal variant="up" className="in-about__media">
            <div className="in-frame in-frame--wide">
              <Parallax speed={0.05} bleed className="in-frame__img">
                <Editable.Image k="about.main" label="Komanda şəkli" />
              </Parallax>
            </div>
            <DimLine />
          </Reveal>
          <Reveal variant="up" delay={0.1} className="in-about__copy">
            <StoryCopy leadClass="in-about__lead" textClass="in-about__text" />
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="in-spec wrap">
          <ValuesTitle className="in-spec__title" />
          <ValueItems listClass="in-spec__list" itemClass="in-spec__item" stagger={0.08} />
        </section>
      </SectionFrame>
    </>
  )
}

export function ContactInteryer() {
  const { tel } = useContactLinks()

  return (
    <section className="in-sheet wrap">
      <Reveal variant="up" className="in-sheet__frame">
        <div className="in-sheet__cell in-sheet__cell--tel">
          <span className="in-sheet__label">Telefon</span>
          <ActionLink className="in-sheet__tel" href={tel}>
            <PhoneField />
          </ActionLink>
        </div>
        <div className="in-sheet__cell in-sheet__cell--wa">
          <WhatsappLink className="in-sheet__wa" />
        </div>
        <ContactRows wrapClass="in-sheet__rows" rowClass="in-sheet__row" />
      </Reveal>
    </section>
  )
}
