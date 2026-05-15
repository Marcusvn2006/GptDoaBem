import styles from './Hero.module.css'

const stats = [
  { value: '+500', label: 'Projetos Impactados' },
  { value: '+2k', label: 'Voluntários Formados' },
  { value: '+150', label: 'ONGs Estruturadas' },
  { value: '+10k', label: 'Campanhas Criadas' },
]

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Transformamos Invisibilidade em Sustentabilidade Social.
          </h1>
          <p className={styles.subtitle}>
            O GPTDOABEM forma criadores de conteúdo solidário para estruturar
            a presença digital de ONGs e combater a insônia financeira institucional.
          </p>
          <div className={styles.ctas}>
            <a href="#cadastro" className={styles.ctaPrimary}>Quero ser Voluntário</a>
            <a href="#parceria" className={styles.ctaSecondary}>Quero Apoiar o Projeto</a>
          </div>
        </div>

        <aside className={styles.statsCard}>
          <div className={styles.statBlock}>
            <span className={styles.statNumber}>+500</span>
            <span className={styles.statLabel}>PROJETOS IMPACTADOS</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statBlock}>
            <span className={styles.statNumberAlt}>R$ 2M</span>
            <span className={styles.statLabel}>VALOR GERADO</span>
          </div>
        </aside>
      </div>

      <div className={`container ${styles.statsRow}`}>
        {stats.map(({ value, label }) => (
          <div key={label} className={styles.statItem}>
            <span className={styles.statRowNumber}>{value}</span>
            <span className={styles.statRowLabel}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
