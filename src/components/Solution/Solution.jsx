import { IoSchoolOutline, IoBarChartOutline, IoPeopleOutline } from 'react-icons/io5'
import { useInView } from '../../hooks/useInView'
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

const delays = ['delay-1', 'delay-2', 'delay-3']

export default function Solution() {
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section className={styles.section} id="solucao">
      <div className="container">
        <div ref={headerRef} className={`${styles.header} anim-fade-up ${headerInView ? 'in-view' : ''}`}>
          <h2 className={styles.title}>A Solução: Estrutura Profissional</h2>
          <p className={styles.subtitle}>
            Não oferecemos apenas doações. Oferecemos um ecossistema completo de
            capacitação, ferramentas e governança focado em critérios ESG.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {cards.map(({ icon: Icon, title, description, featured }, i) => (
            <article
              key={title}
              className={`${styles.card} ${featured ? styles.cardFeatured : ''} anim-scale ${delays[i]} ${gridInView ? 'in-view' : ''}`}
            >
              <div className={styles.iconWrap}>
                <Icon size={22} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>

        <div className={`${styles.cta} anim-fade-up delay-4 ${gridInView ? 'in-view' : ''}`}>
          <a href="#jornada" className={styles.ctaBtn}>Conheça a Jornada de Formação</a>
        </div>
      </div>
    </section>
  )
}
