import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SiteFooter from '../components/site-footer'
import SiteNavbar from '../components/site-navbar'
import i18n from '../i18n/i18n'

/**
 * Shared layout: fixed navbar, main outlet, footer.
 */
export default function SiteLayout(): React.JSX.Element {
  useEffect(() => {
    const syncHtmlLang = (lng: string): void => {
      document.documentElement.lang = lng.startsWith('es') ? 'es' : 'en'
    }
    syncHtmlLang(i18n.language)
    i18n.on('languageChanged', syncHtmlLang)
    return () => {
      i18n.off('languageChanged', syncHtmlLang)
    }
  }, [])
  return (
    <div className="site-layout">
      <SiteNavbar />
      <div className="site-layout__main">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  )
}
