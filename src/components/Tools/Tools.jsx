import styles from './Tools.module.css'

const tools = [
  { label: 'Canva', emoji: '🎨' },
  { label: 'CapCut', emoji: '✂️' },
  { label: 'ChatGPT', emoji: '🤖' },
  { label: 'Instagram', emoji: '📱' },
  { label: 'TikTok', emoji: '🎵' },
  { label: 'WhatsApp Business', emoji: '💬' },
  { label: 'Google Drive', emoji: '☁️' },
]

export default function Tools() {
  return (
    <section className={styles.section} id="ferramentas">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Ferramentas 100% Mobile</h2>
          <p className={styles.subtitle}>
            Trabalho realizado apenas com ferramentas acessíveis pelo celular.
            Acessível. Democrático. Replicável. Qualquer pessoa pode fazer.
          </p>
        </div>

        <div className={styles.tools}>
          {tools.map(({ label, emoji }) => (
            <div key={label} className={styles.tool}>
              <span className={styles.toolEmoji}>{emoji}</span>
              <span className={styles.toolLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
