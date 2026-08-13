(() => {
  const root = document.getElementById('opinion-insights');
  const data = window.canonicalMonitoringData;
  if (!root || !data) return;
  const hoverStyle=document.createElement('style');
  hoverStyle.textContent='.oi-pie{cursor:crosshair}.oi-tooltip{position:fixed;z-index:9999;display:grid;grid-template-columns:10px 1fr auto;gap:4px 9px;align-items:center;min-width:205px;max-width:290px;padding:12px 14px;border:1px solid var(--gold);border-radius:2px;background:var(--navy-deep,#08111C);box-shadow:0 12px 30px #0005;color:var(--ivory,#F5F1E8);pointer-events:none;opacity:0;transform:translateY(5px);transition:opacity .12s ease,transform .12s ease}.oi-tooltip.visible{opacity:1;transform:none}.oi-tooltip i{width:9px;height:9px;background:var(--c);grid-row:1/3}.oi-tooltip strong{font:700 13px var(--sans)}.oi-tooltip span{grid-column:2;color:#b8c4cf;font:500 10px var(--sans)}.oi-tooltip b{grid-column:3;grid-row:1/3;color:var(--gold);font:700 18px var(--serif)}html[data-theme="light"] .oi-tooltip{background:#fff;color:#0D1B2A;box-shadow:0 12px 30px #0d1b2a26}html[data-theme="light"] .oi-tooltip span{color:#66788A}';
  document.head.appendChild(hoverStyle);

  const lang = () => ['fr', 'en', 'ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
  const locale = () => lang() === 'ar' ? 'ar-MA' : lang() === 'en' ? 'en-GB' : 'fr-FR';
  const fmt = value => Number(value || 0).toLocaleString(locale());
  const numberPct = value => Number(value).toLocaleString(locale(), { maximumFractionDigits: 1 });
  const copy = {
    fr: {
      kicker: 'OPINION CITOYENNE', title: 'Les dynamiques du <em>débat public</em>', intro: 'Lecture de 5 498 URL uniques dédupliquées, hors Wikipédia et Wiktionary, du 29 juillet au 5 août 2026.',
      topics: 'Sujets dominants du débat public', channels: 'Répartition par canal', tones: 'Répartition par tonalité', languages: 'Répartition par langue',
      mentions: 'URL uniques', occurrences: 'occurrences thématiques', composition: 'COMPOSITION', comparison: 'COMPARAISON DES VOLUMES', share: 'Part', total: 'Total observé', selected: 'Signal sélectionné',
      positive: 'Positive', neutral: 'Neutre', negative: 'Négative', other: 'Autres', news: 'Actualités', blogs: 'Blogs', twitter: 'X / Twitter', facebook: 'Facebook', french: 'Français', arabic: 'Arabe',
      analysis: 'LECTURE ANALYTIQUE', methodTitle: 'CADRE DE LECTURE ET PÉRIMÈTRE',
      method: 'Cette rubrique analyse le corpus Opinion citoyenne sur la base d’URL uniques dédupliquées. Les sujets sont détectés dans ce corpus et alimentent le Political Narrative Graph ainsi que Strategic Signals. Les « Sujets validés » du Tableau de bord relèvent d’un autre périmètre : un sous-ensemble de presse tagué puis validé manuellement. Les intitulés, volumes et scores ne doivent donc pas être comparés comme s’ils provenaient d’une même mesure.',
      topicNote: 'Une URL peut être reliée à plusieurs thèmes. Le camembert représente donc la distribution relative des occurrences des sept sujets détectés, et non une partition exclusive des 5 498 URL.',
      channelNote: 'Chaque URL canonique est comptée une seule fois dans son canal consolidé. Cette vue évite ainsi que les republications d’un même lien gonflent artificiellement un canal.',
      toneNote: 'Chaque URL unique reçoit une tonalité consolidée. La balance décrit le climat du corpus observé, mais ne mesure ni opinion électorale, ni popularité, ni intention de vote.',
      languageNote: 'La langue correspond à la classification de la mention consolidée. La catégorie « Autres » conserve les codes hors français et arabe afin que le total reste traçable.',
      topicAnalysis: 'Le débat est d’abord structuré par {lead} ({leadPct}% des occurrences thématiques affichées). Les trois premiers sujets concentrent {top3}% de cette sélection, ce qui signale une forte hiérarchisation de l’attention. Cette concentration décrit la présence documentaire, pas l’importance politique intrinsèque des sujets.',
      channelAnalysis: '{lead} constitue le premier point d’entrée du corpus avec {leadPct}% des URL uniques. Les deux principaux canaux réunissent {top2}% des liens observés. La lecture doit porter sur la structure de diffusion et non sur l’audience réelle, qui n’est pas mesurée ici.',
      toneAnalysis: 'La tonalité {leadLower} domine avec {leadPct}% du corpus. L’écart entre contenus positifs et négatifs atteint {gap} points. Il s’agit d’un signal réputationnel agrégé : il indique le cadrage des contenus, sans attribuer cette tonalité à un acteur isolé.',
      languageAnalysis: 'Le {leadLower} représente {leadPct}% du corpus. Le français et l’arabe couvrent ensemble {coverage}% des URL uniques, ce qui rend la lecture bilingue centrale. La distribution mesure la langue détectée, pas l’origine géographique des auteurs.',
      selectedAnalysis: '{label} représente {value} {unit}, soit {pct}% de la base de cette visualisation.',
      subjectsCount: '7 sujets détectés'
    },
    en: {
      kicker: 'CITIZEN OPINION', title: 'Public debate <em>dynamics</em>', intro: 'Analysis of 5,498 deduplicated unique URLs, excluding Wikipedia and Wiktionary, from 29 July to 5 August 2026.',
      topics: 'Dominant public debate issues', channels: 'Distribution by channel', tones: 'Distribution by tone', languages: 'Distribution by language',
      mentions: 'unique URLs', occurrences: 'thematic occurrences', composition: 'COMPOSITION', comparison: 'VOLUME COMPARISON', share: 'Share', total: 'Observed total', selected: 'Selected signal',
      positive: 'Positive', neutral: 'Neutral', negative: 'Negative', other: 'Other', news: 'News', blogs: 'Blogs', twitter: 'X / Twitter', facebook: 'Facebook', french: 'French', arabic: 'Arabic',
      analysis: 'ANALYTICAL READING', methodTitle: 'READING FRAMEWORK AND SCOPE',
      method: 'This section analyses the Citizen Opinion corpus using deduplicated unique URLs. Detected issues feed the Political Narrative Graph and Strategic Signals. “Validated issues” on the Dashboard belong to a different scope: a press subset tagged and then manually validated. Labels, volumes and scores must therefore not be compared as if they came from the same measurement.',
      topicNote: 'One URL may be linked to several issues. The pie therefore shows the relative distribution of occurrences across the seven detected issues, not an exclusive partition of the 5,498 URLs.',
      channelNote: 'Each canonical URL is counted once in its consolidated channel, preventing repeated publications of the same link from artificially inflating a channel.',
      toneNote: 'Each unique URL receives a consolidated tone. The balance describes the observed corpus climate, but measures neither electoral opinion, popularity nor voting intention.',
      languageNote: 'Language is taken from the consolidated mention. “Other” retains codes outside French and Arabic so the total remains traceable.',
      topicAnalysis: '{lead} leads with {leadPct}% of the displayed thematic occurrences. The top three issues concentrate {top3}% of this selection, indicating a strongly structured attention pattern. This measures documented presence, not the intrinsic political importance of an issue.',
      channelAnalysis: '{lead} is the corpus’s primary entry point with {leadPct}% of unique URLs. The two leading channels account for {top2}% of observed links. This describes distribution structure, not actual audience reach, which is not measured here.',
      toneAnalysis: '{lead} tone leads with {leadPct}% of the corpus. The gap between positive and negative content is {gap} points. This is an aggregate reputational signal and does not assign that tone to an individual actor.',
      languageAnalysis: '{lead} accounts for {leadPct}% of the corpus. French and Arabic together cover {coverage}% of unique URLs, making bilingual reading essential. This measures detected language, not author geography.',
      selectedAnalysis: '{label} represents {value} {unit}, or {pct}% of this visualisation’s base.', subjectsCount: '7 detected issues'
    },
    ar: {
      kicker: 'رأي المواطنين', title: 'ديناميات <em>النقاش العمومي</em>', intro: 'قراءة لـ 5,498 رابطا فريدا بعد إزالة التكرار، باستثناء ويكيبيديا وويكاموس، من 29 يوليو إلى 5 أغسطس 2026.',
      topics: 'المواضيع المهيمنة على النقاش العمومي', channels: 'التوزيع حسب القناة', tones: 'التوزيع حسب النبرة', languages: 'التوزيع حسب اللغة',
      mentions: 'روابط فريدة', occurrences: 'تكرارات موضوعاتية', composition: 'التركيبة', comparison: 'مقارنة الأحجام', share: 'الحصة', total: 'المجموع المرصود', selected: 'الإشارة المختارة',
      positive: 'إيجابية', neutral: 'محايدة', negative: 'سلبية', other: 'لغات أخرى', news: 'الأخبار', blogs: 'المدونات', twitter: 'X / Twitter', facebook: 'Facebook', french: 'الفرنسية', arabic: 'العربية',
      analysis: 'قراءة تحليلية', methodTitle: 'إطار القراءة والنطاق',
      method: 'تحلل هذه الواجهة مجموعة بيانات رأي المواطنين على أساس الروابط الفريدة بعد إزالة التكرار. وتغذي المواضيع المكتشفة Political Narrative Graph وStrategic Signals. أما «المواضيع المصادق عليها» في لوحة القيادة فتنتمي إلى نطاق مختلف: عينة صحفية موسومة ثم مصادق عليها يدويا. لذلك لا ينبغي مقارنة التسميات والأحجام والنقط كما لو كانت صادرة عن القياس نفسه.',
      topicNote: 'يمكن ربط رابط واحد بعدة مواضيع. لذلك يعرض المخطط الدائري التوزيع النسبي لتكرارات المواضيع السبعة المكتشفة، وليس تقسيما حصريا للروابط البالغ عددها 5,498.',
      channelNote: 'يُحتسب كل رابط معياري مرة واحدة ضمن قناته الموحدة، مما يمنع إعادة نشر الرابط نفسه من تضخيم وزن قناة معينة.',
      toneNote: 'يُسند إلى كل رابط فريد تصنيف موحد للنبرة. وتصف الحصيلة مناخ مجموعة البيانات المرصودة، لكنها لا تقيس الرأي الانتخابي أو الشعبية أو نية التصويت.',
      languageNote: 'تعتمد اللغة على تصنيف الإشارة الموحدة. وتحافظ فئة «لغات أخرى» على الرموز غير الفرنسية والعربية حتى يظل المجموع قابلا للتتبع.',
      topicAnalysis: 'يتصدر موضوع {lead} بنسبة {leadPct}% من التكرارات الموضوعاتية المعروضة. وتجمع المواضيع الثلاثة الأولى {top3}% من هذه العينة، مما يكشف عن تركيز واضح للانتباه. ويصف ذلك الحضور الموثق لا الأهمية السياسية الجوهرية للموضوع.',
      channelAnalysis: 'تمثل قناة {lead} نقطة الدخول الأولى بنسبة {leadPct}% من الروابط الفريدة. وتجمع القناتان الأوليان {top2}% من الروابط المرصودة. ويصف ذلك بنية النشر لا حجم الجمهور الفعلي، الذي لا تقيسه هذه البيانات.',
      toneAnalysis: 'تتصدر النبرة {lead} بنسبة {leadPct}% من مجموعة البيانات. ويبلغ الفارق بين المحتوى الإيجابي والسلبي {gap} نقطة. وهذه إشارة سمعة مجمعة لا تنسب النبرة إلى فاعل بعينه.',
      languageAnalysis: 'تمثل اللغة {lead} نسبة {leadPct}% من مجموعة البيانات. وتغطي الفرنسية والعربية معا {coverage}% من الروابط الفريدة، مما يجعل القراءة الثنائية اللغة أساسية. ويقيس التوزيع اللغة المكتشفة لا الموقع الجغرافي للكتاب.',
      selectedAnalysis: 'تمثل فئة {label} عددا قدره {value} {unit}، أي {pct}% من قاعدة هذا الرسم.', subjectsCount: '7 مواضيع مكتشفة'
    }
  };

  const topicLabels = {
    en: {'Sebta / migration':'Ceuta / migration','Emploi / chômage':'Employment / unemployment','Eau / sécheresse':'Water / drought','Santé':'Health','Éducation':'Education'},
    ar: {'Sebta / migration':'سبتة / الهجرة','Emploi / chômage':'التشغيل / البطالة','Eau / sécheresse':'الماء / الجفاف','Justice':'العدالة','Corruption':'الفساد','Santé':'الصحة','Éducation':'التعليم'}
  };
  const palette = ['#C9A84C','#A66BC9','#299ED8','#E06D4F','#55B96B','#8A7537','#7B8FA3'];
  const total = data.methodology.opinionUniqueUrls;
  let active = 'topics';
  let selected = 0;

  root.innerHTML = `<header class="oi-head"><p class="kicker" id="oi-kicker"></p><h1 id="oi-title"></h1><p id="oi-intro"></p></header><nav class="oi-tabs" aria-label="Opinion citoyenne">${['topics','channels','tones','languages'].map((key,index)=>`<button type="button" data-oi-tab="${key}" class="${index===0?'active':''}"></button>`).join('')}</nav><section class="oi-visual" id="oi-panel"></section><aside class="oi-analysis"><div class="oi-analysis-main"><p class="kicker" id="oi-analysis-title"></p><h3 id="oi-analysis-heading"></h3><p id="oi-analysis-copy"></p><div class="oi-selected" id="oi-selected"></div></div><div class="oi-method"><p class="kicker" id="oi-method-title"></p><p id="oi-method"></p><small id="oi-note"></small></div></aside><div class="oi-tooltip" id="oi-tooltip" role="tooltip"></div>`;

  const labelTopic = name => topicLabels[lang()]?.[name] || name;
  const replace = (text, values) => Object.entries(values).reduce((out,[key,value]) => out.replaceAll(`{${key}}`, value), text);
  const getView = () => {
    const x = copy[lang()];
    if (active === 'topics') return {
      title:x.topics, badge:x.subjectsCount, unit:x.occurrences, note:x.topicNote,
      items:data.topics.map((item,index)=>({label:labelTopic(item.name),value:item.mentions,color:palette[index]})).sort((a,b)=>b.value-a.value)
    };
    if (active === 'channels') {
      const keys=['twitter','news','blogs','facebook','other'];
      return {title:x.channels,badge:`${fmt(total)} ${x.mentions}`,unit:x.mentions,note:x.channelNote,items:keys.map((key,index)=>({label:x[key],value:data.opinionBreakdowns.channels[key],color:palette[index]}))};
    }
    if (active === 'tones') return {title:x.tones,badge:`${fmt(total)} ${x.mentions}`,unit:x.mentions,note:x.toneNote,items:[{label:x.negative,value:data.toneTotals.negative,color:'#E06D4F'},{label:x.neutral,value:data.toneTotals.neutral,color:'#299ED8'},{label:x.positive,value:data.toneTotals.positive,color:'#55B96B'}]};
    return {title:x.languages,badge:`${fmt(total)} ${x.mentions}`,unit:x.mentions,note:x.languageNote,items:[{label:x.french,value:data.opinionBreakdowns.languages.fr,color:'#299ED8'},{label:x.arabic,value:data.opinionBreakdowns.languages.ar,color:'#C9A84C'},{label:x.other,value:data.opinionBreakdowns.languages.other,color:'#8A7537'}]};
  };

  function analysis(view) {
    const x=copy[lang()], sum=view.items.reduce((n,item)=>n+item.value,0), sorted=[...view.items].sort((a,b)=>b.value-a.value), lead=sorted[0];
    const common={lead:lead.label,leadLower:lead.label.toLocaleLowerCase(locale()),leadPct:numberPct(lead.value/sum*100)};
    if(active==='topics') return replace(x.topicAnalysis,{...common,top3:numberPct(sorted.slice(0,3).reduce((n,item)=>n+item.value,0)/sum*100)});
    if(active==='channels') return replace(x.channelAnalysis,{...common,top2:numberPct(sorted.slice(0,2).reduce((n,item)=>n+item.value,0)/sum*100)});
    if(active==='tones') return replace(x.toneAnalysis,{...common,gap:numberPct(Math.abs(data.toneTotals.positive-data.toneTotals.negative)/total*100)});
    return replace(x.languageAnalysis,{...common,coverage:numberPct((data.opinionBreakdowns.languages.fr+data.opinionBreakdowns.languages.ar)/total*100)});
  }

  function moveTooltip(event) {
    const tooltip=root.querySelector('#oi-tooltip'),margin=16;
    let left=event.clientX+margin,top=event.clientY+margin;
    const width=tooltip.offsetWidth||220,height=tooltip.offsetHeight||80;
    if(left+width>window.innerWidth-8)left=event.clientX-width-margin;
    if(top+height>window.innerHeight-8)top=event.clientY-height-margin;
    tooltip.style.left=`${Math.max(8,left)}px`;tooltip.style.top=`${Math.max(8,top)}px`;
  }
  function hideTooltip(){root.querySelector('#oi-tooltip').classList.remove('visible')}
  function activateItem(index,view,sum,event) {
    selected=index;
    const x=copy[lang()],item=view.items[index],tooltip=root.querySelector('#oi-tooltip');
    root.querySelectorAll('[data-oi-select]').forEach(button=>button.classList.toggle('active',Number(button.dataset.oiSelect)===index));
    root.querySelector('#oi-selected').innerHTML=`<span>${x.selected}</span><strong style="--c:${item.color}">${item.label}</strong><p>${replace(x.selectedAnalysis,{label:item.label,value:fmt(item.value),unit:view.unit,pct:numberPct(item.value/sum*100)})}</p>`;
    tooltip.innerHTML=`<i style="--c:${item.color}"></i><strong>${item.label}</strong><span>${fmt(item.value)} ${view.unit}</span><b>${numberPct(item.value/sum*100)}%</b>`;
    tooltip.classList.add('visible');
    if(event)moveTooltip(event);
  }

  function render() {
    const x=copy[lang()], view=getView(), sum=view.items.reduce((n,item)=>n+item.value,0), max=Math.max(...view.items.map(item=>item.value));
    selected=Math.min(selected,view.items.length-1);
    root.querySelector('#oi-kicker').textContent=x.kicker;
    root.querySelector('#oi-title').innerHTML=x.title;
    root.querySelector('#oi-intro').textContent=x.intro;
    root.querySelectorAll('[data-oi-tab]').forEach(button=>{button.textContent=x[button.dataset.oiTab];button.classList.toggle('active',button.dataset.oiTab===active)});
    let cursor=0;
    const gradient=view.items.map(item=>{const start=cursor;cursor+=item.value/sum*100;return `${item.color} ${start}% ${cursor}%`}).join(',');
    const panel=root.querySelector('#oi-panel');
    panel.innerHTML=`<header class="oi-panel-head"><div><p class="kicker">${x.composition} × ${x.comparison}</p><h2>${view.title}</h2></div><strong>${view.badge}</strong></header><div class="oi-chart-grid"><article class="oi-pie-card"><p>${x.composition}</p><div class="oi-pie" style="background:conic-gradient(${gradient})"><div><strong>${fmt(sum)}</strong><span>${view.unit}</span></div></div><div class="oi-legend">${view.items.map((item,index)=>`<button data-oi-select="${index}" class="${index===selected?'active':''}"><i style="--c:${item.color}"></i><span>${item.label}</span><strong>${numberPct(item.value/sum*100)}%</strong></button>`).join('')}</div></article><article class="oi-column-card"><p>${x.comparison}</p><div class="oi-columns">${view.items.map((item,index)=>`<button data-oi-select="${index}" class="${index===selected?'active':''}" style="--h:${Math.max(4,item.value/max*100)}%;--c:${item.color}"><strong>${fmt(item.value)}</strong><i><b></b></i><span>${item.label}</span></button>`).join('')}</div></article></div>`;
    root.querySelector('#oi-analysis-title').textContent=x.analysis;
    root.querySelector('#oi-analysis-heading').textContent=view.title;
    root.querySelector('#oi-analysis-copy').textContent=analysis(view);
    root.querySelector('#oi-method-title').textContent=x.methodTitle;
    root.querySelector('#oi-method').textContent=x.method;
    root.querySelector('#oi-note').textContent=view.note;
    const item=view.items[selected];
    root.querySelector('#oi-selected').innerHTML=`<span>${x.selected}</span><strong style="--c:${item.color}">${item.label}</strong><p>${replace(x.selectedAnalysis,{label:item.label,value:fmt(item.value),unit:view.unit,pct:numberPct(item.value/sum*100)})}</p>`;
    root.querySelectorAll('[data-oi-select]').forEach(button=>{
      const index=Number(button.dataset.oiSelect);
      button.addEventListener('mouseenter',event=>activateItem(index,view,sum,event));
      button.addEventListener('mousemove',moveTooltip);
      button.addEventListener('mouseleave',hideTooltip);
      button.addEventListener('focus',()=>activateItem(index,view,sum));
      button.addEventListener('blur',hideTooltip);
      button.addEventListener('click',()=>activateItem(index,view,sum));
    });
    const pie=root.querySelector('.oi-pie');
    pie.addEventListener('mousemove',event=>{
      const rect=pie.getBoundingClientRect(),xPos=event.clientX-(rect.left+rect.width/2),yPos=event.clientY-(rect.top+rect.height/2),radius=Math.hypot(xPos,yPos),outer=rect.width/2,inner=outer*.56;
      if(radius<inner||radius>outer){hideTooltip();return}
      const angle=(Math.atan2(yPos,xPos)*180/Math.PI+450)%360;
      let cursorAngle=0,index=view.items.length-1;
      view.items.some((item,itemIndex)=>{cursorAngle+=item.value/sum*360;if(angle<=cursorAngle){index=itemIndex;return true}return false});
      activateItem(index,view,sum,event);
    });
    pie.addEventListener('mouseleave',hideTooltip);
  }

  root.querySelectorAll('[data-oi-tab]').forEach(button=>button.addEventListener('click',()=>{active=button.dataset.oiTab;selected=0;render()}));
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir','data-theme']});
  render();
})();
