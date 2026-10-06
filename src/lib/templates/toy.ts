import { build } from './build'
import type { SiteConfig } from '../types'

export function createToySite(): SiteConfig {
  return build('toy', {
    accent: '#8a1f3a',
    text: {
      'brand.name': 'Şölən Saray',

      'home.hero.chip': 'Toy, nişan və ad günü məclisləri',
      'home.hero.title': 'Toyunuz ailənizə yaraşan məkanda keçsin',
      'home.hero.lead':
        'Geniş zallar, səliqəli süfrə və diqqətli xidmət. Tarixi birlikdə seçir, məclisin hər addımını əvvəlcədən planlaşdırırıq.',
      'home.hero.cta': 'Tarixi soruş',

      'home.services.title': 'Zal növləri',
      'home.services.link': 'Bütün zallar',

      'home.process.title': 'Məclisə qədər',
      'home.process.1.title': 'Görüş',
      'home.process.1.text': 'Zalı gəzir, tarixi və qonaq sayını birlikdə müzakirə edirik.',
      'home.process.2.title': 'Menyu',
      'home.process.2.text': 'Süfrə və içki seçimi sizinlə razılaşdırılır.',
      'home.process.3.title': 'Hazırlıq',
      'home.process.3.text': 'Bəzək, səhnə və oturma planı məclisdən əvvəl tamamlanır.',
      'home.process.4.title': 'Məclis',
      'home.process.4.text': 'Gün boyu koordinator yanınızdadır, siz yalnız qonaqlarla maraqlanırsınız.',

      'home.cta.title': 'Tarixi birlikdə seçək',
      'home.cta.text': 'Zalı yerində görmək üçün zəng edin, sizə uyğun vaxt ayıraq.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Zal növləri',
      'services.page.lead': 'Qonaq sayına və məclisin xarakterinə görə uyğun zalı seçin.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Şölən Saray toy və ailə məclisləri üçün zallar kompleksidir.',
      'about.body1': 'Hər ailənin bayramı özünəməxsusdur. Zalı, süfrəni və xidməti sizin istəyinizə uyğunlaşdırırıq.',
      'about.body2':
        'Komanda məclisdən əvvəl və gün ərzində yanınızdadır ki, siz qonaqlarınızla maraqlana biləsiniz.',
      'about.values.title': 'Bizim qaydamız',
      'about.value.1.title': 'Qonaqpərvərlik',
      'about.value.1.text': 'Hər qonaq hörmətlə qarşılanır və yola salınır.',
      'about.value.2.title': 'Səliqə',
      'about.value.2.text': 'Zal və süfrə məclisdən əvvəl diqqətlə hazırlanır.',
      'about.value.3.title': 'Açıq razılaşma',
      'about.value.3.text': 'Şərtlər və xərclər əvvəlcədən yazılı razılaşdırılır.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Zalı görmək və tarixi dəqiqləşdirmək üçün zəng edin.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@solensaray.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'Hər gün 10:00 – 20:00',
    },
    images: [
      ['home.hero.panel', 'Tağ formalı qapı, lüstr və işıqlı zal təsvir edilən illüstrasiya'],
      ['home.hero.float', 'Şamdanlı süfrə masası və tağ pəncərə təsvir edilən illüstrasiya'],
      ['home.hero.third', 'Şamdan və tağ pəncərə olan ikinci süfrə masası illüstrasiyası'],
      ['home.cta.bg', 'Lüstrlü zalın geniş illüstrasiyası'],
      ['about.main', 'Tağ qapılı və məxmər pərdəli məclis zalı illüstrasiyası'],
    ],
    services: [
      ['Böyük toy zalı', 'Çoxlu qonaq üçün geniş zal, səhnə və rəqs meydançası.', 'Lüstrlü böyük zal'],
      ['Nişan və kiçik məclis zalı', 'Yaxın qohum-əqrəba üçün isti və səmimi mühit.', 'Süfrə masaları olan kiçik zal'],
      ['Ad günü və yubiley salonu', 'Ad günü, yubiley və ailə görüşləri üçün orta ölçülü salon.', 'Şamlı süfrə masası'],
      ['Açıq hava meydançası', 'İsti aylarda bağ mühitində məclis üçün örtülü açıq sahə.', 'Tağlı bağ meydançası'],
      ['Bəzək və səhnə', 'Gül tərtibatı, işıqlandırma və səhnə quruluşu.', 'Gül və işıqla bəzədilmiş səhnə'],
      ['Qonaq xidməti', 'Süfrə, ofisiant xidməti və qonaqların qarşılanması.', 'Hazırlanmış süfrə masası'],
    ],
  })
}
