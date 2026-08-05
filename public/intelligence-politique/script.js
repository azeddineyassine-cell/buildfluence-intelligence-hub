const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const parties=[
 {name:'RNI',sub:'Rassemblement National des Indépendants',score:72,delta:4.8,vis:78,color:'#2797ce'},
 {name:'PAM',sub:'Parti Authenticité et Modernité',score:65,delta:2.1,vis:70,color:'#3f70bc'},
 {name:'PJD',sub:'Parti de la Justice et du Développement',score:61,delta:-1.2,vis:68,color:'#e47b2c'},
 {name:'Istiqlal',sub:'Parti de l’Istiqlal',score:58,delta:.6,vis:63,color:'#c84583'},
 {name:'USFP',sub:'Union Socialiste des Forces Populaires',score:55,delta:-.8,vis:59,color:'#db4551'},
 {name:'PPS',sub:'Parti du Progrès et du Socialisme',score:51,delta:1.4,vis:55,color:'#6caf48'},
 {name:'MP',sub:'Mouvement Populaire',score:48,delta:-.3,vis:51,color:'#d0ad3c'},
 {name:'UC',sub:'Union Constitutionnelle',score:44,delta:.4,vis:47,color:'#57a5ba'}
];
const people=[
 {name:'Aziz Akhannouch',sub:'Chef du gouvernement · RNI',party:'RNI',role:'Chef du gouvernement',score:72,delta:4.6,vis:80,color:'#278fc2',initials:'AA',themes:[88,78,65,55],summary:'Forte centralité sur le pouvoir d’achat et l’investissement. Engagement en hausse sur 14 jours, tonalité globalement neutre à positive.',radar:[82,74,70,68,76,80]},
 {name:'Nizar Baraka',sub:'Ministre · Istiqlal',party:'Istiqlal',role:'Ministre de l’Équipement et de l’Eau',score:66,delta:1.9,vis:72,color:'#c64b82',initials:'NB',themes:[62,91,72,58],summary:'Présence narrative structurée autour de l’eau et des infrastructures, avec une bonne persistance médiatique.',radar:[70,78,64,58,66,72]},
 {name:'Abdellah Benkirane',sub:'Secrétaire général · PJD',party:'PJD',role:'Secrétaire général',score:61,delta:-.7,vis:69,color:'#de792d',initials:'AB',themes:[69,54,82,71],summary:'Capacité de mobilisation élevée et forte résonance dans les conversations politiques en ligne.',radar:[76,66,77,81,72,65]},
 {name:'Nabil Benabdallah',sub:'Secrétaire général · PPS',party:'PPS',role:'Secrétaire général',score:57,delta:.6,vis:61,color:'#6eae4e',initials:'NB',themes:[57,61,70,66],summary:'Profil régulier, centré sur les politiques sociales et le fonctionnement institutionnel.',radar:[58,71,62,56,64,69]},
 {name:'Fatim-Zahra Ammor',sub:'Ministre · RNI',party:'RNI',role:'Ministre du Tourisme',score:56,delta:1.2,vis:60,color:'#328fbd',initials:'FA',themes:[48,55,78,68],summary:'Progression portée par l’investissement touristique et l’emploi des jeunes.',radar:[60,69,66,62,71,58]},
 {name:'Nadia Fettah',sub:'Ministre · RNI',party:'RNI',role:'Ministre de l’Économie et des Finances',score:53,delta:2.0,vis:57,color:'#347fa6',initials:'NF',themes:[83,60,61,49],summary:'Visibilité en hausse sur les thèmes du budget, de l’inflation et du pouvoir d’achat.',radar:[64,72,59,55,67,61]}
];
const themes=[['Pouvoir d’achat',28,'#259cd8'],['Emploi & jeunesse',19,'#5d79cf'],['Santé',14,'#8cab36'],['Éducation',12,'#e0b235'],['Corruption',10,'#d95461'],['Institutions',8,'#9955b4'],['Autres',9,'#38566e']];
const dims=[['◉','VISIBILITÉ','Présence dans les médias et réseaux.'],['ϟ','INFLUENCE','Relais par des sources influentes.'],['◌','ENGAGEMENT','Réactions, interactions et partages.'],['↗','PROPAGATION','Vitesse de diffusion du récit.'],['◷','PERSISTANCE','Capacité à durer dans le temps.'],['◈','TONALITÉ','Orientation positive, neutre ou négative.'],['⚑','THÉMATIQUES','Association aux grands enjeux.'],['⌁','DYNAMIQUE','Progression, stagnation ou recul.']];

