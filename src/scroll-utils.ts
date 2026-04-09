/**
 * Smooth-scroll to a section id and sync the URL hash (single-page layout).
 */
export function scrollToSectionId(sectionId: string): void {
  if (sectionId === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname)
    return
  }
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const path = window.location.pathname || '/'
  window.history.replaceState(null, '', `${path}#${sectionId}`)
}
