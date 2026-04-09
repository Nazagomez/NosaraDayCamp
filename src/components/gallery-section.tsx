import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type GallerySlide = {
  readonly src: string
  readonly title: string
  readonly tag: string
  readonly caption: string
  readonly alt: string
}

/** Textos por foto (misma posición que 01.png, 02.png, … en la carpeta). */
const SLIDE_META: readonly Omit<GallerySlide, 'src'>[] = [
  {
    title: 'Agua y costa',
    tag: '#Water Fun',
    caption: 'Días de exploración y juego seguro junto al mar.',
    alt: 'Niños y staff en aguas poco profundas junto a rocas',
  },
  {
    title: 'Celebraciones',
    tag: '#Comunidad',
    caption: 'Momentos compartidos alrededor de la mesa.',
    alt: 'Niños en una mesa larga con globos y pastel',
  },
  {
    title: 'Cocina creativa',
    tag: '#Learning',
    caption: 'Talleres de cocina y manualidades al aire libre.',
    alt: 'Niños preparando masa en una mesa bajo carpa',
  },
  {
    title: 'Aprendiendo juntos',
    tag: '#Learning',
    caption: 'Actividades prácticas que despiertan la curiosidad.',
    alt: 'Niños rallando queso en actividad de cocina',
  },
  {
    title: 'Senderos y naturaleza',
    tag: '#Adventure',
    caption: 'Caminatas por el bosque con guías del campamento.',
    alt: 'Grupo de niños caminando por sendero entre vegetación',
  },
  {
    title: 'Aventura en la finca',
    tag: '#Nature',
    caption: 'Experiencias auténticas con animales y entorno rural.',
    alt: 'Niño sonriente montando un búfalo de agua',
  },
  {
    title: 'Diversión en el agua',
    tag: '#Water Fun',
    caption: 'Juegos y descubrimientos en entornos acuáticos.',
    alt: 'Actividad acuática del campamento',
  },
  {
    title: 'Equipo y energía',
    tag: '#Sports',
    caption: 'Movimiento, juego y trabajo en equipo.',
    alt: 'Niños en actividad deportiva o de grupo',
  },
  {
    title: 'Descubriendo la naturaleza',
    tag: '#Nature',
    caption: 'Conexión con plantas, animales y paisajes de Nosara.',
    alt: 'Exploración en la naturaleza',
  },
  {
    title: 'Creatividad y talleres',
    tag: '#Learning',
    caption: 'Manos a la obra con proyectos guiados.',
    alt: 'Taller creativo en el campamento',
  },
  {
    title: 'Rutas y exploración',
    tag: '#Adventure',
    caption: 'Excursiones y salidas con supervisión cercana.',
    alt: 'Excursión o caminata del day camp',
  },
  {
    title: 'Comunidad y amistad',
    tag: '#Comunidad',
    caption: 'Días llenos de risas y compañerismo.',
    alt: 'Grupo de niños en actividad conjunta',
  },
  {
    title: 'Cuidando el entorno',
    tag: '#Giving Back',
    caption: 'Pequeñas acciones que enseñan a valorar el ambiente.',
    alt: 'Actividad de cuidado ambiental o voluntariado',
  },
  {
    title: 'Costa y marea',
    tag: '#Water Fun',
    caption: 'La playa y el mar como aula al aire libre.',
    alt: 'Momento en la playa o zona costera',
  },
  {
    title: 'Juegos al sol',
    tag: '#Sports',
    caption: 'Actividades recreativas bajo el cielo de Guanacaste.',
    alt: 'Juegos al aire libre',
  },
  {
    title: 'Momentos únicos',
    tag: '#Campamento',
    caption: 'Instantes que quedan en la memoria de cada niño.',
    alt: 'Momento especial del Nosara Day Camp',
  },
  {
    title: 'Aventura en grupo',
    tag: '#Adventure',
    caption: 'Retos y descubrimientos compartidos.',
    alt: 'Aventura grupal en el campamento',
  },
  {
    title: 'Aprendizaje activo',
    tag: '#Learning',
    caption: 'Experiencias que combinan diversión y conocimiento.',
    alt: 'Actividad educativa del campamento',
  },
  {
    title: 'Naturaleza viva',
    tag: '#Nature',
    caption: 'Paisajes y biodiversidad de la región.',
    alt: 'Escena natural durante el campamento',
  },
  {
    title: 'Sonrisas de Nosara',
    tag: '#Momentos',
    caption: 'El espíritu del Nosara Day Camp en una imagen.',
    alt: 'Foto del campamento Nosara Day Camp',
  },
]

const DEFAULT_META: Omit<GallerySlide, 'src'> = {
  title: 'Nosara Day Camp',
  tag: '#Campamento',
  caption: 'Aventuras y aprendizaje en la naturaleza.',
  alt: 'Fotografía del Nosara Day Camp',
}

function galleryNumberFromPath(path: string): number {
  return Number(path.match(/(\d+)\.png$/i)?.[1] ?? 0)
}

function sortGalleryPaths(paths: string[]): string[] {
  return [...paths].sort(
    (a: string, b: string) => galleryNumberFromPath(a) - galleryNumberFromPath(b),
  )
}

function buildGallerySlides(): GallerySlide[] {
  const modules = import.meta.glob<string>('../assets/gallery/*.png', {
    eager: true,
    import: 'default',
  })
  const paths = sortGalleryPaths(Object.keys(modules))
  return paths.map((path: string, i: number) => ({
    src: modules[path],
    ...(SLIDE_META[i] ?? DEFAULT_META),
  }))
}

