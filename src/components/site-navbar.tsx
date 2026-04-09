import { useEffect, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import logoImage from '../assets/nosara-logo.png'
import { scrollToSectionId } from '../scroll-utils'
import LanguageSwitcher from './language-switcher'

const MOBILE_NAV_MQ = '(max-width: 768px)'

type NavbarSectionId =
  | 'inicio'
  | 'sobre-nosotros'
  | 'actividades'
  | 'galeria'
  | 'team'
  | 'contacto'

const NAV_LEFT: readonly NavbarSectionId[] = ['inicio', 'sobre-nosotros', 'actividades']
const NAV_RIGHT: readonly NavbarSectionId[] = ['galeria', 'team', 'contacto']

const SECTION_IDS: readonly NavbarSectionId[] = [
  'inicio',
  'sobre-nosotros',
  'actividades',
  'galeria',
  'team',
  'contacto',
]

const SECTION_NAV_KEY: Record<NavbarSectionId, string> = {
  inicio: 'nav.home',
  'sobre-nosotros': 'nav.about',
  actividades: 'nav.activities',
  galeria: 'nav.gallery',
  team: 'nav.team',
  contacto: 'nav.contact',
}

/**
 * Site header with in-page section navigation and mobile drawer.
 */
export default function SiteNavbar(): React.JSX.Element {
  const { t } = useTranslation()
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<NavbarSectionId>('inicio')
  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_NAV_MQ).matches : false,
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_MQ)
    const onMq = (): void => {
      setIsMobileLayout(mq.matches)
      if (!mq.matches) {
        setIsMobileMenuOpen(false)
      }
    }
    onMq()
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])
  useEffect(() => {
    if (!isMobileMenuOpen || !isMobileLayout) {
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMobileMenuOpen, isMobileLayout])
  useEffect(() => {
    const onScroll = (): void => {
      setIsNavScrolled(window.scrollY > 24)
      const marker = window.scrollY + 140
      let current: NavbarSectionId = 'inicio'
      SECTION_IDS.forEach((id: NavbarSectionId) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          if (top <= marker) {
            current = id
          }
        }
      })
      setActiveSectionId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false)
  }
  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, id: NavbarSectionId): void => {
    e.preventDefault()
    scrollToSectionId(id)
    if (isMobileLayout) {
      closeMobileMenu()
    }
  }
  const renderNavLink = (id: NavbarSectionId, className: string): React.JSX.Element => (
    <a
      className={className}
      href={`#${id}`}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, id)}
    >
      {t(SECTION_NAV_KEY[id])}
    </a>
  )
  return (
    <header
      className={`navbar ${isNavScrolled ? 'navbar--scrolled' : ''}${isMobileMenuOpen ? ' navbar--menu-open' : ''}`}
    >
      <div className="navbar__desktop">
        <nav className="navbar__side navbar__side--left" aria-label={t('nav.ariaMain')}>
          <ul className="nav-list">
            {NAV_LEFT.map((id: NavbarSectionId) => (
              <li key={id}>
                {renderNavLink(
                  id,
                  activeSectionId === id ? 'nav-link nav-link--active' : 'nav-link',
                )}
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#inicio"
          className={`logo-link${activeSectionId === 'inicio' ? ' logo-link--active' : ''}`}
          aria-label={t('nav.logoToHome')}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, 'inicio')}
        >
          <img className="brand-logo" src={logoImage} alt="" width={180} height={52} decoding="async" />
        </a>
        <div className="navbar__right-wrap">
          <nav className="navbar__side navbar__side--right" aria-label={t('nav.ariaMore')}>
            <ul className="nav-list">
              {NAV_RIGHT.map((id: NavbarSectionId) => (
                <li key={id}>
                  {renderNavLink(
                    id,
                    activeSectionId === id ? 'nav-link nav-link--active' : 'nav-link',
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="navbar__mobile-bar">
        <a
          href="#inicio"
          className={`logo-link logo-link--mobile${activeSectionId === 'inicio' ? ' logo-link--active' : ''}`}
          aria-label={t('nav.logoToHome')}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, 'inicio')}
        >
          <img className="brand-logo" src={logoImage} alt="" width={180} height={52} decoding="async" />
        </a>
        <button
          type="button"
          className="navbar__menu-toggle"
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-nav-drawer"
          onClick={() => setIsMobileMenuOpen((open: boolean) => !open)}
        >
          <span className="navbar__menu-toggle-text">{t(isMobileMenuOpen ? 'nav.closeMenu' : 'nav.openMenu')}</span>
          <span className="navbar__menu-bars" aria-hidden="true">
            <span className="navbar__menu-bar" />
            <span className="navbar__menu-bar" />
            <span className="navbar__menu-bar" />
          </span>
        </button>
      </div>
      <div
        className={`navbar__backdrop${isMobileMenuOpen ? ' navbar__backdrop--visible' : ''}`}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />
      <div
        id="site-nav-drawer"
        className={`navbar__drawer${isMobileMenuOpen ? ' navbar__drawer--open' : ''}`}
        role="dialog"
        aria-modal={isMobileMenuOpen}
        aria-label={t('nav.drawerLabel')}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="navbar__drawer-header">
          <button
            type="button"
            className="navbar__drawer-close"
            onClick={closeMobileMenu}
            aria-label={t('nav.closeMenu')}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav className="navbar__drawer-nav">
          <ul className="navbar__drawer-list">
            {SECTION_IDS.map((id: NavbarSectionId) => (
              <li key={id}>
                {renderNavLink(
                  id,
                  activeSectionId === id
                    ? 'navbar__drawer-link navbar__drawer-link--active'
                    : 'navbar__drawer-link',
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar__drawer-footer">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
