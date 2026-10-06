'use client'

import { Editable } from '@/components/editable'
import { Reveal } from '@/components/motion'
import { useSite } from '@/lib/site-context'
import { mailHref, telHref, whatsappHref } from '@/lib/utils'
import { ActionLink } from './blocks'

export function ValuesTitle({ className }: { className: string }) {
  return <Editable.Text as="h2" k="about.values.title" className={className} label="Bölmənin başlığı" max={60} />
}

export function ValueItems({ itemClass, listClass, stagger = 0.12 }: { itemClass: string; listClass: string; stagger?: number }) {
  return (
    <ul className={listClass}>
      {[1, 2, 3].map((n) => (
        <Reveal as="li" key={n} delay={(n - 1) * stagger} className={itemClass}>
          <Editable.Text as="h3" k={`about.value.${n}.title`} className="values__name" label={`${n}-ci prinsipin adı`} max={30} />
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
  )
}

export function StoryCopy({ leadClass = 'story__lead', textClass = 'story__text' }: { leadClass?: string; textClass?: string }) {
  return (
    <>
      <Editable.Text as="p" k="about.body1" className={leadClass} label="Birinci abzas" multiline max={400} />
      <Editable.Text as="p" k="about.body2" className={textClass} label="İkinci abzas" multiline max={400} />
    </>
  )
}

export function useContactLinks() {
  const { text } = useSite()
  return {
    tel: telHref(text('contact.phone')),
    wa: whatsappHref(text('contact.whatsapp')),
    mail: mailHref(text('contact.email')),
  }
}

export function PhoneField() {
  return <Editable.Text as="span" k="contact.phone" label="Telefon nömrəsi" max={24} />
}

export function WhatsappLink({ className }: { className: string }) {
  const { wa } = useContactLinks()
  return (
    <ActionLink className={className} href={wa} external>
      <span>WhatsApp: </span>
      <Editable.Text as="span" k="contact.whatsapp" label="WhatsApp nömrəsi" max={24} />
    </ActionLink>
  )
}

export function ContactRows({ rowClass, wrapClass }: { rowClass: string; wrapClass: string }) {
  const { mail } = useContactLinks()
  return (
    <dl className={wrapClass}>
      <div className={rowClass}>
        <dt>E-poçt</dt>
        <dd>
          <ActionLink className="textlink" href={mail}>
            <Editable.Text as="span" k="contact.email" label="E-poçt ünvanı" max={80} />
          </ActionLink>
        </dd>
      </div>
      <div className={rowClass}>
        <dt>Ünvan</dt>
        <dd>
          <Editable.Text as="span" k="contact.address" label="Ünvan" max={120} />
        </dd>
      </div>
      <div className={rowClass}>
        <dt>İş saatları</dt>
        <dd>
          <Editable.Text as="span" k="contact.hours" label="İş saatları" max={80} />
        </dd>
      </div>
    </dl>
  )
}
