import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Evdar', template: '%s | Evdar' },
  description: 'Elektrik, santexnika, kondisioner və kiçik təmir işləri: eyni gün gəliş, əvvəlcədən razılaşdırılmış qiymət.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d2330',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body>{children}</body>
    </html>
  )
}
