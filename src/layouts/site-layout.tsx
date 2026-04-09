import { Outlet } from 'react-router-dom'
import SiteFooter from '../components/site-footer'
import SiteNavbar from '../components/site-navbar'

/**
 * Shared layout: fixed navbar, main outlet, footer.
 */
export default function SiteLayout(): React.JSX.Element {
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
