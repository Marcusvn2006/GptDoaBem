const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak,
  ImageRun, ExternalHyperlink
} = require('docx');

// ============================================================
// PALETA OFICIAL — derivada da print
// ============================================================
const C = {
  bgDark:     '0E0E11',   // fundo página dark
  cardDark:   '131316',   // fundo de cards
  textLight:  'FFFFFF',
  textMuted:  'CAC3D9',   // lavanda suave para subtítulos / corpo secundário
  accent:     '6D3DF5',   // roxo vibrante — accent principal
  accentSoft: 'CBBEFF',   // lilás médio — variação
  accentTag:  'E9E0FF',   // lilás claro — tags / badges
  divider:    'E4E1E6',   // separadores
  green:      '4ADE80',   // verde para destaques (+150 ONGs)
};

// ============================================================
// HELPERS
// ============================================================
const FONT = 'Arial';

// Texto branco padrão
const T = (text, opts = {}) => new TextRun({
  text,
  font: FONT,
  color: opts.color ?? C.textLight,
  bold: opts.bold ?? false,
  italics: opts.italics ?? false,
  size: opts.size ?? 22,           // 11pt default
});

// Parágrafo padrão (texto corpo)
const P = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  spacing: { before: opts.before ?? 60, after: opts.after ?? 60, line: 300 },
  indent: opts.indent,
  children: Array.isArray(text)
    ? text
    : [T(text, opts)],
});

// Parágrafo vazio (espaçamento)
const Empty = (size = 120) => new Paragraph({
  spacing: { before: 0, after: size },
  children: [new TextRun({ text: '', font: FONT })],
});

// Título grande de seção (hero / section title)
const H1 = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  spacing: { before: 400, after: 240, line: 320 },
  children: [new TextRun({
    text, font: FONT, color: C.textLight, bold: true,
    size: opts.size ?? 56,         // 28pt
  })],
});

// Título médio de seção
const H2 = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  spacing: { before: 320, after: 180, line: 320 },
  children: [new TextRun({
    text, font: FONT, color: opts.color ?? C.textLight, bold: true,
    size: opts.size ?? 40,         // 20pt
  })],
});

// Subtítulo (cor lavanda suave, normal weight)
const Sub = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  spacing: { before: 80, after: 160, line: 300 },
  children: [new TextRun({
    text, font: FONT, color: C.textMuted, size: 22,
  })],
});

// Eyebrow / tag (small, purple, uppercase-ish)
const Eyebrow = (text) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 200, after: 80 },
  children: [new TextRun({
    text, font: FONT, color: C.accent, bold: true, size: 18, // 9pt
    characterSpacing: 40,
  })],
});

// Bullet item (•) com indentação manual (não usar lista nativa para manter cor controlada)
const Bullet = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 40, after: 40, line: 280 },
  indent: { left: 360, hanging: 240 },
  children: [
    new TextRun({ text: '•  ', font: FONT, color: C.accent, bold: true, size: 22 }),
    new TextRun({ text, font: FONT, color: C.textLight, size: 22 }),
  ],
});

// Card (tabela 1x1 com shading escuro e borda accent sutil)
const Card = (children, opts = {}) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [9360],
  borders: {
    top:    { style: BorderStyle.SINGLE, size: 4, color: opts.border ?? C.accent },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: opts.border ?? C.accent },
    left:   { style: BorderStyle.SINGLE, size: 4, color: opts.border ?? C.accent },
    right:  { style: BorderStyle.SINGLE, size: 4, color: opts.border ?? C.accent },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideVertical:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
  },
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA },
      shading: { fill: opts.fill ?? C.cardDark, type: ShadingType.CLEAR, color: 'auto' },
      margins: { top: 240, bottom: 240, left: 320, right: 320 },
      children,
    })],
  })],
});

// Grid de 2 colunas (cards lado a lado)
const Grid2 = (left, right) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [4560, 4560],
  borders: {
    top:    { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right:  { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideVertical:   { style: BorderStyle.SINGLE, size: 8, color: C.bgDark },
  },
  rows: [new TableRow({
    children: [
      new TableCell({
        width: { size: 4560, type: WidthType.DXA },
        shading: { fill: C.cardDark, type: ShadingType.CLEAR, color: 'auto' },
        margins: { top: 200, bottom: 200, left: 240, right: 240 },
        children: left,
      }),
      new TableCell({
        width: { size: 4560, type: WidthType.DXA },
        shading: { fill: C.cardDark, type: ShadingType.CLEAR, color: 'auto' },
        margins: { top: 200, bottom: 200, left: 240, right: 240 },
        children: right,
      }),
    ],
  })],
});

// Grid de 3 colunas
const Grid3 = (a, b, c) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3000, 3000, 3360],
  borders: {
    top:    { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right:  { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideVertical:   { style: BorderStyle.SINGLE, size: 8, color: C.bgDark },
  },
  rows: [new TableRow({
    children: [a, b, c].map((items, i) => new TableCell({
      width: { size: i === 2 ? 3360 : 3000, type: WidthType.DXA },
      shading: { fill: C.cardDark, type: ShadingType.CLEAR, color: 'auto' },
      margins: { top: 200, bottom: 200, left: 200, right: 200 },
      children: items,
    })),
  })],
});

// Card numerado (para jornada de 6 fases) — número grande roxo no topo
const NumberedCard = (n, title, body) => [
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [new TextRun({
      text: String(n).padStart(2, '0'),
      font: FONT, color: C.accent, bold: true, size: 56,
    })],
  }),
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [new TextRun({
      text: title, font: FONT, color: C.textLight, bold: true, size: 24,
    })],
  }),
  new Paragraph({
    spacing: { before: 0, after: 40, line: 280 },
    children: [new TextRun({
      text: body, font: FONT, color: C.textMuted, size: 20,
    })],
  }),
];

// Card de estatística grande (+500 PROJETOS IMPACTADOS)
const StatCard = (number, label, color = C.accent) => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 80 },
    children: [new TextRun({
      text: number, font: FONT, color, bold: true, size: 80, // 40pt
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 100 },
    children: [new TextRun({
      text: label, font: FONT, color: C.textMuted, bold: true, size: 18,
      characterSpacing: 30,
    })],
  }),
];

// Tabela de dados (para Aceleradora de Afiliação — plataformas, ferramentas etc.)
const DataTable = (headers, rows) => {
  const colCount = headers.length;
  const colW = Math.floor(9360 / colCount);
  const widths = Array(colCount).fill(colW);
  widths[colCount - 1] = 9360 - colW * (colCount - 1);

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      left:   { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      right:  { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: '2A2A30' },
      insideVertical:   { style: BorderStyle.SINGLE, size: 2, color: '2A2A30' },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: { fill: C.accent, type: ShadingType.CLEAR, color: 'auto' },
          margins: { top: 120, bottom: 120, left: 160, right: 160 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [new TextRun({
              text: h, font: FONT, color: C.textLight, bold: true, size: 20,
            })],
          })],
        })),
      }),
      ...rows.map((row, ridx) => new TableRow({
        children: row.map((cell, i) => new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: {
            fill: ridx % 2 === 0 ? C.cardDark : '1A1A1F',
            type: ShadingType.CLEAR, color: 'auto'
          },
          margins: { top: 100, bottom: 100, left: 160, right: 160 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { line: 260 },
            children: [new TextRun({
              text: cell, font: FONT, color: C.textLight, size: 20,
            })],
          })],
        })),
      })),
    ],
  });
};

// Divider horizontal (linha fina accent)
const Divider = () => new Paragraph({
  spacing: { before: 200, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.accent, space: 1 } },
  children: [new TextRun({ text: '', font: FONT })],
});