function wrapOffset(index: number, active: number, length: number): number {
  let d = index - active
  const half = length / 2
  if (d > half) {
    d -= length
  }
  if (d < -half) {
    d += length
  }
  return d
}

/**
 * Galería con carrusel horizontal, transiciones suaves y fondo tipo parallax.
 */
export default function GallerySection(): React.JSX.Element {
  const gallerySlides = useMemo(() => buildGallerySlides(), [])
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [bgShiftY, setBgShiftY] = useState(0)
  const [slideGap, setSlideGap] = useState(210)
  const [rotateStep, setRotateStep] = useState(26)
  const length = gallerySlides.length
  const safeActiveIndex = length > 0 ? Math.min(activeIndex, length - 1) : 0
  const activeSlide = gallerySlides[safeActiveIndex] ?? gallerySlides[0]
  const goPrev = useCallback((): void => {
    if (length === 0) {
      return
    }
    setActiveIndex((i: number) => (i - 1 + length) % length)
  }, [length])
  const goNext = useCallback((): void => {
    if (length === 0) {
      return
    }
    setActiveIndex((i: number) => (i + 1) % length)
  }, [length])
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const applyGap = (): void => {
      setSlideGap(mq.matches ? 120 : 210)
      setRotateStep(mq.matches ? 16 : 26)
    }
    applyGap()
    mq.addEventListener('change', applyGap)
    return () => mq.removeEventListener('change', applyGap)
  }, [])
  useEffect(() => {
    const el = sectionRef.current
    if (!el) {
      return
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tick = (): void => {
      if (media.matches) {
        setBgShiftY(0)
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const center = rect.top + rect.height / 2
      const t = (center - vh * 0.5) / (vh * 0.9)
      setBgShiftY(Math.max(-1, Math.min(1, t)) * 28)
    }
    tick()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick, { passive: true })
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
    }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') {
        goPrev()
      }
      if (e.key === 'ArrowRight') {
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])
  if (length === 0 || !activeSlide) {
    return (
      <section id="galeria" className="gallery-section" aria-labelledby="galeria-heading">
        <div className="gallery-section__content">
          <h2 id="galeria-heading" className="gallery-section__title">
            Galería
          </h2>
          <p className="gallery-section__intro">Pronto añadiremos fotos del campamento.</p>
        </div>
      </section>
    )
  }
  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="gallery-section"
      aria-labelledby="galeria-heading"
    >
      <div className="gallery-section__bg" aria-hidden="true">
        <div
          className="gallery-section__bg-image"
          style={{
            backgroundImage: `url(${activeSlide.src})`,
            transform: `scale(1.18) translateY(${bgShiftY}px)`,
          }}
        />
        <div className="gallery-section__bg-scrim" />
      </div>
      <div className="gallery-section__content">
        <h2 id="galeria-heading" className="gallery-section__title">
          Galería
        </h2>
        <p className="gallery-section__intro">
          Momentos reales del campamento: naturaleza, aprendizaje y diversión ({length} fotos).
        </p>
        <div className="gallery-carousel" aria-roledescription="carrusel">
          <button
            type="button"
            className="gallery-carousel__arrow gallery-carousel__arrow--prev"
            aria-label="Foto anterior"
            onClick={goPrev}
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
          <div className="gallery-carousel__stage">
            <div className="gallery-carousel__track">
              {gallerySlides.map((slide: GallerySlide, index: number) => {
                const offset = wrapOffset(index, safeActiveIndex, length)
                const abs = Math.abs(offset)
                const isActive = index === safeActiveIndex
                const hidden = abs > 2
                const translateX = offset * slideGap
                const scale = isActive ? 1 : 0.78 - Math.min(abs, 2) * 0.07
                const rotateY = offset * -rotateStep
                const translateZ = 90 - abs * 38
                const opacity = hidden ? 0 : 1 - abs * 0.14
                return (
                  <button
                    key={`${index}-${slide.src}`}
                    type="button"
                    className={`gallery-carousel__slide${isActive ? ' gallery-carousel__slide--active' : ''}`}
                    style={{
                      transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex: 20 - abs,
                      pointerEvents: hidden ? 'none' : 'auto',
                      visibility: hidden ? 'hidden' : 'visible',
                    }}
                    onClick={() => setActiveIndex(index)}
                    aria-label={slide.alt}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="gallery-carousel__frame">
                      <img src={slide.src} alt="" className="gallery-carousel__img" draggable={false} />
                    </span>
                    <span className={`gallery-carousel__overlay${isActive ? ' gallery-carousel__overlay--visible' : ''}`}>
                      <span className="gallery-carousel__tag">{slide.tag}</span>
                      <span className="gallery-carousel__slide-title">{slide.title}</span>
                      <span className="gallery-carousel__slide-caption">{slide.caption}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <button
            type="button"
            className="gallery-carousel__arrow gallery-carousel__arrow--next"
            aria-label="Foto siguiente"
            onClick={goNext}
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        </div>
        <div className="gallery-carousel__dots" role="tablist" aria-label="Seleccionar foto">
          {gallerySlides.map((slide: GallerySlide, index: number) => (
            <button
              key={`dot-${index}-${slide.src}`}
              type="button"
              role="tab"
              aria-selected={index === safeActiveIndex}
              aria-label={`Ver foto ${index + 1} de ${length}: ${slide.title}`}
              className={`gallery-carousel__dot${index === safeActiveIndex ? ' gallery-carousel__dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
