import { IoSchoolOutline, IoBarChartOutline, IoPeopleOutline } from 'react-icons/io5'
import styles from './Solution.module.css'

const cards = [
  {
    icon: IoSchoolOutline,
    title: 'Formação Híbrida',
    description: 'Capacitação intensiva em ferramentas digitais e gestão para ONGs, criando autonomia real.',
  },
  {
    icon: IoBarChartOutline,
    title: 'Auditoria ESG',
    description: 'Métricas transparentes e prontas para auditoria, conectando projetos a parceiros corporativos.',
    featured: true,
  },
  {
    icon: IoPeopleOutline,
    title: 'Aceleradora de Afiliados',
    description: 'Um marketplace estruturado para gerar fluxo de caixa contínuo através de afiliações estratégicas.',
  },
]

export default function Solution() {
  return (
    <section className={styles.section} id="solucao">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>A Solução: Estrutura Profissional</h2>
          <p className={styles.subtitle}>
            Não oferecemos apenas doações. Oferecemos um ecossistema completo de
            capacitação, ferramentas e governança focado em critérios ESG.
          </p>
        </div>

        <div className={styles.grid}>
          {cards.map(({ icon: Icon, title, description, featured }) => (
            <article key={title} className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
              <div className={styles.iconWrap}>
                <Icon size={22} />
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
