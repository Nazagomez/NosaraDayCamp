import { useTranslation } from 'react-i18next'

/**
 * Global site footer.
 */
export default function SiteFooter(): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <footer className="site-footer">
      <p>{t('footer.line')}</p>
    </footer>
  )
}
