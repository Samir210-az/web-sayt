'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { SectionFrame, ActionLink } from './blocks'
import {
  ContactRows,
  PhoneField,
  StoryCopy,
  ValueItems,
  ValuesTitle,
  WhatsappLink,
  useContactLinks,
} from './page-parts'

function StoryImage({ className, speed = 0.1 }: { className: string; speed?: number }) {
  return (
    <Parallax speed={speed} bleed className={className}>
      <Editable.Image k="about.main" label="Komanda şəkli" />
    </Parallax>
  )
}

export function AboutHuquq() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="ab-h wrap">
        <Reveal variant="left" className="ab-h__media">
          <StoryImage className="ab-h__frame" speed={0.06} />
        </Reveal>
        <div className="ab-h__copy">
          <Reveal variant="up">
            <StoryCopy leadClass="ab-h__lead" />
          </Reveal>
          <ValuesTitle className="ab-h__title" />
          <ValueItems listClass="ab-h__list" itemClass="ab-h__item" stagger={0.08} />
        </div>
      </section>
    </SectionFrame>
  )
}

export function AboutGozellik() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="ab-g wrap">
        <Reveal variant="up" className="ab-g__lead">
          <Editable.Text as="p" k="about.body1" className="ab-g__quote" label="Birinci abzas" multiline max={400} />
        </Reveal>
        <Reveal variant="zoom" className="ab-g__media">
          <StoryImage className="ab-g__oval" speed={0.08} />
          <Parallax speed={-0.12} className="ab-g__dot ab-g__dot--a">
            <span />
          </Parallax>
          <Parallax speed={0.1} className="ab-g__dot ab-g__dot--b">
            <span />
          </Parallax>
        </Reveal>
        <Reveal variant="up" className="ab-g__text">
          <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
        </Reveal>
        <ValuesTitle className="ab-g__title" />
        <ValueItems listClass="ab-g__list" itemClass="ab-g__item" stagger={0.1} />
      </section>
    </SectionFrame>
  )
}

export function AboutIdman() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="ab-i">
        <Reveal variant="zoom" className="ab-i__hero">
          <StoryImage className="ab-i__frame" speed={0.12} />
          <div className="ab-i__over wrap">
            <Editable.Text as="p" k="about.body1" className="ab-i__lead" label="Birinci abzas" multiline max={400} />
          </div>
        </Reveal>
        <div className="wrap ab-i__body">
          <Reveal variant="up" className="ab-i__text">
            <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
          <div className="ab-i__values">
            <ValuesTitle className="ab-i__title" />
            <ValueItems listClass="ab-i__list" itemClass="ab-i__item" stagger={0.08} />
          </div>
        </div>
      </section>
    </SectionFrame>
  )
}

export function AboutTikinti() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="ab-t wrap">
        <Reveal variant="left" className="ab-t__media">
          <StoryImage className="ab-t__frame" speed={0.08} />
        </Reveal>
        <Reveal variant="right" className="ab-t__copy">
          <StoryCopy leadClass="ab-t__lead" />
        </Reveal>
        <div className="ab-t__spec">
          <ValuesTitle className="ab-t__title" />
          <ValueItems listClass="ab-t__list" itemClass="ab-t__item" stagger={0.06} />
        </div>
      </section>
    </SectionFrame>
  )
}

export function AboutKurs() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="ab-r wrap">
        <Reveal variant="up" className="ab-r__bubble">
          <Editable.Text as="p" k="about.body1" className="ab-r__lead" label="Birinci abzas" multiline max={400} />
          <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
        </Reveal>
        <Reveal variant="zoom" className="ab-r__media">
          <StoryImage className="ab-r__frame" speed={0.08} />
        </Reveal>
        <ValuesTitle className="ab-r__title" />
        <ValueItems listClass="ab-r__list" itemClass="ab-r__item" stagger={0.1} />
      </section>
    </SectionFrame>
  )
}

export function AboutStudiya() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="ab-s">
        <Reveal variant="zoom" className="ab-s__banner">
          <StoryImage className="ab-s__frame" speed={0.1} />
        </Reveal>
        <div className="wrap ab-s__cols">
          <Reveal variant="up" className="ab-s__lead">
            <Editable.Text as="p" k="about.body1" className="ab-s__quote" label="Birinci abzas" multiline max={400} />
          </Reveal>
          <Reveal variant="up" delay={0.1} className="ab-s__text">
            <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </div>
        <div className="wrap ab-s__values">
          <ValuesTitle className="ab-s__title" />
          <ValueItems listClass="ab-s__list" itemClass="ab-s__item" stagger={0.08} />
        </div>
      </section>
    </SectionFrame>
  )
}

export function ContactHuquq() {
  const { tel } = useContactLinks()
  return (
    <section className="cx-h wrap">
      <Reveal variant="up" className="cx-h__main">
        <ActionLink className="cx-h__phone" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--primary" />
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <ContactRows wrapClass="cx-h__list" rowClass="cx-h__row" />
      </Reveal>
    </section>
  )
}

export function ContactGozellik() {
  const { tel } = useContactLinks()
  return (
    <section className="cx-g wrap">
      <Reveal variant="up" className="cx-g__book">
        <ActionLink className="btn btn--primary" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost" />
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <ContactRows wrapClass="cx-g__grid" rowClass="cx-g__cell" />
      </Reveal>
    </section>
  )
}

export function ContactIdman() {
  const { tel } = useContactLinks()
  return (
    <section className="cx-i wrap">
      <Reveal variant="up">
        <WhatsappLink className="cx-i__wa" />
      </Reveal>
      <Reveal variant="up" delay={0.1} className="cx-i__tel">
        <ActionLink className="btn btn--ghost" href={tel}>
          <PhoneField />
        </ActionLink>
      </Reveal>
      <Reveal variant="up" delay={0.15}>
        <ContactRows wrapClass="cx-i__list" rowClass="cx-i__row" />
      </Reveal>
    </section>
  )
}

export function ContactTikinti() {
  const { tel } = useContactLinks()
  return (
    <section className="cx-t wrap">
      <Reveal variant="left" className="cx-t__call">
        <ActionLink className="btn btn--primary" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost" />
      </Reveal>
      <Reveal variant="right">
        <ContactRows wrapClass="cx-t__table" rowClass="cx-t__row" />
      </Reveal>
    </section>
  )
}

export function ContactKurs() {
  const { tel } = useContactLinks()
  return (
    <section className="cx-r wrap">
      <Reveal variant="up" className="cx-r__top">
        <ActionLink className="btn btn--primary" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost" />
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <ContactRows wrapClass="cx-r__notes" rowClass="cx-r__note" />
      </Reveal>
    </section>
  )
}

export function ContactStudiya() {
  const { tel, mail } = useContactLinks()
  return (
    <section className="cx-s wrap">
      <Reveal variant="up">
        <ActionLink className="cx-s__mail" href={mail}>
          <Editable.Text as="span" k="contact.email" label="E-poçt ünvanı" max={80} />
        </ActionLink>
      </Reveal>
      <Reveal variant="up" delay={0.1} className="cx-s__rest">
        <div className="cx-s__actions">
          <ActionLink className="btn btn--primary" href={tel}>
            <PhoneField />
          </ActionLink>
          <WhatsappLink className="btn btn--ghost" />
        </div>
        <dl className="cx-s__list">
          <div className="cx-s__row">
            <dt>Ünvan</dt>
            <dd>
              <Editable.Text as="span" k="contact.address" label="Ünvan" max={120} />
            </dd>
          </div>
          <div className="cx-s__row">
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