// CTA Button (texto centralizado com fundo roxo, em tabela)
const CTAButton = (text) => new Table({
  width: { size: 4400, type: WidthType.DXA },
  columnWidths: [4400],
  borders: {
    top:    { style: BorderStyle.SINGLE, size: 4, color: C.accent },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent },
    left:   { style: BorderStyle.SINGLE, size: 4, color: C.accent },
    right:  { style: BorderStyle.SINGLE, size: 4, color: C.accent },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideVertical:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
  },
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: 4400, type: WidthType.DXA },
      shading: { fill: C.accent, type: ShadingType.CLEAR, color: 'auto' },
      margins: { top: 140, bottom: 140, left: 200, right: 200 },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text, font: FONT, color: C.textLight, bold: true, size: 22,
          characterSpacing: 20,
        })],
      })],
    })],
  })],
});

// Video Card (thumbnail + título + badge + link)
const THUMBS_DIR = 'C:\\Temp-code\\GptDoaBem\\thumbs';
const videoCard = (file, title, isShort, url) => {
  const thumbPath = `${THUMBS_DIR}\\${file}.jpg`;
  const imgBuf = fs.readFileSync(thumbPath);
  const badgeColor = isShort ? C.accentSoft : C.accent;
  const badgeText = isShort ? '◉  SHORT' : '▶  VÍDEO';

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      left:   { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      right:  { style: BorderStyle.SINGLE, size: 4, color: C.accent },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      insideVertical:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
    },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: C.cardDark, type: ShadingType.CLEAR, color: 'auto' },
        margins: { top: 240, bottom: 280, left: 320, right: 320 },
        children: [
          // Thumbnail (centralizada, 520 x 293 px = 16:9)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            children: [new ImageRun({
              type: 'jpg',
              data: imgBuf,
              transformation: { width: 520, height: 293 },
              altText: { title: title, description: title, name: file },
            })],
          }),
          // Badge tipo
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 0, after: 80 },
            children: [new TextRun({
              text: badgeText, font: FONT, color: badgeColor, bold: true, size: 18,
              characterSpacing: 40,
            })],
          }),
          // Título
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 0, after: 140, line: 300 },
            children: [new TextRun({
              text: title, font: FONT, color: C.textLight, bold: true, size: 28,
            })],
          }),
          // Link
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 0, after: 0 },
            children: [
              new TextRun({ text: '🔗  ', font: FONT, color: C.accent, size: 20 }),
              new ExternalHyperlink({
                link: url,
                children: [new TextRun({
                  text: 'Assistir no YouTube',
                  font: FONT, color: C.accent, bold: true, size: 20,
                  underline: { type: 'single', color: C.accent },
                })],
              }),
              new TextRun({ text: '    ·    ', font: FONT, color: C.textMuted, size: 20 }),
              new TextRun({ text: url, font: FONT, color: C.textMuted, size: 18 }),
            ],
          }),
        ],
      })],
    })],
  });
};

// ============================================================
// CONTEÚDO — 18 SEÇÕES
// ============================================================
const content = [];

// ---------- TOPO / NAV ----------
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: 'GPTDOABEM', font: FONT, color: C.textLight, bold: true, size: 28,
    characterSpacing: 40,
  })],
}));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 0, after: 200 },
  children: [new TextRun({
    text: 'Problem  ·  Solution  ·  Hub  ·  Accelerator  ·  Support',
    font: FONT, color: C.textMuted, size: 18,
  })],
}));
content.push(Divider());

// ============================================================
// SEÇÃO 1 — HERO / BANNER
// ============================================================
content.push(Eyebrow('SEÇÃO 1 — HERO / BANNER PRINCIPAL'));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '💜 ', font: FONT, size: 32 }),
    new TextRun({
      text: 'GPTDOABEM', font: FONT, color: C.textLight, bold: true, size: 64,
    }),
  ],
}));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: 'Programa Presença Digital Solidária',
    font: FONT, color: C.accent, bold: true, size: 36,
  })],
}));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 0, after: 240 },
  children: [
    new TextRun({
      text: 'Voluntariado Atuante para Combater a Insônia Financeira ',
      font: FONT, color: C.textLight, size: 28,
    }),
    new TextRun({ text: '🌙', font: FONT, size: 28 }),
  ],
}));

content.push(Card([
  P([new TextRun({
    text: '"Milhares de projetos sociais no Brasil sofrem com falta de previsibilidade financeira, baixa presença digital e captação desestruturada. Isso gera INSÔNIA FINANCEIRA institucional."',
    font: FONT, color: C.textLight, italics: true, size: 24,
  })]),
  Empty(80),
  P([new TextRun({
    text: '"Nós formamos criadores de conteúdo solidário para estruturar a presença digital de ONGs, gerando previsibilidade, profissionalização e sustentabilidade."',
    font: FONT, color: C.textMuted, italics: true, size: 22,
  })]),
]));

content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 0, after: 200 },
  children: [
    new TextRun({ text: '🎯  ', font: FONT, size: 24 }),
    new TextRun({
      text: 'Junte-se ao movimento que transforma invisibilidade em estabilidade.',
      font: FONT, color: C.textLight, bold: true, size: 24,
    }),
  ],
}));

content.push(CTAButton('➤ QUERO SER CRIADOR DE CONTEÚDO SOLIDÁRIO'));
content.push(Empty(80));
content.push(CTAButton('➤ QUERO APOIAR COMO EMPRESA PARCEIRA'));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 2 — O PROBLEMA
// ============================================================
content.push(Eyebrow('SEÇÃO 2 — O PROBLEMA (A INSÔNIA FINANCEIRA)'));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🚨  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'O DESAFIO SOCIAL', font: FONT, color: C.textLight, bold: true, size: 48,
    }),
  ],
}));
content.push(Sub('Milhares de ONGs, abrigos, casas de apoio e projetos do terceiro setor sofrem com:'));

content.push(Card([
  P([
    new TextRun({ text: '🌙  ', font: FONT, size: 24 }),
    new TextRun({ text: 'Falta de previsibilidade financeira', font: FONT, color: C.accentSoft, bold: true, size: 22 }),
    new TextRun({ text: ' — Nunca sabem se terão recursos no mês seguinte', font: FONT, color: C.textLight, size: 22 }),
  ]),
  P([
    new TextRun({ text: '📱  ', font: FONT, size: 24 }),
    new TextRun({ text: 'Baixa presença digital', font: FONT, color: C.accentSoft, bold: true, size: 22 }),
    new TextRun({ text: ' — São invisíveis para quem poderia ajudar', font: FONT, color: C.textLight, size: 22 }),
  ]),
  P([
    new TextRun({ text: '📉  ', font: FONT, size: 24 }),
    new TextRun({ text: 'Captação desorganizada', font: FONT, color: C.accentSoft, bold: true, size: 22 }),
    new TextRun({ text: ' — Dependem de doações esporádicas e da sorte', font: FONT, color: C.textLight, size: 22 }),
  ]),
  P([
    new TextRun({ text: '🏚️  ', font: FONT, size: 24 }),
    new TextRun({ text: 'Ausência de estrutura digital', font: FONT, color: C.accentSoft, bold: true, size: 22 }),
    new TextRun({ text: ' — Não sabem como se comunicar estrategicamente', font: FONT, color: C.textLight, size: 22 }),
  ]),
]));

content.push(Empty(160));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '💔  ', font: FONT, size: 32 }),
    new TextRun({
      text: 'Resultado: INSÔNIA FINANCEIRA INSTITUCIONAL',
      font: FONT, color: C.accent, bold: true, size: 36,
    }),
  ],
}));
content.push(P('A insegurança constante que impede projetos sociais de dormirem tranquilos, porque não sabem se amanhã terão condições de continuar transformando vidas.', { color: C.textMuted }));

