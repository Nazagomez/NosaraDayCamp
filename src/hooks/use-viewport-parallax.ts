import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'

/**
 * Vertical parallax for section content based on viewport position (skips when reduced motion).
 * Optional measureRef measures an existing element (e.g. gallery section) while style applies elsewhere.
 */
export function useViewportParallax<T extends HTMLElement = HTMLElement>(options: {
  readonly maxShiftPx: number
  readonly direction?: 1 | -1
  readonly measureRef?: RefObject<T | null>
}): {
  readonly sectionRef: RefObject<T | null>
  readonly parallaxStyle: CSSProperties
} {
  const { maxShiftPx, direction = 1, measureRef: externalMeasureRef } = options
  const internalRef = useRef<T | null>(null)
  const measureRef = externalMeasureRef ?? internalRef
  const [y, setY] = useState(0)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tick = (): void => {
      if (media.matches) {
        setY(0)
        return
      }
      const el = measureRef.current
      if (!el) {
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const center = rect.top + rect.height / 2
      const t = (center - vh * 0.5) / (vh * 0.5)
      const clamped = Math.max(-1, Math.min(1, t))
      setY(clamped * maxShiftPx * direction)
    }
    tick()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick, { passive: true })
    const onMedia = (): void => tick()
    media.addEventListener('change', onMedia)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      media.removeEventListener('change', onMedia)
    }
  }, [maxShiftPx, direction, measureRef])
  return {
    sectionRef: measureRef,
    parallaxStyle: {
      transform: `translate3d(0, ${y}px, 0)`,
      willChange: 'transform',
    },
  }
}
