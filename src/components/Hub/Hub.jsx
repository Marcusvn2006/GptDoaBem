import { IoGitNetworkOutline, IoRocketOutline } from 'react-icons/io5'
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
  return (
    <section className={styles.section} id="hub">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Aceleradora Social e Hub Digital.</h2>
          <p className={styles.subtitle}>
            O GPTDOABEM atua como uma ponte estratégica entre talentos digitais em formação
            e ONGs que precisam de estrutura. Criamos ecossistemas sustentáveis de presença digital.
          </p>
        </div>

        <div className={styles.grid}>
          {hubCards.map(({ icon: Icon, title, description }) => (
            <article key={title} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={24} />
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
