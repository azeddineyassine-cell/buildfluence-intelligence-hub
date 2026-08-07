const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const T=(k,v)=>window.BFI18N.t(k,v);
const nf=n=>Number(n).toLocaleString('fr-FR');

/* Données observées, inchangées. Seuls les libellés passent par les fichiers de traduction. */
const parties=[
 {name:'lapress.ma',subKey:'data.sub.reachUnknown',score:14,delta:125,vis:0,color:'#2797ce'},
 {name:'lebrief.ma',subKey:'data.sub.reachEstimated',subVars:{reach:'7 803'},score:29,delta:84,vis:5,color:'#3f70bc'},
 {name:'lareleve.ma',subKey:'data.sub.reachEstimated',subVars:{reach:'8 858'},score:36,delta:67,vis:6,color:'#e47b2c'},
 {name:'fr.le360.ma',subKey:'data.sub.reachEstimated',subVars:{reach:'143 018'},score:50,delta:62,vis:91,color:'#c84583'},
 {name:'lodj.ma',subKey:'data.sub.reachEstimated',subVars:{reach:'4 995'},score:41,delta:56,vis:3,color:'#db4551'},
 {name:'anrt.ma',subKey:'data.sub.reachEstimated',subVars:{reach:'40 334'},score:30,delta:55,vis:26,color:'#6caf48'},
 {name:'fr.hibapress.com',subKey:'data.sub.reachEstimated',subVars:{reach:'6 512'},score:38,delta:54,vis:4,color:'#d0ad3c'},
 {name:'fnh.ma',subKey:'data.sub.reachEstimated',subVars:{reach:'47 640'},score:48,delta:51,vis:30,color:'#57a5ba'}
];
const people=[
 {name:'radiofrance.fr',subKey:'data.sub.influence',subVars:{score:71},partyKey:'data.party.international',roleKey:'data.role.media',score:71,delta:1,vis:71,color:'#278fc2',initials:'RF',themes:[71,40,12,68],summaryKey:'data.summary.intlFirst',summaryVars:{score:71}},
 {name:'aljazeera.net',subKey:'data.sub.influence',subVars:{score:70},partyKey:'data.party.international',roleKey:'data.role.media',score:70,delta:3,vis:70,color:'#c64b82',initials:'AJ',themes:[70,42,36,69],summaryKey:'data.summary.intl',summaryVars:{score:70}},
 {name:'ouest-france.fr',subKey:'data.sub.influence',subVars:{score:70},partyKey:'data.party.international',roleKey:'data.role.media',score:70,delta:1,vis:70,color:'#de792d',initials:'OF',themes:[70,38,12,65],summaryKey:'data.summary.intl',summaryVars:{score:70}},
 {name:'dw.com',subKey:'data.sub.influence',subVars:{score:68},partyKey:'data.party.international',roleKey:'data.role.media',score:68,delta:6,vis:68,color:'#6eae4e',initials:'DW',themes:[68,58,72,66],summaryKey:'data.summary.intl',summaryVars:{score:68}},
 {name:'courrierinternational.com',subKey:'data.sub.influence',subVars:{score:67},partyKey:'data.party.international',roleKey:'data.role.media',score:67,delta:5,vis:67,color:'#328fbd',initials:'CI',themes:[67,35,60,64],summaryKey:'data.summary.intl',summaryVars:{score:67}},
 {name:'huffingtonpost.fr',subKey:'data.sub.influence',subVars:{score:64},partyKey:'data.party.international',roleKey:'data.role.media',score:64,delta:2,vis:64,color:'#347fa6',initials:'HP',themes:[64,31,24,61],summaryKey:'data.summary.intl',summaryVars:{score:64}}
];
const nationalMedia=[
 {name:'boursenews.ma',subKey:'data.sub.mentionsReach',subVars:{mentions:11,reach:'42 061'},partyKey:'data.party.national',roleKey:'data.role.moroccanMedia',score:59,delta:11,vis:27,color:'#278fc2',initials:'BN',themes:[59,27,18,35],summaryKey:'data.summary.natTop',summaryVars:{score:59,mentions:11,reach:'42 061'}},
 {name:'laquotidienne.ma',subKey:'data.sub.mentionsReach',subVars:{mentions:24,reach:'8 005'},partyKey:'data.party.national',roleKey:'data.role.moroccanMedia',score:55,delta:24,vis:5,color:'#c64b82',initials:'LQ',themes:[55,5,39,33],summaryKey:'data.summary.nat',summaryVars:{score:55,mentions:24,reach:'8 005'}},
 {name:'fr.le360.ma',subKey:'data.sub.mentionsReach',subVars:{mentions:62,reach:'143 018'},partyKey:'data.party.national',roleKey:'data.role.moroccanMedia',score:50,delta:62,vis:91,color:'#de792d',initials:'L360',themes:[50,91,100,80],summaryKey:'data.summary.natCombined',summaryVars:{score:50,mentions:62,reach:'143 018'}},
 {name:'challenge.ma',subKey:'data.sub.mentionsReach',subVars:{mentions:24,reach:'86 497'},partyKey:'data.party.national',roleKey:'data.role.moroccanMedia',score:50,delta:24,vis:55,color:'#6eae4e',initials:'CH',themes:[50,55,39,48],summaryKey:'data.summary.nat',summaryVars:{score:50,mentions:24,reach:'86 497'}},
 {name:'ar.hibapress.com',subKey:'data.sub.mentionsReach',subVars:{mentions:7,reach:'40 334'},partyKey:'data.party.national',roleKey:'data.role.moroccanMedia',score:49,delta:7,vis:26,color:'#328fbd',initials:'HP',themes:[49,26,11,29],summaryKey:'data.summary.nat',summaryVars:{score:49,mentions:7,reach:'40 334'}},
 {name:'fnh.ma',subKey:'data.sub.mentionsReach',subVars:{mentions:51,reach:'47 640'},partyKey:'data.party.national',roleKey:'data.role.moroccanMedia',score:48,delta:51,vis:30,color:'#347fa6',initials:'FNH',themes:[48,30,82,53],summaryKey:'data.summary.nat',summaryVars:{score:48,mentions:51,reach:'47 640'}}
];
const politicalParties=[
 {name:'RNI',subKey:'data.sub.validatedStrong',score:5,delta:5,vis:100,color:'#2797ce'},
 {name:'PJD',subKey:'data.sub.validatedStrong',score:5,delta:5,vis:100,color:'#e47b2c'},
 {name:'Parti de l’Istiqlal',subKey:'data.sub.validatedStrong',score:5,delta:5,vis:100,color:'#c84583'},
 {name:'PAM',subKey:'data.sub.validatedStrong',score:1,delta:1,vis:20,color:'#3f70bc'},
 {name:'Mouvement Populaire',subKey:'data.sub.validatedStrong',score:1,delta:1,vis:20,color:'#d0ad3c'},
 {name:'USFP',subKey:'data.sub.validatedStrong',score:1,delta:1,vis:20,color:'#db4551'}
];
const leaders=[
 {name:'Aziz Akhannouch',subKey:'data.leaderRoles.akhannouch',score:34,delta:34,vis:100,color:'#278fc2',initials:'AA'},
 {name:'Driss Lachgar',subKey:'data.leaderRoles.lachgar',score:17,delta:17,vis:50,color:'#db4551',initials:'DL'},
 {name:'Abdellah Benkirane',subKey:'data.leaderRoles.benkirane',score:11,delta:11,vis:32,color:'#de792d',initials:'AB'},
 {name:'Mohamed Nabil Benabdallah',subKey:'data.leaderRoles.benabdallah',score:5,delta:5,vis:15,color:'#6eae4e',initials:'NB'},
 {name:'Nizar Baraka',subKey:'data.leaderRoles.baraka',score:4,delta:4,vis:12,color:'#c64b82',initials:'NB'}
];
const sub=x=>T(x.subKey,x.subVars);
const themeShares=[36.0,28.6,21.9,9.0,4.5];
const themeColors=['#259cd8','#5d79cf','#8cab36','#e0b235','#9955b4'];
const themes=()=>themeShares.map((v,i)=>[T('data.channels')[i],v,themeColors[i]]);
const dimIcons=['◉','ϟ','◌','↗','◷','◈','⚑','⌁'];
const pressTopicValues=[52,11,7,5,4,3];
const pressTopicColors=['#259cd8','#5d79cf','#8cab36','#e0b235','#d95461','#9955b4'];
const pressTopics=()=>pressTopicValues.map((v,i)=>[T('data.pressTopics')[i],v,pressTopicColors[i]]);
const stepMeta=[['01','▽','#22c2bf'],['02','♧','#a96bc7'],['03','⌕','#e0a92c'],['04','⌘','#4c9bd4'],['05','IBDN','#91b64c'],['06','⚖','#e4a82e']];
const strongMentions=[
 {source:'Le Matin',date:'05/08/2026',tone:'neutral',url:'https://lematin.ma/videos/emploi-les-inegalites-persistent-malgre-le-recul-du-chomage/359441'},
 {source:'DW',date:'05/08/2026',tone:'negative',url:'https://www.dw.com/fr/v%C3%A9rification-des-faits-la-d%C3%A9sinformation-a-t-elle-d%C3%A9clench%C3%A9-la-crise-de-ceuta/a-78258370'},
 {source:'Achtari24',date:'05/08/2026',tone:'negative',url:'https://www.facebook.com/1234832302014601/posts/1371267225037774'},
 {source:'RNI',date:'05/08/2026',tone:'positive',url:'https://www.facebook.com/reel/825303720573779/'},
 {source:'RNI',date:'03/08/2026',tone:'positive',url:'https://www.facebook.com/431515421663478/posts/1614457896702552'}
];

