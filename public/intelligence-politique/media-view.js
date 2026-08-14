/* ===== Vue MÉDIA — Présence documentée dans le corpus (Buildfluence Intelligence Politique)
   Source unique : canonical-monitoring-data.js. Aucune métrique inventée.
   Métrique de rang : URL uniques dédupliquées (champ `delta`). Le champ `score` (influence /100)
   n'est pas documenté : il n'est ni affiché ni utilisé pour le classement. ===== */
(() => {
  const root = document.getElementById('media-view');
  const canonical = window.canonicalMonitoringData;
  if (!root || !canonical) return;

  const M = canonical.methodology;
  const national = canonical.nationalMedia || [];
  const international = canonical.internationalMedia || [];

  const ICONS = {
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
    newspaper:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'
  };
  const icon = (k,s=15) => `<svg class="mv-ico" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[k]}</svg>`;

  const copy = {
    fr: {
      kicker:'PRÉSENCE MÉDIATIQUE DOCUMENTÉE',
      title:'QUELS MÉDIAS <em>STRUCTURENT</em> LA COUVERTURE ?',
      lede:'Cette vue classe les médias selon une seule métrique documentée : le nombre d’URL uniques dédupliquées associées au corpus étudié. Elle décrit une présence observée dans un corpus délimité, sur une période délimitée. Elle ne mesure ni audience, ni crédibilité, ni qualité éditoriale, ni influence globale.',
      mPeriod:'PÉRIODE ANALYSÉE', mCorpus:'CORPUS PRESSE', mMetric:'MÉTRIQUE DE CLASSEMENT', mDedup:'DÉDUPLICATION',
      mMetricV:'URL uniques dédupliquées', mDedupV:'{n} doublons retirés',
      urlsUnit:'{n} URL uniques',
      scopeAll:'TOUS LES MÉDIAS', scopeNat:'PRESSE NATIONALE', scopeInt:'PRESSE INTERNATIONALE',
      search:'RECHERCHER UN MÉDIA', searchPh:'Nom de domaine…',
      ranking:'CLASSEMENT PAR URL UNIQUES', rankingSub:'{n} MÉDIAS DANS LE PÉRIMÈTRE',
      colRank:'RANG', colMedia:'MÉDIA', colUrls:'URL UNIQUES', colShare:'PART', colBar:'PRÉSENCE RELATIVE',
      empty:'Aucun média ne correspond à cette recherche.',
      fiche:'FICHE ANALYTIQUE', ficheHint:'Sélectionnez un média dans le classement.',
      fCategory:'Catégorie', fRank:'Rang (URL uniques)', fUrls:'URL uniques', fShare:'Présence relative', fReach:'Portée déclarée', fTopics:'Sujets associés', fTone:'Tonalité par média', fRelations:'Relations documentées', fPeriod:'Période', fSource:'Source',
      profile:'PROFIL COMPARÉ', pUrls:'URL uniques (vs. 1ᵉʳ du périmètre)', pShare:'Part du périmètre', pReach:'Portée déclarée (vs. max)',
      na:'Donnée indisponible',
      ficheNote:'Rang établi uniquement sur les URL uniques dédupliquées du corpus Presse. Aucune relation média-acteur et aucune tonalité par média ne figurent dans les données canoniques : ces champs restent vides plutôt que reconstitués.',
      distTitle:'RÉPARTITION DE LA PRÉSENCE DOCUMENTÉE', distSub:'PART DES URL UNIQUES PAR MÉDIA',
      distNote:'Chaque segment représente la part d’un média dans le total des URL uniques du périmètre affiché. Sélectionnez un segment pour ouvrir la fiche correspondante.',
      warn:'Ce classement mesure la présence documentée des médias dans le corpus étudié. Il ne mesure pas automatiquement leur audience, leur crédibilité, leur qualité éditoriale ou leur influence globale.',
      method:'COMPRENDRE LE CLASSEMENT',
      mA:['Pourquoi ce classement est utile','Il indique quels médias reviennent le plus souvent dans un corpus délimité de contenus liés au débat politique marocain sur la période étudiée. Pour une rédaction, c’est un repère de couverture : où le sujet est traité, et dans quelle proportion relative.'],
      mB:['Ce qui est classé','Des domaines de publication (médias), regroupés en deux catégories : presse nationale marocaine et presse internationale. Le classement porte sur les URL uniques associées à ces domaines dans le corpus, et non sur des articles pondérés ou une audience.'],
      mC:['Comment le rang est calculé','Rang = tri décroissant du nombre d’URL uniques dédupliquées. Une occurrence = une URL canonique unique. Aucun coefficient, aucune pondération, aucune normalisation n’est appliquée. En cas d’égalité, l’ordre alphabétique du domaine s’applique.'],
      mD:['Comment lire les visualisations','La barre de présence relative rapporte les URL uniques d’un média au média le mieux classé du périmètre affiché (100 %). La répartition en bandeau rapporte chaque média au total du périmètre. Le profil comparé de la fiche affiche les mêmes grandeurs, jamais un indice composite.'],
      mE:['Ce que les données permettent de conclure','Qu’un média est plus ou moins présent qu’un autre dans ce corpus, sur cette période, pour ces requêtes. Que la couverture est concentrée ou dispersée entre les sources.'],
      mF:['Ce qu’elles ne permettent pas de conclure','Ni audience, ni lectorat, ni crédibilité, ni qualité éditoriale, ni ligne éditoriale, ni influence, ni coordination entre médias, ni causalité. Une présence élevée n’est pas un soutien ; une présence faible n’est pas un désintérêt.'],
      mG:['Sources et période','Corpus Presse marocaine FR/AR, {press} URL uniques, période du {period}. Le total consolidé de la plateforme, tous corpus confondus, s’élève à {total} URL uniques.'],
      mH:['Déduplication et exclusions','Chaque URL canonique n’est comptée qu’une fois ; {dups} doublons ont été retirés. Domaines exclus du corpus : {excluded}.'],
      mI:['Définitions des métriques','URL uniques : nombre d’adresses canoniques distinctes associées au média. Présence relative : URL uniques ÷ URL uniques du média le mieux classé du périmètre. Part : URL uniques ÷ total du périmètre. Portée déclarée : valeur fournie par la source du classement, non recalculée et non disponible pour tous les médias.'],
      mJ:['Métriques écartées','Un champ « influence /100 » existe dans les données d’origine, mais sa formule n’est pas documentée. Il est donc exclu de cette vue : il n’est ni affiché, ni utilisé pour établir le rang. Aucune dimension composite n’est représentée.'],
      mK:['Date de référence','Données arrêtées au terme de la période analysée ({period}).']
    },
    en: {
      kicker:'DOCUMENTED MEDIA PRESENCE',
      title:'WHICH OUTLETS <em>SHAPE</em> THE COVERAGE?',
      lede:'This view ranks outlets on a single documented metric: the number of deduplicated unique URLs associated with the studied corpus. It describes observed presence within a defined corpus over a defined period. It does not measure audience, credibility, editorial quality or overall influence.',
      mPeriod:'PERIOD ANALYSED', mCorpus:'PRESS CORPUS', mMetric:'RANKING METRIC', mDedup:'DEDUPLICATION',
      mMetricV:'Deduplicated unique URLs', mDedupV:'{n} duplicates removed',
      urlsUnit:'{n} unique URLs',
      scopeAll:'ALL OUTLETS', scopeNat:'NATIONAL PRESS', scopeInt:'INTERNATIONAL PRESS',
      search:'SEARCH AN OUTLET', searchPh:'Domain name…',
      ranking:'RANKING BY UNIQUE URLS', rankingSub:'{n} OUTLETS IN SCOPE',
      colRank:'RANK', colMedia:'OUTLET', colUrls:'UNIQUE URLS', colShare:'SHARE', colBar:'RELATIVE PRESENCE',
      empty:'No outlet matches this search.',
      fiche:'ANALYTICAL PROFILE', ficheHint:'Select an outlet in the ranking.',
      fCategory:'Category', fRank:'Rank (unique URLs)', fUrls:'Unique URLs', fShare:'Relative presence', fReach:'Declared reach', fTopics:'Associated issues', fTone:'Tone per outlet', fRelations:'Documented relations', fPeriod:'Period', fSource:'Source',
      profile:'COMPARED PROFILE', pUrls:'Unique URLs (vs. scope leader)', pShare:'Share of scope', pReach:'Declared reach (vs. max)',
      na:'Data unavailable',
      ficheNote:'Rank is based solely on deduplicated unique URLs from the press corpus. No outlet-actor relationship and no per-outlet tone exist in the canonical data: these fields are left empty rather than reconstructed.',
      distTitle:'DISTRIBUTION OF DOCUMENTED PRESENCE', distSub:'SHARE OF UNIQUE URLS PER OUTLET',
      distNote:'Each segment is an outlet’s share of the total unique URLs in the displayed scope. Select a segment to open the matching profile.',
      warn:'This ranking measures the documented presence of outlets in the studied corpus. It does not automatically measure their audience, credibility, editorial quality or overall influence.',
      method:'UNDERSTANDING THE RANKING',
      mA:['Why this ranking is useful','It shows which outlets recur most often in a defined corpus of content related to Moroccan political debate over the studied period. For a newsroom, it is a coverage marker: where the subject is covered, and in what relative proportion.'],
      mB:['What is ranked','Publication domains (outlets), grouped in two categories: Moroccan national press and international press. Ranking covers unique URLs associated with those domains in the corpus, not weighted articles or audience.'],
      mC:['How rank is computed','Rank = descending sort of deduplicated unique URLs. One occurrence = one unique canonical URL. No coefficient, weighting or normalisation is applied. Ties are resolved alphabetically by domain.'],
      mD:['How to read the visualisations','The relative presence bar compares an outlet’s unique URLs with the top-ranked outlet of the displayed scope (100%). The distribution band compares each outlet with the scope total. The profile in the panel shows the same quantities, never a composite index.'],
      mE:['What the data supports','That an outlet is more or less present than another in this corpus, over this period, for these queries. That coverage is concentrated or dispersed across sources.'],
      mF:['What the data does not support','Neither audience, readership, credibility, editorial quality, editorial line, influence, coordination between outlets, nor causality. High presence is not endorsement; low presence is not disinterest.'],
      mG:['Sources and period','Moroccan press corpus FR/AR, {press} unique URLs, period {period}. The consolidated platform total, all corpora combined, is {total} unique URLs.'],
      mH:['Deduplication and exclusions','Each canonical URL is counted once; {dups} duplicates were removed. Domains excluded from the corpus: {excluded}.'],
      mI:['Metric definitions','Unique URLs: distinct canonical addresses associated with the outlet. Relative presence: unique URLs ÷ unique URLs of the scope leader. Share: unique URLs ÷ scope total. Declared reach: value provided by the ranking source, not recomputed and not available for every outlet.'],
      mJ:['Discarded metrics','An “influence /100” field exists in the source data, but its formula is undocumented. It is therefore excluded here: neither displayed nor used to establish rank. No composite dimension is represented.'],
      mK:['Reference date','Data closed at the end of the analysed period ({period}).']
    },
    ar: {
      kicker:'الحضور الإعلامي الموثق',
      title:'أي <em>وسائل إعلام</em> تشكل التغطية؟',
      lede:'ترتب هذه الواجهة وسائل الإعلام وفق مؤشر موثق واحد: عدد الروابط الفريدة بعد إزالة التكرار المرتبطة بالمدونة المدروسة. وهي تصف حضورا مرصودا داخل مدونة محددة وخلال فترة محددة. ولا تقيس الجمهور ولا المصداقية ولا الجودة التحريرية ولا التأثير العام.',
      mPeriod:'الفترة المحللة', mCorpus:'مدونة الصحافة', mMetric:'مؤشر الترتيب', mDedup:'إزالة التكرار',
      mMetricV:'روابط فريدة بعد إزالة التكرار', mDedupV:'تمت إزالة {n} تكرارا',
      urlsUnit:'{n} رابطا فريدا',
      scopeAll:'كل الوسائل', scopeNat:'الصحافة الوطنية', scopeInt:'الصحافة الدولية',
      search:'البحث عن وسيلة إعلام', searchPh:'اسم النطاق…',
      ranking:'الترتيب حسب الروابط الفريدة', rankingSub:'{n} وسيلة ضمن النطاق',
      colRank:'الرتبة', colMedia:'الوسيلة', colUrls:'روابط فريدة', colShare:'الحصة', colBar:'الحضور النسبي',
      empty:'لا توجد وسيلة مطابقة لهذا البحث.',
      fiche:'البطاقة التحليلية', ficheHint:'اختر وسيلة من الترتيب.',
      fCategory:'الفئة', fRank:'الرتبة (روابط فريدة)', fUrls:'روابط فريدة', fShare:'الحضور النسبي', fReach:'المدى المصرح به', fTopics:'المواضيع المرتبطة', fTone:'النبرة حسب الوسيلة', fRelations:'العلاقات الموثقة', fPeriod:'الفترة', fSource:'المصدر',
      profile:'المقارنة', pUrls:'روابط فريدة (مقارنة بالأول)', pShare:'الحصة من النطاق', pReach:'المدى المصرح به (مقارنة بالأقصى)',
      na:'المعطى غير متوفر',
      ficheNote:'تعتمد الرتبة حصرا على الروابط الفريدة بعد إزالة التكرار من مدونة الصحافة. لا توجد في المعطيات المرجعية أي علاقة بين وسيلة وفاعل ولا نبرة خاصة بكل وسيلة، ولذلك تُترك هذه الحقول فارغة بدل إعادة بنائها.',
      distTitle:'توزيع الحضور الموثق', distSub:'حصة كل وسيلة من الروابط الفريدة',
      distNote:'يمثل كل جزء حصة وسيلة من مجموع الروابط الفريدة في النطاق المعروض. اضغط على جزء لفتح البطاقة المقابلة.',
      warn:'يقيس هذا الترتيب الحضور الموثق لوسائل الإعلام داخل المدونة المدروسة. وهو لا يقيس تلقائيا جمهورها أو مصداقيتها أو جودتها التحريرية أو تأثيرها العام.',
      method:'فهم الترتيب',
      mA:['لماذا هذا الترتيب مفيد','يبين الوسائل الأكثر تكرارا داخل مدونة محددة من المضامين المرتبطة بالنقاش السياسي المغربي خلال الفترة المدروسة. وهو بالنسبة لهيئة تحرير مؤشر تغطية: أين يعالَج الموضوع، وبأي نسبة.'],
      mB:['ما الذي يُرتَّب','نطاقات نشر (وسائل إعلام) موزعة على فئتين: الصحافة الوطنية المغربية والصحافة الدولية. ويشمل الترتيب الروابط الفريدة المرتبطة بهذه النطاقات، لا المقالات المرجحة ولا الجمهور.'],
      mC:['كيف تُحتسب الرتبة','الرتبة = ترتيب تنازلي لعدد الروابط الفريدة بعد إزالة التكرار. حدوث واحد = رابط قانوني فريد واحد. لا معامل ولا ترجيح ولا معايرة. وعند التساوي يُعتمد الترتيب الأبجدي للنطاق.'],
      mD:['كيف تُقرأ الرسوم','يقارن شريط الحضور النسبي روابط وسيلة بالوسيلة الأولى في النطاق المعروض (100٪). ويقارن شريط التوزيع كل وسيلة بمجموع النطاق. وتعرض بطاقة المقارنة المقادير نفسها، دون أي مؤشر مركب.'],
      mE:['ما تسمح المعطيات باستنتاجه','أن وسيلة أكثر أو أقل حضورا من أخرى في هذه المدونة وخلال هذه الفترة. وأن التغطية مركزة أو موزعة بين المصادر.'],
      mF:['ما لا تسمح باستنتاجه','لا الجمهور ولا القراء ولا المصداقية ولا الجودة التحريرية ولا الخط التحريري ولا التأثير ولا التنسيق بين الوسائل ولا السببية. الحضور المرتفع ليس تأييدا، والحضور الضعيف ليس عزوفا.'],
      mG:['المصادر والفترة','مدونة الصحافة المغربية بالفرنسية والعربية، {press} رابطا فريدا، الفترة {period}. ويبلغ المجموع الموحد للمنصة، بكل المدونات، {total} رابطا فريدا.'],
      mH:['إزالة التكرار والاستثناءات','يُحتسب كل رابط قانوني مرة واحدة؛ وقد أُزيل {dups} تكرارا. النطاقات المستثناة من المدونة: {excluded}.'],
      mI:['تعريف المؤشرات','الروابط الفريدة: عدد العناوين القانونية المتمايزة المرتبطة بالوسيلة. الحضور النسبي: الروابط الفريدة ÷ روابط الوسيلة الأولى في النطاق. الحصة: الروابط الفريدة ÷ مجموع النطاق. المدى المصرح به: قيمة مقدمة من مصدر الترتيب، غير معاد احتسابها وغير متوفرة لكل الوسائل.'],
      mJ:['المؤشرات المستبعدة','يوجد في المعطيات الأصلية حقل «التأثير /100» لكن صيغته غير موثقة، ولذلك استُبعد من هذه الواجهة: لا يُعرض ولا يُستعمل في تحديد الرتبة. ولا يُمثَّل أي بعد مركب.'],
      mK:['تاريخ المرجع','معطيات موقوفة في نهاية الفترة المحللة ({period}).']
    }
  };

  const lang = () => ['fr','en','ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
  const t = k => copy[lang()][k];
  const locale = () => lang()==='ar' ? 'ar-MA' : lang()==='en' ? 'en-GB' : 'fr-FR';
  const fmt = (n,d=0) => Number(n).toLocaleString(locale(),{minimumFractionDigits:d,maximumFractionDigits:d});
  const fill = (s,map) => Object.entries(map).reduce((acc,[k,v]) => acc.replaceAll(`{${k}}`,v), s);
  const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
  const bdi = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  const period = () => lang()==='en' ? '29 Jul – 5 Aug 2026' : lang()==='ar' ? '29 يوليوز – 5 غشت 2026' : '29.07 – 05.08.2026';
  const catLabel = row => row.party === 'PRESSE NATIONALE' ? t('scopeNat') : t('scopeInt');

  const entry = row => ({
    name: row.name,
    initials: row.initials || row.name.slice(0,2).toUpperCase(),
    color: row.color,
    scope: row.party === 'PRESSE NATIONALE' ? 'national' : 'international',
    urls: row.delta,
    reach: (typeof row.reach === 'number' && row.reach > 0) ? row.reach : null
  });
  const all = [...national.map(entry), ...international.map(entry)];

  const state = { scope:'national', query:'', selected:null, sort:'urls', dir:'desc' };

  const scoped = () => state.scope==='all' ? all : all.filter(m=>m.scope===state.scope);
  const sorted = () => {
    const dir = state.dir==='asc' ? 1 : -1;
    return [...scoped()].sort((a,b)=>{
      if (state.sort==='name') return a.name.localeCompare(b.name) * dir;
      if (state.sort==='reach') { if(a.reach===b.reach) return a.name.localeCompare(b.name); if(a.reach===null) return 1; if(b.reach===null) return -1; return (a.reach-b.reach)*dir; }
      return (a.urls - b.urls) * dir || a.name.localeCompare(b.name);
    });
  };
  const rankOf = name => sorted().findIndex(m=>m.name===name) + 1;
  const visible = () => { const q = state.query.trim().toLowerCase(); return sorted().filter(m=>m.name.toLowerCase().includes(q)); };

  const shell = () => {
    const list = scoped(), total = list.reduce((s,m)=>s+m.urls,0);
    return `
      <div class="mv-head">
        <p class="mv-kicker">${esc(t('kicker'))}</p>
        <h1>${t('title')}</h1>
        <p class="mv-lede">${esc(t('lede'))}</p>
        <div class="mv-meta">
          <div><small>${esc(t('mPeriod'))}</small><strong>${esc(period())}</strong></div>
          <div><small>${esc(t('mCorpus'))}</small><strong>${fill(t('urlsUnit'),{n:fmt(M.pressUniqueUrls)})}</strong></div>
          <div><small>${esc(t('mMetric'))}</small><strong>${esc(t('mMetricV'))}</strong></div>
          <div><small>${esc(t('mDedup'))}</small><strong>${fill(t('mDedupV'),{n:fmt(M.duplicatesRemoved)})}</strong></div>
        </div>
      </div>
      <div class="mv-toolbar">
        <div class="mv-seg" role="group" aria-label="${esc(t('ranking'))}">
          <button type="button" data-scope="national" aria-pressed="${state.scope==='national'}">${icon('newspaper',13)} ${esc(t('scopeNat'))}</button>
          <button type="button" data-scope="international" aria-pressed="${state.scope==='international'}">${icon('globe',13)} ${esc(t('scopeInt'))}</button>
          <button type="button" data-scope="all" aria-pressed="${state.scope==='all'}">${esc(t('scopeAll'))}</button>
        </div>
        <label class="mv-search"><span>${esc(t('search'))}</span><input type="search" id="mv-q" value="${esc(state.query)}" placeholder="${esc(t('searchPh'))}" dir="ltr"></label>
      </div>
      <div class="mv-layout">
        <section class="mv-panel">
          <header><h2>${esc(t('ranking'))}</h2><small>${fill(t('rankingSub'),{n:fmt(list.length)})}</small></header>
          <div class="mv-thead" role="row">
            <span>${esc(t('colRank'))}</span>
            <button type="button" data-sort="name" ${state.sort==='name'?`aria-sort="${state.dir}ending"`:''}>${esc(t('colMedia'))}</button>
            <button type="button" data-sort="urls" ${state.sort==='urls'?`aria-sort="${state.dir}ending"`:''}>${esc(t('colUrls'))}</button>
            <span class="mv-col-share">${esc(t('colShare'))}</span>
            <span class="mv-col-share">${esc(t('colBar'))}</span>
          </div>
          <div id="mv-rows"></div>
        </section>
        <aside class="mv-fiche">
          <section class="mv-panel"><header><h2>${esc(t('fiche'))}</h2></header><div class="mv-fiche-body" id="mv-detail"></div></section>
        </aside>
      </div>
      <section class="mv-panel mv-dist">
        <header><h2>${esc(t('distTitle'))}</h2><small>${esc(t('distSub'))} · ${fill(t('urlsUnit'),{n:fmt(total)})}</small></header>
        <div class="mv-dist-body"><div class="mv-stack" id="mv-stack" role="img" aria-label="${esc(t('distSub'))}"></div><div class="mv-legend" id="mv-legend"></div><p class="mv-note" style="margin-top:12px">${esc(t('distNote'))}</p></div>
      </section>
      <div class="mv-warn">${icon('alert',18)}<span>${esc(t('warn'))}</span></div>
      <section class="mv-panel" style="margin-top:12px">
        <header><h2>${esc(t('method'))}</h2></header>
        <div class="mv-method">${['mA','mB','mC','mD','mE','mF','mG','mH','mI','mJ','mK'].map(k=>{
          const [title,body] = t(k);
          const text = fill(body,{press:fmt(M.pressUniqueUrls),total:fmt(M.totalUniqueUrls),dups:fmt(M.duplicatesRemoved),period:period(),excluded:(M.excludedDomains||[]).join(', ')});
          return `<details class="mv-acc"><summary>${esc(title)}</summary><p>${esc(text)}</p></details>`;
        }).join('')}</div>
      </section>`;
  };

  const renderRows = () => {
    const list = visible(), full = sorted(), max = Math.max(1,...full.map(m=>m.urls)), total = full.reduce((s,m)=>s+m.urls,0) || 1;
    const box = root.querySelector('#mv-rows');
    if (!list.length) { box.innerHTML = `<p class="mv-empty">${esc(t('empty'))}</p>`; return; }
    box.innerHTML = list.map(m=>{
      const rank = full.indexOf(m)+1, share = m.urls/total*100, rel = m.urls/max*100;
      return `<button type="button" class="mv-row" data-media="${esc(m.name)}" aria-current="${state.selected===m.name}">
        <span class="mv-rank">${String(rank).padStart(2,'0')}</span>
        <span class="mv-name"><i class="mv-badge" style="--c:${m.color}">${esc(m.initials)}</i><span><strong>${bdi(m.name)}</strong><small>${esc(m.scope==='national'?t('scopeNat'):t('scopeInt'))}</small></span></span>
        <span class="mv-urls">${fmt(m.urls)}</span>
        <span class="mv-share">${fmt(share,1)} %</span>
        <span class="mv-bar"><i style="width:${rel.toFixed(1)}%"></i></span>
      </button>`;
    }).join('');
  };

  const metric = (label,valueText,pct) => `<div class="mv-metric"><span>${esc(label)}<b>${valueText}</b></span><span class="mv-bar"><i style="width:${pct===null?0:Math.min(100,pct).toFixed(1)}%"></i></span></div>`;

  const renderDetail = () => {
    const box = root.querySelector('#mv-detail');
    const full = sorted(), m = full.find(x=>x.name===state.selected);
    if (!m) { box.innerHTML = `<p class="mv-na">${esc(t('ficheHint'))}</p>`; return; }
    const total = full.reduce((s,x)=>s+x.urls,0) || 1, max = Math.max(1,...full.map(x=>x.urls));
    const reaches = full.map(x=>x.reach).filter(v=>v!==null), maxReach = reaches.length?Math.max(...reaches):null;
    const na = `<span class="mv-na">${esc(t('na'))}</span>`;
    box.innerHTML = `
      <h3>${bdi(m.name)}</h3>
      <dl class="mv-kv">
        <dt>${esc(t('fCategory'))}</dt><dd>${esc(m.scope==='national'?t('scopeNat'):t('scopeInt'))}</dd>
        <dt>${esc(t('fRank'))}</dt><dd>${fmt(full.indexOf(m)+1)} / ${fmt(full.length)}</dd>
        <dt>${esc(t('fUrls'))}</dt><dd>${fmt(m.urls)}</dd>
        <dt>${esc(t('fShare'))}</dt><dd>${fmt(m.urls/total*100,1)} %</dd>
        <dt>${esc(t('fReach'))}</dt><dd>${m.reach===null?na:fmt(m.reach)}</dd>
        <dt>${esc(t('fTopics'))}</dt><dd>${na}</dd>
        <dt>${esc(t('fTone'))}</dt><dd>${na}</dd>
        <dt>${esc(t('fRelations'))}</dt><dd>${na}</dd>
        <dt>${esc(t('fPeriod'))}</dt><dd>${esc(period())}</dd>
      </dl>
      <div>
        <p class="mv-kicker" style="margin:0 0 8px">${esc(t('profile'))}</p>
        <div class="mv-profile">
          ${metric(t('pUrls'),fmt(m.urls),m.urls/max*100)}
          ${metric(t('pShare'),fmt(m.urls/total*100,1)+' %',m.urls/total*100)}
          ${metric(t('pReach'),m.reach===null?esc(t('na')):fmt(m.reach),m.reach===null||!maxReach?null:m.reach/maxReach*100)}
        </div>
      </div>
      <p class="mv-note">${esc(t('ficheNote'))}</p>`;
  };

  const renderStack = () => {
    const full = sorted(), total = full.reduce((s,m)=>s+m.urls,0) || 1;
    root.querySelector('#mv-stack').innerHTML = full.map(m=>`<i style="--c:${m.color};width:${(m.urls/total*100).toFixed(2)}%" data-media="${esc(m.name)}" data-on="${state.selected===m.name?1:0}" title="${esc(m.name)} — ${fmt(m.urls)} (${fmt(m.urls/total*100,1)} %)"></i>`).join('');
    root.querySelector('#mv-legend').innerHTML = full.map(m=>`<span><i style="--c:${m.color}"></i>${bdi(m.name)} · ${fmt(m.urls/total*100,1)} %</span>`).join('');
  };

  const paint = () => { renderRows(); renderDetail(); renderStack(); };

  const bind = () => {
    root.querySelectorAll('[data-scope]').forEach(b=>b.addEventListener('click',()=>{ state.scope=b.dataset.scope; state.selected=null; render(); }));
    root.querySelectorAll('[data-sort]').forEach(b=>b.addEventListener('click',()=>{
      const key=b.dataset.sort;
      if (state.sort===key) state.dir = state.dir==='desc' ? 'asc' : 'desc';
      else { state.sort=key; state.dir = key==='name' ? 'asc' : 'desc'; }
      render();
    }));
    const q = root.querySelector('#mv-q');
    q.addEventListener('input',()=>{ state.query=q.value; renderRows(); });
    root.addEventListener('click',e=>{
      const el = e.target.closest('[data-media]');
      if (!el) return;
      state.selected = state.selected===el.dataset.media ? null : el.dataset.media;
      paint();
      if (state.selected && window.matchMedia('(max-width:1100px)').matches) root.querySelector('#mv-detail')?.scrollIntoView({behavior:'smooth',block:'center'});
    });
    root.addEventListener('keydown',e=>{ if (e.key==='Escape' && state.selected) { state.selected=null; paint(); } });
  };

  function render(){ root.innerHTML = shell(); bind(); paint(); }

  render();
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  window.addEventListener('bf:theme',paint);
  window.addEventListener('bf:media-scope',e=>{ state.scope = e.detail==='national' ? 'national' : 'international'; state.selected=null; render(); });
})();
