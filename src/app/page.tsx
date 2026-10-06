import Link from 'next/link'

const STEPS = [
  {
    title: 'Şablonu seçin',
    text: 'Hazır şablon bütün səhifələri ilə gəlir: Ana səhifə, Xidmətlər, Haqqımızda, Əlaqə.',
  },
  {
    title: 'Səhifənin üstündə dəyişin',
    text: 'Mətnə klikləyib yazın, şəkli və loqonu öz faylınızla əvəz edin, əsas rəngi seçin.',
  },
  {
    title: 'Öz bölmələrinizi əlavə edin',
    text: 'Şablonda olmayan xidmət və ya bölmə lazımdır? Əlavə edin, lazımsızı gizlədin.',
  },
]

const INCLUDED = [
  'Telefonda və kompüterdə düzgün görünən səhifələr',
  'Parallax və yüngül giriş animasiyası, hərəkəti azaltmaq ayarına uyğun',
  'Şəkil yükləməsi: JPG, PNG, WebP, 8 MB-a qədər, avtomatik sıxılır',
  'Dəyişikliklər brauzerdə qaralama kimi saxlanılır',
]

export default function PlatformHome() {
  return (
    <>
      <a className="skip" href="#content">
        Məzmuna keç
      </a>
      <header className="lp-header">
        <div className="lp-header__row wrap">
          <Link href="/" className="lp-brand">
            web-sayt
          </Link>
          <nav className="lp-nav" aria-label="Əsas menyu">
            <a href="#nece">Necə işləyir</a>
            <a href="#shablon">Şablon</a>
            <Link href="/redaktor" className="lp-nav__cta">
              Redaktoru sına
            </Link>
          </nav>
        </div>
      </header>

      <main id="content">
        <section className="lp-hero wrap">
          <div className="lp-hero__copy">
            <h1 className="lp-hero__title">Şirkətinizin saytını proqramçısız yaradın</h1>
            <p className="lp-hero__lead">
              Hazır şablon seçin, yazını və şəkli səhifənin üstündə birbaşa dəyişin, öz bölmələrinizi əlavə edin.
              Kod və dizayner tələb olunmur.
            </p>
            <div className="lp-hero__actions">
              <Link href="/redaktor" className="btn btn--primary">
                Redaktoru sına
              </Link>
              <Link href="/shablon" className="btn btn--ghost">
                Nümunə sayta bax
              </Link>
            </div>
            <p className="lp-hero__note">Hesab və dərc etmə hazırlanır. Hazırda redaktoru sınaqdan keçirmək olar.</p>
          </div>

          <div className="lp-demo" aria-hidden="true">
            <div className="lp-demo__bar">
              <span />
              <span />
              <span />
            </div>
            <div className="lp-demo__page">
              <div className="lp-demo__image">
                <span className="lp-demo__upload">Şəkli dəyiş</span>
              </div>
              <p className="lp-demo__headline">
                Eyni gün gəlirik, qiyməti işə başlamazdan əvvəl deyirik
                <span className="lp-demo__caret" />
              </p>
              <p className="lp-demo__line" />
              <p className="lp-demo__line lp-demo__line--short" />
              <span className="lp-demo__tag">Mətnə klik edin və yazın</span>
            </div>
          </div>
        </section>

        <section id="nece" className="lp-section wrap">
          <h2 className="lp-section__title">Necə işləyir</h2>
          <ol className="lp-steps">
            {STEPS.map((step) => (
              <li key={step.title} className="lp-step">
                <h3 className="lp-step__title">{step.title}</h3>
                <p className="lp-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="shablon" className="lp-section lp-template">
          <div className="wrap lp-template__row">
            <div>
              <h2 className="lp-section__title">Xidmət şirkətləri üçün şablon</h2>
              <p className="lp-template__text">
                İlk şablon elektrik, santexnika, kondisioner və təmir kimi çağırışla işləyən xidmətlər üçündür. Sayt
                açıq vəziyyətdədir: ziyarətçi kimi baxın, sonra redaktorda eyni səhifəni dəyişin.
              </p>
              <div className="lp-hero__actions">
                <Link href="/shablon" className="btn btn--primary">
                  Nümunə saytı aç
                </Link>
                <Link href="/redaktor" className="btn btn--ghost">
                  Redaktorda aç
                </Link>
              </div>
            </div>
            <ul className="lp-list">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__row wrap">
          <span className="footer__brand">web-sayt</span>
          <span className="footer__text">Şirkətlər üçün özünüz redaktə etdiyiniz saytlar</span>
          <a
            className="footer__credit"
            href="https://instagram.com/securtiy_group"
            target="_blank"
            rel="noopener noreferrer"
          >
            By securtiy_group
          </a>
        </div>
      </footer>
    </>
  )
}
