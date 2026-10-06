import type { ImageValue, PageKey, ServiceItem, SiteConfig } from './types'

export const img = (alt: string, focusX = 50, focusY = 50): ImageValue => ({ src: '', alt, focusX, focusY })

export const service = (id: string, title: string, text: string, alt: string): ServiceItem => ({
  id,
  title,
  text,
  image: img(alt),
})

export const DEFAULT_ACCENT = '#2b44c9'

export function createDefaultSite(): SiteConfig {
  return {
    version: 1,
    template: 'xidmet',
    theme: { accent: DEFAULT_ACCENT },
    logo: img('Loqo'),
    text: {
      'brand.name': 'Evdar',

      'home.hero.title': 'Evinizdəki hər problem bir zəngə qədər yaxındır',
      'home.hero.lead':
        'Elektrik, santexnika, kondisioner və kiçik təmir işlərini eyni gün gəlib, qiyməti əvvəlcədən deyib görürük.',
      'home.hero.cta': 'Zəng sifariş et',
      'home.hero.chip': 'Bakı üzrə eyni gün gəliş',

      'home.services.title': 'Nələrlə məşğul oluruq',
      'home.services.link': 'Bütün xidmətlər',

      'home.process.title': 'İş necə gedir',
      'home.process.1.title': 'Müraciət',
      'home.process.1.text': 'Zəng edirsiniz və ya yazırsınız, problemi qısaca izah edirsiniz.',
      'home.process.2.title': 'Qiymət',
      'home.process.2.text': 'Usta işə başlamazdan əvvəl qiyməti və müddəti deyir.',
      'home.process.3.title': 'İcra',
      'home.process.3.text': 'İş razılaşdırılmış vaxtda görülür, iş yeri təmiz qalır.',
      'home.process.4.title': 'Zəmanət',
      'home.process.4.text': 'Görülən işə yazılı zəmanət verilir.',

      'home.cta.title': 'Problemi bu gün həll edək',
      'home.cta.text': 'Zəng edin, ustanın nə vaxt gələ biləcəyini dərhal deyək.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Xidmətlər',
      'services.page.lead': 'Hər xidmətin qiyməti işə başlamazdan əvvəl razılaşdırılır.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Evdar kiçik və təcrübəli ustalar komandasıdır.',
      'about.body1':
        'Biz ev və mənzil sahiblərinin gündəlik problemlərini tez və səliqəli həll etmək üçün bir araya gəlmişik.',
      'about.body2':
        'Hər sifarişdə eyni qaydaya əməl edirik: əvvəl qiymət, sonra iş, sonda zəmanət.',
      'about.values.title': 'Prinsiplərimiz',
      'about.value.1.title': 'Açıq qiymət',
      'about.value.1.text': 'İş zamanı gözlənilməz əlavə ödəniş yoxdur.',
      'about.value.2.title': 'Vaxta hörmət',
      'about.value.2.text': 'Razılaşdırılan vaxtda gəlirik, gecikəcəksək əvvəlcədən xəbər veririk.',
      'about.value.3.title': 'Səliqə',
      'about.value.3.text': 'İşdən sonra yeri təmizləyib təhvil veririk.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Zəng edin və ya yazın, eyni gün cavab veririk.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@evdar.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'Hər gün 09:00 – 21:00',

      'footer.text': 'Bütün hüquqlar qorunur.',
    },
    images: {
      'home.hero.panel': img('Usta mənzildə iş görür'),
      'home.hero.float': img('Alətlər və təchizat'),
      'home.cta.bg': img('İşıqlı və səliqəli mənzil'),
      'about.main': img('Komandamız iş başında'),
    },
    services: [
      service('s1', 'Elektrik işləri', 'Rozetka, açar, lampa, şit və naqillərin quraşdırılması və təmiri.', 'Elektrik şiti'),
      service('s2', 'Santexnika', 'Kran, unitaz, qazan və boruların təmiri və dəyişdirilməsi.', 'Santexnika işi'),
      service('s3', 'Kondisioner', 'Quraşdırma, təmizləmə, qaz doldurma və servis.', 'Kondisioner quraşdırılması'),
      service('s4', 'Kiçik təmir', 'Mebel yığımı, qapı, kilid və divar işləri.', 'Kiçik təmir işi'),
    ],
    extras: { home: [], services: [], about: [], contact: [] } satisfies Record<PageKey, never[]>,
    hidden: {},
  }
}
