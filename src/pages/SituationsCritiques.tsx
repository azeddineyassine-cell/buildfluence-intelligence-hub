import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FormDiagnostic } from "@/components/FormModals";
import { useLanguage } from "@/contexts/LanguageContext";
import presidenceSenegalLogo from "@/assets/clients/presidence-senegal.jpg";
import centraleDanoneLogo from "@/assets/clients/centrale-danone.jpg";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";
import ocpLogo from "@/assets/clients/ocp.png";
import cidcLogo from "@/assets/clients/cidc.jpg";
import addLogo from "@/assets/clients/add.png";
import rajaLogo from "@/assets/clients/raja-club-athletic.jpg";

const POS: Record<string, { x: number; y: number }> = {
  top: { x: 280, y: 132 }, topRight: { x: 385, y: 175 }, right: { x: 428, y: 280 },
  bottomRight: { x: 385, y: 385 }, bottom: { x: 280, y: 428 }, bottomLeft: { x: 175, y: 385 },
  left: { x: 132, y: 280 }, topLeft: { x: 175, y: 175 },
};

export default function SituationsCritiques() {
  const { t, lang } = useLanguage();
  const [sel, setSel] = useState<number | null>(null);
  const [diagOpen, setDiagOpen] = useState(false);

  const TOPICS: any[] = [
    { id: 0, icon: "🔭", color: "#0D1B2A", pos: "top",
      tag: t("Situation 1 / 8", "Situation 1 / 8"),
      title: t("Décider sans Visibilité", "Deciding without Visibility"),
      sub: t("Manque d'information fiable transformant chaque décision stratégique en pari hasardeux", "Lack of reliable information turning every strategic decision into a hazardous gamble"),
      stat: t("80% des dirigeants naviguent avec un angle mort (McKinsey, 2019).", "80% of leaders navigate with a blind spot (McKinsey, 2019)."),
      risques: [
        t("Décisions prises sur indicateurs partiels", "Decisions based on partial indicators"),
        t("Sous-estimation des signaux faibles", "Underestimation of weak signals"),
        t("Amplification d'une crise avant sa détection", "Crisis amplification before detection"),
        t("Perte de confiance des investisseurs", "Loss of investor confidence"),
      ],
      angles: [
        t("Absence de cartographie des acteurs", "Lack of stakeholder mapping"),
        t("Réseaux d'influence invisibles", "Invisible influence networks"),
        t("Pas de suivi des tendances en temps réel", "No real-time trend tracking"),
        t("Confusion entre volume d'info et visibilité", "Confusion between information volume and visibility"),
      ],
      casOrg: t("Présidence de la République du Sénégal", "Presidency of the Republic of Senegal"),
      casLogos: [presidenceSenegalLogo],
      casInt: t("Plateforme de veille IA temps réel · Cartographie des acteurs et alliances · Détection précoce des narratifs à risque", "Real-time AI monitoring platform · Stakeholder and alliance mapping · Early detection of risk narratives"),
      casRes: t("Décision éclairée sous forte pression · Réduction des angles morts · Lisibilité stratégique restaurée", "Informed decision under strong pressure · Blind spots reduced · Strategic clarity restored"),
      casKPI: t("✓ Crise narrative anticipée\n✓ Baromètre d'image", "✓ Anticipated narrative crisis\n✓ Image barometer"),
      sol: "Strategic Foresight Lab" },
    { id: 1, icon: "⚡", color: "#C9453C", pos: "topRight",
      tag: t("Situation 2 / 8", "Situation 2 / 8"),
      title: t("Attaques Informationnelles", "Informational Attacks"),
      sub: t("Vulnérabilité aux manipulations qui altèrent la perception et sabotent les décisions", "Vulnerability to manipulations that alter perception and sabotage decisions"),
      stat: t("70-80% de la valeur de marque repose sur des actifs intangibles (SurveySparrow, 2025).", "70-80% of brand value rests on intangible assets (SurveySparrow, 2025)."),
      risques: [
        t("Effondrement de confiance investisseurs et clients", "Collapse of investor and customer confidence"),
        t("Perte de valeur et ralentissement de croissance", "Loss of value and slowed growth"),
        t("Communication sans impact", "Communication without impact"),
        t("Boycott coordonné et fuite de clients", "Coordinated boycott and customer flight"),
      ],
      angles: [
        t("Attaque découverte quand elle est déjà virale", "Attack discovered when already viral"),
        t("Absence de contre-narratif structuré", "No structured counter-narrative"),
        t("Instigateurs non identifiés", "Unidentified instigators"),
        t("Monitoring des amplifications absent", "No amplification monitoring"),
      ],
      casOrg: t("Centrale Danone Maroc", "Centrale Danone Morocco"),
      casLogos: [centraleDanoneLogo],
      casInt: t("Digital investigation approfondie · Analyse forensique · Stratégie de contre-influence · Mapping des instigateurs", "In-depth digital investigation · Forensic analysis · Counter-influence strategy · Instigator mapping"),
      casRes: t("Reconquête du marché après 24 mois de déclin de marque et perte de 120M MAD de CA", "Market reconquest after 24 months of brand decline and loss of MAD 120M in revenue"),
      casKPI: t("✓ Gain de +14% de parts de marché\n✓ Légitimation de marque", "✓ +14% market share gained\n✓ Brand legitimization"),
      sol: "Threat Intelligence" },
    { id: 2, icon: "📉", color: "#C9862A", pos: "right",
      tag: t("Situation 3 / 8", "Situation 3 / 8"),
      title: t("Perte d'Attractivité", "Loss of Attractiveness"),
      sub: t("Avoir des atouts sans rayonnement c'est laisser les autres capter la valeur à votre place", "Having assets without influence means letting others capture the value in your place"),
      stat: t("Dans l'arbitrage international la perception précède la réalité.", "In international arbitration, perception precedes reality."),
      risques: [
        t("Décrochage face aux territoires plus visibles", "Falling behind more visible territories"),
        t("Détournement des flux d'IDE", "FDI flows diverted"),
        t("Difficulté à attirer talents et investisseurs", "Difficulty attracting talent and investors"),
        t("Affaiblissement de la compétitivité territoriale", "Weakened territorial competitiveness"),
      ],
      angles: [
        t("Absence de cartographie des concurrents territoriaux", "No competitive territorial mapping"),
        t("Narratifs géoéconomiques adverses sous-estimés", "Adverse geo-economic narratives underestimated"),
        t("Attractivité traitée comme communication", "Attractiveness treated as a communication topic"),
        t("Signaux investisseurs non lus", "Unread investor signals"),
      ],
      casOrg: t("Territoire Confidentiel (NDA strict)", "Confidential Territory (strict NDA)"),
      casLogos: [],
      casInt: t("Benchmark géoéconomique · Cartographie des flux d'investissements · Repositionnement du discours institutionnel", "Geo-economic benchmark · Investment flow mapping · Repositioning of institutional discourse"),
      casRes: t("Positionnement différenciant clarifié · Attractivité renforcée · Messages réalignés", "Differentiating positioning clarified · Attractiveness strengthened · Messages realigned"),
      casKPI: t("✓ Positionnement restructuré\n✓ Visibilité internationale renforcée", "✓ Positioning restructured\n✓ International visibility strengthened"),
      sol: "Territorial Influence Lab" },
    { id: 3, icon: "🔥", color: "#1B3E6A", pos: "bottomRight",
      tag: t("Situation 4 / 8", "Situation 4 / 8"),
      title: t("Crise Non Maîtrisée", "Uncontrolled Crisis"),
      sub: t("Ignorer les étincelles mène à l'incendie. 48 heures pour tout perdre.", "Ignoring sparks leads to fire. 48 hours to lose everything."),
      stat: t("60% des entreprises touchées par des crises majeures ne s'en remettent jamais (Cleartail Marketing, 2025).", "60% of companies hit by major crises never recover (Cleartail Marketing, 2025)."),
      risques: [
        t("Contagion réseaux puis amplification médiatique", "Network contagion then media amplification"),
        t("Perte de contrôle face à l'enchaînement des faits", "Loss of control over cascading events"),
        t("Boycott sanctions démissions chute du CA", "Boycotts, sanctions, resignations, revenue drop"),
        t("Effondrement de la confiance des parties prenantes", "Collapse of stakeholder trust"),
      ],
      angles: [
        t("Absence de protocole de crise", "No crisis protocol"),
        t("Décisions sous pression sans data", "Pressured decisions without data"),
        t("Porte-parole non préparé", "Unprepared spokesperson"),
        t("Réseaux sociaux hors contrôle", "Social networks out of control"),
      ],
      casOrg: t("Ministère de la Santé — Royaume du Maroc", "Ministry of Health — Kingdom of Morocco"),
      casLogos: [ministereSanteLogo],
      casInt: t("Fact-checking temps réel · Identification sources de désinformation · War room de crise · Coordination des messages officiels", "Real-time fact-checking · Identification of disinformation sources · Crisis war room · Coordination of official messages"),
      casRes: t("Crise H1N1 atténuée · Désinformation neutralisée · COVID-19 géré bien plus efficacement", "H1N1 crisis mitigated · Disinformation neutralized · COVID-19 handled far more efficiently"),
      casKPI: t("✓ Crise atténuée en 2 semaines\n✓ Dispositif pérennisé", "✓ Crisis mitigated in 2 weeks\n✓ System made permanent"),
      sol: "Threat Intelligence" },
    { id: 4, icon: "🏎", color: "#6B4EC9", pos: "bottom",
      tag: t("Situation 5 / 8", "Situation 5 / 8"),
      title: t("Perdre en Vélocité", "Losing Velocity"),
      sub: t("Naviguer sans radar pendant que d'autres tracent leur route grâce aux signaux du marché", "Navigating without radar while others chart their course using market signals"),
      stat: t("Les entreprises agiles croissent 2.5x plus vite (KX Research, 2021).", "Agile companies grow 2.5x faster (KX Research, 2021)."),
      risques: [
        t("Manquer les tendances porteuses", "Missing growth trends"),
        t("Arriver trop tard sur les marchés en croissance", "Arriving too late in growing markets"),
        t("Érosion progressive du CA", "Progressive revenue erosion"),
        t("Obsolescence stratégique", "Strategic obsolescence"),
      ],
      angles: [
        t("Rapports volumineux et obsolètes", "Bulky and obsolete reports"),
        t("Absence de veille concurrentielle continue", "No continuous competitive monitoring"),
        t("Pas d'alerte sur les mouvements adverses", "No alerts on adverse movements"),
        t("Boucle décisionnelle trop lente", "Decision loop too slow"),
      ],
      casOrg: t("OCP Group — Leader mondial des phosphates", "OCP Group — Global leader in phosphates"),
      casLogos: [ocpLogo],
      casInt: t("Cartographie de l'écosystème sur 10 ans · Analyse géopolitique et concurrentielle · Dashboard décisionnel cabinet du Président", "10-year ecosystem mapping · Geopolitical and competitive analysis · Decision dashboard for the President's office"),
      casRes: t("Protection de milliards de dollars de CA · Leadership renforcé · Gestion proactive des campagnes de boycott", "Protection of billions of dollars in revenue · Strengthened leadership · Proactive boycott management"),
      casKPI: t("✓ Position de leader mondial protégée\n✓ 10 ans (2004-2014) de positionnement décrypté", "✓ Global leadership position protected\n✓ 10 years (2004-2014) of positioning decoded"),
      sol: "Competitive Velocity Engine" },
    { id: 5, icon: "🌐", color: "#A0306B", pos: "bottomLeft",
      tag: t("Situation 6 / 8", "Situation 6 / 8"),
      title: t("Déficit d'Influence", "Influence Deficit"),
      sub: t("Quand certains écrivent l'histoire d'autres la subissent. Votre légitimité silencieuse est inefficace.", "When some write history, others endure it. Your silent legitimacy is ineffective."),
      stat: t("85% des normes sont dictées par ceux qui occupent le terrain politique et institutionnel.", "85% of norms are dictated by those occupying the political and institutional field."),
      risques: [
        t("Marginalisation dans votre propre écosystème", "Marginalization in your own ecosystem"),
        t("Perte d'influence dans les arbitrages clés", "Loss of influence in key arbitrations"),
        t("Captation de votre rôle par d'autres acteurs", "Your role captured by other actors"),
        t("Perte de crédibilité auprès des partenaires", "Loss of credibility with partners"),
      ],
      angles: [
        t("Empreinte digitale institutionnelle faible", "Weak institutional digital footprint"),
        t("Positionnement mal perçu dans l'écosystème", "Misperceived positioning in the ecosystem"),
        t("Pas d'architecture pour piloter l'influence", "No architecture to steer influence"),
        t("Communication déconnectée des dynamiques réelles", "Communication disconnected from real dynamics"),
      ],
      casOrg: t("CIDC / OCI (57 pays) et ADD — Agence du Digital", "CIDC / OIC (57 countries) and ADD — Digital Development Agency"),
      casLogos: [cidcLogo, addLogo],
      casInt: t("Diagnostic et positionnement stratégique · Doing Business Platform · Roadmap d'influence · Activation GITEX Africa Morocco", "Diagnosis and strategic positioning · Doing Business Platform · Influence roadmap · GITEX Africa Morocco activation"),
      casRes: t("CIDC repositionné comme hub OCI · ADD pionnier dans l'écosystème digital africain", "CIDC repositioned as an OIC hub · ADD pioneer in the African digital ecosystem"),
      casKPI: t("✓ Rôle institutionnel restructuré\n✓ Influence opérationnelle acquise", "✓ Institutional role restructured\n✓ Operational influence acquired"),
      sol: "Political Intelligence" },
    { id: 6, icon: "🔍", color: "#1A7A4A", pos: "left",
      tag: t("Situation 7 / 8", "Situation 7 / 8"),
      title: t("Risque Invisible", "Invisible Risk"),
      sub: t("Miser sans connaissance profonde : chaque investissement devient une loterie", "Betting without deep knowledge: each investment becomes a lottery"),
      stat: t("70 à 90% des M&A échouent par manque de due diligence (CFA Institute, 2025).", "70 to 90% of M&A deals fail due to lack of due diligence (CFA Institute, 2025)."),
      risques: [
        t("Exposition aux scandales et blacklists", "Exposure to scandals and blacklists"),
        t("Pertes financières par association toxique", "Financial losses through toxic association"),
        t("Réputation dégradée par contamination", "Reputation damaged by contamination"),
        t("Perte de confiance actionnaires et régulateurs", "Loss of trust from shareholders and regulators"),
      ],
      angles: [
        t("Infos critiques enfouies dans des sources disparates", "Critical info buried in scattered sources"),
        t("Investissement sans due diligence systématique", "Investment without systematic due diligence"),
        t("Apparences soignées au lieu de faits vérifiés", "Polished appearances instead of verified facts"),
        t("Coût de l'investigation sous-estimé", "Investigation cost underestimated"),
      ],
      casOrg: t("Société de Capital-Risque — Confidentiel (NDA strict)", "Venture Capital Firm — Confidential (strict NDA)"),
      casLogos: [],
      casInt: t("Deep Due Diligence 3 Niveaux · Screening PEP · Vérifications sanctions ONU OFAC EU · Audit KYC LCB-FT ESG", "3-Level Deep Due Diligence · PEP screening · UN/OFAC/EU sanctions checks · KYC AML-CFT ESG audit"),
      casRes: t("Due diligence complète sur valorisation 400M$ · Points de vigilance identifiés · Partenariat sécurisé", "Complete due diligence on $400M valuation · Watchpoints identified · Partnership secured"),
      casKPI: t("✓ 400M$ sécurisés\n✓ Validation complète avec mapping interactif des risques", "✓ $400M secured\n✓ Full validation with interactive risk mapping"),
      sol: "Deep Due Diligence (3 Levels)" },
    { id: 7, icon: "📡", color: "#C9A84C", pos: "topLeft",
      tag: t("Situation 8 / 8", "Situation 8 / 8"),
      title: t("Gouverner sous Pression", "Governing under Pressure"),
      sub: t("Dans un environnement surexposé ne laissez pas l'émotion dicter vos décisions", "In an over-exposed environment, don't let emotion dictate your decisions"),
      stat: t("Chaque action est observée commentée critiquée et amplifiée. La pression est permanente.", "Every action is observed, commented, criticized and amplified. Pressure is constant."),
      risques: [
        t("Réactions sous pression émotionnelle élevée", "Reactions under high emotional pressure"),
        t("Décisions pour calmer l'opinion plutôt que servir la stratégie", "Decisions to appease opinion rather than serve strategy"),
        t("Perte de contrôle narratif", "Loss of narrative control"),
        t("Affaiblissement de l'autorité décisionnelle", "Weakening of decision-making authority"),
      ],
      angles: [
        t("Confondre visibilité et maîtrise", "Confusing visibility with control"),
        t("Masse de critiques non maîtrisée", "Unmanaged volume of criticism"),
        t("Réagir sans lecture consolidée des dynamiques", "Reacting without a consolidated reading of dynamics"),
        t("Absence de système structuré d'anticipation", "No structured anticipation system"),
      ],
      casOrg: t("Raja Club Athletic — Club historique à forte base populaire", "Raja Club Athletic — Historic club with a strong popular base"),
      casLogos: [rajaLogo],
      casInt: t("Monitoring médiatique structuré · Centralisation des flux d'information · Cartographie des acteurs d'influence · Cellule stratégique interne", "Structured media monitoring · Centralization of information flows · Mapping of influence actors · Internal strategic unit"),
      casRes: t("Cycles de décision réduits · Silos éliminés · Vision consolidée · Pionnier dans le sport marocain", "Decision cycles reduced · Silos eliminated · Consolidated vision · Pioneer in Moroccan sport"),
      casKPI: t("✓ 1er club marocain doté d'une cellule d'intelligence stratégique", "✓ 1st Moroccan club equipped with a strategic intelligence unit"),
      sol: "AI Powered Monitor + Strategic Workflow" },
  ];

  const cur = sel !== null ? TOPICS[sel] : null;
  const nav = (d: number) => sel !== null && setSel((sel + d + 8) % 8);

  return (
    <div style={{ background: "#F2F2F2", minHeight: "100vh", fontFamily: "DM Sans,sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "96px 24px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#C9A84C", borderBottom: "1px solid #C9A84C", display: "inline-block", paddingBottom: 3, marginBottom: 16 }}>
          {t("Diagnostic stratégique", "Strategic Diagnosis")}
        </div>
        <h1 style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 300, color: "#0D1B2A", lineHeight: 1.15, marginBottom: 10 }}>
          {lang === "fr" ? (
            <>Les <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C9A84C" }}>menaces</em> que vous ne voyez pas<br />sont les plus destructrices</>
          ) : (
            <>The <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C9A84C" }}>threats</em> you cannot see<br />are the most destructive</>
          )}
        </h1>
        <p style={{ fontSize: 13.5, color: "#6B7FA0", maxWidth: 520, margin: "0 auto", lineHeight: 1.75, fontStyle: "italic" }}>
          {lang === "fr" ? (
            <>Identifier la nature de votre exposition aux risques est déjà <strong style={{ color: "#C9A84C", fontStyle: "normal" }}>le premier acte de souveraineté décisionnelle.</strong></>
          ) : (
            <>Identifying the nature of your risk exposure is already <strong style={{ color: "#C9A84C", fontStyle: "normal" }}>the first act of decision-making sovereignty.</strong></>
          )}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", maxWidth: 1380, margin: "0 auto", padding: "16px 40px 40px", alignItems: "center" }}>
        <div style={{ paddingRight: 28, paddingTop: 44 }}>
          {!cur && (
            <div>
              <p style={{ fontSize: 12, color: "#6B7FA0", letterSpacing: "0.5px", margin: "0 0 16px 0", fontStyle: "italic" }}>
                {t("Cliquer sur une situation pour explorer le process", "Click a situation to explore the process")}
              </p>
              <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 17, fontStyle: "italic", color: "#0D1B2A", lineHeight: 1.6, borderLeft: "3px solid #C9A84C", paddingLeft: 18, marginBottom: 20 }}>
                {lang === "fr" ? (
                  <>« Les crises ne naissent pas du chaos,<br />mais de l'illusion du contrôle. »</>
                ) : (
                  <>"Crises are not born from chaos,<br />but from the illusion of control."</>
                )}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  t("Attaques informationnelles non détectées", "Undetected informational attacks"),
                  t("Concurrent qui prend de l'avance en silence", "Competitor pulling ahead silently"),
                  t("Crise qui éclate sans protocole de réponse", "Crisis erupting without response protocol"),
                  t("Investissement engagé sans due diligence réelle", "Investment made without real due diligence"),
                  t("Influence qui s'érode sans que personne ne le mesure", "Influence eroding without anyone measuring it"),
                  t("Décisions prises à l'aveugle, sans signal d'alerte", "Decisions made blindly, without alert signals"),
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: 12.5, color: "#6B7FA0", padding: "5px 0 5px 16px", position: "relative", lineHeight: 1.6 }}>
                    <span style={{ position: "absolute", left: 0, top: 12, width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", opacity: 0.55, display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          )}
          {cur && (
            <div style={{ background: "#fff", border: "1px solid #D8E4F0", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(13,27,42,.07)" }}>
              <div style={{ height: 4, background: cur.color }} />
              <div style={{ padding: "22px 26px 26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 9, background: "#F0F7FF", border: "1px solid #D8E4F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0 }}>{cur.icon}</div>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#C9A84C", marginBottom: 2 }}>{cur.tag}</div>
                      <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 20, fontWeight: 700, color: "#0D1B2A", lineHeight: 1.15 }}>{cur.title}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[-1, 1].map(d => <button key={d} onClick={() => nav(d)} style={{ width: 28, height: 28, borderRadius: "50%", background: "#F0F7FF", border: "1px solid #D8E4F0", color: "#0D1B2A", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{d === -1 ? "‹" : "›"}</button>)}
                  </div>
                </div>
                <div style={{ height: 1, background: "#D8E4F0", margin: "14px 0" }} />
                <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 13, fontStyle: "italic", color: "#6B7FA0", borderLeft: "2px solid #C9A84C", paddingLeft: 11, marginBottom: 12, lineHeight: 1.65 }}>{cur.sub}</p>
                <div style={{ background: "#F0F7FF", border: "1px solid #D8E4F0", borderRadius: 7, padding: "11px 14px", fontSize: 12, color: "#2C3E55", lineHeight: 1.65, marginBottom: 14 }}>{cur.stat}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 13 }}>
                  {[{ label: t("Vous risquez", "You risk"), items: cur.risques }, { label: t("Angles morts", "Blind spots"), items: cur.angles }].map(b => (
                    <div key={b.label} style={{ background: "#F0F7FF", border: "1px solid #D8E4F0", borderRadius: 7, padding: "11px 13px" }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#1B3E6A", marginBottom: 7 }}>{b.label}</div>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {b.items.map((item: string, i: number) => (
                          <li key={i} style={{ fontSize: 11, color: "#2C3E55", padding: "2px 0 2px 12px", position: "relative", lineHeight: 1.6 }}>
                            <span style={{ position: "absolute", left: 0, top: 8, width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", opacity: 0.65, display: "inline-block" }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{ border: "1px solid #D8E4F0", borderLeft: "3px solid #1B3E6A", borderRadius: 7, padding: "13px 15px", marginBottom: 13, background: "#FAFCFF", display: "flex", gap: 14, alignItems: "stretch" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#C9A84C", marginBottom: 6 }}>{t("Cas Client Buildfluence", "Buildfluence Client Case")}</div>
                    {(!cur.casLogos || cur.casLogos.length === 0) && (
                      <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 14, fontWeight: 700, color: "#0D1B2A", marginBottom: 9, fontStyle: "italic" }}>{cur.casOrg}</div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                      {[{ label: t("Notre intervention", "Our intervention"), text: cur.casInt }, { label: t("Résultat", "Result"), text: cur.casRes }].map(c => (
                        <div key={c.label}>
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#6B7FA0", marginBottom: 3 }}>{c.label}</div>
                          <div style={{ fontSize: 11, color: "#2C3E55", lineHeight: 1.65 }}>{c.text}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "flex-start", marginTop: 9, background: "rgba(201,168,76,.1)", border: "1px solid rgba(201,168,76,.3)", borderRadius: 8, padding: "5px 11px", fontSize: 10.5, fontWeight: 600, color: "#7A5A00", whiteSpace: "pre-line", lineHeight: 1.5 }}>{cur.casKPI}</div>
                  </div>
                  {cur.casLogos && cur.casLogos.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, flexShrink: 0, width: 90, borderLeft: "1px solid #E5EDF5", paddingLeft: 12 }}>
                      {cur.casLogos.map((logo: string, i: number) => (
                        <img key={i} src={logo} alt="" style={{ maxHeight: 78, maxWidth: 84, width: "auto", height: "auto", objectFit: "contain" }} />
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 13 }}>
                  <span style={{ fontSize: 10, color: "#6B7FA0", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>{t("Solution", "Solution")}</span>
                  <span style={{ fontSize: 10, color: "#6B7FA0", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>Buildfluence</span>
                  <span style={{ background: "#0D1B2A", color: "#fff", fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 4 }}>{cur.sol}</span>
                </div>
                <button onClick={() => setDiagOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0D1B2A", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "9px 18px", borderRadius: 5, border: "none", cursor: "pointer" }}>
                  {t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE")} <span style={{ color: "#C9A84C" }}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "sticky", top: 20 }}>
          <div style={{ width: "83%", maxWidth: 986, margin: 0, marginTop: -40, marginBottom: -40 }}>

            <svg viewBox="80 80 400 400" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
              <defs>
                <radialGradient id="cg2" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#1B478C" />
                  <stop offset="100%" stopColor="#10325F" />
                </radialGradient>
                <clipPath id="lc2"><circle cx="280" cy="280" r="56" /></clipPath>
              </defs>
              <circle cx="280" cy="280" r="148" fill="none" stroke="#D8E4F0" strokeWidth="1" strokeDasharray="3 7" />
              <circle cx="280" cy="280" r="204" fill="none" stroke="#EEF4FB" strokeWidth="1" strokeDasharray="2 10" />
              {TOPICS.map(top => {
                const p = POS[top.pos];
                return <line key={top.id} x1="280" y1="280" x2={p.x} y2={p.y} stroke={sel === top.id ? "#C9A84C" : "#C8D8E8"} strokeWidth={sel === top.id ? 1.5 : 1} strokeDasharray="3 5" opacity={sel === top.id ? 1 : 0.55} />;
              })}
              <circle cx="280" cy="280" r="66" fill="#10325F" stroke="#C9A84C" strokeWidth="1.5" style={{ cursor: "pointer" }} onClick={() => setSel(null)} />
              <circle cx="280" cy="280" r="58" fill="none" stroke="rgba(201,168,76,.2)" strokeWidth="1" />
              <text x="280" y="274" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="700" letterSpacing="2.4" fill="#C9A84C" style={{ textTransform: "uppercase", cursor: "pointer" }} onClick={() => setSel(null)}>
                {t("RISQUES", "INVISIBLE")}
              </text>
              <text x="280" y="294" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="700" letterSpacing="2.4" fill="#C9A84C" style={{ textTransform: "uppercase", cursor: "pointer" }} onClick={() => setSel(null)}>
                {t("INVISIBLES", "RISKS")}
              </text>
              {TOPICS.map(top => {
                const p = POS[top.pos]; const a = sel === top.id;
                const words = top.title.split(" "); const half = Math.ceil(words.length / 2);
                return (
                  <g key={top.id} style={{ cursor: "pointer" }} onClick={() => setSel(top.id)}>
                    <rect x={p.x - 38} y={p.y - 31} width="76" height="62" rx="9" fill={a ? "#E8F2FF" : "white"} stroke={a ? "#1B3E6A" : "#D8E4F0"} strokeWidth={a ? 2 : 1.5} />
                    <rect x={p.x - 38} y={p.y - 31} width="76" height="4" rx="2" fill={top.color} />
                    <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="18">{top.icon}</text>
                    <text x={p.x} y={p.y + 13} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#0D1B2A">{words.slice(0, half).join(" ")}</text>
                    <text x={p.x} y={p.y + 24} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#0D1B2A">{words.slice(half).join(" ")}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
      <FormDiagnostic open={diagOpen} onClose={() => setDiagOpen(false)} situation={cur ? cur.title : ""} />
    </div>
  );
}
