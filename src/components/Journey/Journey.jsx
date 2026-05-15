import styles from './Journey.module.css'

const phases = [
  {
    number: '1',
    title: 'Onboarding',
    description: 'Imersão no ecossistema solidário e alinhamento de propósito com as ONGs parceiras.',
  },
  {
    number: '2',
    title: 'Estratégia Digital',
    description: 'Mapeamento de personas, definição de canais e construção da voz institucional da ONG.',
  },
  {
    number: '3',
    title: 'Produção de Conteúdo',
    description: 'Criação de narrativas de impacto, design visual e copywriting orientado à conversão.',
  },
  {
    number: '4',
    title: 'Captação Estruturada',
    description: 'Desenvolvimento de funis de doação recorrente e campanhas de financiamento coletivo.',
  },
  {
    number: '5',
    title: 'Análise de Dados',
    description: 'Monitoramento de KPIs sociais, engajamento e otimização contínua das campanhas.',
  },
  {
    number: '6',
    title: 'Graduação e Mentoria',
    description: 'Certificação como Especialista em Impacto Digital e transição para o papel de mentor de novos voluntários.',
  },
]

export default function Journey() {
  return (
    <section className={styles.section} id="jornada">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Jornada de Formação.</h2>
          <p className={styles.subtitle}>
            Transformamos voluntários em especialistas em impacto digital em 6 fases intensivas.
          </p>
        </div>

        <div className={styles.grid}>
          {phases.map(({ number, title, description }) => (
            <article key={number} className={styles.card}>
              <span className={styles.badge}>{number}</span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
