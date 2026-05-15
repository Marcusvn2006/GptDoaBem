import styles from './Affiliates.module.css'

const platforms = [
  { emoji: '🛍️', name: 'SHOPEE', type: 'Marketplace', benefit: 'Cupons exclusivos + comissão por indicação' },
  { emoji: '📦', name: 'MERCADO LIVRE', type: 'Marketplace', benefit: 'Links de afiliado + vouchers de frete grátis' },
  { emoji: '👗', name: 'SHEIN', type: 'Moda', benefit: 'Descontos de até 30% + comissão por venda' },
  { emoji: '📚', name: 'AMAZON', type: 'Marketplace', benefit: 'Links de afiliado Amazon Associates' },
  { emoji: '🎓', name: 'HOTMART', type: 'Produtos Digitais', benefit: 'Cursos digitais + comissões recorrentes' },
  { emoji: '🍋', name: 'KIWIFY', type: 'Produtos Digitais', benefit: 'Produtos digitais + comissões instantâneas' },
]

const levels = [
  { emoji: '🥉', level: 'BRONZE — Iniciante', platforms: '3 plataformas', commission: '5–10%', benefits: 'Cupons padrão, Certificado de Criador Solidário' },
  { emoji: '🥈', level: 'PRATA — Intermediário', platforms: '6 plataformas', commission: '10–15%', benefits: 'Cupons personalizados, Mentorias mensais, Destaque no portal' },
  { emoji: '🥇', level: 'OURO — Avançado', platforms: 'TODAS as plataformas', commission: '15–25%', benefits: 'Mentorias semanais, Campanhas institucionais, Eventos VIP' },
  { emoji: '💎', level: 'DIAMANTE — Embaixador', platforms: 'TODAS + negociação direta', commission: 'Negociada', benefits: 'Revenue share no Fundo Social, Decisões estratégicas' },
]

const cycleSteps = [
  { n: '1', text: 'CRIADOR SOLIDÁRIO gera conteúdo para ONG' },
  { n: '2', text: 'ONG ganha VISIBILIDADE e AUDIÊNCIA' },
  { n: '3', text: 'CRIADOR compartilha LINKS DE AFILIAÇÃO nos conteúdos' },
  { n: '4', text: 'SEGUIDORES compram via links → geram COMISSÃO' },
  { n: '5', text: 'PARTE DA COMISSÃO vai para o CRIADOR (renda própria)' },
  { n: '6', text: 'PARTE DA COMISSÃO é REVERTIDA para o PROJETO SOCIAL' },
  { n: '7', text: 'ONG recebe recursos + estrutura digital + sustentabilidade' },
]

export default function Affiliates() {
  return (
    <section className={styles.section} id="aceleradora">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Aceleradora de Afiliação</h2>
          <p className={styles.subtitle}>
            Gere renda real enquanto combate a insônia financeira social.
            O GPTDOABEM criou um ecossistema de monetização inteligente onde todos ganham.
          </p>
        </div>

        <div className={styles.highlight}>
          <p className={styles.highlightText}>
            🎯 "Marketing de afiliação com propósito. Cada compra, um impacto."
          </p>
        </div>

        <h3 className={styles.subheading}>Plataformas Parceiras</h3>
        <div className={styles.platformsGrid}>
          {platforms.map(({ emoji, name, type, benefit }) => (
            <div key={name} className={styles.platformCard}>
              <div className={styles.platformHeader}>
                <span className={styles.platformEmoji}>{emoji}</span>
                <div>
                  <p className={styles.platformName}>{name}</p>
                  <p className={styles.platformType}>{type}</p>
                </div>
              </div>
              <p className={styles.platformBenefit}>{benefit}</p>
            </div>
          ))}
        </div>

        <h3 className={styles.subheading}>O Ciclo Virtuoso GPTDOABEM</h3>
        <div className={styles.cycle}>
          {cycleSteps.map(({ n, text }) => (
            <div key={n} className={styles.cycleStep}>
              <span className={styles.cycleNum}>{n}</span>
              <p className={styles.cycleText}>{text}</p>
            </div>
          ))}
        </div>

        <div className={styles.commission}>
          <h3 className={styles.subheading}>Divisão Sugerida da Comissão</h3>
          <div className={styles.commissionGrid}>
            <div className={styles.commissionItem}>
              <span className={styles.commissionPct}>50%</span>
              <p className={styles.commissionDesc}>para o Criador de Conteúdo (renda própria)</p>
            </div>
            <div className={styles.commissionItem}>
              <span className={styles.commissionPct}>30%</span>
              <p className={styles.commissionDesc}>revertido para o Fundo Social GPTDOABEM</p>
            </div>
            <div className={styles.commissionItem}>
              <span className={styles.commissionPct}>20%</span>
              <p className={styles.commissionDesc}>para custos operacionais da plataforma</p>
            </div>
          </div>
        </div>

        <h3 className={styles.subheading}>Programa de Afiliados do Bem — Níveis de Criador</h3>
        <div className={styles.levelsGrid}>
          {levels.map(({ emoji, level, platforms: p, commission, benefits }) => (
            <div key={level} className={styles.levelCard}>
              <div className={styles.levelHeader}>
                <span className={styles.levelEmoji}>{emoji}</span>
                <span className={styles.levelName}>{level}</span>
              </div>
              <p className={styles.levelDetail}><strong>Plataformas:</strong> {p}</p>
              <p className={styles.levelDetail}><strong>Comissão:</strong> {commission}</p>
              <p className={styles.levelDetail}><strong>Benefícios:</strong> {benefits}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctas}>
          <a href="#cadastro" className={styles.ctaPrimary}>Quero ser Criador de Conteúdo Solidário</a>
          <a href="#contato" className={styles.ctaSecondary}>Quero Minha Empresa na Aceleradora</a>
          <a href="#contato" className={styles.ctaSecondary}>Sou ONG e Quero Monetizar Minha Audiência</a>
        </div>
      </div>
    </section>
  )
}
