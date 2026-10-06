'use client'

import { Editable } from '@/components/editable'
import { Marquee, Reveal } from '@/components/motion'
import { Parallax } from '@/components/parallax'
import { useSite } from '@/lib/site-context'
import { cx, telHref } from '@/lib/utils'
import { ActionLink, ExtraBlocks, SectionFrame, ServiceList } from './blocks'
import { CtaCopy, ServicesHead, Steps, useServiceTitles } from './homes'

function HeroCta() {
  const { text } = useSite()
  return (
    <ActionLink className="btn btn--primary" href={telHref(text('contact.phone'))}>
      <Editable.Text as="span" k="home.hero.cta" label="Düymənin yazısı" max={30} />
    </ActionLink>
  )
}

function ProcessHead({ className = 'block__title' }: { className?: string }) {
  return (
    <Reveal as="div">
      <Editable.Text as="h2" k="home.process.title" className={className} label="Bölmənin başlığı" max={60} />
    </Reveal>
  )
}

function ServicesBlock() {
  return (
    <SectionFrame id="home.services" label="Xidmətlər">
      <section className="block">
        <ServicesHead />
        <ServiceList limit={4} />
      </section>
    </SectionFrame>
  )
}

/* Hüquq Evi: ciddi, çərçivəli, serif */

export function HomeHuquq() {
  const { editing } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('hq-hero wrap', !editing && 'hq-hero--enter')}>
          <div className="hq-hero__frame">
            <Editable.Text as="p" k="home.hero.chip" className="hq-hero__label" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="hq-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="hq-hero__lead" label="Giriş mətni" multiline max={240} />
            <HeroCta />
          </div>
          <Parallax speed={0.14} bleed className="hq-hero__panel">
            <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
          </Parallax>
        </section>
      </SectionFrame>

      <ServicesBlock />

      <SectionFrame id="home.process" label="İş qaydası">
        <section className="hq-steps wrap">
          <ProcessHead />
          <Steps className="hq-steps__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="hq-cta wrap">
          <div className="hq-cta__box">
            <CtaCopy titleClass="hq-cta__title" textClass="hq-cta__text" buttonClass="btn btn--primary" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Lalə Gözəllik: kapsul şəkillər */

export function HomeGozellik() {
  const { editing } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('gz-hero wrap', !editing && 'gz-hero--enter')}>
          <div className="gz-hero__copy">
            <Editable.Text as="p" k="home.hero.chip" className="gz-hero__chip" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="gz-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="gz-hero__lead" label="Giriş mətni" multiline max={240} />
            <HeroCta />
          </div>
          <div className="gz-hero__caps">
            <Parallax speed={0.08} bleed className="gz-cap gz-cap--a">
              <Editable.Image k="home.hero.float" label="Birinci şəkil" />
            </Parallax>
            <Parallax speed={0.14} bleed className="gz-cap gz-cap--b">
              <Editable.Image k="home.hero.panel" label="Əsas şəkil" />
            </Parallax>
            <Parallax speed={0.06} bleed className="gz-cap gz-cap--c">
              <Editable.Image k="home.hero.third" label="Üçüncü şəkil" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ServicesBlock />

      <SectionFrame id="home.process" label="Qəbul qaydası">
        <section className="gz-steps wrap">
          <ProcessHead />
          <Steps className="gz-steps__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="gz-cta wrap">
          <div className="gz-cta__pill">
            <Parallax speed={0.1} bleed className="gz-cta__img">
              <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
            </Parallax>
            <div className="gz-cta__copy">
              <CtaCopy titleClass="gz-cta__title" textClass="gz-cta__text" buttonClass="btn btn--primary" />
            </div>
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Güc Zal: qaranlıq, diaqonal, enerji */

export function HomeIdman() {
  const { editing } = useSite()
  const titles = useServiceTitles()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('id-hero', !editing && 'id-hero--enter')}>
          <Parallax speed={-0.2} className="id-hero__ghost">
            <Editable.Text as="span" k="home.hero.chip" className="id-hero__ghosttext" label="Arxa plandakı söz" max={14} />
          </Parallax>
          <div className="wrap id-hero__grid">
            <div className="id-hero__copy">
              <Editable.Text as="h1" k="home.hero.title" className="id-hero__title" label="Əsas başlıq" max={80} />
              <Editable.Text as="p" k="home.hero.lead" className="id-hero__lead" label="Giriş mətni" multiline max={240} />
              <HeroCta />
            </div>
            <Parallax speed={0.14} bleed className="id-hero__photo">
              <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
            </Parallax>
          </div>
          <Marquee items={titles} className="marquee--bar" />
        </section>
      </SectionFrame>

      <ServicesBlock />

      <SectionFrame id="home.process" label="Başlama qaydası">
        <section className="id-steps wrap">
          <ProcessHead />
          <Steps className="id-steps__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="id-cta">
          <div className="wrap">
            <CtaCopy titleClass="id-cta__title" textClass="id-cta__text" buttonClass="btn btn--dark" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Təməl Tikinti: plan xətləri və kəsik künc */