function activateView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));scrollTo({top:0,behavior:'smooth'});if(id==='dashboard'){drawTrend();setTimeout(drawTrend,50)}if(id==='opinion')setTimeout(drawSentiment,50);if(id==='acteurs')setTimeout(drawRadar,50);if(id==='dynamiques')setTimeout(resizeNetwork,50)}
$$('[data-view]').forEach(b=>b.onclick=()=>activateView(b.dataset.view));$$('[data-jump]').forEach(b=>b.onclick=()=>activateView(b.dataset.jump));
$$('[data-media-jump]').forEach(b=>b.onclick=()=>{activateView('acteurs');const target=$(`#media-type [data-media="${b.dataset.mediaJump}"]`);if(target)setTimeout(()=>target.click(),0)});
const modal=$('#access-modal');$$('[data-modal]').forEach(b=>b.onclick=()=>modal.showModal());$('.close',modal).onclick=()=>modal.close();$('#access-form').onsubmit=e=>{e.preventDefault();modal.close();e.target.reset()};

function renderDimensions(){$('#dimension-strip').innerHTML=T('data.dims').map((d,i)=>`<div class="dimension"><b>${dimIcons[i]}</b><strong>${d.label}<small>${d.desc}</small></strong></div>`).join('');$('#ibdn-dimensions').innerHTML=T('data.ibdnDims').map(d=>`<div class="ibdn-dimension"><strong>${d.label}</strong><span>${d.desc}</span></div>`).join('')}
function miniRows(data){return data.slice(0,5).map((x,i)=>`<div class="mini-row"><span>${i+1}</span><i class="badge" style="--c:${x.color}">${x.initials||x.name.slice(0,3)}</i><strong>${x.name}</strong><b>${x.score}</b><em>${T('dash.mentionsShort',{n:x.delta})}</em></div>`).join('')}
function renderMini(){$('#mini-parties').innerHTML=miniRows(parties);$('#mini-people').innerHTML=miniRows(people);$('#theme-mini').innerHTML=pressTopics().map(t=>`<div class="theme-mini-row"><i style="--c:${t[2]}"></i><span>${t[0]}</span><b>${t[1]}</b></div>`).join('')}

