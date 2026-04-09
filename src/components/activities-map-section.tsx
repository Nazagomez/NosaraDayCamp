import { useEffect, useRef, useState } from 'react'

type MapCategory = {
  readonly title: string
  readonly count: number
  readonly subtitle: string
  readonly icon: 'nature' | 'water' | 'adventure' | 'learning' | 'sports' | 'giving'
}

const MAP_CATEGORIES: readonly MapCategory[] = [
  { title: 'Nature', count: 5, subtitle: 'Fincas, fauna y bosque', icon: 'nature' },
  { title: 'Water Fun', count: 7, subtitle: 'Mar, río y pozas', icon: 'water' },
  { title: 'Adventure', count: 5, subtitle: 'Cuevas, cuerdas y más', icon: 'adventure' },
  { title: 'Learning', count: 4, subtitle: 'Ciencia y talleres', icon: 'learning' },
  { title: 'Sports', count: 3, subtitle: 'Equipo y juegos', icon: 'sports' },
  { title: 'Giving Back', count: 4, subtitle: 'Voluntariado verde', icon: 'giving' },
]

function MapCategoryIcon(props: { readonly variant: MapCategory['icon'] }): React.JSX.Element | null {
  const stroke = '#5a6b62'
  const common = {
    fill: 'none' as const,
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (props.variant) {
    case 'nature':
      return (
        <svg viewBox="0 0 40 40" className="map-stop__svg" aria-hidden="true">
          <path {...common} d="M20 32V18M20 18l-6 10M20 18l6 10M14 14l6-8 6 8" />
        </svg>
      )
    case 'water':
      return (
        <svg viewBox="0 0 40 40" className="map-stop__svg" aria-hidden="true">
          <path {...common} d="M8 22c4-4 8-4 12 0s8 4 12 0M8 28c4-4 8-4 12 0s8 4 12 0" />
        </svg>
      )
    case 'adventure':
      return (
        <svg viewBox="0 0 40 40" className="map-stop__svg" aria-hidden="true">
          <path {...common} d="M8 30L20 8l12 22M14 24h12" />
        </svg>
      )
    case 'learning':
      return (
        <svg viewBox="0 0 40 40" className="map-stop__svg" aria-hidden="true">
          <path {...common} d="M10 12h16v16H10zM14 16h8M14 20h8M14 24h5" />
        </svg>
      )
    case 'sports':
      return (
        <svg viewBox="0 0 40 40" className="map-stop__svg" aria-hidden="true">
          <circle {...common} cx="20" cy="20" r="9" />
          <path {...common} d="M11 20h18M20 11v18" />
        </svg>
      )
    case 'giving':
      return (
        <svg viewBox="0 0 40 40" className="map-stop__svg" aria-hidden="true">
          <path
            {...common}
            d="M20 30c-6-4-10-8-10-13a6 6 0 0 1 12 0 6 6 0 0 1 12 0c0 5-4 9-10 13z"
          />
        </svg>
      )
    default:
      return null
  }
}

type ParallaxShift = { readonly x: number; readonly y: number; readonly route: number }

/**
 * Map-style activities section with parallax background and dotted route.
 */
export default function ActivitiesMapSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [shift, setShift] = useState<ParallaxShift>({ x: 0, y: 0, route: 0 })
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const readShift = (): ParallaxShift => {
      if (media.matches) {
        return { x: 0, y: 0, route: 0 }
      }
      const el = sectionRef.current
      if (!el) {
        return { x: 0, y: 0, route: 0 }
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const denom = vh + rect.height
      const t = denom > 0 ? Math.max(0, Math.min(1, (vh - rect.top) / denom)) : 0
      const u = t - 0.5
      return {
        x: u * 56,
        y: u * 42,
        route: u * -100,
      }
    }
    let raf = 0
    const onFrame = (): void => {
      raf = 0
      setShift(readShift())
    }
    const requestTick = (): void => {
      if (raf !== 0) {
        return
      }
      raf = window.requestAnimationFrame(onFrame)
    }
    requestTick()
    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick, { passive: true })
    const onMedia = (): void => requestTick()
    media.addEventListener('change', onMedia)
    return () => {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      media.removeEventListener('change', onMedia)
      if (raf !== 0) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])
  return (
    <section
      ref={sectionRef}
      id="actividades"
      className="activities-map-section"
      aria-labelledby="actividades-heading"
    >
      <div
        className="activities-map-section__layer activities-map-section__layer--topo"
        style={{ transform: `translate3d(${shift.x * 0.35}px, ${shift.y * 0.85}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="activities-map-section__watermark"
        style={{
          transform: `translate(calc(-50% + ${shift.x * -0.15}px), calc(-50% + ${shift.y * 0.35}px))`,
        }}
        aria-hidden="true"
      >
        ACTIVIDADES
      </div>
      <div className="activities-map-section__inner">
        <p className="activities-map-section__kicker">Nosara Day Camp</p>
        <h2 id="actividades-heading" className="activities-map-section__title">
          Actividades
        </h2>
        <p className="activities-map-section__lead">
          Más de 30 experiencias organizadas en seis rutas. El mapa se mueve suavemente al hacer scroll.
        </p>
        <div className="activities-map-section__stage">
          <div className="activities-map-section__route-viewport" aria-hidden="true">
            <div
              className="activities-map-section__route-shift"
              style={{ transform: `translate3d(${shift.route}px, ${shift.y * 0.12}px, 0)` }}
            >
              <svg
                className="activities-map-section__route-svg"
                viewBox="0 0 1600 200"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  className="activities-map-section__route-path"
                  fill="none"
                  stroke="#8fa396"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="5 14"
                  d="M -40 118 C 180 48 340 168 520 98 S 820 138 1000 72 S 1220 152 1420 88 S 1560 108 1640 95"
                />
                <circle className="activities-map-section__route-node" cx="120" cy="102" r="8" />
                <circle className="activities-map-section__route-node" cx="360" cy="118" r="8" />
                <circle className="activities-map-section__route-node" cx="600" cy="82" r="8" />
                <circle className="activities-map-section__route-node" cx="840" cy="108" r="8" />
                <circle className="activities-map-section__route-node" cx="1080" cy="76" r="8" />
                <circle className="activities-map-section__route-node" cx="1320" cy="100" r="8" />
              </svg>
            </div>
          </div>
          <div className="activities-map-section__track" role="list">
            {MAP_CATEGORIES.map((cat: MapCategory, index: number) => (
              <div key={cat.title} className="activities-map-section__track-cell" role="listitem">
                {index > 0 ? <div className="activities-map-section__connector" aria-hidden="true" /> : null}
                <article className="map-stop">
                  <div className="map-stop__icon-wrap">
                    <MapCategoryIcon variant={cat.icon} />
                  </div>
                  <h3 className="map-stop__title">{cat.title}</h3>
                  <p className="map-stop__meta">{cat.count} actividades</p>
                  <p className="map-stop__subtitle">{cat.subtitle}</p>
                  <div className="map-stop__pin" aria-hidden="true" />
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="activities-map-section__legend" aria-label="Resumen por categoría">
          {MAP_CATEGORIES.map((cat: MapCategory) => (
            <div key={`legend-${cat.title}`} className="activities-map-section__legend-item">
              <div className="activities-map-section__legend-icon">
                <MapCategoryIcon variant={cat.icon} />
              </div>
              <span className="activities-map-section__legend-label">{cat.title}</span>
              <span className="activities-map-section__legend-count">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
