import { useEffect, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import ActivitiesMapSection from '../components/activities-map-section'
import GallerySection from '../components/gallery-section'
import TeamSection from '../components/team-section'
import ContactSection from '../components/contact-section'
import heroBackgroundImage from '../assets/hero-background.png'
import { scrollToSectionId } from '../scroll-utils'

/**
 * Single scrolling landing: hero + all sections.
 */
export default function HomePage(): React.JSX.Element {
  const { t } = useTranslation()
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) {
      return
    }
    const run = (): void => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    requestAnimationFrame(run)
  }, [])
  const onInPageClick = (e: MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault()
    scrollToSectionId(id)
  }
  return (
    <>
      <main className="home" style={{ backgroundImage: `url(${heroBackgroundImage})` }}>
        <div className="overlay">
          <div className="hero-stage">
            <a
              href="#inicio"
              className="hero-arrow hero-arrow--left"
              aria-label={t('home.ariaHeroLeft')}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => onInPageClick(e, 'inicio')}
            >
              <span aria-hidden="true">&#8249;</span>
            </a>
            <section className="hero-content" id="inicio">
              <div className="hero-meta">
                <span className="hero-meta__item">
                  <svg className="hero-meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"
                    />
                  </svg>
                  {t('home.metaSeason')}
                </span>
                <span className="hero-meta__item">
                  <svg className="hero-meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                  {t('home.tagline')}
                </span>
              </div>
              <h1 className="hero-title">{t('home.title')}</h1>
              <p className="hero-description">{t('home.description')}</p>
              <a
                href="#sobre-nosotros"
                className="hero-button"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => onInPageClick(e, 'sobre-nosotros')}
              >
                <span>{t('home.cta')}</span>
                <svg className="hero-button__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                  />
                </svg>
              </a>
            </section>
            <a
              href="#sobre-nosotros"
              className="hero-arrow hero-arrow--right"
              aria-label={t('home.ariaHeroRight')}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => onInPageClick(e, 'sobre-nosotros')}
            >
              <span aria-hidden="true">&#8250;</span>
            </a>
          </div>
          <div className="hero-bottom" aria-hidden="true">
            <svg className="hero-bottom__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path
                fill="#ffffff"
                d="M0,80 C180,20 360,120 540,70 C720,20 900,100 1080,55 C1260,10 1380,90 1440,40 L1440,120 L0,120 Z"
              />
            </svg>
          </div>
        </div>
      </main>
      <section id="sobre-nosotros" className="about-section" aria-labelledby="sobre-nosotros-heading">
        <div className="about-section__inner">
          <div className="about-section__icons" aria-hidden="true">
            <svg className="about-section__icon about-section__icon--pine" viewBox="0 0 48 48">
              <path fill="currentColor" d="M24 4 14 22h6l-5 10h6l-4 8h26l-4-8h6l-5-10h6L24 4z" />
            </svg>
            <svg className="about-section__icon about-section__icon--tree" viewBox="0 0 48 48">
              <circle cx="24" cy="18" r="12" fill="currentColor" />
              <rect x="20" y="26" width="8" height="16" rx="1" fill="currentColor" />
            </svg>
            <svg className="about-section__icon about-section__icon--tent" viewBox="0 0 48 48">
              <path fill="currentColor" d="M24 6 4 40h40L24 6z" />
            </svg>
          </div>
          <h2 id="sobre-nosotros-heading" className="about-section__title">
            {t('about.title')}
          </h2>
          <div className="about-section__body">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>
              {t('about.p3')}{' '}
              <a
                href="#actividades"
                className="about-section__more"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => onInPageClick(e, 'actividades')}
              >
                {t('about.readMore')}
              </a>
            </p>
          </div>
        </div>
      </section>
      <ActivitiesMapSection />
      <GallerySection />
      <TeamSection />
      <ContactSection />
    </>
  )
}
