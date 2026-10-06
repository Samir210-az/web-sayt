import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Evdar: nümunə şablon', template: '%s | Evdar' },
  description: 'Xidmət şirkətləri üçün nümunə şablon: elektrik, santexnika, kondisioner və kiçik təmir.',
}

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return children
}
