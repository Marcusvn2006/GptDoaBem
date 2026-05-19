import { IoGitNetworkOutline, IoRocketOutline } from 'react-icons/io5'
import { useInView } from '../../hooks/useInView'
import styles from './Hub.module.css'

const hubCards = [
  {
    icon: IoGitNetworkOutline,
    title: 'Hub Digital',
    description:
      'Centralizamos ferramentas, metodologias e talentos para fornecer às ONGs um arcabouço digital robusto, permitindo que elas foquem em sua missão fim enquanto nós cuidamos da amplificação de sua voz.',
  },
  {
    icon: IoRocketOutline,
    title: 'Aceleradora',
    description:
      'Impulsionamos projetos sociais através de campanhas orientadas a dados, estratégias de storytelling e design de impacto, multiplicando o alcance e a capacidade de captação.',
  },
]

export default function Hub() {
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section className={styles.section} id="hub">
      <div className="container">
        <div ref={headerRef} className={`${styles.header} anim-fade-up ${headerInView ? 'in-view' : ''}`}>
          <h2 className={styles.title}>Aceleradora Social e Hub Digital.</h2>
          <p className={styles.subtitle}>
            O GPTDOABEM atua como uma ponte estratégica entre talentos digitais em formação
            e ONGs que precisam de estrutura. Criamos ecossistemas sustentáveis de presença digital.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {hubCards.map(({ icon: Icon, title, description }, i) => (
            <article
              key={title}
              className={`${styles.card} anim-scale ${i === 0 ? 'delay-1' : 'delay-3'} ${gridInView ? 'in-view' : ''}`}
            >
              <div className={styles.iconWrap}>
                <Icon size={24} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>

        <div className={`${styles.cta} anim-fade-up delay-4 ${gridInView ? 'in-view' : ''}`}>
          <a href="#cadastro" className={styles.ctaPrimary}>Quero Fazer Parte</a>
          <a href="#parceria" className={styles.ctaSecondary}>Quero Apoiar como Empresa</a>
        </div>
      </div>
    </section>
  )
}
