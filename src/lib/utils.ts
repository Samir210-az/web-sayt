import { EDITOR_PREFIX, TEMPLATE_PREFIX } from './types'
import type { TemplateId } from './types'

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

export function pageHref(path: string, editing: boolean, template: TemplateId): string {
  const prefix = `${editing ? EDITOR_PREFIX : TEMPLATE_PREFIX}/${template}`
  return path === '/' ? prefix : `${prefix}${path}`
}

export function telHref(value: string): string | undefined {
  const cleaned = value.replace(/[^\d+]/g, '')
  return /^\+?\d{7,15}$/.test(cleaned) ? `tel:${cleaned}` : undefined
}

export function whatsappHref(value: string): string | undefined {
  const digits = value.replace(/\D/g, '')
  return /^\d{7,15}$/.test(digits) ? `https://wa.me/${digits}` : undefined
}

export function mailHref(value: string): string | undefined {
  const trimmed = value.trim()
  return /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(trimmed) ? `mailto:${trimmed}` : undefined
}
