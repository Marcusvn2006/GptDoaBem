import { useState } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import styles from './FAQ.module.css'

const faqs = [
  {
    question: 'De que forma minha doação contribui com o GPTDOABEM?',
    answer:
      'Sua doação tem impacto direto na estruturação da presença digital de organizações sociais. Os recursos são direcionados para formação de voluntários, ferramentas e mentoria especializada. Cada contribuição fortalece nossa missão e transforma a visibilidade de milhares de projetos sociais.',
  },
  {
    question: 'Onde posso conferir o destino das doações?',
    answer:
      'A transparência é um compromisso fundamental do GPTDOABEM. Para conferir como as doações são aplicadas e o impacto gerado, você pode acessar nossos Relatórios de Impacto, em que detalhamos a destinação dos recursos e os principais resultados alcançados.',
  },
  {
    question: 'Sou uma empresa. Como patrocinar uma turma?',
    answer:
      'Ficamos felizes com o interesse em acelerar a sustentabilidade digital junto conosco! Para fazer uma doação ou patrocinar uma turma, entre em contato com nosso time pelo formulário e conte sobre a parceria. Ficaremos felizes em indicar os próximos passos.',
  },
  {
    question: 'Sou uma pessoa física. Como doar ou ser voluntário?',
    answer:
      'Agradecemos a sua parceria em combater a insônia financeira social! Para fazer sua doação ou se cadastrar como voluntário, acesse nossa plataforma de cadastro e escolha sua forma de contribuição.',
  },
  {
    question: 'Preciso ter experiência em marketing digital para participar?',
    answer:
      'Não! O GPTDOABEM é projetado para iniciantes. Nosso método é 100% mobile, acessível e democrático. Qualquer pessoa pode aprender e aplicar.',
  },
  {
    question: 'Quanto tempo dura o programa?',
    answer:
      'O treinamento interno dura 8 semanas, com carga de 4 a 6 horas semanais. O laboratório social é contínuo e os voluntários podem permanecer conectados aos projetos após a formação.',
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        <span className={styles.question}>{question}</span>
        <IoChevronDownOutline className={`${styles.icon} ${open ? styles.iconOpen : ''}`} size={20} />
      </button>
      {open && <p className={styles.answer}>{answer}</p>}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Perguntas Frequentes</h2>
        </div>

        <div className={styles.list}>
          {faqs.map(({ question, answer }) => (
            <FAQItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
