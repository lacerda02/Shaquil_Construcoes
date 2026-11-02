/* ==========================================================================
   Armazenamento local de imagens (IndexedDB) — usado pelo Gestor de imagens.
   ATENÇÃO: os dados ficam guardados APENAS neste navegador, neste computador.
   Não são enviados para nenhum servidor, não sincronizam com outros
   dispositivos e NÃO são vistos pelos visitantes do website.
   ========================================================================== */
(function () {
  "use strict";
  var DB = "shaquil-imagens", ST = "listas";

  function abrir() {
    return new Promise(function (res, rej) {
      if (!window.indexedDB) { rej(new Error("IndexedDB indisponível")); return; }
      var r;
      try { r = indexedDB.open(DB, 1); } catch (e) { rej(e); return; }
      r.onupgradeneeded = function () { r.result.createObjectStore(ST, { keyPath: "chave" }); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
  }

  function tx(modo, fn) {
    return abrir().then(function (db) {
      return new Promise(function (res, rej) {
        var t = db.transaction(ST, modo), rq = fn(t.objectStore(ST));
        t.oncomplete = function () { res(rq && rq.result); db.close(); };
        t.onerror = t.onabort = function () { rej(t.error); db.close(); };
      });
    });
  }

  function nomeCategoria(id) {
    var cats = (window.IMAGENS_CONFIG && window.IMAGENS_CONFIG.categorias) || [];
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i].nome;
    return id || "";
  }

  var Store = {
    /** Devolve a lista de registos guardados (com Blob) ou null. */
    ler: function (chave) {
      return tx("readonly", function (s) { return s.get(chave); })
        .then(function (r) { return r ? r.itens : null; })
        .catch(function () { return null; });
    },
    gravar: function (chave, itens) { return tx("readwrite", function (s) { return s.put({ chave: chave, itens: itens }); }); },
    apagar: function (chave) { return tx("readwrite", function (s) { return s["delete"](chave); }); },

    /** Lista efectiva para o website: gestor local (se existir) ou imagens.js. */
    carregar: function () {
      var cfg = window.IMAGENS_CONFIG;
      return Promise.all([Store.ler("carrossel"), Store.ler("galeria")]).then(function (r) {
        function mapa(lista) {
          return lista.map(function (x) {
            return {
              id: x.id, src: x.blob ? URL.createObjectURL(x.blob) : x.src, alt: x.alt || x.titulo || "Fotografia",
              titulo: x.titulo || "", categoria: x.categoria || "",
              legenda: x.legenda || x.titulo || nomeCategoria(x.categoria), ilustrativa: !!x.ilustrativa
            };
          });
        }
        var cfgCarr = cfg.carrossel.map(function (x) { return { src: x.src, alt: x.alt, titulo: x.legenda, legenda: x.legenda, categoria: "", ilustrativa: !!x.ilustrativa }; });
        var cfgGal = cfg.galeria.map(function (x) { return { src: x.src, alt: x.alt, titulo: x.titulo, legenda: x.titulo, categoria: x.categoria, ilustrativa: !!x.ilustrativa }; });
        var temC = !!(r[0] && r[0].length), temG = !!(r[1] && r[1].length);
        return {
          carrossel: temC ? mapa(r[0]) : cfgCarr,
          galeria: temG ? mapa(r[1]) : cfgGal,
          local: { carrossel: temC, galeria: temG }
        };
      });
    },
    nomeCategoria: nomeCategoria
  };

  window.ImagensStore = Store;
})();
