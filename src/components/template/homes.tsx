'use client'

import Link from 'next/link'
import { Editable } from '@/components/editable'
import { Marquee, Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'

export function ServicesHead({ linkClass = 'textlink' }: { linkClass?: string }) {
  const { href } = useSite()
  return (
    <div className="wrap block__head">
      <Reveal as="div">
        <Editable.Text as="h2" k="home.services.title" className="block__title" label="Bölmənin başlığı" max={60} />
      </Reveal>
      <Link href={href('/xidmetler')} className={linkClass}>
        <Editable.Text as="span" k="home.services.link" label="Keçidin yazısı" max={30} />
      </Link>
    </div>
  )
}

export function Steps({ className }: { className: string }) {
  return (
    <ol className={className}>
      {[1, 2, 3, 4].map((n) => (
        <Reveal as="li" key={n} delay={(n - 1) * 0.12} className="step">
          <Editable.Text as="h3" k={`home.process.${n}.title`} className="step__name" label={`${n}-ci addımın adı`} max={30} />
          <Editable.Text
            as="p"
            k={`home.process.${n}.text`}
            className="step__text"
            label={`${n}-ci addımın təsviri`}
            multiline
            max={160}
          />
        </Reveal>
      ))}
    </ol>
  )
}

export function CtaCopy({ titleClass, textClass, buttonClass }: { titleClass: string; textClass: string; buttonClass: string }) {
  const { href } = useSite()
  return (
    <>
      <Reveal as="div">
        <Editable.Text as="h2" k="home.cta.title" className={titleClass} label="Çağırışın başlığı" max={70} />
      </Reveal>
      <Editable.Text as="p" k="home.cta.text" className={textClass} label="Çağırışın mətni" multiline max={180} />
      <Link href={href('/elaqe')} className={buttonClass}>
        <Editable.Text as="span" k="home.cta.button" label="Düymənin yazısı" max={30} />
      </Link>
    </>
  )
}

export function useServiceTitles(): string[] {
  const { site } = useSite()
  return site.services.map((s) => s.title)
}

/* Usta: dispatch / industrial */

export function HomeXidmet() {
  const { editing, text } = useSite()
  const titles = useServiceTitles()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('hero', !editing && 'hero--enter')}>
          <div className="hero__stage">
            <Parallax speed={0.14} bleed className="hero__panel">
              <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
            </Parallax>
            <div className="hero__copy wrap">
              <Editable.Text as="h1" k="home.hero.title" className="hero__title" label="Əsas başlıq" max={110} />
              <Editable.Text as="p" k="home.hero.lead" className="hero__lead" label="Giriş mətni" multiline max={240} />
              <div className="hero__actions">
                <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                  <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
                </ActionLink>
              </div>
            </div>
            <Parallax speed={-0.16} bleed className="hero__float">
              <Editable.Image k="home.hero.float" label="Üzən şəkil" />
            </Parallax>
            <Parallax speed={0.05} className="hero__chip">
              <Editable.Text as="span" k="home.hero.chip" className="chip" label="Qısa məlumat" max={50} />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.ribbon" label="Xidmət lenti">
        <Marquee items={titles} className="marquee--outline" />
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block">
          <ServicesHead />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="process process--line">
          <div className="wrap">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="block__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Reveal variant="line" className="process__rail" />
            <Steps className="process__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="cta">
          <Parallax speed={0.18} bleed className="cta__bg">
            <Editable.Image k="home.cta.bg" label="Fon şəkli" />
          </Parallax>
          <div className="cta__veil" />
          <div className="cta__copy wrap">
            <CtaCopy titleClass="cta__title" textClass="cta__text" buttonClass="btn btn--accent" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Nur Klinika: soft, organic */

export function HomeKlinika() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('kl-hero wrap', !editing && 'kl-hero--enter')}>
          <Parallax speed={0.22} className="kl-hero__blob kl-hero__blob--a">
            <span />
          </Parallax>
          <Parallax speed={-0.14} className="kl-hero__blob kl-hero__blob--b">
            <span />
          </Parallax>

          <div className="kl-hero__copy">
            <Editable.Text as="h1" k="home.hero.title" className="kl-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="kl-hero__lead" label="Giriş mətni" multiline max={240} />
            <div className="kl-hero__actions">
              <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
              </ActionLink>
            </div>
          </div>

          <div className="kl-hero__art">
            <Parallax speed={0.06} bleed className="kl-hero__arch">
              <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
            </Parallax>
            <Parallax speed={-0.14} bleed className="kl-hero__float">
              <Editable.Image k="home.hero.float" label="Üzən şəkil" />
            </Parallax>
            <Parallax speed={0.1} className="kl-hero__chip">
              <Editable.Text as="span" k="home.hero.chip" className="kl-chip" label="Qısa məlumat" max={50} />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block">
          <ServicesHead />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Qəbul qaydası">
        <section className="tl wrap">
          <div className="tl__head">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="block__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
          </div>
          <Steps className="tl__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="kl-cta">
          <Reveal variant="left" className="kl-cta__copy">
            <CtaCopy titleClass="kl-cta__title" textClass="kl-cta__text" buttonClass="btn btn--primary" />
          </Reveal>
          <Parallax speed={0.1} bleed className="kl-cta__media">
            <Editable.Image k="home.cta.bg" label="Fon şəkli" />
          </Parallax>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Dəmlik Kafe: editorial menu */

