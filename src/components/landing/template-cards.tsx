import Link from 'next/link'
import { TEMPLATES } from '@/lib/template-registry'
import { EDITOR_PREFIX, TEMPLATE_PREFIX } from '@/lib/types'

export function TemplateCards({ mode }: { mode: 'preview' | 'edit' }) {
  const prefix = mode === 'edit' ? EDITOR_PREFIX : TEMPLATE_PREFIX

  return (
    <ul className="lp-cards">
      {TEMPLATES.map((t) => (
        <li key={t.id}>
          <Link href={`${prefix}/${t.id}`} className="lp-card">
            <div className={`lp-card__art lp-card__art--${t.id}`}>
              <i />
              <i />
              <i />
            </div>
            <div className="lp-card__meta">
              <strong>{t.name}</strong>
              <span>{t.kind}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