function setupCanvas(canvas,h){const r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;canvas.width=r.width*d;canvas.height=(h||r.height)*d;const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);return [c,r.width,h||r.height]}
function lineChart(canvas,sets,labels){if(!canvas||!canvas.offsetParent)return;const [c,w,h]=setupCanvas(canvas);c.clearRect(0,0,w,h);const pad={l:34,r:18,t:18,b:27},iw=w-pad.l-pad.r,ih=h-pad.t-pad.b;c.strokeStyle='#91bad01c';c.lineWidth=1;for(let i=0;i<5;i++){let y=pad.t+ih*i/4;c.beginPath();c.moveTo(pad.l,y);c.lineTo(w-pad.r,y);c.stroke()}c.font='9px DM Sans';c.fillStyle='#748d9d';labels.forEach((l,i)=>c.fillText(l,pad.l+iw*i/(labels.length-1)-7,h-8));sets.forEach(s=>{c.strokeStyle=s.color;c.lineWidth=2.2;c.beginPath();s.data.forEach((v,i)=>{let x=pad.l+iw*i/(s.data.length-1),y=pad.t+ih*(100-v)/100;i?c.lineTo(x,y):c.moveTo(x,y)});c.stroke();s.data.forEach((v,i)=>{let x=pad.l+iw*i/(s.data.length-1),y=pad.t+ih*(100-v)/100;c.fillStyle=s.color;c.beginPath();c.arc(x,y,2.5,0,Math.PI*2);c.fill()})})}
function normalize(values){const max=Math.max(...values);return values.map(v=>v/max*100)}
const dataTooltip=document.body.appendChild(Object.assign(document.createElement('div'),{className:'data-tooltip'}));
function showDataTooltip(e,text){dataTooltip.textContent=text;dataTooltip.style.display='block';dataTooltip.style.left=`${e.clientX+14}px`;dataTooltip.style.top=`${e.clientY+14}px`}
function hideDataTooltip(){dataTooltip.style.display='none'}
function bindCanvasTooltip(canvas,labels,values){canvas.onmousemove=e=>{const r=canvas.getBoundingClientRect(),i=Math.max(0,Math.min(values.length-1,Math.round((e.clientX-r.left)/(r.width/(values.length-1)))));showDataTooltip(e,`${labels[i]} : ${T('opinion.mentionsUnit',{n:nf(values[i])})}`)};canvas.onmouseleave=hideDataTooltip}
function drawTrend(){const canvas=$('#trend-chart'),values=[291,206,259,184,180,339,355,350],labels=['29/07','30/07','31/07','01/08','02/08','03/08','04/08','05/08'];lineChart(canvas,[{color:'#299bd9',data:normalize(values)}],labels);bindCanvasTooltip(canvas,labels,values)}
function drawSentiment(){const canvas=$('#sentiment-chart'),values=[137,326,264,413,911,2136,2801],labels=['30/07','31/07','01/08','02/08','03/08','04/08','05/08'];lineChart(canvas,[{color:'#ed5361',data:normalize(values)}],labels);bindCanvasTooltip(canvas,labels,values)}

