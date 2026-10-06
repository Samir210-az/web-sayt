import { img, service } from '../default-site'
import type { SiteConfig } from '../types'

export function createBoshSite(): SiteConfig {
  return {
    version: 1,
    template: 'bosh',
    theme: { accent: '#3d5afe' },
    logo: img('Loqo'),
    text: {
      'brand.name': 'Şirkətinizin adı',

      'home.hero.title': 'Əsas başlığınızı bura yazın',
      'home.hero.lead': 'Şirkətinizin nə etdiyini bir-iki cümlə ilə izah edin.',
      'home.hero.cta': 'Düymənin yazısı',
      'home.hero.chip': 'Qısa məlumat',

      'home.services.title': 'Xidmətləriniz',
      'home.services.link': 'Hamısına bax',

      'home.process.title': 'İş qaydası',
      'home.process.1.title': 'Birinci addım',
      'home.process.1.text': 'Bu addımda nə baş verdiyini yazın.',
      'home.process.2.title': 'İkinci addım',
      'home.process.2.text': 'Bu addımda nə baş verdiyini yazın.',
      'home.process.3.title': 'Üçüncü addım',
      'home.process.3.text': 'Bu addımda nə baş verdiyini yazın.',
      'home.process.4.title': 'Dördüncü addım',
      'home.process.4.text': 'Bu addımda nə baş verdiyini yazın.',

      'home.cta.title': 'Çağırışınızı yazın',
      'home.cta.text': 'Ziyarətçinin nə etməli olduğunu bir cümlə ilə deyin.',
      'home.cta.button': 'Əlaqə',

      'services.page.title': 'Xidmətlər',
      'services.page.lead': 'Xidmətlərinizin qısa təsviri.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Şirkətiniz haqqında bir cümlə.',
      'about.body1': 'Şirkətin hekayəsini yazın.',
      'about.body2': 'Komandanızı və iş prinsiplərinizi təsvir edin.',
      'about.values.title': 'Prinsiplərimiz',
      'about.value.1.title': 'Birinci prinsip',
      'about.value.1.text': 'Qısa izah yazın.',
      'about.value.2.title': 'İkinci prinsip',
      'about.value.2.text': 'Qısa izah yazın.',
      'about.value.3.title': 'Üçüncü prinsip',
      'about.value.3.text': 'Qısa izah yazın.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Müştərilərin sizinlə necə əlaqə saxlaya biləcəyini yazın.',
      'contact.phone': '+994 00 000 00 00',
      'contact.whatsapp': '+994 00 000 00 00',
      'contact.email': 'ad@sirket.az',
      'contact.address': 'Ünvanınızı yazın',
      'contact.hours': 'İş saatlarınızı yazın',

      'footer.text': 'Bütün hüquqlar qorunur.',
    },
    images: {
      'home.hero.panel': img('Giriş şəkli'),
      'home.hero.float': img('Əlavə şəkil'),
      'home.cta.bg': img('Fon şəkli'),
      'about.main': img('Komanda şəkli'),
    },
    services: [service('s1', 'Birinci xidmət', 'Xidmətin qısa təsvirini yazın.', 'Xidmət şəkli')],
    extras: { home: [], services: [], about: [], contact: [] },
    hidden: {},
  }
}
