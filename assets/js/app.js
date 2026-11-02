/* ==========================================================================
   SHAQUIL CONSTRUÇÕES — Lógica do website (sem backend, sem dependências)
   Lê os conteúdos de config.js e imagens.js e constrói menu, rodapé,
   carrosséis, galeria, formulários e ligação ao WhatsApp.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG, I = window.IMAGENS_CONFIG;
  var PAGINA = document.body.getAttribute("data-pagina") || "";
  var DADOS = null; // imagens efectivas (config ou gestor local)

  /* ------------------------------ utilitários ------------------------------ */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Texto com marcas [PROVISÓRIO] realçadas
  function txt(s) { return esc(s).replace(/\[([^\]]+)\]/g, '<mark class="prov">[$1]</mark>'); }
  function obter(caminho) {
    return caminho.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
  function digitos(s) { return String(s || "").replace(/\D/g, ""); }
  function waLink(texto) {
    var n = digitos(C.contactos.whatsapp);
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "");
  }
  function nomeCat(id) {
    var c = I.categorias.filter(function (x) { return x.id === id; })[0];
    return c ? c.nome : id;
  }
  function ehIlustrativa(src) {
    var all = (DADOS ? DADOS.carrossel.concat(DADOS.galeria) : []);
    for (var i = 0; i < all.length; i++) if (all[i].src === src) return !!all[i].ilustrativa;
    return /\.svg$/i.test(src) && src.indexOf("/galeria/") < 0;
  }
  function chip(src) { return ehIlustrativa(src) ? '<span class="chip-ilus">Ilustrativa</span>' : ""; }
  function servicoImg(id) {
    return (I.servicos && I.servicos[id]) || (DADOS && DADOS.carrossel[0] && DADOS.carrossel[0].src) || "";
  }

  var ICONES = {
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    tel: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    rel: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c.5 2 2.5 4 5 5"/></svg>'
  };
  var WA_GLIFO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.86 9.86 0 0 1 2.2 11.9C2.2 6.45 6.64 2 12.1 2c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.9-9.93 9.9zM20.46 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.49-8.41z"/></svg>';

  /* ------------------------- aplicar configuração ------------------------- */
  function aplicarCores() {
    var r = document.documentElement.style, c = C.cores;
    r.setProperty("--marinho", c.marinho); r.setProperty("--marinho-claro", c.marinhoClaro);
    r.setProperty("--dourado", c.dourado); r.setProperty("--cinzento", c.cinzento); r.setProperty("--fundo", c.fundo);
  }
  function aplicarTextos() {
    $$("[data-cfg]").forEach(function (e) {
      var v = obter(e.getAttribute("data-cfg"));
      if (typeof v === "string" && v) e.textContent = v;
    });
    $$("[data-cfg-html]").forEach(function (e) {
      var v = obter(e.getAttribute("data-cfg-html"));
      if (typeof v === "string" && v) e.innerHTML = txt(v);
    });
    $$("[data-ano]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
  }
  function meta() {
    var d = $('meta[name="description"]');
    if (!d) { d = document.createElement("meta"); d.name = "description"; document.head.appendChild(d); }
    if (!d.getAttribute("content")) d.setAttribute("content", C.empresa.descricao);
    var fav = $('link[rel="icon"]');
    if (fav && C.empresa.logotipo) fav.href = C.empresa.logotipo;
    if (C.empresa.urlSite) {
      var l = document.createElement("link"); l.rel = "canonical";
      l.href = C.empresa.urlSite.replace(/\/$/, "") + "/" + (PAGINA === "inicio" ? "" : location.pathname.split("/").pop());
      document.head.appendChild(l);
    }
    // Dados estruturados (apenas campos preenchidos)
    var ld = { "@context": "https://schema.org", "@type": "GeneralContractor", name: C.empresa.nome,
      description: C.empresa.descricao, address: { "@type": "PostalAddress", addressLocality: "Quelimane", addressCountry: "MZ" } };
    if (C.contactos.telefone) ld.telephone = C.contactos.telefone;
    if (C.contactos.email) ld.email = C.contactos.email;
    if (C.contactos.endereco) ld.address.streetAddress = C.contactos.endereco;
    if (C.empresa.urlSite) ld.url = C.empresa.urlSite;
    var redes = C.redes.filter(function (r) { return r.url; }).map(function (r) { return r.url; });
    if (redes.length) ld.sameAs = redes;
    var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  /* --------------------------- cabeçalho e rodapé --------------------------- */
  var MENU = [
    ["inicio", "index.html", "Início"], ["sobre", "sobre.html", "Acerca de nós"],
    ["servicos", "servicos.html", "Serviços"], ["galeria", "galeria.html", "Galeria"],
    ["contactos", "contactos.html", "Contactos"]
  ];
  function cabecalho() {
    var e = C.empresa;
    var itens = MENU.map(function (m) {
      return '<li><a href="' + m[1] + '"' + (m[0] === PAGINA ? ' aria-current="page"' : "") + ">" + m[2] + "</a></li>";
    }).join("");
    itens += '<li><a class="menu-cta" href="orcamento.html"' + (PAGINA === "orcamento" ? ' aria-current="page"' : "") + ">Pedir orçamento</a></li>";
    document.body.insertAdjacentHTML("afterbegin",
      '<a class="skip" href="#conteudo">Saltar para o conteúdo</a>' +
      '<header class="site-header" id="topo"><div class="container">' +
      '<a class="marca" href="index.html" aria-label="' + esc(e.nome) + ' — página inicial">' +
      '<img src="' + esc(e.logotipo) + '" alt="Logótipo ' + esc(e.nome) + '" width="46" height="46">' +
      '<span class="marca-texto">' + esc(e.nomeCurto) + "<small>" + esc(e.sufixo) + "</small></span></a>" +
      '<button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><span></span></button>' +
      '<nav aria-label="Navegação principal"><ul class="menu" id="menu">' + itens + "</ul></nav></div></header>");
    var hd = $(".site-header"), bt = $(".burger"), mn = $("#menu");
    function fechar() { mn.classList.remove("aberto"); bt.setAttribute("aria-expanded", "false"); bt.setAttribute("aria-label", "Abrir menu"); }
    bt.addEventListener("click", function () {
      var ab = mn.classList.toggle("aberto");
      bt.setAttribute("aria-expanded", ab); bt.setAttribute("aria-label", ab ? "Fechar menu" : "Abrir menu");
    });
    $$("a", mn).forEach(function (a) { a.addEventListener("click", fechar); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") fechar(); });
    function aoRolar() {
      hd.classList.toggle("solido", window.scrollY > 30);
      var t = $(".topo"); if (t) t.classList.toggle("ver", window.scrollY > 700);
    }
    window.addEventListener("scroll", aoRolar, { passive: true }); aoRolar();
  }

  function contactoItens() {
    var c = C.contactos, n = digitos(c.whatsapp);
    function def(v) { return v ? esc(v) : '<span class="por-definir">A definir</span>'; }
    return [
      { ico: ICONES.pin, t: "Localização", v: esc(C.empresa.cidade) + (c.endereco ? "<br>" + esc(c.endereco) : "") },
      { ico: ICONES.tel, t: "Telefone", v: c.telefone ? '<a href="tel:' + esc(c.telefone.replace(/[^\d+]/g, "")) + '">' + esc(c.telefone) + "</a>" : def("") },
      { ico: ICONES.wa, t: "WhatsApp", v: n ? '<a href="' + waLink("Olá, gostaria de falar com a " + C.empresa.nome + ".") + '" target="_blank" rel="noopener">' + esc(c.whatsapp) + "</a>" : def("") },
      { ico: ICONES.mail, t: "E-mail", v: c.email ? '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" : def("") },
      { ico: ICONES.rel, t: "Horário de funcionamento", v: def(c.horario) }
    ];
  }
  function redesHtml() {
    var l = C.redes.filter(function (r) { return r.url; });
    if (!l.length) return "";
    return '<ul class="redes">' + l.map(function (r) {
      return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' + esc(r.nome) + "</a></li>";
    }).join("") + "</ul>";
  }
  function rodape() {
    var e = C.empresa, c = C.contactos;
    var links = MENU.map(function (m) { return '<li><a href="' + m[1] + '">' + m[2] + "</a></li>"; }).join("") +
      '<li><a href="orcamento.html">Reservas e pedidos de orçamento</a></li>';
    function lin(v, h) { return v ? (h ? '<a href="' + h + '">' + esc(v) + "</a>" : esc(v)) : '<span class="por-definir">A definir</span>'; }
    var n = digitos(c.whatsapp);
    document.body.insertAdjacentHTML("beforeend",
      '<footer class="rodape"><div class="container"><div class="rodape-grelha">' +
      '<div><a class="marca" href="index.html"><img src="' + esc(e.logotipo) + '" alt="" width="46" height="46"><span class="marca-texto">' +
      esc(e.nomeCurto) + "<small>" + esc(e.sufixo) + "</small></span></a><p>" + esc(e.slogan) + "</p>" + redesHtml() + "</div>" +
      '<div><h4>Navegação</h4><ul>' + links + "</ul></div>" +
      '<div><h4>Contactos</h4><ul><li>' + esc(e.cidade) + (c.endereco ? " — " + esc(c.endereco) : "") + "</li>" +
      "<li>" + lin(c.telefone, c.telefone && "tel:" + c.telefone.replace(/[^\d+]/g, "")) + "</li>" +
      "<li>" + (n ? '<a href="' + waLink("Olá!") + '" target="_blank" rel="noopener">WhatsApp: ' + esc(c.whatsapp) + "</a>" : "WhatsApp: " + lin("")) + "</li>" +
      "<li>" + lin(c.email, c.email && "mailto:" + c.email) + "</li><li>" + lin(c.horario) + "</li></ul></div></div>" +
      '<div class="rodape-fim"><span>© <span data-ano></span> ' + esc(e.nome) + ". Todos os direitos reservados.</span>" +
      '<a href="gestor-imagens.html">Gestor de imagens</a></div></div></footer>' +
      '<a class="wa-flutuante" href="' + waLink("Olá, gostaria de falar com a " + e.nome + ".") + '" target="_blank" rel="noopener" aria-label="Falar connosco no WhatsApp">' + WA_GLIFO + "</a>" +
      '<button class="topo" type="button" aria-label="Voltar ao topo">↑</button>');
    $(".topo").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ----------------------------- animações ----------------------------- */
  function revelar() {
    var els = $$(".rev:not(.visto)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("visto"); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("visto"); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ------------------------------ carrossel ------------------------------ */
  function criarCarrossel(opt) {
    // opt: {slides, lista, intervalo, aoMudar, pontos, legenda, ant, seg, raiz}
    var lista = opt.lista, n = lista.length, i = 0, tm = null, pausa = false;
    if (!n) return;
    lista.forEach(function (it, k) {
      var d = document.createElement("div");
      d.className = "hero-slide"; d.setAttribute("role", "img"); d.setAttribute("aria-label", it.alt || "");
      d.dataset.src = it.src; opt.slides.appendChild(d);
      if (k < 2) d.style.backgroundImage = 'url("' + it.src + '")';
    });
    var sl = $$(".hero-slide", opt.slides);
    var pontos = [];
    if (opt.pontos) lista.forEach(function (it, k) {
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Imagem " + (k + 1) + " de " + n);
      b.addEventListener("click", function () { ir(k, true); }); opt.pontos.appendChild(b); pontos.push(b);
    });
    function carregar(k) { var s = sl[(k + n) % n]; if (!s.style.backgroundImage) s.style.backgroundImage = 'url("' + s.dataset.src + '")'; }
    function ir(k, manual) {
      i = (k + n) % n; carregar(i); carregar(i + 1);
      sl.forEach(function (s, x) { s.classList.toggle("activo", x === i); });
      pontos.forEach(function (p, x) { p.classList.toggle("activo", x === i); p.setAttribute("aria-current", x === i ? "true" : "false"); });
      if (opt.legenda) opt.legenda.textContent = (lista[i].legenda || "") + (lista[i].ilustrativa ? " · Imagem ilustrativa" : "");
      if (opt.aoMudar) opt.aoMudar(i);
      if (manual) reiniciar();
    }
    function reiniciar() { clearInterval(tm); if (n > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) tm = setInterval(function () { if (!pausa && !document.hidden) ir(i + 1); }, opt.intervalo || 6000); }
    if (opt.ant) opt.ant.addEventListener("click", function () { ir(i - 1, true); });
    if (opt.seg) opt.seg.addEventListener("click", function () { ir(i + 1, true); });
    if (opt.raiz) {
      opt.raiz.addEventListener("mouseenter", function () { pausa = true; });
      opt.raiz.addEventListener("mouseleave", function () { pausa = false; });
      var x0 = null;
      opt.raiz.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      opt.raiz.addEventListener("touchend", function (e) {
        if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 50) ir(i + (dx < 0 ? 1 : -1), true);
      }, { passive: true });
    }
    ir(0); reiniciar();
  }

  /* ------------------------------ lightbox ------------------------------ */
  var LB = null;
  function lightbox(lista, inicio) {
    if (!LB) {
      var d = document.createElement("div");
      d.className = "lightbox"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", "Visualizador de fotografias");
      d.innerHTML = '<button class="lb-btn lb-fechar" type="button" aria-label="Fechar">✕</button>' +
        '<button class="lb-btn lb-ant" type="button" aria-label="Fotografia anterior">‹</button>' +
        "<figure><img alt=\"\"><figcaption></figcaption></figure>" +
        '<button class="lb-btn lb-seg" type="button" aria-label="Fotografia seguinte">›</button>';
      document.body.appendChild(d);
      LB = { el: d, img: $("img", d), cap: $("figcaption", d), lista: [], i: 0, foco: null };
      function fechar() { d.classList.remove("aberto"); document.body.style.overflow = ""; if (LB.foco) LB.foco.focus(); }
      function mover(k) { LB.i = (LB.i + k + LB.lista.length) % LB.lista.length; mostrar(); }
      LB.fechar = fechar; LB.mover = mover;
      $(".lb-fechar", d).addEventListener("click", fechar);
      $(".lb-ant", d).addEventListener("click", function () { mover(-1); });
      $(".lb-seg", d).addEventListener("click", function () { mover(1); });
      d.addEventListener("click", function (e) { if (e.target === d) fechar(); });
      document.addEventListener("keydown", function (e) {
        if (!d.classList.contains("aberto")) return;
        if (e.key === "Escape") fechar(); else if (e.key === "ArrowLeft") mover(-1); else if (e.key === "ArrowRight") mover(1);
      });
      var x0 = null;
      d.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      d.addEventListener("touchend", function (e) {
        if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
      }, { passive: true });
    }
    function mostrar() {
      var it = LB.lista[LB.i];
      LB.img.src = it.src; LB.img.alt = it.alt || it.titulo || "";
      LB.cap.innerHTML = esc(it.titulo || it.legenda || "") + "<small>" + esc(nomeCat(it.categoria)) +
        (it.ilustrativa ? " · Imagem ilustrativa" : "") + " · " + (LB.i + 1) + " / " + LB.lista.length + "</small>";
    }
    LB.lista = lista; LB.i = inicio; LB.foco = document.activeElement; mostrar();
    LB.el.classList.add("aberto"); document.body.style.overflow = "hidden"; $(".lb-fechar", LB.el).focus();
  }

  /* ------------------------------- HOME ------------------------------- */
  function cartaoServico(s, k) {
    return '<article class="cartao rev"><div class="cartao-img"><img src="' + esc(servicoImg(s.id)) + '" alt="Imagem ilustrativa: ' + esc(s.titulo) + '" loading="lazy" decoding="async">' +
      '<span class="cartao-num">' + ("0" + (k + 1)).slice(-2) + "</span>" + chip(servicoImg(s.id)) + "</div>" +
      '<div class="cartao-corpo"><h3>' + esc(s.titulo) + "</h3><p>" + esc(s.texto) + "</p>" +
      '<div class="cartao-acoes"><a class="btn btn-marinho btn-peq" href="orcamento.html?servico=' + encodeURIComponent(s.id) + '">Solicitar orçamento</a></div></div></article>';
  }
  function paginaInicio() {
    // Hero
    var logo = $("#hero-logo"); if (logo) logo.src = C.empresa.logotipo;
    var fr = $("#hero-frase"), frases = C.inicio.frases;
    fr.innerHTML = frases.map(function (f) { return "<span>" + esc(f) + "</span>"; }).join("");
    var spans = $$("span", fr);
    criarCarrossel({
      slides: $("#hero-slides"), lista: DADOS.carrossel, intervalo: C.inicio.intervaloMs, raiz: $("#hero"),
      pontos: $("#hero-pontos"), legenda: $("#hero-legenda"), ant: $("#hero-ant"), seg: $("#hero-seg"),
      aoMudar: function (i) { spans.forEach(function (s, k) { s.classList.toggle("activo", k === i % spans.length); }); }
    });
    // Apresentação
    var im = $("#apres-img"); im.src = I.paginas.sobre;
    var nota = $("#apres-nota");
    if (ehIlustrativa(I.paginas.sobre)) nota.textContent = C.textos.avisoImagens; else nota.remove();
    // Serviços em destaque
    $("#serv-destaque").innerHTML = C.servicos.slice(0, 6).map(cartaoServico).join("");
    // Galeria em destaque
    var vistos = {}, dest = [];
    DADOS.galeria.forEach(function (g) { if (dest.length < 4 && !vistos[g.categoria]) { vistos[g.categoria] = 1; dest.push(g); } });
    if (dest.length < 4) DADOS.galeria.forEach(function (g) { if (dest.length < 4 && dest.indexOf(g) < 0) dest.push(g); });
    $("#gal-destaque").innerHTML = dest.map(function (g) {
      return '<a class="destaque rev" href="galeria.html' + (g.categoria ? "?cat=" + encodeURIComponent(g.categoria) : "") + '"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" decoding="async">' + (g.ilustrativa ? '<span class="chip-ilus">Ilustrativa</span>' : "") + "<span>" + esc(nomeCat(g.categoria) || g.titulo) + "</span></a>";
    }).join("");
    var gn = $("#gal-nota");
    if (dest.some(function (g) { return g.ilustrativa; })) gn.textContent = C.textos.avisoImagens; else gn.remove();
    // Vantagens
    $("#vantagens-grelha").innerHTML = C.inicio.vantagens.map(function (v, k) {
      return '<div class="vantagem rev"><span class="num">' + ("0" + (k + 1)).slice(-2) + "</span><h3>" + esc(v.titulo) + "</h3><p>" + esc(v.texto) + "</p></div>";
    }).join("");
    // Testemunhos
    var ts = C.inicio.testemunhos || [];
    if (ts.length) {
      $("#testemunhos-grelha").innerHTML = ts.map(function (t) {
        return '<blockquote class="testemunho rev" style="margin:0"><p>“' + esc(t.texto) + "”</p><strong>" + esc(t.autor) + "</strong><small>" + esc(t.cargo || "") + "</small></blockquote>";
      }).join("");
    } else { $("#testemunhos").remove(); }
  }

  /* ----------------------------- SOBRE ----------------------------- */
  function paginaSobre() {
    var s = C.sobre;
    $("#sobre-aviso").textContent = s.aviso;
    $("#sobre-quem").innerHTML = txt(s.quemSomos);
    $("#sobre-historia").innerHTML = txt(s.historia);
    $("#sobre-missao").innerHTML = txt(s.missao);
    $("#sobre-visao").innerHTML = txt(s.visao);
    $("#sobre-valores").innerHTML = s.valores.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("");
    $("#sobre-objectivos").innerHTML = s.objectivos.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("");
    $("#sobre-qualidade").innerHTML = txt(s.qualidade);
    $("#sobre-seguranca").innerHTML = txt(s.seguranca);
    $("#sobre-ambiente").innerHTML = txt(s.ambiente);
    $("#sobre-capacidade").innerHTML = txt(s.capacidade);
    var im = $("#sobre-img"); im.src = I.paginas.sobre;
    var n = $("#sobre-nota"); if (ehIlustrativa(I.paginas.sobre)) n.textContent = C.textos.avisoImagens; else n.remove();
  }

  /* --------------------------- SERVIÇOS --------------------------- */
  function paginaServicos() {
    $("#serv-grelha").innerHTML = C.servicos.map(cartaoServico).join("");
    var n = $("#serv-nota");
    if (C.servicos.some(function (s) { return ehIlustrativa(servicoImg(s.id)); })) n.textContent = C.textos.avisoImagens; else n.remove();
  }

  /* --------------------------- FORMULÁRIOS --------------------------- */
  function marcarErro(campo, msg) {
    var box = campo.closest(".campo"); box.classList.toggle("erro", !!msg);
    var m = $(".erro-msg", box); if (m) m.textContent = msg || "";
    campo.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  function validar(form) {
    var primeiro = null, ok = true;
    $$("input, select, textarea", form).forEach(function (c) {
      if (c.type === "file" || !c.name) return;
      var v = c.value.trim(), msg = "";
      if (c.required && !v) msg = "Campo obrigatório.";
      else if (v && c.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Indique um e-mail válido.";
      else if (v && c.name === "telefone" && digitos(v).length < 7) msg = "Indique um número de telefone válido.";
      marcarErro(c, msg);
      if (msg) { ok = false; if (!primeiro) primeiro = c; }
    });
    if (primeiro) primeiro.focus();
    return ok;
  }
  function dataPt(v) { var p = String(v || "").split("-"); return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : v; }
  function mensagem(form, titulo) {
    var linhas = ["*" + titulo + " — " + C.empresa.nome + "*"];
    $$("[data-rotulo]", form).forEach(function (c) {
      var v = c.value.trim(); if (!v) return;
      if (c.type === "date") v = dataPt(v);
      if (c.tagName === "SELECT") v = c.options[c.selectedIndex].text;
      linhas.push(c.getAttribute("data-rotulo") + ": " + v);
    });
    return linhas.join("\n");
  }
  function ligarFormulario(form, titulo) {
    var res = $("#resultado");
    var aviso = $("#aviso-wa");
    if (aviso && !digitos(C.contactos.whatsapp)) {
      aviso.hidden = false;
      aviso.textContent = "O número de WhatsApp da empresa ainda não foi configurado (config.js). Ao enviar, o WhatsApp abre com a mensagem pronta para escolher o contacto.";
    } else if (aviso) aviso.remove();
    $$("input, select, textarea", form).forEach(function (c) {
      c.addEventListener("input", function () { if (c.closest(".campo").classList.contains("erro")) marcarErro(c, ""); });
    });
    function mostrar(tipo, html) { res.className = "alerta alerta-" + tipo; res.innerHTML = html; res.hidden = false; res.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    $("#btn-wa", form).addEventListener("click", function () {
      if (!validar(form)) return;
      var m = mensagem(form, titulo), url = waLink(m);
      var w = window.open(url, "_blank"); // (com "noopener" o navegador devolveria sempre null)
      if (w) { try { w.opener = null; } catch (er) { /* ignorar */ } }
      mostrar("ok", "<strong>Mensagem preparada.</strong> " + (w ? "Abrimos o WhatsApp com os dados preenchidos — confirme o envio na aplicação." :
        'O navegador bloqueou a nova janela. <a href="' + esc(url) + '" target="_blank" rel="noopener">Clique aqui para abrir o WhatsApp</a>.') +
        '<br><button type="button" class="mini-btn" id="copiar" style="margin-top:10px">Copiar mensagem</button>');
      var cp = $("#copiar"); if (cp) cp.addEventListener("click", function () {
        (navigator.clipboard ? navigator.clipboard.writeText(m) : Promise.reject()).then(function () { cp.textContent = "Copiado!"; }, function () {
          var t = document.createElement("textarea"); t.value = m; document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); cp.textContent = "Copiado!"; } catch (e) { cp.textContent = "Não foi possível copiar"; } t.remove();
        });
      });
    });
    var ext = $("#btn-ext", form), url = C.envio.formularioExterno;
    if (ext && url) {
      ext.hidden = false;
      ext.addEventListener("click", function () {
        if (!validar(form)) return;
        var fd = new FormData(); fd.append("_subject", titulo + " — " + C.empresa.nome); fd.append("mensagem", mensagem(form, titulo).replace(/\*/g, ""));
        $$("[data-rotulo]", form).forEach(function (c) { fd.append(c.name, c.value); });
        ext.disabled = true; var t0 = ext.textContent; ext.textContent = "A enviar…";
        fetch(url, { method: "POST", body: fd, headers: { Accept: "application/json" } }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          mostrar("ok", "<strong>Pedido enviado.</strong> Obrigado! Entraremos em contacto consigo."); form.reset();
        }).catch(function () {
          mostrar("aviso", "Não foi possível enviar por este canal. Use o botão de WhatsApp.");
        }).then(function () { ext.disabled = false; ext.textContent = t0; });
      });
    } else if (ext) ext.remove();
    form.addEventListener("submit", function (e) { e.preventDefault(); $("#btn-wa", form).click(); });
  }
  function paginaOrcamento() {
    var sel = $("#servico");
    sel.innerHTML = '<option value="">— Seleccione o serviço —</option>' + C.servicos.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.titulo) + "</option>"; }).join("") + '<option value="outro">Outro / não sei indicar</option>';
    var q = new URLSearchParams(location.search).get("servico"); if (q) sel.value = q;
    if (sel.value !== q) sel.value = "";
    var d = $("#data"); var hoje = new Date(); hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset()); d.min = hoje.toISOString().slice(0, 10);
    ligarFormulario($("#form-orcamento"), "Pedido de orçamento");
  }
  function paginaContactos() {
    $("#contacto-lista").innerHTML = contactoItens().map(function (c) {
      return '<div class="contacto-item"><span class="ico">' + c.ico + "</span><div><h3>" + c.t + "</h3><p>" + c.v + "</p></div></div>";
    }).join("");
    $("#contacto-redes").innerHTML = redesHtml() || '<p class="por-definir">As redes sociais serão indicadas em breve.</p>';
    $("#mapa-iframe").src = "https://www.google.com/maps?q=" + encodeURIComponent(C.contactos.mapaPesquisa) + "&hl=pt&z=13&output=embed";
    ligarFormulario($("#form-contacto"), "Mensagem de contacto");
  }

  /* ------------------------------ GALERIA ------------------------------ */
  function paginaGaleria() {
    var lista = DADOS.galeria, cat = new URLSearchParams(location.search).get("cat") || "todas";
    var cats = I.categorias.filter(function (c) { return lista.some(function (g) { return g.categoria === c.id; }); });
    if (cat !== "todas" && !cats.some(function (c) { return c.id === cat; })) cat = "todas";
    var f = $("#filtros"), gr = $("#galeria-grelha"), atual = [];
    f.innerHTML = [{ id: "todas", nome: "Todas" }].concat(cats).map(function (c) {
      return '<button type="button" class="filtro" data-cat="' + esc(c.id) + '">' + esc(c.nome) + "</button>";
    }).join("");
    function desenhar() {
      $$(".filtro", f).forEach(function (b) { var a = b.getAttribute("data-cat") === cat; b.classList.toggle("activo", a); b.setAttribute("aria-pressed", a); });
      atual = lista.filter(function (g) { return cat === "todas" || g.categoria === cat; });
      gr.innerHTML = atual.length ? atual.map(function (g, k) {
        return '<button type="button" class="foto" data-i="' + k + '" aria-label="Ampliar: ' + esc(g.titulo || g.alt) + '" style="animation-delay:' + Math.min(k * 40, 400) + 'ms">' +
          '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" decoding="async">' + (g.ilustrativa ? '<span class="chip-ilus">Ilustrativa</span>' : "") + "<figcaption>" + esc(g.titulo) + "</figcaption></button>";
      }).join("") : '<p class="vazio">Ainda não existem fotografias nesta categoria.</p>';
    }
    f.addEventListener("click", function (e) { var b = e.target.closest(".filtro"); if (!b) return; cat = b.getAttribute("data-cat"); desenhar(); });
    gr.addEventListener("click", function (e) { var b = e.target.closest(".foto"); if (b) lightbox(atual, +b.getAttribute("data-i")); });
    desenhar();
    // carrossel automático da galeria (primeiras 8)
    criarCarrossel({
      slides: $("#gal-slides"), lista: lista.slice(0, 8), intervalo: 5000, raiz: $("#gal-carrossel"),
      legenda: $("#gal-legenda"), ant: $("#gal-ant"), seg: $("#gal-seg")
    });
    var n = $("#gal-aviso");
    if (lista.some(function (g) { return g.ilustrativa; })) n.textContent = C.textos.avisoImagens; else n.remove();
  }

  /* ------------------------------ arranque ------------------------------ */
  function aviso_local() {
    if (!DADOS || !(DADOS.local.carrossel || DADOS.local.galeria)) return;
    var a = document.createElement("a"); a.href = "gestor-imagens.html"; a.className = "aviso-local";
    a.textContent = "Pré-visualização local: a mostrar imagens do Gestor (só neste navegador)";
    document.body.appendChild(a);
  }
  function iniciar() {
    aplicarCores(); meta(); cabecalho(); rodape();
    aplicarTextos();
    $$("[data-hero-img]").forEach(function (e) { var s = I.paginas[e.getAttribute("data-hero-img")]; if (s) e.style.backgroundImage = 'url("' + s + '")'; });
    var acao = { inicio: paginaInicio, sobre: paginaSobre, servicos: paginaServicos, orcamento: paginaOrcamento, galeria: paginaGaleria, contactos: paginaContactos }[PAGINA];
    var carregar = window.ImagensStore ? window.ImagensStore.carregar() : Promise.reject();
    carregar.catch(function () {
      return { carrossel: I.carrossel.map(function (x) { return { src: x.src, alt: x.alt, legenda: x.legenda, titulo: x.legenda, categoria: "", ilustrativa: !!x.ilustrativa }; }),
               galeria: I.galeria.map(function (x) { return { src: x.src, alt: x.alt, titulo: x.titulo, legenda: x.titulo, categoria: x.categoria, ilustrativa: !!x.ilustrativa }; }), local: {} };
    }).then(function (d) {
      DADOS = d; window.SHAQ_DADOS = d;
      if (acao) acao();
      aviso_local(); revelar();
      document.dispatchEvent(new CustomEvent("shaquil:pronto"));
    });
  }
  window.SHAQ = { esc: esc, waLink: waLink, nomeCat: nomeCat, config: C, imagens: I };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