const rankingData={politicalParties,leaders,parties,people};
let rankMode='politicalParties';function renderRanking(){const q=$('#rank-search').value.toLowerCase(),data=rankingData[rankMode].filter(x=>(x.name+sub(x)).toLowerCase().includes(q));$('#ranking-table').innerHTML=data.map((x,i)=>`<div class="rank-row"><span>${String(i+1).padStart(2,'0')}</span><div class="rank-actor"><i class="actor-dot" style="--c:${x.color}">${x.initials||x.name.slice(0,3)}</i><span><strong>${x.name}</strong><small>${sub(x)}</small></span></div><span class="score-pill">${x.score}</span><span class="delta">${T('rank.rowMentions',{n:x.delta})}</span><div class="visibility"><i style="width:${x.vis}%"></i></div></div>`).join('')}
$$('#rank-type button').forEach(b=>b.onclick=()=>{$$('#rank-type button').forEach(x=>x.classList.remove('active'));b.classList.add('active');rankMode=b.dataset.type;renderRanking()});$('#rank-search').oninput=renderRanking;

function renderStrongMentions(){const titles=T('data.strongMentions');$('#strong-mentions-list').innerHTML=strongMentions.map((m,i)=>`<a class="strong-mention" href="${m.url}" target="_blank" rel="noopener noreferrer"><span class="tone-dot ${m.tone}"></span><strong>${titles[i]}</strong><small>${m.source} · ${m.date}</small><b>${T('dash.open')}</b></a>`).join('')}

