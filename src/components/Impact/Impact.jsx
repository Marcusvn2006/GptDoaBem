import styles from './Impact.module.css'

const stats = [
  { value: '+500', label: 'PROJETOS IMPACTADOS', color: 'primary' },
  { value: '+2k', label: 'VOLUNTÁRIOS FORMADOS', color: 'lavender' },
  { value: '+150', label: 'ONGS ESTRUTURADAS', color: 'green' },
  { value: '+10k', label: 'CAMPANHAS CRIADAS', color: 'white' },
]

const esgBenefits = [
  'Alinhamento com pilares ESG',
  'Fortalecimento de marca institucional',
  'Engajamento interno de colaboradores',
  'Relatório com métricas auditáveis',
  'Visibilidade de marca em materiais e redes sociais',
  'Conexão com voluntários engajados e alinhados com propósito',
]

export default function Impact() {
  return (
    <section className={styles.section} id="impacto">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Impacto e ESG.</h2>
          <p className={styles.subtitle}>
            Nossa métrica principal é a vida transformada. Estes são os números
            que sustentam nossa missão.
          </p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map(({ value, label, color }) => (
            <div key={label} className={styles.statCard}>
              <span className={`${styles.statValue} ${styles[`statValue--${color}`]}`}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.esgBlock}>
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
      </div>
    </section>
  )
}
