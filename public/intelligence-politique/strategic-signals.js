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
  const leaderPortraits = {'Aziz Akhannouch':'assets/person-1.png','Nizar Baraka':'assets/person-2.png','Abdellah Benkirane':'assets/person-3.png','Mohamed Nabil Benabdallah':'assets/person-4.png','Fatima Ezzahra El Mansouri':'assets/person-5.png'};
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
  <div class="ss-view" data-ss-view="positions"><div class="ss-positions"><h2 data-ss="positionTitle"></h2><p data-ss="positionIntro"></p><div class="ss-plane" id="ss-plane"><span class="ss-axis x" data-ss="xAxis"></span><span class="ss-axis y" data-ss="yAxis"></span></div></div></div>
  <div class="ss-view" data-ss-view="orbits"><div class="ss-orbits"><div class="ss-orbits-head"><div><h2 data-ss="orbitTitle"></h2><p data-ss="orbitIntro"></p></div><div class="ss-actor-pickers"><label class="ss-actor-select ss-party-select"><span data-ss="partySelect"></span><select id="ss-party-pick"></select></label><label class="ss-actor-select ss-leader-select"><span data-ss="leaderSelect"></span><select id="ss-leader-pick"></select></label></div></div><svg class="ss-topic-orbit" id="ss-topic-orbit" viewBox="0 0 820 470"></svg></div></div></div>
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
      galaxyNodes.filter(visible).map(n=>{const d=infoFor(n.name),r=n.kind==='topic'?19+Math.sqrt(n.mentions)/5:n.kind==='party'||n.kind==='leader'?16+Math.sqrt(n.mentions):27;return `<g class="ss-star ${n.kind}" data-name="${n.name}" transform="translate(${n.x} ${n.y})"><circle class="halo" r="${r+7}"/><circle class="core" r="${r}"/><text text-anchor="middle" y="-2">${d.short}</text><text class="num" text-anchor="middle" y="12">${fmt(d.urls)}</text><text class="ss-node-label" text-anchor="middle" y="${r+16}">${label(n.name)}</text></g>`}).join('');
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
    root.querySelector('#ss-avatar').textContent=d.short; root.querySelector('#ss-name').textContent=label(d.name); root.querySelector('#ss-kind').textContent=d.kind;
    root.querySelector('#ss-vis').textContent=`${fmt(d.visibility,1)} / 100`; root.querySelector('#ss-urls').textContent=fmt(d.urls); root.querySelector('#ss-balance').textContent=`${balance>0?'+':''}${fmt(balance,1)}`; root.querySelector('#ss-main-topic').textContent=label(d.topic); root.querySelector('#ss-relations').textContent=fmt(d.links);
    [['pos','positive','pl','+ '],['neu','neutral','nl','= '],['neg','negative','gl','− ']].forEach(([id,key,lid,prefix])=>{const pct=total?d.tones[key]/total*100:0;const on=state.active.has(key);root.querySelector('#ss-'+id).style.width=on?pct+'%':'0';root.querySelector('#ss-'+lid).textContent=on?prefix+fmt(pct,1)+'%':'';});
    const facts=relation ? [`${fmt(relation.value)} relations acteur-sujet documentées.`,`${fmt(relation.share,1)}% ${t('exposure')}.`,lang()==='en'?'This is an observed co-occurrence, not causality.':lang()==='ar'?'هذا تزامن مرصود وليس علاقة سببية.':'Il s’agit d’une cooccurrence observée, pas d’un lien de causalité.'] : d.facts;
    root.querySelector('#ss-insight').textContent=relation ? `${label(name)} × ${label(relation.name)}` : d.type==='tone' ? t('globalTone') : d.type==='topic' ? `${label(d.name)} : ${t('actorTopic')}.` : `${label(d.topic)} · ${t('actorTopic')}.`; facts.forEach((f,i)=>root.querySelector('#ss-fact-'+(i+1)).textContent=f);
    const detail=root.querySelector('#ss-relation-detail'); detail.hidden=!relation;
    if(relation){root.querySelector('#ss-relation-title').textContent=`${label(name)} × ${label(relation.name)}`;root.querySelector('#ss-relation-value').textContent=fmt(relation.value);root.querySelector('#ss-relation-copy').textContent=`${fmt(relation.share,1)}% ${t('exposure')}.`;}
    highlightGalaxy();
  }

  function renderPlane() {
    const plane=root.querySelector('#ss-plane'); plane.querySelectorAll('.ss-bubble,.ss-empty').forEach(x=>x.remove());
    const rows=[...parties.filter(()=>state.active.has('party')).map(x=>({name:x.name,kind:'party'})),...leaders.filter(()=>state.active.has('leader')).map(x=>({name:x.name,kind:'leader'})),...topics.filter(()=>state.active.has('topic')).map(x=>({name:x.name,kind:'topic'})),...Object.entries(toneNodeNames).filter(([k])=>state.active.has(k)).map(([k,name])=>({name,kind:k}))];
    if(!rows.length){plane.insertAdjacentHTML('beforeend',`<p class="ss-empty">${t('noData')}</p>`);return;}
    const placed=[];
    rows.forEach((item,i)=>{const d=infoFor(item.name),b=balanceOf(d),btn=document.createElement('button');let x=Math.max(6,Math.min(94,50+b/2)),y=Math.max(8,Math.min(90,8+d.visibility*.82)),attempt=0;while(placed.some(p=>Math.abs(p.x-x)<13&&Math.abs(p.y-y)<9)&&attempt<30){const ring=Math.floor(attempt/4)+1;x=Math.max(6,Math.min(94,x+([1,-1,1,-1][attempt%4])*ring*4.5));y=Math.max(8,Math.min(90,y+([1,1,-1,-1][attempt%4])*ring*4.5));attempt++;}placed.push({x,y});btn.className=`ss-bubble ${item.kind}`;btn.style.left=x+'%';btn.style.bottom=y+'%';let visual='';if(item.kind==='leader')visual=leaderPortraits[item.name]?`<img src="${leaderPortraits[item.name]}" alt="">`:`<i class="ss-monogram">${d.short}</i>`;else if(item.kind==='party')visual=`<i class="ss-institution" aria-hidden="true">▥</i>`;else if(item.kind==='topic')visual=`<i class="ss-topic-icon" aria-hidden="true">${topicIcons[item.name]||'◆'}</i>`;else visual=`<i class="ss-tone-symbol">${d.short}</i>`;btn.innerHTML=`${visual}<span><strong>${label(d.name)}</strong><small>${fmt(d.urls)} URL</small></span>`;btn.title=`${label(d.name)} · ${fmt(d.urls)} URL`;btn.setAttribute('aria-label',btn.title);btn.onclick=()=>select(item.name);plane.appendChild(btn);});
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
