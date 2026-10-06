import { img, service } from '../default-site'
import type { SiteConfig } from '../types'

export function createKafeSite(): SiteConfig {
  return {
    version: 1,
    template: 'kafe',
    theme: { accent: '#b3243f' },
    logo: img('Loqo'),
    text: {
      'brand.name': 'Dəmlik Kafe',

      'home.hero.title': 'Səhər qəhvəsindən axşam süfrəsinə qədər',
      'home.hero.lead': 'Təzə bişmiş yeməklər, ev desertləri və qaynar çay. Dostlarla oturmaq üçün isti bir yer.',
      'home.hero.cta': 'Masa sifariş et',
      'home.hero.chip': 'Hər gün 08:00-dan açığıq',

      'home.services.title': 'Menyudan seçmələr',
      'home.services.link': 'Bütün menyu',

      'home.process.title': 'Necə sifariş etmək olar',
      'home.process.1.title': 'Masanı seçin',
      'home.process.1.text': 'Zəng edin, neçə nəfər olacağınızı deyin.',
      'home.process.2.title': 'Menyunu seçin',
      'home.process.2.text': 'Gəlməmişdən əvvəl menyu ilə tanış ola bilərsiniz.',
      'home.process.3.title': 'Hazırlıq',
      'home.process.3.text': 'Sifarişiniz gəlişinizə yaxın hazırlanmağa başlayır.',
      'home.process.4.title': 'Süfrə',
      'home.process.4.text': 'Gəlirsiniz, süfrə hazırdır.',

      'home.cta.title': 'Bu axşama masa saxlayaq',
      'home.cta.text': 'Zəng edin, sizin üçün masa ayıraq.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Xidmətlər və menyu',
      'services.page.lead': 'Menyu mövsümə görə yenilənir.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Dəmlik Kafe ailə işidir.',
      'about.body1':
        'Kafeni dostlarla oturub söhbət edə biləcəyiniz bir yer kimi açdıq. Yeməklərin çoxunu ev resepti ilə hazırlayırıq.',
      'about.body2': 'Məhsulları yerli təchizatçılardan alırıq, menyunu mövsümə görə yeniləyirik.',
      'about.values.title': 'Prinsiplərimiz',
      'about.value.1.title': 'Təzəlik',
      'about.value.1.text': 'Yeməklər sifarişdən sonra hazırlanır.',
      'about.value.2.title': 'Mehribanlıq',
      'about.value.2.text': 'Hər qonaq evdəki kimi qarşılanır.',
      'about.value.3.title': 'Mövsüm',
      'about.value.3.text': 'Menyu mövsümün məhsuluna görə dəyişir.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Masa sifarişi üçün zəng edin və ya yazın.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@demlik.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'Hər gün 08:00 – 23:00',

      'footer.text': 'Bütün hüquqlar qorunur.',
    },
    images: {
      'home.hero.panel': img('Kafenin daxili görünüşü'),
      'home.hero.float': img('Fincanda qəhvə'),
      'home.cta.bg': img('Axşam süfrəsi'),
      'about.main': img('Mətbəxdə komanda'),
    },
    services: [
      service('s1', 'Səhər yeməyi', 'Omlet, pendirli çörək, bal və qaymaq: sübh tezdən hazırdır.', 'Səhər yeməyi'),
      service('s2', 'Əsas yeməklər', 'Gündəlik təzə hazırlanan isti yeməklər və qrill.', 'İsti yemək'),
      service('s3', 'Desertlər', 'Ev üsulu ilə bişirilən tort, paxlava və şirniyyatlar.', 'Desert'),
      service('s4', 'İçkilər', 'Qəhvə, armudu stəkanda çay və təzə sıxılmış şirələr.', 'İçkilər'),
    ],
    extras: { home: [], services: [], about: [], contact: [] },
    hidden: {},
  }
}
