import Link from 'next/link'
import { TEMPLATES } from '@/lib/template-registry'
import { TemplatePreview } from './template-preview'
import { EDITOR_PREFIX, TEMPLATE_PREFIX } from '@/lib/types'

export function TemplateCards({ mode }: { mode: 'preview' | 'edit' }) {
  const prefix = mode === 'edit' ? EDITOR_PREFIX : TEMPLATE_PREFIX

  return (
    <ul className="lp-cards">
      {TEMPLATES.map((t) => (
        <li key={t.id}>
          <Link href={`${prefix}/${t.id}`} className="lp-card">
            <div className={`lp-card__art lp-card__art--${t.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/previews/${t.id}-thumb.jpg`}
                alt={`${t.name} şablonunun ana səhifəsi`}
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="lp-card__meta">
              <strong>{t.name}</strong>
              <span>{t.kind}</span>
            </div>
          </Link>
          <TemplatePreview id={t.id} name={t.name} />
        </li>
      ))}
    </ul>
  )
}
