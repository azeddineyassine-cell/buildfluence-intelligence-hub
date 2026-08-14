/* ===== OPINION — Cockpit du débat public (Buildfluence Intelligence Politique)
   Source unique : canonical-monitoring-data.js. Aucune valeur simulée, aucune série temporelle.
   Métriques documentées : occurrences thématiques, tonalités positif/neutre/négatif,
   visibilité relative (occurrences / occurrences du sujet le plus visible x 100),
   balance narrative ((positif - négatif) / total tonalités x 100),
   associations sujets-acteurs (cooccurrences issues du graphe canonique),
   répartition par canal (opinionBreakdowns.channels). ===== */
(() => {
  const root = document.getElementById('opinion-insights');
  const data = window.canonicalMonitoringData;
  if (!root || !data) return;

  const lang = () => ['fr', 'en', 'ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
  const locale = () => lang() === 'ar' ? 'ar-MA' : lang() === 'en' ? 'en-GB' : 'fr-FR';
  const rtl = () => lang() === 'ar';
  const fmt = v => Number(v || 0).toLocaleString(locale());
  const dec = (v, d = 1) => Number(v).toLocaleString(locale(), { minimumFractionDigits: d, maximumFractionDigits: d });
  const signed = v => (v > 0 ? '+' : v < 0 ? '\u2212' : '') + dec(Math.abs(v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Libellés ---------- */
  const T = {
    fr: {
      kicker: 'OPINION CITOYENNE', title: 'Cockpit du <em>débat public</em>',
      intro: 'Cette vue décrit les sujets présents dans le corpus Opinion citoyenne : 5 498 URL uniques dédupliquées, du 29 juillet au 5 août 2026, hors Wikipédia et Wiktionary. Elle documente la visibilité, la tonalité et les acteurs associés à sept sujets. Elle ne constitue ni un sondage d’opinion, ni une mesure des intentions de vote.',
      d1: 'SUJET DOMINANT DU DÉBAT PUBLIC', d2: 'RÉPARTITION PAR CANAL', d3: 'RÉPARTITION PAR TONALITÉ',
      d1sub: 'Poids documentaire des sept sujets dans les occurrences thématiques observées.',
      d2sub: 'Origine des 5 498 URL uniques du corpus Opinion citoyenne.',
      d3sub: 'Tonalité consolidée des 5 498 URL uniques du corpus Opinion citoyenne.',
      dominant: 'SUJET DOMINANT', ofTopics: 'des occurrences thématiques', ofCorpus: 'du corpus Opinion',
      occ: 'occurrences', urls: 'URL uniques', actors: 'acteurs documentés', cooc: 'cooccurrences',
      reading: 'Lecture', limit: 'Limite',
      lTopic: 'Présence documentaire dans le corpus observé, pas importance politique.',
      lChannel: 'Répartition des URL collectées, pas mesure d’audience ni de portée.',
      lTone: 'Tonalité consolidée par URL unique. 98 conflits de tonalité ont été arbitrés dans ce corpus.',
      rMostVisible: 'Sujet le plus visible sur la période.', rMostNeg: 'Balance narrative la plus négative des sept sujets.',
      rMostPos: 'Balance narrative la plus positive, à rapporter à un volume plus faible.',
      rMostConn: 'Sujet associé au plus grand nombre d’acteurs documentés.',
      rTopic: 'Sujet documenté du débat public observé.',
      filters: 'TONALITÉ DOMINANTE', all: 'TOUTES', fNeg: 'NÉGATIVE', fNeu: 'NEUTRE', fPos: 'POSITIVE',
      reset: 'RÉINITIALISER', focus: 'MODE FOCALISÉ',
      cockpit: 'VISIBILITÉ × BALANCE NARRATIVE', cockpitSub: 'Sept sujets positionnés sur deux indicateurs documentés. La taille du marqueur correspond aux occurrences thématiques.',
      axisX: 'Balance narrative (−100 à +100)', axisY: 'Visibilité relative (0 à 100)',
      table: 'TABLEAU DES SUJETS', thTopic: 'Sujet', thOcc: 'Occurrences', thVis: 'Visibilité', thBal: 'Balance', thPos: 'Positif', thNeu: 'Neutre', thNeg: 'Négatif', thAct: 'Acteurs',
      sortHint: 'Trier', asc: 'croissant', desc: 'décroissant',
      sheet: 'FICHE ANALYTIQUE', noSel: 'Sélectionnez un sujet dans un camembert, le cockpit ou le tableau pour afficher sa fiche documentée.',
      visibility: 'Visibilité relative', balance: 'Balance narrative', mentions: 'Occurrences thématiques', tones: 'Tonalités documentées',
      assoc: 'Acteurs associés (cooccurrences)', relations: 'Cooccurrences documentées', unavailable: 'Donnée indisponible',
      naTitle: 'DONNÉES NON DISPONIBLES', naItems: ['Série temporelle par sujet', 'Portée ou audience', 'Relation sujet-média'],
      local: 'ACTEURS ASSOCIÉS AU SUJET SÉLECTIONNÉ',
      localSub: 'Vue locale : seul le sujet sélectionné et ses acteurs directement associés sont affichés. La vue globale de l’écosystème reste la Galaxie décisionnelle.',
      linksTitle: 'ASSOCIATIONS DOCUMENTÉES', noLinks: 'Aucune association documentée pour cette sélection.',
      localEmpty: 'Sélectionnez un sujet pour afficher les acteurs qui lui sont documentés.',
      coocWarn: 'Une cooccurrence documentée n’implique ni alliance, ni soutien, ni opposition, ni causalité.',
      party: 'Parti politique', leader: 'Leader politique',
      value: 'Comprendre l’analyse de l’opinion'.toUpperCase(),
      valueBody: ['Cette vue transforme les contenus publics observés en indicateurs de visibilité, de tonalité et d’association entre sujets et acteurs. Elle permet au responsable de la communication et au décideur d’identifier les thèmes qui concentrent l’attention, de repérer les cadrages négatifs susceptibles d’affecter la réputation et de comprendre quels acteurs sont documentés autour de chaque sujet.',
        'Elle aide ainsi à hiérarchiser les enjeux de communication, à approfondir les signaux défavorables et à préparer une réponse fondée sur des contenus observables. Elle ne constitue ni un sondage d’opinion, ni une mesure des intentions de vote, ni une preuve de causalité.'],
      metho: 'MÉTHODE ET LIMITES', period: 'Période', source: 'Source', method: 'Méthode',
      m: [
        ['A. Ce que cette vue analyse', 'Les sujets détectés dans un corpus numérique délimité, leur visibilité documentaire, leur tonalité consolidée et les acteurs qui leur sont associés.'],
        ['B. Corpus et période', '5 498 URL uniques dédupliquées issues du fichier « 29.07_05.08 - Liste des Mentions opinion citoyenne.xlsx », du 29 juillet au 5 août 2026.'],
        ['C. Calcul de la visibilité', 'Visibilité relative = occurrences du sujet / occurrences du sujet le plus visible × 100. La part affichée rapporte le sujet aux 4 698 occurrences thématiques des sept sujets.'],
        ['D. Calcul de la balance narrative', 'Balance = (positif − négatif) / (positif + neutre + négatif) × 100, bornée de −100 à +100.'],
        ['E. Obtention des tonalités', 'Chaque URL unique reçoit une tonalité consolidée. 98 conflits de tonalité ont été arbitrés dans le corpus opinion.'],
        ['F. Relations sujets-acteurs', 'Elles proviennent des cooccurrences entre un sujet et un acteur dans une même mention, après déduplication des URL.'],
        ['G. Canaux', 'La répartition par canal provient des métadonnées de collecte du corpus : Twitter/X, Facebook, presse, blogs et autres sources.'],
        ['H. Absence de mesure temporelle', 'Le corpus actuel ne permet pas de mesurer une évolution temporelle par sujet. Aucune tendance n’est extrapolée.'],
        ['I. Ce que les données permettent de conclure', 'La hiérarchie de présence des sujets sur la période, la structure de leur tonalité et les acteurs documentés à leurs côtés.'],
        ['J. Ce qu’elles ne permettent pas de conclure', 'Aucune intention de vote, aucune représentativité de la population, aucune causalité, aucune prédiction.'],
        ['K. Sources, exclusions et limites', 'Exclusions : wikipedia.org et wiktionary.org. Une URL peut être reliée à plusieurs sujets : les occurrences thématiques ne forment pas une partition exclusive des 5 498 URL.'],
        ['L. Mise à jour', 'Corpus arrêté au 5 août 2026.']
      ],
      warn: 'Cette analyse décrit des contenus et relations observés dans un corpus numérique délimité. Elle ne constitue ni un sondage d’opinion, ni une mesure des intentions de vote, ni une représentation de l’ensemble de la population.',
      close: 'Fermer', selected: 'Sujet sélectionné', share: 'Part', details: 'Détail'
    },
    en: {
      kicker: 'CITIZEN OPINION', title: 'Cockpit of the <em>public debate</em>',
      intro: 'This view describes the issues present in the Citizen Opinion corpus: 5,498 deduplicated unique URLs, from 29 July to 5 August 2026, excluding Wikipedia and Wiktionary. It documents visibility, tone and associated actors for seven issues. This analysis is neither an opinion poll nor a measure of voting intention.',
      d1: 'DOMINANT ISSUE OF THE PUBLIC DEBATE', d2: 'BREAKDOWN BY CHANNEL', d3: 'BREAKDOWN BY TONE',
      d1sub: 'Documentary weight of the seven issues within observed thematic occurrences.',
      d2sub: 'Origin of the 5,498 unique URLs in the Citizen Opinion corpus.',
      d3sub: 'Consolidated tone of the 5,498 unique URLs in the Citizen Opinion corpus.',
      dominant: 'DOMINANT ISSUE', ofTopics: 'of thematic occurrences', ofCorpus: 'of the Opinion corpus',
      occ: 'occurrences', urls: 'unique URLs', actors: 'documented actors', cooc: 'co-occurrences',
      reading: 'Reading', limit: 'Limitation',
      lTopic: 'Documentary presence in the observed corpus, not political importance.',
      lChannel: 'Distribution of collected URLs, not an audience or reach measurement.',
      lTone: 'Tone consolidated per unique URL. 98 tone conflicts were arbitrated in this corpus.',
      rMostVisible: 'Most visible issue over the period.', rMostNeg: 'Most negative narrative balance of the seven issues.',
      rMostPos: 'Most positive narrative balance, to be read against a lower volume.',
      rMostConn: 'Issue associated with the largest number of documented actors.',
      rTopic: 'Documented issue of the observed public debate.',
      filters: 'DOMINANT TONE', all: 'ALL', fNeg: 'NEGATIVE', fNeu: 'NEUTRAL', fPos: 'POSITIVE',
      reset: 'RESET', focus: 'FOCUS MODE',
      cockpit: 'VISIBILITY × NARRATIVE BALANCE', cockpitSub: 'Seven issues positioned on two documented indicators. Marker size reflects thematic occurrences.',
      axisX: 'Narrative balance (−100 to +100)', axisY: 'Relative visibility (0 to 100)',
      table: 'ISSUE TABLE', thTopic: 'Issue', thOcc: 'Occurrences', thVis: 'Visibility', thBal: 'Balance', thPos: 'Positive', thNeu: 'Neutral', thNeg: 'Negative', thAct: 'Actors',
      sortHint: 'Sort', asc: 'ascending', desc: 'descending',
      sheet: 'ANALYTICAL SHEET', noSel: 'Select an issue in a pie chart, the cockpit or the table to display its documented sheet.',
      visibility: 'Relative visibility', balance: 'Narrative balance', mentions: 'Thematic occurrences', tones: 'Documented tones',
      assoc: 'Associated actors (co-occurrences)', relations: 'Documented co-occurrences', unavailable: 'Data unavailable',
      naTitle: 'DATA NOT AVAILABLE', naItems: ['Time series per issue', 'Reach or audience', 'Issue-media relationship'],
      local: 'ACTORS ASSOCIATED WITH THE SELECTED ISSUE',
      localSub: 'Local view: only the selected issue and its directly associated actors are shown. The global ecosystem view remains the Decision Galaxy.',
      linksTitle: 'DOCUMENTED ASSOCIATIONS', noLinks: 'No documented association for this selection.',
      localEmpty: 'Select an issue to display the actors documented alongside it.',
      coocWarn: 'A documented co-occurrence implies neither alliance, nor support, nor opposition, nor causality.',
      party: 'Political party', leader: 'Political leader',
      value: 'UNDERSTANDING THE OPINION ANALYSIS',
      valueBody: ['This view turns observed public content into indicators of visibility, tone and association between issues and actors. It allows communication leads and decision-makers to identify the themes that concentrate attention, to spot negative framings likely to affect reputation, and to understand which actors are documented around each issue.',
        'It therefore helps prioritise communication stakes, investigate unfavourable signals and prepare a response grounded in observable content. It is neither an opinion poll, nor a measure of voting intention, nor proof of causality.'],
      metho: 'METHOD AND LIMITATIONS', period: 'Period', source: 'Source', method: 'Method',
      m: [
        ['A. What this view analyses', 'Issues detected in a bounded digital corpus, their documentary visibility, their consolidated tone and the actors associated with them.'],
        ['B. Corpus and period', '5,498 deduplicated unique URLs from “29.07_05.08 - Liste des Mentions opinion citoyenne.xlsx”, 29 July to 5 August 2026.'],
        ['C. Visibility calculation', 'Relative visibility = issue occurrences / occurrences of the most visible issue × 100. The displayed share relates the issue to the 4,698 thematic occurrences of the seven issues.'],
        ['D. Narrative balance calculation', 'Balance = (positive − negative) / (positive + neutral + negative) × 100, bounded from −100 to +100.'],
        ['E. How tones are obtained', 'Each unique URL receives a consolidated tone. 98 tone conflicts were arbitrated in the opinion corpus.'],
        ['F. Issue-actor relations', 'They come from co-occurrences between an issue and an actor within the same mention, after URL deduplication.'],
        ['G. Channels', 'The channel breakdown comes from the corpus collection metadata: Twitter/X, Facebook, press, blogs and other sources.'],
        ['H. No temporal measurement', 'The current corpus does not allow a temporal evolution per issue to be measured. No trend is extrapolated.'],
        ['I. What the data supports', 'The hierarchy of issue presence over the period, the structure of their tone and the actors documented alongside them.'],
        ['J. What the data does not support', 'No voting intention, no population representativeness, no causality, no prediction.'],
        ['K. Sources, exclusions and limits', 'Exclusions: wikipedia.org and wiktionary.org. One URL may relate to several issues: thematic occurrences are not an exclusive partition of the 5,498 URLs.'],
        ['L. Update', 'Corpus closed on 5 August 2026.']
      ],
      warn: 'This analysis describes content and relations observed in a bounded digital corpus. It is neither an opinion poll, nor a measure of voting intention, nor a representation of the whole population.',
      close: 'Close', selected: 'Selected issue', share: 'Share', details: 'Detail'
    },
    ar: {
      kicker: 'رأي المواطنين', title: 'قمرة قيادة <em>النقاش العمومي</em>',
      intro: 'تصف هذه الواجهة المواضيع الحاضرة في مجموعة بيانات رأي المواطنين: 5,498 رابطا فريدا بعد إزالة التكرار، من 29 يوليو إلى 5 أغسطس 2026، باستثناء ويكيبيديا وويكاموس. وتوثق الحضور والنبرة والفاعلين المرتبطين بسبعة مواضيع. ولا يشكل هذا التحليل استطلاعا للرأي ولا قياسا لنوايا التصويت.',
      d1: 'الموضوع المهيمن في النقاش العمومي', d2: 'التوزيع حسب القناة', d3: 'التوزيع حسب النبرة',
      d1sub: 'الوزن التوثيقي للمواضيع السبعة داخل الورودات الموضوعاتية المرصودة.',
      d2sub: 'مصدر 5,498 رابطا فريدا في مجموعة رأي المواطنين.',
      d3sub: 'النبرة الموحدة لـ 5,498 رابطا فريدا في مجموعة رأي المواطنين.',
      dominant: 'الموضوع المهيمن', ofTopics: 'من الورودات الموضوعاتية', ofCorpus: 'من مجموعة الرأي',
      occ: 'ورودات', urls: 'روابط فريدة', actors: 'فاعلون موثقون', cooc: 'تزامنات',
      reading: 'قراءة', limit: 'حد منهجي',
      lTopic: 'حضور توثيقي داخل المجموعة المرصودة، وليس أهمية سياسية.',
      lChannel: 'توزيع الروابط المجمعة، وليس قياسا للجمهور أو المدى.',
      lTone: 'نبرة موحدة لكل رابط فريد. تم تحكيم 98 تعارضا في النبرة داخل هذه المجموعة.',
      rMostVisible: 'الموضوع الأكثر حضورا خلال الفترة.', rMostNeg: 'أكثر توازن سردي سلبية بين المواضيع السبعة.',
      rMostPos: 'أكثر توازن سردي إيجابية، ويقرأ بالنظر إلى حجم أقل.',
      rMostConn: 'الموضوع المرتبط بأكبر عدد من الفاعلين الموثقين.',
      rTopic: 'موضوع موثق ضمن النقاش العمومي المرصود.',
      filters: 'النبرة المهيمنة', all: 'الكل', fNeg: 'سلبية', fNeu: 'محايدة', fPos: 'إيجابية',
      reset: 'إعادة الضبط', focus: 'وضع التركيز',
      cockpit: 'الظهور × التوازن السردي', cockpitSub: 'سبعة مواضيع موزعة على مؤشرين موثقين. يعكس حجم العلامة الورودات الموضوعاتية.',
      axisX: 'التوازن السردي (−100 إلى +100)', axisY: 'الظهور النسبي (0 إلى 100)',
      table: 'جدول المواضيع', thTopic: 'الموضوع', thOcc: 'الورودات', thVis: 'الظهور', thBal: 'التوازن', thPos: 'إيجابي', thNeu: 'محايد', thNeg: 'سلبي', thAct: 'الفاعلون',
      sortHint: 'ترتيب', asc: 'تصاعدي', desc: 'تنازلي',
      sheet: 'البطاقة التحليلية', noSel: 'اختر موضوعا من المبيانات الدائرية أو قمرة القيادة أو الجدول لعرض بطاقته الموثقة.',
      visibility: 'الظهور النسبي', balance: 'التوازن السردي', mentions: 'الورودات الموضوعاتية', tones: 'النبرات الموثقة',
      assoc: 'الفاعلون المرتبطون (تزامنات)', relations: 'تزامنات موثقة', unavailable: 'المعطى غير متوفر',
      naTitle: 'معطيات غير متوفرة', naItems: ['سلسلة زمنية لكل موضوع', 'المدى أو الجمهور', 'العلاقة بين الموضوع والوسيلة'],
      local: 'الفاعلون المرتبطون بالموضوع المختار',
      localSub: 'عرض محلي: يظهر فقط الموضوع المختار والفاعلون المرتبطون به مباشرة. يبقى العرض الشامل للمنظومة هو مجرة القرار.',
      linksTitle: 'الارتباطات الموثقة', noLinks: 'لا توجد ارتباطات موثقة لهذا الاختيار.',
      localEmpty: 'اختر موضوعا لعرض الفاعلين الموثقين إلى جانبه.',
      coocWarn: 'التزامن الموثق لا يعني تحالفا ولا دعما ولا معارضة ولا سببية.',
      party: 'حزب سياسي', leader: 'قائد سياسي',
      value: 'فهم تحليل الرأي',
      valueBody: ['تحول هذه الواجهة المحتويات العمومية المرصودة إلى مؤشرات للظهور والنبرة والارتباط بين المواضيع والفاعلين. وهي تمكن مسؤول التواصل وصاحب القرار من تحديد الموضوعات التي تستقطب الانتباه، ورصد التأطيرات السلبية التي قد تمس السمعة، وفهم الفاعلين الموثقين حول كل موضوع.',
        'وبذلك تساعد على ترتيب أولويات التواصل، وتعميق تحليل الإشارات غير المواتية، وإعداد رد مبني على محتويات قابلة للملاحظة. وهي ليست استطلاعا للرأي ولا قياسا لنوايا التصويت ولا دليلا على السببية.'],
      metho: 'المنهجية والحدود', period: 'الفترة', source: 'المصدر', method: 'المنهج',
      m: [
        ['أ. ما تحلله هذه الواجهة', 'المواضيع المرصودة داخل مجموعة رقمية محددة، وحضورها التوثيقي، ونبرتها الموحدة، والفاعلون المرتبطون بها.'],
        ['ب. المجموعة والفترة', '5,498 رابطا فريدا بعد إزالة التكرار من ملف رأي المواطنين، من 29 يوليو إلى 5 أغسطس 2026.'],
        ['ج. حساب الظهور', 'الظهور النسبي = ورودات الموضوع / ورودات الموضوع الأكثر حضورا × 100. وتنسب الحصة المعروضة إلى 4,698 ورودا موضوعاتيا للمواضيع السبعة.'],
        ['د. حساب التوازن السردي', 'التوازن = (إيجابي − سلبي) / (إيجابي + محايد + سلبي) × 100، محصور بين −100 و+100.'],
        ['هـ. كيفية الحصول على النبرات', 'يحصل كل رابط فريد على نبرة موحدة. وتم تحكيم 98 تعارضا في النبرة داخل مجموعة الرأي.'],
        ['و. العلاقات بين المواضيع والفاعلين', 'تنبع من تزامن ذكر موضوع وفاعل داخل المنشور نفسه، بعد إزالة تكرار الروابط.'],
        ['ز. القنوات', 'يأتي التوزيع حسب القناة من بيانات التجميع: تويتر/إكس، فيسبوك، الصحافة، المدونات ومصادر أخرى.'],
        ['ح. غياب القياس الزمني', 'لا تسمح المجموعة الحالية بقياس تطور زمني لكل موضوع. ولا يتم استقراء أي اتجاه.'],
        ['ط. ما تسمح به المعطيات', 'ترتيب حضور المواضيع خلال الفترة، وبنية نبرتها، والفاعلون الموثقون إلى جانبها.'],
        ['ي. ما لا تسمح به المعطيات', 'لا نية تصويت ولا تمثيلية للسكان ولا سببية ولا تنبؤ.'],
        ['ك. المصادر والاستثناءات والحدود', 'الاستثناءات: wikipedia.org وwiktionary.org. قد يرتبط رابط واحد بعدة مواضيع، لذا لا تشكل الورودات الموضوعاتية تقسيما حصريا للروابط.'],
        ['ل. التحيين', 'أغلقت المجموعة في 5 أغسطس 2026.']
      ],
      warn: 'يصف هذا التحليل محتويات وعلاقات مرصودة داخل مجموعة رقمية محددة. وهو ليس استطلاعا للرأي ولا قياسا لنوايا التصويت ولا تمثيلا لمجموع السكان.',
      close: 'إغلاق', selected: 'الموضوع المختار', share: 'الحصة', details: 'تفصيل'
    }
  };

  const topicLabels = {
    en: { 'Sebta / migration': 'Ceuta / migration', 'Emploi / chômage': 'Employment / unemployment', 'Eau / sécheresse': 'Water / drought', 'Justice': 'Justice', 'Corruption': 'Corruption', 'Santé': 'Health', 'Éducation': 'Education' },
    ar: { 'Sebta / migration': 'سبتة / الهجرة', 'Emploi / chômage': 'التشغيل / البطالة', 'Eau / sécheresse': 'الماء / الجفاف', 'Justice': 'العدالة', 'Corruption': 'الفساد', 'Santé': 'الصحة', 'Éducation': 'التعليم' }
  };
  const actorLabels = {
    en: { 'Parti de l’Istiqlal': 'Istiqlal Party', 'Mouvement Populaire': 'Popular Movement' },
    ar: { 'RNI': 'التجمع الوطني للأحرار', 'Parti de l’Istiqlal': 'حزب الاستقلال', 'PAM': 'الأصالة والمعاصرة', 'PJD': 'العدالة والتنمية', 'PPS': 'التقدم والاشتراكية', 'Mouvement Populaire': 'الحركة الشعبية', 'USFP': 'الاتحاد الاشتراكي', 'FFD': 'جبهة القوى الديمقراطية', 'UC': 'الاتحاد الدستوري', 'Aziz Akhannouch': 'عزيز أخنوش', 'Driss Lachgar': 'إدريس لشكر', 'Abdellah Benkirane': 'عبد الإله بنكيران', 'Nizar Baraka': 'نزار بركة', 'Mohamed Nabil Benabdallah': 'محمد نبيل بنعبد الله' }
  };
  const channelLabels = {
    fr: { twitter: 'Twitter/X', facebook: 'Facebook', news: 'Presse', blogs: 'Blogs', other: 'Autres' },
    en: { twitter: 'Twitter/X', facebook: 'Facebook', news: 'Press', blogs: 'Blogs', other: 'Other' },
    ar: { twitter: 'تويتر/إكس', facebook: 'فيسبوك', news: 'الصحافة', blogs: 'المدونات', other: 'أخرى' }
  };
  const bidi = s => /[A-Za-z]/.test(s) && rtl() ? `<bdi dir="ltr">${esc(s)}</bdi>` : esc(s);
  const tTopic = n => topicLabels[lang()]?.[n] || n;
  const tActor = n => actorLabels[lang()]?.[n] || n;

  /* ---------- Données dérivées ---------- */
  const graph = data.graph || { nodes: [], edges: [] };
  const groupOf = name => (graph.nodes.find(n => n.name === name) || {}).group;
  const themeNames = new Set(data.topics.map(t => t.name));
  const relations = {};
  (graph.edges || []).forEach(([a, b, value]) => {
    [[a, b], [b, a]].forEach(([x, y]) => {
      if (!themeNames.has(x)) return;
      const g = groupOf(y);
      if (g !== 'parti' && g !== 'acteur') return;
      (relations[x] = relations[x] || []).push({ name: y, group: g, value });
    });
  });
  Object.values(relations).forEach(list => list.sort((p, q) => q.value - p.value || p.name.localeCompare(q.name)));

  const topics = data.topics.map(t => {
    const tot = t.tones.positive + t.tones.neutral + t.tones.negative;
    const links = relations[t.name] || [];
    const dominant = t.tones.negative >= t.tones.positive && t.tones.negative >= t.tones.neutral ? 'neg'
      : t.tones.positive >= t.tones.neutral ? 'pos' : 'neu';
    return {
      name: t.name, mentions: t.mentions, tones: t.tones, toneTotal: tot,
      balance: tot ? (t.tones.positive - t.tones.negative) / tot * 100 : 0,
      dominant, links, cooc: links.reduce((n, l) => n + l.value, 0)
    };
  });
  const maxMentions = Math.max(...topics.map(t => t.mentions));
  const occTotal = topics.reduce((n, t) => n + t.mentions, 0);
  topics.forEach(t => { t.visibility = t.mentions / maxMentions * 100; t.share = t.mentions / occTotal * 100; });

  const mostVisible = [...topics].sort((a, b) => b.mentions - a.mentions)[0];
  const mostNegative = [...topics].sort((a, b) => a.balance - b.balance)[0];
  const mostPositive = [...topics].sort((a, b) => b.balance - a.balance)[0];
  const mostConnected = [...topics].sort((a, b) => b.links.length - a.links.length || b.cooc - a.cooc)[0];

  const channels = Object.entries(data.opinionBreakdowns?.channels || {}).map(([k, v]) => ({ key: k, value: v }));
  const channelTotal = channels.reduce((n, c) => n + c.value, 0);
  const toneTotals = data.toneTotals || { positive: 0, neutral: 0, negative: 0 };
  const toneTotalSum = toneTotals.positive + toneTotals.neutral + toneTotals.negative;

  /* ---------- État ---------- */
  const state = { selected: null, tone: 'all', sort: { key: 'occ', dir: -1 }, focus: false, tip: null };
  const filtered = () => topics.filter(t => state.tone === 'all' || t.dominant === state.tone);
  const sorted = () => {
    const { key, dir } = state.sort;
    const val = t => key === 'bal' ? t.balance : key === 'act' ? t.links.length * 1e6 + t.cooc : t.mentions;
    return [...filtered()].sort((a, b) => (val(a) - val(b)) * dir || a.name.localeCompare(b.name));
  };
  const current = () => topics.find(t => t.name === state.selected) || null;

  const TONE = { pos: 'var(--tone-pos)', neu: 'var(--tone-neu)', neg: 'var(--tone-neg)' };
  const TONE_MARK = { pos: '▲', neu: '■', neg: '▼' };
  const TOPIC_COLORS = ['#C9A84C', '#4E6A80', '#9C8437', '#2F5470', '#7A8C99', '#1C3D57', '#B08C57'];
  const CHANNEL_COLORS = ['#C9A84C', '#2F5470', '#7A8C99', '#9C8437', '#4E6A80'];

  /* ---------- Camemberts ---------- */
  const arc = (cx, cy, r, a0, a1) => {
    const p = (a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`;
  };

  const tips = new Map();
  function donut(id, segments, total, centerTop, centerMain, centerSub) {
    const S = 220, c = S / 2, r = 96, hole = 56;
    let a = -Math.PI / 2;
    const paths = segments.map((s, i) => {
      const a1 = a + (s.value / total) * Math.PI * 2;
      const d = arc(c, c, r, a, a1);
      a = a1;
      const tipId = id + '-' + i;
      tips.set(tipId, s.tip);
      const on = s.topic && state.selected === s.topic;
      return `<path class="oi-seg-path${on ? ' on' : ''}" d="${d}" fill="${s.color}" stroke="var(--panel)" stroke-width="1.5" tabindex="0" role="button" aria-pressed="${!!on}" data-tip="${tipId}"${s.topic ? ` data-topic-seg="${esc(s.topic)}"` : ''} aria-label="${esc(s.aria)}"></path>`;
    }).join('');
    return `<div class="oi-donut"><svg viewBox="0 0 ${S} ${S}" role="group" aria-label="${esc(centerTop)}" dir="ltr">${paths}<circle cx="${c}" cy="${c}" r="${hole}" fill="var(--panel)"/></svg>
      <div class="oi-donut-center"><small>${esc(centerTop)}</small><strong>${bidi(centerMain)}</strong><span>${esc(centerSub)}</span></div></div>`;
  }

  function legend(segments) {
    return `<ul class="oi-legend">${segments.map(s => `<li${s.topic ? ` data-topic="${esc(s.topic)}"` : ''}><i style="background:${s.color}">${s.mark || ''}</i><span>${bidi(s.label)}</span><b>${fmt(s.value)}</b><em>${dec(s.pct)} %</em></li>`).join('')}</ul>`;
  }

  function topicSegments(x) {
    return [...topics].sort((a, b) => b.mentions - a.mentions).map((t, i) => {
      const reading = t === mostVisible ? x.rMostVisible : t === mostNegative ? x.rMostNeg : t === mostPositive ? x.rMostPos : t === mostConnected ? x.rMostConn : x.rTopic;
      return {
        label: tTopic(t.name), value: t.mentions, pct: t.mentions / occTotal * 100, color: TOPIC_COLORS[i % TOPIC_COLORS.length], topic: t.name,
        aria: `${tTopic(t.name)} · ${fmt(t.mentions)} ${x.occ} · ${dec(t.mentions / occTotal * 100)} %`,
        tip: {
          title: tTopic(t.name),
          rows: [[x.occ, fmt(t.mentions)], [x.share, dec(t.mentions / occTotal * 100) + ' % ' + x.ofTopics], [x.balance, signed(t.balance)], [x.actors, fmt(t.links.length)]],
          reading, limit: x.lTopic, topic: t.name
        }
      };
    });
  }

  function channelSegments(x) {
    const L = channelLabels[lang()];
    return channels.map((c, i) => ({
      label: L[c.key] || c.key, value: c.value, pct: c.value / channelTotal * 100, color: CHANNEL_COLORS[i % CHANNEL_COLORS.length],
      aria: `${L[c.key] || c.key} · ${fmt(c.value)} ${x.urls} · ${dec(c.value / channelTotal * 100)} %`,
      tip: { title: L[c.key] || c.key, rows: [[x.urls, fmt(c.value)], [x.share, dec(c.value / channelTotal * 100) + ' % ' + x.ofCorpus]], reading: x.d2sub, limit: x.lChannel }
    }));
  }

  function toneSegments(x) {
    return [['pos', x.fPos, toneTotals.positive], ['neu', x.fNeu, toneTotals.neutral], ['neg', x.fNeg, toneTotals.negative]].map(([k, l, v]) => ({
      label: l, value: v, pct: v / toneTotalSum * 100, color: TONE[k], mark: TONE_MARK[k],
      aria: `${l} · ${fmt(v)} ${x.urls} · ${dec(v / toneTotalSum * 100)} %`,
      tip: { title: TONE_MARK[k] + ' ' + l, rows: [[x.urls, fmt(v)], [x.share, dec(v / toneTotalSum * 100) + ' % ' + x.ofCorpus]], reading: x.d3sub, limit: x.lTone }
    }));
  }

  function funnel(x) {
    tips.clear();
    const ts = topicSegments(x), cs = channelSegments(x), os = toneSegments(x);
    const domCh = [...cs].sort((a, b) => b.value - a.value)[0];
    const domTone = [...os].sort((a, b) => b.value - a.value)[0];
    return `<section class="oi-funnel" aria-label="${esc(x.d1)}">
      <article class="oi-card oi-pie"><header><p class="kicker">${esc(x.d1)}</p><p class="oi-sub">${esc(x.d1sub)}</p></header>
        ${donut('topic', ts, occTotal, x.dominant, tTopic(mostVisible.name), dec(mostVisible.share) + ' % · ' + fmt(mostVisible.mentions) + ' ' + x.occ)}${legend(ts)}</article>
      <article class="oi-card oi-pie"><header><p class="kicker">${esc(x.d2)}</p><p class="oi-sub">${esc(x.d2sub)}</p></header>
        ${donut('chan', cs, channelTotal, x.d2, domCh.label, dec(domCh.pct) + ' % · ' + fmt(domCh.value) + ' ' + x.urls)}${legend(cs)}</article>
      <article class="oi-card oi-pie"><header><p class="kicker">${esc(x.d3)}</p><p class="oi-sub">${esc(x.d3sub)}</p></header>
        ${donut('tone', os, toneTotalSum, x.d3, domTone.mark + ' ' + domTone.label, dec(domTone.pct) + ' % · ' + fmt(domTone.value) + ' ' + x.urls)}${legend(os)}</article>
    </section>`;
  }

  /* ---------- Cockpit ---------- */
  function cockpit(x) {
    const W = 760, H = 470, P = { t: 48, r: 26, b: 54, l: 62 };
    const px = b => P.l + (b + 100) / 200 * (W - P.l - P.r);
    const py = v => H - P.b - v / 100 * (H - P.t - P.b);
    const list = filtered();
    const grid = [-100, -50, 0, 50, 100].map(b => `<line x1="${px(b)}" y1="${P.t}" x2="${px(b)}" y2="${H - P.b}" class="${b === 0 ? 'oi-axis0' : 'oi-grid'}"/><text x="${px(b)}" y="${H - P.b + 20}" class="oi-tick" text-anchor="middle">${b > 0 ? '+' + b : b < 0 ? '\u2212' + Math.abs(b) : b}</text>`).join('')
      + [0, 25, 50, 75, 100].map(v => `<line x1="${P.l}" y1="${py(v)}" x2="${W - P.r}" y2="${py(v)}" class="oi-grid"/><text x="${P.l - 10}" y="${py(v) + 4}" class="oi-tick" text-anchor="end">${v}</text>`).join('');
    const dots = list.map(t => {
      const r = 10 + Math.sqrt(t.mentions / maxMentions) * 22;
      const on = state.selected === t.name;
      const dim = state.focus && state.selected && !on;
      return `<g class="oi-dot${on ? ' on' : ''}${dim ? ' dim' : ''}" data-topic="${esc(t.name)}" tabindex="0" role="button" aria-pressed="${on}" aria-label="${esc(tTopic(t.name) + ' · ' + x.visibility + ' ' + dec(t.visibility) + ' · ' + x.balance + ' ' + signed(t.balance) + ' · ' + fmt(t.mentions) + ' ' + x.occ)}"><circle cx="${px(t.balance)}" cy="${py(t.visibility)}" r="${r}" fill="${TONE[t.dominant]}" fill-opacity=".28" stroke="${TONE[t.dominant]}"/><text x="${px(t.balance)}" y="${py(t.visibility) + 4}" text-anchor="middle" class="oi-dotmark">${TONE_MARK[t.dominant]}</text><text x="${px(t.balance)}" y="${py(t.visibility) - r - 8}" text-anchor="middle" class="oi-dotlabel">${esc(tTopic(t.name))}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="oi-plot" role="img" aria-label="${esc(x.cockpit)}" dir="ltr">${grid}<line x1="${P.l}" y1="${H - P.b}" x2="${W - P.r}" y2="${H - P.b}" class="oi-axis"/><line x1="${P.l}" y1="${P.t}" x2="${P.l}" y2="${H - P.b}" class="oi-axis"/>${dots}</svg><div class="oi-axes"><span>${esc(x.axisX)}</span><span>${esc(x.axisY)}</span></div>`;
  }

  /* ---------- Tableau trié ---------- */
  function table(x) {
    const th = (key, label) => {
      const on = state.sort.key === key;
      const dirLabel = on ? (state.sort.dir === 1 ? x.asc : x.desc) : '';
      return `<th scope="col" aria-sort="${on ? (state.sort.dir === 1 ? 'ascending' : 'descending') : 'none'}"><button type="button" class="oi-sortbtn${on ? ' on' : ''}" data-sort="${key}" aria-label="${esc(x.sortHint + ' : ' + label + (on ? ' (' + dirLabel + ')' : ''))}">${esc(label)}<span aria-hidden="true">${on ? (state.sort.dir === 1 ? '▲' : '▼') : '↕'}</span></button></th>`;
    };
    const rows = sorted().map(t => `<tr data-topic="${esc(t.name)}" tabindex="0" class="${state.selected === t.name ? 'on' : ''}"><th scope="row">${bidi(tTopic(t.name))}</th><td>${fmt(t.mentions)}</td><td>${dec(t.visibility)}</td><td><span class="oi-baltag ${t.dominant}">${TONE_MARK[t.dominant]} ${signed(t.balance)}</span></td><td>${fmt(t.tones.positive)}</td><td>${fmt(t.tones.neutral)}</td><td>${fmt(t.tones.negative)}</td><td>${fmt(t.links.length)}</td></tr>`).join('');
    return `<table class="oi-table"><caption>${esc(x.table)}</caption><thead><tr><th scope="col">${esc(x.thTopic)}</th>${th('occ', x.thOcc)}<th scope="col">${esc(x.thVis)}</th>${th('bal', x.thBal)}<th scope="col">${esc(x.thPos)}</th><th scope="col">${esc(x.thNeu)}</th><th scope="col">${esc(x.thNeg)}</th>${th('act', x.thAct)}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  /* ---------- Fiche analytique ---------- */
  function sheet(x) {
    const t = current();
    if (!t) return `<p class="oi-empty">${esc(x.noSel)}</p>`;
    const bar = ['pos', 'neu', 'neg'].map(k => {
      const v = k === 'pos' ? t.tones.positive : k === 'neu' ? t.tones.neutral : t.tones.negative;
      return `<span style="flex:${v};background:${TONE[k]}" title="${fmt(v)}"></span>`;
    }).join('');
    const links = t.links.length
      ? `<ul class="oi-links">${t.links.map(l => `<li><span>${bidi(tActor(l.name))}</span><b>${fmt(l.value)}</b></li>`).join('')}</ul>`
      : `<p class="oi-na">${esc(x.noLinks)}</p>`;
    return `<div class="oi-sheet-head"><small>${esc(x.selected)}</small><h3>${bidi(tTopic(t.name))}</h3><button type="button" class="oi-close" data-close aria-label="${esc(x.close)}">×</button></div>
    <dl class="oi-kv"><div><dt>${esc(x.mentions)}</dt><dd>${fmt(t.mentions)}</dd></div><div><dt>${esc(x.share)}</dt><dd>${dec(t.share)} %</dd></div><div><dt>${esc(x.visibility)}</dt><dd>${dec(t.visibility)}</dd></div><div><dt>${esc(x.balance)}</dt><dd>${signed(t.balance)}</dd></div></dl>
    <p class="oi-label">${esc(x.tones)}</p><div class="oi-tonebar">${bar}</div>
    <ul class="oi-tonelist"><li><i style="background:${TONE.pos}">${TONE_MARK.pos}</i>${esc(x.fPos)}<b>${fmt(t.tones.positive)}</b><span>${dec(t.tones.positive / t.toneTotal * 100)} %</span></li><li><i style="background:${TONE.neu}">${TONE_MARK.neu}</i>${esc(x.fNeu)}<b>${fmt(t.tones.neutral)}</b><span>${dec(t.tones.neutral / t.toneTotal * 100)} %</span></li><li><i style="background:${TONE.neg}">${TONE_MARK.neg}</i>${esc(x.fNeg)}<b>${fmt(t.tones.negative)}</b><span>${dec(t.tones.negative / t.toneTotal * 100)} %</span></li></ul>
    <p class="oi-label">${esc(x.assoc)} · ${fmt(t.links.length)}</p>${links}
    <dl class="oi-kv oi-kv-meta"><div><dt>${esc(x.period)}</dt><dd><bdi dir="ltr">29.07 – 05.08.2026</bdi></dd></div><div><dt>${esc(x.source)}</dt><dd><bdi dir="ltr">Opinion citoyenne 29.07_05.08</bdi></dd></div><div><dt>${esc(x.method)}</dt><dd>${esc(x.relations)}</dd></div></dl>
    <div class="oi-na-block"><strong>${esc(x.naTitle)}</strong><ul>${x.naItems.map(i => `<li>${esc(i)} : ${esc(x.unavailable)}</li>`).join('')}</ul></div>`;
  }

  /* ---------- Vue locale sujet → acteurs ---------- */
  function localGraph(x) {
    const t = current();
    if (!t) return `<div class="oi-local-grid"><p class="oi-empty">${esc(x.localEmpty)}</p></div>`;
    const W = 460, H = 400, cx = W / 2, cy = H / 2;
    const list = t.links;
    const maxV = Math.max(1, ...list.map(l => l.value));
    const pos = {};
    list.forEach((l, i) => {
      const a = -Math.PI / 2 + i / Math.max(1, list.length) * Math.PI * 2;
      pos[l.name] = { x: cx + Math.cos(a) * 165, y: cy + Math.sin(a) * 140 };
    });
    const edges = list.map(l => `<line x1="${cx}" y1="${cy}" x2="${pos[l.name].x}" y2="${pos[l.name].y}" class="oi-edge" stroke-width="${(1 + l.value / maxV * 5).toFixed(2)}"/>`).join('');
    const nodes = list.map(l => `<g class="oi-anode" tabindex="0" role="button" data-actor="${esc(l.name)}" aria-label="${esc(tActor(l.name) + ' · ' + (l.group === 'parti' ? x.party : x.leader) + ' · ' + fmt(l.value) + ' ' + x.cooc + '. ' + x.coocWarn)}"><circle cx="${pos[l.name].x}" cy="${pos[l.name].y}" r="${5 + l.value / maxV * 6}"/><text x="${pos[l.name].x}" y="${pos[l.name].y - 12}" text-anchor="middle">${esc(tActor(l.name))}</text></g>`).join('');
    const center = `<g class="oi-tnode on"><circle cx="${cx}" cy="${cy}" r="${34}"/><text x="${cx}" y="${cy + 4}" text-anchor="middle">${esc(tTopic(t.name))}</text></g>`;
    const panel = list.length
      ? `<ul class="oi-links oi-links-rich">${list.map(l => `<li tabindex="0" data-actor="${esc(l.name)}"><span>${bidi(tActor(l.name))}<small>${esc(l.group === 'parti' ? x.party : x.leader)}</small></span><b>${fmt(l.value)}</b></li>`).join('')}</ul>`
      : `<p class="oi-na">${esc(x.noLinks)}</p>`;
    return `<div class="oi-local-grid">
      <div class="oi-local-plot"><svg viewBox="0 0 ${W} ${H}" class="oi-constellation" role="img" aria-label="${esc(x.local + ' : ' + tTopic(t.name))}" dir="ltr">${edges}${center}${nodes}</svg></div>
      <div class="oi-local-panel"><p class="oi-label">${esc(x.linksTitle)} · ${fmt(list.length)}</p>${panel}<p class="oi-na oi-coocwarn">${esc(x.coocWarn)}</p></div>
    </div>`;
  }

  /* ---------- Rendu ---------- */
  function render() {
    const x = T[lang()];
    root.innerHTML = `
    <header class="oi-head"><p class="kicker">${esc(x.kicker)}</p><h1>${x.title}</h1><p class="oi-intro">${esc(x.intro)}</p></header>
    ${funnel(x)}
    <div class="oi-toolbar" role="group" aria-label="${esc(x.filters)}">
      <div class="oi-seg"><small>${esc(x.filters)}</small>${[['all', x.all], ['neg', x.fNeg], ['neu', x.fNeu], ['pos', x.fPos]].map(([k, l]) => `<button type="button" data-tone="${k}" aria-pressed="${state.tone === k}" class="${state.tone === k ? 'on' : ''}">${k === 'all' ? '' : TONE_MARK[k] + ' '}${esc(l)}</button>`).join('')}</div>
      <button type="button" class="oi-btn${state.focus ? ' on' : ''}" data-focus aria-pressed="${state.focus}">${esc(x.focus)}</button>
      <button type="button" class="oi-btn" data-reset>${esc(x.reset)}</button>
    </div>
    <section class="oi-grid">
      <article class="oi-card oi-cockpit"><header><p class="kicker">${esc(x.cockpit)}</p><p class="oi-sub">${esc(x.cockpitSub)}</p></header>${cockpit(x)}</article>
      <aside class="oi-card oi-sheet" aria-live="polite"><p class="kicker">${esc(x.sheet)}</p>${sheet(x)}</aside>
    </section>
    <section class="oi-card oi-tablewrap">${table(x)}</section>
    <section class="oi-card oi-local"><header><p class="kicker">${esc(x.local)}</p><p class="oi-sub">${esc(x.localSub)}</p></header>${localGraph(x)}</section>
    <section class="oi-card oi-value"><p class="kicker">${esc(x.value)}</p>${x.valueBody.map(p => `<p class="oi-valuep">${esc(p)}</p>`).join('')}</section>
    <section class="oi-card oi-metho"><p class="kicker">${esc(x.metho)}</p><div class="oi-metho-grid">${x.m.map(([h, b]) => `<div><strong>${esc(h)}</strong><p>${esc(b)}</p></div>`).join('')}</div><p class="oi-warn">${esc(x.warn)}</p></section>
    <div class="oi-tip" hidden></div>`;
    if (state.tip) showTip(state.tip.id, state.tip.el === 'keep' ? null : null);
  }

  /* ---------- Tooltip ---------- */
  function tipHTML(t) {
    const x = T[lang()];
    return `<button type="button" class="oi-tip-close" data-tipclose aria-label="${esc(x.close)}">×</button>
      <strong>${bidi(t.title)}</strong>
      <dl>${t.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <p><b>${esc(x.reading)}</b> ${esc(t.reading)}</p>
      <p class="oi-tip-limit"><b>${esc(x.limit)}</b> ${esc(t.limit)}</p>`;
  }
  function showTip(id, el) {
    const t = tips.get(id);
    const box = root.querySelector('.oi-tip');
    if (!t || !box) return;
    box.innerHTML = tipHTML(t);
    box.hidden = false;
    const target = el || root.querySelector(`[data-tip="${id}"]`);
    if (target) {
      const rb = root.getBoundingClientRect(), tb = target.getBoundingClientRect();
      const left = Math.max(8, Math.min(rb.width - 288, tb.left - rb.left + tb.width / 2 - 140));
      box.style.left = left + 'px';
      box.style.top = Math.max(8, tb.top - rb.top + tb.height + 10) + 'px';
    }
    state.tip = { id };
  }
  function hideTip() {
    const box = root.querySelector('.oi-tip');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    state.tip = null;
  }

  /* ---------- Événements (délégation unique) ---------- */
  const select = name => { state.selected = state.selected === name ? null : name; hideTip(); render(); };
  root.addEventListener('click', e => {
    if (e.target.closest('[data-tipclose]')) { hideTip(); return; }
    const seg = e.target.closest('[data-tip]');
    if (seg) {
      const opened = state.tip && state.tip.id === seg.dataset.tip;
      if (!opened) { showTip(seg.dataset.tip, seg); return; }
      if (seg.dataset.topicSeg) { select(seg.dataset.topicSeg); return; }
      hideTip(); return;
    }
    const topicEl = e.target.closest('[data-topic]');
    if (topicEl) { select(topicEl.dataset.topic); return; }
    if (e.target.closest('[data-close]')) { state.selected = null; render(); return; }
    const tone = e.target.closest('[data-tone]');
    if (tone) { state.tone = tone.dataset.tone; render(); root.querySelector(`[data-tone="${state.tone}"]`)?.focus(); return; }
    const sort = e.target.closest('[data-sort]');
    if (sort) {
      const key = sort.dataset.sort;
      state.sort = state.sort.key === key ? { key, dir: -state.sort.dir } : { key, dir: -1 };
      render(); root.querySelector(`[data-sort="${key}"]`)?.focus(); return;
    }
    if (e.target.closest('[data-focus]')) { state.focus = !state.focus; render(); root.querySelector('[data-focus]')?.focus(); return; }
    if (e.target.closest('[data-reset]')) { Object.assign(state, { selected: null, tone: 'all', sort: { key: 'occ', dir: -1 }, focus: false }); hideTip(); render(); root.querySelector('[data-reset]')?.focus(); }
  });
  root.addEventListener('mouseover', e => {
    const seg = e.target.closest('[data-tip]');
    if (seg) showTip(seg.dataset.tip, seg);
  });
  root.addEventListener('mouseleave', () => hideTip());
  root.addEventListener('focusin', e => {
    const seg = e.target.closest('[data-tip]');
    if (seg) showTip(seg.dataset.tip, seg);
  });
  root.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (state.tip) { hideTip(); return; }
      if (state.selected) { state.selected = null; render(); }
      return;
    }
    const seg = e.target.closest('[data-topic-seg]');
    if ((e.key === 'Enter' || e.key === ' ') && seg) { e.preventDefault(); select(seg.dataset.topicSeg); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-topic]') && !e.target.closest('button')) {
      e.preventDefault(); select(e.target.closest('[data-topic]').dataset.topic);
    }
  });

  new MutationObserver(() => { hideTip(); render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir', 'data-theme'] });
  render();
})();