content.push(Empty(120));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [new TextRun({
    text: '🔄  A Cadeia do Problema',
    font: FONT, color: C.accent, bold: true, size: 24,
  })],
}));
content.push(P('Ausência de presença digital  →  Invisibilidade  →  Escassez  →  Insônia financeira',
  { bold: true, size: 22 }));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 3 — NOSSA SOLUÇÃO
// ============================================================
content.push(Eyebrow('SEÇÃO 3 — NOSSA SOLUÇÃO (O GPTDOABEM)'));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '💜  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'GPTDOABEM — Programa Presença Digital Solidária',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(Sub('Um hub de formação prática onde:'));

content.push(Card([
  Bullet('Iniciantes aprendem Presença Digital e Canal Dark Solidário'),
  Bullet('Aplicam diretamente em projetos sociais reais (hospitais, abrigos, ONGs)'),
  Bullet('Empresas patrocinam turmas e fortalecem sua agenda ESG'),
  Bullet('ONGs recebem estrutura digital gratuita e profissional'),
  Bullet('Voluntários desenvolvem habilidades monetizáveis e portfólio real'),
]));

content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🎯  ', font: FONT, size: 28 }),
    new TextRun({
      text: 'Modelo inteligente. Sustentável. Replicável. 100% mobile.',
      font: FONT, color: C.accent, bold: true, italics: true, size: 28,
    }),
  ],
}));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 4 — HUB DE FORMAÇÃO (6 FASES)
// ============================================================
content.push(Eyebrow('SEÇÃO 4 — HUB DE FORMAÇÃO DE CRIADORES (UGC)'));
content.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🎓  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'HUB DE CRIADORES DE CONTEÚDO SOLIDÁRIO',
      font: FONT, color: C.textLight, bold: true, size: 40,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: 'Torne-se um Agente de Sustentabilidade Digital',
    font: FONT, color: C.accent, bold: true, size: 28,
  })],
}));
content.push(Sub('Nosso programa forma criadores de conteúdo em 6 fases pedagógicas, todas executáveis 100% pelo celular:'));
content.push(Empty(120));

// FASE 1
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '01  ', font: FONT, color: C.accent, bold: true, size: 48 }),
      new TextRun({ text: '📚  FUNDAMENTOS', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [new TextRun({
      text: 'Mentalidade + Estrutura',
      font: FONT, color: C.accentTag, italics: true, size: 22,
    })],
  }),
  Bullet('O que é presença digital e canal dark'),
  Bullet('O que é autoridade digital e insônia financeira'),
  Bullet('Como escolher nicho social e mapear causa/público'),
  Bullet('O papel do voluntário atuante'),
]));
content.push(Empty(120));

// FASE 2
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '02  ', font: FONT, color: C.accent, bold: true, size: 48 }),
      new TextRun({ text: '📱  ESTRUTURAÇÃO MOBILE', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  Bullet('Instagram Profissional • TikTok • Fanpage • YouTube Shorts'),
  Bullet('Google Meu Negócio • LinkedIn • WhatsApp Business • Linktree'),
  new Paragraph({
    spacing: { before: 80, after: 0 },
    children: [
      new TextRun({ text: 'Foco: ', font: FONT, color: C.accent, bold: true, size: 22 }),
      new TextRun({ text: 'captação de doadores, voluntários e prestação de contas',
        font: FONT, color: C.textLight, size: 22 }),
    ],
  }),
]));
content.push(Empty(120));

// FASE 3
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '03  ', font: FONT, color: C.accent, bold: true, size: 48 }),
      new TextRun({ text: '🎨  IDENTIDADE VISUAL SOLIDÁRIA', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  Bullet('Criação de logo no Canva • Definição de cores institucionais'),
  Bullet('Padrão de post • Capas e destaques'),
  new Paragraph({
    spacing: { before: 80, after: 0 },
    children: [
      new TextRun({ text: 'Meta: ', font: FONT, color: C.accent, bold: true, size: 22 }),
      new TextRun({ text: 'profissionalizar a imagem da ONG', font: FONT, color: C.textLight, size: 22 }),
    ],
  }),
]));
content.push(Empty(120));

// FASE 4
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '04  ', font: FONT, color: C.accent, bold: true, size: 48 }),
      new TextRun({ text: '🎬  PRODUÇÃO DE CONTEÚDO SOCIAL', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [new TextRun({
      text: 'Módulo Central',
      font: FONT, color: C.accentTag, italics: true, size: 22,
    })],
  }),
  Bullet('Storytelling com impacto real • Prova social • Demonstração de resultados'),
  Bullet('Vídeos emocionais de até 60 segundos'),
  Bullet('Estrutura: Problema → Impacto → História real → Chamada para ação'),
]));
content.push(Empty(120));

// FASE 5
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '05  ', font: FONT, color: C.accent, bold: true, size: 48 }),
      new TextRun({ text: '🔄  FUNIL SOLIDÁRIO SIMPLES', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  Bullet('Estrutura: Conteúdo → Link → WhatsApp → Apoio'),
  Bullet('Organização de links de doação e voluntariado'),
  Bullet('Mensagens automáticas • Estrutura de campanhas'),
  new Paragraph({
    spacing: { before: 80, after: 0 },
    children: [
      new TextRun({ text: 'Objetivo: ', font: FONT, color: C.accent, bold: true, size: 22 }),
      new TextRun({ text: 'criar previsibilidade de apoio', font: FONT, color: C.textLight, size: 22 }),
    ],
  }),
]));
content.push(Empty(120));

// FASE 6
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '06  ', font: FONT, color: C.accent, bold: true, size: 48 }),
      new TextRun({ text: '📊  GESTÃO E CONTINUIDADE', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  Bullet('Frequência estratégica • Calendário de conteúdo'),
  Bullet('Divisão de funções • Indicadores de crescimento'),
]));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 4B — AULAS REALIZADAS (BIBLIOTECA DE VÍDEOS)
// ============================================================
content.push(Eyebrow('AULAS REALIZADAS — BIBLIOTECA DE VÍDEOS'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🎬  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'BIBLIOTECA DE AULAS',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: 'Conteúdo de Formação 100% Mobile',
    font: FONT, color: C.accent, bold: true, size: 28,
  })],
}));
content.push(Sub('Aulas práticas em vídeo para estruturar a presença digital de qualquer ONG ou projeto social. Todas executáveis pelo celular, com passo a passo aplicável imediatamente.'));
content.push(Empty(180));

// AULA 1 — Instagram (vídeo)
content.push(videoCard(
  '01-instagram',
  'Aula 1 — Como criar conta Dark para Instagram',
  false,
  'https://www.youtube.com/watch?v=urbH49Sa11U'
));
content.push(Empty(140));

// AULA 2 — Facebook (short)
content.push(videoCard(
  '02-facebook',
  'Aula 2 — Como criar conta Dark para Facebook',
  true,
  'https://youtube.com/shorts/z6EAiicttV0'
));
content.push(Empty(140));

// AULA 3 — YouTube (vídeo)
content.push(videoCard(
  '03-youtube',
  'Aula 3 — Como criar conta Dark para YouTube',
  false,
  'https://www.youtube.com/watch?v=uhn29kt8kCI'
));
content.push(Empty(140));

// AULA 4 — LinkedIn (short)
content.push(videoCard(
  '04-linkedin',
  'Aula 4 — Como criar conta Dark para LinkedIn',
  true,
  'https://youtube.com/shorts/421gy5M3AyI'
));
content.push(Empty(140));