function activateView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));scrollTo({top:0,behavior:'smooth'});if(id==='dashboard'){drawTrend();setTimeout(drawTrend,50)}if(id==='opinion')setTimeout(drawSentiment,50);if(id==='acteurs')setTimeout(drawRadar,50);if(id==='dynamiques')setTimeout(resizeNetwork,50)}
$$('[data-view]').forEach(b=>b.onclick=()=>activateView(b.dataset.view));$$('[data-jump]').forEach(b=>b.onclick=()=>activateView(b.dataset.jump));
const modal=$('#access-modal');$$('[data-modal]').forEach(b=>b.onclick=()=>modal.showModal());$('.close',modal).onclick=()=>modal.close();$('#access-form').onsubmit=e=>{e.preventDefault();modal.close();e.target.reset()};

const scoreDims=[['VISIBILITÉ',78],['INFLUENCE',70],['ENGAGEMENT',75],['VITESSE',68],['PERSISTANCE',71],['TONALITÉ',65],['THÉMATIQUES',73],['DYNAMIQUE',80]];
$('#score-bars').innerHTML=scoreDims.map(x=>`<div class="score-row"><span>${x[0]}</span><i style="--v:${x[1]}%"></i><b>${x[1]}</b></div>`).join('');
$('#dimension-strip').innerHTML=dims.map(d=>`<div class="dimension"><b>${d[0]}</b><strong>${d[1]}<small>${d[2]}</small></strong></div>`).join('');
function miniRows(data){return data.slice(0,5).map((x,i)=>`<div class="mini-row"><span>${i+1}</span><i class="badge" style="--c:${x.color}">${x.initials||x.name.slice(0,3)}</i><strong>${x.name}</strong><b>${x.score}</b><em class="${x.delta<0?'down':''}">${x.delta>=0?'↑':'↓'} ${Math.abs(x.delta).toFixed(1)}</em></div>`).join('')}
$('#mini-parties').innerHTML=miniRows(parties);$('#mini-people').innerHTML=miniRows(people);$('#theme-mini').innerHTML=themes.slice(0,6).map(t=>`<div class="theme-mini-row"><i style="--c:${t[2]}"></i><span>${t[0]}</span><b>${t[1]}%</b></div>`).join('');

function setupCanvas(canvas,h){const r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;canvas.width=r.width*d;canvas.height=(h||r.height)*d;const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);return [c,r.width,h||r.height]}
function lineChart(canvas,sets,labels){if(!canvas||!canvas.offsetParent)return;const [c,w,h]=setupCanvas(canvas);c.clearRect(0,0,w,h);const pad={l:34,r:18,t:18,b:27},iw=w-pad.l-pad.r,ih=h-pad.t-pad.b;c.strokeStyle='#91bad01c';c.lineWidth=1;for(let i=0;i<5;i++){let y=pad.t+ih*i/4;c.beginPath();c.moveTo(pad.l,y);c.lineTo(w-pad.r,y);c.stroke()}c.font='9px DM Sans';c.fillStyle='#748d9d';labels.forEach((l,i)=>c.fillText(l,pad.l+iw*i/(labels.length-1)-7,h-8));sets.forEach(s=>{c.strokeStyle=s.color;c.lineWidth=2.2;c.beginPath();s.data.forEach((v,i)=>{let x=pad.l+iw*i/(s.data.length-1),y=pad.t+ih*(100-v)/100;i?c.lineTo(x,y):c.moveTo(x,y)});c.stroke();s.data.forEach((v,i)=>{let x=pad.l+iw*i/(s.data.length-1),y=pad.t+ih*(100-v)/100;c.fillStyle=s.color;c.beginPath();c.arc(x,y,2.5,0,Math.PI*2);c.fill()})})}
function drawTrend(){lineChart($('#trend-chart'),[{color:'#299bd9',data:[58,67,72,74,73,81,76]},{color:'#e0ae31',data:[49,58,62,66,65,71,64]},{color:'#e45464',data:[38,44,51,48,47,58,52]},{color:'#a75caf',data:[30,36,42,41,39,49,43]}],['J-6','J-5','J-4','J-3','J-2','J-1','J'])}
function drawSentiment(){lineChart($('#sentiment-chart'),[{color:'#55c87b',data:[31,35,36,40,38,44,42]},{color:'#7e94a3',data:[45,43,42,39,41,36,37]},{color:'#ed5361',data:[24,22,22,21,21,20,21]}],['06h','09h','12h','15h','18h','21h','00h'])}

