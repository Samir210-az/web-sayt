import { build } from './build'
import type { SiteConfig } from '../types'

export function createRestoranSite(): SiteConfig {
  return build('restoran', {
    accent: '#c9461a',
    text: {
      'brand.name': 'Ocaqbaşı',

      'home.hero.chip': 'Qril restoranı və bar',
      'home.hero.title': 'Ocaq üzərində hazırlanan süfrə',
      'home.hero.lead':
        'Hər gün təzə məhsuldan bişirilən yeməklər, açıq ocaq və rahat zal. Masanı əvvəlcədən ayıra bilərsiniz.',
      'home.hero.cta': 'Masa ayır',

      'home.services.title': 'Menyu',
      'home.services.link': 'Tam menyu',

      'home.process.title': 'Masa necə ayrılır',
      'home.process.1.title': 'Zəng',
      'home.process.1.text': 'Tarixi, saatı və nəfər sayını deyirsiniz.',
      'home.process.2.title': 'Təsdiq',
      'home.process.2.text': 'Uyğun masanı ayırır və sizə təsdiq veririk.',
      'home.process.3.title': 'Qarşılama',
      'home.process.3.text': 'Gələndə masa hazır olur, gözləmədən oturursunuz.',
      'home.process.4.title': 'Süfrə',
      'home.process.4.text': 'Yeməklər sifarişdən sonra təzə bişirilir və isti verilir.',

      'home.cta.title': 'Bu axşam bizdə oturun',
      'home.cta.text': 'Masa sayı məhduddur. Əvvəlcədən zəng etmək kifayətdir.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Menyu',
      'services.page.lead': 'Yeməklərin tərkibi və qiyməti üçün zəng edin, ofisiant da zalda izah edir.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Ocaqbaşı ocaq mətbəxinə və sadə, düzgün bişmiş yeməyə əsaslanan restoran və bardır.',
      'about.body1':
        'Ətləri sifarişdən sonra ocaqda bişiririk. Tərəvəz və göyərti hər səhər təzə gətirilir, saxlanmış məhsul menyuya düşmür.',
      'about.body2':
        'Zalda ailə masaları, kiçik məclislər və görüşlər üçün ayrı künclər var. Böyük qrup üçün əvvəlcədən xəbər verməyiniz kifayətdir.',
      'about.values.title': 'Mətbəx prinsiplərimiz',
      'about.value.1.title': 'Təzə məhsul',
      'about.value.1.text': 'Məhsulu hər gün təzəsi ilə əvəz edirik, dondurulmuş ət işlətmirik.',
      'about.value.2.title': 'Açıq ocaq',
      'about.value.2.text': 'Qril və kabab odun kömürü üzərində hazırlanır, dad də buradandır.',
      'about.value.3.title': 'Sakit xidmət',
      'about.value.3.text': 'Ofisiant lazım olanda gəlir, süfrə arxasında sizi tələsdirmir.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Masa ayırmaq üçün zəng edin və ya WhatsApp-da yazın.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@ocaqbasi.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'Hər gün 12:00 – 00:00',
    },
    images: [
      ['home.hero.panel', 'Ocaqda bişən şişlər, şərab stəkanı və stolüstü lampa'],
      ['home.hero.float', 'Ocaq üzərində şişlər'],
      ['home.cta.bg', 'Şərab, ocaq və yemək boşqabı olan restoran süfrəsi'],
      ['about.main', 'Ocaq, şərab və boşqab olan restoran masası'],
    ],
    services: [
      ['Kabab və qril', 'Ocaq üzərində hazırlanan ət, quş və tərəvəz şişləri.', 'Ocaqda şişlər'],
      ['Bar və içkilər', 'Şərab, kokteyl və soyuq içkilər.', 'Şərab stəkanı'],
      ['Qəlyanaltılar', 'Mövsümi tərəvəz, pendir və təzə çörək ilə sadə başlanğıc.', 'Boşqabda çörək və tərəvəz'],
      ['Əsas yeməklər', 'Evdə bişirilən ənənəvi və müasir mətbəx yeməkləri.', 'Boşqabda isti yemək'],
      ['Şirniyyat', 'Gündəlik hazırlanan desertlər və çay.', 'Desert boşqabı'],
      ['Məclis və sifarişlər', 'Ad günü, görüş və korporativ süfrələr üçün əvvəlcədən sifariş.', 'Məclis süfrəsi'],
    ],
  })
}