// AULA 5 — LinkTree (short)
content.push(videoCard(
  '05-linktree',
  'Aula 5 — Como criar conta Dark para LinkTree',
  true,
  'https://youtube.com/shorts/dCHIWjtkjw0'
));
content.push(Empty(140));

// AULA 6 — IA conteúdo (short)
content.push(videoCard(
  '06-ia-conteudo',
  'Aula 6 — Como criar conteúdo gratuitamente com IA',
  true,
  'https://youtube.com/shorts/vma7xNCbLs0'
));
content.push(Empty(140));

// AULA 7 — IA postagem (short)
content.push(videoCard(
  '07-ia-postagem',
  'Aula 7 — Estratégia de postagem com IA',
  true,
  'https://youtube.com/shorts/lVqbhjEG3uk'
));
content.push(Empty(140));

// AULA 8 — IA compartilhamento (short)
content.push(videoCard(
  '08-ia-compartilhamento',
  'Aula 8 — Estratégia de compartilhamento com IA',
  true,
  'https://youtube.com/shorts/cC2qcB1Vnrs'
));

content.push(Empty(200));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '💜  ', font: FONT, size: 24 }),
    new TextRun({
      text: 'Novas aulas são adicionadas continuamente. Acompanhe nosso canal.',
      font: FONT, color: C.accentSoft, italics: true, bold: true, size: 22,
    }),
  ],
}));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 5 — LABORATÓRIO SOCIAL
// ============================================================
content.push(Eyebrow('SEÇÃO 5 — O LABORATÓRIO SOCIAL (PROJETOS REAIS)'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🏥  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'LABORATÓRIO SOCIAL',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 120 },
  children: [new TextRun({
    text: 'O Diferencial do Programa',
    font: FONT, color: C.accent, bold: true, size: 28,
  })],
}));
content.push(Sub('Os alunos executam em projetos reais:'));
content.push(Card([
  P([new TextRun({
    text: '🏥 Hospitais   •   🏠 Casas de apoio   •   🏚️ Abrigos   •   💚 ONGs   •   🤝 Projetos do 3º setor',
    font: FONT, color: C.textLight, bold: true, size: 24,
  })]),
]));

content.push(Empty(160));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [new TextRun({
    text: 'Resultados gerados',
    font: FONT, color: C.accent, bold: true, size: 26,
  })],
}));
content.push(Card([
  Bullet('Portfólio real de impacto'),
  Bullet('Impacto mensurável com relatórios'),
  Bullet('Crescimento institucional das ONGs atendidas'),
  Bullet('Relatórios para patrocinadores'),
]));
content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 80 },
  children: [new TextRun({
    text: 'Aqui o voluntariado se torna transformação concreta.',
    font: FONT, color: C.accentSoft, italics: true, bold: true, size: 26,
  })],
}));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 6 — FERRAMENTAS 100% MOBILE
// ============================================================
content.push(Eyebrow('SEÇÃO 6 — FERRAMENTAS 100% MOBILE'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🛠️  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'FERRAMENTAS 100% MOBILE',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(Sub('Trabalho realizado apenas com:'));
content.push(Card([
  P([new TextRun({
    text: '🎨 Canva   •   ✂️ CapCut   •   🤖 ChatGPT   •   📱 Instagram   •   🎵 TikTok   •   💬 WhatsApp Business   •   ☁️ Google Drive',
    font: FONT, color: C.textLight, bold: true, size: 24,
  })]),
]));
content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 80 },
  children: [new TextRun({
    text: 'Acessível.  Democrático.  Replicável.  Qualquer pessoa pode fazer.',
    font: FONT, color: C.accent, bold: true, size: 26,
  })],
}));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 7 — COMO APOIAR
// ============================================================
content.push(Eyebrow('SEÇÃO 7 — COMO APOIAR (MODELO DE PARCERIA)'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🤝  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'JUNTE-SE A NÓS',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 120 },
  children: [new TextRun({
    text: 'Como apoiar o GPTDOABEM',
    font: FONT, color: C.accent, bold: true, size: 28,
  })],
}));
content.push(P('Acreditamos que a presença digital é a ferramenta mais estratégica e transformadora que se pode oferecer a um projeto social, pois é por meio dela que cada ONG tem a oportunidade de desenvolver plenamente seu potencial de captação e sustentabilidade.', { color: C.textMuted }));
content.push(P('Concretizamos essa missão por meio de parceiros que compartilham da mesma visão:', { color: C.textMuted }));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '👤  ', font: FONT, size: 32 }),
      new TextRun({ text: 'PESSOAS FÍSICAS', font: FONT, color: C.accent, bold: true, size: 28 }),
    ],
  }),
  P('Que acreditam profundamente nessa causa e escolhem investir na transformação pela presença digital solidária.', { color: C.textLight }),
]));
content.push(Empty(120));
content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '🏢  ', font: FONT, size: 32 }),
      new TextRun({ text: 'EMPRESAS', font: FONT, color: C.accent, bold: true, size: 28 }),
    ],
  }),
  P('Que reconhecem a importância de priorizar o impacto social como um dos principais pilares de sua atuação, incorporando-o em suas estratégias de ESG (Ambiental, Social e Governança).', { color: C.textLight }),
]));

content.push(Empty(160));
content.push(P('Nossos projetos são viabilizados por parcerias com o setor privado, doações de empresas, doações de pessoas físicas e patrocínio de turmas.'));
content.push(Empty(120));
content.push(Card([
  P([
    new TextRun({ text: '🌱  ', font: FONT, size: 24 }),
    new TextRun({
      text: 'O Brasil foi o país latino-americano que mais buscou pelo termo ESG no Google em 2024. ',
      font: FONT, color: C.textLight, bold: true, size: 22,
    }),
    new TextRun({
      text: 'Abraçar o nosso trabalho é abraçar a causa da sustentabilidade digital e deixar uma marca positiva na sociedade. Vamos juntos?',
      font: FONT, color: C.textMuted, size: 22,
    }),
  ]),
], { border: C.accentSoft }));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 8 — ACELERADORA DE AFILIAÇÃO
// ============================================================
content.push(Eyebrow('SEÇÃO 8 — ACELERADORA DE AFILIAÇÃO GPTDOABEM'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🚀  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'ACELERADORA DE AFILIAÇÃO',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 160 },
  children: [new TextRun({
    text: 'Gere renda real enquanto combate a insônia financeira social',
    font: FONT, color: C.accent, bold: true, italics: true, size: 26,
  })],
}));

content.push(Card([
  P([
    new TextRun({ text: '💡  ', font: FONT, size: 24 }),
    new TextRun({
      text: 'O GPTDOABEM não depende apenas de doações. ',
      font: FONT, color: C.accent, bold: true, size: 24,
    }),
    new TextRun({
      text: 'Criamos um ecossistema de monetização inteligente onde:',
      font: FONT, color: C.textLight, size: 24,
    }),
  ]),
  Empty(80),
  Bullet('Voluntários e criadores de conteúdo geram renda via comissões'),
  Bullet('Empresas parceiras oferecem cupons, vouchers e descontos exclusivos'),
  Bullet('Parte de toda renda gerada é revertida para projetos sociais'),
  Bullet('ONGs atendidas também podem monetizar suas audiências'),
  Bullet('Patrocinadores fortalecem ESG com métricas concretas de impacto'),
]));

content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🎯  ', font: FONT, size: 28 }),
    new TextRun({
      text: '"Marketing de afiliação com propósito. Cada compra, um impacto."',
      font: FONT, color: C.accent, italics: true, bold: true, size: 26,
    }),
  ],
}));

content.push(Empty(200));

// ---- Plataformas Parceiras ----
content.push(H2('🛒  Plataformas Parceiras — Hub de Marketplaces'));
content.push(P('Conectamos criadores de conteúdo solidário às maiores plataformas de marketplace e produtos digitais do Brasil:', { color: C.textMuted }));
content.push(Empty(120));

