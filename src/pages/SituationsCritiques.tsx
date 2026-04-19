import { useState } from "react";
import Navbar from "@/components/Navbar";

const TOPICS = [
  { id:0, icon:"🔭", color:"#0D1B2A", pos:"top", tag:"Situation 1 / 8", title:"Décider sans Visibilité", sub:"Manque d'information fiable transformant chaque décision stratégique en pari hasardeux", stat:"80% des dirigeants naviguent avec un angle mort (McKinsey, 2019).", risques:["Décisions prises sur indicateurs partiels","Sous-estimation des signaux faibles","Amplification d'une crise avant sa détection","Perte de confiance des investisseurs"], angles:["Absence de cartographie des acteurs","Réseaux d'influence invisibles","Pas de suivi des tendances en temps réel","Confusion entre volume d'info et visibilité"], casOrg:"Présidence de la République du Sénégal", casInt:"Plateforme de veille IA temps réel · Cartographie des acteurs et alliances · Détection précoce des narratifs à risque", casRes:"Décision éclairée sous forte pression · Réduction des angles morts · Lisibilité stratégique restaurée", casKPI:"✓ Crise narrative anticipée — Résilience renforcée", sol:"Strategic Foresight Lab" },
  { id:1, icon:"⚡", color:"#C9453C", pos:"topRight", tag:"Situation 2 / 8", title:"Attaques Informationnelles", sub:"Vulnérabilité aux manipulations qui altèrent la perception et sabotent les décisions", stat:"70-80% de la valeur de marque repose sur des actifs intangibles (SurveySparrow, 2025).", risques:["Effondrement de confiance investisseurs et clients","Perte de valeur et ralentissement de croissance","Communication sans impact","Boycott coordonné et fuite de clients"], angles:["Attaque découverte quand elle est déjà virale","Absence de contre-narratif structuré","Instigateurs non identifiés","Monitoring des amplifications absent"], casOrg:"Centrale Danone Maroc", casInt:"Digital investigation approfondie · Analyse forensique · Stratégie de contre-influence · Mapping des instigateurs", casRes:"Marque innocentée à 100% · Confiance restaurée · Reconquête du marché en 24 mois", casKPI:"✓ +14% de parts de marché — 120M MAD de pertes stoppées", sol:"Threat Intelligence" },
  { id:2, icon:"📉", color:"#C9862A", pos:"right", tag:"Situation 3 / 8", title:"Perte d'Attractivité", sub:"Avoir des atouts sans rayonnement c'est laisser les autres capter la valeur à votre place", stat:"Dans l'arbitrage international la perception précède la réalité.", risques:["Décrochage face aux territoires plus visibles","Détournement des flux d'IDE","Difficulté à attirer talents et investisseurs","Affaiblissement de la compétitivité territoriale"], angles:["Absence de cartographie des concurrents territoriaux","Narratifs géoéconomiques adverses sous-estimés","Attractivité traitée comme communication","Signaux investisseurs non lus"], casOrg:"Territoire Confidentiel (NDA strict)", casInt:"Benchmark géoéconomique · Cartographie des flux d'investissements · Repositionnement du discours institutionnel", casRes:"Positionnement différenciant clarifié · Attractivité renforcée · Messages réalignés", casKPI:"✓ Positionnement restructuré — Visibilité internationale renforcée", sol:"Territorial Influence Lab" },
  { id:3, icon:"🔥", color:"#1B3E6A", pos:"bottomRight", tag:"Situation 4 / 8", title:"Crise Non Maîtrisée", sub:"Ignorer les étincelles mène à l'incendie. 48 heures pour tout perdre.", stat:"60% des entreprises touchées par des crises majeures ne s'en remettent jamais (Cleartail Marketing, 2025).", risques:["Contagion réseaux puis amplification médiatique","Perte de contrôle face à l'enchaînement des faits","Boycott sanctions démissions chute du CA","Effondrement de la confiance des parties prenantes"], angles:["Absence de protocole de crise","Décisions sous pression sans data","Porte-parole non préparé","Réseaux sociaux hors contrôle"], casOrg:"Ministère de la Santé — Royaume du Maroc", casInt:"Fact-checking temps réel · Identification sources de désinformation · War room de crise · Coordination des messages officiels", casRes:"Crise H1N1 atténuée · Désinformation neutralisée · COVID-19 géré bien plus efficacement", casKPI:"✓ Crise atténuée en 2 semaines — Dispositif pérennisé", sol:"Crisis Command Center" },
  { id:4, icon:"🏎", color:"#6B4EC9", pos:"bottom", tag:"Situation 5 / 8", title:"Perdre en Vélocité", sub:"Naviguer sans radar pendant que d'autres tracent leur route grâce aux signaux du marché", stat:"Les entreprises agiles croissent 2.5x plus vite (KX Research, 2021).", risques:["Manquer les tendances porteuses","Arriver trop tard sur les marchés en croissance","Érosion progressive du CA","Obsolescence stratégique"], angles:["Rapports volumineux et obsolètes","Absence de veille concurrentielle continue","Pas d'alerte sur les mouvements adverses","Boucle décisionnelle trop lente"], casOrg:"OCP Group — Leader mondial des phosphates", casInt:"Cartographie de l'écosystème sur 10 ans · Analyse géopolitique et concurrentielle · Dashboard décisionnel cabinet du Président", casRes:"Protection de milliards de dollars de CA · Leadership renforcé · Gestion proactive des campagnes de boycott", casKPI:"✓ Position de leader mondial protégée — 10 ans de veille continue", sol:"Competitive Velocity Engine" },
  { id:5, icon:"🌐", color:"#A0306B", pos:"bottomLeft", tag:"Situation 6 / 8", title:"Déficit d'Influence", sub:"Quand certains écrivent l'histoire d'autres la subissent. Votre légitimité silencieuse est inefficace.", stat:"85% des normes sont dictées par ceux qui occupent le terrain politique et institutionnel.", risques:["Marginalisation dans votre propre écosystème","Perte d'influence dans les arbitrages clés","Captation de votre rôle par d'autres acteurs","Perte de crédibilité auprès des partenaires"], angles:["Empreinte digitale institutionnelle faible","Positionnement mal perçu dans l'écosystème","Pas d'architecture pour piloter l'influence","Communication déconnectée des dynamiques réelles"], casOrg:"CIDC / OCI (57 pays) et ADD — Agence du Digital", casInt:"Diagnostic et positionnement stratégique · Doing Business Platform · Roadmap d'influence · Activation GITEX Africa Morocco", casRes:"CIDC repositionné comme hub OCI · ADD pionnier dans l'écosystème digital africain", casKPI:"✓ Rôle institutionnel restructuré — Influence opérationnelle acquise", sol:"Political Intelligence" },
  { id:6, icon:"🔍", color:"#1A7A4A", pos:"left", tag:"Situation 7 / 8", title:"Risque Invisible", sub:"Miser sans connaissance profonde : chaque investissement devient une loterie", stat:"70 à 90% des M&A échouent par manque de due diligence (CFA Institute, 2025).", risques:["Exposition aux scandales et blacklists","Pertes financières par association toxique","Réputation dégradée par contamination","Perte de confiance actionnaires et régulateurs"], angles:["Infos critiques enfouies dans des sources disparates","Investissement sans due diligence systématique","Apparences soignées au lieu de faits vérifiés","Coût de l'investigation sous-estimé"], casOrg:"Société de Capital-Risque — Confidentiel (NDA strict)", casInt:"Deep Due Diligence 3 Niveaux · Screening PEP · Vérifications sanctions ONU OFAC EU · Audit KYC LCB-FT ESG", casRes:"Due diligence complète sur valorisation 400M$ · Points de vigilance identifiés · Partenariat sécurisé", casKPI:"✓ 400M$ sécurisés — Validation complète avec mapping des risques", sol:"Deep Due Diligence (3 Niveaux)" },
  { id:7, icon:"📡", color:"#C9A84C", pos:"topLeft", tag:"Situation 8 / 8", title:"Gouverner sous Pression", sub:"Dans un environnement surexposé ne laissez pas l'émotion dicter vos décisions", stat:"Chaque action est observée commentée critiquée et amplifiée. La pression est permanente.", risques:["Réactions sous pression émotionnelle élevée","Décisions pour calmer l'opinion plutôt que servir la stratégie","Perte de contrôle narratif","Affaiblissement de l'autorité décisionnelle"], angles:["Confondre visibilité et maîtrise","Masse de critiques non maîtrisée","Réagir sans lecture consolidée des dynamiques","Absence de système structuré d'anticipation"], casOrg:"Raja Club Athletic — Club historique à forte base populaire", casInt:"Monitoring médiatique structuré · Centralisation des flux d'information · Cartographie des acteurs d'influence · Cellule stratégique interne", casRes:"Cycles de décision réduits · Silos éliminés · Vision consolidée · Pionnier dans le sport marocain", casKPI:"✓ 1er club marocain doté d'une cellule d'intelligence stratégique", sol:"AI Powered Monitor + Strategic Workflow" },
];

