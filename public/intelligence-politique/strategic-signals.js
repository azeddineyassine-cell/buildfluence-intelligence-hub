(() => {
  const root = document.getElementById('signals');
  const canonical = window.canonicalMonitoringData;
  if (!root || !canonical) return;

  const parties = canonical.politicalParties;
  const leaders = canonical.leaders;
  const topics = canonical.topics;
  const actors = [...parties, ...leaders];
  const edges = canonical.graph.edges;
  const toneNodeNames = { positive: 'Positive', neutral: 'Neutre', negative: 'Négative' };
  const nodeKind = { parti: 'party', acteur: 'leader', theme: 'topic' };
  const toneKind = name => name === 'Positive' ? 'positive' : name === 'Neutre' ? 'neutral' : 'negative';
  const state = { active: new Set(['party','leader','topic','positive','neutral','negative']), tab: 'galaxy', selected: 'RNI', orbitActor: 'RNI', orbitRelation: null };

  const copy = {
    fr: { kicker:'SIGNALS AT A GLANCE', title:'STRATEGIC <em>SIGNALS</em>', sub:'Une galaxie décisionnelle des positions, tensions et connexions politiques', galaxy:'Galaxie décisionnelle', footprint:'Influence narrative', orbits:'Orbites thématiques', filters:'Filtres', parties:'Partis', leaders:'Leaders', topics:'Sujets', positive:'Positif', neutral:'Neutre', negative:'Négatif', frame:'CADRE D’ANALYSE', visibility:'Visibilité relative', urls:'URL uniques', balance:'Balance narrative', mainTopic:'Sujet principal', relations:'Relations thématiques', reading:'Lecture décisionnelle', method:'Calculs fondés sur des URL uniques dédupliquées. Balance = (positif − négatif) ÷ total. Cette lecture ne mesure ni popularité ni intention de vote.', positionTitle:'Matrice d’influence narrative', positionIntro:'Trois territoires de tonalité positionnent chaque acteur et sujet selon sa balance narrative et sa visibilité relative.', xAxis:'Balance narrative : négative ← 0 → positive', yAxis:'Visibilité relative /100', orbitTitle:'Orbites thématiques', orbitIntro:'Sélectionnez un parti ou un leader. Chaque sujet gravite selon son poids relationnel documenté.', orbitHint:'Cliquez sur une orbite pour analyser cette relation dans le panneau de droite.', actor:'Acteur observé', partySelect:'PARTIS POLITIQUES', leaderSelect:'LEADERS POLITIQUES', period:'29.07 au 05.08.2026', noData:'Aucune entité active pour ces filtres.', relation:'RELATION SÉLECTIONNÉE', exposure:'de l’exposition thématique documentée', actorTopic:'relation acteur-sujet', globalTone:'Le total consolidé couvre le corpus du graphe. Le total sujet couvre uniquement le corpus Opinion citoyenne.', partyKind:'Parti politique', leaderKind:'Leader politique', topicKind:'Sujet du débat', impactKind:'Impact réputationnel' },
    en: { kicker:'SIGNALS AT A GLANCE', title:'STRATEGIC <em>SIGNALS</em>', sub:'A decision galaxy of political positions, tensions and connections', galaxy:'Decision galaxy', footprint:'Narrative influence', orbits:'Thematic orbits', filters:'Filters', parties:'Parties', leaders:'Leaders', topics:'Issues', positive:'Positive', neutral:'Neutral', negative:'Negative', frame:'ANALYSIS FRAME', visibility:'Relative visibility', urls:'Unique URLs', balance:'Narrative balance', mainTopic:'Main issue', relations:'Thematic links', reading:'Decision reading', method:'Calculations use deduplicated unique URLs. Balance = (positive − negative) ÷ total. This reading measures neither popularity nor voting intention.', positionTitle:'Narrative influence matrix', positionIntro:'Three tone territories position each actor and issue by narrative balance and relative visibility.', xAxis:'Narrative balance: negative ← 0 → positive', yAxis:'Relative visibility /100', orbitTitle:'Thematic orbits', orbitIntro:'Select a party or a leader. Each issue orbits according to its documented relational weight.', orbitHint:'Select an orbit to analyse the relationship in the right-hand panel.', actor:'Observed actor', partySelect:'POLITICAL PARTIES', leaderSelect:'POLITICAL LEADERS', period:'29 Jul to 5 Aug 2026', noData:'No active entity for these filters.', relation:'SELECTED RELATIONSHIP', exposure:'of documented thematic exposure', actorTopic:'actor-issue relationship', globalTone:'The consolidated total covers the graph corpus. The issue total covers only the Citizen Opinion corpus.', partyKind:'Political party', leaderKind:'Political leader', topicKind:'Debate issue', impactKind:'Reputational impact' },
    ar: { kicker:'إشارات في لمحة', title:'<em>الإشارات</em> الاستراتيجية', sub:'مجرة قرار للمواقف والتوترات والروابط السياسية', galaxy:'مجرة القرار', footprint:'التأثير السردي', orbits:'المدارات الموضوعاتية', filters:'المرشحات', parties:'الأحزاب', leaders:'القادة', topics:'المواضيع', positive:'إيجابي', neutral:'محايد', negative:'سلبي', frame:'إطار التحليل', visibility:'الظهور النسبي', urls:'روابط فريدة', balance:'التوازن السردي', mainTopic:'الموضوع الرئيسي', relations:'الروابط الموضوعاتية', reading:'قراءة قرارية', method:'تستند الحسابات إلى روابط فريدة بعد إزالة التكرار. التوازن = (الإيجابي − السلبي) ÷ الإجمالي. لا تقيس هذه القراءة الشعبية ولا نية التصويت.', positionTitle:'مصفوفة التأثير السردي', positionIntro:'توزع ثلاثة مجالات للنبرة كل فاعل وموضوع حسب التوازن السردي والظهور النسبي.', xAxis:'التوازن السردي: سلبي ← 0 → إيجابي', yAxis:'الظهور النسبي /100', orbitTitle:'المدارات الموضوعاتية', orbitIntro:'اختر حزبا أو قائدا. يدور كل موضوع بحسب وزنه العلائقي الموثق.', orbitHint:'اضغط على مدار لتحليل العلاقة في اللوحة اليمنى.', actor:'الفاعل المرصود', partySelect:'الأحزاب السياسية', leaderSelect:'القادة السياسيون', period:'29 يوليو إلى 5 أغسطس 2026', noData:'لا يوجد كيان نشط وفق هذه المرشحات.', relation:'العلاقة المختارة', exposure:'من التعرض الموضوعاتي الموثق', actorTopic:'علاقة فاعل بموضوع', globalTone:'يغطي الإجمالي الموحد corpus الرسم، بينما يغطي إجمالي المواضيع corpus الرأي المواطن فقط.', partyKind:'حزب سياسي', leaderKind:'قائد سياسي', topicKind:'موضوع النقاش', impactKind:'الأثر على السمعة' }
  };
  const extraCopy = {
    fr: { matrixIntro:'Quatre quadrants analytiques positionnent chaque entité selon sa balance narrative (axe horizontal) et sa visibilité relative (axe vertical). La taille du marqueur code uniquement le volume d’URL uniques.', xAxisNew:'BALANCE NARRATIVE  −100 → +100', yAxisNew:'VISIBILITÉ RELATIVE  0 → 100', q1:'PORTEURS', q2:'SOUS TENSION', q3:'RISQUES LATENTS', q4:'SIGNAUX ÉMERGENTS', q1Def:'Forte visibilité, balance positive', q2Def:'Forte visibilité, balance négative', q3Def:'Faible visibilité, balance négative', q4Def:'Faible visibilité, balance positive', threshold:'Seuil de séparation : visibilité 50 / 100 et balance 0.', legend:'LÉGENDE', legShapes:'Forme = catégorie : carré parti · cercle leader · losange sujet · barre tonalité', legSize:'Taille = URL uniques (4 paliers)', ranking:'CLASSEMENT', sortBy:'TRI', sortVis:'Visibilité', sortBal:'Balance', sortUrls:'URL uniques', colEntity:'Entité', colCategory:'Catégorie', colQuadrant:'Quadrant', resetFilters:'Réactiver tous les filtres', graphView:'GRAPHE', tableView:'TABLEAU', recenter:'Recentrer', zoomIn:'Zoom avant', zoomOut:'Zoom arrière', resetView:'Réinitialiser', orbitLegendTitle:'LECTURE DU GRAPHE', orbitLegend:'Noyau = acteur observé. Rayon d’orbite = rang de force de la relation documentée. Épaisseur du lien = poids de relation. Taille du nœud = URL uniques du sujet. L’angle n’est pas signifiant.', ring1:'ORBITE 1 · RELATIONS FORTES', ring2:'ORBITE 2 · RELATIONS MOYENNES', ring3:'ORBITE 3 · RELATIONS FAIBLES', colTopic:'Sujet', colWeight:'Poids', colShare:'Exposition', colTone:'Ton dominant', loading:'Chargement des données canoniques…', unavailable:'Non disponible', keyboardHint:'Utilisez Tab pour parcourir les entités, les flèches pour naviguer dans le quadrant, Entrée pour sélectionner.', synced:'Sélection synchronisée avec les orbites thématiques.' },
    en: { matrixIntro:'Four analytical quadrants position each entity by narrative balance (horizontal axis) and relative visibility (vertical axis). Marker size encodes unique URL volume only.', xAxisNew:'NARRATIVE BALANCE  −100 → +100', yAxisNew:'RELATIVE VISIBILITY  0 → 100', q1:'CARRIERS', q2:'UNDER TENSION', q3:'LATENT RISKS', q4:'EMERGING SIGNALS', q1Def:'High visibility, positive balance', q2Def:'High visibility, negative balance', q3Def:'Low visibility, negative balance', q4Def:'Low visibility, positive balance', threshold:'Split thresholds: visibility 50 / 100 and balance 0.', legend:'LEGEND', legShapes:'Shape = category: square party · circle leader · diamond issue · bar tone', legSize:'Size = unique URLs (4 tiers)', ranking:'RANKING', sortBy:'SORT', sortVis:'Visibility', sortBal:'Balance', sortUrls:'Unique URLs', colEntity:'Entity', colCategory:'Category', colQuadrant:'Quadrant', resetFilters:'Re-enable all filters', graphView:'GRAPH', tableView:'TABLE', recenter:'Recenter', zoomIn:'Zoom in', zoomOut:'Zoom out', resetView:'Reset', orbitLegendTitle:'HOW TO READ', orbitLegend:'Core = observed actor. Orbit radius = strength rank of the documented relationship. Link thickness = relationship weight. Node size = issue unique URLs. Angle carries no meaning.', ring1:'ORBIT 1 · STRONG LINKS', ring2:'ORBIT 2 · MEDIUM LINKS', ring3:'ORBIT 3 · WEAK LINKS', colTopic:'Issue', colWeight:'Weight', colShare:'Exposure', colTone:'Dominant tone', loading:'Loading canonical data…', unavailable:'Not available', keyboardHint:'Use Tab to move across entities, arrow keys within a quadrant, Enter to select.', synced:'Selection synchronised with thematic orbits.' },
    ar: { matrixIntro:'تحدد أربعة أرباع تحليلية موقع كل كيان حسب التوازن السردي (المحور الأفقي) والظهور النسبي (المحور العمودي). يعبر حجم العلامة عن حجم الروابط الفريدة فقط.', xAxisNew:'التوازن السردي  −100 → +100', yAxisNew:'الظهور النسبي  0 → 100', q1:'حاملو السرد', q2:'تحت الضغط', q3:'مخاطر كامنة', q4:'إشارات ناشئة', q1Def:'ظهور مرتفع وتوازن إيجابي', q2Def:'ظهور مرتفع وتوازن سلبي', q3Def:'ظهور منخفض وتوازن سلبي', q4Def:'ظهور منخفض وتوازن إيجابي', threshold:'حدود الفصل: الظهور 50 / 100 والتوازن 0.', legend:'المفتاح', legShapes:'الشكل = الفئة: مربع حزب · دائرة قائد · معين موضوع · شريط نبرة', legSize:'الحجم = الروابط الفريدة (أربع درجات)', ranking:'الترتيب', sortBy:'الترتيب حسب', sortVis:'الظهور', sortBal:'التوازن', sortUrls:'روابط فريدة', colEntity:'الكيان', colCategory:'الفئة', colQuadrant:'الربع', resetFilters:'إعادة تنشيط جميع المرشحات', graphView:'الرسم', tableView:'الجدول', recenter:'إعادة التمركز', zoomIn:'تكبير', zoomOut:'تصغير', resetView:'إعادة التعيين', orbitLegendTitle:'كيفية القراءة', orbitLegend:'النواة = الفاعل المرصود. نصف قطر المدار = رتبة قوة العلاقة الموثقة. سماكة الرابط = وزن العلاقة. حجم العقدة = الروابط الفريدة للموضوع. الزاوية غير دالة.', ring1:'المدار 1 · روابط قوية', ring2:'المدار 2 · روابط متوسطة', ring3:'المدار 3 · روابط ضعيفة', colTopic:'الموضوع', colWeight:'الوزن', colShare:'التعرض', colTone:'النبرة السائدة', loading:'جار تحميل البيانات المرجعية…', unavailable:'غير متوفر', keyboardHint:'استخدم Tab للتنقل بين الكيانات، والأسهم داخل الربع، وEnter للاختيار.', synced:'تم مزامنة الاختيار مع المدارات الموضوعاتية.' }
  };
  Object.keys(copy).forEach(k => Object.assign(copy[k], extraCopy[k]));
  const localizedTopics = {
    en:{'Sebta / migration':'Ceuta / migration','Emploi / chômage':'Employment / unemployment','Eau / sécheresse':'Water / drought','Santé':'Health','Éducation':'Education'},
    ar:{'Sebta / migration':'سبتة / الهجرة','Emploi / chômage':'التشغيل / البطالة','Eau / sécheresse':'الماء / الجفاف','Santé':'الصحة','Éducation':'التعليم','Justice':'العدالة','Corruption':'الفساد'}
  };
  const lang = () => ['fr','en','ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
  const t = key => copy[lang()][key];
  const label = name => localizedTopics[lang()]?.[name] || name;
  const locale = () => lang()==='ar' ? 'ar-MA' : lang()==='en' ? 'en-GB' : 'fr-FR';
  const fmt = (n, digits=0) => Number(n || 0).toLocaleString(locale(), { maximumFractionDigits:digits });
  const relationSentence = (value,name) => lang()==='en' ? `${fmt(value)} documented links with ${label(name)}.` : lang()==='ar' ? `${fmt(value)} روابط موثقة مع ${label(name)}.` : `${fmt(value)} relations documentées avec ${label(name)}.`;
  const initials = name => name === 'Parti de l’Istiqlal' ? 'PI' : name.split(/\s+/).map(x=>x[0]).join('').slice(0,3).toUpperCase();
  const femaleLeaders = new Set(['Fatima Ezzahra El Mansouri']);
  const leaderPortraits = Object.fromEntries(leaders.map(leader=>[leader.name,femaleLeaders.has(leader.name)?'assets/avatar-leader-female.svg':'assets/avatar-leader-male.svg']));
  const topicIcons = {'Sebta / migration':'⇄','Emploi / chômage':'▣','Eau / sécheresse':'◒','Justice':'⚖','Corruption':'◇','Santé':'✚','Éducation':'▤'};
  const rowFor = name => actors.find(x => x.name === name);
  const topicFor = name => topics.find(x => x.name === name);
  const actorTopics = name => topics.map(topic => ({ name:topic.name, value:(edges.find(e=>e[0]===name && e[1]===topic.name && e[3]==='influence') || [])[2] || 0 }));
  const balanceOf = d => { const n=d.tones.positive+d.tones.neutral+d.tones.negative; return n ? (d.tones.positive-d.tones.negative)/n*100 : 0; };

  function infoFor(name) {
    const row = rowFor(name);
    if (row) {
      const rels=actorTopics(row.name), sorted=[...rels].sort((a,b)=>b.value-a.value), links=rels.reduce((s,x)=>s+x.value,0);
      const family=row.actorId.startsWith('party_') ? parties : leaders;
      return { name:row.name, short:initials(row.name), type:'actor', kind:row.actorId.startsWith('party_')?t('partyKind'):t('leaderKind'), urls:row.score, visibility:row.score/Math.max(...family.map(x=>x.score))*100, tones:row.tones, topic:sorted[0]?.name || 'Non disponible', links, facts:[relationSentence(sorted[0]?.value,sorted[0]?.name || ''),relationSentence(sorted[1]?.value,sorted[1]?.name || ''),lang()==='en'?'Observed presence, not voting intention.':lang()==='ar'?'حضور مرصود، وليس نية تصويت.':'Présence observée, pas intention de vote.'] };
    }
    const topic=topicFor(name);
    if (topic) {
      const links=edges.filter(e=>e[1]===topic.name && e[3]==='influence').reduce((s,e)=>s+e[2],0);
      return { name:topic.name, short:initials(topic.name), type:'topic', kind:t('topicKind'), urls:topic.mentions, visibility:topic.mentions/Math.max(...topics.map(x=>x.mentions))*100, tones:topic.tones, topic:topic.name, links, facts:[`${fmt(topic.tones.negative)} ${t('negative').toLowerCase()}.`,`${fmt(topic.tones.neutral)} ${t('neutral').toLowerCase()}.`,`${fmt(topic.tones.positive)} ${t('positive').toLowerCase()}.`] };
    }
    const key=toneKind(name), total=canonical.graph.toneTotals[key], opinion=canonical.toneTotals[key];
    return { name, short:key==='positive'?'+':key==='neutral'?'=':'−', type:'tone', kind:t('impactKind'), urls:total, visibility:total/Math.max(...Object.values(canonical.graph.toneTotals))*100, tones:{positive:key==='positive'?total:0,neutral:key==='neutral'?total:0,negative:key==='negative'?total:0}, topic:name, links:edges.filter(e=>e[1]===name).length, facts:[lang()==='en'?`${fmt(total)} URLs in the consolidated graph.`:lang()==='ar'?`${fmt(total)} رابطا في الرسم الموحد.`:`${fmt(total)} URL dans le graphe consolidé.`,lang()==='en'?`${fmt(opinion)} URLs linked to Citizen Opinion issues.`:lang()==='ar'?`${fmt(opinion)} رابطا مرتبطا بمواضيع الرأي المواطن.`:`${fmt(opinion)} URL liées aux sujets du corpus Opinion citoyenne.`,t('globalTone')] };
  }

  root.innerHTML = `<div class="ss-head"><div><p class="kicker" data-ss="kicker"></p><h1 data-ss-html="title"></h1><p data-ss="sub"></p></div><p class="ss-period"><strong data-ss="period"></strong><span>${fmt(canonical.graph.documents)} URL</span></p></div>
  <div class="ss-tabs"><button class="active" data-ss-tab="galaxy" data-ss="galaxy"></button><button data-ss-tab="positions" data-ss="footprint"></button><button data-ss-tab="orbits" data-ss="orbits"></button></div>
  <div class="ss-filters"><strong data-ss="filters"></strong>${[['party','parties'],['leader','leaders'],['topic','topics'],['positive','positive'],['neutral','neutral'],['negative','negative']].map(x=>`<button class="ss-filter active" data-ss-filter="${x[0]}" data-ss="${x[1]}"></button>`).join('')}</div>
  <div class="ss-layout"><div class="ss-stage"><div class="ss-view active" data-ss-view="galaxy"><svg id="ss-galaxy-svg" viewBox="0 0 920 650" aria-label="Strategic Signals"></svg></div>
  <div class="ss-view" data-ss-view="positions"><div class="ss-positions"><h2 data-ss="positionTitle"></h2><p class="ss-lede" data-ss="matrixIntro"></p>
  <div class="ss-matrix-wrap"><span class="ss-axis-title y" data-ss="yAxisNew"></span>
  <div class="ss-plane" id="ss-plane" role="group" tabindex="-1">
    <div class="ss-quad q2"><span class="ss-quad-tag"><b>Q2</b><em data-ss="q2"></em><small data-ss="q2Def"></small></span></div>
    <div class="ss-quad q1"><span class="ss-quad-tag"><b>Q1</b><em data-ss="q1"></em><small data-ss="q1Def"></small></span></div>
    <div class="ss-quad q3"><span class="ss-quad-tag"><b>Q3</b><em data-ss="q3"></em><small data-ss="q3Def"></small></span></div>
    <div class="ss-quad q4"><span class="ss-quad-tag"><b>Q4</b><em data-ss="q4"></em><small data-ss="q4Def"></small></span></div>
    <i class="ss-mid-x" aria-hidden="true"></i><i class="ss-mid-y" aria-hidden="true"></i>
    <div class="ss-markers" id="ss-markers"></div>
  </div>
  <span class="ss-axis-title x" data-ss="xAxisNew"></span></div>
  <div class="ss-tip" id="ss-tip" role="tooltip" hidden></div>
  <div class="ss-legend"><p class="kicker" data-ss="legend"></p><ul><li><span class="ss-key party" aria-hidden="true"></span><span class="ss-key leader" aria-hidden="true"></span><span class="ss-key topic" aria-hidden="true"></span><span class="ss-key tone" aria-hidden="true"></span><span data-ss="legShapes"></span></li><li id="ss-size-legend"></li><li data-ss="threshold"></li><li data-ss="keyboardHint"></li></ul></div>
  <details class="ss-ranking"><summary><span data-ss="ranking"></span> <b id="ss-rank-count"></b></summary><div class="ss-rank-tools"><label><span data-ss="sortBy"></span><select id="ss-rank-sort"><option value="visibility" data-ss="sortVis"></option><option value="balance" data-ss="sortBal"></option><option value="urls" data-ss="sortUrls"></option></select></label></div><div class="ss-table-scroll"><table class="ss-table" id="ss-rank-table"></table></div></details></div></div>
  <div class="ss-view" data-ss-view="orbits"><div class="ss-orbits"><div class="ss-orbits-head"><div><h2 data-ss="orbitTitle"></h2><p class="ss-lede" data-ss="orbitIntro"></p></div><div class="ss-actor-pickers"><label class="ss-actor-select ss-party-select"><span data-ss="partySelect"></span><select id="ss-party-pick"></select></label><label class="ss-actor-select ss-leader-select"><span data-ss="leaderSelect"></span><select id="ss-leader-pick"></select></label></div></div>
  <div class="ss-orbit-bar"><div class="ss-seg" role="tablist"><button class="active" data-orbit-mode="graph" data-ss="graphView"></button><button data-orbit-mode="table" data-ss="tableView"></button></div>
  <div class="ss-orbit-controls"><button data-orbit-cmd="in" aria-label="+"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg><span data-ss="zoomIn"></span></button><button data-orbit-cmd="out" aria-label="−"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3M8 11h6"/></svg><span data-ss="zoomOut"></span></button><button data-orbit-cmd="center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg><span data-ss="recenter"></span></button><button data-orbit-cmd="reset"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg><span data-ss="resetView"></span></button></div></div>
  <div class="ss-orbit-panes"><div class="ss-orbit-pane active" data-orbit-pane="graph"><svg class="ss-topic-orbit" id="ss-topic-orbit" viewBox="0 0 820 470" role="group"></svg></div>
  <div class="ss-orbit-pane" data-orbit-pane="table"><div class="ss-table-scroll"><table class="ss-table" id="ss-orbit-table"></table></div></div></div>
  <div class="ss-legend"><p class="kicker" data-ss="orbitLegendTitle"></p><ul><li data-ss="orbitLegend"></li><li data-ss="orbitHint"></li></ul></div></div></div></div>
  <aside class="ss-analysis"><p class="kicker" data-ss="frame"></p><div class="ss-identity"><div class="ss-avatar" id="ss-avatar"></div><div><h2 id="ss-name"></h2><p class="ss-kind" id="ss-kind"></p></div></div>
  ${[['visibility','ss-vis'],['urls','ss-urls'],['balance','ss-balance'],['mainTopic','ss-main-topic'],['relations','ss-relations']].map(x=>`<div class="ss-metric"><span data-ss="${x[0]}"></span><b id="${x[1]}"></b></div>`).join('')}
  <div class="ss-tonebar"><i id="ss-pos"></i><i id="ss-neu"></i><i id="ss-neg"></i></div><div class="ss-tone-labels"><span id="ss-pl"></span><span id="ss-nl"></span><span id="ss-gl"></span></div>
  <div class="ss-relation-detail" id="ss-relation-detail" hidden><p class="kicker" data-ss="relation"></p><div><strong id="ss-relation-title"></strong><b id="ss-relation-value"></b></div><p id="ss-relation-copy"></p></div>
  <div class="ss-reading"><h3 data-ss="reading"></h3><p id="ss-insight"></p><ul><li id="ss-fact-1"></li><li id="ss-fact-2"></li><li id="ss-fact-3"></li></ul></div><p class="ss-method" data-ss="method"></p></aside></div>`;

  const graphNodes = canonical.graph.nodes.map(n => ({...n, kind:n.group==='public'?toneKind(n.name):nodeKind[n.group]}));
  const graphEdges = edges.map(e => ({ a:e[0], b:e[1], value:e[2], kind:e[3]==='influence'?'topic':e[3]==='alliance'?(toneKind(e[1])==='positive'?'positive':'topic'):e[3]==='proximite'?'neutral':'negative' }));
  const positionSector = (items, radius, start, end, cx=430, cy=325) => items.map((n,i) => { const a=(start+(end-start)*(items.length===1?.5:i/(items.length-1)))*Math.PI/180; return {...n,x:cx+radius*Math.cos(a),y:cy+radius*Math.sin(a)}; });
  const galaxyNodes = [
    ...positionSector(graphNodes.filter(n=>n.kind==='party'),285,120,240),
    ...positionSector(graphNodes.filter(n=>n.kind==='leader'),205,115,245),
    ...positionSector(graphNodes.filter(n=>n.kind==='topic'),170,-62,62),
    ...positionSector(graphNodes.filter(n=>['positive','neutral','negative'].includes(n.kind)),305,-46,46)
  ];
  const byName = Object.fromEntries(galaxyNodes.map(n=>[n.name,n]));
  const galaxy = root.querySelector('#ss-galaxy-svg');

  function renderGalaxy() {
    const visible=n=>state.active.has(n.kind);
    galaxy.innerHTML=`<circle cx="430" cy="325" r="285" class="ss-orbit"/><circle cx="430" cy="325" r="205" class="ss-orbit"/><circle cx="430" cy="325" r="120" class="ss-orbit"/><text x="430" y="318" text-anchor="middle" class="ss-galaxy-title">STRATEGIC SIGNALS</text><text x="430" y="338" text-anchor="middle" class="ss-galaxy-sub">${fmt(canonical.graph.documents)} URL</text>`+
      graphEdges.filter(e=>byName[e.a]&&byName[e.b]&&visible(byName[e.a])&&visible(byName[e.b])).map(e=>`<path class="ss-ray ${e.kind}" data-a="${e.a}" data-b="${e.b}" d="M${byName[e.a].x},${byName[e.a].y} Q430,325 ${byName[e.b].x},${byName[e.b].y}" style="--w:${Math.min(4,1+Math.sqrt(e.value)/14)}"/>`).join('')+
      galaxyNodes.filter(visible).map(n=>{const d=infoFor(n.name),r=n.kind==='topic'?19+Math.sqrt(n.mentions)/5:n.kind==='party'||n.kind==='leader'?16+Math.sqrt(n.mentions):27,content=n.kind==='leader'?`<image href="${leaderPortraits[n.name]}" x="${-r}" y="${-r}" width="${r*2}" height="${r*2}" preserveAspectRatio="xMidYMid slice" clip-path="circle(${r-2}px at center)"/><text class="num leader-num" text-anchor="middle" y="${r+12}">${fmt(d.urls)}</text>`:`<text text-anchor="middle" y="-2">${d.short}</text><text class="num" text-anchor="middle" y="12">${fmt(d.urls)}</text>`;return `<g class="ss-star ${n.kind}" data-name="${n.name}" transform="translate(${n.x} ${n.y})"><circle class="halo" r="${r+7}"/><circle class="core" r="${r}"/>${content}<text class="ss-node-label" text-anchor="middle" y="${r+24}">${label(n.name)}</text></g>`}).join('');
    galaxy.querySelectorAll('.ss-star').forEach(n=>n.addEventListener('click',()=>select(n.dataset.name)));
    highlightGalaxy();
  }

  function highlightGalaxy() {
    const name=state.selected;
    galaxy.querySelectorAll('.ss-star').forEach(n=>{const near=n.dataset.name===name||graphEdges.some(e=>(e.a===name&&e.b===n.dataset.name)||(e.b===name&&e.a===n.dataset.name));n.classList.toggle('dim',!near);n.classList.toggle('hot',n.dataset.name===name);});
    galaxy.querySelectorAll('.ss-ray').forEach(e=>{const hot=e.dataset.a===name||e.dataset.b===name;e.classList.toggle('hot',hot);e.classList.toggle('dim',!hot);});
  }

  function select(name, relation=null) {
    state.selected=name; state.orbitRelation=relation;
    const d=infoFor(name), total=d.tones.positive+d.tones.neutral+d.tones.negative, balance=balanceOf(d);
    const avatar=root.querySelector('#ss-avatar'),leaderImage=leaderPortraits[d.name];avatar.innerHTML=leaderImage?`<img src="${leaderImage}" alt="" aria-hidden="true">`:d.short; root.querySelector('#ss-name').textContent=label(d.name); root.querySelector('#ss-kind').textContent=d.kind;
    root.querySelector('#ss-vis').textContent=`${fmt(d.visibility,1)} / 100`; root.querySelector('#ss-urls').textContent=fmt(d.urls); root.querySelector('#ss-balance').textContent=`${balance>0?'+':''}${fmt(balance,1)}`; root.querySelector('#ss-main-topic').textContent=label(d.topic); root.querySelector('#ss-relations').textContent=fmt(d.links);
    [['pos','positive','pl','+ '],['neu','neutral','nl','= '],['neg','negative','gl','− ']].forEach(([id,key,lid,prefix])=>{const pct=total?d.tones[key]/total*100:0;const on=state.active.has(key);root.querySelector('#ss-'+id).style.width=on?pct+'%':'0';root.querySelector('#ss-'+lid).textContent=on?prefix+fmt(pct,1)+'%':'';});
    const facts=relation ? [`${fmt(relation.value)} relations acteur-sujet documentées.`,`${fmt(relation.share,1)}% ${t('exposure')}.`,lang()==='en'?'This is an observed co-occurrence, not causality.':lang()==='ar'?'هذا تزامن مرصود وليس علاقة سببية.':'Il s’agit d’une cooccurrence observée, pas d’un lien de causalité.'] : d.facts;
    root.querySelector('#ss-insight').textContent=relation ? `${label(name)} × ${label(relation.name)}` : d.type==='tone' ? t('globalTone') : d.type==='topic' ? `${label(d.name)} : ${t('actorTopic')}.` : `${label(d.topic)} · ${t('actorTopic')}.`; facts.forEach((f,i)=>root.querySelector('#ss-fact-'+(i+1)).textContent=f);
    const detail=root.querySelector('#ss-relation-detail'); detail.hidden=!relation;
    if(relation){root.querySelector('#ss-relation-title').textContent=`${label(name)} × ${label(relation.name)}`;root.querySelector('#ss-relation-value').textContent=fmt(relation.value);root.querySelector('#ss-relation-copy').textContent=`${fmt(relation.share,1)}% ${t('exposure')}.`;}
    highlightGalaxy();
  }

  const quadrantOf = (bal,vis) => vis>=50 ? (bal>=0?'q1':'q2') : (bal>=0?'q4':'q3');
  const matrixRows = () => [
    ...(state.active.has('party') ? parties.map(x=>({name:x.name,kind:'party'})) : []),
    ...(state.active.has('leader') ? leaders.map(x=>({name:x.name,kind:'leader'})) : []),
    ...(state.active.has('topic') ? topics.map(x=>({name:x.name,kind:'topic'})) : []),
    ...Object.entries(toneNodeNames).filter(([k])=>state.active.has(k)).map(([k,name])=>({name,kind:k}))
  ];
  const tipEl = () => root.querySelector('#ss-tip');
  function showTip(target,row){
    const tip=tipEl(), d=row.d, total=d.tones.positive+d.tones.neutral+d.tones.negative;
    const pct=key=>total?fmt(d.tones[key]/total*100,1)+'%':t('unavailable');
    tip.innerHTML=`<strong>${label(d.name)}</strong><em>${d.kind} · ${t(row.quad)}</em>
      <span>${t('urls')}<b>${fmt(d.urls)}</b></span>
      <span>${t('visibility')}<b>${fmt(d.visibility,1)} / 100</b></span>
      <span>${t('balance')}<b>${row.balance>0?'+':''}${fmt(row.balance,1)}</b></span>
      <span>${t('positive')} / ${t('neutral')} / ${t('negative')}<b>${pct('positive')} · ${pct('neutral')} · ${pct('negative')}</b></span>
      <span>${t('mainTopic')}<b>${label(d.topic)}</b></span>
      <span>${t('relations')}<b>${fmt(d.links)}</b></span>
      <small>${t('period')}</small>`;
    tip.hidden=false;
    const plane=root.querySelector('#ss-plane').getBoundingClientRect(), box=target.getBoundingClientRect();
    const left=Math.max(4,Math.min(plane.width-tip.offsetWidth-4,box.left-plane.left+box.width/2-tip.offsetWidth/2));
    const top=box.top-plane.top-tip.offsetHeight-10;
    tip.style.left=left+'px'; tip.style.top=(top<4?box.top-plane.top+box.height+10:top)+'px';
  }
  const hideTip = () => { tipEl().hidden=true; };

  function renderMatrix() {
    const plane=root.querySelector('#ss-plane'), markers=root.querySelector('#ss-markers');
    plane.querySelectorAll('.ss-empty').forEach(x=>x.remove()); markers.innerHTML=''; hideTip();
    const data=matrixRows().map(item=>{const d=infoFor(item.name),balance=balanceOf(d);return {...item,d,balance,vis:d.visibility,urls:d.urls,quad:quadrantOf(balance,d.visibility)};});
    root.querySelector('#ss-rank-count').textContent=fmt(data.length);
    if(!data.length){
      plane.insertAdjacentHTML('beforeend',`<p class="ss-empty">${t('noData')}<button type="button" class="ss-reset-filters">${t('resetFilters')}</button></p>`);
      plane.querySelector('.ss-reset-filters').addEventListener('click',()=>{['party','leader','topic','positive','neutral','negative'].forEach(k=>state.active.add(k));root.querySelectorAll('[data-ss-filter]').forEach(b=>b.classList.add('active'));applyFilters();});
      renderRanking([]); return;
    }
    const values=data.map(x=>x.urls).sort((a,b)=>a-b), q=p=>values[Math.min(values.length-1,Math.floor(p*values.length))];
    const b1=q(.25),b2=q(.5),b3=q(.75), tier=u=>u<=b1?1:u<=b2?2:u<=b3?3:4;
    root.querySelector('#ss-size-legend').textContent=`${t('legSize')} : ≤ ${fmt(b1)} · ≤ ${fmt(b2)} · ≤ ${fmt(b3)} · > ${fmt(b3)}`;
    data.sort((a,b)=>b.vis-a.vis);
    data.forEach(row=>{
      const btn=document.createElement('button');
      btn.type='button'; btn.className=`ss-mk ${row.kind} t${tier(row.urls)}${row.d.name===state.selected?' selected':''}`;
      btn.dataset.name=row.d.name; btn.dataset.quad=row.quad;
      btn.style.left=((row.balance+100)/2)+'%'; btn.style.bottom=Math.max(0,Math.min(100,row.vis))+'%';
      btn.innerHTML=`<i class="ss-mk-shape" aria-hidden="true"></i><span class="ss-mk-label">${label(row.d.name)}<small>${fmt(row.urls)}</small></span>`;
      btn.setAttribute('aria-label',`${label(row.d.name)} · ${row.d.kind} · ${t('urls')} ${fmt(row.urls)} · ${t('visibility')} ${fmt(row.vis,1)} · ${t('balance')} ${fmt(row.balance,1)}`);
      btn.addEventListener('mouseenter',()=>showTip(btn,row));
      btn.addEventListener('focus',()=>showTip(btn,row));
      btn.addEventListener('mouseleave',hideTip);
      btn.addEventListener('blur',hideTip);
      btn.addEventListener('click',()=>select(row.d.name));
      btn.addEventListener('keydown',e=>{
        if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
        e.preventDefault();
        const peers=[...markers.querySelectorAll(`.ss-mk[data-quad="${row.quad}"]`)];
        const step=(e.key==='ArrowRight'||e.key==='ArrowDown')?1:-1;
        const next=peers[(peers.indexOf(btn)+step+peers.length)%peers.length];
        if(next)next.focus();
      });
      markers.appendChild(btn);
    });
    renderRanking(data);
  }

  function renderRanking(data) {
    const table=root.querySelector('#ss-rank-table'), sort=state.rankSort;
    if(!data.length){table.innerHTML='';return;}
    const rows=[...data].sort((a,b)=>sort==='balance'?b.balance-a.balance:sort==='urls'?b.urls-a.urls:b.vis-a.vis);
    table.innerHTML=`<thead><tr><th>#</th><th>${t('colEntity')}</th><th>${t('colCategory')}</th><th>${t('colQuadrant')}</th><th>${t('visibility')}</th><th>${t('balance')}</th><th>${t('urls')}</th></tr></thead><tbody>`+
      rows.map((r,i)=>`<tr data-name="${r.d.name}" tabindex="0" class="${r.d.name===state.selected?'selected':''}"><td>${i+1}</td><td>${label(r.d.name)}</td><td>${r.d.kind}</td><td>${t(r.quad)}</td><td>${fmt(r.vis,1)}</td><td>${r.balance>0?'+':''}${fmt(r.balance,1)}</td><td>${fmt(r.urls)}</td></tr>`).join('')+`</tbody>`;
    table.querySelectorAll('tbody tr').forEach(tr=>{
      tr.addEventListener('click',()=>select(tr.dataset.name));
      tr.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(tr.dataset.name);}});
    });
  }

  function eligibleActors(){return actors.filter(x=>state.active.has(x.actorId.startsWith('party_')?'party':'leader'));}
  function renderActorPicker(){const partyEl=root.querySelector('#ss-party-pick'),leaderEl=root.querySelector('#ss-leader-pick'),eligible=eligibleActors(),visibleParties=parties.filter(x=>eligible.includes(x)),visibleLeaders=leaders.filter(x=>eligible.includes(x));if(!eligible.some(x=>x.name===state.orbitActor))state.orbitActor=eligible[0]?.name||'';partyEl.innerHTML=`<option value="">${t('partySelect')}</option>`+visibleParties.map(x=>`<option value="${x.name}" ${x.name===state.orbitActor?'selected':''}>${x.name}</option>`).join('');leaderEl.innerHTML=`<option value="">${t('leaderSelect')}</option>`+visibleLeaders.map(x=>`<option value="${x.name}" ${x.name===state.orbitActor?'selected':''}>${x.name}</option>`).join('');partyEl.disabled=!visibleParties.length;leaderEl.disabled=!visibleLeaders.length;root.querySelector('.ss-party-select').classList.toggle('disabled',!visibleParties.length);root.querySelector('.ss-leader-select').classList.toggle('disabled',!visibleLeaders.length);}
  function renderOrbits(actor=state.orbitActor) {
    renderActorPicker(); actor=state.orbitActor;
    const svg=root.querySelector('#ss-topic-orbit');
    if(!actor){svg.innerHTML=`<text class="ss-empty-svg" x="410" y="235" text-anchor="middle">${t('noData')}</text>`;return;}
    const visibleTopics=state.active.has('topic')?actorTopics(actor):[], max=Math.max(...visibleTopics.map(x=>x.value),1), sum=visibleTopics.reduce((s,x)=>s+x.value,0), cx=410,cy=235,rx=300,ry=150;
    if(!visibleTopics.length){svg.innerHTML=`<circle class="ss-topic-core" cx="410" cy="235" r="48"/><text x="410" y="240" text-anchor="middle">${infoFor(actor).short}</text><text class="ss-empty-svg" x="410" y="330" text-anchor="middle">${t('noData')}</text>`;select(actor);return;}
    svg.innerHTML=`<ellipse class="ss-topic-ring" cx="410" cy="235" rx="300" ry="150"/><ellipse class="ss-topic-ring" cx="410" cy="235" rx="190" ry="92"/><circle class="ss-topic-halo" cx="410" cy="235" r="65"/><circle class="ss-topic-core" cx="410" cy="235" r="48"/><text x="410" y="229" text-anchor="middle">${infoFor(actor).short}</text><text x="410" y="249" text-anchor="middle" fill="#c9a84c">${fmt(sum)} relations</text><text class="ss-topic-caption" x="410" y="455" text-anchor="middle">${t('orbitHint')}</text>`+visibleTopics.map((rel,i)=>{const a=(-90+i*360/visibleTopics.length)*Math.PI/180,x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a),share=sum?rel.value/sum*100:0,r=18+rel.value/max*19;return `<line class="ss-topic-spoke" data-index="${i}" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/><g class="ss-topic-node" data-index="${i}" transform="translate(${x} ${y})"><circle class="petal" r="${r}"/><text class="value" text-anchor="middle" y="-2">${fmt(rel.value)}</text><text class="share" text-anchor="middle" y="14">${fmt(share,1)}%</text><text text-anchor="middle" y="${r+17}">${label(rel.name)}</text></g>`}).join('');
    const choose=i=>{const rel=visibleTopics[i],share=sum?rel.value/sum*100:0;svg.querySelectorAll('[data-index]').forEach(x=>x.classList.toggle('hot',+x.dataset.index===i));select(actor,{...rel,share});};
    svg.querySelectorAll('.ss-topic-node').forEach(n=>n.addEventListener('click',()=>choose(+n.dataset.index)));
    choose(Math.max(0,visibleTopics.findIndex(x=>x.value===max)));
  }

  function applyFilters(){renderGalaxy();renderPlane();renderActorPicker();if(state.tab==='orbits')renderOrbits();const current=graphNodes.find(n=>n.name===state.selected);if(current&&!state.active.has(current.kind)){const next=galaxyNodes.find(n=>state.active.has(n.kind));if(next)select(next.name);}}
  ['#ss-party-pick','#ss-leader-pick'].forEach(selector=>root.querySelector(selector).addEventListener('change',e=>{if(!e.target.value)return;state.orbitActor=e.target.value;renderOrbits();}));
  root.querySelectorAll('[data-ss-tab]').forEach(b=>b.addEventListener('click',()=>{state.tab=b.dataset.ssTab;root.querySelectorAll('[data-ss-tab]').forEach(x=>x.classList.toggle('active',x===b));root.querySelectorAll('[data-ss-view]').forEach(x=>x.classList.toggle('active',x.dataset.ssView===state.tab));root.querySelector('#ss-relation-detail').hidden=state.tab!=='orbits'||!state.orbitRelation;if(state.tab==='positions')renderPlane();if(state.tab==='orbits')renderOrbits();}));
  root.querySelectorAll('[data-ss-filter]').forEach(b=>b.addEventListener('click',()=>{const kind=b.dataset.ssFilter;state.active.has(kind)?state.active.delete(kind):state.active.add(kind);b.classList.toggle('active',state.active.has(kind));applyFilters();}));
  function translate(){root.querySelectorAll('[data-ss]').forEach(el=>el.textContent=t(el.dataset.ss));root.querySelectorAll('[data-ss-html]').forEach(el=>el.innerHTML=t(el.dataset.ssHtml));renderGalaxy();renderPlane();renderActorPicker();state.tab==='orbits'?renderOrbits():select(state.selected);}
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  translate();
})();
