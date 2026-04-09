type TeamMember = {
  readonly name: string
  readonly role: string
  readonly initials: string
  readonly tone: 'navy' | 'forest' | 'slate'
}

const TEAM_MEMBERS: readonly TeamMember[] = [
  { name: 'Cinthya Rosales', role: 'Administradora', initials: 'CR', tone: 'navy' },
  { name: 'Laura Rosales', role: 'Counselor y guía', initials: 'LR', tone: 'forest' },
  { name: 'Emily Rosales', role: 'Counselor y guía', initials: 'ER', tone: 'slate' },
  { name: 'Wilberth Serrano', role: 'Counselor y guía', initials: 'WS', tone: 'navy' },
  { name: 'Ines Rosales', role: 'Counselor y guía', initials: 'IR', tone: 'forest' },
]

/**
 * Team section with ratio, certifications copy and member cards.
 */
export default function TeamSection(): React.JSX.Element {
  return (
    <section id="team" className="team-section" aria-labelledby="team-heading">
      <div className="team-section__inner">
        <header className="team-section__header">
          <span className="team-section__pill">Equipo</span>
          <div className="team-section__header-row">
            <div className="team-section__header-main">
              <h2 id="team-heading" className="team-section__title">
                Team Nosara Day Camp
              </h2>
              <p className="team-section__lead">
                Personas de confianza que acompañan a los niños en cada salida, con estándares claros de
                seguridad y calidez humana.
              </p>
            </div>
            <p className="team-section__intro">
              Contamos con <strong>1 counselor por cada 4 niños</strong>, de modo que nadie queda sin
              supervisión cercana. Todo el equipo de campo está <strong>certificado en primeros auxilios</strong>{' '}
              y aporta <strong>años de experiencia</strong> trabajando con menores, excursiones y actividades al
              aire libre en Nosara. La administración está a cargo de <strong>Cinthya Rosales</strong>. Las
              guías y counselors <strong>Laura Rosales, Emily Rosales, Wilberth Serrano e Ines Rosales</strong>{' '}
              conocen el entorno, acompañan con paciencia y aplican los protocolos de seguridad del campamento.
            </p>
          </div>
        </header>
        <ul className="team-section__highlights" aria-label="Compromisos del equipo">
          <li className="team-section__highlight">
            <span className="team-section__highlight-label">Ratio</span>
            <span className="team-section__highlight-value">1 : 4</span>
            <span className="team-section__highlight-desc">Un counselor por cada cuatro niños</span>
          </li>
          <li className="team-section__highlight">
            <span className="team-section__highlight-label">Salud</span>
            <span className="team-section__highlight-value">Primeros auxilios</span>
            <span className="team-section__highlight-desc">Certificación al día en el equipo</span>
          </li>
          <li className="team-section__highlight">
            <span className="team-section__highlight-label">Experiencia</span>
            <span className="team-section__highlight-value">Trayectoria</span>
            <span className="team-section__highlight-desc">Años cuidando niños en campamento y naturaleza</span>
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
                <p className="team-section__role">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
