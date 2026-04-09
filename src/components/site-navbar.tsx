import { useEffect, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import logoImage from '../assets/nosara-logo.png'
import { scrollToSectionId } from '../scroll-utils'
import LanguageSwitcher from './language-switcher'

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
 * Site header with in-page section navigation.
 */
export default function SiteNavbar(): React.JSX.Element {
  const { t } = useTranslation()
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<NavbarSectionId>('inicio')
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
  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, id: NavbarSectionId): void => {
    e.preventDefault()
    scrollToSectionId(id)
  }
  return (
    <header className={`navbar ${isNavScrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__side navbar__side--left" aria-label={t('nav.ariaMain')}>
        <ul className="nav-list">
          {NAV_LEFT.map((id: NavbarSectionId) => (
            <li key={id}>
              <a
                className={activeSectionId === id ? 'nav-link nav-link--active' : 'nav-link'}
                href={`#${id}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, id)}
              >
                {t(SECTION_NAV_KEY[id])}
              </a>
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
        <img className="brand-logo" src={logoImage} alt={t('nav.logoAlt')} />
      </a>
      <div className="navbar__right-wrap">
        <nav className="navbar__side navbar__side--right" aria-label={t('nav.ariaMore')}>
          <ul className="nav-list">
            {NAV_RIGHT.map((id: NavbarSectionId) => (
              <li key={id}>
                <a
                  className={activeSectionId === id ? 'nav-link nav-link--active' : 'nav-link'}
                  href={`#${id}`}
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, id)}
                >
                  {t(SECTION_NAV_KEY[id])}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
