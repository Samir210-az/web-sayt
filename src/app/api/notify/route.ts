import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const LOOKUP_URL = process.env.IDENTITY_LOOKUP_URL ?? 'https://identitytoolkit.googleapis.com/v1/accounts:lookup'
const TELEGRAM_URL = process.env.TELEGRAM_API_URL ?? 'https://api.telegram.org'
const SUBDOMAIN = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/
const TEMPLATES = ['xidmet', 'klinika', 'kafe', 'huquq', 'gozellik', 'idman', 'tikinti', 'kurs', 'studiya', 'usaq', 'bosh']
const WINDOW_MS = { login: 10 * 60_000, publish: 20_000 }
const lastSent = new Map<string, number>()

interface Body {
  event?: unknown
  idToken?: unknown
  name?: unknown
  template?: unknown
}

interface LookupUser {
  localId: string
  email?: string
  createdAt?: string
  lastLoginAt?: string
}

const empty = (status: number) => new NextResponse(null, { status })

async function lookupUser(idToken: string): Promise<LookupUser | null> {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!key) return null
  const res = await fetch(`${LOOKUP_URL}?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })
  if (!res.ok) return null
  const data = (await res.json()) as { users?: LookupUser[] }
  return data.users?.[0] ?? null
}

async function ownsSubdomain(name: string, uid: string): Promise<boolean> {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  if (!base) return false
  const res = await fetch(`${base.replace(/\/$/, '')}/subdomains/${name}.json`)
  if (!res.ok) return false
  const value = (await res.json()) as { ownerId?: string } | null
  return value?.ownerId === uid
}

function throttled(kind: 'login' | 'publish', uid: string): boolean {
  const key = `${kind}:${uid}`
  const now = Date.now()
  const previous = lastSent.get(key)
  if (previous && now - previous < WINDOW_MS[kind]) return true
  lastSent.set(key, now)
  if (lastSent.size > 2000) lastSent.clear()
  return false
}

async function send(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return false
  const res = await fetch(`${TELEGRAM_URL}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  })
  return res.ok
}

export async function POST(request: Request) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return empty(204)

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return empty(400)
  }
  if (typeof body.idToken !== 'string' || body.idToken.length > 4000) return empty(400)
  if (body.event !== 'login' && body.event !== 'publish') return empty(400)

  const user = await lookupUser(body.idToken).catch(() => null)
  if (!user) return empty(401)
  if (throttled(body.event, user.localId)) return empty(204)

  const email = (user.email ?? 'e-poçt yoxdur').slice(0, 120)
  const template =
    typeof body.template === 'string' && TEMPLATES.includes(body.template) ? body.template : 'naməlum'

  if (body.event === 'login') {
    const isNew =
      user.createdAt && user.lastLoginAt ? Number(user.lastLoginAt) - Number(user.createdAt) < 2 * 60_000 : false
    const lines = [
      isNew ? 'web-sayt: yeni istifadəçi qeydiyyatdan keçdi' : 'web-sayt: istifadəçi sistemə daxil oldu',
      `E-poçt: ${email}`,
      `Şablon: ${template}`,
    ]
    await send(lines.join('\n')).catch(() => false)
    return empty(204)
  }

  const name = typeof body.name === 'string' ? body.name : ''
  if (!SUBDOMAIN.test(name)) return empty(400)
  const owns = await ownsSubdomain(name, user.localId).catch(() => false)
  if (!owns) return empty(403)

  const origin = new URL(request.url).origin
  const lines = ['web-sayt: sayt dərc olundu', `E-poçt: ${email}`, `Şablon: ${template}`, `Link: ${origin}/s/${name}`]
  await send(lines.join('\n')).catch(() => false)
  return empty(204)
}