content.push(DataTable(
  ['PLATAFORMA', 'TIPO', 'BENEFÍCIO'],
  [
    ['🛍️  SHOPEE', 'Marketplace', 'Cupons exclusivos + comissão por indicação'],
    ['📦  MERCADO LIVRE', 'Marketplace', 'Links de afiliado + vouchers de frete grátis'],
    ['👗  SHEIN', 'Moda', 'Descontos de até 30% + comissão por venda'],
    ['📚  AMAZON', 'Marketplace', 'Links de afiliado Amazon Associates'],
    ['🎓  HOTMART', 'Produtos Digitais', 'Cursos digitais + comissões recorrentes'],
    ['🍋  KIWIFY', 'Produtos Digitais', 'Produtos digitais + comissões instantâneas'],
    ['👟  NETSHOES', 'Esporte', 'Cupons de desconto + comissão por venda'],
    ['🔗  AWIN', 'Rede Global', 'Rede global de afiliados + marcas premium'],
  ]
));
content.push(Empty(140));
content.push(P([
  new TextRun({ text: '💜  ', font: FONT, size: 22 }),
  new TextRun({
    text: 'Cada plataforma oferece ferramentas de rastreamento, relatórios de conversão e pagamento automático de comissões.',
    font: FONT, color: C.textMuted, italics: true, size: 22,
  }),
]));

// ---- Modelo de Monetização ----
content.push(Empty(240));
content.push(H2('💰  Modelo de Monetização — Como Funciona'));
content.push(new Paragraph({
  spacing: { before: 0, after: 120 },
  children: [new TextRun({
    text: '🔄  O CICLO VIRTUOSO GPTDOABEM',
    font: FONT, color: C.accent, bold: true, size: 24,
  })],
}));

content.push(Card([
  P([new TextRun({ text: '1   CRIADOR SOLIDÁRIO gera conteúdo para ONG', font: FONT, color: C.textLight, bold: true, size: 22 })]),
  P([new TextRun({ text: '          ↓', font: FONT, color: C.accent, size: 22 })]),
  P([new TextRun({ text: '2   ONG ganha VISIBILIDADE e AUDIÊNCIA', font: FONT, color: C.textLight, bold: true, size: 22 })]),
  P([new TextRun({ text: '          ↓', font: FONT, color: C.accent, size: 22 })]),
  P([new TextRun({ text: '3   CRIADOR compartilha LINKS DE AFILIAÇÃO nos conteúdos', font: FONT, color: C.textLight, bold: true, size: 22 })]),
  P([new TextRun({ text: '          ↓', font: FONT, color: C.accent, size: 22 })]),
  P([new TextRun({ text: '4   SEGUIDORES compram via links → geram COMISSÃO', font: FONT, color: C.textLight, bold: true, size: 22 })]),
  P([new TextRun({ text: '          ↓', font: FONT, color: C.accent, size: 22 })]),
  P([new TextRun({ text: '5   PARTE DA COMISSÃO vai para o CRIADOR (renda própria)', font: FONT, color: C.textLight, bold: true, size: 22 })]),
  P([new TextRun({ text: '          ↓', font: FONT, color: C.accent, size: 22 })]),
  P([new TextRun({ text: '6   PARTE DA COMISSÃO é REVERTIDA para o PROJETO SOCIAL', font: FONT, color: C.textLight, bold: true, size: 22 })]),
  P([new TextRun({ text: '          ↓', font: FONT, color: C.accent, size: 22 })]),
  P([new TextRun({ text: '7   ONG recebe recursos + estrutura digital + sustentabilidade', font: FONT, color: C.textLight, bold: true, size: 22 })]),
]));

content.push(Empty(160));
content.push(new Paragraph({
  spacing: { before: 80, after: 80 },
  children: [new TextRun({
    text: '📊  DIVISÃO SUGERIDA DA COMISSÃO',
    font: FONT, color: C.accent, bold: true, size: 24,
  })],
}));
content.push(Card([
  P([
    new TextRun({ text: '50% ', font: FONT, color: C.accent, bold: true, size: 28 }),
    new TextRun({ text: 'para o Criador de Conteúdo (renda própria)', font: FONT, color: C.textLight, size: 24 }),
  ]),
  P([
    new TextRun({ text: '30% ', font: FONT, color: C.accent, bold: true, size: 28 }),
    new TextRun({ text: 'revertido para o Fundo Social GPTDOABEM', font: FONT, color: C.textLight, size: 24 }),
  ]),
  P([
    new TextRun({ text: '20% ', font: FONT, color: C.accent, bold: true, size: 28 }),
    new TextRun({ text: 'para custos operacionais da plataforma', font: FONT, color: C.textLight, size: 24 }),
  ]),
]));
content.push(Empty(140));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 80, after: 80 },
  children: [new TextRun({
    text: '🎯  "Você ganha. A ONG ganha. O projeto social ganha. Todo mundo ganha."',
    font: FONT, color: C.accentSoft, italics: true, bold: true, size: 24,
  })],
}));

// ---- Ferramentas de Conversão ----
content.push(Empty(240));
content.push(H2('🎁  Ferramentas de Conversão — Cupons, Vouchers & Descontos'));
content.push(P('Oferecemos aos criadores e ONGs um arsenal de ferramentas para maximizar conversão e gerar renda:', { color: C.textMuted }));
content.push(Empty(120));
content.push(DataTable(
  ['FERRAMENTA', 'DESCRIÇÃO'],
  [
    ['🎟️  Cupons Exclusivos GPTDOABEM', 'Códigos personalizados (ex: GPTDOABEM10, SOLIDARIO15), rastreáveis por afiliado'],
    ['💳  Vouchers Solidários', 'Frete grátis (Mercado Livre, Shopee), primeira compra (Shein, Amazon), cashback'],
    ['📉  Descontos Especiais', 'Até 30% em produtos selecionados, Flash Sales, Black Friday Solidária'],
    ['🔗  Links Inteligentes', 'Links encurtados, QR Codes, Bio links (Linktree) com múltiplas ofertas'],
    ['📱  Campanhas Sazonais', 'Dia das Mães Solidário, Dia das Crianças com Impacto, Natal de Doação Automática'],
  ]
));

// ---- Programa de Afiliados ----
content.push(Empty(240));
content.push(H2('🏆  Programa de Afiliados do Bem — Níveis de Criador'));
content.push(P('Suba de nível conforme seu impacto e geração de renda:', { color: C.textMuted }));
content.push(Empty(120));
content.push(DataTable(
  ['NÍVEL', 'PLATAFORMAS', 'COMISSÃO', 'BENEFÍCIOS'],
  [
    ['🥉  BRONZE — Iniciante', '3 plataformas', '5–10%', 'Cupons padrão, Certificado de Criador Solidário'],
    ['🥈  PRATA — Intermediário', '6 plataformas', '10–15%', 'Cupons personalizados, Mentorias mensais, Destaque no portal'],
    ['🥇  OURO — Avançado', 'TODAS as plataformas', '15–25%', 'Mentorias semanais, Campanhas institucionais, Eventos VIP'],
    ['💎  DIAMANTE — Embaixador', 'TODAS + negociação direta', 'Negociada', 'Revenue share no Fundo Social, Decisões estratégicas'],
  ]
));

