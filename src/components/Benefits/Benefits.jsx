import styles from './Benefits.module.css'

const benefits = [
  { emoji: '🎟', text: 'Cupons e descontos exclusivos de parceiros' },
  { emoji: '💰', text: 'Vouchers e cashback em compras' },
  { emoji: '📜', text: 'Certificado oficial de voluntariado digital' },
  { emoji: '📚', text: 'Acesso a cursos e oficinas complementares' },
  { emoji: '🤝', text: 'Mentorias com especialistas em marketing digital' },
  { emoji: '🎉', text: 'Eventos de networking e celebração' },
  { emoji: '🧠', text: 'Apoio à saúde emocional (rodas de conversa, práticas de bem-estar)' },
  { emoji: '💼', text: 'Experiência comprovável para currículo e LinkedIn' },
  { emoji: '🎓', text: 'Portfólio real de projetos sociais' },
]

export default function Benefits() {
  return (
    <section className={styles.section} id="vantagens">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Vantagens que Você Sente</h2>
          <p className={styles.subtitle}>
            No GPTDOABEM, voluntariado não é sacrifício — é troca inteligente.
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map(({ emoji, text }) => (
            <div key={text} className={styles.item}>
              <span className={styles.itemEmoji}>{emoji}</span>
              <p className={styles.itemText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