let rankMode='parties';function renderRanking(){const q=$('#rank-search').value.toLowerCase(),data=(rankMode==='parties'?parties:people).filter(x=>(x.name+x.sub).toLowerCase().includes(q));$('#ranking-table').innerHTML=data.map((x,i)=>`<div class="rank-row"><span>${String(i+1).padStart(2,'0')}</span><div class="rank-actor"><i class="actor-dot" style="--c:${x.color}">${x.initials||x.name.slice(0,3)}</i><span><strong>${x.name}</strong><small>${x.sub}</small></span></div><span class="score-pill">${x.score}</span><span class="delta ${x.delta<0?'down':''}">${x.delta>=0?'▲':'▼'} ${Math.abs(x.delta).toFixed(1)} pts</span><div class="visibility"><i style="width:${x.vis}%"></i></div></div>`).join('')}
$$('#rank-type button').forEach(b=>b.onclick=()=>{$$('#rank-type button').forEach(x=>x.classList.remove('active'));b.classList.add('active');rankMode=b.dataset.type;renderRanking()});$('#rank-search').oninput=renderRanking;$('#rank-period').onchange=()=>{const k={7:1,30:1.35,90:1.7}[$('#rank-period').value];[...(rankMode==='parties'?parties:people)].forEach(x=>x._shownDelta=x.delta*k);renderRanking()};renderRanking();

$('#theme-list').innerHTML=themes.map((t,i)=>`<div class="theme-row ${i===0?'active':''}" data-theme="${i}"><i style="--c:${t[2]}"></i><span>${t[0]}</span><b>${t[1]}%</b></div>`).join('');$$('.theme-row').forEach(r=>r.onclick=()=>{$$('.theme-row').forEach(x=>x.classList.remove('active'));r.classList.add('active');const t=themes[+r.dataset.theme];$('#selected-share').innerHTML=`${t[1]}%<small>${t[0].toUpperCase()}</small>`});$$('#opinion-period button').forEach(b=>b.onclick=()=>{$$('#opinion-period button').forEach(x=>x.classList.remove('active'));b.classList.add('active')});

