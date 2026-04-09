import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type GallerySlide = {
  readonly src: string
  readonly title: string
  readonly tag: string
  readonly caption: string
  readonly alt: string
}

function galleryNumberFromPath(path: string): number {
  return Number(path.match(/(\d+)\.png$/i)?.[1] ?? 0)
}

function sortGalleryPaths(paths: string[]): string[] {
  return [...paths].sort(
    (a: string, b: string) => galleryNumberFromPath(a) - galleryNumberFromPath(b),
  )
}

function buildGallerySlides(t: (key: string) => string): GallerySlide[] {
  const modules = import.meta.glob<string>('../assets/gallery/*.png', {
    eager: true,
    import: 'default',
  })
  const paths = sortGalleryPaths(Object.keys(modules))
  return paths.map((path: string, i: number) => {
    const base = `gallery.slides.${i}`
    const hasSlide = t(`${base}.title`) !== `${base}.title`
    if (hasSlide) {
      return {
        src: modules[path],
        title: t(`${base}.title`),
        tag: t(`${base}.tag`),
        caption: t(`${base}.caption`),
        alt: t(`${base}.alt`),
      }
    }
    return {
      src: modules[path],
      title: t('gallery.defaultSlide.title'),
      tag: t('gallery.defaultSlide.tag'),
      caption: t('gallery.defaultSlide.caption'),
      alt: t('gallery.defaultSlide.alt'),
    }
  })
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
  const { t } = useTranslation()
  const gallerySlides = useMemo(() => buildGallerySlides(t), [t])
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
      const tParallax = (center - vh * 0.5) / (vh * 0.9)
      setBgShiftY(Math.max(-1, Math.min(1, tParallax)) * 28)
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
            {t('gallery.title')}
          </h2>
          <p className="gallery-section__intro">{t('gallery.introEmpty')}</p>
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
          {t('gallery.title')}
        </h2>
        <p className="gallery-section__intro">{t('gallery.intro', { count: length })}</p>
        <div className="gallery-carousel" aria-roledescription={t('gallery.carousel')}>
          <button
            type="button"
            className="gallery-carousel__arrow gallery-carousel__arrow--prev"
            aria-label={t('gallery.prev')}
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
            aria-label={t('gallery.next')}
            onClick={goNext}
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        </div>
        <div className="gallery-carousel__dots" role="tablist" aria-label={t('gallery.selectPhoto')}>
          {gallerySlides.map((slide: GallerySlide, index: number) => (
            <button
              key={`dot-${index}-${slide.src}`}
              type="button"
              role="tab"
              aria-selected={index === safeActiveIndex}
              aria-label={t('gallery.dotLabel', { n: index + 1, total: length, title: slide.title })}
              className={`gallery-carousel__dot${index === safeActiveIndex ? ' gallery-carousel__dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
