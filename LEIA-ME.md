# SHAQUIL CONSTRUÇÕES — Website corporativo (front-end estático)

Website 100% estático (HTML5, CSS3 e JavaScript), **sem backend, sem base de dados, sem servidor e sem dependências**.
Não é preciso instalar nada: basta abrir o ficheiro `index.html` no navegador.

## 1. Estrutura

```
index.html            Início
sobre.html            Acerca de nós
servicos.html         Serviços (12 cartões, cada um com botão de orçamento)
orcamento.html        Reservas e pedidos de orçamento (envio por WhatsApp)
galeria.html          Galeria (carrossel, filtros, ampliação)
contactos.html        Contactos, mapa e formulário
gestor-imagens.html   Gestor de imagens (ferramenta local, não indexada)
404.html              Página de erro
assets/
  css/style.css       Estilos
  js/config.js        ★ CONFIGURAÇÃO CENTRAL: textos, contactos, cores, serviços, redes sociais
  js/imagens.js       ★ CONFIGURAÇÃO CENTRAL DAS FOTOGRAFIAS
  js/app.js           Lógica (menu, carrosséis, galeria, formulários)
  js/gestor.js        Lógica do gestor de imagens
  js/armazenamento.js Armazenamento local do gestor (IndexedDB)
  images/             estradas/ pontes/ edificios/ habitacoes/ obras-publicas/
                      engenharia/ equipamentos/ galeria/  + logótipo
```

## 2. Executar no seu computador

Abra `index.html` com duplo clique. Tudo funciona também sem internet (excepto o mapa e as fontes do Google, que precisam de ligação).
Opcional, com servidor local: `python3 -m http.server 8000` na pasta do projecto e abra `http://localhost:8000`.

## 3. Editar conteúdos — `assets/js/config.js`

Único ficheiro para alterar: nome, slogan, cores, telefone, WhatsApp, e-mail, endereço, horário, redes sociais, serviços, textos
institucionais (Acerca de nós), vantagens e testemunhos. Guarde e actualize a página.

- **Contactos**: nenhum dado foi inventado; campos vazios aparecem como “A definir”.
  - WhatsApp: só números com indicativo, por exemplo `"258840000000"`.
- **Textos provisórios**: aparecem realçados a amarelo com `[TEXTO PROVISÓRIO]`. Substitua-os por informação real.
  Não foram inseridos números de projectos, anos de experiência, certificações, clientes ou prémios.
- **Testemunhos**: a secção só aparece quando acrescentar testemunhos **reais**.
- **Serviços**: para adicionar, copie um bloco `{ id, titulo, texto }`, e indique a imagem em `imagens.js` (secção `servicos`).
- **Logótipo**: substitua `assets/images/logo-marca.svg` (ou altere `empresa.logotipo`). O logótipo actual é provisório.

## 4. Substituir fotografias

As imagens actuais são **ilustrações (SVG) identificadas como “Ilustrativa”** — não representam obras da empresa.

### Forma permanente (recomendada)
1. Copie as fotografias reais (JPG/WebP, 1600–2000 px, até ~400 KB) para a pasta adequada em `assets/images/`
   (por exemplo `assets/images/estradas/` ou `assets/images/galeria/`).
2. Em `assets/js/imagens.js`, altere o `src` de cada entrada (ou acrescente novas linhas) e **apague** `ilustrativa: true`.
3. Publique de novo o website.

### Gestor de imagens (`gestor-imagens.html`) — só no seu navegador
Permite seleccionar várias fotografias, pré-visualizar, escolher a categoria, substituir, remover, reordenar e actualizar o carrossel
e a galeria. As imagens são redimensionadas (máx. 1920 px) e guardadas no **armazenamento local do navegador (IndexedDB)**.

> ⚠️ **Limitação importante:** o armazenamento local **não sincroniza com outros dispositivos nem com os visitantes do website**.
> Só o navegador onde foi feito vê essas imagens (aparece um aviso “Pré-visualização local”).

Para tornar as alterações **permanentes e públicas**: no gestor, clique em **“Exportar para publicação”**. São descarregados o
`imagens.js` actualizado e as imagens. Copie as imagens para `assets/images/galeria/`, substitua `assets/js/imagens.js` e publique de novo.
“Repor imagens originais” volta às imagens definidas em `imagens.js`.

## 5. Pedidos de orçamento e contacto

- O formulário valida os dados no navegador e abre o **WhatsApp com a mensagem pré-preenchida** (se o número da empresa estiver
  em `config.js`; caso contrário o WhatsApp deixa escolher o contacto).
- **Nada é guardado** em base de dados nem simulado: o pedido segue pelo WhatsApp.
- **Opcional — integração externa**: em `config.js`, `envio.formularioExterno`, indique o endereço de um serviço de formulários
  gratuito (por exemplo Formspree ou Web3Forms). Surge então um segundo botão “Enviar por formulário”. Deixe vazio para usar só o WhatsApp.
  (Cada serviço requer criar conta própria e obter o seu endereço de envio.)

## 6. Publicar o website

O website é uma pasta de ficheiros estáticos; não há “build”. O ficheiro de entrada é `index.html`.

- **Netlify**: em app.netlify.com → *Add new site → Deploy manually* → arraste a pasta do projecto. (`netlify.toml` e `_headers` já incluídos.)
- **Cloudflare Pages**: *Create project → Direct Upload* → envie a pasta. (usa `_headers`.)
- **Vercel**: importe a pasta/repositório; *Framework preset: Other*, sem comando de build, directório de saída `.`. (`vercel.json` incluído.)
- **GitHub Pages**: crie um repositório, envie os ficheiros, *Settings → Pages → Deploy from a branch → main / (root)*. (`.nojekyll` incluído.)

### Domínio próprio
1. Adicione o domínio na plataforma escolhida (*Domains / Custom domain*).
2. No registador do domínio, crie os registos DNS indicados pela plataforma (CNAME para `www` e A/ALIAS para o domínio raiz).
3. Active o HTTPS (automático nestas plataformas).
4. Em `config.js`, preencha `empresa.urlSite` (por exemplo `"https://www.seudominio.co.mz"`) para o SEO.
5. Crie um `sitemap.xml` com os endereços reais das páginas e acrescente a linha `Sitemap: …` ao `robots.txt`.

## 7. SEO e acessibilidade
Títulos e descrições por página, dados estruturados (JSON-LD, só com campos preenchidos), imagens com texto alternativo e carregamento
diferido, navegação por teclado, menu móvel, respeito por “reduzir movimento”. Os textos principais são montados por JavaScript a partir de
`config.js`; os motores de pesquisa modernos executam JavaScript, mas, se pretender SEO máximo, mantenha os títulos/descrições de cada
página nos ficheiros `.html`.

## 8. Notas
- Fontes (Montserrat e Inter) e o mapa carregam de serviços externos; sem internet, o website usa tipos de letra do sistema.
- O Gestor de imagens não é indexado pelos motores de pesquisa (`noindex`) mas é acessível a quem conhecer o endereço; **não contém dados
  sensíveis** (guarda apenas no navegador de cada pessoa). Se preferir, apague `gestor-imagens.html` e `assets/js/gestor.js` antes de publicar.
