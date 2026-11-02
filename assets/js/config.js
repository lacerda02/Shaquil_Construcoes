/* ==========================================================================
   SHAQUIL CONSTRUÇÕES — CONFIGURAÇÃO CENTRAL DO WEBSITE
   --------------------------------------------------------------------------
   Este é o ÚNICO ficheiro onde precisa de editar textos, contactos, cores,
   serviços e redes sociais. Guarde o ficheiro e actualize a página no
   navegador para ver as alterações.

   As fotografias estão no ficheiro assets/js/imagens.js

   REGRAS:
   - Mantenha as aspas "..." e as vírgulas no fim de cada linha.
   - Campos vazios ("") ficam escondidos ou aparecem como "A definir".
   - Textos marcados como PROVISÓRIO devem ser substituídos por informação real.
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------------------------- EMPRESA -------------------------------- */
  empresa: {
    nome: "SHAQUIL CONSTRUÇÕES",
    nomeCurto: "SHAQUIL",
    sufixo: "CONSTRUÇÕES",
    slogan: "CONSTRUÍMOS COM EXCELÊNCIA. TRANSFORMAMOS O FUTURO.",
    cidade: "Quelimane, Moçambique",
    // Para trocar o logótipo, substitua o ficheiro abaixo (SVG ou PNG quadrado)
    // ou altere o caminho para o seu novo ficheiro.
    logotipo: "assets/images/logo-marca.svg",
    descricao: "SHAQUIL CONSTRUÇÕES — construção civil, engenharia, infra-estruturas e obras públicas em Quelimane, Moçambique.",
    // Endereço final do website (para SEO). Ex.: "https://www.shaquilconstrucoes.co.mz"
    urlSite: ""
  },

  /* ------------------------------ CORES -------------------------------- */
  cores: {
    marinho: "#0B1F3A",
    marinhoClaro: "#14315A",
    dourado: "#F2B705",
    cinzento: "#5B6577",
    fundo: "#F4F6F9"
  },

  /* ----------------------------- CONTACTOS ------------------------------ */
  // Nenhum dado foi inventado. Preencha com os dados reais da empresa.
  contactos: {
    telefone: "",          // Ex.: "+258 84 000 0000"
    whatsapp: "",          // Só números, com indicativo do país. Ex.: "258840000000"
    email: "",             // Ex.: "geral@exemplo.co.mz"
    endereco: "",          // Ex.: "Av. ..., Quelimane"
    horario: "",           // Ex.: "Segunda a Sexta: 07:30 – 16:30"
    mapaPesquisa: "Quelimane, Moçambique"   // Texto usado para o mapa incorporado
  },

  /* --------------------------- REDES SOCIAIS ---------------------------- */
  // Só aparecem as redes que tiverem endereço (URL) preenchido.
  redes: [
    { nome: "Facebook",  url: "" },
    { nome: "Instagram", url: "" },
    { nome: "LinkedIn",  url: "" },
    { nome: "YouTube",   url: "" }
  ],

  /* --------------------- ENVIO DE FORMULÁRIOS --------------------------- */
  // Por omissão, os pedidos são enviados por WhatsApp (mensagem pré-preenchida).
  // OPCIONAL: pode ligar um serviço externo gratuito (ex.: Formspree, Web3Forms)
  // colocando aqui o endereço de envio. Deixe vazio para usar só o WhatsApp.
  envio: {
    formularioExterno: ""   // Ex.: "https://formspree.io/f/xxxxxxxx"
  },

  /* ------------------------- PÁGINA INICIAL ----------------------------- */
  inicio: {
    frases: [
      "Construímos infra-estruturas para o futuro.",
      "Excelência e qualidade em cada construção.",
      "Transformamos projectos em realidade.",
      "Engenharia que constrói desenvolvimento."
    ],
    intervaloMs: 6000,
    apresentacaoTitulo: "Engenharia e construção com compromisso",
    apresentacaoTexto:
      "A SHAQUIL CONSTRUÇÕES actua nas áreas da construção civil, engenharia, infra-estruturas e obras públicas, a partir de Quelimane, Moçambique. " +
      "[TEXTO PROVISÓRIO — substitua por uma apresentação real da empresa.]",
    // Vantagens: descrevem a forma de trabalhar a que a empresa se compromete.
    // [PROVISÓRIO — confirme e ajuste conforme a realidade da empresa.]
    vantagens: [
      { titulo: "Planeamento rigoroso", texto: "Cada obra começa com um plano claro de prazos, recursos e custos." },
      { titulo: "Qualidade dos materiais", texto: "Compromisso com materiais e técnicas adequados a cada projecto." },
      { titulo: "Segurança no trabalho", texto: "Práticas de segurança para proteger equipas, clientes e comunidade." },
      { titulo: "Comunicação transparente", texto: "Acompanhamento próximo e informação clara em todas as fases." },
      { titulo: "Responsabilidade ambiental", texto: "Preocupação em reduzir o impacto das obras no ambiente." },
      { titulo: "Equipa técnica", texto: "Trabalho conjunto de engenheiros, técnicos e profissionais da construção." }
    ],
    // Testemunhos: adicione apenas depoimentos REAIS, com autorização do cliente.
    // Enquanto a lista estiver vazia, a secção fica escondida.
    testemunhos: [
      // { texto: "…", autor: "Nome do cliente", cargo: "Empresa / Localidade" }
    ]
  },

  /* --------------------------- ACERCA DE NÓS ---------------------------- */
  // [PROVISÓRIO] Todos os textos desta secção são demonstrativos.
  sobre: {
    aviso: "Conteúdo provisório. Edite este texto em assets/js/config.js com a informação real da empresa.",
    quemSomos:
      "A SHAQUIL CONSTRUÇÕES é uma empresa de construção civil e engenharia sediada em Quelimane, Província da Zambézia, Moçambique. " +
      "[TEXTO PROVISÓRIO — descreva aqui quem é a empresa, o que faz e a quem serve.]",
    historia:
      "[TEXTO PROVISÓRIO — conte a história da empresa: ano de fundação, marcos importantes e evolução. " +
      "Não foram incluídas datas nem números porque ainda não foram confirmados.]",
    missao:
      "Executar obras de construção civil e engenharia com qualidade, segurança e responsabilidade, contribuindo para o desenvolvimento das comunidades onde actuamos.",
    visao:
      "Ser uma referência regional em construção e infra-estruturas, reconhecida pela confiança, competência técnica e compromisso com o futuro.",
    valores: [
      "Excelência técnica",
      "Integridade e transparência",
      "Segurança em primeiro lugar",
      "Respeito pelo ambiente e pela comunidade",
      "Compromisso com o cliente",
      "Melhoria contínua"
    ],
    objectivos: [
      "Entregar cada obra com qualidade e dentro dos prazos acordados.",
      "Promover a segurança e a formação das equipas.",
      "Apostar em soluções de engenharia sustentáveis.",
      "Construir relações duradouras com clientes e parceiros."
    ],
    qualidade:
      "A qualidade e a segurança orientam todas as fases da obra, do planeamento à entrega. " +
      "[TEXTO PROVISÓRIO — indique aqui as práticas, normas e certificações reais da empresa, se existirem.]",
    seguranca:
      "Promovemos práticas de segurança e saúde no trabalho em cada estaleiro. [TEXTO PROVISÓRIO]",
    ambiente:
      "Procuramos minimizar o impacto ambiental das nossas obras. [TEXTO PROVISÓRIO]",
    capacidade:
      "[TEXTO PROVISÓRIO — descreva a capacidade técnica e operacional: equipas, equipamentos e áreas de especialidade.]"
  },

  /* ------------------------------ SERVIÇOS ------------------------------ */
  // Para adicionar um serviço, copie um bloco { ... }, altere o "id" (único, sem
  // espaços) e indique a imagem em assets/js/imagens.js (secção "servicos").
  servicos: [
    { id: "construcao-civil", titulo: "Construção civil",
      texto: "Execução de obras de construção civil, da fundação ao acabamento, com planeamento, controlo de qualidade e cumprimento das normas técnicas." },
    { id: "estradas", titulo: "Construção de estradas",
      texto: "Construção e pavimentação de estradas e acessos, incluindo drenagem, sinalização e controlo dos materiais." },
    { id: "pontes", titulo: "Construção de pontes",
      texto: "Execução de pontes, pontões e passagens, com atenção à estabilidade estrutural e à segurança." },
    { id: "edificios", titulo: "Construção de edifícios",
      texto: "Construção de edifícios comerciais, institucionais e residenciais, com acompanhamento técnico em todas as fases." },
    { id: "habitacoes", titulo: "Construção de habitações",
      texto: "Construção de moradias e conjuntos habitacionais, adaptados ao orçamento e às necessidades de cada família." },
    { id: "obras-publicas", titulo: "Obras públicas",
      texto: "Execução de obras de interesse público, em conformidade com os requisitos contratuais e regulamentares." },
    { id: "reabilitacao", titulo: "Reabilitação de infra-estruturas",
      texto: "Recuperação e reforço de estradas, estruturas e edifícios existentes, prolongando a sua vida útil." },
    { id: "terraplanagem", titulo: "Terraplanagem",
      texto: "Movimentação de terras, escavação, aterros e nivelamento para preparação de terrenos." },
    { id: "fiscalizacao", titulo: "Fiscalização de obras",
      texto: "Acompanhamento técnico da execução de obras, verificando qualidade, prazos e conformidade com o projecto." },
    { id: "consultoria", titulo: "Consultoria em engenharia",
      texto: "Apoio técnico em estudos, dimensionamento, planeamento e soluções de engenharia." },
    { id: "instalacoes", titulo: "Instalações eléctricas e hidráulicas",
      texto: "Instalações eléctricas e hidráulicas para edifícios e obras, executadas segundo as normas aplicáveis." },
    { id: "manutencao", titulo: "Manutenção de edifícios",
      texto: "Manutenção preventiva e correctiva de edifícios e das suas instalações." }
  ],

  /* ------------------------------ TEXTOS ------------------------------- */
  textos: {
    avisoImagens: "As imagens apresentadas são ilustrativas e não representam obras realizadas pela empresa.",
    ctaTitulo: "Tem um projecto em mente?",
    ctaTexto: "Descreva-nos a sua obra e receba o nosso contacto para avaliar o seu pedido de orçamento."
  }
};