// ---- Dashboard de Impacto ----
content.push(Empty(240));
content.push(H2('📊  Dashboard de Impacto — Métricas Transparentes'));
content.push(P('Todo criador e patrocinador tem acesso a um painel em tempo real:', { color: C.textMuted }));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '📈  ', font: FONT, size: 28 }),
      new TextRun({ text: 'Métricas Individuais (Criador)', font: FONT, color: C.accent, bold: true, size: 26 }),
    ],
  }),
  Bullet('Cliques nos links de afiliado'),
  Bullet('Conversões e vendas realizadas'),
  Bullet('Comissão total gerada / recebida'),
  Bullet('Comissão revertida para projetos sociais'),
  Bullet('Ranking entre criadores'),
]));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '💚  ', font: FONT, size: 28 }),
      new TextRun({ text: 'Métricas Sociais (Projeto)', font: FONT, color: C.accent, bold: true, size: 26 }),
    ],
  }),
  Bullet('Total arrecadado no Fundo Social GPTDOABEM'),
  Bullet('ONGs beneficiadas com recursos'),
  Bullet('Projetos sociais atendidos'),
  Bullet('Voluntários ativos na plataforma'),
]));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '🏢  ', font: FONT, size: 28 }),
      new TextRun({ text: 'Métricas ESG (Empresas Parceiras)', font: FONT, color: C.accent, bold: true, size: 26 }),
    ],
  }),
  Bullet('Investimento total em responsabilidade social'),
  Bullet('Relatórios de impacto auditáveis'),
  Bullet('Visibilidade de marca gerada'),
  Bullet('Retorno sobre investimento social'),
]));

// ---- Como Entrar ----
content.push(Empty(240));
content.push(H2('🤝  Como Entrar na Aceleradora de Afiliação'));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '👤  ', font: FONT, size: 32 }),
      new TextRun({ text: 'Para Voluntários / Criadores de Conteúdo', font: FONT, color: C.accent, bold: true, size: 26 }),
    ],
  }),
  Bullet('Cadastre-se no GPTDOABEM (gratuito)'),
  Bullet('Complete a formação em presença digital (8 semanas)'),
  Bullet('Escolha as plataformas de afiliação desejadas'),
  Bullet('Receba seus links e cupons personalizados'),
  Bullet('Crie conteúdo e compartilhe ofertas'),
  Bullet('Acompanhe seus ganhos no dashboard'),
  Bullet('Receba comissões + reverta parte para projetos sociais'),
]));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '🏢  ', font: FONT, size: 32 }),
      new TextRun({ text: 'Para Empresas / Plataformas Parceiras', font: FONT, color: C.accent, bold: true, size: 26 }),
    ],
  }),
  Bullet('Entre em contato pelo formulário de parceria'),
  Bullet('Defina condições de comissão e cupons exclusivos'),
  Bullet('Integre sua API de afiliados ao GPTDOABEM'),
  Bullet('Ofereça vouchers e descontos para comunidade'),
  Bullet('Receba relatórios mensais de impacto e conversão'),
]));
content.push(Empty(120));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: '💚  ', font: FONT, size: 32 }),
      new TextRun({ text: 'Para ONGs / Projetos Sociais', font: FONT, color: C.accent, bold: true, size: 26 }),
    ],
  }),
  Bullet('Cadastre seu projeto no GPTDOABEM'),
  Bullet('Receba estruturação digital gratuita'),
  Bullet('Aprenda a monetizar sua audiência'),
  Bullet('Receba links de afiliado para sua bio'),
  Bullet('Ganhe renda recorrente via comissões'),
  Bullet('Use recursos para combater a insônia financeira'),
]));

// ---- CTA da Aceleradora ----
content.push(Empty(240));
content.push(H2('💜  Faça Cada Clique Valer', { align: AlignmentType.CENTER }));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 200 },
  children: [new TextRun({
    text: 'No GPTDOABEM, cada link compartilhado é uma oportunidade.',
    font: FONT, color: C.textMuted, italics: true, size: 22,
  })],
}));
content.push(Card([
  P([new TextRun({ text: 'Cada compra via afiliado é um impacto.', font: FONT, color: C.textLight, bold: true, size: 24 })], { align: AlignmentType.CENTER }),
  P([new TextRun({ text: 'Cada comissão gerada é uma noite tranquila para um projeto social.', font: FONT, color: C.textLight, bold: true, size: 24 })], { align: AlignmentType.CENTER }),
  Empty(80),
  P([new TextRun({ text: '🛒 Você não precisa doar dinheiro do seu bolso.', font: FONT, color: C.accentSoft, size: 22 })], { align: AlignmentType.CENTER }),
  P([new TextRun({ text: '🎯 Basta compartilhar links inteligentes.', font: FONT, color: C.accentSoft, size: 22 })], { align: AlignmentType.CENTER }),
  P([new TextRun({ text: '💚 E parte da renda vira transformação social.', font: FONT, color: C.accentSoft, size: 22 })], { align: AlignmentType.CENTER }),
]));
content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 200 },
  children: [
    new TextRun({ text: '🚀  ', font: FONT, size: 28 }),
    new TextRun({
      text: '"Aceleradora de Afiliação GPTDOABEM — Onde marketing digital se encontra com propósito social."',
      font: FONT, color: C.accent, italics: true, bold: true, size: 24,
    }),
  ],
}));

content.push(CTAButton('➤ QUERO SER CRIADOR DE CONTEÚDO SOLIDÁRIO'));
content.push(Empty(80));
content.push(CTAButton('➤ QUERO MINHA EMPRESA NA ACELERADORA'));
content.push(Empty(80));
content.push(CTAButton('➤ SOU ONG E QUERO MONETIZAR MINHA AUDIÊNCIA'));

content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 100 },
  children: [
    new TextRun({ text: '🌙  ', font: FONT, size: 24 }),
    new TextRun({
      text: 'Faça Valer. Cada compra. Cada comissão. Cada impacto.  ',
      font: FONT, color: C.textLight, bold: true, italics: true, size: 24,
    }),
    new TextRun({ text: '💜', font: FONT, size: 24 }),
  ],
}));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 9 — INDICADORES DE IMPACTO
// ============================================================
content.push(Eyebrow('SEÇÃO 9 — INDICADORES DE IMPACTO'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '📊  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'INDICADORES QUE ENTREGAMOS',
      font: FONT, color: C.textLight, bold: true, size: 40,
    }),
  ],
}));
content.push(Empty(120));
content.push(Card([
  Bullet('📱  Crescimento de audiência das ONGs atendidas'),
  Bullet('💰  Aumento de captação de recursos'),
  Bullet('❤️  Engajamento social nas comunidades'),
  Bullet('🎓  Portfólio profissional para voluntários'),
  Bullet('📈  Estruturação de funis solidários'),
  Bullet('📑  Relatórios formais de impacto social'),
]));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 10 — IMPACTO ESG
// ============================================================
content.push(Eyebrow('SEÇÃO 10 — IMPACTO ESG'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🌍  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'IMPACTO ESG',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(Empty(120));
content.push(Card([
  Bullet('Alinhamento com pilares ESG'),
  Bullet('Fortalecimento de marca institucional'),
  Bullet('Engajamento interno de colaboradores'),
  Bullet('Relatório com métricas auditáveis'),
  Bullet('Visibilidade de marca em materiais e redes sociais'),
  Bullet('Conexão com voluntários engajados e alinhados com propósito'),
]));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 11 — VANTAGENS PARA VOLUNTÁRIOS
// ============================================================
content.push(Eyebrow('SEÇÃO 11 — VANTAGENS PARA VOLUNTÁRIOS (ESTILO 2DOE4)'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '🎁  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'VANTAGENS QUE VOCÊ SENTE',
      font: FONT, color: C.textLight, bold: true, size: 40,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 160 },
  children: [new TextRun({
    text: 'No GPTDOABEM, voluntariado não é sacrifício — é troca inteligente.',
    font: FONT, color: C.accent, italics: true, bold: true, size: 24,
  })],
}));
content.push(Card([
  Bullet('🎟  Cupons e descontos exclusivos de parceiros'),
  Bullet('💰  Vouchers e cashback em compras'),
  Bullet('📜  Certificado oficial de voluntariado digital'),
  Bullet('📚  Acesso a cursos e oficinas complementares'),
  Bullet('🤝  Mentorias com especialistas em marketing digital'),
  Bullet('🎉  Eventos de networking e celebração'),
  Bullet('🧠  Apoio à saúde emocional (rodas de conversa, práticas de bem-estar)'),
  Bullet('💼  Experiência comprovável para currículo e LinkedIn'),
  Bullet('🎓  Portfólio real de projetos sociais'),
]));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 12 — COMO FUNCIONA (4 PASSOS)
// ============================================================
content.push(Eyebrow('SEÇÃO 12 — COMO FUNCIONA (4 PASSOS)'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '📋  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'COMO FUNCIONA',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(new Paragraph({
  spacing: { before: 0, after: 160 },
  children: [new TextRun({
    text: '4 passos que mudam o jogo',
    font: FONT, color: C.accent, bold: true, size: 28,
  })],
}));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '01  ', font: FONT, color: C.accent, bold: true, size: 56 }),
      new TextRun({ text: 'CADASTRE-SE GRATUITAMENTE', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  P('Nome, WhatsApp, cidade e causa de interesse. Leva menos de 60 segundos.', { color: C.textMuted }),
]));
content.push(Empty(100));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '02  ', font: FONT, color: C.accent, bold: true, size: 56 }),
      new TextRun({ text: 'ESCOLHA SUA CAUSA', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  P('Conectamos você ao projeto social que mais combina com seu perfil.', { color: C.textMuted }),
]));
content.push(Empty(100));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '03  ', font: FONT, color: C.accent, bold: true, size: 56 }),
      new TextRun({ text: 'PARTICIPE DA FORMAÇÃO', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  P('8 semanas de aprendizado prático, 100% mobile, com mentoria especializada.', { color: C.textMuted }),
]));
content.push(Empty(100));

