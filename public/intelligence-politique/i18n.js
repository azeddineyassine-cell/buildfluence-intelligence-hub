(() => {
  const translations = {
    fr: {
      themeLabel: 'FOND', light: 'CLAIR', dark: 'SOMBRE', login: 'SE CONNECTER', signup: 'RECEVOIR LES ANALYSES',
      langButton: 'Langue : Français', downloadReport: 'Télécharger l\u2019analyse globale', langMenu: 'Choix de la langue',
      previewAnalysis: 'Consulter l\u2019aperçu de l\u2019analyse globale', footerRights: '© 2026 Buildfluence · Tous droits réservés',
      footerPrivacy: 'Respect des données personnelles conforme à la réglementation marocaine CNDP et, le cas échéant, au RGPD européen.',
      footerOsint: 'Analyses réalisées exclusivement à partir de données ouvertes (OSINT), sans microciblage ni profilage des électeurs.', footerArchitecture: 'Architecture', footerContact: 'Contact'
    },
    en: {
      themeLabel: 'THEME', light: 'LIGHT', dark: 'DARK', login: 'SIGN IN', signup: 'RECEIVE THE ANALYSES',
      langButton: 'Language: English', downloadReport: 'Download the global analysis', langMenu: 'Language selection',
      previewAnalysis: 'Open the preview of the global analysis', footerRights: '© 2026 Buildfluence · All rights reserved',
      footerPrivacy: 'Personal data processing complies with Moroccan CNDP regulations and, where applicable, the European GDPR.',
      footerOsint: 'Analyses are based exclusively on open-source data (OSINT), without voter microtargeting or profiling.', footerArchitecture: 'Architecture', footerContact: 'Contact'
    },
    ar: {
      themeLabel: 'المظهر', light: 'فاتح', dark: 'داكن', login: 'تسجيل الدخول', signup: 'تلقّي التحليلات',
      langButton: 'اللغة: العربية', downloadReport: 'تحميل التحليل الشامل', langMenu: 'اختيار اللغة',
      previewAnalysis: 'الاطلاع على معاينة التحليل الشامل', footerRights: '© 2026 Buildfluence · جميع الحقوق محفوظة',
      footerPrivacy: 'تتم معالجة البيانات الشخصية وفق التشريع المغربي وإشراف اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي، وعند الاقتضاء وفق اللائحة الأوروبية العامة لحماية البيانات.',
      footerOsint: 'تُنجز التحليلات حصرا انطلاقا من البيانات مفتوحة المصدر (OSINT)، من دون استهداف دقيق أو تنميط للناخبين.', footerArchitecture: 'الهندسة', footerContact: 'اتصل بنا'
    }

  };


  const pagePhrases = {
    en: {
      'TABLEAU DE BORD':'DASHBOARD','Que se passe-t-il aujourd’hui ?':'What is happening today?','CLASSEMENT':'RANKING','Qui progresse ? Qui recule ?':'Who is rising? Who is falling?','OPINION':'OPINION','Quels sujets dominent le débat ?':'Which issues dominate the debate?','MEDIA':'MEDIA','Qui relaie le débat ?':'Who is amplifying the debate?','DYNAMIQUES POLITIQUES':'POLITICAL DYNAMICS','Comment les acteurs interagissent-ils ?':'How do the actors interact?','ARCHITECTURE':'ARCHITECTURE','Comment le dispositif est-il structuré ?':'How is the system structured?','À PROPOS':'ABOUT','Notre mission et nos engagements':'Our mission and commitments','LA PREMIÈRE PLATEFORME MAROCAINE D’INTELLIGENCE POLITIQUE':'MOROCCO\u2019S FIRST POLITICAL INTELLIGENCE PLATFORM','Comprendre maintenant':'Understand now','Décider aujourd’hui':'Decide today','Anticiper demain':'Anticipate tomorrow','FICHE SIGNALÉTIQUE':'IDENTITY PROFILE','REPÈRES DE L’ÉTUDE':'STUDY REFERENCE','CONTRÔLE QUALITÉ':'QUALITY CONTROL','PÉRIODE':'PERIOD','MENTIONS ANALYSÉES':'MENTIONS ANALYSED','Partis Politiques':'Political Parties','Leaders Politiques':'Political Leaders','Sujets de Débat Politique':'Political Debate Issues','Opinion Citoyenne':'Citizen Opinion','MÉTHODE PROPRIÉTAIRE':'PROPRIETARY METHOD','OUTILS':'TOOLS','OBJECTIF':'OBJECTIVE','Lire les dynamiques narratives':'Read narrative dynamics','GRAPHE RELATIONNEL':'RELATIONAL GRAPH','PRESSE MAROCAINE':'MOROCCAN PRESS','PÉRIODE D’ANALYSE':'ANALYSIS PERIOD','LANGUES PRINCIPALES':'MAIN LANGUAGES','VOIR TOUT →':'VIEW ALL →','ANALYSER →':'ANALYSE →','Architecture':'Architecture','À propos':'About','Contact':'Contact','ARCHITECTURE DÉCISIONNELLE SOUVERAINE':'SOVEREIGN DECISION ARCHITECTURE','PROCESSUS FONCTIONNEL TECHNOLOGIQUE':'TECHNOLOGICAL FUNCTIONAL PROCESS','Veille et intelligence économique':'Monitoring and competitive intelligence','Intelligence artificielle':'Artificial intelligence','Analyse humaine':'Human analysis','Contrôle qualité':'Quality control','SOURCES ET VEILLE':'SOURCES AND MONITORING','PRESSE ET MÉDIAS':'PRESS AND MEDIA','Presse nationale et internationale, médias numériques et publications spécialisées.':'National and international press, digital media and specialised publications.','RÉSEAUX SOCIAUX':'SOCIAL NETWORKS','Conversations publiques, contenus audiovisuels et signaux numériques accessibles.':'Public conversations, audiovisual content and accessible digital signals.','INSTITUTIONS ET':'INSTITUTIONS AND','Sources institutionnelles, publications officielles et données ouvertes.':'Institutional sources, official publications and open data.','ÉTUDES, SONDAGES ET AUDIOVISUEL':'STUDIES, SURVEYS AND AUDIOVISUAL','Études publiques, enquêtes accessibles, rapports et contenus audiovisuels.':'Public studies, accessible surveys, reports and audiovisual content.','SOURCES PUBLIQUES':'PUBLIC SOURCES','COLLECTE PÉRIODIQUE PLANIFIÉE':'SCHEDULED PERIODIC COLLECTION','SOURCES PUBLIQUES ANALYSÉES':'PUBLIC SOURCES ANALYSED','PLATEFORME D’INTELLIGENCE POLITIQUE':'POLITICAL INTELLIGENCE PLATFORM','De la donnée publique à l’intelligence décisionnelle':'From public data to decision intelligence','OBSERVER':'OBSERVE','Collecter, agréger, normaliser et dédupliquer les données publiques.':'Collect, aggregate, normalise and deduplicate public data.','COMPRENDRE':'UNDERSTAND','Qualifier les contenus par intelligence artificielle, veille et analyse augmentée.':'Qualify content through artificial intelligence, monitoring and augmented analysis.','ANALYSER':'ANALYSE','Identifier les narratifs, les acteurs, la tonalité, les tendances et les signaux émergents.':'Identify narratives, actors, tone, trends and emerging signals.','RELIER':'CONNECT','Cartographier les cooccurrences, les écosystèmes d’acteurs et les relations documentées.':'Map co-occurrences, actor ecosystems and documented relations.','Une cooccurrence médiatique ne constitue pas à elle seule une alliance, une opposition ou une relation d’influence confirmée.':'A media co-occurrence alone does not constitute a confirmed alliance, opposition or influence relationship.','MESURER':'MEASURE','Produire les indicateurs disponibles et préparer les dimensions de':'Produce the available indicators and prepare the dimensions of','non calculé tant que les données nécessaires aux huit dimensions ne sont pas complètes et validées.':'not calculated until the data required for the eight dimensions is complete and validated.','GARANTIR':'GUARANTEE','Assurer la validation humaine, la traçabilité, l’éthique, la conformité et le contrôle qualité.':'Ensure human validation, traceability, ethics, compliance and quality control.','COUCHES TECHNOLOGIQUES TRANSVERSALES':'CROSS-CUTTING TECHNOLOGY LAYERS','OUTILS DE VEILLE ET D’INTELLIGENCE ÉCONOMIQUE':'MONITORING AND COMPETITIVE INTELLIGENCE TOOLS','Étapes 01 et 02':'Steps 01 and 02','IA • ANALYTICS •':'AI • ANALYTICS •','Étapes 03 à 05':'Steps 03 to 05','CONTRÔLE QUALITÉ HUMAIN':'HUMAN QUALITY CONTROL','Étapes 01 à 06':'Steps 01 to 06','GOUVERNANCE HUMAINE CONTINUE':'CONTINUOUS HUMAN GOVERNANCE','Révision':'Review','Validation':'Validation','Éthique':'Ethics','Conformité':'Compliance','Traçabilité':'Traceability','INTELLIGENCE ACTIONNABLE':'ACTIONABLE INTELLIGENCE','TABLEAUX DE BORD':'DASHBOARDS','Indicateurs validés, fraîcheur des données et synthèses opérationnelles.':'Validated indicators, data freshness and operational summaries.','Visualisation des narratifs et des cooccurrences documentées.':'Visualisation of narratives and documented co-occurrences.','CARTOGRAPHIE DES ÉCOSYSTÈMES ET RAPPORTS DE FORCE':'MAPPING OF ECOSYSTEMS AND POWER RELATIONS','Relations documentées et hypothèses explicitement qualifiées.':'Documented relations and explicitly qualified hypotheses.','RAPPORTS ET AIDE À LA DÉCISION':'REPORTS AND DECISION SUPPORT','Notes d’analyse, alertes, rapports et éléments d’aide à la décision.':'Analysis notes, alerts, reports and decision support material.','PUBLICS DESTINATAIRES':'TARGET AUDIENCES','Décideurs':'Decision-makers','Institutions':'Institutions','Partis':'Parties','Médias':'Media','Journalistes':'Journalists','Chercheurs':'Researchers','Universités':'Universities','Grandes écoles':'Higher education schools','LES 8 DIMENSIONS DE L’':'THE 8 DIMENSIONS OF','VISIBILITÉ':'VISIBILITY','Présence et volume de mentions dédupliquées.':'Presence and volume of deduplicated mentions.','ENGAGEMENT':'ENGAGEMENT','Réactions, partages et commentaires observés.':'Observed reactions, shares and comments.','PERSISTANCE':'PERSISTENCE','Capacité d’un signal à durer dans le temps.':'Ability of a signal to last over time.','THÉMATIQUES':'THEMES','Association aux enjeux structurants du débat.':'Association with the structuring issues of the debate.','INFLUENCE':'INFLUENCE','Importance des sources et des relais identifiés.':'Weight of identified sources and amplifiers.','PROPAGATION':'PROPAGATION','Diffusion d’un récit sur une période observée.':'Spread of a narrative over an observed period.','TONALITÉ':'TONE','Orientation du discours, avec incertitude explicitée.':'Orientation of discourse, with stated uncertainty.','DYNAMIQUE GLOBALE':'OVERALL DYNAMIC','Variation consolidée de l’ensemble des dimensions.':'Consolidated variation across all dimensions.','INDICE':'INDEX','DE DYNAMIQUE NARRATIVE':'OF NARRATIVE DYNAMICS','Intelligence politique souveraine, explicable et contrôlée humainement.':'Sovereign political intelligence, explainable and humanly controlled.','Les huit dimensions décrivent le référentiel méthodologique. Le score':'The eight dimensions describe the methodological framework. The actual','réel n’est affiché que lorsque toutes les données nécessaires sont disponibles et validées.':'score is displayed only when all required data is available and validated.','LECTURE RESPONSABLE':'RESPONSIBLE READING','L’IBDN® décrit une présence et une dynamique dans le débat public. Il ne mesure jamais une intention de vote et ne constitue ni un sondage ni une prédiction électorale.':'IBDN® describes a presence and a dynamic within public debate. It never measures voting intention and is neither a poll nor an electoral prediction.','COMPRÉHENSION':'UNDERSTANDING','Une lecture claire et factuelle du débat public.':'A clear and factual reading of public debate.','TRANSPARENCE':'TRANSPARENCY','Une méthode sourcée et explicable.':'A sourced and explainable method.','ANTICIPATION':'ANTICIPATION','Identifier les signaux faibles.':'Identify weak signals.','GOUVERNANCE ÉTHIQUE':'ETHICAL GOVERNANCE','Ce que l’indice mesure, et ce qu’il ne mesure pas.':'What the index measures, and what it does not.','Sources ouvertes, contrôle qualité humain, période d’observation affichée et limites explicitées. La balance de tonalité des leaders sera ajoutée dès réception de la requête dédiée, sans valeur provisoire inventée.':'Open sources, human quality control, displayed observation period and explicit limitations. The tone balance of leaders will be added once the dedicated request is received, with no invented provisional value.',
      "POSITIONNEMENT":"POSITIONING","Buildfluence construit la souveraineté décisionnelle des gouvernements, des grandes entreprises et des institutions internationales.":"Buildfluence builds the decision sovereignty of governments, major corporations and international institutions.","Transformer les données et les signaux en intelligence exploitable.":"Turn data and signals into actionable intelligence.","Comprendre les rapports de force, les risques et les dynamiques d’influence.":"Understand power relations, risks and influence dynamics.","Sécuriser les décisions en environnement complexe.":"Secure decisions in complex environments.","Construire des dispositifs opérationnels de veille, d’analyse et d’intervention.":"Build operational monitoring, analysis and intervention capabilities.","EXPERTISE":"EXPERTISE","Comprendre un environnement, ses acteurs et ses signaux avant qu’ils ne deviennent des contraintes.":"Understand an environment, its actors and its signals before they become constraints.","Mesurer la perception, structurer un récit et gagner en attractivité durable.":"Measure perception, structure a narrative and build lasting attractiveness.","Documenter une contrepartie, un actif ou une opération pour maîtriser le risque avant l’engagement.":"Document a counterparty, an asset or a transaction to control risk before commitment.","SOUVERAINETÉ DÉCISIONNELLE":"DECISION SOVEREIGNTY","TRACK RECORD CONSOLIDÉ":"CONSOLIDATED TRACK RECORD","CHIFFRES CLÉS":"KEY FIGURES","ZONES D’INTERVENTION":"AREAS OF OPERATION","SECTEURS":"SECTORS","SITUATIONS TRAITÉES":"SITUATIONS HANDLED","Année de démarrage de l’activité":"Year operations began","Missions réalisées depuis 2015":"Assignments delivered since 2015","Continents couverts":"Continents covered","Interventions auprès de gouvernements, de grandes entreprises, d’institutions publiques et d’organisations internationales.":"Engagements with governments, major corporations, public institutions and international organisations.","Afrique":"Africa","Europe":"Europe","Moyen-Orient":"Middle East","Amérique du Nord":"North America","Quatre continents couverts sur l’ensemble des missions. Aucun détail par pays n’est publié.":"Four continents covered across all assignments. No country-level detail is published.","Secteur public":"Public sector","Industrie stratégique":"Strategic industry","Santé":"Healthcare","Finance et investissement":"Finance and investment","Organisations internationales":"International organisations","Sport professionnel":"Professional sport","Environnements exigeants, à forte sensibilité institutionnelle et réglementaire.":"Demanding environments with high institutional and regulatory sensitivity.","Intelligence stratégique":"Strategic intelligence","Influence":"Influence","Réputation":"Reputation","Gestion de crise":"Crisis management","Attractivité":"Attractiveness","Due diligence":"Due diligence","Expertises mobilisées selon la situation, sans exposition des clients ni des dossiers.":"Capabilities deployed according to the situation, with no client or case disclosure.","Visibilité":"Visibility","Maîtrise du risque":"Risk control","Compétitivité":"Competitiveness","Souveraineté décisionnelle":"Decision sovereignty","EXPLORER LES SUCCESS STORIES":"EXPLORE THE SUCCESS STORIES","FONDATEUR":"FOUNDER","Fondateur & Managing Director":"Founder & Managing Director","Il conduit depuis plus de vingt-cinq ans des missions d’intelligence stratégique, d’influence et de maîtrise du risque pour des gouvernements, des grandes entreprises et des organisations internationales. Il a fondé Buildfluence en 2015 pour doter les décideurs d’une infrastructure d’analyse indépendante, documentée et souveraine, capable de transformer des signaux dispersés en décisions tenables dans des environnements complexes et fortement exposés.":"For more than twenty-five years he has led strategic intelligence, influence and risk-control assignments for governments, major corporations and international organisations. He founded Buildfluence in 2015 to give decision-makers an independent, documented and sovereign analysis infrastructure, able to turn scattered signals into decisions that hold in complex and highly exposed environments.","Plus de 25 ans d’expérience personnelle en intelligence stratégique":"More than 25 years of personal experience in strategic intelligence","Missions conduites sur quatre continents":"Assignments delivered across four continents","Interventions auprès d’États, d’entreprises et d’organisations internationales":"Engagements with states, corporations and international organisations","DÉCOUVRIR BUILDFLUENCE":"DISCOVER BUILDFLUENCE","Secteur public":"Public sector","Industrie stratégique":"Strategic industry","Santé":"Healthcare","Finance et investissement":"Finance and investment","Organisations internationales":"International organisations","Sport professionnel":"Professional sport","Référence publique représentative":"Representative public reference","Référence confidentielle":"Confidential reference","Environnements exigeants, à forte sensibilité institutionnelle et réglementaire. Références publiques représentatives et non exhaustives, issues de missions documentées.":"Demanding environments with high institutional and regulatory sensitivity. Representative, non-exhaustive public references drawn from documented assignments.","Crise incontrôlée":"Uncontrolled crisis","Atteinte à la réputation":"Reputational damage","Décider sans visibilité":"Deciding without visibility","Perte d’attractivité":"Loss of attractiveness","Déficit d’influence":"Influence deficit","Risque invisible":"Invisible risk","Cellule de veille dédiée et contre-narrative documentée":"Dedicated monitoring unit and documented counter-narrative","Crise de deux ans jugulée en trois semaines, +14 % de parts de marché regagnées":"A two-year crisis contained in three weeks, +14% market share regained","Ministère de la Santé":"Ministry of Health","Dispositif de veille permanent et formation des cadres DICom":"Permanent monitoring capability and training of DICom executives","Crise nationale atténuée en deux semaines, solution de veille installée durablement":"National crisis mitigated in two weeks, monitoring solution installed for the long term","Plateforme d’aide à la décision déployée sur onze mois":"Decision-support platform deployed over eleven months","Mission de onze mois menée à terme, décision outillée par une plateforme d’analyse":"Eleven-month assignment delivered in full, decision-making equipped with an analysis platform","Hôpital Universitaire International Mohammed VI":"Mohammed VI International University Hospital","Cartographie des parties prenantes et feuille de route ciblée":"Stakeholder mapping and targeted roadmap","Dix-huit recommandations stratégiques opérationnelles, écosystème complet cartographié":"Eighteen operational strategic recommendations, full ecosystem mapped","Présidence du Sénégal":"Presidency of Senegal","Monitoring narratif continu et alertes décisionnelles":"Continuous narrative monitoring and decision alerts","Surveillance permanente de la notoriété de l’État, détection en temps réel des signaux faibles":"Permanent monitoring of the State's reputation, real-time detection of weak signals","Investigation approfondie avant engagement":"In-depth investigation prior to commitment","Valorisation de 400 M$ auditée, code décisionnel à trois niveaux":"USD 400M valuation audited, three-level decision code","Survolez ou sélectionnez une situation pour afficher la référence.":"Hover or select a situation to display the reference.","Intervention":"Response","Résultat vérifié":"Verified outcome","Voir la référence ↗":"View the reference ↗","Situations traitées lors de missions documentées. Références publiques représentatives et non exhaustives, présentées sans valeur de recommandation.":"Situations handled during documented assignments. Representative, non-exhaustive public references, presented without any endorsement value.","Fermer la fiche de référence":"Close the reference card"
    },
    ar: {
      'TABLEAU DE BORD':'لوحة القيادة','Que se passe-t-il aujourd’hui ?':'ماذا يحدث اليوم؟','CLASSEMENT':'الترتيب','Qui progresse ? Qui recule ?':'من يتقدم؟ ومن يتراجع؟','OPINION':'الرأي','Quels sujets dominent le débat ?':'ما المواضيع المهيمنة على النقاش؟','MEDIA':'الإعلام','Qui relaie le débat ?':'من ينقل النقاش؟','DYNAMIQUES POLITIQUES':'الديناميات السياسية','Comment les acteurs interagissent-ils ?':'كيف يتفاعل الفاعلون؟','ARCHITECTURE':'الهندسة','Comment le dispositif est-il structuré ?':'كيف تمت هيكلة المنظومة؟','À PROPOS':'من نحن','Notre mission et nos engagements':'مهمتنا والتزاماتنا','LA PREMIÈRE PLATEFORME MAROCAINE D’INTELLIGENCE POLITIQUE':'أول منصة مغربية للذكاء السياسي','Comprendre maintenant':'افهم الآن','Décider aujourd’hui':'قرر اليوم','Anticiper demain':'استبق الغد','FICHE SIGNALÉTIQUE':'البطاقة التعريفية','REPÈRES DE L’ÉTUDE':'مراجع الدراسة','CONTRÔLE QUALITÉ':'مراقبة الجودة','PÉRIODE':'الفترة','MENTIONS ANALYSÉES':'الإشارات المحللة','Partis Politiques':'الأحزاب السياسية','Leaders Politiques':'القادة السياسيون','Sujets de Débat Politique':'مواضيع النقاش السياسي','Opinion Citoyenne':'رأي المواطنين','MÉTHODE PROPRIÉTAIRE':'المنهجية الخاصة','OUTILS':'الأدوات','OBJECTIF':'الهدف','Lire les dynamiques narratives':'قراءة الديناميات السردية','GRAPHE RELATIONNEL':'الرسم العلائقي','PRESSE MAROCAINE':'الصحافة المغربية','PÉRIODE D’ANALYSE':'فترة التحليل','LANGUES PRINCIPALES':'اللغات الرئيسية','VOIR TOUT →':'عرض الكل ←','ANALYSER →':'تحليل ←','Architecture':'الهندسة','À propos':'من نحن','Contact':'اتصل بنا','ARCHITECTURE DÉCISIONNELLE SOUVERAINE':'هندسة القرار السيادية','PROCESSUS FONCTIONNEL TECHNOLOGIQUE':'المسار الوظيفي التقني','Veille et intelligence économique':'الرصد واليقظة الاستراتيجية','Intelligence artificielle':'الذكاء الاصطناعي','Analyse humaine':'التحليل البشري','Contrôle qualité':'مراقبة الجودة','SOURCES ET VEILLE':'المصادر والرصد','PRESSE ET MÉDIAS':'الصحافة والإعلام','Presse nationale et internationale, médias numériques et publications spécialisées.':'الصحافة الوطنية والدولية والإعلام الرقمي والمنشورات المتخصصة.','RÉSEAUX SOCIAUX':'الشبكات الاجتماعية','Conversations publiques, contenus audiovisuels et signaux numériques accessibles.':'المحادثات العمومية والمحتويات السمعية البصرية والمؤشرات الرقمية المتاحة.','INSTITUTIONS ET':'المؤسسات و','Sources institutionnelles, publications officielles et données ouvertes.':'المصادر المؤسسية والمنشورات الرسمية والبيانات المفتوحة.','ÉTUDES, SONDAGES ET AUDIOVISUEL':'الدراسات والاستقصاءات والمحتوى السمعي البصري','Études publiques, enquêtes accessibles, rapports et contenus audiovisuels.':'الدراسات العمومية والاستقصاءات المتاحة والتقارير والمحتويات السمعية البصرية.','SOURCES PUBLIQUES':'مصادر عمومية','COLLECTE PÉRIODIQUE PLANIFIÉE':'جمع دوري مبرمج','SOURCES PUBLIQUES ANALYSÉES':'مصادر عمومية محللة','PLATEFORME D’INTELLIGENCE POLITIQUE':'منصة الذكاء السياسي','De la donnée publique à l’intelligence décisionnelle':'من البيانات العمومية إلى ذكاء القرار','OBSERVER':'الملاحظة','Collecter, agréger, normaliser et dédupliquer les données publiques.':'جمع البيانات العمومية وتوحيدها وتصفية التكرار منها.','COMPRENDRE':'الفهم','Qualifier les contenus par intelligence artificielle, veille et analyse augmentée.':'تصنيف المحتويات بالذكاء الاصطناعي والرصد والتحليل المعزز.','ANALYSER':'التحليل','Identifier les narratifs, les acteurs, la tonalité, les tendances et les signaux émergents.':'تحديد السرديات والفاعلين والنبرة والاتجاهات والمؤشرات الناشئة.','RELIER':'الربط','Cartographier les cooccurrences, les écosystèmes d’acteurs et les relations documentées.':'رسم التواردات ومنظومات الفاعلين والعلاقات الموثقة.','Une cooccurrence médiatique ne constitue pas à elle seule une alliance, une opposition ou une relation d’influence confirmée.':'التوارد الإعلامي وحده لا يشكل تحالفاً أو تعارضاً أو علاقة تأثير مؤكدة.','MESURER':'القياس','Produire les indicateurs disponibles et préparer les dimensions de':'إنتاج المؤشرات المتاحة وتحضير أبعاد','non calculé tant que les données nécessaires aux huit dimensions ne sont pas complètes et validées.':'غير محتسب إلى أن تكون البيانات اللازمة للأبعاد الثمانية كاملة ومصادقاً عليها.','GARANTIR':'الضمان','Assurer la validation humaine, la traçabilité, l’éthique, la conformité et le contrôle qualité.':'ضمان المصادقة البشرية والتتبع والأخلاقيات والمطابقة ومراقبة الجودة.','COUCHES TECHNOLOGIQUES TRANSVERSALES':'الطبقات التقنية العرضية','OUTILS DE VEILLE ET D’INTELLIGENCE ÉCONOMIQUE':'أدوات الرصد واليقظة الاستراتيجية','Étapes 01 et 02':'المرحلتان 01 و02','IA • ANALYTICS •':'الذكاء الاصطناعي • التحليلات •','Étapes 03 à 05':'المراحل 03 إلى 05','CONTRÔLE QUALITÉ HUMAIN':'المراقبة البشرية للجودة','Étapes 01 à 06':'المراحل 01 إلى 06','GOUVERNANCE HUMAINE CONTINUE':'حكامة بشرية مستمرة','Révision':'المراجعة','Validation':'المصادقة','Éthique':'الأخلاقيات','Conformité':'المطابقة','Traçabilité':'التتبع','INTELLIGENCE ACTIONNABLE':'ذكاء قابل للتنفيذ','TABLEAUX DE BORD':'لوحات القيادة','Indicateurs validés, fraîcheur des données et synthèses opérationnelles.':'مؤشرات مصادق عليها وحداثة البيانات وخلاصات عملية.','Visualisation des narratifs et des cooccurrences documentées.':'تمثيل بصري للسرديات والتواردات الموثقة.','CARTOGRAPHIE DES ÉCOSYSTÈMES ET RAPPORTS DE FORCE':'خرائط المنظومات وموازين القوى','Relations documentées et hypothèses explicitement qualifiées.':'علاقات موثقة وفرضيات موصوفة بشكل صريح.','RAPPORTS ET AIDE À LA DÉCISION':'التقارير ودعم القرار','Notes d’analyse, alertes, rapports et éléments d’aide à la décision.':'مذكرات تحليلية وتنبيهات وتقارير وعناصر لدعم القرار.','PUBLICS DESTINATAIRES':'الجهات المستهدفة','Décideurs':'صناع القرار','Institutions':'المؤسسات','Partis':'الأحزاب','Médias':'الإعلام','Journalistes':'الصحافيون','Chercheurs':'الباحثون','Universités':'الجامعات','Grandes écoles':'المدارس العليا','LES 8 DIMENSIONS DE L’':'الأبعاد الثمانية لـ','VISIBILITÉ':'الظهور','Présence et volume de mentions dédupliquées.':'الحضور وحجم الإشارات بعد إزالة التكرار.','ENGAGEMENT':'التفاعل','Réactions, partages et commentaires observés.':'التفاعلات والمشاركات والتعليقات الملاحظة.','PERSISTANCE':'الاستمرارية','Capacité d’un signal à durer dans le temps.':'قدرة المؤشر على الاستمرار في الزمن.','THÉMATIQUES':'المواضيع','Association aux enjeux structurants du débat.':'الارتباط بالقضايا البنيوية للنقاش.','INFLUENCE':'التأثير','Importance des sources et des relais identifiés.':'أهمية المصادر والوسائط المحددة.','PROPAGATION':'الانتشار','Diffusion d’un récit sur une période observée.':'انتشار السردية خلال الفترة الملاحظة.','TONALITÉ':'النبرة','Orientation du discours, avec incertitude explicitée.':'توجه الخطاب مع بيان درجة عدم اليقين.','DYNAMIQUE GLOBALE':'الدينامية الإجمالية','Variation consolidée de l’ensemble des dimensions.':'التغير المجمع لمختلف الأبعاد.','INDICE':'مؤشر','DE DYNAMIQUE NARRATIVE':'لدينامية السرد','Intelligence politique souveraine, explicable et contrôlée humainement.':'ذكاء سياسي سيادي، قابل للتفسير وخاضع للرقابة البشرية.','Les huit dimensions décrivent le référentiel méthodologique. Le score':'الأبعاد الثمانية تصف المرجع المنهجي. لا تُعرض نتيجة','réel n’est affiché que lorsque toutes les données nécessaires sont disponibles et validées.':'الفعلية إلا عندما تكون كل البيانات اللازمة متوفرة ومصادقاً عليها.','LECTURE RESPONSABLE':'قراءة مسؤولة','L’IBDN® décrit une présence et une dynamique dans le débat public. Il ne mesure jamais une intention de vote et ne constitue ni un sondage ni une prédiction électorale.':'يصف مؤشر IBDN® الحضور والدينامية في النقاش العمومي. وهو لا يقيس نية التصويت ولا يشكل استطلاعاً ولا تنبؤاً انتخابياً.','COMPRÉHENSION':'الفهم العام','Une lecture claire et factuelle du débat public.':'قراءة واضحة ووقائعية للنقاش العمومي.','TRANSPARENCE':'الشفافية','Une méthode sourcée et explicable.':'منهجية موثقة المصادر وقابلة للتفسير.','ANTICIPATION':'الاستباق','Identifier les signaux faibles.':'تحديد المؤشرات الضعيفة.','GOUVERNANCE ÉTHIQUE':'الحكامة الأخلاقية','Ce que l’indice mesure, et ce qu’il ne mesure pas.':'ما يقيسه المؤشر وما لا يقيسه.','Sources ouvertes, contrôle qualité humain, période d’observation affichée et limites explicitées. La balance de tonalité des leaders sera ajoutée dès réception de la requête dédiée, sans valeur provisoire inventée.':'مصادر مفتوحة ومراقبة بشرية للجودة وفترة رصد معلنة وحدود موضحة. سيضاف ميزان نبرة القادة عند تلقي الطلب المخصص، دون أي قيمة مؤقتة مفترضة.',
      "POSITIONNEMENT":"الموقع الاستراتيجي","Buildfluence construit la souveraineté décisionnelle des gouvernements, des grandes entreprises et des institutions internationales.":"تبني Buildfluence السيادة القرارية للحكومات والشركات الكبرى والمؤسسات الدولية.","Transformer les données et les signaux en intelligence exploitable.":"تحويل البيانات والمؤشرات إلى معرفة قابلة للاستخدام.","Comprendre les rapports de force, les risques et les dynamiques d’influence.":"فهم موازين القوى والمخاطر ودينامية التأثير.","Sécuriser les décisions en environnement complexe.":"تأمين القرارات في البيئات المعقدة.","Construire des dispositifs opérationnels de veille, d’analyse et d’intervention.":"بناء أجهزة عملية للرصد والتحليل والتدخل.","EXPERTISE":"الخبرة","Comprendre un environnement, ses acteurs et ses signaux avant qu’ils ne deviennent des contraintes.":"فهم البيئة وفاعليها ومؤشراتها قبل أن تتحول إلى قيود.","Mesurer la perception, structurer un récit et gagner en attractivité durable.":"قياس الإدراك وبناء السردية وتحقيق جاذبية مستدامة.","Documenter une contrepartie, un actif ou une opération pour maîtriser le risque avant l’engagement.":"توثيق الطرف المقابل أو الأصل أو العملية للتحكم في المخاطر قبل الالتزام.","SOUVERAINETÉ DÉCISIONNELLE":"السيادة القرارية","TRACK RECORD CONSOLIDÉ":"سجل الإنجازات المجمع","CHIFFRES CLÉS":"أرقام رئيسية","ZONES D’INTERVENTION":"مناطق التدخل","SECTEURS":"القطاعات","SITUATIONS TRAITÉES":"الحالات المعالجة","Année de démarrage de l’activité":"سنة انطلاق النشاط","Missions réalisées depuis 2015":"مهام منجزة منذ 2015","Continents couverts":"قارات مشمولة","Interventions auprès de gouvernements, de grandes entreprises, d’institutions publiques et d’organisations internationales.":"تدخلات لدى حكومات وشركات كبرى ومؤسسات عمومية ومنظمات دولية.","Afrique":"إفريقيا","Europe":"أوروبا","Moyen-Orient":"الشرق الأوسط","Amérique du Nord":"أمريكا الشمالية","Quatre continents couverts sur l’ensemble des missions. Aucun détail par pays n’est publié.":"أربع قارات مشمولة في مجموع المهام. لا يُنشر أي تفصيل حسب البلد.","Secteur public":"القطاع العمومي","Industrie stratégique":"الصناعة الاستراتيجية","Santé":"الصحة","Finance et investissement":"المالية والاستثمار","Organisations internationales":"المنظمات الدولية","Sport professionnel":"الرياضة الاحترافية","Environnements exigeants, à forte sensibilité institutionnelle et réglementaire.":"بيئات دقيقة ذات حساسية مؤسسية وتنظيمية عالية.","Intelligence stratégique":"الاستطلاع الاستراتيجي","Influence":"التأثير","Réputation":"السمعة","Gestion de crise":"إدارة الأزمات","Attractivité":"الجاذبية","Due diligence":"التدقيق المعمق","Expertises mobilisées selon la situation, sans exposition des clients ni des dossiers.":"خبرات تُجنّد حسب الحالة، دون الكشف عن العملاء أو الملفات.","Visibilité":"الظهور","Maîtrise du risque":"التحكم في المخاطر","Compétitivité":"التنافسية","Souveraineté décisionnelle":"السيادة القرارية","EXPLORER LES SUCCESS STORIES":"استكشاف قصص النجاح","FONDATEUR":"المؤسس","Fondateur & Managing Director":"المؤسس والمدير العام","Il conduit depuis plus de vingt-cinq ans des missions d’intelligence stratégique, d’influence et de maîtrise du risque pour des gouvernements, des grandes entreprises et des organisations internationales. Il a fondé Buildfluence en 2015 pour doter les décideurs d’une infrastructure d’analyse indépendante, documentée et souveraine, capable de transformer des signaux dispersés en décisions tenables dans des environnements complexes et fortement exposés.":"يقود منذ أكثر من خمسة وعشرين عامًا مهام في الاستطلاع الاستراتيجي والتأثير والتحكم في المخاطر لفائدة حكومات وشركات كبرى ومنظمات دولية. أسس Buildfluence سنة 2015 لتمكين أصحاب القرار من بنية تحليل مستقلة وموثقة وسيادية، قادرة على تحويل المؤشرات المتناثرة إلى قرارات صامدة في بيئات معقدة وشديدة التعرض.","Plus de 25 ans d’expérience personnelle en intelligence stratégique":"أكثر من 25 سنة من الخبرة الشخصية في الاستطلاع الاستراتيجي","Missions conduites sur quatre continents":"مهام منجزة في أربع قارات","Interventions auprès d’États, d’entreprises et d’organisations internationales":"تدخلات لدى دول وشركات ومنظمات دولية","DÉCOUVRIR BUILDFLUENCE":"استكشاف Buildfluence","Secteur public":"القطاع العمومي","Industrie stratégique":"الصناعة الاستراتيجية","Santé":"الصحة","Finance et investissement":"المالية والاستثمار","Organisations internationales":"المنظمات الدولية","Sport professionnel":"الرياضة الاحترافية","Référence publique représentative":"مرجع عمومي تمثيلي","Référence confidentielle":"مرجع سري","Environnements exigeants, à forte sensibilité institutionnelle et réglementaire. Références publiques représentatives et non exhaustives, issues de missions documentées.":"بيئات دقيقة ذات حساسية مؤسسية وتنظيمية عالية. مراجع عمومية تمثيلية وغير حصرية، مستمدة من مهام موثقة.","Crise incontrôlée":"أزمة خارجة عن السيطرة","Atteinte à la réputation":"المساس بالسمعة","Décider sans visibilité":"القرار دون رؤية واضحة","Perte d’attractivité":"تراجع الجاذبية","Déficit d’influence":"نقص التأثير","Risque invisible":"مخاطر غير مرئية","Cellule de veille dédiée et contre-narrative documentée":"خلية رصد مخصصة وسردية مضادة موثقة","Crise de deux ans jugulée en trois semaines, +14 % de parts de marché regagnées":"احتواء أزمة استمرت سنتين في ثلاثة أسابيع، واستعادة 14٪ من حصة السوق","Ministère de la Santé":"وزارة الصحة","Dispositif de veille permanent et formation des cadres DICom":"جهاز رصد دائم وتكوين أطر مديرية التواصل","Crise nationale atténuée en deux semaines, solution de veille installée durablement":"تخفيف أزمة وطنية في أسبوعين، وتثبيت حل رصد بشكل مستدام","Plateforme d’aide à la décision déployée sur onze mois":"منصة لدعم القرار تم نشرها على مدى أحد عشر شهرا","Mission de onze mois menée à terme, décision outillée par une plateforme d’analyse":"مهمة من أحد عشر شهرا أُنجزت بالكامل، وقرار مدعوم بمنصة تحليل","Hôpital Universitaire International Mohammed VI":"المركز الاستشفائي الجامعي الدولي محمد السادس","Cartographie des parties prenantes et feuille de route ciblée":"خرائط الأطراف المعنية وخارطة طريق موجهة","Dix-huit recommandations stratégiques opérationnelles, écosystème complet cartographié":"ثماني عشرة توصية استراتيجية عملية، ورسم كامل للمنظومة","Présidence du Sénégal":"رئاسة السنغال","Monitoring narratif continu et alertes décisionnelles":"رصد سردي مستمر وتنبيهات قرارية","Surveillance permanente de la notoriété de l’État, détection en temps réel des signaux faibles":"مراقبة دائمة لسمعة الدولة، وكشف الإشارات الضعيفة في الوقت الحقيقي","Investigation approfondie avant engagement":"تحقيق معمق قبل الالتزام","Valorisation de 400 M$ auditée, code décisionnel à trois niveaux":"تدقيق تقييم بقيمة 400 مليون دولار، ورمز قراري بثلاثة مستويات","Survolez ou sélectionnez une situation pour afficher la référence.":"مرّر المؤشر أو اختر حالة لعرض المرجع.","Intervention":"التدخل","Résultat vérifié":"نتيجة موثقة","Voir la référence ↗":"عرض المرجع ↗","Situations traitées lors de missions documentées. Références publiques représentatives et non exhaustives, présentées sans valeur de recommandation.":"حالات معالجة في إطار مهام موثقة. مراجع عمومية تمثيلية وغير حصرية، تُعرض دون أي قيمة توصية.","Fermer la fiche de référence":"إغلاق بطاقة المرجع"
    }
  };

  // Traçabilité du corpus et téléchargement du rapport — traductions additionnelles.
  const extraPhrases = {
    en: {
      'TRAÇABILITÉ DU CORPUS': 'CORPUS TRACEABILITY',
      'Du fichier brut aux URL uniques': 'From raw file to unique URLs',
      '2 540 brutes -> 42 exclues -> 2 498 admissibles -> 438 doublons retirés -> 2 060 URL uniques': '2,540 raw rows -> 42 excluded -> 2,498 eligible -> 438 duplicates removed -> 2,060 unique URLs',
      'Lignes brutes du fichier source Partis et Leaders.': 'Raw rows from the Parties and Leaders source file.',
      'Lignes exclues lors du contrôle d’éligibilité des URL.': 'Rows excluded during the URL eligibility check.',
      'Lignes admissibles après contrôle d’éligibilité.': 'Eligible rows after the eligibility check.',
      'Doublons retirés parmi les seules lignes admissibles.': 'Duplicates removed from eligible rows only.',
      'URL uniques retenues pour les Partis et Leaders.': 'Unique URLs retained for Parties and Leaders.',
      'Règle de contrôle : lignes brutes moins lignes exclues moins doublons retirés égale URL uniques. La publication est bloquée si cette égalité n’est pas vérifiée.': 'Control rule: raw rows minus excluded rows minus duplicates removed equals unique URLs. Publication is blocked if this equality does not hold.',
      'TÉLÉCHARGER L’ANALYSE GLOBALE': 'DOWNLOAD THE GLOBAL ANALYSIS'
    },
    ar: {
      'TRAÇABILITÉ DU CORPUS': 'تتبع بيانات المدونة',
      'Du fichier brut aux URL uniques': 'من الملف الخام إلى الروابط الفريدة',
      '2 540 brutes -> 42 exclues -> 2 498 admissibles -> 438 doublons retirés -> 2 060 URL uniques': '2,540 سطراً خاماً -> استبعاد 42 -> 2,498 سطراً مؤهلاً -> حذف 438 تكراراً -> 2,060 رابطاً فريداً',
      'Lignes brutes du fichier source Partis et Leaders.': 'الأسطر الخامة من ملف الأحزاب والقادة.',
      'Lignes exclues lors du contrôle d’éligibilité des URL.': 'أسطر مستبعدة عند مراقبة أهلية الروابط.',
      'Lignes admissibles après contrôle d’éligibilité.': 'أسطر مؤهلة بعد مراقبة الأهلية.',
      'Doublons retirés parmi les seules lignes admissibles.': 'تكرارات محذوفة من الأسطر المؤهلة فقط.',
      'URL uniques retenues pour les Partis et Leaders.': 'روابط فريدة معتمدة للأحزاب والقادة.',
      'Règle de contrôle : lignes brutes moins lignes exclues moins doublons retirés égale URL uniques. La publication est bloquée si cette égalité n’est pas vérifiée.': 'قاعدة المراقبة: الأسطر الخامة ناقص الأسطر المستبعدة ناقص التكرارات المحذوفة يساوي الروابط الفريدة. ويُمنع النشر إن لم تتحقق هذه المعادلة.',
      'TÉLÉCHARGER L’ANALYSE GLOBALE': 'تحميل التحليل الشامل'
    }
  };
  Object.keys(extraPhrases).forEach(code => Object.assign(pagePhrases[code], extraPhrases[code]));

  const FLAGS = { fr: '🇫🇷', ar: '🇲🇦', en: '🇬🇧' };

  Object.assign(pagePhrases.en, {
    'Trois continents couverts sur l’ensemble des missions. Aucun détail par pays n’est publié.': 'Three continents covered across all assignments. No country-level detail is published.',
    'Missions conduites sur trois continents': 'Assignments delivered across three continents',
    'URL uniques dans le graphe relationnel': 'unique URLs in the relational graph',
    'URL uniques dans le corpus global dédupliqué': 'unique URLs in the deduplicated global corpus',
    '137 et 596 correspondent aux chevauchements inter-corpus retirés afin qu’une même URL ne soit jamais comptée deux fois.': '137 and 596 are cross-corpus overlaps removed so that the same URL is never counted twice.'
  });
  Object.assign(pagePhrases.ar, {
    'Trois continents couverts sur l’ensemble des missions. Aucun détail par pays n’est publié.': 'ثلاث قارات مشمولة في مجموع المهام. لا يُنشر أي تفصيل حسب البلد.',
    'Missions conduites sur trois continents': 'مهام منجزة في ثلاث قارات',
    'URL uniques dans le graphe relationnel': 'رابطاً فريداً في الرسم العلائقي',
    'URL uniques dans le corpus global dédupliqué': 'رابطاً فريداً في المتن الإجمالي بعد إزالة التكرار',
    '137 et 596 correspondent aux chevauchements inter-corpus retirés afin qu’une même URL ne soit jamais comptée deux fois.': 'يمثل الرقمان 137 و596 حالات التداخل بين المتون التي أزيلت حتى لا يحتسب الرابط نفسه مرتين.'
  });

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
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const text = translations[lang][el.dataset.i18nAria];
      if (text) el.setAttribute('aria-label', text);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const text = translations[lang][el.dataset.i18nTitle];
      if (text) el.setAttribute('title', text);
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      const isActive = button.dataset.language === lang;
      button.classList.toggle('active', isActive);
      if (button.getAttribute('role') === 'menuitemradio') button.setAttribute('aria-checked', String(isActive));
    });
    const flag = document.getElementById('globe-flag');
    if (flag) flag.textContent = FLAGS[lang] || FLAGS.fr;
    const menu = document.getElementById('globe-menu');
    if (menu) menu.setAttribute('aria-label', translations[lang].langMenu);
    localStorage.setItem('buildfluence-language', lang);
    window.dispatchEvent(new CustomEvent('buildfluence-language', { detail: { lang } }));
  }

  function applyTheme(theme) {
    if (!['light','dark'].includes(theme)) theme = 'light';
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.classList.toggle('active', button.dataset.themeChoice === theme));
    localStorage.setItem('buildfluence-theme', theme);
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }

  function currentLanguage() {
    return document.documentElement.lang || localStorage.getItem('buildfluence-language') || 'fr';
  }

  function setupGlobe() {
    const button = document.getElementById('globe-btn');
    const menu = document.getElementById('globe-menu');
    if (!button || !menu) return;
    const items = [...menu.querySelectorAll('[data-language]')];

    const open = (focusIndex = 0) => {
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      items[focusIndex]?.focus();
    };
    const close = (giveFocus = true) => {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (giveFocus) button.focus();
    };

    button.addEventListener('click', () => (menu.hidden ? open() : close()));
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        open(event.key === 'ArrowDown' ? 0 : items.length - 1);
      }
    });
    items.forEach((item, index) => {
      item.addEventListener('click', () => { applyLanguage(item.dataset.language); close(); });
      item.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown') { event.preventDefault(); items[(index + 1) % items.length].focus(); }
        else if (event.key === 'ArrowUp') { event.preventDefault(); items[(index - 1 + items.length) % items.length].focus(); }
        else if (event.key === 'Escape') { event.preventDefault(); close(); }
        else if (event.key === 'Tab') close(false);
      });
    });
    document.addEventListener('click', event => {
      if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) close(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) close();
    });
  }

  const BRIDGE = [
    ['data-report-preview', 'ip-report-preview-request'],
    ['data-report-download', 'ip-report-download-request'],
    ['data-analysis-updates', 'ip-analysis-updates-request'],
    ['data-platform-contact', 'ip-platform-contact-request']
  ];

  function setupParentBridge() {
    document.addEventListener('click', event => {
      for (const [attr, type] of BRIDGE) {
        const trigger = event.target.closest('[' + attr + ']');
        if (!trigger) continue;
        event.preventDefault();
        const payload = {
          type,
          lang: currentLanguage(),
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
        };
        if (window.parent && window.parent !== window) {
          window.parent.postMessage(payload, window.location.origin);
        } else {
          window.open('/insights-resources/intelligence-politique?report=analyse-strategique-globale-2026-08-05', '_self');
        }
        return;
      }
    });
  }

  addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
    setupGlobe();
    setupParentBridge();

    const params = new URLSearchParams(window.location.search);
    const requested = params.get('lang');
    applyTheme(localStorage.getItem('buildfluence-theme') || 'light');
    applyLanguage(translations[requested] ? requested : (localStorage.getItem('buildfluence-language') || 'fr'));
  });

})();