const POS: Record<string,{x:number,y:number}> = {
  top:{x:280,y:132}, topRight:{x:385,y:175}, right:{x:428,y:280},
  bottomRight:{x:385,y:385}, bottom:{x:280,y:428}, bottomLeft:{x:175,y:385},
  left:{x:132,y:280}, topLeft:{x:175,y:175}
};

export default function SituationsCritiques() {
  const [sel, setSel] = useState<number|null>(null);
  const cur = sel !== null ? TOPICS[sel] : null;
  const nav = (d:number) => sel !== null && setSel((sel+d+8)%8);

  return (
    <div style={{background:"#F0F7FF",minHeight:"100vh",fontFamily:"DM Sans,sans-serif"}}>
      <Navbar />
      <div style={{textAlign:"center",padding:"96px 24px 0"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"3.5px",textTransform:"uppercase",color:"#C9A84C",borderBottom:"1px solid #C9A84C",display:"inline-block",paddingBottom:3,marginBottom:16}}>Diagnostic stratégique</div>
        <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(26px,4vw,46px)",fontWeight:300,color:"#0D1B2A",lineHeight:1.15,marginBottom:10}}>
          Les <em style={{fontStyle:"italic",fontWeight:700,color:"#C9A84C"}}>menaces</em> que vous ne voyez pas<br/>sont les plus destructrices
        </h1>
        <p style={{fontSize:13.5,color:"#6B7FA0",maxWidth:520,margin:"0 auto",lineHeight:1.75,fontStyle:"italic"}}>
          Identifier la nature de votre exposition aux risques est déjà <strong style={{color:"#C9A84C",fontStyle:"normal"}}>le premier acte de souveraineté décisionnelle.</strong>
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",maxWidth:1380,margin:"0 auto",padding:"16px 40px 40px",alignItems:"center"}}>
        <div style={{paddingRight:28,paddingTop:44}}>
          {!cur && (
            <div>
              <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:17,fontStyle:"italic",color:"#0D1B2A",lineHeight:1.6,borderLeft:"3px solid #C9A84C",paddingLeft:18,marginBottom:20}}>
                « Les crises ne naissent pas du chaos,<br/>mais de l'illusion du contrôle. »
              </p>
              <ul style={{listStyle:"none",padding:0}}>
                {["Attaques informationnelles non détectées","Concurrent qui prend de l'avance en silence","Crise qui éclate sans protocole de réponse","Investissement engagé sans due diligence réelle","Influence qui s'érode sans que personne ne le mesure","Décisions prises à l'aveugle, sans signal d'alerte"].map((item,i)=>(
                  <li key={i} style={{fontSize:12.5,color:"#6B7FA0",padding:"5px 0 5px 16px",position:"relative",lineHeight:1.6}}>
                    <span style={{position:"absolute",left:0,top:12,width:5,height:5,borderRadius:"50%",background:"#C9A84C",opacity:0.55,display:"inline-block"}}/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cur && (
            <div style={{background:"#fff",border:"1px solid #D8E4F0",borderRadius:12,overflow:"hidden",boxShadow:"0 4px 20px rgba(13,27,42,.07)"}}>
              <div style={{height:4,background:cur.color}}/>
              <div style={{padding:"22px 26px 26px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:44,height:44,borderRadius:9,background:"#F0F7FF",border:"1px solid #D8E4F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0}}>{cur.icon}</div>
                    <div>
                      <div style={{fontSize:9,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#C9A84C",marginBottom:2}}>{cur.tag}</div>
                      <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,fontWeight:700,color:"#0D1B2A",lineHeight:1.15}}>{cur.title}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {[-1,1].map(d=><button key={d} onClick={()=>nav(d)} style={{width:28,height:28,borderRadius:"50%",background:"#F0F7FF",border:"1px solid #D8E4F0",color:"#0D1B2A",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{d===-1?"‹":"›"}</button>)}
                  </div>
                </div>
                <div style={{height:1,background:"#D8E4F0",margin:"14px 0"}}/>
                <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:13,fontStyle:"italic",color:"#6B7FA0",borderLeft:"2px solid #C9A84C",paddingLeft:11,marginBottom:12,lineHeight:1.65}}>{cur.sub}</p>
                <div style={{background:"#F0F7FF",border:"1px solid #D8E4F0",borderRadius:7,padding:"11px 14px",fontSize:12,color:"#2C3E55",lineHeight:1.65,marginBottom:14}}>{cur.stat}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:13}}>
                  {[{label:"Vous risquez",items:cur.risques},{label:"Angles morts",items:cur.angles}].map(b=>(
                    <div key={b.label} style={{background:"#F0F7FF",border:"1px solid #D8E4F0",borderRadius:7,padding:"11px 13px"}}>
                      <div style={{fontSize:9,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#1B3E6A",marginBottom:7}}>{b.label}</div>
                      <ul style={{listStyle:"none",padding:0}}>
                        {b.items.map((item,i)=>(
                          <li key={i} style={{fontSize:11,color:"#2C3E55",padding:"2px 0 2px 12px",position:"relative",lineHeight:1.6}}>
                            <span style={{position:"absolute",left:0,top:8,width:4,height:4,borderRadius:"50%",background:"#C9A84C",opacity:0.65,display:"inline-block"}}/>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{border:"1px solid #D8E4F0",borderLeft:"3px solid #1B3E6A",borderRadius:7,padding:"13px 15px",marginBottom:13,background:"#FAFCFF"}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#C9A84C",marginBottom:3}}>Cas Client Buildfluence</div>
                  <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,fontWeight:700,color:"#0D1B2A",marginBottom:9}}>{cur.casOrg}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                    {[{label:"Notre intervention",text:cur.casInt},{label:"Résultat",text:cur.casRes}].map(c=>(
                      <div key={c.label}>
                        <div style={{fontSize:9,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#6B7FA0",marginBottom:3}}>{c.label}</div>
                        <div style={{fontSize:11,color:"#2C3E55",lineHeight:1.65}}>{c.text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:9,background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.3)",borderRadius:20,padding:"3px 11px",fontSize:10.5,fontWeight:600,color:"#7A5A00"}}>{cur.casKPI}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:13}}>
                  <span style={{fontSize:10,color:"#6B7FA0",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:700}}>Solution</span>
                  <span style={{fontSize:10,color:"#C9A84C",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:700}}>Buildfluence</span>
                  <span style={{background:"#0D1B2A",color:"#fff",fontSize:10.5,fontWeight:600,padding:"3px 9px",borderRadius:4}}>{cur.sol}</span>
                </div>
                <button style={{display:"inline-flex",alignItems:"center",gap:6,background:"#0D1B2A",color:"#fff",fontSize:11.5,fontWeight:600,padding:"9px 18px",borderRadius:5,border:"none",cursor:"pointer"}}>
                  Evaluer ma situation — GRATUIT <span style={{color:"#C9A84C"}}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"sticky",top:20}}>
          <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:15,fontStyle:"italic",color:"#0D1B2A",textAlign:"center",marginBottom:1,lineHeight:1.5}}>
            « Les crises ne naissent pas du chaos, mais de l'illusion du contrôle. »
          </p>
          <div style={{width:"100%",maxWidth:1188,marginTop:1}}>
            <svg viewBox="0 0 560 560" style={{width:"100%",height:"100%",overflow:"visible"}}>
              <defs>
                <radialGradient id="cg2" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#1B478C"/>
                  <stop offset="100%" stopColor="#10325F"/>
                </radialGradient>
                <clipPath id="lc2"><circle cx="280" cy="280" r="56"/></clipPath>
              </defs>
              <circle cx="280" cy="280" r="148" fill="none" stroke="#D8E4F0" strokeWidth="1" strokeDasharray="3 7"/>
              <circle cx="280" cy="280" r="204" fill="none" stroke="#EEF4FB" strokeWidth="1" strokeDasharray="2 10"/>
              {TOPICS.map(t=>{
                const p=POS[t.pos];
                return <line key={t.id} x1="280" y1="280" x2={p.x} y2={p.y} stroke={sel===t.id?"#C9A84C":"#C8D8E8"} strokeWidth={sel===t.id?1.5:1} strokeDasharray="3 5" opacity={sel===t.id?1:0.55}/>;
              })}
              <circle cx="280" cy="280" r="66" fill="#10325F" stroke="#C9A84C" strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(null)}/>
              <circle cx="280" cy="280" r="58" fill="none" stroke="rgba(201,168,76,.2)" strokeWidth="1"/>
              <text x="280" y="270" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="#C9A84C" style={{textTransform:"uppercase",cursor:"pointer"}} onClick={()=>setSel(null)}>
                RISQUES INVISIBLES
              </text>
              <text x="280" y="292" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.6" fontWeight="600" letterSpacing="1.8" fill="#F4F0E6" style={{textTransform:"uppercase",cursor:"pointer"}} onClick={()=>setSel(null)}>
                MENACES SILENCIEUSES
              </text>
              {TOPICS.map(t=>{
                const p=POS[t.pos]; const a=sel===t.id;
                const words=t.title.split(" "); const half=Math.ceil(words.length/2);
                return (
                  <g key={t.id} style={{cursor:"pointer"}} onClick={()=>setSel(t.id)}>
                    <rect x={p.x-38} y={p.y-31} width="76" height="62" rx="9" fill={a?"#E8F2FF":"white"} stroke={a?"#1B3E6A":"#D8E4F0"} strokeWidth={a?2:1.5}/>
                    <rect x={p.x-38} y={p.y-31} width="76" height="4" rx="2" fill={t.color}/>
                    <text x={p.x} y={p.y-8} textAnchor="middle" fontSize="18">{t.icon}</text>
                    <text x={p.x} y={p.y+13} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#0D1B2A">{words.slice(0,half).join(" ")}</text>
                    <text x={p.x} y={p.y+24} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#0D1B2A">{words.slice(half).join(" ")}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p style={{fontSize:10,color:"#6B7FA0",letterSpacing:"0.5px",textAlign:"center",marginTop:1}}>
            Cliquez sur une situation pour explorer le processus
          </p>
        </div>
      </div>
    </div>
  );
}
