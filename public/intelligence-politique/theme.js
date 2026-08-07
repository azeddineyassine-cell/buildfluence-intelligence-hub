/* Buildfluence · gestion centralisée des thèmes CLAIR / SOMBRE.
   Ce fichier est chargé en tête de document (avant le premier affichage)
   afin d'éviter tout flash de thème sombre au premier rendu.
   Le thème CLAIR est le thème par défaut, y compris en navigation privée. */
window.BFTheme = (function () {
  var SUPPORTED = ['light', 'dark'];
  var STORAGE = 'bf_ip_theme';
  var theme = 'light';
  var listeners = [];

  function stored() {
    try {
      var v = localStorage.getItem(STORAGE);
      return SUPPORTED.indexOf(v) > -1 ? v : null;
    } catch (e) { return null; }
  }

  /* Aucun recours à prefers-color-scheme : en l'absence de choix, on reste en clair. */
  theme = stored() || 'light';
  document.documentElement.setAttribute('data-theme', theme);

  function paintSwitch() {
    var host = document.querySelector('.theme-switch');
    if (!host) return;
    host.querySelectorAll('button').forEach(function (b) {
      var on = b.dataset.theme === theme;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function set(next) {
    if (SUPPORTED.indexOf(next) < 0 || next === theme) return;
    theme = next;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE, theme); } catch (e) { /* noop */ }
    paintSwitch();
    listeners.forEach(function (fn) {
      try { fn(theme); } catch (e) { console.error(e); }
    });
    document.dispatchEvent(new CustomEvent('bf:theme', { detail: { theme: theme } }));
  }

  function labels() {
    var i18n = window.BFI18N;
    var get = function (k, fallback) {
      if (!i18n) return fallback;
      var v = i18n.t(k);
      return typeof v === 'string' && v !== k ? v : fallback;
    };
    return {
      group: get('theme.label', 'FOND'),
      light: get('theme.light', 'CLAIR'),
      dark: get('theme.dark', 'SOMBRE'),
      aria: get('theme.aria', 'Choix du thème'),
      ariaLight: get('theme.ariaLight', 'Activer le thème clair'),
      ariaDark: get('theme.ariaDark', 'Activer le thème sombre')
    };
  }

  function build() {
    var host = document.querySelector('.theme-switch');
    if (!host) return;
    var l = labels();
    if (!host.dataset.ready) {
      host.dataset.ready = '1';
      host.setAttribute('role', 'group');
      host.innerHTML =
        '<span></span>' +
        '<button type="button" data-theme="light"></button>' +
        '<button type="button" data-theme="dark"></button>';
      host.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { set(b.dataset.theme); });
      });
    }
    host.setAttribute('aria-label', l.aria);
    host.querySelector('span').textContent = l.group;
    var lightBtn = host.querySelector('[data-theme="light"]');
    var darkBtn = host.querySelector('[data-theme="dark"]');
    lightBtn.textContent = l.light;
    lightBtn.setAttribute('aria-label', l.ariaLight);
    darkBtn.textContent = l.dark;
    darkBtn.setAttribute('aria-label', l.ariaDark);
    paintSwitch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
  /* Les libellés suivent la langue, le thème reste indépendant. */
  document.addEventListener('bf:lang', build);

  return {
    set: set,
    get theme() { return theme; },
    onChange: function (fn) { listeners.push(fn); }
  };
})();
