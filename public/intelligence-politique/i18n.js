(() => {
  const translations = {
    fr: {
      themeLabel: 'FOND', light: 'CLAIR', dark: 'SOMBRE', login: 'SE CONNECTER', signup: 'S\u2019INSCRIRE'
    },
    en: {
      themeLabel: 'THEME', light: 'LIGHT', dark: 'DARK', login: 'SIGN IN', signup: 'REGISTER'
    },
    ar: {
      themeLabel: 'المظهر', light: 'فاتح', dark: 'داكن', login: 'تسجيل الدخول', signup: 'إنشاء حساب'
    }
  };

  const pagePhrases = {
    en: {
      'TABLEAU DE BORD':'DASHBOARD','Que se passe-t-il aujourd’hui ?':'What is happening today?','CLASSEMENT':'RANKING','Qui progresse ? Qui recule ?':'Who is rising? Who is falling?','OPINION':'OPINION','Quels sujets dominent le débat ?':'Which issues dominate the debate?','MEDIA':'MEDIA','Qui relaie le débat ?':'Who is amplifying the debate?','DYNAMIQUES POLITIQUES':'POLITICAL DYNAMICS','Comment les acteurs interagissent-ils ?':'How do the actors interact?','ARCHITECTURE':'ARCHITECTURE','Comment le dispositif est-il structuré ?':'How is the system structured?','À PROPOS':'ABOUT','Notre mission et nos engagements':'Our mission and commitments','LA PREMIÈRE PLATEFORME MAROCAINE D’INTELLIGENCE POLITIQUE':'MOROCCO\u2019S FIRST POLITICAL INTELLIGENCE PLATFORM','Comprendre maintenant':'Understand now','Décider aujourd’hui':'Decide today','Anticiper demain':'Anticipate tomorrow','FICHE SIGNALÉTIQUE':'IDENTITY PROFILE','REPÈRES DE L’ÉTUDE':'STUDY REFERENCE','CONTRÔLE QUALITÉ':'QUALITY CONTROL','PÉRIODE':'PERIOD','MENTIONS ANALYSÉES':'MENTIONS ANALYSED','Partis Politiques':'Political Parties','Leaders Politiques':'Political Leaders','Sujets de Débat Politique':'Political Debate Issues','Opinion Citoyenne':'Citizen Opinion','MÉTHODE PROPRIÉTAIRE':'PROPRIETARY METHOD','OUTILS':'TOOLS','OBJECTIF':'OBJECTIVE','Lire les dynamiques narratives':'Read narrative dynamics','GRAPHE RELATIONNEL':'RELATIONAL GRAPH','PRESSE MAROCAINE':'MOROCCAN PRESS','PÉRIODE D’ANALYSE':'ANALYSIS PERIOD','LANGUES PRINCIPALES':'MAIN LANGUAGES','VOIR TOUT →':'VIEW ALL →','ANALYSER →':'ANALYSE →','Architecture':'Architecture','À propos':'About','Contact':'Contact'
    },
    ar: {
      'TABLEAU DE BORD':'لوحة القيادة','Que se passe-t-il aujourd’hui ?':'ماذا يحدث اليوم؟','CLASSEMENT':'الترتيب','Qui progresse ? Qui recule ?':'من يتقدم؟ ومن يتراجع؟','OPINION':'الرأي','Quels sujets dominent le débat ?':'ما المواضيع المهيمنة على النقاش؟','MEDIA':'الإعلام','Qui relaie le débat ?':'من ينقل النقاش؟','DYNAMIQUES POLITIQUES':'الديناميات السياسية','Comment les acteurs interagissent-ils ?':'كيف يتفاعل الفاعلون؟','ARCHITECTURE':'الهندسة','Comment le dispositif est-il structuré ?':'كيف تمت هيكلة المنظومة؟','À PROPOS':'من نحن','Notre mission et nos engagements':'مهمتنا والتزاماتنا','LA PREMIÈRE PLATEFORME MAROCAINE D’INTELLIGENCE POLITIQUE':'أول منصة مغربية للذكاء السياسي','Comprendre maintenant':'افهم الآن','Décider aujourd’hui':'قرر اليوم','Anticiper demain':'استبق الغد','FICHE SIGNALÉTIQUE':'البطاقة التعريفية','REPÈRES DE L’ÉTUDE':'مراجع الدراسة','CONTRÔLE QUALITÉ':'مراقبة الجودة','PÉRIODE':'الفترة','MENTIONS ANALYSÉES':'الإشارات المحللة','Partis Politiques':'الأحزاب السياسية','Leaders Politiques':'القادة السياسيون','Sujets de Débat Politique':'مواضيع النقاش السياسي','Opinion Citoyenne':'رأي المواطنين','MÉTHODE PROPRIÉTAIRE':'المنهجية الخاصة','OUTILS':'الأدوات','OBJECTIF':'الهدف','Lire les dynamiques narratives':'قراءة الديناميات السردية','GRAPHE RELATIONNEL':'الرسم العلائقي','PRESSE MAROCAINE':'الصحافة المغربية','PÉRIODE D’ANALYSE':'فترة التحليل','LANGUES PRINCIPALES':'اللغات الرئيسية','VOIR TOUT →':'عرض الكل ←','ANALYSER →':'تحليل ←','Architecture':'الهندسة','À propos':'من نحن','Contact':'اتصل بنا'
    }
  };

  const originalText = new WeakMap();
  function translateTextNodes(lang) {
    const dictionary = pagePhrases[lang] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || ['SCRIPT','STYLE'].includes(node.parentElement.tagName)) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const trimmed = source.trim();
      const translated = lang === 'fr' ? trimmed : dictionary[trimmed];
      if (translated) node.nodeValue = source.replace(trimmed, translated);
      else if (lang === 'fr') node.nodeValue = source;
    }
  }

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'fr';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    translateTextNodes(lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const icon = el.querySelector('i');
      const text = translations[lang][el.dataset.i18n];
      if (!text) return;
      if (icon) {
        [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).forEach(n => n.remove());
        el.append(` ${text}`);
      } else el.textContent = text;
    });
    document.querySelectorAll('[data-language]').forEach(button => button.classList.toggle('active', button.dataset.language === lang));
    localStorage.setItem('buildfluence-language', lang);
    window.dispatchEvent(new CustomEvent('bf:lang', { detail: { lang } }));
  }

  function applyTheme(theme) {
    if (!['light','dark'].includes(theme)) theme = 'light';
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.classList.toggle('active', button.dataset.themeChoice === theme));
    localStorage.setItem('buildfluence-theme', theme);
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }

  addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language)));
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
    applyTheme(localStorage.getItem('buildfluence-theme') || 'light');
    applyLanguage(localStorage.getItem('buildfluence-language') || 'fr');
  });
})();
