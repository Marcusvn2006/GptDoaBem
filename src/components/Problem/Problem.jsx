import { IoEyeOffOutline, IoTrendingDownOutline, IoWarningOutline } from 'react-icons/io5'
import { useInView } from '../../hooks/useInView'
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

const delays = ['delay-1', 'delay-2', 'delay-3']

export default function Problem() {
  const [textRef, textInView] = useInView()
  const [cardsRef, cardsInView] = useInView()

  return (
    <section className={styles.section} id="problema">
      <div className={`container ${styles.inner}`}>
        <div ref={textRef} className={`${styles.textBlock} anim-fade-left ${textInView ? 'in-view' : ''}`}>
          <h2 className={styles.title}>Insônia Financeira Institucional.</h2>
          <p className={styles.desc}>
            Milhares de ONGs realizam trabalhos essenciais, mas sofrem na
            escuridão digital. A invisibilidade gera escassez, e a escassez
            gera instabilidade.
          </p>
        </div>

        <div ref={cardsRef} className={styles.cards}>
          {problems.map(({ icon: Icon, title, description, variant }, i) => (
            <article
              key={title}
              className={`${styles.card} ${styles[`card--${variant}`]} anim-fade-right ${delays[i]} ${cardsInView ? 'in-view' : ''}`}
            >
              <div className={`${styles.iconWrap} ${styles[`iconWrap--${variant}`]}`}>
                <Icon size={20} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
          <a
            href="#solucao"
            className={`${styles.ctaBtn} anim-fade-up delay-4 ${cardsInView ? 'in-view' : ''}`}
          >
            Ver a Solução
          </a>
        </div>
      </div>
    </section>
  )
}
