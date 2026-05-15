import { useState } from 'react'
import styles from './Contact.module.css'

const partnerTypes = ['Pessoa Física', 'Empresa', 'ONG', 'Universidade']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', type: '', message: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className={styles.section} id="contato">
      <div className={`container ${styles.inner}`}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>Vamos Unir Esforços pela Sustentabilidade Digital?</h2>
          <p className={styles.desc}>
            A sua causa é combater a insônia financeira social? Então preencha o formulário ao
            lado. Entraremos em contato para encontrarmos, juntos, formas de fazer essa parceria
            acontecer. Seu apoio poderá nos ajudar a transformar mais vidas.
          </p>
          <div className={styles.contactLinks}>
            <a href="mailto:contato@gptdoabem.com" className={styles.contactLink}>📧 E-mail de contato</a>
            <a href="https://wa.me/" className={styles.contactLink}>📱 WhatsApp</a>
            <a href="#" className={styles.contactLink}>🌐 Redes sociais</a>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} id="cadastro">
          <div className={styles.field}>
            <label className={styles.label}>Nome completo</label>
            <input className={styles.input} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <input className={styles.input} type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>WhatsApp</label>
            <input className={styles.input} type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="(00) 00000-0000" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tipo de parceria desejada</label>
            <select className={styles.input} name="type" value={form.type} onChange={handleChange}>
              <option value="">Selecione...</option>
              {partnerTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Mensagem</label>
            <textarea className={`${styles.input} ${styles.textarea}`} name="message" value={form.message} onChange={handleChange} placeholder="Conte-nos sobre sua causa ou interesse..." rows={4} />
          </div>
          <button type="submit" className={styles.submitBtn}>Enviar Mensagem</button>
        </form>
      </div>
    </section>
  )
}
