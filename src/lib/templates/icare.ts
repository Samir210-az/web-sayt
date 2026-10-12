import { build } from './build'
import type { SiteConfig } from '../types'

export function createIcareSite(): SiteConfig {
  return build('icare', {
    accent: '#f0b400',
    text: {
      'brand.name': 'Avtomobil icarəsi',

      'home.hero.chip': 'Avtomobil icarəsi · gündəlik və aylıq',
      'home.hero.title': 'Yola çıxmaq üçün hazır avtomobil',
      'home.hero.lead':
        'Təmiz, texniki baxışdan keçmiş avtomobillər. Sənədlər sadədir, təhvil sürətlidir, qiymət əvvəlcədən deyilir.',
      'home.hero.cta': 'Avtomobil sifariş et',

      'home.services.title': 'Avtomobil sinifləri',
      'home.services.link': 'Hamısı',

      'home.process.title': 'İcarə necə işləyir',
      'home.process.1.title': 'Seçim',
      'home.process.1.text': 'Tarixi və sərnişin sayını deyirsiniz, uyğun avtomobil təklif olunur.',
      'home.process.2.title': 'Sənədlər',
      'home.process.2.text': 'Vəsiqə və sürücülük vəsiqəsi ilə müqavilə bir neçə dəqiqəyə tərtib olunur.',
      'home.process.3.title': 'Təhvil',
      'home.process.3.text': 'Avtomobil birlikdə yoxlanılır, yanacaq və vəziyyət aktda qeyd edilir.',
      'home.process.4.title': 'Qaytarma',
      'home.process.4.text': 'Razılaşdığınız gün və yerdə avtomobili təhvil verirsiniz.',

      'home.cta.title': 'Avtomobili bu gün götürün',
      'home.cta.text': 'Tarixi deyin, sizin üçün uyğun avtomobili ayıraq.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Avtomobil sinifləri',
      'services.page.lead': 'Qiymət sinifdən və müddətdən asılıdır, zəng edərək dəqiq öyrənə bilərsiniz.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Şəhər və bölgə səfərləri üçün avtomobil icarəsi ilə məşğul oluruq.',
      'about.body1':
        'Hər avtomobil təhvildən əvvəl yuyulur və yoxlanılır. Müqavilədə nə yazılıbsa, qiymət də o olur.',
      'about.body2':
        'Yolda problem yaranarsa, zəng etməyiniz kifayətdir: ya yerində kömək edirik, ya da avtomobili əvəz edirik.',
      'about.values.title': 'Prinsiplərimiz',
      'about.value.1.title': 'Aydın qiymət',
      'about.value.1.text': 'Qiymət müqavilədə yazılır, sonradan əlavə ödəniş istənmir.',
      'about.value.2.title': 'Təmiz avtomobil',
      'about.value.2.text': 'Hər təhvildən əvvəl salon yuyulur, mühərrik və təkərlər yoxlanılır.',
      'about.value.3.title': 'Yolda dəstək',
      'about.value.3.text': 'Problem olanda telefonla əlaqə saxlayırıq və tez həll tapırıq.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Rezerv üçün zəng edin və ya WhatsApp-da yazın.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'info@sirketiniz.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'Hər gün 09:00 – 21:00',
    },
    images: [
      ['home.hero.panel', 'Yolda gedən avtomobil, xəritə nişanı və açar illüstrasiyası'],
      ['home.hero.float', 'Avtomobil açarı və xəritə nişanı'],
      ['home.cta.bg', 'Yolda gedən avtomobilin geniş illüstrasiyası'],
      ['about.main', 'Yol, təpələr və avtomobil olan illüstrasiya'],
    ],
    services: [
      ['İqtisad sinfi', 'Şəhər daxili işlər üçün yanacağa qənaət edən kompakt avtomobillər.', 'Kompakt avtomobil'],
      ['Komfort sedan', 'Uzun yol və iş görüşləri üçün geniş salonlu sedanlar.', 'Sedan avtomobil'],
      ['SUV və krossover', 'Bölgə yolları və ailə səfərləri üçün yüksək oturacaqlı avtomobillər.', 'Yüksək oturacaqlı avtomobil'],
      ['Biznes sinfi', 'Qarşılama, toy və rəsmi tədbirlər üçün təmsilçi avtomobillər.', 'Biznes sinifli avtomobil'],
      ['Minivan', 'Yeddi nəfərə qədər ailə və qrup üçün geniş salon.', 'Geniş salonlu minivan'],
      ['Sürücü ilə icarə', 'Təcrübəli sürücü ilə şəhər daxili və bölgələrarası gediş.', 'Sürücü ilə avtomobil'],
    ],
  })
}
