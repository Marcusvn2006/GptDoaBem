import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'
import styles from './Impact.module.css'

const stats = [
  { raw: '500', display: '+500', label: 'PROJETOS IMPACTADOS', color: 'primary' },
  { raw: '2000', display: '+2k',  label: 'VOLUNTÁRIOS FORMADOS', color: 'lavender' },
  { raw: '150',  display: '+150', label: 'ONGS ESTRUTURADAS',    color: 'green' },
  { raw: '10000',display: '+10k', label: 'CAMPANHAS CRIADAS',    color: 'white' },
]

const esgBenefits = [
  'Alinhamento com pilares ESG',
  'Fortalecimento de marca institucional',
  'Engajamento interno de colaboradores',
  'Relatório com métricas auditáveis',
  'Visibilidade de marca em materiais e redes sociais',
  'Conexão com voluntários engajados e alinhados com propósito',
]

function AnimatedStat({ raw, display, label, color, start, delay }) {
  const count = useCountUp(raw, 1800, start)
  const suffix = display.replace(/[0-9]/g, '')
  const formatted = display.includes('k')
    ? display
    : `+${count}`

  return (
    <div className={`${styles.statCard} anim-scale ${delay} ${start ? 'in-view' : ''}`}>
      <span className={`${styles.statValue} ${styles[`statValue--${color}`]}`}>{formatted}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

export default function Impact() {
  const [headerRef, headerInView] = useInView()
  const [statsRef, statsInView] = useInView()
  const [esgRef, esgInView] = useInView()

  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4']

  return (
    <section className={styles.section} id="impacto">
      <div className="container">
        <div ref={headerRef} className={`${styles.header} anim-fade-up ${headerInView ? 'in-view' : ''}`}>
          <h2 className={styles.title}>Impacto e ESG.</h2>
          <p className={styles.subtitle}>
            Nossa métrica principal é a vida transformada. Estes são os números
            que sustentam nossa missão.
          </p>
        </div>

        <div ref={statsRef} className={styles.statsGrid}>
          {stats.map(({ raw, display, label, color }, i) => (
            <AnimatedStat
              key={label}
              raw={raw}
              display={display}
              label={label}
              color={color}
              start={statsInView}
              delay={delays[i]}
            />
          ))}
        </div>

        <div ref={esgRef} className={`${styles.esgBlock} anim-fade-up delay-2 ${esgInView ? 'in-view' : ''}`}>
          <h3 className={styles.esgTitle}>Indicadores que Entregamos</h3>
          <div className={styles.esgGrid}>
            {esgBenefits.map((b) => (
              <div key={b} className={styles.esgItem}>
                <span className={styles.esgDot} />
                <p className={styles.esgText}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.cta} anim-fade-up delay-3 ${esgInView ? 'in-view' : ''}`}>
          <a href="#parceria" className={styles.ctaPrimary}>Quero Fortalecer meu ESG</a>
          <a href="#contato" className={styles.ctaSecondary}>Ver Relatório de Impacto</a>
        </div>
      </div>
    </section>
  )
}
