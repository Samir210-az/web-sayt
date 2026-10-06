'use client'

import Link from 'next/link'
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

function Direction({ n, to }: { n: number; to: string }) {
  const { editing, href } = useSite()
  const inner = (
    <>
      <Editable.Text as="span" k={`home.search.${n}.title`} className="em-find__name" label={`${n}-ci istiqamətin adı`} max={24} />
      <Editable.Text as="span" k={`home.search.${n}.text`} className="em-find__hint" label={`${n}-ci istiqamətin izahı`} max={48} />
      <span className="em-find__go" aria-hidden="true" />
    </>
  )
  return (
    <li>
      {editing ? (
        <div className="em-find__item">{inner}</div>
      ) : (
        <Link className="em-find__item" href={href(to)}>
          {inner}
        </Link>
      )}
    </li>
  )
}

export function HomeEmlak() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('em-hero', !editing && 'em-hero--enter')}>
          <div className="em-hero__grid wrap">
            <div className="em-hero__copy">
              <Editable.Text as="p" k="home.hero.chip" className="em-tag" label="Kiçik yazı" max={30} />
              <Editable.Text as="h1" k="home.hero.title" className="em-hero__title" label="Əsas başlıq" max={110} />
              <Editable.Text as="p" k="home.hero.lead" className="em-hero__lead" label="Giriş mətni" multiline max={240} />
              <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
              </ActionLink>
            </div>
            <div className="em-hero__visual">
              <Parallax speed={0.1} bleed className="em-hero__photo">
                <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
              </Parallax>
              <Parallax speed={-0.1} bleed className="em-hero__inset">
                <Editable.Image k="home.hero.float" label="Kiçik şəkil" />
              </Parallax>
            </div>
          </div>
          <nav className="em-find wrap" aria-label="Xidmət istiqamətləri">
            <div className="em-find__card">
              <Editable.Text as="p" k="home.search.title" className="em-find__title" label="Zolağın başlığı" max={40} />
              <ul className="em-find__list">
                <Direction n={1} to="/xidmetler" />
                <Direction n={2} to="/xidmetler" />
                <Direction n={3} to="/elaqe" />
              </ul>
            </div>
          </nav>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block em-listings">
          <ServicesHead linkClass="em-more" />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.facts" label="Qısa məlumat">
        <section className="em-facts wrap">
          <dl className="em-facts__list">
            {[1, 2, 3].map((n) => (
              <Reveal as="div" key={n} delay={(n - 1) * 0.1} className="em-facts__item">
                <dt>
                  <Editable.Text as="span" k={`home.facts.${n}.value`} label={`${n}-ci göstəricinin dəyəri`} max={12} />
                </dt>
                <dd>
                  <Editable.Text as="span" k={`home.facts.${n}.label`} label={`${n}-ci göstəricinin izahı`} max={60} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="em-steps">
          <div className="em-steps__grid wrap">
            <Reveal as="div" className="em-steps__head">
              <Editable.Text as="h2" k="home.process.title" className="em-steps__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="em-steps__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="em-cta wrap">
          <div className="em-cta__box">
            <Parallax speed={0.08} bleed className="em-cta__img">
              <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
            </Parallax>
            <div className="em-cta__copy">
              <CtaCopy titleClass="em-cta__title" textClass="em-cta__text" buttonClass="btn btn--primary" />
            </div>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

export function AboutEmlak() {
  return (
    <SectionFrame id="about.story" label="Hekayə">
      <section className="em-about wrap">
        <aside className="em-agent">
          <Reveal variant="up" className="em-agent__card">
            <Parallax speed={0.08} bleed className="em-agent__photo">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
            <div className="em-agent__stub">
              <Editable.Text as="h2" k="about.agent.title" className="em-agent__title" label="Kartın başlığı" max={30} />
              <Editable.Text as="p" k="about.agent.text" className="em-agent__text" label="Kartın mətni" multiline max={120} />
            </div>
          </Reveal>
        </aside>
        <div className="em-about__body">
          <Reveal variant="up">
            <StoryCopy leadClass="em-about__lead" textClass="em-about__text" />
          </Reveal>
          <ValuesTitle className="em-about__sub" />
          <ValueItems listClass="em-rules" itemClass="em-rules__item" stagger={0.08} />
        </div>
      </section>
    </SectionFrame>
  )
}

export function ContactEmlak() {
  const { tel } = useContactLinks()
  return (
    <section className="em-contact wrap">
      <Reveal variant="up" className="em-contact__call">
        <Editable.Text as="p" k="contact.panel.title" className="em-contact__hint" label="Panelin başlığı" max={30} />
        <ActionLink className="em-contact__phone" href={tel}>
          <PhoneField />
        </ActionLink>
        <WhatsappLink className="btn btn--ghost em-contact__wa" />
      </Reveal>
      <Reveal variant="up" delay={0.1} className="em-contact__info">
        <ContactRows wrapClass="em-ticket" rowClass="em-ticket__row" />
      </Reveal>
    </section>
  )
}
