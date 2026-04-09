import { Trans, useTranslation } from 'react-i18next'
import { useViewportParallax } from '../hooks/use-viewport-parallax'

type TeamMember = {
  readonly name: string
  readonly roleKey: 'admin' | 'counselor'
  readonly initials: string
  readonly tone: 'navy' | 'forest' | 'slate'
}

const TEAM_MEMBERS: readonly TeamMember[] = [
  { name: 'Cinthya Rosales', roleKey: 'admin', initials: 'CR', tone: 'navy' },
  { name: 'Laura Rosales', roleKey: 'counselor', initials: 'LR', tone: 'forest' },
  { name: 'Emily Rosales', roleKey: 'counselor', initials: 'ER', tone: 'slate' },
  { name: 'Wilberth Serrano', roleKey: 'counselor', initials: 'WS', tone: 'navy' },
  { name: 'Ines Rosales', roleKey: 'counselor', initials: 'IR', tone: 'forest' },
]

/**
 * Team section with ratio, certifications copy and member cards.
 */
export default function TeamSection(): React.JSX.Element {
  const { t } = useTranslation()
  const parallax = useViewportParallax({ maxShiftPx: 60, direction: -1 })
  return (
    <section
      ref={parallax.sectionRef}
      id="team"
      className="team-section team-section--parallax"
      aria-labelledby="team-heading"
    >
      <div className="team-section__parallax-layer" style={parallax.parallaxStyle}>
      <div className="team-section__inner">
        <header className="team-section__header">
          <span className="team-section__pill">{t('team.pill')}</span>
          <div className="team-section__header-row">
            <div className="team-section__header-main">
              <h2 id="team-heading" className="team-section__title">
                {t('team.title')}
              </h2>
              <p className="team-section__lead">{t('team.lead')}</p>
            </div>
            <p className="team-section__intro">
              <Trans
                i18nKey="team.intro"
                components={{
                  1: <strong />,
                  2: <strong />,
                  3: <strong />,
                  4: <strong />,
                  5: <strong />,
                }}
              />
            </p>
          </div>
        </header>
        <ul className="team-section__highlights" aria-label={t('team.highlightsAria')}>
          <li className="team-section__highlight">
            <span className="team-section__highlight-label">{t('team.hRatio')}</span>
            <span className="team-section__highlight-value">{t('team.hRatioValue')}</span>
            <span className="team-section__highlight-desc">{t('team.hRatioDesc')}</span>
          </li>
          <li className="team-section__highlight">
            <span className="team-section__highlight-label">{t('team.hHealth')}</span>
            <span className="team-section__highlight-value">{t('team.hHealthValue')}</span>
            <span className="team-section__highlight-desc">{t('team.hHealthDesc')}</span>
          </li>
          <li className="team-section__highlight">
            <span className="team-section__highlight-label">{t('team.hExp')}</span>
            <span className="team-section__highlight-value">{t('team.hExpValue')}</span>
            <span className="team-section__highlight-desc">{t('team.hExpDesc')}</span>
          </li>
        </ul>
        <ul className="team-section__cards" role="list">
          {TEAM_MEMBERS.map((member: TeamMember) => (
            <li key={member.name} className="team-section__card">
              <div className={`team-section__photo team-section__photo--${member.tone}`}>
                <span className="team-section__initials" aria-hidden="true">
                  {member.initials}
                </span>
              </div>
              <div className="team-section__card-body">
                <p className="team-section__name">{member.name}</p>
                <p className="team-section__role">{t(`team.roles.${member.roleKey}`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  )
}
