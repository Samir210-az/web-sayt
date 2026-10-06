import Link from 'next/link'
import { HeroDemo } from '@/components/landing/hero-demo'
import { Parallax } from '@/components/parallax'

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

const TEMPLATES = [
  { name: 'Evdar', kind: 'Xidmət şirkətləri', href: '/shablon', mod: 'a' },
  { name: 'Klinika', kind: 'Mərkəz və klinikalar', mod: 'b' },
  { name: 'Kafe', kind: 'Restoran və kafelər', mod: 'c' },
]

const FACTS = [
  { big: '4', small: 'hazır səhifə: Ana səhifə, Xidmətlər, Haqqımızda, Əlaqə' },
  { big: '8 MB', small: 'qədər JPG, PNG və WebP şəkil, avtomatik sıxılır' },
  { big: '0', small: 'sətir kod. Hər şey səhifənin üstündə dəyişir' },
]

export default function PlatformHome() {
  return (
    <div className="lp">
      <a className="skip" href="#content">
        Məzmuna keç
      </a>

      <header className="lp-header">
        <div className="lp-header__row wrap">
          <Link href="/" className="lp-brand">
            WEB SAYT
          </Link>
          <nav className="lp-nav" aria-label="Əsas menyu">
            <a href="#nece">Necə işləyir</a>
            <a href="#shablonlar">Şablonlar</a>
            <Link href="/redaktor" className="lp-nav__cta">
              Redaktoru sına
            </Link>
          </nav>
        </div>
      </header>

      <main id="content">
        <section className="lp-hero wrap">
          <Parallax speed={0.18} className="lp-aurora lp-aurora--one">
            <span />
          </Parallax>
          <Parallax speed={-0.12} className="lp-aurora lp-aurora--two">
            <span />
          </Parallax>

          <div className="lp-hero__copy">
            <h1 className="lp-hero__title">Şirkətinizin saytını proqramçısız yaradın</h1>
            <p className="lp-hero__lead">
              Hazır şablon seçin, yazını və şəkli səhifənin üstündə birbaşa dəyişin, öz bölmələrinizi əlavə edin.
              Kod və dizayner tələb olunmur.
            </p>
            <div className="lp-actions">
              <Link href="/redaktor" className="lp-btn lp-btn--glow">
                Redaktoru sına
              </Link>
              <Link href="/shablon" className="lp-btn lp-btn--glass">
                Nümunə sayta bax
              </Link>
            </div>
            <p className="lp-hero__note">Hesab və dərc etmə hazırlanır. Hazırda redaktoru sınaqdan keçirmək olar.</p>
          </div>

          <HeroDemo />
        </section>

        <section className="wrap" aria-label="Qısa göstəricilər">
          <div className="lp-facts">
            {FACTS.map((fact) => (
              <div key={fact.big} className="lp-fact">
                <strong>{fact.big}</strong>
                <span>{fact.small}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="nece" className="lp-section wrap">
          <h2 className="lp-title">Necə işləyir</h2>
          <ol className="lp-steps">
            {STEPS.map((step, i) => (
              <li key={step.title} className="lp-step">
                <span className="lp-step__no">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lp-step__title">{step.title}</h3>
                <p className="lp-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="shablonlar" className="lp-section wrap">
          <h2 className="lp-title">Şablonlar</h2>
          <p className="lp-sub">İlk şablon hazırdır və açıqdır. Digərləri üzərində işlənir.</p>
          <ul className="lp-cards">
            {TEMPLATES.map((t) => {
              const inner = (
                <>
                  <div className={`lp-card__art lp-card__art--${t.mod}`}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="lp-card__meta">
                    <strong>{t.name}</strong>
                    <span>{t.kind}</span>
                  </div>
                  <span className={t.href ? 'lp-card__tag lp-card__tag--live' : 'lp-card__tag'}>
                    {t.href ? 'Hazırdır' : 'Tezliklə'}
                  </span>
                </>
              )
              return (
                <li key={t.name}>
                  {t.href ? (
                    <Link href={t.href} className="lp-card">
                      {inner}
                    </Link>
                  ) : (
                    <div className="lp-card lp-card--soon">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="lp-final wrap">
          <Parallax speed={0.1} className="lp-final__glow">
            <span />
          </Parallax>
          <h2 className="lp-final__title">Saytınızı indi redaktə etməyə başlayın</h2>
          <p className="lp-final__text">Şablonu açın, yazını və şəkli dəyişin. Qeydiyyat tələb olunmur.</p>
          <div className="lp-actions lp-actions--center">
            <Link href="/redaktor" className="lp-btn lp-btn--glow">
              Redaktoru sına
            </Link>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <p className="lp-footer__word" aria-hidden="true">
          WEB SAYT
        </p>
        <div className="lp-footer__row wrap">
          <span>Şirkətlər üçün özünüz redaktə etdiyiniz saytlar</span>
          <a href="https://instagram.com/securtiy_group" target="_blank" rel="noopener noreferrer">
            By securtiy_group
          </a>
        </div>
      </footer>
    </div>
  )
}
