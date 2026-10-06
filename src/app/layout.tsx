import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/manrope'
import '@fontsource-variable/fraunces'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'web-sayt: şirkətinizin saytını özünüz yaradın', template: '%s | web-sayt' },
  description: 'Hazır şablon seçin, mətni və şəkli səhifənin üstündə birbaşa dəyişin, öz bölmələrinizi əlavə edin.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  themeColor: '#0d2330',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body>{children}</body>
    </html>
  )
}
