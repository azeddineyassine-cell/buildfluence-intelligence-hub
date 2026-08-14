/* ===== OPINION — Cockpit des dynamiques du débat observé (Buildfluence Intelligence Politique)
   Source unique : canonical-monitoring-data.js. Aucune valeur simulée, aucune série temporelle.
   Métriques documentées : mentions (occurrences thématiques), tonalités positif/neutre/négatif,
   visibilité relative (mentions / mentions du sujet le plus visible x 100),
   balance narrative ((positif - négatif) / total tonalités x 100),
   associations sujets-acteurs (cooccurrences issues du graphe canonique). ===== */
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
      kicker: 'OPINION CITOYENNE', title: 'Cockpit du <em>débat observé</em>',
      intro: 'Cette vue décrit les sujets présents dans le corpus Opinion citoyenne : 5 498 URL uniques dédupliquées, du 29 juillet au 5 août 2026, hors Wikipédia et Wiktionary. Elle documente la visibilité, la tonalité et les acteurs associés à sept sujets. Elle ne mesure ni popularité, ni intention de vote.',
      synthesis: 'SYNTHÈSE EXÉCUTIVE', period: 'Période', source: 'Source', method: 'Méthode', limits: 'Limites',
      s1: 'Sujet le plus visible sur la période', s2: 'Balance narrative la plus négative', s3: 'Balance narrative la plus positive', s4: 'Sujet associé au plus grand nombre d’acteurs',
      s1l: 'Présence documentaire dans le corpus, pas importance politique.', s2l: 'Cadrage des contenus, pas jugement porté sur un acteur.', s3l: 'À rapporter au volume, plus faible que celui des premiers sujets.', s4l: 'Associations par cooccurrence, ni soutien ni opposition.',
      ofTotal: 'des occurrences thématiques', occ: 'occurrences', actors: 'acteurs documentés', cooc: 'cooccurrences',
      search: 'Rechercher un sujet', filters: 'TONALITÉ DOMINANTE', all: 'TOUTES', fNeg: 'NÉGATIVE', fNeu: 'NEUTRE', fPos: 'POSITIVE',
      sort: 'TRI', sVis: 'VISIBILITÉ', sBal: 'BALANCE', sAct: 'ACTEURS', reset: 'RÉINITIALISER', focus: 'MODE FOCALISÉ',
      cockpit: 'VISIBILITÉ × BALANCE NARRATIVE', cockpitSub: 'Sept sujets positionnés sur deux indicateurs documentés. La taille du marqueur correspond aux occurrences thématiques.',
      axisX: 'Balance narrative (−100 à +100)', axisY: 'Visibilité relative (0 à 100)',
      table: 'TABLEAU DES SUJETS', thTopic: 'Sujet', thOcc: 'Occurrences', thVis: 'Visibilité', thBal: 'Balance', thPos: 'Positif', thNeu: 'Neutre', thNeg: 'Négatif', thAct: 'Acteurs',
      sheet: 'FICHE ANALYTIQUE', noSel: 'Sélectionnez un sujet dans le cockpit, le tableau ou la constellation pour afficher sa fiche documentée.',
      visibility: 'Visibilité relative', balance: 'Balance narrative', mentions: 'Occurrences thématiques', tones: 'Tonalités documentées',
      assoc: 'Acteurs associés (cooccurrences)', relations: 'Relations documentées', unavailable: 'Donnée indisponible',
      naTitle: 'DONNÉES NON DISPONIBLES', naItems: ['Série temporelle par sujet', 'Portée ou audience', 'Relation sujet-média'],
      cross: 'CROISEMENT SUJETS-ACTEURS', crossSub: 'Liens issus exclusivement des relations canoniques du graphe. L’épaisseur correspond au nombre de cooccurrences. Une association documentée n’implique ni soutien, ni opposition, ni alliance, ni causalité.',
      linksTitle: 'ASSOCIATIONS DOCUMENTÉES', noLinks: 'Aucune association documentée pour cette sélection.',
      timeline: 'TIMELINE', tlState: 'DONNÉES TEMPORELLES INDISPONIBLES',
      tlText: 'Les données actuellement disponibles ne permettent pas encore de suivre l’évolution de chaque sujet dans le temps. Cette visualisation sera activée lorsque des séries historiques comparables auront été constituées.',
      tlCtrls: ['Navigation chronologique', 'Sélection d’une période', 'Zoom temporel', 'Comparaison de deux périodes', 'Activation des sujets', 'Annotation d’événements documentés'],
      tlDist: 'Distinctions maintenues : corrélation temporelle observée, événement documenté, interprétation validée, causalité non établie. Aucun pic ne sera associé automatiquement à un événement extérieur.',
      signals: 'SIGNAUX DE CHANGEMENT', sigState: 'DONNÉE INDISPONIBLE',
      sigText: 'Accélération, ralentissement, rupture, inversion de tonalité, émergence d’un sujet et concentration inhabituelle de l’attention ne sont pas calculables sur le corpus actuel.',
      sigNeed: 'Données nécessaires à l’activation',
      sigItems: ['Volume par sujet et par jour', 'Tonalité par sujet et par jour', 'Au moins deux périodes homogènes comparables', 'Méthode de dédoublonnage constante entre périodes', 'Événements datés et qualifiés'],
      metho: 'COMPRENDRE L’ANALYSE DE L’OPINION',
      m: [
        ['A. Ce que cette vue analyse', 'Les sujets détectés dans un corpus numérique délimité, leur visibilité documentaire, leur tonalité consolidée et les acteurs qui leur sont associés.'],
        ['B. Corpus et période', '5 498 URL uniques dédupliquées issues du fichier « 29.07_05.08 - Liste des Mentions opinion citoyenne.xlsx », du 29 juillet au 5 août 2026.'],
        ['C. Calcul de la visibilité', 'Visibilité relative = occurrences du sujet / occurrences du sujet le plus visible × 100. La part affichée rapporte le sujet aux 4 698 occurrences thématiques des sept sujets.'],
        ['D. Calcul de la balance narrative', 'Balance = (positif − négatif) / (positif + neutre + négatif) × 100, bornée de −100 à +100.'],
        ['E. Obtention des tonalités', 'Chaque URL unique reçoit une tonalité consolidée. 98 conflits de tonalité ont été arbitrés dans le corpus opinion.'],
        ['F. Relations sujets-acteurs', 'Elles proviennent des cooccurrences entre un sujet et un acteur dans une même mention, après déduplication des URL.'],
        ['G. Ce que les données permettent de conclure', 'La hiérarchie de présence des sujets sur la période, la structure de leur tonalité et les acteurs documentés à leurs côtés.'],
        ['H. Ce qu’elles ne permettent pas de conclure', 'Aucune popularité, aucune intention de vote, aucune représentativité de la population, aucune causalité, aucune prédiction.'],
        ['I. Données temporelles', 'Aucune série comparable par sujet n’est disponible. Aucune évolution n’est affichée.'],
        ['J. Sources, exclusions et limites', 'Exclusions : wikipedia.org et wiktionary.org. Une URL peut être reliée à plusieurs sujets : les occurrences thématiques ne forment pas une partition exclusive des 5 498 URL.'],
        ['K. Mise à jour', 'Corpus arrêté au 5 août 2026.']
      ],
      warn: 'Cette analyse décrit des contenus et relations observés dans un corpus numérique délimité. Elle ne constitue ni un sondage, ni une mesure de popularité, ni une intention de vote, ni une représentation de l’ensemble de la population.',
      close: 'Fermer la fiche', selected: 'Sujet sélectionné', share: 'Part'
    },
    en: {
      kicker: 'CITIZEN OPINION', title: 'Observed <em>debate cockpit</em>',
      intro: 'This view describes the issues present in the Citizen Opinion corpus: 5,498 deduplicated unique URLs, from 29 July to 5 August 2026, excluding Wikipedia and Wiktionary. It documents visibility, tone and associated actors for seven issues. It measures neither popularity nor voting intention.',
      synthesis: 'EXECUTIVE SUMMARY', period: 'Period', source: 'Source', method: 'Method', limits: 'Limits',
      s1: 'Most visible issue over the period', s2: 'Most negative narrative balance', s3: 'Most positive narrative balance', s4: 'Issue associated with the most actors',
      s1l: 'Documented presence, not intrinsic political importance.', s2l: 'Content framing, not a judgement on any actor.', s3l: 'To be read against a lower volume than the leading issues.', s4l: 'Co-occurrence associations, neither support nor opposition.',
      ofTotal: 'of thematic occurrences', occ: 'occurrences', actors: 'documented actors', cooc: 'co-occurrences',
      search: 'Search an issue', filters: 'DOMINANT TONE', all: 'ALL', fNeg: 'NEGATIVE', fNeu: 'NEUTRAL', fPos: 'POSITIVE',
      sort: 'SORT', sVis: 'VISIBILITY', sBal: 'BALANCE', sAct: 'ACTORS', reset: 'RESET', focus: 'FOCUS MODE',
      cockpit: 'VISIBILITY × NARRATIVE BALANCE', cockpitSub: 'Seven issues plotted on two documented indicators. Marker size reflects thematic occurrences.',
      axisX: 'Narrative balance (−100 to +100)', axisY: 'Relative visibility (0 to 100)',
      table: 'ISSUES TABLE', thTopic: 'Issue', thOcc: 'Occurrences', thVis: 'Visibility', thBal: 'Balance', thPos: 'Positive', thNeu: 'Neutral', thNeg: 'Negative', thAct: 'Actors',
      sheet: 'ANALYTICAL SHEET', noSel: 'Select an issue in the cockpit, the table or the constellation to display its documented sheet.',
      visibility: 'Relative visibility', balance: 'Narrative balance', mentions: 'Thematic occurrences', tones: 'Documented tones',
      assoc: 'Associated actors (co-occurrences)', relations: 'Documented relations', unavailable: 'Data unavailable',
      naTitle: 'DATA NOT AVAILABLE', naItems: ['Time series per issue', 'Reach or audience', 'Issue-media relation'],
      cross: 'ISSUES × ACTORS', crossSub: 'Links come exclusively from canonical graph relations. Thickness reflects the number of co-occurrences. A documented association implies neither support, opposition, alliance nor causality.',
      linksTitle: 'DOCUMENTED ASSOCIATIONS', noLinks: 'No documented association for this selection.',
      timeline: 'TIMELINE', tlState: 'TIME DATA UNAVAILABLE',
      tlText: 'The data currently available does not yet allow each issue to be tracked over time. This visualisation will be activated once comparable historical series have been built.',
      tlCtrls: ['Chronological navigation', 'Period selection', 'Time zoom', 'Two-period comparison', 'Issue toggling', 'Documented event annotation'],
      tlDist: 'Distinctions maintained: observed temporal correlation, documented event, validated interpretation, causality not established. No peak will be automatically linked to an external event.',
      signals: 'CHANGE SIGNALS', sigState: 'DATA UNAVAILABLE',
      sigText: 'Acceleration, slowdown, break, tone reversal, issue emergence and unusual attention concentration cannot be computed on the current corpus.',
      sigNeed: 'Data required for activation',
      sigItems: ['Volume per issue and per day', 'Tone per issue and per day', 'At least two comparable homogeneous periods', 'Consistent deduplication method across periods', 'Dated and qualified events'],
      metho: 'UNDERSTANDING THE OPINION ANALYSIS',
      m: [
        ['A. What this view analyses', 'Issues detected in a bounded digital corpus, their documentary visibility, consolidated tone and associated actors.'],
        ['B. Corpus and period', '5,498 deduplicated unique URLs from “29.07_05.08 - Liste des Mentions opinion citoyenne.xlsx”, 29 July to 5 August 2026.'],
        ['C. Visibility calculation', 'Relative visibility = issue occurrences / occurrences of the most visible issue × 100. The share compares the issue with the 4,698 thematic occurrences of the seven issues.'],
        ['D. Narrative balance calculation', 'Balance = (positive − negative) / (positive + neutral + negative) × 100, bounded between −100 and +100.'],
        ['E. How tones are obtained', 'Each unique URL receives a consolidated tone. 98 tone conflicts were arbitrated in the opinion corpus.'],
        ['F. Issue-actor relations', 'They derive from co-occurrences between an issue and an actor within the same mention, after URL deduplication.'],
        ['G. What the data supports', 'The hierarchy of issue presence over the period, the structure of their tone and the actors documented alongside them.'],
        ['H. What the data does not support', 'No popularity, no voting intention, no population representativeness, no causality, no prediction.'],
        ['I. Time data', 'No comparable series per issue is available. No evolution is displayed.'],
        ['J. Sources, exclusions and limits', 'Exclusions: wikipedia.org and wiktionary.org. One URL may relate to several issues: thematic occurrences are not an exclusive partition of the 5,498 URLs.'],
        ['K. Update', 'Corpus closed on 5 August 2026.']
      ],
      warn: 'This analysis describes content and relations observed in a bounded digital corpus. It is neither a poll, nor a popularity measurement, nor a voting intention, nor a representation of the whole population.',
      close: 'Close the sheet', selected: 'Selected issue', share: 'Share'
    },
    ar: {
      kicker: 'رأي المواطنين', title: 'لوحة قيادة <em>النقاش المرصود</em>',
      intro: 'تصف هذه الواجهة المواضيع الحاضرة في مجموعة بيانات رأي المواطنين: 5,498 رابطا فريدا بعد إزالة التكرار، من 29 يوليو إلى 5 أغسطس 2026، باستثناء ويكيبيديا وويكاموس. وتوثق الحضور والنبرة والفاعلين المرتبطين بسبعة مواضيع. ولا تقيس الشعبية ولا نية التصويت.',
      synthesis: 'الخلاصة التنفيذية', period: 'الفترة', source: 'المصدر', method: 'المنهجية', limits: 'الحدود',
      s1: 'الموضوع الأكثر حضورا خلال الفترة', s2: 'الحصيلة السردية الأكثر سلبية', s3: 'الحصيلة السردية الأكثر إيجابية', s4: 'الموضوع المرتبط بأكبر عدد من الفاعلين',
      s1l: 'حضور موثق، لا أهمية سياسية جوهرية.', s2l: 'تأطير المحتوى، لا حكم على فاعل بعينه.', s3l: 'يُقرأ في ضوء حجم أقل من المواضيع الأولى.', s4l: 'ارتباطات بالتزامن، لا دعم ولا معارضة.',
      ofTotal: 'من التكرارات الموضوعاتية', occ: 'تكرارات', actors: 'فاعلون موثقون', cooc: 'تزامنات',
      search: 'البحث عن موضوع', filters: 'النبرة المهيمنة', all: 'الكل', fNeg: 'سلبية', fNeu: 'محايدة', fPos: 'إيجابية',
      sort: 'الترتيب', sVis: 'الحضور', sBal: 'الحصيلة', sAct: 'الفاعلون', reset: 'إعادة الضبط', focus: 'وضع التركيز',
      cockpit: 'الحضور × الحصيلة السردية', cockpitSub: 'سبعة مواضيع موزعة على مؤشرين موثقين. يعبر حجم العلامة عن التكرارات الموضوعاتية.',
      axisX: 'الحصيلة السردية (−100 إلى +100)', axisY: 'الحضور النسبي (0 إلى 100)',
      table: 'جدول المواضيع', thTopic: 'الموضوع', thOcc: 'التكرارات', thVis: 'الحضور', thBal: 'الحصيلة', thPos: 'إيجابي', thNeu: 'محايد', thNeg: 'سلبي', thAct: 'الفاعلون',
      sheet: 'البطاقة التحليلية', noSel: 'اختر موضوعا من لوحة القيادة أو الجدول أو الخريطة لعرض بطاقته الموثقة.',
      visibility: 'الحضور النسبي', balance: 'الحصيلة السردية', mentions: 'التكرارات الموضوعاتية', tones: 'النبرات الموثقة',
      assoc: 'الفاعلون المرتبطون (تزامنات)', relations: 'العلاقات الموثقة', unavailable: 'المعطى غير متوفر',
      naTitle: 'معطيات غير متوفرة', naItems: ['سلسلة زمنية لكل موضوع', 'المدى أو الجمهور', 'العلاقة بين الموضوع والوسيلة الإعلامية'],
      cross: 'تقاطع المواضيع والفاعلين', crossSub: 'الروابط مستمدة حصريا من العلاقات المعيارية للخريطة. ويعبر السمك عن عدد التزامنات. والارتباط الموثق لا يعني دعما ولا معارضة ولا تحالفا ولا سببية.',
      linksTitle: 'ارتباطات موثقة', noLinks: 'لا يوجد ارتباط موثق لهذا الاختيار.',
      timeline: 'الخط الزمني', tlState: 'المعطيات الزمنية غير متوفرة',
      tlText: 'لا تسمح المعطيات المتوفرة حاليا بتتبع تطور كل موضوع عبر الزمن. وسيتم تفعيل هذا الرسم عند تكوين سلاسل تاريخية قابلة للمقارنة.',
      tlCtrls: ['تصفح زمني', 'اختيار فترة', 'تكبير زمني', 'مقارنة فترتين', 'تفعيل المواضيع', 'التعليق على أحداث موثقة'],
      tlDist: 'تُحفظ التمييزات التالية: ارتباط زمني مرصود، حدث موثق، تأويل مصادق عليه، سببية غير مثبتة. ولن يُربط أي ارتفاع تلقائيا بحدث خارجي.',
      signals: 'إشارات التغير', sigState: 'المعطى غير متوفر',
      sigText: 'لا يمكن احتساب التسارع أو التباطؤ أو الانقطاع أو انقلاب النبرة أو بروز موضوع أو التركيز غير المعتاد للانتباه انطلاقا من المجموعة الحالية.',
      sigNeed: 'المعطيات اللازمة للتفعيل',
      sigItems: ['الحجم لكل موضوع ولكل يوم', 'النبرة لكل موضوع ولكل يوم', 'فترتان متجانستان قابلتان للمقارنة على الأقل', 'منهجية ثابتة لإزالة التكرار بين الفترات', 'أحداث مؤرخة وموصوفة'],
      metho: 'فهم تحليل الرأي',
      m: [
        ['أ. ما تحلله هذه الواجهة', 'المواضيع المكتشفة داخل مجموعة رقمية محددة، وحضورها الوثائقي، ونبرتها الموحدة، والفاعلين المرتبطين بها.'],
        ['ب. المجموعة والفترة', '5,498 رابطا فريدا بعد إزالة التكرار، من 29 يوليو إلى 5 أغسطس 2026.'],
        ['ج. احتساب الحضور', 'الحضور النسبي = تكرارات الموضوع / تكرارات الموضوع الأكثر حضورا × 100. وتقارن الحصة الموضوع بـ 4,698 تكرارا موضوعاتيا للمواضيع السبعة.'],
        ['د. احتساب الحصيلة السردية', 'الحصيلة = (إيجابي − سلبي) / (إيجابي + محايد + سلبي) × 100، محصورة بين −100 و+100.'],
        ['ه. كيفية الحصول على النبرات', 'يُسند إلى كل رابط فريد تصنيف موحد للنبرة. وقد تمت تسوية 98 حالة تعارض في النبرة.'],
        ['و. علاقات المواضيع والفاعلين', 'تنبع من تزامن ذكر الموضوع والفاعل داخل الإشارة نفسها، بعد إزالة تكرار الروابط.'],
        ['ز. ما تسمح به المعطيات', 'ترتيب حضور المواضيع خلال الفترة، وبنية نبرتها، والفاعلون الموثقون إلى جانبها.'],
        ['ح. ما لا تسمح به المعطيات', 'لا شعبية ولا نية تصويت ولا تمثيلية للسكان ولا سببية ولا تنبؤ.'],
        ['ط. المعطيات الزمنية', 'لا تتوفر سلسلة قابلة للمقارنة لكل موضوع. ولا يُعرض أي تطور.'],
        ['ي. المصادر والاستثناءات والحدود', 'الاستثناءات: wikipedia.org وwiktionary.org. ويمكن ربط رابط واحد بعدة مواضيع، لذلك لا تشكل التكرارات الموضوعاتية تقسيما حصريا للروابط.'],
        ['ك. التحديث', 'أُغلقت المجموعة في 5 أغسطس 2026.']
      ],
      warn: 'يصف هذا التحليل محتويات وعلاقات مرصودة داخل مجموعة رقمية محددة. وهو ليس استطلاعا للرأي ولا قياسا للشعبية ولا نية تصويت ولا تمثيلا لمجموع السكان.',
      close: 'إغلاق البطاقة', selected: 'الموضوع المختار', share: 'الحصة'
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
  const bidi = s => /[A-Za-z]/.test(s) && rtl() ? `<bdi dir="ltr">${esc(s)}</bdi>` : esc(s);
  const tTopic = n => topicLabels[lang()]?.[n] || n;
  const tActor = n => actorLabels[lang()]?.[n] || n;

  /* ---------- Données dérivées ---------- */
  const graph = data.graph || { nodes: [], edges: [] };
  const groupOf = name => (graph.nodes.find(n => n.name === name) || {}).group;
  const themeNames = new Set(data.topics.map(t => t.name));
  const relations = {};
  graph.edges.forEach(([a, b, value]) => {
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

  const byVisibility = [...topics].sort((a, b) => b.mentions - a.mentions);
  const mostVisible = byVisibility[0];
  const mostNegative = [...topics].sort((a, b) => a.balance - b.balance)[0];
  const mostPositive = [...topics].sort((a, b) => b.balance - a.balance)[0];
  const mostConnected = [...topics].sort((a, b) => b.links.length - a.links.length || b.cooc - a.cooc)[0];

  /* ---------- État ---------- */
  const state = { selected: null, query: '', tone: 'all', sort: 'vis', focus: false };
  const visible = () => topics
    .filter(t => state.tone === 'all' || t.dominant === state.tone)
    .filter(t => !state.query || tTopic(t.name).toLowerCase().includes(state.query.toLowerCase()) || t.name.toLowerCase().includes(state.query.toLowerCase()))
    .sort((a, b) => state.sort === 'bal' ? b.balance - a.balance : state.sort === 'act' ? (b.links.length - a.links.length || b.cooc - a.cooc) : b.mentions - a.mentions);
  const current = () => topics.find(t => t.name === state.selected) || null;

  const TONE = { pos: 'var(--gold)', neu: 'var(--line)', neg: '#E06D4F' };

  /* ---------- Rendu ---------- */
  function synthesisCards(x) {
    const cards = [
      { k: x.s1, topic: mostVisible, v: fmt(mostVisible.mentions) + ' ' + x.occ, extra: dec(mostVisible.share) + ' % ' + x.ofTotal, l: x.s1l },
      { k: x.s2, topic: mostNegative, v: signed(mostNegative.balance), extra: fmt(mostNegative.mentions) + ' ' + x.occ, l: x.s2l },
      { k: x.s3, topic: mostPositive, v: signed(mostPositive.balance), extra: fmt(mostPositive.mentions) + ' ' + x.occ, l: x.s3l },
      { k: x.s4, topic: mostConnected, v: fmt(mostConnected.links.length) + ' ' + x.actors, extra: fmt(mostConnected.cooc) + ' ' + x.cooc, l: x.s4l }
    ];
    return cards.map(c => `<button type="button" class="oi-syn" data-topic="${esc(c.topic.name)}"><small>${esc(c.k)}</small><strong>${bidi(tTopic(c.topic.name))}</strong><b>${esc(c.v)}</b><span>${esc(c.extra)} · <bdi dir="ltr">29.07 – 05.08.2026</bdi></span><em>${esc(c.l)}</em></button>`).join('');
  }

  function cockpit(x) {
    const W = 760, H = 470, P = { t: 48, r: 26, b: 54, l: 62 };
    const px = b => P.l + (b + 100) / 200 * (W - P.l - P.r);
    const py = v => H - P.b - v / 100 * (H - P.t - P.b);
    const list = visible();
    const grid = [-100, -50, 0, 50, 100].map(b => `<line x1="${px(b)}" y1="${P.t}" x2="${px(b)}" y2="${H - P.b}" class="${b === 0 ? 'oi-axis0' : 'oi-grid'}"/><text x="${px(b)}" y="${H - P.b + 20}" class="oi-tick" text-anchor="middle">${b > 0 ? '+' + b : b < 0 ? '\u2212' + Math.abs(b) : b}</text>`).join('')
      + [0, 25, 50, 75, 100].map(v => `<line x1="${P.l}" y1="${py(v)}" x2="${W - P.r}" y2="${py(v)}" class="oi-grid"/><text x="${P.l - 10}" y="${py(v) + 4}" class="oi-tick" text-anchor="end">${v}</text>`).join('');
    const dots = list.map(t => {
      const r = 10 + Math.sqrt(t.mentions / maxMentions) * 22;
      const on = state.selected === t.name;
      const dim = state.focus && state.selected && !on;
      return `<g class="oi-dot${on ? ' on' : ''}${dim ? ' dim' : ''}" data-topic="${esc(t.name)}" tabindex="0" role="button" aria-pressed="${on}" aria-label="${esc(tTopic(t.name) + ' · ' + x.visibility + ' ' + dec(t.visibility) + ' · ' + x.balance + ' ' + signed(t.balance) + ' · ' + fmt(t.mentions) + ' ' + x.occ)}"><circle cx="${px(t.balance)}" cy="${py(t.visibility)}" r="${r}" fill="${TONE[t.dominant]}" fill-opacity="${t.dominant === 'neu' ? .5 : .28}" stroke="${TONE[t.dominant]}"/><text x="${px(t.balance)}" y="${py(t.visibility) - r - 8}" text-anchor="middle" class="oi-dotlabel">${esc(tTopic(t.name))}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="oi-plot" role="img" aria-label="${esc(x.cockpit)}" dir="ltr">${grid}<line x1="${P.l}" y1="${H - P.b}" x2="${W - P.r}" y2="${H - P.b}" class="oi-axis"/><line x1="${P.l}" y1="${P.t}" x2="${P.l}" y2="${H - P.b}" class="oi-axis"/>${dots}</svg><div class="oi-axes"><span>${esc(x.axisX)}</span><span>${esc(x.axisY)}</span></div>`;
  }

  function table(x) {
    const rows = visible().map(t => `<tr data-topic="${esc(t.name)}" tabindex="0" class="${state.selected === t.name ? 'on' : ''}"><th scope="row">${bidi(tTopic(t.name))}</th><td>${fmt(t.mentions)}</td><td>${dec(t.visibility)}</td><td>${signed(t.balance)}</td><td>${fmt(t.tones.positive)}</td><td>${fmt(t.tones.neutral)}</td><td>${fmt(t.tones.negative)}</td><td>${fmt(t.links.length)}</td></tr>`).join('');
    return `<table class="oi-table"><caption>${esc(x.table)}</caption><thead><tr><th scope="col">${esc(x.thTopic)}</th><th scope="col">${esc(x.thOcc)}</th><th scope="col">${esc(x.thVis)}</th><th scope="col">${esc(x.thBal)}</th><th scope="col">${esc(x.thPos)}</th><th scope="col">${esc(x.thNeu)}</th><th scope="col">${esc(x.thNeg)}</th><th scope="col">${esc(x.thAct)}</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

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
    <ul class="oi-tonelist"><li><i style="background:${TONE.pos}"></i>${esc(x.thPos)}<b>${fmt(t.tones.positive)}</b><span>${dec(t.tones.positive / t.toneTotal * 100)} %</span></li><li><i style="background:${TONE.neu}"></i>${esc(x.thNeu)}<b>${fmt(t.tones.neutral)}</b><span>${dec(t.tones.neutral / t.toneTotal * 100)} %</span></li><li><i style="background:${TONE.neg}"></i>${esc(x.thNeg)}<b>${fmt(t.tones.negative)}</b><span>${dec(t.tones.negative / t.toneTotal * 100)} %</span></li></ul>
    <p class="oi-label">${esc(x.assoc)} · ${fmt(t.links.length)}</p>${links}
    <dl class="oi-kv oi-kv-meta"><div><dt>${esc(x.period)}</dt><dd><bdi dir="ltr">29.07 – 05.08.2026</bdi></dd></div><div><dt>${esc(x.source)}</dt><dd><bdi dir="ltr">Opinion citoyenne 29.07_05.08</bdi></dd></div><div><dt>${esc(x.method)}</dt><dd>${esc(x.relations)}</dd></div></dl>
    <div class="oi-na-block"><strong>${esc(x.naTitle)}</strong><ul>${x.naItems.map(i => `<li>${esc(i)} : ${esc(x.unavailable)}</li>`).join('')}</ul></div>`;
  }

  function constellation(x) {
    const W = 760, H = 520, cx = W / 2, cy = H / 2;
    const list = visible();
    const focusTopic = state.focus && state.selected ? current() : null;
    const shown = focusTopic ? [focusTopic] : list;
    const pos = {};
    shown.forEach((t, i) => {
      const a = -Math.PI / 2 + i / shown.length * Math.PI * 2;
      const rr = shown.length === 1 ? 0 : 150;
      pos[t.name] = { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr * .78 };
    });
    const actors = [];
    shown.forEach(t => t.links.forEach(l => { if (!actors.includes(l.name)) actors.push(l.name); }));
    actors.sort();
    const apos = {};
    actors.forEach((n, i) => {
      const a = -Math.PI / 2 + i / actors.length * Math.PI * 2;
      apos[n] = { x: cx + Math.cos(a) * 320, y: cy + Math.sin(a) * 225 };
    });
    const maxV = Math.max(1, ...shown.flatMap(t => t.links.map(l => l.value)));
    const edges = shown.flatMap(t => t.links.map(l => `<line x1="${pos[t.name].x}" y1="${pos[t.name].y}" x2="${apos[l.name].x}" y2="${apos[l.name].y}" class="oi-edge" stroke-width="${(1 + l.value / maxV * 5).toFixed(2)}"/>`)).join('');
    const actorNodes = actors.map(n => `<g class="oi-anode"><circle cx="${apos[n].x}" cy="${apos[n].y}" r="5"/><text x="${apos[n].x}" y="${apos[n].y - 11}" text-anchor="middle">${esc(tActor(n))}</text></g>`).join('');
    const topicNodes = shown.map(t => `<g class="oi-tnode${state.selected === t.name ? ' on' : ''}" data-topic="${esc(t.name)}" tabindex="0" role="button" aria-pressed="${state.selected === t.name}" aria-label="${esc(tTopic(t.name) + ' · ' + t.links.length + ' ' + x.actors)}"><circle cx="${pos[t.name].x}" cy="${pos[t.name].y}" r="${12 + Math.sqrt(t.mentions / maxMentions) * 14}"/><text x="${pos[t.name].x}" y="${pos[t.name].y + 4}" text-anchor="middle">${esc(tTopic(t.name))}</text></g>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="oi-constellation" role="img" aria-label="${esc(x.cross)}" dir="ltr">${edges}${actorNodes}${topicNodes}</svg>`;
  }

  function render() {
    const x = T[lang()];
    const t = current();
    root.innerHTML = `
    <header class="oi-head"><p class="kicker">${esc(x.kicker)}</p><h1>${x.title}</h1><p class="oi-intro">${esc(x.intro)}</p></header>
    <section class="oi-synthesis" aria-label="${esc(x.synthesis)}"><p class="kicker">${esc(x.synthesis)}</p><div class="oi-syn-grid">${synthesisCards(x)}</div></section>
    <div class="oi-toolbar" role="group" aria-label="${esc(x.filters)}">
      <label class="oi-search"><span class="oi-sr">${esc(x.search)}</span><input type="search" data-search placeholder="${esc(x.search)}" value="${esc(state.query)}"></label>
      <div class="oi-seg"><small>${esc(x.filters)}</small>${[['all', x.all], ['neg', x.fNeg], ['neu', x.fNeu], ['pos', x.fPos]].map(([k, l]) => `<button type="button" data-tone="${k}" aria-pressed="${state.tone === k}" class="${state.tone === k ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>
      <div class="oi-seg"><small>${esc(x.sort)}</small>${[['vis', x.sVis], ['bal', x.sBal], ['act', x.sAct]].map(([k, l]) => `<button type="button" data-sort="${k}" aria-pressed="${state.sort === k}" class="${state.sort === k ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>
      <button type="button" class="oi-btn${state.focus ? ' on' : ''}" data-focus aria-pressed="${state.focus}">${esc(x.focus)}</button>
      <button type="button" class="oi-btn" data-reset>${esc(x.reset)}</button>
    </div>
    <section class="oi-grid">
      <article class="oi-card oi-cockpit"><header><p class="kicker">${esc(x.cockpit)}</p><p class="oi-sub">${esc(x.cockpitSub)}</p></header>${cockpit(x)}</article>
      <aside class="oi-card oi-sheet" aria-live="polite"><p class="kicker">${esc(x.sheet)}</p>${sheet(x)}</aside>
    </section>
    <section class="oi-card oi-tablewrap">${table(x)}</section>
    <section class="oi-card oi-cross"><header><p class="kicker">${esc(x.cross)}</p><p class="oi-sub">${esc(x.crossSub)}</p></header>${constellation(x)}
      <div class="oi-linklist"><p class="kicker">${esc(x.linksTitle)}</p>${t && t.links.length ? `<ul class="oi-links">${t.links.map(l => `<li><span>${bidi(tActor(l.name))}</span><b>${fmt(l.value)}</b></li>`).join('')}</ul>` : `<p class="oi-na">${esc(x.noLinks)}</p>`}</div>
    </section>
    <section class="oi-card oi-timeline"><p class="kicker">${esc(x.timeline)}</p><div class="oi-unavailable"><strong>${esc(x.tlState)}</strong><p>${esc(x.tlText)}</p><div class="oi-ghost">${x.tlCtrls.map(c => `<span aria-disabled="true">${esc(c)}</span>`).join('')}</div><small>${esc(x.tlDist)}</small></div></section>
    <section class="oi-card oi-signals"><p class="kicker">${esc(x.signals)}</p><div class="oi-unavailable"><strong>${esc(x.sigState)}</strong><p>${esc(x.sigText)}</p><p class="oi-label">${esc(x.sigNeed)}</p><ul class="oi-need">${x.sigItems.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div></section>
    <section class="oi-card oi-metho"><p class="kicker">${esc(x.metho)}</p><div class="oi-metho-grid">${x.m.map(([h, b]) => `<div><strong>${esc(h)}</strong><p>${esc(b)}</p></div>`).join('')}</div><p class="oi-warn">${esc(x.warn)}</p></section>`;
  }

  /* ---------- Événements (délégation unique) ---------- */
  const select = name => { state.selected = state.selected === name ? null : name; render(); };
  root.addEventListener('click', e => {
    const topicEl = e.target.closest('[data-topic]');
    if (topicEl) { select(topicEl.dataset.topic); return; }
    if (e.target.closest('[data-close]')) { state.selected = null; render(); return; }
    const tone = e.target.closest('[data-tone]');
    if (tone) { state.tone = tone.dataset.tone; render(); root.querySelector(`[data-tone="${state.tone}"]`)?.focus(); return; }
    const sort = e.target.closest('[data-sort]');
    if (sort) { state.sort = sort.dataset.sort; render(); root.querySelector(`[data-sort="${state.sort}"]`)?.focus(); return; }
    if (e.target.closest('[data-focus]')) { state.focus = !state.focus; render(); root.querySelector('[data-focus]')?.focus(); return; }
    if (e.target.closest('[data-reset]')) { Object.assign(state, { selected: null, query: '', tone: 'all', sort: 'vis', focus: false }); render(); root.querySelector('[data-reset]')?.focus(); }
  });
  root.addEventListener('input', e => {
    if (!e.target.matches('[data-search]')) return;
    state.query = e.target.value;
    render();
    const field = root.querySelector('[data-search]');
    if (field) { field.focus(); field.setSelectionRange(field.value.length, field.value.length); }
  });
  root.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.selected) { state.selected = null; render(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-topic]') && !e.target.closest('button')) {
      e.preventDefault(); select(e.target.closest('[data-topic]').dataset.topic);
    }
  });

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir', 'data-theme'] });
  render();
})();