let actorIndex=0;function renderActorList(){const q=$('#actor-search').value.toLowerCase();$('#actor-list').innerHTML=people.map((x,i)=>({x,i})).filter(o=>(o.x.name+o.x.sub).toLowerCase().includes(q)).map(o=>`<div class="actor-item ${o.i===actorIndex?'active':''}" data-actor="${o.i}"><i class="actor-dot" style="--c:${o.x.color}">${o.x.initials}</i><span><strong>${o.x.name}</strong><small>${o.x.sub}</small></span><b>${o.x.score}</b></div>`).join('');$$('.actor-item').forEach(el=>el.onclick=()=>{actorIndex=+el.dataset.actor;renderActorList();renderActorProfile()})}
function renderActorProfile(){const x=people[actorIndex];$('#profile-avatar').textContent=x.initials;$('#profile-avatar').style.background=x.color;$('#profile-party').textContent=x.party;$('#profile-name').textContent=x.name;$('#profile-role').textContent=x.role;$('#profile-score').textContent=x.score;$('#actor-summary').textContent=x.summary;const names=['Pouvoir d’achat','Emploi & jeunesse','Institutions','Rayonnement territorial'];$('#actor-themes').innerHTML=x.themes.map((v,i)=>`<div class="actor-theme"><span><b>${names[i]}</b><em>${v}/100</em></span><i style="--v:${v}%"></i></div>`).join('');drawRadar()}
function drawRadar(){const canvas=$('#radar-chart');if(!canvas.offsetParent)return;const [c,w,h]=setupCanvas(canvas,300),x=people[actorIndex],cx=w/2,cy=h/2+3,R=Math.min(w,h)*.36,n=6;c.clearRect(0,0,w,h);const labels=['Visibilité','Crédibilité','Influence','Mobilisation','Engagement','Leadership'];for(let r=1;r<=4;r++){c.beginPath();for(let i=0;i<n;i++){let a=-Math.PI/2+i*Math.PI*2/n,px=cx+Math.cos(a)*R*r/4,py=cy+Math.sin(a)*R*r/4;i?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.strokeStyle='#7894a535';c.stroke()}c.beginPath();x.radar.forEach((v,i)=>{let a=-Math.PI/2+i*Math.PI*2/n,px=cx+Math.cos(a)*R*v/100,py=cy+Math.sin(a)*R*v/100;i?c.lineTo(px,py):c.moveTo(px,py)});c.closePath();c.fillStyle=x.color+'55';c.fill();c.strokeStyle='#e1ad35';c.lineWidth=2;c.stroke();c.font='10px DM Sans';c.fillStyle='#aebdc7';c.textAlign='center';labels.forEach((l,i)=>{let a=-Math.PI/2+i*Math.PI*2/n;c.fillText(l,cx+Math.cos(a)*(R+26),cy+Math.sin(a)*(R+18)+3)})}
$('#actor-search').oninput=renderActorList;renderActorList();renderActorProfile();

const steps=[['01','▽','OBSERVER','Collecte des données ouvertes',['Presse · Réseaux · Institutions','15 000+ sources · FR · AR','Collecte continue 24/7'],'#22c2bf'],['02','♧','COMPRENDRE','Intelligence augmentée',['IA et analyse humaine','Détection des acteurs','Contrôle qualité permanent'],'#a96bc7'],['03','⌕','ANALYSER','Analyse narrative',['8 thématiques clés','Tonalité et intensité','Tendances quotidiennes'],'#e0a92c'],['04','⌘','RELIER','Cartographie relationnelle',['Alliances et oppositions','Influence et proximité','Réseaux de diffusion'],'#4c9bd4'],['05','IBDN','MESURER','Indice IBDN®',['8 dimensions','Score unique sur 100','Temps réel et comparaisons'],'#91b64c'],['06','⚖','GARANTIR','Gouvernance éthique',['Neutralité et transparence','Validation humaine','Conformité CNDP & RGPD'],'#e4a82e']];
$('#process').innerHTML=steps.map(s=>`<article class="step" style="--c:${s[5]}"><span class="step-num">${s[0]}</span><div class="step-icon">${s[1]}</div><h2>${s[2]}</h2><p>${s[3]}</p><ul>${s[4].map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('');

// Réseau relationnel interactif
const nc=$('#network-canvas'),nt=$('#network-tooltip');let nctx,nw,nh,hover=-1,filter='all',drag=false,last={x:0,y:0},pan={x:0,y:0},zoom=1;
const nodes=[
 ['RNI','parti',.08,.18,'#68bd54'],['PAM','parti',.08,.34,'#4b8fd0'],['PJD','parti',.08,.51,'#e0a82a'],['USFP','parti',.08,.68,'#c856a5'],['Istiqlal','parti',.08,.84,'#e94f59'],
 ['A. Akhannouch','acteur',.32,.18,'#e2ae34'],['N. Baraka','acteur',.48,.24,'#e2ae34'],['A. Benkirane','acteur',.34,.45,'#e2ae34'],['F-Z. Ammor','acteur',.49,.50,'#e2ae34'],['N. Benabdallah','acteur',.33,.72,'#e2ae34'],['N. Fettah','acteur',.50,.79,'#e2ae34'],
 ['Pouvoir d’achat','theme',.69,.17,'#a66bc9'],['Emploi','theme',.69,.31,'#a66bc9'],['Santé','theme',.69,.45,'#a66bc9'],['Éducation','theme',.69,.59,'#a66bc9'],['Eau','theme',.69,.73,'#a66bc9'],['Transition','theme',.69,.87,'#a66bc9'],
 ['Citoyens','public',.88,.50,'#24c9c9'],['Presse','source',.95,.23,'#24c9c9'],['Réseaux sociaux','source',.96,.39,'#24c9c9'],['Forums','source',.96,.64,'#24c9c9'],['Vidéos','source',.95,.80,'#24c9c9']
].map((n,i)=>({id:i,name:n[0],group:n[1],rx:n[2],ry:n[3],color:n[4]}));
const types=['alliance','proximite','influence','opposition'];let links=[];for(let i=0;i<5;i++)for(let j=5;j<11;j++)if((i*3+j)%4!==0)links.push({a:i,b:j,t:types[(i+j)%4]});for(let i=5;i<11;i++)for(let j=11;j<17;j++)if((i+j)%3!==0)links.push({a:i,b:j,t:types[(i*2+j)%4]});for(let i=11;i<17;i++){links.push({a:i,b:17,t:'proximite'});links.push({a:i,b:18+i%4,t:'influence'})}for(let i=0;i<5;i++)links.push({a:i,b:17,t:'proximite'});
const linkColors={alliance:'#72bd57',proximite:'#299ed8',influence:'#e2ad25',opposition:'#ea5058'};
function resizeNetwork(){if(!nc.offsetParent)return;const r=nc.getBoundingClientRect(),d=devicePixelRatio||1;nc.width=r.width*d;nc.height=r.height*d;nc.style.width=r.width+'px';nc.style.height=r.height+'px';nctx=nc.getContext('2d');nctx.setTransform(d,0,0,d,0,0);nw=r.width;nh=r.height;drawNetwork()}
function nodePos(n){return{x:(n.rx*nw+pan.x-nw/2)*zoom+nw/2,y:(n.ry*nh+pan.y-nh/2)*zoom+nh/2}}
function drawNetwork(){if(!nctx)return;nctx.clearRect(0,0,nw,nh);links.forEach(l=>{if(filter!=='all'&&l.t!==filter)return;let a=nodePos(nodes[l.a]),b=nodePos(nodes[l.b]),hot=hover<0||l.a===hover||l.b===hover;nctx.globalAlpha=hot?.72:.07;nctx.strokeStyle=linkColors[l.t];nctx.lineWidth=hot?1.1:.6;nctx.beginPath();let mx=(a.x+b.x)/2;nctx.moveTo(a.x,a.y);nctx.bezierCurveTo(mx,a.y,mx,b.y,b.x,b.y);nctx.stroke()});nctx.globalAlpha=1;nodes.forEach((n,i)=>{let p=nodePos(n),hot=hover<0||hover===i||links.some(l=>(l.a===hover&&l.b===i)||(l.b===hover&&l.a===i));nctx.globalAlpha=hot?1:.18;let r=n.group==='public'?31:n.group==='acteur'?20:n.group==='parti'?18:16;nctx.shadowColor=n.color;nctx.shadowBlur=hot?12:0;nctx.fillStyle='#071d30';nctx.strokeStyle=n.color;nctx.lineWidth=i===hover?3:1.2;nctx.beginPath();nctx.arc(p.x,p.y,r*zoom,0,Math.PI*2);nctx.fill();nctx.stroke();nctx.shadowBlur=0;nctx.fillStyle='#eef4f6';nctx.font=`600 ${Math.max(7,10*zoom)}px Barlow Condensed`;nctx.textAlign='center';nctx.fillText(n.name,p.x,p.y+r*zoom+13);nctx.fillStyle=n.color;nctx.font=`700 ${Math.max(7,9*zoom)}px DM Sans`;nctx.fillText(n.group==='parti'?n.name:n.group==='public'?'◎':n.group==='acteur'?'●':'◆',p.x,p.y+3)});nctx.globalAlpha=1}
function pointer(e){const r=nc.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
nc.onpointermove=e=>{const p=pointer(e);if(drag){pan.x+=(p.x-last.x)/zoom;pan.y+=(p.y-last.y)/zoom;last=p;drawNetwork();return}let found=-1;nodes.forEach((n,i)=>{let q=nodePos(n);if(Math.hypot(p.x-q.x,p.y-q.y)<30*zoom)found=i});if(found!==hover){hover=found;drawNetwork()}if(found>=0){const n=nodes[found],count=links.filter(l=>l.a===found||l.b===found).length;nt.style.display='block';nt.style.left=Math.min(p.x+15,nw-170)+'px';nt.style.top=Math.min(p.y+15,nh-65)+'px';nt.innerHTML=`<strong>${n.name}</strong><small>${count} relations détectées</small>`}else nt.style.display='none'};nc.onpointerdown=e=>{drag=true;last=pointer(e);nc.setPointerCapture(e.pointerId)};nc.onpointerup=()=>drag=false;nc.onpointerleave=()=>{drag=false;hover=-1;nt.style.display='none';drawNetwork()};nc.onwheel=e=>{e.preventDefault();zoom=Math.max(.7,Math.min(1.7,zoom*(e.deltaY>0?.9:1.1)));drawNetwork()};$$('.relation-filters button').forEach(b=>b.onclick=()=>{$$('.relation-filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.relation;drawNetwork()});
addEventListener('resize',()=>{drawTrend();drawSentiment();drawRadar();resizeNetwork()});drawTrend();

/* ===== Données réelles · Edge Function publique ip-public-data ===== */
(function(){
 const API='https://uoupidbmoyqckxsxunvr.supabase.co/functions/v1/ip-public-data';
 const CACHE='ip_public_data_v1', TTL=300000, TIMEOUT=9000;
 const nf=new Intl.NumberFormat('fr-FR');
 const banner=$('#ip-data-banner');
 const isAr=s=>/[\u0600-\u06FF]/.test(s||'');
 const dt=v=>{try{return new Date(v).toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'})}catch(e){return '—'}};

 function showBanner(msg,error){if(!banner)return;banner.textContent=msg;banner.classList.toggle('error',!!error);banner.hidden=false}
 function readCache(){try{const c=JSON.parse(localStorage.getItem(CACHE)||'null');return c&&c.payload?c:null}catch(e){return null}}
 function writeCache(payload){try{localStorage.setItem(CACHE,JSON.stringify({at:Date.now(),payload}))}catch(e){}}

 function applyKpis(k){if(!k)return;
  const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  set('#kpi-documents',nf.format(k.document_count||0));
  set('#kpi-documents-24h',nf.format(k.documents_24h||0));
  set('#kpi-sources',nf.format(k.source_count||0));
 }

 function toActor(r,i){
  const colors=['#2797ce','#3f70bc','#e47b2c','#c84583','#db4551','#6caf48','#d0ad3c','#57a5ba','#8d7fd1'];
  const total=(r.positive_count||0)+(r.negative_count||0)+(r.neutral_count||0);
  const balance=total?((r.positive_count-r.negative_count)/total*100):0;
  const name=r.canonical_name_fr;
  return {name,sub:r.current_role_fr||r.acronym||'',score:r.mention_count||0,delta:balance,
   reach:Number(r.direct_reach||0),vis:0,color:colors[i%colors.length],
   initials:(r.acronym?r.acronym.replace(/[^A-Za-z]/g,'').slice(0,3):name.trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2)).toUpperCase(),
   latest:r.latest_mention_at,nameAr:r.canonical_name_ar};
 }

 function apply(data){
  applyKpis(data.kpis);
  const rank=(data.ranking||[]).filter(r=>(r.mention_count||0)>0);
  const rp=rank.filter(r=>r.actor_type==='parti').map(toActor);
  const rs=rank.filter(r=>r.actor_type!=='parti').map(toActor);
  [rp,rs].forEach(list=>{const max=Math.max(1,...list.map(x=>x.reach));list.forEach(x=>x.vis=Math.round(x.reach/max*100))});

  const rowsHtml=list=>list.slice(0,5).map((x,i)=>`<div class="mini-row"><span>${i+1}</span><i class="badge" style="--c:${x.color}">${x.initials}</i><strong>${x.name}</strong><b>${nf.format(x.score)}</b><em class="${x.delta<0?'down':''}">${x.delta>=0?'↑':'↓'} ${Math.abs(x.delta).toFixed(1)}%</em></div>`).join('');
  if(rp.length)$('#mini-parties').innerHTML=rowsHtml(rp);
  if(rs.length)$('#mini-people').innerHTML=rowsHtml(rs);

  if(rp.length||rs.length){
   renderRanking=function(){
    const q=$('#rank-search').value.toLowerCase();
    const data=(rankMode==='parties'?rp:rs).filter(x=>(x.name+x.sub).toLowerCase().includes(q));
    $('#ranking-table').innerHTML=data.map((x,i)=>`<div class="rank-row"><span>${String(i+1).padStart(2,'0')}</span><div class="rank-actor"><i class="actor-dot" style="--c:${x.color}">${x.initials}</i><span><strong>${x.name}</strong><small>${x.sub}</small></span></div><span class="score-pill">${nf.format(x.score)}</span><span class="delta ${x.delta<0?'down':''}">${x.delta>=0?'▲':'▼'} ${Math.abs(x.delta).toFixed(1)} %</span><div class="visibility"><i style="width:${x.vis}%"></i></div></div>`).join('');
   };
   renderRanking();
  }

  const rec=$('#ip-recent'), st=$('#ip-recent-state');
  const seen=new Set(), items=[];
  (data.recent||[]).forEach(m=>{if(seen.has(m.id))return;seen.add(m.id);items.push(m)});
  if(rec){
   rec.innerHTML=items.slice(0,15).map(m=>{const ar=isAr(m.title);
    return `<div class="ip-recent-row"${ar?' dir="rtl"':''}><a href="${m.url}" target="_blank" rel="noopener noreferrer">${(m.title||'Sans titre').replace(/</g,'&lt;')}</a><small>${m.source_name||m.source_type||''}</small><small>${m.canonical_name_fr||''} · ${dt(m.published_at)}</small></div>`}).join('');
   if(st)st.textContent=items.length?`${items.length} mentions validées`:'aucune mention';
  }

  const fresh=data.kpis&&(data.kpis.freshest_publication_at||data.kpis.dataset_imported_at);
  showBanner(`Données réelles validées · dernière publication analysée : ${dt(fresh)} · ${nf.format((data.kpis&&data.kpis.mentions_pending_review)||0)} mentions en attente de revue, exclues des agrégats publics. Les blocs IBDN® restent en démonstration.`,false);
 }

 function fallback(cached){
  const when=cached?dt(cached.at):'inconnue';
  showBanner(`Données temporairement indisponibles — dernière actualisation connue : ${when}`,true);
  const st=$('#ip-recent-state');if(st)st.textContent='indisponible';
  const rec=$('#ip-recent');if(rec&&!rec.children.length)rec.innerHTML='<div class="ip-recent-row"><small>Aucune donnée disponible pour le moment.</small></div>';
 }

 async function load(){
  const cached=readCache();
  if(cached&&Date.now()-cached.at<TTL){try{apply(cached.payload);return}catch(e){}}
  const ctrl=new AbortController(), t=setTimeout(()=>ctrl.abort(),TIMEOUT);
  try{
   const res=await fetch(API,{signal:ctrl.signal,headers:{'Accept':'application/json'}});
   clearTimeout(t);
   if(!res.ok)throw new Error('http_'+res.status);
   const json=await res.json();
   if(json.status!=='ok')throw new Error('payload');
   writeCache(json);apply(json);
  }catch(e){
   clearTimeout(t);
   if(cached){try{apply(cached.payload)}catch(_){}}
   fallback(cached);
  }
 }
 load();
})();
