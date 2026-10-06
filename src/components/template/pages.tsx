'use client'

import Link from 'next/link'
import { Editable } from '@/components/editable'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, mailHref, pageHref, telHref, whatsappHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, PageHead, SectionFrame, ServiceList } from './blocks'

export function HomePage() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('hero', !editing && 'hero--enter')}>
          <div className="hero__stage">
            <Parallax speed={0.14} bleed className="hero__panel">
              <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
            </Parallax>
            <div className="hero__copy wrap">
              <Editable.Text as="h1" k="home.hero.title" className="hero__title" label="Əsas başlıq" max={110} />
              <Editable.Text
                as="p"
                k="home.hero.lead"
                className="hero__lead"
                label="Giriş mətni"
                multiline
                max={240}
              />
              <div className="hero__actions">
                <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                  <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
                </ActionLink>
              </div>
            </div>
            <Parallax speed={-0.16} bleed className="hero__float">
              <Editable.Image k="home.hero.float" label="Üzən şəkil" />
            </Parallax>
            <Parallax speed={0.05} className="hero__chip">
              <Editable.Text as="span" k="home.hero.chip" className="chip" label="Qısa məlumat" max={50} />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block">
          <div className="wrap block__head">
            <Editable.Text as="h2" k="home.services.title" className="block__title" label="Bölmənin başlığı" max={60} />
            <Link href={pageHref('/xidmetler', editing)} className="textlink">
              <Editable.Text as="span" k="home.services.link" label="Keçidin yazısı" max={30} />
            </Link>
          </div>
          <ServiceList limit={3} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="process">
          <div className="wrap">
            <Editable.Text as="h2" k="home.process.title" className="block__title" label="Bölmənin başlığı" max={60} />
            <ol className="process__list">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="process__step">
                  <Editable.Text
                    as="h3"
                    k={`home.process.${n}.title`}
                    className="process__name"
                    label={`${n}-ci addımın adı`}
                    max={30}
                  />
                  <Editable.Text
                    as="p"
                    k={`home.process.${n}.text`}
                    className="process__text"
                    label={`${n}-ci addımın təsviri`}
                    multiline
                    max={160}
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="cta">
          <Parallax speed={0.18} bleed className="cta__bg">
            <Editable.Image k="home.cta.bg" label="Fon şəkli" />
          </Parallax>
          <div className="cta__veil" />
          <div className="cta__copy wrap">
            <Editable.Text as="h2" k="home.cta.title" className="cta__title" label="Çağırışın başlığı" max={70} />
            <Editable.Text
              as="p"
              k="home.cta.text"
              className="cta__text"
              label="Çağırışın mətni"
              multiline
              max={180}
            />
            <Link href={pageHref('/elaqe', editing)} className="btn btn--accent">
              <Editable.Text as="span" k="home.cta.button" label="Düymənin yazısı" max={30} />
            </Link>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

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

export function AboutPage() {
  return (
    <>
      <PageHead page="about" titleKey="about.title" leadKey="about.lead" />
      <SectionFrame id="about.story" label="Hekayə">
        <section className="story wrap">
          <div className="story__media">
            <Parallax speed={0.1} bleed className="story__frame">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
          </div>
          <div className="story__copy">
            <Editable.Text as="p" k="about.body1" className="story__lead" label="Birinci abzas" multiline max={400} />
            <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
          </div>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="values">
          <div className="wrap">
            <Editable.Text as="h2" k="about.values.title" className="block__title" label="Bölmənin başlığı" max={60} />
            <ul className="values__list">
              {[1, 2, 3].map((n) => (
                <li key={n} className="values__item">
                  <Editable.Text
                    as="h3"
                    k={`about.value.${n}.title`}
                    className="values__name"
                    label={`${n}-ci prinsipin adı`}
                    max={30}
                  />
                  <Editable.Text
                    as="p"
                    k={`about.value.${n}.text`}
                    className="values__text"
                    label={`${n}-ci prinsipin təsviri`}
                    multiline
                    max={160}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SectionFrame>
      <ExtraBlocks page="about" />
    </>
  )
}

export function ContactPage() {
  const { text } = useSite()
  const phone = text('contact.phone')
  const whatsapp = text('contact.whatsapp')
  const email = text('contact.email')

  return (
    <>
      <PageHead page="contact" titleKey="contact.title" leadKey="contact.lead" />
      <SectionFrame id="contact.info" label="Əlaqə məlumatları">
        <section className="contact wrap">
          <div className="contact__actions">
            <ActionLink className="btn btn--primary" href={telHref(phone)}>
              <Editable.Text as="span" k="contact.phone" label="Telefon nömrəsi" max={24} />
            </ActionLink>
            <ActionLink className="btn btn--ghost" href={whatsappHref(whatsapp)} external>
              <span>WhatsApp: </span>
              <Editable.Text as="span" k="contact.whatsapp" label="WhatsApp nömrəsi" max={24} />
            </ActionLink>
          </div>
          <dl className="contact__list">
            <div className="contact__row">
              <dt>E-poçt</dt>
              <dd>
                <ActionLink className="textlink" href={mailHref(email)}>
                  <Editable.Text as="span" k="contact.email" label="E-poçt ünvanı" max={80} />
                </ActionLink>
              </dd>
            </div>
            <div className="contact__row">
              <dt>Ünvan</dt>
              <dd>
                <Editable.Text as="span" k="contact.address" label="Ünvan" max={120} />
              </dd>
            </div>
            <div className="contact__row">
              <dt>İş saatları</dt>
              <dd>
                <Editable.Text as="span" k="contact.hours" label="İş saatları" max={80} />
              </dd>
            </div>
          </dl>
        </section>
      </SectionFrame>
      <ExtraBlocks page="contact" />
    </>
  )
}