let channelIndex=0;
function renderChannels(){const list=themes();$('#theme-list').innerHTML=list.map((t,i)=>`<div class="theme-row ${i===channelIndex?'active':''}" data-theme="${i}"><i style="--c:${t[2]}"></i><span>${t[0]}</span><b>${t[1]}%</b></div>`).join('');$$('.theme-row').forEach(r=>r.onclick=()=>{channelIndex=+r.dataset.theme;renderChannels()});const current=list[channelIndex];$('#selected-share').innerHTML=`${current[1]}%<small>${current[0].toUpperCase()}</small>`}
function bindDonutTooltip(element,items,valueLabel){if(!element)return;element.onmousemove=e=>{const r=element.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;let angle=(Math.atan2(y,x)*180/Math.PI+450)%360,cumulative=0,index=items.length-1;const total=items.reduce((sum,item)=>sum+item[1],0);for(let i=0;i<items.length;i++){cumulative+=items[i][1]/total*360;if(angle<=cumulative){index=i;break}}const item=items[index];showDataTooltip(e,`${item[0]} : ${valueLabel(item[1])}`)};element.onmouseleave=hideDataTooltip}
function bindDonuts(){bindDonutTooltip($('[data-donut="press"]'),pressTopics(),v=>T('opinion.mentionsUnit',{n:nf(v)}));bindDonutTooltip($('[data-donut="opinion"]'),themes(),v=>T('opinion.percentUnit',{n:nf(v)}))}