export function HomeTikinti() {
  const { editing } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('tk-hero', !editing && 'tk-hero--enter')}>
          <div className="tk-hero__text">
            <Editable.Text as="p" k="home.hero.chip" className="tk-hero__tag" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="tk-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="tk-hero__lead" label="Giriş mətni" multiline max={240} />
            <HeroCta />
            <span className="tk-hero__dim" aria-hidden="true" />
          </div>
          <Parallax speed={0.12} bleed className="tk-hero__photo">
            <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
          </Parallax>
        </section>
      </SectionFrame>

      <ServicesBlock />

      <SectionFrame id="home.process" label="İş mərhələləri">
        <section className="tk-phase wrap">
          <ProcessHead />
          <Steps className="tk-phase__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="tk-cta">
          <div className="tk-cta__text">
            <CtaCopy titleClass="tk-cta__title" textClass="tk-cta__lead" buttonClass="btn btn--primary" />
          </div>
          <Parallax speed={0.1} bleed className="tk-cta__photo">
            <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
          </Parallax>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Bilik Mərkəzi: stiker kartlar */

export function HomeKurs() {
  const { editing } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('kr-hero wrap', !editing && 'kr-hero--enter')}>
          <div className="kr-hero__copy">
            <Editable.Text as="p" k="home.hero.chip" className="kr-hero__bubble" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="kr-hero__title" label="Əsas başlıq" max={110} />
            <Editable.Text as="p" k="home.hero.lead" className="kr-hero__lead" label="Giriş mətni" multiline max={240} />
            <HeroCta />
          </div>
          <div className="kr-hero__stack">
            <Parallax speed={0.1} bleed className="kr-card kr-card--a">
              <Editable.Image k="home.hero.panel" label="Əsas şəkil" />
            </Parallax>
            <Parallax speed={0.18} bleed className="kr-card kr-card--b">
              <Editable.Image k="home.hero.float" label="İkinci şəkil" />
            </Parallax>
          </div>
        </section>
      </SectionFrame>

      <ServicesBlock />

      <SectionFrame id="home.process" label="Qoşulma qaydası">
        <section className="kr-path wrap">
          <ProcessHead />
          <Steps className="kr-path__list" />
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="kr-cta wrap">
          <div className="kr-cta__sticker">
            <CtaCopy titleClass="kr-cta__title" textClass="kr-cta__text" buttonClass="btn btn--primary" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}

/* Kadr Studio: tam ekran kadr və film lenti */

export function HomeStudiya() {
  const { editing } = useSite()

  return (
    <>
      <SectionFrame id="home.hero" label="Giriş bölməsi">
        <section className={cx('st-hero', !editing && 'st-hero--enter')}>
          <Parallax speed={0.2} bleed className="st-hero__bg">
            <Editable.Image k="home.hero.panel" label="Giriş şəkli" />
          </Parallax>
          <div className="st-hero__shade" aria-hidden="true" />
          <div className="wrap st-hero__text">
            <Editable.Text as="p" k="home.hero.chip" className="st-hero__tag" label="Kiçik yazı" max={30} />
            <Editable.Text as="h1" k="home.hero.title" className="st-hero__title" label="Əsas başlıq" max={80} />
            <div className="st-hero__row">
              <Editable.Text as="p" k="home.hero.lead" className="st-hero__lead" label="Giriş mətni" multiline max={240} />
              <HeroCta />
            </div>
          </div>
        </section>
      </SectionFrame>

      <ServicesBlock />

      <SectionFrame id="home.process" label="Çəkiliş qaydası">
        <section className="st-strip">
          <div className="wrap">
            <ProcessHead />
            <Steps className="st-strip__list" />
          </div>
        </section>
      </SectionFrame>

      <SectionFrame id="home.cta" label="Yekun çağırış">
        <section className="st-cta">
          <Parallax speed={0.16} bleed className="st-cta__bg">
            <Editable.Image k="home.cta.bg" label="Çağırış şəkli" />
          </Parallax>
          <div className="st-cta__shade" aria-hidden="true" />
          <div className="wrap st-cta__text">
            <CtaCopy titleClass="st-cta__title" textClass="st-cta__lead" buttonClass="btn btn--primary" />
          </div>
        </section>
      </SectionFrame>

      <ExtraBlocks page="home" />
    </>
  )
}
