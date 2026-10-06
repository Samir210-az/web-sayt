import { build } from './build'
import type { SiteConfig } from '../types'

export function createBerberSite(): SiteConfig {
  return build('berber', {
    accent: '#b3261e',
    text: {
      'brand.name': 'Tiğ Bərbər',

      'home.hero.chip': 'Kişi saç və saqqal salonu',
      'home.hero.title': 'Saç və saqqal işi əl dəqiqliyi ilə',
      'home.hero.lead':
        'Klassik kəsim, isti dəsmalla qırxım və saqqal formalaşdırma. Növbə ilə işləyirik və hər müştəriyə tələsmədən vaxt ayırırıq.',
      'home.hero.cta': 'Növbə yaz',

      'home.services.title': 'Xidmət siyahısı',
      'home.services.link': 'Hamısı',

      'home.process.title': 'Növbə necə işləyir',
      'home.process.1.title': 'Növbə',
      'home.process.1.text': 'Zəng edir və ya yazırsınız, uyğun saat seçilir.',
      'home.process.2.title': 'Məsləhət',
      'home.process.2.text': 'Usta üz formasına və saç quruluşuna görə variant təklif edir.',
      'home.process.3.title': 'Kəsim',
      'home.process.3.text': 'Maşın, qayçı və ülgüclə iş tələsmədən görülür.',
      'home.process.4.title': 'Yekun',
      'home.process.4.text': 'Üz isti dəsmal və baxım vasitələri ilə tamamlanır.',

      'home.cta.title': 'Kürsü sizi gözləyir',
      'home.cta.text': 'Gəlməzdən əvvəl zəng edin, vaxtınızı əvvəlcədən ayıraq.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Xidmətlər',
      'services.page.lead': 'Qiymətləri zəng edərək və ya salonda öyrənə bilərsiniz.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Tiğ Bərbər klassik bərbər ənənəsini müasir rahatlıqla birləşdirən salondur.',
      'about.body1': 'Bizdə iş tələsmədən görülür: hər kəsim məsləhətlə başlayır, üz isti dəsmalla bitir.',
      'about.body2':
        'Alətlər hər müştəridən sonra təmizlənir. Usta sizin istəyinizi dinləyir və ona uyğun forma təklif edir.',
      'about.values.title': 'Salonun qaydaları',
      'about.value.1.title': 'Təmiz alət',
      'about.value.1.text': 'Hər müştəridən sonra alətlər təmizlənir və dezinfeksiya olunur.',
      'about.value.2.title': 'Vaxta hörmət',
      'about.value.2.text': 'Növbə ilə işləyirik, gözləmə minimuma endirilir.',
      'about.value.3.title': 'Açıq söhbət',
      'about.value.3.text': 'Nəticəni əvvəlcədən müzakirə edir, razılaşmadan kəsmirik.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Növbə üçün zəng edin və ya WhatsApp-da yazın.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@tigberber.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'B.e. – Şənbə 10:00 – 21:00',
    },
    images: [
      ['home.hero.panel', 'Ülgüc, daraq və bərbər dirəyi olan illüstrasiya'],
      ['home.hero.float', 'Bərbər dirəyinin yaxın planı'],
      ['home.cta.bg', 'Ülgüc və daraq olan geniş illüstrasiya'],
      ['about.main', 'Ülgüc, daraq və dirək olan bərbər illüstrasiyası'],
    ],
    services: [
      ['Klassik saç kəsimi', 'Maşın və qayçı ilə seçdiyiniz formada səliqəli kəsim.', 'Qayçı və daraqla saç kəsimi'],
      ['Saqqal formalaşdırma', 'Saqqalın xətti ülgüclə dəqiq çəkilir, forma üzə uyğun seçilir.', 'Ülgüclə saqqal xətti'],
      ['İsti dəsmalla qırxım', 'Klassik ülgüc qırxımı, isti dəsmal və sonrakı baxımla.', 'İsti dəsmal və ülgüc'],
      ['Uşaq kəsimi', 'Kiçik müştərilər üçün səbirli və sakit yanaşma.', 'Uşaq üçün saç kəsimi'],
      ['Saç yuma və üslub', 'Yuma, qurutma və gündəlik üslub vasitələri ilə yekun.', 'Daraq və üslub vasitələri'],
      ['Üz baxımı', 'Dərini təmizləyən sadə baxım və qırxımdan sonra sakitləşdirici maska.', 'Üz baxımı vasitələri'],
    ],
  })
}