content.push(Card([
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: '04  ', font: FONT, color: C.accent, bold: true, size: 56 }),
      new TextRun({ text: 'CRIE IMPACTO REAL', font: FONT, color: C.textLight, bold: true, size: 28 }),
    ],
  }),
  P('Estruture a presença digital de uma ONG real e receba suas vantagens.', { color: C.textMuted }),
]));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 13 — DEPOIMENTOS
// ============================================================
content.push(Eyebrow('SEÇÃO 13 — DEPOIMENTOS E PROVA SOCIAL (UGC)'));
content.push(new Paragraph({
  spacing: { before: 100, after: 200 },
  children: [
    new TextRun({ text: '💬  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'QUEM ENTRA NO GPTDOABEM NÃO QUERIA APENAS AJUDAR — QUERIA PERTENCER',
      font: FONT, color: C.textLight, bold: true, size: 32,
    }),
  ],
}));

const testimonial = (quote, author) => Card([
  P([new TextRun({ text: '🗣️  ', font: FONT, size: 24 }), new TextRun({
    text: quote, font: FONT, color: C.textLight, italics: true, size: 24,
  })]),
  Empty(80),
  P([new TextRun({
    text: `— ${author}`, font: FONT, color: C.accent, bold: true, size: 22,
  })], { align: AlignmentType.RIGHT }),
]);

content.push(testimonial(
  '"Antes do GPTDOABEM, nossa ONG dependia de doações esporádicas. Hoje temos um Instagram profissional, um funil de captação e previsibilidade de recursos. Dormimos tranquilos agora."',
  'Maria, coordenadora de ONG'
));
content.push(Empty(120));
content.push(testimonial(
  '"Aprendi marketing digital aplicando em projetos reais. Hoje tenho portfólio, certificado e uma habilidade monetizável. E o melhor: ajudei projetos sociais a saírem da invisibilidade."',
  'João, voluntário GPTDOABEM'
));
content.push(Empty(120));
content.push(testimonial(
  '"Patrocinar uma turma do GPTDOABEM fortaleceu nossa agenda ESG e gerou engajamento real dos nossos colaboradores. Os relatórios de impacto são auditáveis e transparentes."',
  'Ana, diretora de RH'
));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 14 — FAQ
// ============================================================
content.push(Eyebrow('SEÇÃO 14 — PERGUNTAS FREQUENTES'));
content.push(new Paragraph({
  spacing: { before: 100, after: 200 },
  children: [
    new TextRun({ text: '❓  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'PERGUNTAS FREQUENTES',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));

const faq = (q, a) => Card([
  P([
    new TextRun({ text: '❓  ', font: FONT, color: C.accent, bold: true, size: 24 }),
    new TextRun({ text: q, font: FONT, color: C.accent, bold: true, size: 24 }),
  ]),
  Empty(60),
  P(a, { color: C.textLight, size: 22 }),
]);

content.push(faq(
  'De que forma minha doação contribui com o GPTDOABEM?',
  'Sua doação tem impacto direto na estruturação da presença digital de organizações sociais. Os recursos são direcionados para formação de voluntários, ferramentas e mentoria especializada. Cada contribuição fortalece nossa missão e transforma a visibilidade de milhares de projetos sociais.'
));
content.push(Empty(120));
content.push(faq(
  'Onde posso conferir o destino das doações?',
  'A transparência é um compromisso fundamental do GPTDOABEM. Para conferir como as doações são aplicadas e o impacto gerado, você pode acessar nossos Relatórios de Impacto, em que detalhamos a destinação dos recursos e os principais resultados alcançados.'
));
content.push(Empty(120));
content.push(faq(
  'Sou uma empresa. Como patrocinar uma turma?',
  'Ficamos felizes com o interesse em acelerar a sustentabilidade digital junto conosco! Para fazer uma doação ou patrocinar uma turma, entre em contato com nosso time pelo formulário e conte sobre a parceria. Ficaremos felizes em indicar os próximos passos.'
));
content.push(Empty(120));
content.push(faq(
  'Sou uma pessoa física. Como doar ou ser voluntário?',
  'Agradecemos a sua parceria em combater a insônia financeira social! Para fazer sua doação ou se cadastrar como voluntário, acesse nossa plataforma de cadastro e escolha sua forma de contribuição.'
));
content.push(Empty(120));
content.push(faq(
  'Preciso ter experiência em marketing digital para participar?',
  'Não! O GPTDOABEM é projetado para iniciantes. Nosso método é 100% mobile, acessível e democrático. Qualquer pessoa pode aprender e aplicar.'
));
content.push(Empty(120));
content.push(faq(
  'Quanto tempo dura o programa?',
  'O treinamento interno dura 8 semanas, com carga de 4 a 6 horas semanais. O laboratório social é contínuo e os voluntários podem permanecer conectados aos projetos após a formação.'
));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 15 — CONTATO
// ============================================================
content.push(Eyebrow('SEÇÃO 15 — CONTATO E FORMULÁRIO'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '📞  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'VAMOS UNIR ESFORÇOS PELA SUSTENTABILIDADE DIGITAL?',
      font: FONT, color: C.textLight, bold: true, size: 32,
    }),
  ],
}));
content.push(Empty(120));
content.push(P('A sua causa é combater a insônia financeira social? Então preencha o formulário ao lado. Entraremos em contato para encontrarmos, juntos, formas de fazer essa parceria acontecer. Seu apoio poderá nos ajudar a transformar mais vidas.', { color: C.textMuted }));
content.push(Empty(160));

content.push(Card([
  P([
    new TextRun({ text: '📧  ', font: FONT, size: 24 }),
    new TextRun({ text: 'E-mail de contato', font: FONT, color: C.accent, bold: true, size: 22 }),
  ]),
  P([
    new TextRun({ text: '📱  ', font: FONT, size: 24 }),
    new TextRun({ text: 'WhatsApp', font: FONT, color: C.accent, bold: true, size: 22 }),
  ]),
  P([
    new TextRun({ text: '🌐  ', font: FONT, size: 24 }),
    new TextRun({ text: 'Redes sociais', font: FONT, color: C.accent, bold: true, size: 22 }),
  ]),
]));
content.push(Empty(160));

content.push(H2('Formulário de Contato'));
content.push(Card([
  Bullet('Nome completo'),
  Bullet('E-mail'),
  Bullet('WhatsApp'),
  Bullet('Tipo de parceria desejada (Pessoa Física / Empresa / ONG / Universidade)'),
  Bullet('Mensagem'),
]));
content.push(Empty(160));
content.push(CTAButton('➤ ENVIAR MENSAGEM'));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 16 — MANIFESTO
// ============================================================
content.push(Eyebrow('SEÇÃO 16 — MANIFESTO / FOOTER'));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 80 },
  children: [
    new TextRun({ text: '🌙  ', font: FONT, size: 40 }),
    new TextRun({
      text: 'MANIFESTO GPTDOABEM',
      font: FONT, color: C.textLight, bold: true, size: 52,
    }),
  ],
}));
content.push(Empty(160));

