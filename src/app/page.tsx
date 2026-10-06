import { SiteShell } from '@/components/template/shell'
import { HomePage } from '@/components/template/pages'

export default function Page() {
  return (
    <SiteShell editing={false} current="home">
      <HomePage />
    </SiteShell>
  )
}
