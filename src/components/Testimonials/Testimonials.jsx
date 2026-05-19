import { useInView } from '../../hooks/useInView'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    quote:
      'Antes do GPTDOABEM, nossa ONG dependia de doações esporádicas. Hoje temos um Instagram profissional, um funil de captação e previsibilidade de recursos. Dormimos tranquilos agora.',
    name: 'Maria',
    role: 'Coordenadora de ONG',
  },
  {
    quote:
      'Aprendi marketing digital aplicando em projetos reais. Hoje tenho portfólio, certificado e uma habilidade monetizável. E o melhor: ajudei projetos sociais a saírem da invisibilidade.',
    name: 'João',
    role: 'Voluntário GPTDOABEM',
  },
  {
    quote:
      'Patrocinar uma turma do GPTDOABEM fortaleceu nossa agenda ESG e gerou engajamento real dos nossos colaboradores. Os relatórios de impacto são auditáveis e transparentes.',
    name: 'Ana',
    role: 'Diretora de RH',
  },
]

export default function Testimonials() {
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section className={styles.section} id="depoimentos">
      <div className="container">
        <div ref={headerRef} className={`${styles.header} anim-fade-up ${headerInView ? 'in-view' : ''}`}>
          <h2 className={styles.title}>Quem entra no GPTDOABEM não queria apenas ajudar — queria pertencer</h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {testimonials.map(({ quote, name, role }, i) => (
            <article
              key={name}
              className={`${styles.card} anim-fade-up delay-${i + 1} ${gridInView ? 'in-view' : ''}`}
            >
              <blockquote className={styles.quote}>"{quote}"</blockquote>
              <footer className={styles.author}>
                <span className={styles.authorName}>— {name}</span>
                <span className={styles.authorRole}>{role}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className={`${styles.cta} anim-fade-up delay-4 ${gridInView ? 'in-view' : ''}`}>
          <a href="#cadastro" className={styles.ctaPrimary}>Quero ser Voluntário</a>
          <a href="#contato" className={styles.ctaSecondary}>Quero Apoiar o Projeto</a>
        </div>
      </div>
    </section>
  )
}
