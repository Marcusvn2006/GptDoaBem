import { useInView } from '../../hooks/useInView'
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

const delays = ['delay-1','delay-2','delay-3','delay-1','delay-2','delay-3','delay-1','delay-2','delay-3']

export default function Benefits() {
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section className={styles.section} id="vantagens">
      <div className="container">
        <div ref={headerRef} className={`${styles.header} anim-fade-up ${headerInView ? 'in-view' : ''}`}>
          <h2 className={styles.title}>Vantagens que Você Sente</h2>
          <p className={styles.subtitle}>
            No GPTDOABEM, voluntariado não é sacrifício — é troca inteligente.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {benefits.map(({ emoji, text }, i) => (
            <div
              key={text}
              className={`${styles.item} anim-scale ${delays[i]} ${gridInView ? 'in-view' : ''}`}
            >
              <span className={styles.itemEmoji}>{emoji}</span>
              <p className={styles.itemText}>{text}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} anim-fade-up delay-4 ${gridInView ? 'in-view' : ''}`}>
          <a href="#cadastro" className={styles.ctaBtn}>Quero Minhas Vantagens</a>
        </div>
      </div>
    </section>
  )
}
