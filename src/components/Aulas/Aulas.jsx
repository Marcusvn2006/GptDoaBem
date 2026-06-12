import { useState } from 'react'
import { RiPlayFill } from 'react-icons/ri'
import styles from './Aulas.module.css'

const aulas = [
  {
    number: '01',
    title: 'Como criar conta Dark para Instagram',
    videoId: 'urbH49Sa11U',
    thumb: '/thumbs/01-instagram.jpg',
    short: false,
  },
  {
    number: '02',
    title: 'Como criar conta Dark para Facebook',
    videoId: 'z6EAiicttV0',
    thumb: '/thumbs/02-facebook.jpg',
    short: true,
  },
  {
    number: '03',
    title: 'Como criar conta Dark para YouTube',
    videoId: 'uhn29kt8kCI',
    thumb: '/thumbs/03-youtube.jpg',
    short: false,
  },
  {
    number: '04',
    title: 'Como criar conta Dark para LinkedIn',
    videoId: '421gy5M3AyI',
    thumb: '/thumbs/04-linkedin.jpg',
    short: true,
  },
  {
    number: '05',
    title: 'Como criar conta Dark para LinkTree',
    videoId: 'dCHIWjtkjw0',
    thumb: '/thumbs/05-linktree.jpg',
    short: true,
  },
  {
    number: '06',
    title: 'Como criar conteúdo gratuitamente com IA',
    videoId: 'vma7xNCbLs0',
    thumb: '/thumbs/06-ia-conteudo.jpg',
    short: true,
  },
  {
    number: '07',
    title: 'Estratégia de postagem com IA',
    videoId: 'lVqbhjEG3uk',
    thumb: '/thumbs/07-ia-postagem.jpg',
    short: true,
  },
  {
    number: '08',
    title: 'Estratégia de compartilhamento com IA',
    videoId: 'cC2qcB1Vnrs',
    thumb: '/thumbs/08-ia-compartilhamento.jpg',
    short: true,
  },
]

const principais = aulas.filter((a) => !a.short)
const shorts = aulas.filter((a) => a.short)

function AulaCard({ number, title, videoId, thumb, short }) {
  const [playing, setPlaying] = useState(false)

  return (
    <article className={styles.card}>
      <div className={`${styles.media} ${short ? styles.mediaShort : ''}`}>
        {playing ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            className={styles.facade}
            onClick={() => setPlaying(true)}
            aria-label={`Assistir aula: ${title}`}
          >
            <img className={styles.thumb} src={thumb} alt={title} loading="lazy" />
            <span className={styles.playBtn}>
              <RiPlayFill size={26} />
            </span>
          </button>
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.number}>Aula {number}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
    </article>
  )
}

export default function Aulas() {
  return (
    <section className={styles.section} id="aulas">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Aulas</h2>
          <p className={styles.subtitle}>
            Passo a passo prático, direto do celular. Aprenda a estruturar a
            presença digital de uma causa do zero.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Aulas completas</h3>
          <div className={styles.gridWide}>
            {principais.map((aula) => (
              <AulaCard key={aula.number} {...aula} />
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Shorts</h3>
          <div className={styles.gridShorts}>
            {shorts.map((aula) => (
              <AulaCard key={aula.number} {...aula} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
