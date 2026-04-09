import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

const WHATSAPP_E164 = '50686068903'
const MAP_EMBED_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-85.695%2C9.945%2C-85.615%2C10.015&layer=mapnik&marker=9.9764%2C-85.6528'
const MAP_EXTERNAL_HREF =
  'https://www.openstreetmap.org/?mlat=9.9764&mlon=-85.6528#map=14/9.9764/-85.6528'

type FormState = {
  readonly name: string
  readonly phone: string
  readonly email: string
  readonly subject: string
  readonly message: string
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

/**
 * Contact section: form, social links, map and detail cards.
 */
export default function ContactSection(): React.JSX.Element {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(initialForm)
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const nameLine = t('contact.wa.greeting', {
      name: form.name.trim() ? form.name.trim() : t('contact.wa.noName'),
    })
    const lines = [
      nameLine,
      form.phone.trim() ? t('contact.wa.phone', { phone: form.phone.trim() }) : '',
      form.email.trim() ? t('contact.wa.email', { email: form.email.trim() }) : '',
      form.subject.trim() ? t('contact.wa.subject', { subject: form.subject.trim() }) : '',
      '',
      form.message.trim() ? form.message.trim() : t('contact.wa.noMessage'),
    ].filter(Boolean)
    const text = lines.join('\n')
    const url = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  return (
    <section id="contacto" className="contact-section" aria-labelledby="contacto-heading">
      <div className="contact-section__top">
        <div className="contact-section__top-inner">
          <div className="contact-section__intro-block">
            <h2 id="contacto-heading" className="contact-section__title">
              {t('contact.title')}
            </h2>
            <p className="contact-section__subtitle">{t('contact.subtitle')}</p>
            <p className="contact-section__social-label">{t('contact.socialLabel')}</p>
            <ul className="contact-section__social" aria-label={t('contact.socialAria')}>
              <li>
                <a
                  className="contact-section__social-btn"
                  href="https://wa.me/50686068903"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="contact-section__social-icon" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="contact-section__social-btn"
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" className="contact-section__social-icon" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686 1.61V12h4.125l-.532 3.47h-3.593v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="contact-section__social-btn"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="contact-section__social-icon" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <form className="contact-section__form" onSubmit={handleSubmit} noValidate>
            <div className="contact-section__form-row">
              <label className="contact-section__field">
                <span className="contact-section__label">{t('contact.fieldName')}</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder={t('contact.phName')}
                  value={form.name}
                  onChange={(e) => setForm((f: FormState) => ({ ...f, name: e.target.value }))}
                />
              </label>
              <label className="contact-section__field">
                <span className="contact-section__label">{t('contact.fieldPhone')}</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder={t('contact.phPhone')}
                  value={form.phone}
                  onChange={(e) => setForm((f: FormState) => ({ ...f, phone: e.target.value }))}
                />
              </label>
            </div>
            <div className="contact-section__form-row">
              <label className="contact-section__field">
                <span className="contact-section__label">{t('contact.fieldEmail')}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t('contact.phEmail')}
                  value={form.email}
                  onChange={(e) => setForm((f: FormState) => ({ ...f, email: e.target.value }))}
                />
              </label>
              <label className="contact-section__field">
                <span className="contact-section__label">{t('contact.fieldSubject')}</span>
                <input
                  type="text"
                  name="subject"
                  placeholder={t('contact.phSubject')}
                  value={form.subject}
                  onChange={(e) => setForm((f: FormState) => ({ ...f, subject: e.target.value }))}
                />
              </label>
            </div>
            <label className="contact-section__field contact-section__field--full">
              <span className="contact-section__label">{t('contact.fieldMessage')}</span>
              <textarea
                name="message"
                rows={5}
                placeholder={t('contact.phMessage')}
                value={form.message}
                onChange={(e) => setForm((f: FormState) => ({ ...f, message: e.target.value }))}
              />
            </label>
            <button type="submit" className="contact-section__submit">
              {t('contact.submit')}
            </button>
            <p className="contact-section__form-note">{t('contact.formNote')}</p>
          </form>
        </div>
      </div>
      <div className="contact-section__bottom">
        <div className="contact-section__bottom-inner">
          <div className="contact-section__map-wrap">
            <iframe
              title={t('contact.mapTitle')}
              className="contact-section__map"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              className="contact-section__map-link"
              href={MAP_EXTERNAL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('contact.mapLink')}
            </a>
          </div>
          <div className="contact-section__details">
            <h3 className="contact-section__details-title">{t('contact.detailsTitle')}</h3>
            <p className="contact-section__details-lead">{t('contact.detailsLead')}</p>
            <ul className="contact-section__cards" role="list">
              <li className="contact-section__card">
                <span className="contact-section__card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      fill="currentColor"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                </span>
                <span className="contact-section__card-label">{t('contact.cardLocation')}</span>
                <span className="contact-section__card-value">{t('contact.cardLocationValue')}</span>
              </li>
              <li className="contact-section__card">
                <span className="contact-section__card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      fill="currentColor"
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    />
                  </svg>
                </span>
                <span className="contact-section__card-label">{t('contact.cardPhone')}</span>
                <a className="contact-section__card-value contact-section__card-link" href="tel:+50686068903">
                  +506 8606 8903
                </a>
              </li>
              <li className="contact-section__card">
                <span className="contact-section__card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      fill="currentColor"
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    />
                  </svg>
                </span>
                <span className="contact-section__card-label">{t('contact.cardWrite')}</span>
                <span className="contact-section__card-value">{t('contact.cardWriteValue')}</span>
              </li>
              <li className="contact-section__card">
                <span className="contact-section__card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      fill="currentColor"
                      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                    />
                  </svg>
                </span>
                <span className="contact-section__card-label">{t('contact.cardHours')}</span>
                <span className="contact-section__card-value">
                  {t('contact.cardHoursLine1')}
                  <br />
                  {t('contact.cardHoursLine2')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
