/* Moteur i18n isolé de la page Intelligence Politique.
   Charge fr.json / ar.json / en.json, applique les traductions sans rechargement,
   gère la direction RTL pour l'arabe et la persistance du choix de langue. */
window.BFI18N = (function () {
  const SUPPORTED = ['fr', 'ar', 'en'];
  const STORAGE = 'bf_ip_lang';
  const LABELS = { fr: 'FR', ar: 'العربية', en: 'EN' };
  const cache = {};
  let lang = 'fr';
  let listeners = [];

  function detect() {
    try {
      const qp = new URL(location.href).searchParams.get('lang');
      if (SUPPORTED.includes(qp)) return qp;
      const stored = localStorage.getItem(STORAGE);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (e) { /* noop */ }
    return 'fr';
  }

  function load(l) {
    if (cache[l]) return Promise.resolve(cache[l]);
    return fetch('i18n/' + l + '.json', { cache: 'no-cache' })
      .then((r) => r.json())
      .then((json) => (cache[l] = json));
  }

  function resolve(path, dict) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), dict);
  }

  function t(path, vars) {
    let value = resolve(path, cache[lang]);
    if (value === undefined || value === null) value = resolve(path, cache.fr);
    if (value === undefined || value === null) return path;
    if (typeof value !== 'string') return value;
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
  }

  function apply() {
    const rtl = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-rtl', rtl);
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    document.querySelectorAll('.lang-switch button').forEach((b) => {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    listeners.forEach((fn) => {
      try { fn(lang); } catch (e) { console.error(e); }
    });
    document.dispatchEvent(new CustomEvent('bf:lang', { detail: { lang } }));
  }

  function set(next) {
    if (!SUPPORTED.includes(next) || next === lang) return Promise.resolve();
    return load(next).then(() => {
      lang = next;
      try { localStorage.setItem(STORAGE, next); } catch (e) { /* noop */ }
      apply();
    });
  }

  function buildSwitch() {
    const host = document.querySelector('.lang-switch');
    if (!host || host.dataset.ready) return;
    host.dataset.ready = '1';
    host.innerHTML = SUPPORTED.map(
      (l) => `<button type="button" data-lang="${l}" lang="${l}" aria-label="${LABELS[l]}">${LABELS[l]}</button>`
    ).join('');
    host.querySelectorAll('button').forEach((b) => (b.onclick = () => set(b.dataset.lang)));
  }

  const ready = load('fr')
    .then(() => {
      const initial = detect();
      return initial === 'fr' ? null : load(initial).then(() => (lang = initial));
    })
    .then(() => {
      buildSwitch();
      apply();
    });

  return {
    ready,
    t,
    set,
    get lang() { return lang; },
    onChange(fn) { listeners.push(fn); },
    supported: SUPPORTED,
  };
})();

/* script.js est chargé après les dictionnaires afin que tout rendu initial soit déjà traduit. */
window.BFI18N.ready.then(() => {
  const s = document.createElement('script');
  s.src = 'script.js';
  document.body.appendChild(s);
});
