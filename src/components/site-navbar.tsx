import { useEffect, useState, type MouseEvent } from 'react'
import logoImage from '../assets/nosara-logo.png'
import { scrollToSectionId } from '../scroll-utils'

type NavbarSectionId =
  | 'inicio'
  | 'sobre-nosotros'
  | 'actividades'
  | 'galeria'
  | 'team'
  | 'contacto'

const NAV_LEFT: ReadonlyArray<{ readonly id: NavbarSectionId; readonly label: string }> = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-nosotros', label: 'Sobre nosotros' },
  { id: 'actividades', label: 'Actividades' },
]

const NAV_RIGHT: ReadonlyArray<{ readonly id: NavbarSectionId; readonly label: string }> = [
  { id: 'galeria', label: 'Galería' },
  { id: 'team', label: 'Team' },
  { id: 'contacto', label: 'Contacto' },
]

const SECTION_IDS: readonly NavbarSectionId[] = [
  'inicio',
  'sobre-nosotros',
  'actividades',
  'galeria',
  'team',
  'contacto',
]

/**
 * Site header with in-page section navigation.
 */
export default function SiteNavbar(): React.JSX.Element {
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
      <nav className="navbar__side navbar__side--left" aria-label="Secciones principales">
        <ul className="nav-list">
          {NAV_LEFT.map((item: { readonly id: NavbarSectionId; readonly label: string }) => (
            <li key={item.id}>
              <a
                className={activeSectionId === item.id ? 'nav-link nav-link--active' : 'nav-link'}
                href={`#${item.id}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#inicio"
        className={`logo-link${activeSectionId === 'inicio' ? ' logo-link--active' : ''}`}
        aria-label="Ir al inicio"
        onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, 'inicio')}
      >
        <img className="brand-logo" src={logoImage} alt="Nosara Day Camp logo" />
      </a>
      <nav className="navbar__side navbar__side--right" aria-label="Más secciones">
        <ul className="nav-list">
          {NAV_RIGHT.map((item: { readonly id: NavbarSectionId; readonly label: string }) => (
            <li key={item.id}>
              <a
                className={activeSectionId === item.id ? 'nav-link nav-link--active' : 'nav-link'}
                href={`#${item.id}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => onNavClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
