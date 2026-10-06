'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import type { TemplateId } from '@/lib/types'
import { ActionLink, ExtraBlocks, PageHead, SectionFrame, ServiceList } from './blocks'
import {
  ContactRows,
  PhoneField,
  StoryCopy,
  ValueItems,
  ValuesTitle,
  WhatsappLink,
  useContactLinks,
} from './page-parts'
import {
  AboutGozellik,
  AboutHuquq,
  AboutIdman,
  AboutKurs,
  AboutStudiya,
  AboutTikinti,
  ContactGozellik,
  ContactHuquq,
  ContactIdman,
  ContactKurs,
  ContactStudiya,
  ContactTikinti,
} from './pages-more'

export function ServicesPage() {
  return (
    <>
      <PageHead page="services" titleKey="services.page.title" leadKey="services.page.lead" />
      <SectionFrame id="services.list" label="Xidmətlərin siyahısı">
        <section className="block block--flush">
          <ServiceList />
        </section>
      </SectionFrame>
      <ExtraBlocks page="services" />
    </>
  )
}


function AboutXidmet() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="story wrap">
          <Reveal variant="left" className="story__media">
            <Parallax speed={0.1} bleed className="story__frame">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
          </Reveal>
          <Reveal variant="right" className="story__copy">
            <StoryCopy />
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="ab-x-values">
          <div className="wrap">
            <ValuesTitle className="block__title" />
            <ValueItems listClass="ab-x-values__list" itemClass="ab-x-values__item" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

function AboutKlinika() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="ab-k-story wrap">
          <Reveal variant="up" className="ab-k-story__copy">
            <StoryCopy />
          </Reveal>
          <Reveal variant="zoom" className="ab-k-story__media">
            <Parallax speed={0.08} bleed className="ab-k-story__arch">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
            <Parallax speed={-0.14} className="ab-k-story__dot">
              <span />
            </Parallax>
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="ab-k-values">
          <div className="wrap">
            <ValuesTitle className="block__title ab-k-values__title" />
            <ValueItems listClass="ab-k-values__list" itemClass="ab-k-values__item" />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

function AboutKafe() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="ab-c-story">
          <Reveal variant="zoom" className="ab-c-story__banner">
            <Parallax speed={0.14} bleed className="ab-c-story__frame">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
          </Reveal>
          <div className="wrap ab-c-story__cols">
            <Reveal variant="up">
              <Editable.Text as="p" k="about.body1" className="ab-c-story__lead" label="Birinci abzas" multiline max={400} />
            </Reveal>
            <Reveal variant="up" delay={0.12}>
              <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
            </Reveal>
          </div>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="ab-c-values">
          <div className="wrap">
            <ValuesTitle className="block__title ab-c-values__title" />
            <ValueItems listClass="ab-c-values__list" itemClass="ab-c-values__item" stagger={0.1} />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

function AboutBosh() {
  return (
    <>
      <SectionFrame id="about.story" label="Hekayə">
        <section className="ab-b-story wrap">
          <Reveal variant="up" className="ab-b-story__head">
            <Editable.Text as="p" k="about.body1" className="ab-b-story__lead" label="Birinci abzas" multiline max={400} />
          </Reveal>
          <Reveal variant="zoom" className="ab-b-story__media">
            <Parallax speed={0.1} bleed className="ab-b-story__frame">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
          </Reveal>
          <Reveal variant="up" className="ab-b-story__text">
            <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="ab-b-values">
          <div className="wrap">
            <ValuesTitle className="block__title" />
            <ValueItems listClass="ab-b-values__list" itemClass="ab-b-values__item" stagger={0.08} />
          </div>
        </section>
      </SectionFrame>
    </>
  )
}

const ABOUT: Record<TemplateId, () => React.JSX.Element> = {
  xidmet: AboutXidmet,
  klinika: AboutKlinika,
  kafe: AboutKafe,
  bosh: AboutBosh,
  huquq: AboutHuquq,
  gozellik: AboutGozellik,
  idman: AboutIdman,
  tikinti: AboutTikinti,
  kurs: AboutKurs,
  studiya: AboutStudiya,
}

export function AboutPage() {
  const { site } = useSite()
  const Body = ABOUT[site.template]
  return (
    <>
      <PageHead page="about" titleKey="about.title" leadKey="about.lead" />
      <Body />
      <ExtraBlocks page="about" />
    </>
  )
}


function ContactXidmet() {
  const { tel } = useContactLinks()
  return (
    <section className="ct-x wrap">
      <Reveal variant="left" className="ct-x__panel">
        <p className="ct-x__hint">Birbaşa zəng</p>
        <ActionLink className="ct-x__phone" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost ct-x__wa" />
      </Reveal>
      <Reveal variant="right" className="ct-x__info">
        <ContactRows wrapClass="ct-x__list" rowClass="ct-x__row" />
      </Reveal>
    </section>
  )
}

function ContactKlinika() {
  const { tel } = useContactLinks()
  return (
    <section className="ct-k wrap">
      <Reveal variant="up" className="ct-k__card">
        <ActionLink className="btn btn--primary" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost" />
        <Parallax speed={-0.12} className="ct-k__blob">
          <span />
        </Parallax>
      </Reveal>
      <Reveal variant="up" delay={0.12}>
        <ContactRows wrapClass="ct-k__list" rowClass="ct-k__row" />
      </Reveal>
    </section>
  )
}

function ContactKafe() {
  const { tel } = useContactLinks()
  return (
    <section className="ct-c wrap">
      <Reveal variant="up" className="ct-c__actions">
        <ActionLink className="btn btn--primary" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost" />
      </Reveal>
      <Reveal variant="up" delay={0.12}>
        <ContactRows wrapClass="ct-c__list" rowClass="ct-c__row" />
      </Reveal>
    </section>
  )
}

function ContactBosh() {
  const { tel, mail } = useContactLinks()
  return (
    <section className="ct-b wrap">
      <Reveal variant="up">
        <ActionLink className="ct-b__big" href={tel}>
          <PhoneField />
        </ActionLink>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <ActionLink className="ct-b__mail" href={mail}>
          <Editable.Text as="span" k="contact.email" label="E-poçt ünvanı" max={80} />
        </ActionLink>
      </Reveal>
      <Reveal variant="up" delay={0.2} className="ct-b__rest">
        <WhatsappLink className="btn btn--primary" />
        <dl className="ct-b__list">
          <div className="ct-b__row">
            <dt>Ünvan</dt>
            <dd>
              <Editable.Text as="span" k="contact.address" label="Ünvan" max={120} />
            </dd>
          </div>
          <div className="ct-b__row">
            <dt>İş saatları</dt>
            <dd>
              <Editable.Text as="span" k="contact.hours" label="İş saatları" max={80} />
            </dd>
          </div>
        </dl>
      </Reveal>
    </section>
  )
}

const CONTACT: Record<TemplateId, () => React.JSX.Element> = {
  xidmet: ContactXidmet,
  klinika: ContactKlinika,
  kafe: ContactKafe,
  bosh: ContactBosh,
  huquq: ContactHuquq,
  gozellik: ContactGozellik,
  idman: ContactIdman,
  tikinti: ContactTikinti,
  kurs: ContactKurs,
  studiya: ContactStudiya,
}

export function ContactPage() {
  const { site } = useSite()
  const Body = CONTACT[site.template]
  return (
    <>
      <PageHead page="contact" titleKey="contact.title" leadKey="contact.lead" />
      <SectionFrame id="contact.info" label="Əlaqə məlumatları">
        <Body />
      </SectionFrame>
      <ExtraBlocks page="contact" />
    </>
  )
}
