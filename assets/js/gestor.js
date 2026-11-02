/* ==========================================================================
   Gestor de imagens (apenas no navegador)
   - Guarda em IndexedDB deste navegador (NÃO é visto pelos visitantes).
   - "Exportar para publicação" gera imagens.js + descarrega as imagens.
   ========================================================================== */
(function () {
  "use strict";
  var Store = window.ImagensStore, I = window.IMAGENS_CONFIG, esc = window.SHAQ.esc;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var estado = { lista: "carrossel", dados: { carrossel: null, galeria: null }, local: { carrossel: false, galeria: false }, lote: [] };
  var urls = {}; // blob -> url de pré-visualização
  var seq = 0;

  function msg(tipo, html) { var e = $("#gestor-estado"); e.className = "alerta alerta-" + tipo; e.innerHTML = html; }
  function id() { return "i" + Date.now().toString(36) + (seq++); }
  function slug(n) {
    return n.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "foto";
  }
  function previewUrl(r) {
    if (!r.blob) return r.src;
    if (!urls[r.id]) urls[r.id] = URL.createObjectURL(r.blob);
    return urls[r.id];
  }
  function doConfig(chave) {
    if (chave === "carrossel") return I.carrossel.map(function (x, k) { return { id: "c" + k, src: x.src, titulo: x.legenda, legenda: x.legenda, alt: x.alt, categoria: "", ilustrativa: !!x.ilustrativa }; });
    return I.galeria.map(function (x, k) { return { id: "g" + k, src: x.src, titulo: x.titulo, legenda: x.titulo, alt: x.alt, categoria: x.categoria, ilustrativa: !!x.ilustrativa }; });
  }

  /* ---------- processamento de ficheiros (redimensiona para ≤ 1920 px) ---------- */
  function carregarBitmap(file) {
    if (window.createImageBitmap) return createImageBitmap(file);
    return new Promise(function (res, rej) {
      var u = URL.createObjectURL(file), im = new Image();
      im.onload = function () { URL.revokeObjectURL(u); res(im); }; im.onerror = rej; im.src = u;
    });
  }
  function processar(file) {
    var base = slug(file.name);
    if (/svg/i.test(file.type) || /\.svg$/i.test(file.name)) return Promise.resolve({ blob: file, ficheiro: base + ".svg" });
    return carregarBitmap(file).then(function (bm) {
      var w = bm.width, h = bm.height, max = 1920, k = Math.min(1, max / Math.max(w, h));
      var c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k);
      c.getContext("2d").drawImage(bm, 0, 0, c.width, c.height);
      return new Promise(function (res, rej) {
        c.toBlob(function (b) { b ? res({ blob: b, ficheiro: base + ".jpg" }) : rej(new Error("toBlob")); }, "image/jpeg", 0.85);
      });
    });
  }
  function ficheiroUnico(nome) {
    var usados = {};
    ["carrossel", "galeria"].forEach(function (l) { (estado.dados[l] || []).forEach(function (r) { if (r.ficheiro) usados[r.ficheiro] = 1; }); });
    estado.lote.forEach(function (r) { if (r.ficheiro) usados[r.ficheiro] = 1; });
    var m = nome.match(/^(.*?)(\.[^.]+)$/), b = m[1], e = m[2], n = nome, k = 2;
    while (usados[n]) n = b + "-" + (k++) + e;
    return n;
  }

  /* ------------------------------- persistência ------------------------------- */
  function guardar() {
    var l = estado.lista;
    return Store.gravar(l, estado.dados[l]).then(function () {
      estado.local[l] = true; desenhar();
      msg("ok", "Alterações guardadas <strong>neste navegador</strong>. Os visitantes do website só verão estas imagens depois de usar “Exportar para publicação” e publicar de novo.");
    }, function () {
      msg("aviso", "Não foi possível guardar no navegador (espaço insuficiente ou armazenamento bloqueado, por exemplo em janela privada).");
    });
  }

  /* --------------------------------- interface --------------------------------- */
  function opcoesCat(sel) {
    return I.categorias.map(function (c) { return '<option value="' + esc(c.id) + '"' + (c.id === sel ? " selected" : "") + ">" + esc(c.nome) + "</option>"; }).join("");
  }
  function desenhar() {
    var l = estado.lista, lista = estado.dados[l], g = $("#gestor-lista"), gal = l === "galeria";
    $("#contagem").textContent = "(" + lista.length + ")";
    $$("[data-lista]").forEach(function (b) { var a = b.getAttribute("data-lista") === l; b.classList.toggle("activo", a); b.setAttribute("aria-selected", a); });
    g.innerHTML = lista.length ? lista.map(function (r, k) {
      return '<div class="item-img" data-id="' + esc(r.id) + '"><div class="thumb"><img src="' + esc(previewUrl(r)) + '" alt="' + esc(r.alt || "") + '"><span class="pos">' + (k + 1) + "</span></div>" +
        '<div class="corpo">' + (gal ? '<select data-campo="categoria" aria-label="Categoria">' + opcoesCat(r.categoria) + "</select>" : "") +
        '<input type="text" data-campo="titulo" value="' + esc(gal ? r.titulo : r.legenda) + '" placeholder="' + (gal ? "Título" : "Legenda") + '" aria-label="' + (gal ? "Título" : "Legenda") + '">' +
        '<div class="btns"><button class="mini-btn" data-acao="sobe" type="button" aria-label="Mover para trás"' + (k === 0 ? " disabled" : "") + '>↑</button>' +
        '<button class="mini-btn" data-acao="desce" type="button" aria-label="Mover para a frente"' + (k === lista.length - 1 ? " disabled" : "") + '>↓</button>' +
        '<button class="mini-btn" data-acao="subst" type="button">Substituir</button>' +
        '<button class="mini-btn perigo" data-acao="rem" type="button">Remover</button></div></div></div>';
    }).join("") : '<p class="vazio">Esta lista está vazia. Adicione fotografias acima.</p>';
    if (!estado.local[l]) msg("info", "A mostrar as imagens definidas em <code>imagens.js</code>. Qualquer alteração cria uma cópia local neste navegador.");
  }

  function mostrarLote() {
    var gal = estado.lista === "galeria", lote = estado.lote;
    $("#lote").hidden = !lote.length;
    $("#lote-grelha").innerHTML = lote.map(function (r) {
      return '<div class="item-img" data-id="' + esc(r.id) + '"><div class="thumb"><img src="' + esc(previewUrl(r)) + '" alt="Pré-visualização"></div><div class="corpo">' +
        (gal ? '<select data-campo="categoria" aria-label="Categoria">' + opcoesCat(r.categoria) + "</select>" : "") +
        '<input type="text" data-campo="titulo" value="' + esc(r.titulo) + '" placeholder="' + (gal ? "Título" : "Legenda") + '"></div></div>';
    }).join("");
  }

  function aceitar(files) {
    var imgs = Array.prototype.filter.call(files, function (f) { return /^image\//.test(f.type) || /\.(jpe?g|png|webp|gif|svg|avif)$/i.test(f.name); });
    if (!imgs.length) { msg("aviso", "Nenhum dos ficheiros é uma imagem."); return; }
    msg("info", "A preparar " + imgs.length + " imagem(ns)…");
    var falhas = 0;
    imgs.reduce(function (p, f) {
      return p.then(function () {
        return processar(f).then(function (r) {
          var rec = { id: id(), blob: r.blob, ficheiro: ficheiroUnico(r.ficheiro), categoria: I.categorias[0].id, titulo: slug(f.name).replace(/-/g, " "), alt: "" };
          estado.lote.push(rec);
        }, function () { falhas++; });
      });
    }, Promise.resolve()).then(function () {
      mostrarLote();
      msg(falhas ? "aviso" : "info", "Reveja a pré-visualização e escolha a categoria; depois clique em “Adicionar à lista”." + (falhas ? " " + falhas + " ficheiro(s) não puderam ser lidos." : ""));
    });
  }

  function substituir(rid) {
    var inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
    inp.addEventListener("change", function () {
      if (!inp.files[0]) return;
      processar(inp.files[0]).then(function (r) {
        var rec = estado.dados[estado.lista].filter(function (x) { return x.id === rid; })[0];
        if (!rec) return;
        if (urls[rid]) { URL.revokeObjectURL(urls[rid]); delete urls[rid]; }
        rec.blob = r.blob; rec.ficheiro = ficheiroUnico(r.ficheiro); delete rec.src; rec.ilustrativa = false;
        guardar();
      }, function () { msg("aviso", "Não foi possível ler a imagem escolhida."); });
    });
    inp.click();
  }

  /* --------------------------------- exportação --------------------------------- */
  function exportar() {
    function pasta(r) { return r.blob ? "assets/images/galeria/" + r.ficheiro : r.src; }
    var car = estado.dados.carrossel.map(function (r) { var o = { src: pasta(r), alt: r.alt || r.legenda || "Fotografia", legenda: r.legenda || r.titulo || "" }; if (r.ilustrativa) o.ilustrativa = true; return o; });
    var gal = estado.dados.galeria.map(function (r) { var o = { src: pasta(r), categoria: r.categoria, titulo: r.titulo || "", alt: r.alt || r.titulo || "Fotografia" }; if (r.ilustrativa) o.ilustrativa = true; return o; });
    var js = "/* Gerado pelo Gestor de imagens em " + new Date().toLocaleString("pt-PT") + ".\n   Substitua assets/js/imagens.js por este ficheiro e copie as imagens descarregadas\n   para assets/images/galeria/. Depois publique de novo o website. */\n\n" +
      "window.IMAGENS_CONFIG = {\n  categorias: " + JSON.stringify(I.categorias, null, 2) + ",\n  carrossel: " + JSON.stringify(car, null, 2) +
      ",\n  galeria: " + JSON.stringify(gal, null, 2) + ",\n  servicos: " + JSON.stringify(I.servicos, null, 2) + ",\n  paginas: " + JSON.stringify(I.paginas, null, 2) + "\n};\n";
    descarregar(new Blob([js], { type: "text/javascript" }), "imagens.js");
    var todos = {}, ficheiros = [];
    estado.dados.carrossel.concat(estado.dados.galeria).forEach(function (r) { if (r.blob && !todos[r.ficheiro]) { todos[r.ficheiro] = 1; ficheiros.push(r); } });
    ficheiros.forEach(function (r, k) { setTimeout(function () { descarregar(r.blob, r.ficheiro); }, 500 * (k + 1)); });
    msg("ok", "Exportação iniciada: <strong>imagens.js</strong> + " + ficheiros.length + " imagem(ns). " +
      "Se o navegador pedir autorização para descarregar vários ficheiros, aceite. Depois copie as imagens para <code>assets/images/galeria/</code>, " +
      "substitua <code>assets/js/imagens.js</code> e publique de novo o website.");
  }
  function descarregar(blob, nome) {
    var u = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = u; a.download = nome; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
  }

  /* --------------------------------- arranque --------------------------------- */
  function iniciar() {
    Promise.all([Store.ler("carrossel"), Store.ler("galeria")]).then(function (r) {
      ["carrossel", "galeria"].forEach(function (l, k) {
        estado.local[l] = !!(r[k] && r[k].length);
        estado.dados[l] = estado.local[l] ? r[k] : doConfig(l);
      });
      desenhar();
      msg("info", "Pronto. Escolha a lista a gerir, adicione fotografias ou altere as existentes.");
    });

    $$("[data-lista]").forEach(function (b) {
      b.addEventListener("click", function () { estado.lista = b.getAttribute("data-lista"); estado.lote.forEach(function (x) { x.categoria = x.categoria || I.categorias[0].id; }); desenhar(); mostrarLote(); });
    });
    $("#ficheiros").addEventListener("change", function (e) { aceitar(e.target.files); e.target.value = ""; });
    var z = $("#zona");
    ["dragenter", "dragover"].forEach(function (ev) { z.addEventListener(ev, function (e) { e.preventDefault(); z.classList.add("sobre"); }); });
    ["dragleave", "drop"].forEach(function (ev) { z.addEventListener(ev, function (e) { e.preventDefault(); z.classList.remove("sobre"); }); });
    z.addEventListener("drop", function (e) { if (e.dataTransfer && e.dataTransfer.files.length) aceitar(e.dataTransfer.files); });

    $("#lote-grelha").addEventListener("input", function (e) {
      var c = e.target.getAttribute("data-campo"); if (!c) return;
      var rec = estado.lote.filter(function (x) { return x.id === e.target.closest(".item-img").getAttribute("data-id"); })[0];
      if (rec) rec[c] = e.target.value;
    });
    $("#lote-ok").addEventListener("click", function () {
      var l = estado.lista;
      estado.lote.forEach(function (r) {
        var o = { id: r.id, blob: r.blob, ficheiro: r.ficheiro, categoria: l === "galeria" ? r.categoria : "", titulo: r.titulo, legenda: r.titulo, alt: r.titulo };
        estado.dados[l].push(o);
      });
      var n = estado.lote.length; estado.lote = []; mostrarLote();
      guardar().then(function () { msg("ok", n + " imagem(ns) adicionada(s) e guardada(s) neste navegador. Lembre-se: os visitantes só as vêem após “Exportar para publicação” e nova publicação."); });
    });
    $("#lote-cancel").addEventListener("click", function () { estado.lote = []; mostrarLote(); msg("info", "Adição cancelada."); });

    $("#gestor-lista").addEventListener("click", function (e) {
      var b = e.target.closest("[data-acao]"); if (!b) return;
      var lista = estado.dados[estado.lista], rid = b.closest(".item-img").getAttribute("data-id");
      var k = lista.findIndex(function (x) { return x.id === rid; }), a = b.getAttribute("data-acao");
      if (a === "sobe" && k > 0) { lista.splice(k - 1, 0, lista.splice(k, 1)[0]); guardar(); }
      else if (a === "desce" && k < lista.length - 1) { lista.splice(k + 1, 0, lista.splice(k, 1)[0]); guardar(); }
      else if (a === "rem") { if (confirm("Remover esta imagem da lista?")) { lista.splice(k, 1); guardar(); } }
      else if (a === "subst") substituir(rid);
    });
    $("#gestor-lista").addEventListener("change", function (e) {
      var c = e.target.getAttribute("data-campo"); if (!c) return;
      var lista = estado.dados[estado.lista], rid = e.target.closest(".item-img").getAttribute("data-id");
      var rec = lista.filter(function (x) { return x.id === rid; })[0]; if (!rec) return;
      if (c === "categoria") rec.categoria = e.target.value;
      else { rec.titulo = e.target.value; rec.legenda = e.target.value; if (!rec.alt || estado.lista === "carrossel") rec.alt = e.target.value; }
      guardar();
    });

    $("#exportar").addEventListener("click", exportar);
    $("#repor").addEventListener("click", function () {
      if (!confirm("Repor as imagens originais (de imagens.js) nesta lista? As alterações locais desta lista serão apagadas deste navegador.")) return;
      var l = estado.lista;
      Store.apagar(l).then(function () {
        estado.local[l] = false; estado.dados[l] = doConfig(l); desenhar();
        msg("ok", "Lista reposta: a usar novamente as imagens de imagens.js.");
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
