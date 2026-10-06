import type { User } from 'firebase/auth'
import type { TemplateId } from './types'

type Payload = { event: 'login'; template?: TemplateId } | { event: 'publish'; template: TemplateId; name: string }

export async function notifyOwner(user: User, payload: Payload): Promise<void> {
  try {
    const idToken = await user.getIdToken()
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, idToken }),
      keepalive: true,
    })
  } catch {
    // bildiriş alınmasa redaktorun işi dayanmamalıdır
  }
}