let mediaMode='international',actorIndex=0;const currentMedia=()=>mediaMode==='national'?nationalMedia:people;
function renderActorList(){const data=currentMedia(),q=$('#actor-search').value.toLowerCase();$('#actor-list').innerHTML=data.map((x,i)=>({x,i})).filter(o=>(o.x.name+sub(o.x)).toLowerCase().includes(q)).map(o=>`<div class="actor-item ${o.i===actorIndex?'active':''}" data-actor="${o.i}"><i class="actor-dot" style="--c:${o.x.color}">${o.x.initials}</i><span><strong>${o.x.name}</strong><small>${sub(o.x)}</small></span><b>${o.x.score}</b></div>`).join('');$$('.actor-item').forEach(el=>el.onclick=()=>{actorIndex=+el.dataset.actor;renderActorList();renderActorProfile()})}
function renderActorProfile(){const x=currentMedia()[actorIndex];$('#profile-avatar').textContent=x.initials;$('#profile-avatar').style.background=x.color;$('#profile-party').textContent=T(x.partyKey);$('#profile-name').textContent=x.name;$('#profile-role').textContent=T(x.roleKey);$('#profile-score').textContent=x.score;$('#actor-summary').textContent=T(x.summaryKey,x.summaryVars);const names=[T('media.ind1'),T('media.ind2'),T('media.ind3'),T('media.ind4')];$('#actor-themes').innerHTML=x.themes.map((v,i)=>`<div class="actor-theme"><span><b>${names[i]}</b><em>${v}/100</em></span><i style="--v:${v}%"></i></div>`).join('');drawRadar()}
function drawRadar(){const canvas=$('#radar-chart');if(!canvas.offsetParent)return;const [c,w,h]=setupCanvas(canvas,300),x=currentMedia()[actorIndex],values=x.themes,cx=w/2,cy=h/2+3,R=Math.min(w,h)*.34,n=values.length;c.clearRect(0,0,w,h);const labels=[T('media.radar1'),T('media.radar2'),T('media.radar3'),T('media.radar4')];for(let r=1;r<=4;r++){c.beginPath();for(let i=0;i<n;i++){let a=-Math.PI/2+i*Math.PI*2/n,px=cx+Math.cos(a)*R*r/4,py=cy+Math.sin(a)*R*r/4;i?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.strokeStyle='#7894a535';c.stroke()}c.beginPath();values.forEach((v,i)=>{let a=-Math.PI/2+i*Math.PI*2/n,px=cx+Math.cos(a)*R*v/100,py=cy+Math.sin(a)*R*v/100;i?c.lineTo(px,py):c.moveTo(px,py)});c.closePath();c.fillStyle=x.color+'55';c.fill();c.strokeStyle='#e1ad35';c.lineWidth=2;c.stroke();c.font='10px DM Sans';c.fillStyle='#aebdc7';c.textAlign='center';labels.forEach((l,i)=>{let a=-Math.PI/2+i*Math.PI*2/n;c.fillText(l,cx+Math.cos(a)*(R+28),cy+Math.sin(a)*(R+20)+3)})}
$$('#media-type button').forEach(button=>button.onclick=()=>{$$('#media-type button').forEach(x=>x.classList.remove('active'));button.classList.add('active');mediaMode=button.dataset.media;actorIndex=0;$('#actor-search').value='';renderMediaHeader();renderActorList();renderActorProfile()});
function renderMediaHeader(){const national=mediaMode==='national';const title=$('#media-title'),description=$('#media-description');title.setAttribute('data-i18n-html',national?'media.titleNatHtml':'media.titleIntlHtml');title.innerHTML=T(national?'media.titleNatHtml':'media.titleIntlHtml');description.setAttribute('data-i18n',national?'media.descNat':'media.descIntl');description.textContent=T(national?'media.descNat':'media.descIntl')}
$('#actor-search').oninput=renderActorList;

function renderProcess(){$('#process').innerHTML=T('data.steps').map((s,i)=>`<article class="step" style="--c:${stepMeta[i][2]}"><span class="step-num">${stepMeta[i][0]}</span><div class="step-icon">${stepMeta[i][1]}</div><h2>${s.title}</h2><p>${s.desc}</p><ul>${s.items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('')}

// Réseau relationnel interactif
const nc=$('#network-canvas'),nt=$('#network-tooltip');let nctx,nw,nh,hover=-1,filter='all',drag=false,last={x:0,y:0},pan={x:0,y:0},zoom=1;
const graphData=window.narrativeGraphData;
const groupLayout={parti:{x:.08,color:'#55b96b'},acteur:{x:.34,color:'#e2ae34'},theme:{x:.66,color:'#a66bc9'},public:{x:.92,color:'#24c9c9'}};
const grouped=graphData.nodes.reduce((acc,n)=>{(acc[n.group]??=[]).push(n);return acc},{});
const nodes=graphData.nodes.map((n,i)=>{const list=grouped[n.group],position=list.indexOf(n),layout=groupLayout[n.group];return{id:i,...n,rx:layout.x,ry:(position+1)/(list.length+1),color:layout.color}});
const nodeIndex=new Map(nodes.map(n=>[n.name,n.id]));
const nodeLabel=n=>{const label=T('data.graphLabels.'+n.name);return typeof label==='string'&&label!=='data.graphLabels.'+n.name?label:n.name};
const links=graphData.edges.map(([source,target,weight,type])=>({a:nodeIndex.get(source),b:nodeIndex.get(target),weight,t:type})).filter(l=>l.a!==undefined&&l.b!==undefined);
const linkColors={alliance:'#72bd57',proximite:'#299ed8',influence:'#e2ad25',opposition:'#ea5058'};
function resizeNetwork(){if(!nc.offsetParent)return;const r=nc.getBoundingClientRect(),d=devicePixelRatio||1;nc.width=r.width*d;nc.height=r.height*d;nc.style.width=r.width+'px';nc.style.height=r.height+'px';nctx=nc.getContext('2d');nctx.setTransform(d,0,0,d,0,0);nw=r.width;nh=r.height;drawNetwork()}
function nodePos(n){return{x:(n.rx*nw+pan.x-nw/2)*zoom+nw/2,y:(n.ry*nh+pan.y-nh/2)*zoom+nh/2}}
function nodeRadius(n){return 13+Math.min(18,Math.log10(n.mentions+1)*5)}
function drawNetwork(){if(!nctx)return;nctx.clearRect(0,0,nw,nh);links.forEach(l=>{if(filter==='strong'&&l.weight<100)return;if(filter!=='all'&&filter!=='strong'&&l.t!==filter)return;let a=nodePos(nodes[l.a]),b=nodePos(nodes[l.b]),hot=hover<0||l.a===hover||l.b===hover;nctx.globalAlpha=hot?.62:.045;nctx.strokeStyle=linkColors[l.t];nctx.lineWidth=(.55+Math.log10(l.weight+1)*.75)*(hot?1.35:.8);nctx.beginPath();let mx=(a.x+b.x)/2;nctx.moveTo(a.x,a.y);nctx.bezierCurveTo(mx,a.y,mx,b.y,b.x,b.y);nctx.stroke()});nctx.globalAlpha=1;nodes.forEach((n,i)=>{let p=nodePos(n),hot=hover<0||hover===i||links.some(l=>(l.a===hover&&l.b===i)||(l.b===hover&&l.a===i)),r=nodeRadius(n);nctx.globalAlpha=hot?1:.15;nctx.shadowColor=n.color;nctx.shadowBlur=hot?12:0;nctx.fillStyle='#071d30';nctx.strokeStyle=n.color;nctx.lineWidth=i===hover?3:1.2;nctx.beginPath();nctx.arc(p.x,p.y,r*zoom,0,Math.PI*2);nctx.fill();nctx.stroke();nctx.shadowBlur=0;nctx.fillStyle='#eef4f6';nctx.font=`600 ${Math.max(7,10*zoom)}px Barlow Condensed`;nctx.textAlign='center';nctx.fillText(nodeLabel(n),p.x,p.y+r*zoom+13);nctx.fillStyle=n.color;nctx.font=`700 ${Math.max(7,9*zoom)}px DM Sans`;nctx.fillText(nf(n.mentions),p.x,p.y+3)});nctx.globalAlpha=1}
function pointer(e){const r=nc.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
nc.onpointermove=e=>{const p=pointer(e);if(drag){pan.x+=(p.x-last.x)/zoom;pan.y+=(p.y-last.y)/zoom;last=p;drawNetwork();return}let found=-1;nodes.forEach((n,i)=>{let q=nodePos(n);if(Math.hypot(p.x-q.x,p.y-q.y)<(nodeRadius(n)+6)*zoom)found=i});if(found!==hover){hover=found;drawNetwork()}if(found>=0){const n=nodes[found],related=links.filter(l=>l.a===found||l.b===found),weight=related.reduce((s,l)=>s+l.weight,0);nt.style.display='block';nt.style.left=Math.min(p.x+15,nw-260)+'px';nt.style.top=Math.min(p.y+15,nh-100)+'px';nt.innerHTML=`<strong>${nodeLabel(n)}</strong><small>${T('graph.tipMentions',{n:nf(n.mentions)})} · ${T('graph.tipRelations',{n:related.length})}<br>${T('graph.tipCooc',{n:nf(weight)})}<br>${T('graph.tipDisclaimer')}</small>`}else nt.style.display='none'};nc.onpointerdown=e=>{drag=true;last=pointer(e);nc.setPointerCapture(e.pointerId)};nc.onpointerup=()=>drag=false;nc.onpointerleave=()=>{drag=false;hover=-1;nt.style.display='none';drawNetwork()};nc.onwheel=e=>{e.preventDefault();zoom=Math.max(.7,Math.min(1.7,zoom*(e.deltaY>0?.9:1.1)));drawNetwork()};$$('.relation-filters button').forEach(b=>b.onclick=()=>{$$('.relation-filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.relation;drawNetwork()});

function renderAll(){renderDimensions();renderMini();renderRanking();renderStrongMentions();renderChannels();bindDonuts();renderProcess();renderMediaHeader();renderActorList();renderActorProfile();drawTrend();drawSentiment();drawRadar();resizeNetwork()}
addEventListener('resize',()=>{drawTrend();drawSentiment();drawRadar();resizeNetwork()});
window.BFI18N.onChange(()=>renderAll());
renderAll();
