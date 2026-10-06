import { img, service } from '../default-site'
import type { SiteConfig } from '../types'

export function createKlinikaSite(): SiteConfig {
  return {
    version: 1,
    template: 'klinika',
    theme: { accent: '#0b7f8f' },
    logo: img('Loqo'),
    text: {
      'brand.name': 'Nur Klinika',

      'home.hero.title': 'Sağlamlığınıza vaxtında və diqqətlə baxırıq',
      'home.hero.lead': 'Həkim qəbulu, analizlər və diaqnostika bir ünvanda. Əvvəlcədən yazılın, növbə gözləməyin.',
      'home.hero.cta': 'Qəbula yazıl',
      'home.hero.chip': 'Qəbul əvvəlcədən yazılmaqla',

      'home.services.title': 'Xidmətlərimiz',
      'home.services.link': 'Bütün xidmətlər',

      'home.process.title': 'Qəbul necə keçir',
      'home.process.1.title': 'Qeydiyyat',
      'home.process.1.text': 'Zəng edib və ya yazıb sizə uyğun vaxtı seçirsiniz.',
      'home.process.2.title': 'Qəbul',
      'home.process.2.text': 'Həkim şikayətlərinizi dinləyir və müayinə edir.',
      'home.process.3.title': 'Analiz',
      'home.process.3.text': 'Lazım olarsa, analiz və diaqnostika elə həmin gün aparılır.',
      'home.process.4.title': 'Plan',
      'home.process.4.text': 'Nəticələr izah olunur, müalicə planı yazılı verilir.',

      'home.cta.title': 'Növbəti qəbul üçün vaxt seçin',
      'home.cta.text': 'Zəng edin, ən yaxın boş vaxtı dərhal deyək.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Xidmətlər',
      'services.page.lead': 'Hər xidmət üçün qiymət qəbuldan əvvəl bildirilir.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Nur Klinika ailə həkimlərindən ibarət kiçik tibb mərkəzidir.',
      'about.body1':
        'Məqsədimiz xəstənin həm həkimi, həm də nəticəni başa düşməsidir. Hər qəbulda vaxt ayırır, sualları cavablandırırıq.',
      'about.body2': 'Müayinə nəticələri aydın dildə izah olunur və yazılı şəkildə təqdim edilir.',
      'about.values.title': 'Prinsiplərimiz',
      'about.value.1.title': 'Diqqət',
      'about.value.1.text': 'Hər xəstəyə kifayət qədər vaxt ayrılır.',
      'about.value.2.title': 'Məxfilik',
      'about.value.2.text': 'Xəstə məlumatları üçüncü şəxslərə verilmir.',
      'about.value.3.title': 'Aydınlıq',
      'about.value.3.text': 'Diaqnoz və plan başa düşülən dildə izah olunur.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Qəbula yazılmaq üçün zəng edin və ya WhatsApp-da yazın.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@nurklinika.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'B.e. – Şənbə 09:00 – 19:00',

      'footer.text': 'Bütün hüquqlar qorunur.',
    },
    images: {
      'home.hero.panel': img('Həkim xəstəni qəbul edir'),
      'home.hero.float': img('Klinikanın qəbul otağı'),
      'home.cta.bg': img('İşıqlı gözləmə zalı'),
      'about.main': img('Həkim komandası'),
    },
    services: [
      service('s1', 'Terapevt qəbulu', 'İlkin müayinə, şikayətlərin təhlili və müalicənin təyini.', 'Terapevt qəbulu'),
      service('s2', 'Pediatriya', 'Uşaqların profilaktik müayinəsi, peyvəndlər və xəstəliklərin müalicəsi.', 'Uşaq həkimi'),
      service('s3', 'Laborator analizlər', 'Qan, sidik və hormon analizləri, nəticə eyni gün hazır olur.', 'Laboratoriya'),
      service('s4', 'USM və diaqnostika', 'Ultrasəs müayinəsi və EKQ həkim izahı ilə.', 'Ultrasəs müayinəsi'),
    ],
    extras: { home: [], services: [], about: [], contact: [] },
    hidden: {},
  }
}