export function HomeKafe() {
  const { editing, text } = useSite()
  const titles = useServiceTitles()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('cf-hero', !editing && 'cf-hero--enter')}>
          <Parallax speed={0.2} bleed className="cf-hero__bg">
            <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
          </Parallax>
          <div className="cf-hero__veil" />
          <div className="cf-hero__copy wrap">
            <Editable.Text as="h1" k="home.hero.title" className="cf-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="cf-hero__lead" label="Giriş mətni" multiline max={240} />
            <div className="cf-hero__actions">
              <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
                <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
              </ActionLink>
            </div>
          </div>
          <Parallax speed={-0.1} className="cf-hero__plate">
            <Editable.Image k="home.hero.float" label="Boşqab şəkli" />
          </Parallax>
          <div className="cf-hero__chip">
            <Editable.Text as="span" k="home.hero.chip" className="chip" label="Qısa məlumat" max={50} />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.ribbon" label="Menyu lenti">
        <Marquee items={titles} className="marquee--serif" />
      </SectionFrame>

      <SectionFrame id="home.services" label="Menyu">
        <section className="block">
          <ServicesHead />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="Sifariş qaydası">
        <section className="num">
          <div className="wrap">
            <Reveal as="div">
              <Editable.Text as="h2" k="home.process.title" className="block__title" label="Bölmənin başlığı" max={60} />
            </Reveal>
            <Steps className="num__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="cf-cta">
          <Parallax speed={0.12} bleed className="cf-cta__media">
            <Editable.Image k="home.cta.bg" label="Fon şəkli" />
          </Parallax>
          <Reveal variant="right" className="cf-cta__copy">
            <CtaCopy titleClass="cf-cta__title" textClass="cf-cta__text" buttonClass="btn btn--primary" />
          </Reveal>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Sıfırdan başla: Swiss canvas */

export function HomeBosh() {
  const { editing, text } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('bs-hero wrap', !editing && 'bs-hero--enter')}>
          <Editable.Text as="h1" k="home.hero.title" className="bs-hero__title" label="Əsas başlıq" max={110} />
          <div className="bs-hero__row">
            <Editable.Text as="p" k="home.hero.lead" className="bs-hero__lead" label="Giriş mətni" multiline max={240} />
            <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
              <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
            </ActionLink>
          </div>
          <Parallax speed={0.12} bleed className="bs-hero__frame">
            <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
          </Parallax>
        </section>
      </SectionFrame>

      <SectionFrame id="home.services" label="Xidmətlər">
        <section className="block">
          <ServicesHead />
          <ServiceList limit={4} />
        </section>
      </SectionFrame>

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="bs-steps wrap">
          <Reveal as="div">
            <Editable.Text as="h2" k="home.process.title" className="block__title" label="Bölmənin başlığı" max={60} />
          </Reveal>
          <Steps className="bs-steps__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="bs-cta">
          <div className="wrap">
            <CtaCopy titleClass="bs-cta__title" textClass="bs-cta__text" buttonClass="btn btn--accent" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}
