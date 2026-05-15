import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'Cadastre-se Gratuitamente',
    description: 'Nome, WhatsApp, cidade e causa de interesse. Leva menos de 60 segundos.',
  },
  {
    number: '02',
    title: 'Escolha sua Causa',
    description: 'Conectamos você ao projeto social que mais combina com seu perfil.',
  },
  {
    number: '03',
    title: 'Participe da Formação',
    description: '8 semanas de aprendizado prático, 100% mobile, com mentoria especializada.',
  },
  {
    number: '04',
    title: 'Crie Impacto Real',
    description: 'Estruture a presença digital de uma ONG real e receba suas vantagens.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="como-funciona">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Como Funciona</h2>
          <p className={styles.subtitle}>4 passos que mudam o jogo</p>
        </div>

        <div className={styles.grid}>
          {steps.map(({ number, title, description }) => (
            <article key={number} className={styles.step}>
              <span className={styles.stepNum}>{number}</span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#cadastro" className={styles.ctaBtn}>Cadastre-se Gratuitamente</a>
        </div>
      </div>
    </section>
  )
}