content.push(Card([
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 120, line: 360 },
    children: [new TextRun({
      text: 'Impacto social não pode depender da sorte. Precisa de estrutura.',
      font: FONT, color: C.textLight, bold: true, italics: true, size: 32,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 120, line: 360 },
    children: [new TextRun({
      text: 'Estrutura começa na presença digital.',
      font: FONT, color: C.accent, bold: true, size: 28,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 80, line: 320 },
    children: [new TextRun({
      text: 'Cada perfil organizado. Cada campanha estruturada. Cada história contada.',
      font: FONT, color: C.accentSoft, size: 24,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 160, line: 320 },
    children: [new TextRun({
      text: 'É uma noite mais tranquila para um projeto social.',
      font: FONT, color: C.accentSoft, italics: true, size: 24,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 0, line: 320 },
    children: [new TextRun({
      text: 'Seu tempo vale. Seu aprendizado vale. Sua solidariedade faz valer.',
      font: FONT, color: C.textLight, bold: true, size: 26,
    })],
  }),
], { border: C.accent }));

content.push(Empty(200));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 80 },
  children: [
    new TextRun({ text: '💜  ', font: FONT, size: 32 }),
    new TextRun({
      text: 'GPTDOABEM',
      font: FONT, color: C.textLight, bold: true, size: 40,
      characterSpacing: 40,
    })],
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: 'Presença Digital Solidária',
    font: FONT, color: C.accent, bold: true, size: 26,
  })],
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 200 },
  children: [
    new TextRun({ text: 'Faça Valer.  ', font: FONT, color: C.textLight, italics: true, bold: true, size: 26 }),
    new TextRun({ text: '🌙', font: FONT, size: 26 }),
  ],
}));

content.push(Empty(200));
content.push(Divider());

// ============================================================
// SEÇÃO 17 — REDES SOCIAIS
// ============================================================
content.push(Eyebrow('SEÇÃO 17 — REDES SOCIAIS E COMUNIDADE'));
content.push(new Paragraph({
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '📲  ', font: FONT, size: 36 }),
    new TextRun({
      text: 'SIGA O GPTDOABEM',
      font: FONT, color: C.textLight, bold: true, size: 44,
    }),
  ],
}));
content.push(Empty(120));
content.push(Card([
  P([
    new TextRun({ text: '📱  Instagram: ', font: FONT, color: C.accent, bold: true, size: 24 }),
    new TextRun({ text: '@gptdoabem', font: FONT, color: C.textLight, bold: true, size: 24 }),
  ]),
  P([
    new TextRun({ text: '💬  Comunidade ativa no WhatsApp', font: FONT, color: C.textLight, size: 24 }),
  ]),
  P([
    new TextRun({ text: '🎵  TikTok: ', font: FONT, color: C.accent, bold: true, size: 24 }),
    new TextRun({ text: '@gptdoabem', font: FONT, color: C.textLight, bold: true, size: 24 }),
  ]),
  P([
    new TextRun({ text: '💼  LinkedIn: ', font: FONT, color: C.accent, bold: true, size: 24 }),
    new TextRun({ text: 'GPTDOABEM', font: FONT, color: C.textLight, bold: true, size: 24 }),
  ]),
]));
content.push(Empty(140));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 80, after: 80 },
  children: [
    new TextRun({ text: '🌙  ', font: FONT, size: 24 }),
    new TextRun({
      text: '"Seguir @gptdoabem no Instagram"',
      font: FONT, color: C.accentSoft, italics: true, bold: true, size: 24,
    }),
  ],
}));

content.push(Empty(240));
content.push(Divider());

// ============================================================
// SEÇÃO 18 — A MENSAGEM DO ÓBVIO
// ============================================================
content.push(Eyebrow('SEÇÃO 18 — A MENSAGEM DO ÓBVIO (CALL FINAL)'));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 80 },
  children: [
    new TextRun({ text: '✨  ', font: FONT, size: 40 }),
    new TextRun({
      text: 'A MENSAGEM DO ÓBVIO',
      font: FONT, color: C.textLight, bold: true, size: 52,
    }),
  ],
}));
content.push(Empty(200));

const obvio = (text) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 80, after: 80, line: 340 },
  children: [
    new TextRun({ text: '🌙  ', font: FONT, color: C.accent, size: 24 }),
    new TextRun({
      text, font: FONT, color: C.textLight, size: 26,
    }),
  ],
});

content.push(Card([
  obvio('É óbvio que uma ONG sem presença digital é invisível.'),
  obvio('É óbvio que invisibilidade gera escassez.'),
  obvio('É óbvio que escassez gera insônia financeira.'),
  obvio('É óbvio que projetos sociais precisam dormir tranquilos.'),
  obvio('É óbvio que presença digital é sustentabilidade.'),
  obvio('É óbvio que você pode fazer a diferença.'),
]));

content.push(Empty(240));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: '💜  ', font: FONT, size: 40 }),
    new TextRun({
      text: 'GPTDOABEM',
      font: FONT, color: C.textLight, bold: true, size: 52,
      characterSpacing: 60,
    }),
  ],
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: 'O óbvio que ninguém fazia. Até agora.',
    font: FONT, color: C.accent, italics: true, bold: true, size: 28,
  })],
}));
content.push(Empty(160));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 80, after: 200 },
  children: [
    new TextRun({ text: '🌙  ', font: FONT, size: 32 }),
    new TextRun({
      text: 'Faça Valer.',
      font: FONT, color: C.textLight, bold: true, italics: true, size: 36,
    }),
  ],
}));

// Footer simples final
content.push(Divider());
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 80, after: 0 },
  children: [new TextRun({
    text: '© 2024 GPTDOABEM. Pioneering Social Impact through Technological Empathy.',
    font: FONT, color: C.textMuted, size: 16,
  })],
}));

// ============================================================
// DOCUMENT
// ============================================================
const doc = new Document({
  background: { color: C.bgDark },
  styles: {
    default: {
      document: { run: { font: FONT, size: 22, color: C.textLight } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 }, // US Letter
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    children: content,
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:\\Users\\suporte\\Downloads\\GPTDOABEM-PORTAL.docx', buffer);
  console.log('✅ Documento gerado: C:\\Users\\suporte\\Downloads\\GPTDOABEM-PORTAL.docx');
}).catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
