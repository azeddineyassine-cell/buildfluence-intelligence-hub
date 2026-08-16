/* ===== Vue MÉDIA — Présence documentée dans le corpus (Buildfluence Intelligence Politique)
   Source unique : canonical-monitoring-data.js. Aucune métrique inventée.
   Périmètres : Top 10 national (698 URL), Top 10 international (24 URL), vue combinée (722 URL).
   Métrique de rang : URL uniques (champ `delta`). Les champs `score` (influence /100) et `reach`
   (portée) ne sont pas documentés : ils ne sont ni affichés, ni triés, ni utilisés. ===== */
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
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 10.37-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/>'
  };
  const icon = (k,s=15) => `<svg class="mv-ico" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[k]}</svg>`;

  const copy = {
    fr: {
      kicker:'PRÉSENCE MÉDIATIQUE DOCUMENTÉE',
      title:'Quels médias <em>structurent</em> la couverture ?',
      subtitle:'Lecture de la présence documentée dans le Top 10 national et le Top 10 international, selon le nombre d’URL uniques observées.',
      lede:'Cette vue classe les médias selon une seule métrique documentée : le nombre d’URL uniques associées au corpus étudié. Elle décrit une présence observée dans un corpus délimité, sur une période délimitée. Elle ne mesure ni audience, ni crédibilité, ni qualité éditoriale, ni influence globale.',
      mPeriod:'PÉRIODE ANALYSÉE', mCorpus:'CORPUS PRESSE', mMetric:'MÉTRIQUE DE CLASSEMENT', mData:'DONNÉES DU CORPUS',
      mMetricV:'URL uniques',
      urlsUnit:'{n} URL uniques',
      scopeAll:'VUE COMBINÉE', scopeNat:'TOP 10 NATIONAL', scopeInt:'TOP 10 INTERNATIONAL',
      catNat:'PRESSE NATIONALE', catInt:'PRESSE INTERNATIONALE',
      descNat:'Les dix médias nationaux comptant le plus grand nombre d’URL uniques dans les données de classement disponibles.',
      descInt:'Les dix médias internationaux comptant le plus grand nombre d’URL uniques dans les données de classement disponibles.',
      descAll:'Comparaison des dix médias nationaux et des dix médias internationaux retenus dans les deux classements. Les volumes nationaux et internationaux sont très différents : cette vue permet une comparaison documentaire, pas une mesure d’importance globale.',
      search:'RECHERCHER UN MÉDIA', searchPh:'Nom de domaine…',
      ranking:'CLASSEMENT PAR URL UNIQUES', rankingSub:'{n} MÉDIAS · {u} URL UNIQUES',
      colRank:'RANG', colMedia:'MÉDIA', colUrls:'URL UNIQUES', colShare:'PART', colBar:'PRÉSENCE RELATIVE',
      empty:'Aucun média ne correspond à cette recherche.',
      fiche:'FICHE ANALYTIQUE', ficheHint:'Sélectionnez un média dans le classement.',
      fCategory:'Catégorie', fScope:'Périmètre', fRank:'Rang dans le périmètre', fUrls:'URL uniques', fShare:'Part du périmètre', fRel:'Présence relative (vs. 1ᵉʳ)', fPeriod:'Période', fSource:'Source',
      sourceV:'Corpus Presse marocaine FR/AR',
      profile:'PROFIL COMPARÉ', pUrls:'URL uniques (vs. 1ᵉʳ du périmètre)', pShare:'Part du périmètre',
      naTitle:'DONNÉES NON DISPONIBLES',
      naBody:'Les données actuelles ne permettent pas d’attribuer de manière fiable des sujets, une tonalité ou des relations documentées à chaque média. Aucune valeur n’est reconstituée.',
      ficheNote:'Rang établi uniquement sur les URL uniques du corpus Presse, recalculé dans le périmètre actif.',
      distTitle:'RÉPARTITION DE LA PRÉSENCE DOCUMENTÉE', distSub:'PART DES URL UNIQUES PAR MÉDIA',
      distNote:'Chaque segment représente la part d’un média dans le total des URL uniques du périmètre affiché. Sélectionnez un segment (souris ou clavier) pour ouvrir la fiche correspondante.',
      segLabel:'{name} — rang {rank} du périmètre, {urls} URL uniques, {share} % du périmètre',
      warn:'Ce classement mesure la présence documentée des médias dans le corpus étudié. Il ne mesure pas automatiquement leur audience, leur crédibilité, leur qualité éditoriale ou leur influence globale.',
      method:'COMPRENDRE LE CLASSEMENT',
      mA:['Pourquoi ce classement est utile','Il indique quels médias reviennent le plus souvent dans un corpus délimité de contenus liés au débat politique marocain sur la période étudiée. Pour une rédaction, c’est un repère de couverture : où le sujet est traité, et dans quelle proportion relative.'],
      mB:['Pourquoi un Top 10 et ce qui est classé','Les données de classement disponibles renseignent dix médias nationaux et dix médias internationaux. Cette limitation à vingt médias est volontaire et documentée. Sont classés des domaines de publication, et non des articles pondérés ou une audience.'],
      mC:['Comment le rang est calculé et comment les égalités sont résolues','Rang = tri décroissant du nombre d’URL uniques associées au média dans les données disponibles. En cas d’égalité, l’ordre alphabétique du nom de domaine s’applique. Aucun coefficient, aucune pondération, aucune normalisation. Le rang est recalculé dans chaque périmètre : rang national, rang international, rang comparatif dans la vue combinée.'],
      mL:['Corpus global et vingt médias affichés','Les deux classements présentent les dix médias nationaux et les dix médias internationaux renseignés dans les données de classement. Ensemble, ces vingt médias totalisent {top20} URL uniques sur les {press} URL du corpus Presse. Les autres domaines du corpus ne sont pas détaillés dans cette vue. Totaux vérifiés — Top 10 national : {nat} URL uniques ; Top 10 international : {int} URL uniques ; vue combinée : {top20} URL uniques ; corpus Presse global : {press} URL uniques. La vue combinée n’est pas un classement exhaustif de tous les domaines présents dans le corpus.'],
      mM:['Différence entre les trois périmètres','Le Top 10 national et le Top 10 international sont deux classements distincts, chacun avec son propre rang. La vue combinée réunit uniquement ces vingt médias. L’écart de volume entre les deux catégories est important ({nat} contre {int} URL uniques) : une comparaison directe entre un média national et un média international est documentaire, non hiérarchique.'],
      mD:['Comment lire les visualisations','La barre de présence relative rapporte les URL uniques d’un média au média le mieux classé du périmètre affiché (100 %). La répartition en bandeau rapporte chaque média au total du périmètre. Le profil comparé de la fiche affiche les mêmes grandeurs, jamais un indice composite.'],
      mE:['Ce que les données permettent de conclure','Qu’un média est plus ou moins présent qu’un autre dans ce corpus, sur cette période, pour ces requêtes. Que la couverture est concentrée ou dispersée entre les sources retenues.'],
      mF:['Ce qu’elles ne permettent pas de conclure','Ni audience, ni lectorat, ni crédibilité, ni qualité éditoriale, ni ligne éditoriale, ni influence, ni coordination entre médias, ni causalité. Une présence élevée n’est pas un soutien ; une présence faible n’est pas un désintérêt.'],
      mG:['Sources et période','Corpus Presse marocaine FR/AR, {press} URL uniques, période du {period}.'],
      mH:['Déduplication et exclusions','La source Presse fournit {press} URL comptabilisées comme uniques. Le chiffre global de doublons retirés sur la plateforme n’est pas attribué à ce seul corpus et n’est donc pas utilisé dans cette vue. Domaines exclus du corpus : {excluded}.'],
      mI:['Définitions des métriques','URL uniques : nombre d’adresses canoniques distinctes associées au média dans les données de classement. Présence relative : URL uniques ÷ URL uniques du média le mieux classé du périmètre. Part du périmètre : URL uniques ÷ total du périmètre affiché.'],
      mJ:['Métriques écartées','Un champ « influence /100 » existe dans les données d’origine, mais sa formule n’est pas documentée : il n’est ni affiché, ni utilisé pour établir le rang, ni intégré à un radar. Des valeurs de portée figurent également dans la source, mais leur définition, leur unité et leur méthode ne sont pas documentées. Elles ne sont donc pas affichées.'],
      mK:['Date de référence','Données arrêtées au terme de la période analysée ({period}).']
    },
    en: {
      kicker:'DOCUMENTED MEDIA PRESENCE',
      title:'Which outlets <em>shape</em> the coverage?',
      subtitle:'A reading of documented presence in the national Top 10 and the international Top 10, based on the number of observed unique URLs.',
      lede:'This view ranks outlets on a single documented metric: the number of unique URLs associated with the studied corpus. It describes observed presence within a defined corpus over a defined period. It does not measure audience, credibility, editorial quality or overall influence.',
      mPeriod:'PERIOD ANALYSED', mCorpus:'PRESS CORPUS', mMetric:'RANKING METRIC', mData:'CORPUS DATA',
      mMetricV:'Unique URLs',
      urlsUnit:'{n} unique URLs',
      scopeAll:'COMBINED VIEW', scopeNat:'NATIONAL TOP 10', scopeInt:'INTERNATIONAL TOP 10',
      catNat:'NATIONAL PRESS', catInt:'INTERNATIONAL PRESS',
      descNat:'The ten national outlets with the highest number of unique URLs in the available ranking data.',
      descInt:'The ten international outlets with the highest number of unique URLs in the available ranking data.',
      descAll:'A comparison of the ten national and ten international outlets retained in both rankings. National and international volumes differ widely: this view supports documentary comparison, not a measure of overall importance.',
      search:'SEARCH AN OUTLET', searchPh:'Domain name…',
      ranking:'RANKING BY UNIQUE URLS', rankingSub:'{n} OUTLETS · {u} UNIQUE URLS',
      colRank:'RANK', colMedia:'OUTLET', colUrls:'UNIQUE URLS', colShare:'SHARE', colBar:'RELATIVE PRESENCE',
      empty:'No outlet matches this search.',
      fiche:'ANALYTICAL PROFILE', ficheHint:'Select an outlet in the ranking.',
      fCategory:'Category', fScope:'Scope', fRank:'Rank within scope', fUrls:'Unique URLs', fShare:'Share of scope', fRel:'Relative presence (vs. leader)', fPeriod:'Period', fSource:'Source',
      sourceV:'Moroccan press corpus FR/AR',
      profile:'COMPARED PROFILE', pUrls:'Unique URLs (vs. scope leader)', pShare:'Share of scope',
      naTitle:'DATA NOT AVAILABLE',
      naBody:'Current data does not allow topics, tone or documented relations to be reliably attributed to each outlet. No value is reconstructed.',
      ficheNote:'Rank is based solely on unique URLs from the press corpus and is recomputed within the active scope.',
      distTitle:'DISTRIBUTION OF DOCUMENTED PRESENCE', distSub:'SHARE OF UNIQUE URLS PER OUTLET',
      distNote:'Each segment is an outlet’s share of the total unique URLs in the displayed scope. Select a segment (mouse or keyboard) to open the matching profile.',
      segLabel:'{name} — rank {rank} in scope, {urls} unique URLs, {share}% of scope',
      warn:'This ranking measures the documented presence of outlets in the studied corpus. It does not automatically measure their audience, credibility, editorial quality or overall influence.',
      method:'UNDERSTANDING THE RANKING',
      mA:['Why this ranking is useful','It shows which outlets recur most often in a defined corpus of content related to Moroccan political debate over the studied period. For a newsroom, it is a coverage marker: where the subject is covered, and in what relative proportion.'],
      mB:['Why a Top 10, and what is ranked','The available ranking data documents ten national and ten international outlets. This limitation to twenty outlets is deliberate and documented. What is ranked are publication domains, not weighted articles or audience.'],
      mC:['How rank is computed and how ties are resolved','Rank = descending sort of the number of unique URLs associated with the outlet in the available data. Ties are resolved alphabetically by domain name. No coefficient, weighting or normalisation is applied. Rank is recomputed within each scope: national rank, international rank, comparative rank in the combined view.'],
      mL:['Global corpus versus the twenty outlets shown','The two rankings present the ten national and ten international outlets documented in the ranking data. Together, these twenty outlets account for {top20} unique URLs out of the {press} URLs in the press corpus. Other domains in the corpus are not detailed in this view. Verified totals — national Top 10: {nat} unique URLs; international Top 10: {int} unique URLs; combined view: {top20} unique URLs; full press corpus: {press} unique URLs. The combined view is not an exhaustive ranking of every domain present in the corpus.'],
      mM:['Difference between the three scopes','The national Top 10 and the international Top 10 are two separate rankings, each with its own rank. The combined view brings together only those twenty outlets. The volume gap between the two categories is large ({nat} versus {int} unique URLs): a direct comparison between a national and an international outlet is documentary, not hierarchical.'],
      mD:['How to read the visualisations','The relative presence bar compares an outlet’s unique URLs with the top-ranked outlet of the displayed scope (100%). The distribution band compares each outlet with the scope total. The profile in the panel shows the same quantities, never a composite index.'],
      mE:['What the data supports','That an outlet is more or less present than another in this corpus, over this period, for these queries. That coverage is concentrated or dispersed across the retained sources.'],
      mF:['What the data does not support','Neither audience, readership, credibility, editorial quality, editorial line, influence, coordination between outlets, nor causality. High presence is not endorsement; low presence is not disinterest.'],
      mG:['Sources and period','Moroccan press corpus FR/AR, {press} unique URLs, period {period}.'],
      mH:['Deduplication and exclusions','The press source provides {press} URLs counted as unique. The platform-wide figure for removed duplicates is not attributable to this corpus alone and is therefore not used in this view. Domains excluded from the corpus: {excluded}.'],
      mI:['Metric definitions','Unique URLs: distinct canonical addresses associated with the outlet in the ranking data. Relative presence: unique URLs ÷ unique URLs of the scope leader. Share of scope: unique URLs ÷ total of the displayed scope.'],
      mJ:['Discarded metrics','An “influence /100” field exists in the source data, but its formula is undocumented: it is neither displayed, nor used to establish rank, nor plotted on a radar. Reach values also appear in the source, but their definition, unit and method are undocumented. They are therefore not displayed.'],
      mK:['Reference date','Data closed at the end of the analysed period ({period}).']
    },
    ar: {
      kicker:'الحضور الإعلامي الموثق',
      title:'أي <em>وسائل إعلام</em> تشكل التغطية؟',
      subtitle:'قراءة للحضور الموثق ضمن أفضل عشر وسائل وطنية وأفضل عشر وسائل دولية، حسب عدد الروابط الفريدة المرصودة.',
      lede:'ترتب هذه الواجهة وسائل الإعلام وفق مؤشر موثق واحد: عدد الروابط الفريدة المرتبطة بالمدونة المدروسة. وهي تصف حضورا مرصودا داخل مدونة محددة وخلال فترة محددة. ولا تقيس الجمهور ولا المصداقية ولا الجودة التحريرية ولا التأثير العام.',
      mPeriod:'الفترة المحللة', mCorpus:'مدونة الصحافة', mMetric:'مؤشر الترتيب', mData:'معطيات المدونة',
      mMetricV:'روابط فريدة',
      urlsUnit:'{n} رابطا فريدا',
      scopeAll:'العرض المدمج', scopeNat:'أفضل 10 وطنيا', scopeInt:'أفضل 10 دوليا',
      catNat:'الصحافة الوطنية', catInt:'الصحافة الدولية',
      descNat:'وسائل الإعلام الوطنية العشر الأكثر عددا من حيث الروابط الفريدة ضمن معطيات الترتيب المتوفرة.',
      descInt:'وسائل الإعلام الدولية العشر الأكثر عددا من حيث الروابط الفريدة ضمن معطيات الترتيب المتوفرة.',
      descAll:'مقارنة بين وسائل الإعلام الوطنية العشر والدولية العشر المعتمدة في الترتيبين. أحجام النشر الوطنية والدولية متباينة جدا: هذا العرض يتيح مقارنة توثيقية، لا قياسا للأهمية العامة.',
      search:'البحث عن وسيلة إعلام', searchPh:'اسم النطاق…',
      ranking:'الترتيب حسب الروابط الفريدة', rankingSub:'{n} وسيلة · {u} رابطا فريدا',
      colRank:'الرتبة', colMedia:'الوسيلة', colUrls:'روابط فريدة', colShare:'الحصة', colBar:'الحضور النسبي',
      empty:'لا توجد وسيلة مطابقة لهذا البحث.',
      fiche:'البطاقة التحليلية', ficheHint:'اختر وسيلة من الترتيب.',
      fCategory:'الفئة', fScope:'النطاق', fRank:'الرتبة داخل النطاق', fUrls:'روابط فريدة', fShare:'الحصة من النطاق', fRel:'الحضور النسبي (مقارنة بالأول)', fPeriod:'الفترة', fSource:'المصدر',
      sourceV:'مدونة الصحافة المغربية بالفرنسية والعربية',
      profile:'المقارنة', pUrls:'روابط فريدة (مقارنة بالأول)', pShare:'الحصة من النطاق',
      naTitle:'معطيات غير متوفرة',
      naBody:'لا تسمح المعطيات الحالية بإسناد مواضيع أو نبرة أو علاقات موثقة لكل وسيلة بشكل موثوق. ولا تُعاد بناء أي قيمة.',
      ficheNote:'تعتمد الرتبة حصرا على الروابط الفريدة لمدونة الصحافة، وتُحتسب من جديد داخل النطاق النشط.',
      distTitle:'توزيع الحضور الموثق', distSub:'حصة كل وسيلة من الروابط الفريدة',
      distNote:'يمثل كل جزء حصة وسيلة من مجموع الروابط الفريدة في النطاق المعروض. اختر جزءا (بالفأرة أو لوحة المفاتيح) لفتح البطاقة المقابلة.',
      segLabel:'{name} — الرتبة {rank} داخل النطاق، {urls} رابطا فريدا، {share}٪ من النطاق',
      warn:'يقيس هذا الترتيب الحضور الموثق لوسائل الإعلام داخل المدونة المدروسة. وهو لا يقيس تلقائيا جمهورها أو مصداقيتها أو جودتها التحريرية أو تأثيرها العام.',
      method:'فهم الترتيب',
      mA:['لماذا هذا الترتيب مفيد','يبين الوسائل الأكثر تكرارا داخل مدونة محددة من المضامين المرتبطة بالنقاش السياسي المغربي خلال الفترة المدروسة. وهو بالنسبة لهيئة تحرير مؤشر تغطية: أين يعالَج الموضوع، وبأي نسبة.'],
      mB:['لماذا أفضل عشر وسائل وما الذي يُرتَّب','تتضمن معطيات الترتيب المتوفرة عشر وسائل وطنية وعشر وسائل دولية. وهذا الحصر في عشرين وسيلة مقصود وموثق. وتُرتَّب نطاقات النشر، لا المقالات المرجحة ولا الجمهور.'],
      mC:['كيف تُحتسب الرتبة وكيف تُحل حالات التساوي','الرتبة = ترتيب تنازلي لعدد الروابط الفريدة المرتبطة بالوسيلة في المعطيات المتوفرة. وعند التساوي يُعتمد الترتيب الأبجدي لاسم النطاق. لا معامل ولا ترجيح ولا معايرة. وتُحتسب الرتبة من جديد في كل نطاق: رتبة وطنية، رتبة دولية، ورتبة مقارنة في العرض المدمج.'],
      mL:['المدونة الكاملة مقابل العشرين وسيلة المعروضة','يعرض الترتيبان عشر وسائل وطنية وعشر وسائل دولية واردة في معطيات الترتيب. وتبلغ هذه الوسائل العشرون مجتمعة {top20} رابطا فريدا من أصل {press} رابط في مدونة الصحافة. أما باقي نطاقات المدونة فلا تُفصَّل في هذه الواجهة. المجاميع المتحقق منها — أفضل 10 وطنيا: {nat} رابطا؛ أفضل 10 دوليا: {int} رابطا؛ العرض المدمج: {top20} رابطا؛ مدونة الصحافة الكاملة: {press} رابطا. والعرض المدمج ليس ترتيبا شاملا لكل النطاقات الواردة في المدونة.'],
      mM:['الفرق بين النطاقات الثلاثة','أفضل 10 وطنيا وأفضل 10 دوليا ترتيبان منفصلان، لكل منهما رتبته الخاصة. ويجمع العرض المدمج هذه الوسائل العشرين فقط. والفارق في الحجم بين الفئتين كبير ({nat} مقابل {int} رابطا فريدا): لذلك تبقى المقارنة المباشرة بين وسيلة وطنية وأخرى دولية توثيقية لا تراتبية.'],
      mD:['كيف تُقرأ الرسوم','يقارن شريط الحضور النسبي روابط وسيلة بالوسيلة الأولى في النطاق المعروض (100٪). ويقارن شريط التوزيع كل وسيلة بمجموع النطاق. وتعرض بطاقة المقارنة المقادير نفسها، دون أي مؤشر مركب.'],
      mE:['ما تسمح المعطيات باستنتاجه','أن وسيلة أكثر أو أقل حضورا من أخرى في هذه المدونة وخلال هذه الفترة. وأن التغطية مركزة أو موزعة بين المصادر المعتمدة.'],
      mF:['ما لا تسمح باستنتاجه','لا الجمهور ولا القراء ولا المصداقية ولا الجودة التحريرية ولا الخط التحريري ولا التأثير ولا التنسيق بين الوسائل ولا السببية. الحضور المرتفع ليس تأييدا، والحضور الضعيف ليس عزوفا.'],
      mG:['المصادر والفترة','مدونة الصحافة المغربية بالفرنسية والعربية، {press} رابطا فريدا، الفترة {period}.'],
      mH:['إزالة التكرار والاستثناءات','يوفر مصدر الصحافة {press} رابطا محتسبة كروابط فريدة. أما الرقم الإجمالي للتكرارات المزالة على مستوى المنصة فلا يُنسب إلى هذه المدونة وحدها، ولذلك لا يُستعمل في هذه الواجهة. النطاقات المستثناة من المدونة: {excluded}.'],
      mI:['تعريف المؤشرات','الروابط الفريدة: عدد العناوين القانونية المتمايزة المرتبطة بالوسيلة في معطيات الترتيب. الحضور النسبي: الروابط الفريدة ÷ روابط الوسيلة الأولى في النطاق. الحصة من النطاق: الروابط الفريدة ÷ مجموع النطاق المعروض.'],
      mJ:['المؤشرات المستبعدة','يوجد في المعطيات الأصلية حقل «التأثير /100» لكن صيغته غير موثقة: فلا يُعرض ولا يُستعمل في تحديد الرتبة ولا يُدرج في أي رسم إشعاعي. كما ترد في المصدر قيم للمدى، غير أن تعريفها ووحدتها ومنهجها غير موثقة، ولذلك لا تُعرض.'],
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

  const entry = row => ({
    name: row.name,
    initials: row.initials || row.name.slice(0,2).toUpperCase(),
    color: row.color,
    scope: row.party === 'PRESSE NATIONALE' ? 'national' : 'international',
    urls: row.delta
  });
  const all = [...national.map(entry), ...international.map(entry)];
  const NAT_TOTAL = all.filter(m=>m.scope==='national').reduce((s,m)=>s+m.urls,0);
  const INT_TOTAL = all.filter(m=>m.scope==='international').reduce((s,m)=>s+m.urls,0);
  const TOP20_TOTAL = NAT_TOTAL + INT_TOTAL;

  const state = { scope:'national', query:'', selected:null, sort:'urls', dir:'desc' };

  const catOf = m => m.scope==='national' ? t('catNat') : t('catInt');
  const scopeLabel = () => state.scope==='all' ? t('scopeAll') : state.scope==='national' ? t('scopeNat') : t('scopeInt');
  const scopeDesc = () => state.scope==='all' ? t('descAll') : state.scope==='national' ? t('descNat') : t('descInt');

  const scoped = () => state.scope==='all' ? all : all.filter(m=>m.scope===state.scope);
  const sorted = () => {
    const dir = state.dir==='asc' ? 1 : -1;
    return [...scoped()].sort((a,b)=>{
      if (state.sort==='name') return a.name.localeCompare(b.name) * dir;
      return (a.urls - b.urls) * dir || a.name.localeCompare(b.name);
    });
  };
  // Rang documenté : toujours calculé sur le tri décroissant des URL uniques, égalités alphabétiques.
  const ranking = () => [...scoped()].sort((a,b)=>(b.urls-a.urls) || a.name.localeCompare(b.name));
  const rankOf = m => ranking().findIndex(x=>x.name===m.name) + 1;
  const visible = () => { const q = state.query.trim().toLowerCase(); return sorted().filter(m=>m.name.toLowerCase().includes(q)); };

  const shell = () => {
    const list = scoped(), total = list.reduce((s,m)=>s+m.urls,0);
    return `
      <div class="mv-head">
        <p class="mv-kicker">${esc(t('kicker'))}</p>
        <h1>${t('title')}</h1>
        <p class="mv-sub">${esc(t('subtitle'))}</p>
        <p class="mv-lede">${esc(t('lede'))}</p>
        <div class="mv-meta">
          <div><small>${esc(t('mPeriod'))}</small><strong>${esc(period())}</strong></div>
          <div><small>${esc(t('mCorpus'))}</small><strong>${fill(t('urlsUnit'),{n:fmt(M.pressUniqueUrls)})}</strong></div>
          <div><small>${esc(t('mMetric'))}</small><strong>${esc(t('mMetricV'))}</strong></div>
          <div><small>${esc(t('mData'))}</small><strong>${fill(t('urlsUnit'),{n:fmt(M.pressUniqueUrls)})}</strong></div>
        </div>
      </div>
      <div class="mv-toolbar">
        <div class="mv-seg" role="group" aria-label="${esc(t('ranking'))}">
          <button type="button" data-scope="national" aria-pressed="${state.scope==='national'}">${icon('newspaper',13)} ${esc(t('scopeNat'))}</button>
          <button type="button" data-scope="international" aria-pressed="${state.scope==='international'}">${icon('globe',13)} ${esc(t('scopeInt'))}</button>
          <button type="button" data-scope="all" aria-pressed="${state.scope==='all'}">${icon('layers',13)} ${esc(t('scopeAll'))}</button>
        </div>
        <label class="mv-search"><span>${esc(t('search'))}</span><input type="search" id="mv-q" value="${esc(state.query)}" placeholder="${esc(t('searchPh'))}" dir="ltr"></label>
      </div>
      <p class="mv-scopedesc">${esc(scopeDesc())}</p>
      <div class="mv-layout">
        <section class="mv-panel">
          <header><h2>${esc(t('ranking'))} · ${esc(scopeLabel())}</h2><small>${fill(t('rankingSub'),{n:fmt(list.length),u:fmt(total)})}</small></header>
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
        <div class="mv-dist-body"><div class="mv-stack" id="mv-stack" role="group" aria-label="${esc(t('distSub'))}"></div><div class="mv-legend" id="mv-legend"></div><p class="mv-note" style="margin-top:12px">${esc(t('distNote'))}</p></div>
      </section>
      <div class="mv-warn">${icon('alert',18)}<span>${esc(t('warn'))}</span></div>
      <section class="mv-panel" style="margin-top:12px">
        <header><h2>${esc(t('method'))}</h2></header>
        <div class="mv-method">${['mA','mB','mC','mL','mM','mD','mE','mF','mG','mH','mI','mJ','mK'].map(k=>{
          const [title,body] = t(k);
          const text = fill(body,{press:fmt(M.pressUniqueUrls),nat:fmt(NAT_TOTAL),int:fmt(INT_TOTAL),top20:fmt(TOP20_TOTAL),period:period(),excluded:(M.excludedDomains||[]).join(', ')});
          return `<details class="mv-acc"><summary>${esc(title)}</summary><p>${esc(text)}</p></details>`;
        }).join('')}</div>
      </section>`;
  };

  const renderRows = () => {
    const list = visible(), full = ranking(), max = Math.max(1,...full.map(m=>m.urls)), total = full.reduce((s,m)=>s+m.urls,0) || 1;
    const box = root.querySelector('#mv-rows');
    if (!list.length) { box.innerHTML = `<p class="mv-empty">${esc(t('empty'))}</p>`; return; }
    box.innerHTML = list.map(m=>{
      const rank = rankOf(m), share = m.urls/total*100, rel = m.urls/max*100;
      return `<button type="button" class="mv-row" data-media="${esc(m.name)}" aria-current="${state.selected===m.name}">
        <span class="mv-rank">${String(rank).padStart(2,'0')}</span>
        <span class="mv-name"><i class="mv-badge" style="--c:${m.color}">${esc(m.initials)}</i><span><strong>${bdi(m.name)}</strong><small>${esc(catOf(m))}</small></span></span>
        <span class="mv-urls">${fmt(m.urls)}</span>
        <span class="mv-share">${fmt(share,1)} %</span>
        <span class="mv-bar"><i style="width:${rel.toFixed(1)}%"></i></span>
      </button>`;
    }).join('');
  };

  const metric = (label,valueText,pct) => `<div class="mv-metric"><span>${esc(label)}<b>${valueText}</b></span><span class="mv-bar"><i style="width:${pct===null?0:Math.min(100,pct).toFixed(1)}%"></i></span></div>`;

  const renderDetail = () => {
    const box = root.querySelector('#mv-detail');
    const full = ranking(), m = full.find(x=>x.name===state.selected);
    if (!m) { box.innerHTML = `<p class="mv-na">${esc(t('ficheHint'))}</p>`; return; }
    const total = full.reduce((s,x)=>s+x.urls,0) || 1, max = Math.max(1,...full.map(x=>x.urls));
    box.innerHTML = `
      <h3>${bdi(m.name)}</h3>
      <dl class="mv-kv">
        <dt>${esc(t('fCategory'))}</dt><dd>${esc(catOf(m))}</dd>
        <dt>${esc(t('fScope'))}</dt><dd>${esc(scopeLabel())}</dd>
        <dt>${esc(t('fRank'))}</dt><dd>${fmt(rankOf(m))} / ${fmt(full.length)}</dd>
        <dt>${esc(t('fUrls'))}</dt><dd>${fmt(m.urls)}</dd>
        <dt>${esc(t('fShare'))}</dt><dd>${fmt(m.urls/total*100,1)} %</dd>
        <dt>${esc(t('fRel'))}</dt><dd>${fmt(m.urls/max*100,1)} %</dd>
        <dt>${esc(t('fPeriod'))}</dt><dd>${esc(period())}</dd>
        <dt>${esc(t('fSource'))}</dt><dd>${esc(t('sourceV'))}</dd>
      </dl>
      <div>
        <p class="mv-kicker" style="margin:0 0 8px">${esc(t('profile'))}</p>
        <div class="mv-profile">
          ${metric(t('pUrls'),fmt(m.urls),m.urls/max*100)}
          ${metric(t('pShare'),fmt(m.urls/total*100,1)+' %',m.urls/total*100)}
        </div>
      </div>
      <div class="mv-missing"><p class="mv-kicker" style="margin:0 0 6px">${esc(t('naTitle'))}</p><p>${esc(t('naBody'))}</p></div>
      <p class="mv-note">${esc(t('ficheNote'))}</p>`;
  };

  const stackFocus = () => {
    const a = document.activeElement;
    return a && a.classList?.contains('mv-seg-bar') ? a.dataset.media : null;
  };

  const renderStack = () => {
    const keep = stackFocus();
    const full = ranking(), total = full.reduce((s,m)=>s+m.urls,0) || 1;
    root.querySelector('#mv-stack').innerHTML = full.map(m=>{
      const share = m.urls/total*100;
      const label = fill(t('segLabel'),{name:m.name,rank:fmt(rankOf(m)),urls:fmt(m.urls),share:fmt(share,1)});
      return `<button type="button" class="mv-seg-bar" style="--c:${m.color};width:${share.toFixed(2)}%" data-media="${esc(m.name)}" aria-pressed="${state.selected===m.name}" aria-label="${esc(label)}" title="${esc(label)}"></button>`;
    }).join('');
    root.querySelector('#mv-legend').innerHTML = full.map(m=>`<span><i style="--c:${m.color}"></i>${bdi(m.name)} · ${fmt(m.urls/total*100,1)} %</span>`).join('');
    if (keep) root.querySelector(`#mv-stack .mv-seg-bar[data-media="${CSS.escape(keep)}"]`)?.focus();
  };

  const paint = () => { renderRows(); renderDetail(); renderStack(); };

  /* Délégation installée UNE SEULE FOIS sur `root` : render() ne réattache plus d'écouteurs
     (l'ancien bind() en ajoutait un jeu supplémentaire à chaque rendu → clics multiples). */
  let bound = false;
  const bindOnce = () => {
    if (bound) return;
    bound = true;
    root.addEventListener('click', e => {
      const scopeBtn = e.target.closest('[data-scope]');
      if (scopeBtn) { state.scope = scopeBtn.dataset.scope; state.selected = null; render(); return; }
      const sortBtn = e.target.closest('[data-sort]');
      if (sortBtn) {
        const key = sortBtn.dataset.sort;
        if (state.sort===key) state.dir = state.dir==='desc' ? 'asc' : 'desc';
        else { state.sort = key; state.dir = key==='name' ? 'asc' : 'desc'; }
        render(); return;
      }
      const el = e.target.closest('[data-media]');
      if (!el) return;
      state.selected = state.selected===el.dataset.media ? null : el.dataset.media;
      paint();
      if (state.selected && window.matchMedia('(max-width:1100px)').matches) root.querySelector('#mv-detail')?.scrollIntoView({behavior:'smooth',block:'center'});
    });
    root.addEventListener('input', e => { if (e.target.id === 'mv-q') { state.query = e.target.value; renderRows(); } });
    // Échap : écouté au niveau document (le re-rendu du bandeau peut faire perdre le focus interne)
    document.addEventListener('keydown', e => { if (e.key==='Escape' && state.selected) { state.selected=null; paint(); } });
  };

  function render(){
    const focusKey = document.activeElement && root.contains(document.activeElement)
      ? (document.activeElement.dataset?.scope ? `[data-scope="${document.activeElement.dataset.scope}"]`
        : document.activeElement.dataset?.sort ? `[data-sort="${document.activeElement.dataset.sort}"]` : null)
      : null;
    root.innerHTML = shell();
    paint();
    if (focusKey) root.querySelector(focusKey)?.focus();
  }

  bindOnce();
  render();
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  window.addEventListener('bf:theme',paint);
  window.addEventListener('bf:media-scope',e=>{ state.scope = e.detail==='national' ? 'national' : 'international'; state.selected=null; render(); });
})();
