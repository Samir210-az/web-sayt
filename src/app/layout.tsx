import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/manrope'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/oswald'
import '@fontsource-variable/inter'
import '@fontsource-variable/onest'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/cormorant'
import '@fontsource-variable/playfair-display'
import './globals.css'
import './templates-more.css'
import './t-emlak.css'
import './t-avto.css'
import './t-stomat.css'
import './t-turizm.css'
import './t-gul.css'
import './t-interyer.css'
import './t-it.css'
import './t-toy.css'
import './t-berber.css'

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
