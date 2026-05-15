import { IoEyeOffOutline, IoTrendingDownOutline, IoWarningOutline } from 'react-icons/io5'
import styles from './Problem.module.css'

const problems = [
  {
    icon: IoEyeOffOutline,
    title: 'Invisibilidade',
    description: 'Falta de presença digital estruturada e narrativa clara.',
    variant: 'default',
  },
  {
    icon: IoTrendingDownOutline,
    title: 'Escassez',
    description: 'Sem alcance, não há captação de recursos eficiente.',
    variant: 'default',
  },
  {
    icon: IoWarningOutline,
    title: 'Instabilidade',
    description: 'Projetos sociais em risco constante de encerramento.',
    variant: 'danger',
  },
]

export default function Problem() {
  return (
    <section className={styles.section} id="problema">
      <div className={`container ${styles.inner}`}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>Insônia Financeira Institucional.</h2>
          <p className={styles.desc}>
            Milhares de ONGs realizam trabalhos essenciais, mas sofrem na
            escuridão digital. A invisibilidade gera escassez, e a escassez
            gera instabilidade.
          </p>
        </div>

        <div className={styles.cards}>
          {problems.map(({ icon: Icon, title, description, variant }) => (
            <article key={title} className={`${styles.card} ${styles[`card--${variant}`]}`}>
              <div className={`${styles.iconWrap} ${styles[`iconWrap--${variant}`]}`}>
                <Icon size={20} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
