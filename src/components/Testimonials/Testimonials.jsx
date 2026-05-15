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
  return (
    <section className={styles.section} id="depoimentos">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Quem entra no GPTDOABEM não queria apenas ajudar — queria pertencer</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map(({ quote, name, role }) => (
            <article key={name} className={styles.card}>
              <blockquote className={styles.quote}>"{quote}"</blockquote>
              <footer className={styles.author}>
                <span className={styles.authorName}>— {name}</span>
                <span className={styles.authorRole}>{role}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
