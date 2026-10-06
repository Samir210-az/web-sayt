'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { mailHref, telHref, whatsappHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, PageHead, SectionFrame, ServiceList } from './blocks'

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
          <Reveal variant="left" className="story__media">
            <Parallax speed={0.1} bleed className="story__frame">
              <Editable.Image k="about.main" label="Komanda şəkli" />
            </Parallax>
          </Reveal>
          <Reveal variant="right" className="story__copy">
            <Editable.Text as="p" k="about.body1" className="story__lead" label="Birinci abzas" multiline max={400} />
            <Editable.Text as="p" k="about.body2" className="story__text" label="İkinci abzas" multiline max={400} />
          </Reveal>
        </section>
      </SectionFrame>
      <SectionFrame id="about.values" label="Prinsiplər">
        <section className="values">
          <div className="wrap">
            <Editable.Text as="h2" k="about.values.title" className="block__title" label="Bölmənin başlığı" max={60} />
            <ul className="values__list">
              {[1, 2, 3].map((n) => (
                <Reveal as="li" key={n} delay={(n - 1) * 0.12} className="values__item">
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
                </Reveal>
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
