import { build } from './build'
import type { SiteConfig } from '../types'

export function createItSite(): SiteConfig {
  return build('it', {
    accent: '#b6f23c',
    text: {
      'brand.name': 'Kod Zavodu',

      'home.hero.chip': 'Veb, mobil və daxili sistemlər',
      'home.hero.title': 'Biznesinizin işinə uyğun proqram yazırıq',
      'home.hero.lead':
        'Veb sayt, mobil tətbiq və idarəetmə sistemləri. Tələbləri dinləyir, işlək versiyanı mərhələ-mərhələ göstərir və təhvildən sonra da dəstək veririk.',
      'home.hero.cta': 'Layihəni müzakirə et',

      'home.services.title': 'Nə quraşdırırıq',
      'home.services.link': 'Bütün xidmətlər',

      'home.process.title': 'Layihə necə gedir',
      'home.process.1.title': 'Tələblər',
      'home.process.1.text': 'Məqsədi, istifadəçiləri və vacib funksiyaları yazılı şəkildə dəqiqləşdiririk.',
      'home.process.2.title': 'Plan və dizayn',
      'home.process.2.text': 'Ekran eskizləri, mərhələlər və müddət sizinlə razılaşdırılır.',
      'home.process.3.title': 'İcra',
      'home.process.3.text': 'Hər mərhələdə işlək versiyanı göstəririk, qeydlərinizi dərhal nəzərə alırıq.',
      'home.process.4.title': 'Təhvil və dəstək',
      'home.process.4.text': 'Sistemi yerləşdirir, komandanı öyrədir və sonrakı dəstəyi təmin edirik.',

      'home.cta.title': 'Layihənizi bizə danışın',
      'home.cta.text': 'Qısaca yazın və ya zəng edin. İlk söhbətdə nəyin necə qurulacağını birlikdə müəyyən edək.',
      'home.cta.button': 'Əlaqə məlumatları',

      'services.page.title': 'Xidmətlər',
      'services.page.lead': 'Hər layihədə əvvəlcə tələblər yazılır, sonra müddət və büdcə razılaşdırılır.',

      'about.title': 'Haqqımızda',
      'about.lead': 'Kod Zavodu proqramçı, dizayner və analitiklərdən ibarət kiçik komandadır.',
      'about.body1':
        'Sifarişçinin dilində danışır, texniki qərarları sadə izah edir və verdiyimiz sözü vaxtında yerinə yetiririk.',
      'about.body2':
        'Hər layihənin bir məsul şəxsi olur, gedişat barədə müntəzəm məlumat verilir, iş bitəndə kod sizə təhvil verilir.',
      'about.values.title': 'İş qaydalarımız',
      'about.value.1.title': 'Şəffaf plan',
      'about.value.1.text': 'Mərhələlər, müddət və büdcə əvvəldən yazılı razılaşdırılır.',
      'about.value.2.title': 'Oxunaqlı kod',
      'about.value.2.text': 'Kod səliqəli yazılır ki, sonradan başqa komanda da davam etdirə bilsin.',
      'about.value.3.title': 'Mülkiyyət sizindir',
      'about.value.3.text': 'Mənbə kodu və giriş məlumatları təhvildən sonra sifarişçiyə verilir.',

      'contact.title': 'Əlaqə',
      'contact.lead': 'Layihəni qısaca yazın və ya zəng edin, növbəti addımı birlikdə müəyyən edək.',
      'contact.phone': '+994 12 000 00 00',
      'contact.whatsapp': '+994 50 000 00 00',
      'contact.email': 'salam@kodzavodu.az',
      'contact.address': 'Bakı şəhəri',
      'contact.hours': 'B.e. – Cümə 09:00 – 18:00',
    },
    images: [
      ['home.hero.panel', 'Şəbəkə düyünləri və kod pəncərələri olan tünd illüstrasiya'],
      ['home.hero.float', 'Server şkafı və şəbəkə düyünü təsvir edilən illüstrasiya'],
      ['home.cta.bg', 'Kod pəncərəsi və şəbəkə xətləri olan geniş illüstrasiya'],
      ['about.main', 'İki kod pəncərəsi və şəbəkə düyünləri olan illüstrasiya'],
    ],
    services: [
      ['Veb sayt və portal', 'Korporativ sayt, kataloq və müştəri kabineti. Sürətli, telefona uyğun və idarə paneli ilə.', 'Brauzer pəncərəsində açılmış veb səhifə maketi'],
      ['Mobil tətbiq', 'iOS və Android üçün tətbiq: bildirişlər, ödəniş və xəritə inteqrasiyası ilə.', 'Telefon ekranında mobil tətbiq interfeysi'],
      ['CRM və daxili sistemlər', 'Satış, anbar, sifariş və hesabatları bir paneldə toplayan idarəetmə sistemləri.', 'İdarəetmə panelinin cədvəl və qrafikləri'],
      ['İnteqrasiya və API', 'Mövcud sistemləri bir-birinə bağlayır, ödəniş və çatdırılma xidmətlərini qoşuruq.', 'Bir-birinə bağlı şəbəkə düyünləri'],
      ['UI/UX dizayn', 'İstifadəçi yolu, eskizlər və hazır interfeys dizaynı. Kodlaşdırmadan əvvəl təsdiq olunur.', 'Interfeys eskizi və komponent şəbəkəsi'],
      ['Dəstək və inkişaf', 'Sistemin yerləşdirilməsi, yenilənməsi, nasazlıqların aradan qaldırılması və yeni funksiyalar.', 'Server şkafı və göstərici işıqlar'],
    ],
  })
}
