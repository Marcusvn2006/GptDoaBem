import { useInView } from '../../hooks/useInView'
import styles from './Hero.module.css'

const bottomStats = [
  { value: '+500', label: 'Projetos Impactados' },
  { value: '+2k',  label: 'Voluntários Formados' },
  { value: '+150', label: 'ONGs Estruturadas' },
  { value: '+10k', label: 'Campanhas Criadas' },
]

export default function Hero() {
  const [contentRef, contentInView] = useInView()
  const [cardRef, cardInView] = useInView()
  const [statsRef, statsInView] = useInView()

  return (
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.inner}`}>

        <div ref={contentRef} className={styles.content}>
          <h1 className={`${styles.heading} anim-fade-up ${contentInView ? 'in-view' : ''}`}>
            Transformamos Invisibilidade em Sustentabilidade Social.
          </h1>
          <p className={`${styles.subtitle} anim-fade-up delay-2 ${contentInView ? 'in-view' : ''}`}>
            O GPTDOABEM forma criadores de conteúdo solidário para estruturar
            a presença digital de ONGs e combater a insônia financeira institucional.
          </p>
          <div className={`${styles.ctas} anim-fade-up delay-3 ${contentInView ? 'in-view' : ''}`}>
            <a href="#cadastro" className={styles.ctaPrimary}>Quero ser Voluntário</a>
            <a href="#parceria" className={styles.ctaSecondary}>Quero Apoiar o Projeto</a>
          </div>

          {/* Stats row fica direto abaixo dos botões com margin-top: 50px */}
          <div ref={statsRef} className={styles.statsRow}>
            {bottomStats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`${styles.statItem} anim-fade-up ${statsInView ? 'in-view' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className={styles.statRowNumber}>{value}</span>
                <span className={styles.statRowLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside
          ref={cardRef}
          className={`${styles.statsCard} anim-fade-right ${cardInView ? 'in-view' : ''}`}
        >
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
    </section>
  )
}
