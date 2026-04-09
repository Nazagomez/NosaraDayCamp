import { useTranslation } from 'react-i18next'

type LanguageCode = 'en' | 'es'

/**
 * Toggles site language (English default, Spanish secondary).
 */
export default function LanguageSwitcher(): React.JSX.Element {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'
  const setLang = (code: LanguageCode): void => {
    void i18n.changeLanguage(code)
  }
  return (
    <div className="language-switcher" role="group" aria-label={t('nav.langSwitcher')}>
      <button
        type="button"
        className={`language-switcher__btn${current === 'en' ? ' language-switcher__btn--active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={current === 'en'}
        aria-label={t('nav.langEn')}
      >
        EN
      </button>
      <button
        type="button"
        className={`language-switcher__btn${current === 'es' ? ' language-switcher__btn--active' : ''}`}
        onClick={() => setLang('es')}
        aria-pressed={current === 'es'}
        aria-label={t('nav.langEs')}
      >
        ES
      </button>
    </div>
  )
}
