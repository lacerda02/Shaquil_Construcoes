/* ==========================================================================
   SHAQUIL CONSTRUÇÕES — CONFIGURAÇÃO CENTRAL DAS FOTOGRAFIAS
   --------------------------------------------------------------------------
   COMO SUBSTITUIR AS IMAGENS DE FORMA PERMANENTE (recomendado):
     1. Copie a sua fotografia para a pasta correcta em assets/images/
        (ex.: assets/images/estradas/minha-estrada.jpg).
     2. Neste ficheiro, altere o campo "src" para o novo caminho
        e apague a linha  ilustrativa: true  (ou ponha false).
     3. Publique de novo o website.

   COMO ADICIONAR UMA FOTOGRAFIA: copie uma linha da lista "galeria",
   altere os campos e guarde.

   Alternativa rápida (só no seu navegador): página "Gestor de imagens"
   (gestor-imagens.html). Atenção: o que é guardado no gestor NÃO é visto pelos
   visitantes nem noutros dispositivos. Veja o README.

   Formato recomendado: JPG ou WebP, 1600–2000 px de largura, até 400 KB.
   As imagens SVG actuais são ILUSTRATIVAS (não são obras da empresa).
   ========================================================================== */

window.IMAGENS_CONFIG = {

  categorias: [
    { id: "estradas",       nome: "Estradas" },
    { id: "pontes",         nome: "Pontes" },
    { id: "edificios",      nome: "Edifícios" },
    { id: "habitacoes",     nome: "Habitações" },
    { id: "obras-publicas", nome: "Obras Públicas" },
    { id: "engenharia",     nome: "Engenharia" },
    { id: "equipamentos",   nome: "Equipamentos" }
  ],

  /* Carrossel da página inicial (ordem de apresentação) */
  carrossel: [
    { src: "assets/images/estradas/estrada-1.svg",        alt: "Ilustração de uma estrada ao amanhecer",          legenda: "Estradas",            ilustrativa: true },
    { src: "assets/images/pontes/ponte-1.svg",            alt: "Ilustração de uma ponte atirantada",              legenda: "Pontes",              ilustrativa: true },
    { src: "assets/images/edificios/arranha-ceus-1.svg",  alt: "Ilustração de arranha-céus",                      legenda: "Arranha-céus",        ilustrativa: true },
    { src: "assets/images/obras-publicas/obra-publica-1.svg", alt: "Ilustração de uma obra pública com grua",     legenda: "Obras públicas",      ilustrativa: true },
    { src: "assets/images/equipamentos/equipamento-1.svg", alt: "Ilustração de uma escavadora",                   legenda: "Máquinas de construção", ilustrativa: true },
    { src: "assets/images/habitacoes/habitacoes-1.svg",   alt: "Ilustração de habitações",                        legenda: "Habitações",          ilustrativa: true },
    { src: "assets/images/obras-publicas/obra-publica-2.svg", alt: "Ilustração de um viaduto em arcos",           legenda: "Infra-estruturas",    ilustrativa: true },
    { src: "assets/images/edificios/edificios-1.svg",     alt: "Ilustração de edifícios modernos",                legenda: "Edifícios",           ilustrativa: true }
  ],

  /* Galeria (categoria deve ser um dos "id" de cima) */
  galeria: [
    { src: "assets/images/estradas/estrada-1.svg",   categoria: "estradas", titulo: "Estrada — ilustração 1", alt: "Ilustração de estrada", ilustrativa: true },
    { src: "assets/images/estradas/estrada-2.svg",   categoria: "estradas", titulo: "Estrada — ilustração 2", alt: "Ilustração de estrada", ilustrativa: true },
    { src: "assets/images/estradas/estrada-3.svg",   categoria: "estradas", titulo: "Estrada — ilustração 3", alt: "Ilustração de estrada", ilustrativa: true },

    { src: "assets/images/pontes/ponte-1.svg",       categoria: "pontes", titulo: "Ponte — ilustração 1", alt: "Ilustração de ponte", ilustrativa: true },
    { src: "assets/images/pontes/ponte-2.svg",       categoria: "pontes", titulo: "Ponte — ilustração 2", alt: "Ilustração de ponte", ilustrativa: true },
    { src: "assets/images/pontes/ponte-3.svg",       categoria: "pontes", titulo: "Ponte — ilustração 3", alt: "Ilustração de ponte", ilustrativa: true },

    { src: "assets/images/edificios/edificios-1.svg",    categoria: "edificios", titulo: "Edifícios — ilustração 1", alt: "Ilustração de edifícios", ilustrativa: true },
    { src: "assets/images/edificios/edificios-2.svg",    categoria: "edificios", titulo: "Edifícios — ilustração 2", alt: "Ilustração de edifícios", ilustrativa: true },
    { src: "assets/images/edificios/arranha-ceus-1.svg", categoria: "edificios", titulo: "Arranha-céus — ilustração 1", alt: "Ilustração de arranha-céus", ilustrativa: true },
    { src: "assets/images/edificios/arranha-ceus-2.svg", categoria: "edificios", titulo: "Arranha-céus — ilustração 2", alt: "Ilustração de arranha-céus", ilustrativa: true },
    { src: "assets/images/edificios/arranha-ceus-3.svg", categoria: "edificios", titulo: "Arranha-céus — ilustração 3", alt: "Ilustração de arranha-céus", ilustrativa: true },

    { src: "assets/images/habitacoes/habitacoes-1.svg",  categoria: "habitacoes", titulo: "Habitações — ilustração 1", alt: "Ilustração de habitações", ilustrativa: true },
    { src: "assets/images/habitacoes/habitacoes-2.svg",  categoria: "habitacoes", titulo: "Habitações — ilustração 2", alt: "Ilustração de habitações", ilustrativa: true },
    { src: "assets/images/habitacoes/habitacoes-3.svg",  categoria: "habitacoes", titulo: "Habitações — ilustração 3", alt: "Ilustração de habitações", ilustrativa: true },

    { src: "assets/images/obras-publicas/obra-publica-1.svg", categoria: "obras-publicas", titulo: "Obra pública com grua — ilustração", alt: "Ilustração de obra pública", ilustrativa: true },
    { src: "assets/images/obras-publicas/obra-publica-2.svg", categoria: "obras-publicas", titulo: "Viaduto — ilustração", alt: "Ilustração de viaduto", ilustrativa: true },
    { src: "assets/images/obras-publicas/obra-publica-3.svg", categoria: "obras-publicas", titulo: "Obra pública — ilustração 3", alt: "Ilustração de obra pública", ilustrativa: true },

    { src: "assets/images/engenharia/engenharia-1.svg", categoria: "engenharia", titulo: "Projecto de engenharia — ilustração 1", alt: "Ilustração de desenho técnico", ilustrativa: true },
    { src: "assets/images/engenharia/engenharia-2.svg", categoria: "engenharia", titulo: "Projecto de engenharia — ilustração 2", alt: "Ilustração de desenho técnico", ilustrativa: true },
    { src: "assets/images/engenharia/engenharia-3.svg", categoria: "engenharia", titulo: "Projecto de engenharia — ilustração 3", alt: "Ilustração de desenho técnico", ilustrativa: true },

    { src: "assets/images/equipamentos/equipamento-1.svg", categoria: "equipamentos", titulo: "Escavadora — ilustração 1", alt: "Ilustração de escavadora", ilustrativa: true },
    { src: "assets/images/equipamentos/equipamento-2.svg", categoria: "equipamentos", titulo: "Escavadora — ilustração 2", alt: "Ilustração de escavadora", ilustrativa: true },
    { src: "assets/images/equipamentos/equipamento-3.svg", categoria: "equipamentos", titulo: "Escavadora — ilustração 3", alt: "Ilustração de escavadora", ilustrativa: true }
  ],

  /* Imagem de cada serviço (use o "id" do serviço em config.js) */
  servicos: {
    "construcao-civil": "assets/images/edificios/edificios-2.svg",
    "estradas":         "assets/images/estradas/estrada-2.svg",
    "pontes":           "assets/images/pontes/ponte-2.svg",
    "edificios":        "assets/images/edificios/arranha-ceus-2.svg",
    "habitacoes":       "assets/images/habitacoes/habitacoes-2.svg",
    "obras-publicas":   "assets/images/obras-publicas/obra-publica-1.svg",
    "reabilitacao":     "assets/images/obras-publicas/obra-publica-2.svg",
    "terraplanagem":    "assets/images/equipamentos/equipamento-2.svg",
    "fiscalizacao":     "assets/images/engenharia/engenharia-2.svg",
    "consultoria":      "assets/images/engenharia/engenharia-1.svg",
    "instalacoes":      "assets/images/edificios/edificios-3.svg",
    "manutencao":       "assets/images/habitacoes/habitacoes-3.svg"
  },

  /* Imagem de cabeçalho das páginas interiores e da secção "Acerca de nós" */
  paginas: {
    sobre:      "assets/images/edificios/arranha-ceus-3.svg",
    servicos:   "assets/images/equipamentos/equipamento-3.svg",
    orcamento:  "assets/images/engenharia/engenharia-3.svg",
    galeria:    "assets/images/pontes/ponte-3.svg",
    contactos:  "assets/images/estradas/estrada-3.svg"
  }
};
