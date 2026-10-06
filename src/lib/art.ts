import type { ImageValue, SiteConfig, TemplateId } from './types'

const ART_ALT: Partial<Record<TemplateId, string>> = {
  xidmet: 'Boru, kran və açar təsvir edilən illüstrasiya',
  klinika: 'Tağ və tibb xaçı təsvir edilən illüstrasiya',
  kafe: 'Asma lampa altında qəhvə fincanı təsvir edilən illüstrasiya',
  gozellik: 'Çiçək və baxım vasitələri təsvir edilən illüstrasiya',
  idman: 'Ştanq və girya təsvir edilən illüstrasiya',
  tikinti: 'Tikilən bina və kran təsvir edilən illüstrasiya',
  kurs: 'Kitablar və qələm təsvir edilən illüstrasiya',
  studiya: 'Kamera obyektivi və kino lenti təsvir edilən illüstrasiya',
  usaq: 'Rəngli kublar, buludlar və uçurtma təsvir edilən illüstrasiya',
  emlak: 'Müasir yaşayış binası və açar təsvir edilən illüstrasiya',
  avto: 'Avtomobil mühərriki və diaqnostika alətləri təsvir edilən illüstrasiya',
  stomat: 'Diş və təbəssüm təsvir edilən yumşaq illüstrasiya',
  turizm: 'Dağlar, dəniz və təyyarə izi təsvir edilən səyahət illüstrasiyası',
  gul: 'Çiçək buketi və lent təsvir edilən illüstrasiya',
  interyer: 'Kreslo, lampa və bitki olan sakit interyer illüstrasiyası',
  it: 'Kod pəncərələri və şəbəkə düyünləri təsvir edilən illüstrasiya',
  toy: 'Qapı tağı, lüstr və süfrə təsvir edilən illüstrasiya',
  berber: 'Ülgüc, daraq və bərbər dirəyi təsvir edilən illüstrasiya',
}

const SLOT_FOCUS: Record<string, [number, number]> = {
  'home.hero.panel': [50, 50],
  'home.hero.float': [28, 55],
  'home.hero.third': [72, 55],
  'home.cta.bg': [50, 55],
  'about.main': [42, 50],
}

const SERVICE_FOCUS: [number, number][] = [
  [50, 50],
  [30, 55],
  [70, 50],
  [50, 62],
]

export function withArt(id: TemplateId, site: SiteConfig): SiteConfig {
  const alt = ART_ALT[id]
  if (!alt) return site
  const src = `/images/${id}/art.webp`
  const fill = (value: ImageValue, focus: [number, number]): ImageValue =>
    value.src ? value : { src, alt, focusX: focus[0], focusY: focus[1] }

  return {
    ...site,
    images: Object.fromEntries(
      Object.entries(site.images).map(([key, value]) => [key, fill(value, SLOT_FOCUS[key] ?? [50, 50])]),
    ),
    services: site.services.map((item, i) => ({ ...item, image: fill(item.image, SERVICE_FOCUS[i % SERVICE_FOCUS.length]) })),
  }
}
