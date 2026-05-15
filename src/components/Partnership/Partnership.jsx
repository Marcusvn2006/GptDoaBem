import styles from './Partnership.module.css'

const partnerTypes = [
  {
    emoji: '👤',
    title: 'Pessoas Físicas',
    description:
      'Que acreditam profundamente nessa causa e escolhem investir na transformação pela presença digital solidária.',
  },
  {
    emoji: '🏢',
    title: 'Empresas',
    description:
      'Que reconhecem a importância de priorizar o impacto social como um dos principais pilares de sua atuação, incorporando-o em suas estratégias de ESG (Ambiental, Social e Governança).',
  },
]

export default function Partnership() {
  return (
    <section className={styles.section} id="parceria">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Junte-se a Nós</h2>
          <p className={styles.subtitle}>
            Acreditamos que a presença digital é a ferramenta mais estratégica e transformadora
            que se pode oferecer a um projeto social, pois é por meio dela que cada ONG tem a
            oportunidade de desenvolver plenamente seu potencial de captação e sustentabilidade.
          </p>
        </div>

        <div className={styles.grid}>
          {partnerTypes.map(({ emoji, title, description }) => (
            <article key={title} className={styles.card}>
              <span className={styles.cardEmoji}>{emoji}</span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.callout}>
          <p className={styles.calloutText}>
            🌱 O Brasil foi o país latino-americano que mais buscou pelo termo ESG no Google em 2024.
            Abraçar o nosso trabalho é abraçar a causa da sustentabilidade digital e deixar uma marca
            positiva na sociedade. Vamos juntos?
          </p>
        </div>

        <div className={styles.funding}>
          <p className={styles.fundingText}>
            Nossos projetos são viabilizados por parcerias com o setor privado, doações de empresas,
            doações de pessoas físicas e patrocínio de turmas.
          </p>
        </div>
      </div>
    </section>
  )
}
