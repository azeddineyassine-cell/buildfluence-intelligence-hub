import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

// ─── Segment Data ─────────────────────────────────────────────────────────────

interface Segment {
  id: number;
  label: string;
  sub: string;
  icon: string;
  iconLabel: string;
  bg: string;
  activeBg: string;
  arrow: string;
  panelTitle: string;
  panelDesc: string;
  badgeDest: string;
  badgeColor: string;
  cards: { tag: string; tagColor: string; title: string; desc: string; highlight: string }[];
}

function getSegments(t: (fr: string, en: string) => string): Segment[] {
  return [
    {
      id: 0,
      label: t("Instantané", "Instant"),
      sub: t("Interne", "Internal"),
      icon: "⚡",
      iconLabel: "⚡",
      bg: "#4a4a5a",
      activeBg: "#6a6a8a",
      arrow: "#4a4a5a",
      panelTitle: t("Alertes Stratégiques", "Strategic Alerts"),
      panelDesc: t(
        "Diffusion d'information stratégique urgente en temps réel : signaux faibles, ruptures, crises émergentes.",
        "Real-time urgent strategic information: weak signals, disruptions, emerging crises."
      ),
      badgeDest: t("INTERNE", "INTERNAL"),
      badgeColor: "#4a4a5a",
      cards: [
        {
          tag: t("Format : Dashboard live", "Format: Live Dashboard"),
          tagColor: "#4a4a5a",
          title: t("Système d'alerte temps réel", "Real-time alert system"),
          desc: t(
            "Déclenchement immédiat sur signaux faibles critiques. Notification directe aux décideurs concernés. Fiche de synthèse Go / Vigilance / No-Go.",
            "Immediate trigger on critical weak signals. Direct notification to relevant decision-makers. Go / Vigilance / No-Go summary sheet."
          ),
          highlight: t("Zéro délai entre le signal et la décision.", "Zero delay between signal and decision."),
        },
        {
          tag: t("Destinataires", "Recipients"),
          tagColor: "#4a4a5a",
          title: t("Direction Générale & C-Level", "General Management & C-Level"),
          desc: t(
            "Flux réservé aux décideurs stratégiques. Diffusion sécurisée, confidentielle, avec traçabilité des lectures.",
            "Flow reserved for strategic decision-makers. Secure, confidential distribution with read traceability."
          ),
          highlight: t("Infrastructure souveraine : niveau État.", "Sovereign infrastructure: State level."),
        },
      ],
    },
    {
      id: 1,
      label: t("Hebdomadaire", "Weekly"),
      sub: t("Interne", "Internal"),
      icon: "📊",
      iconLabel: "📊",
      bg: "#1a6b5a",
      activeBg: "#25907a",
      arrow: "#1a6b5a",
      panelTitle: t("Publications Hebdomadaires", "Weekly Publications"),
      panelDesc: t(
        "Trois formats complémentaires pour alimenter la prise de décision chaque semaine sans surcharge informationnelle.",
        "Three complementary formats to feed decision-making every week without information overload."
      ),
      badgeDest: t("INTERNE", "INTERNAL"),
      badgeColor: "#1a6b5a",
      cards: [
        {
          tag: "Dashboards DG",
          tagColor: "#1a6b5a",
          title: t("Tableau de bord décisionnel", "Decision-making dashboard"),
          desc: t(
            "Synthèse visuelle de l'environnement concurrentiel, géopolitique et réputationnel. KPIs en temps réel. DataViz actionnables.",
            "Visual synthesis of competitive, geopolitical and reputational environment. Real-time KPIs. Actionable DataViz."
          ),
          highlight: t("Un outil d'aide à la prise de décision, pas un rapport.", "A decision-making tool, not a report."),
        },
        {
          tag: "Newsletter Business",
          tagColor: "#1a6b5a",
          title: t("Intelligence sectorielle ciblée", "Targeted sector intelligence"),
          desc: t(
            "Tendances émergentes, marché, technologie, innovation, concurrence, réputation, événements clés de la semaine.",
            "Emerging trends, market, technology, innovation, competition, reputation, key events of the week."
          ),
          highlight: t("Renforcer la culture décisionnelle interne.", "Strengthen internal decision-making culture."),
        },
        {
          tag: t("Veille Réglementaire", "Regulatory Watch"),
          tagColor: "#1a6b5a",
          title: t("Suivi législatif & normatif", "Legislative & regulatory monitoring"),
          desc: t(
            "Dernières évolutions et publications réglementaires issues de l'OMC, institutions nationales et internationales. Analyse d'impact immédiat.",
            "Latest regulatory developments from WTO, national and international institutions. Immediate impact analysis."
          ),
          highlight: t("Anticiper avant que la règle s'impose.", "Anticipate before the rule imposes itself."),
        },
      ],
    },
    {
      id: 2,
      label: t("Mensuel", "Monthly"),
      sub: t("Écosystème externe", "External ecosystem"),
      icon: "📰",
      iconLabel: "📰",
      bg: "#1a5580",
      activeBg: "#2070a8",
      arrow: "#1a5580",
      panelTitle: t("Publications Mensuelles", "Monthly Publications"),
      panelDesc: t(
        "Rayonnement vers l'écosystème externe : partenaires, prescripteurs, Leaders d'Opinion et acteurs clés de l'influence sectorielle.",
        "Outreach to external ecosystem: partners, prescribers, Opinion Leaders and key sector influence actors."
      ),
      badgeDest: t("EXTERNE", "EXTERNAL"),
      badgeColor: "#1a5580",
      cards: [
        {
          tag: "MDM Info",
          tagColor: "#1a5580",
          title: t("Marocains Du Monde", "Moroccans of the World"),
          desc: t(
            "Renforcer les liens avec les prescripteurs, partenaires, Leaders d'Opinion, Diaspora Marocaine et acteurs clés internationaux. Lettre d'information ciblée.",
            "Strengthen links with prescribers, partners, Opinion Leaders, Moroccan Diaspora and key international actors. Targeted newsletter."
          ),
          highlight: t("Transformer la diaspora en levier d'influence.", "Transform the diaspora into an influence lever."),
        },
        {
          tag: "Business News",
          tagColor: "#1a5580",
          title: t("Magazine sectoriel externe", "External sector magazine"),
          desc: t(
            "Analyses approfondies des thématiques de votre activité. Positionnement comme source d'autorité auprès de vos parties prenantes.",
            "In-depth analysis of your business topics. Positioning as an authority source with your stakeholders."
          ),
          highlight: t("Renforcer la visibilité et la crédibilité de votre marque.", "Strengthen your brand's visibility and credibility."),
        },
      ],
    },
    {
      id: 3,
      label: t("Trimestriel", "Quarterly"),
      sub: t("National / International", "National / International"),
      icon: "📈",
      iconLabel: "📈",
      bg: "#4a3580",
      activeBg: "#6045a8",
      arrow: "#4a3580",
      panelTitle: t("Publications Trimestrielles", "Quarterly Publications"),
      panelDesc: t(
        "Diffusion large à haute valeur institutionnelle : investisseurs, fédérations, instances publiques, médias spécialisés.",
        "Wide distribution with high institutional value: investors, federations, public bodies, specialized media."
      ),
      badgeDest: t("NATIONAL / INTERNATIONAL", "NATIONAL / INTERNATIONAL"),
      badgeColor: "#4a3580",
      cards: [
        {
          tag: t("Études Sectorielles", "Sector Studies"),
          tagColor: "#4a3580",
          title: t("Benchmark & Intelligence de marché", "Benchmark & Market Intelligence"),
          desc: t(
            "Cartographie des secteurs stratégiques. Analyse des pays concurrents et pays cibles. Flux d'investissement et dynamiques concurrentielles.",
            "Mapping of strategic sectors. Analysis of competitor and target countries. Investment flows and competitive dynamics."
          ),
          highlight: t("Positionner votre organisation comme référence sectorielle.", "Position your organization as a sector reference."),
        },
        {
          tag: t("Baromètre", "Barometer"),
          tagColor: "#4a3580",
          title: t("Indicateurs de compétitivité", "Competitiveness indicators"),
          desc: t(
            "Mise en lumière de votre expertise et vos atouts. Suivi de la perception nationale et internationale. Scoring d'attractivité comparatif.",
            "Highlighting your expertise and assets. National and international perception tracking. Comparative attractiveness scoring."
          ),
          highlight: t("Votre voix dans le débat économique national.", "Your voice in the national economic debate."),
        },
      ],
    },
    {
      id: 4,
      label: t("Annuel", "Annual"),
      sub: t("National / International", "National / International"),
      icon: "📗",
      iconLabel: "📗",
      bg: "#7a3060",
      activeBg: "#a04080",
      arrow: "#7a3060",
      panelTitle: t("Publications Annuelles", "Annual Publications"),
      panelDesc: t(
        "Publications de référence à fort impact institutionnel : rapport d'autorité, livre blanc, rapport d'activité annuel.",
        "Reference publications with high institutional impact: authority report, white paper, annual activity report."
      ),
      badgeDest: t("NATIONAL / INTERNATIONAL", "NATIONAL / INTERNATIONAL"),
      badgeColor: "#7a3060",
      cards: [
        {
          tag: t("Livre Blanc", "White Paper"),
          tagColor: "#7a3060",
          title: t("Rapport d'autorité sectorielle", "Sector authority report"),
          desc: t(
            "Rapport annuel portant des recommandations sur les enjeux économiques et d'investissement. Diffusion ciblée aux décideurs institutionnels.",
            "Annual report with recommendations on economic and investment issues. Targeted distribution to institutional decision-makers."
          ),
          highlight: t("Positionnez-vous comme expert et influent dans votre secteur.", "Position yourself as an expert and influential in your sector."),
        },
        {
          tag: t("Rapport d'Activité Annuelle", "Annual Activity Report"),
          tagColor: "#7a3060",
          title: t("Bilan & Perspectives", "Review & Outlook"),
          desc: t(
            "Synthèse des réalisations, impact économique, KPIs clés. Interlocuteur transparent pour les décideurs institutionnels et partenaires stratégiques.",
            "Summary of achievements, economic impact, key KPIs. Transparent interlocutor for institutional decision-makers and strategic partners."
          ),
          highlight: t("L'influence se construit sur la durée, pas sur l'événement.", "Influence is built over time, not on events."),
        },
      ],
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LegitimationDurable() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const segments = getSegments(t);
  const current = segments[active];

  const goNext = useCallback(() => setActive((p) => Math.min(p + 1, 4)), []);
  const goPrev = useCallback(() => setActive((p) => Math.max(p - 1, 0)), []);

  return (
    <section className="w-full py-10" style={{ background: "#F0F7FF" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "#0D1B2A", letterSpacing: "-0.5px" }}>
            {t("Dispositif de Légitimation Durable", "Sustainable Legitimation Framework")}
          </h2>
          <p className="mt-3 text-sm md:text-base max-w-[680px] mx-auto leading-relaxed" style={{ color: "#6b7c93" }}>
            {t(
              "Structurer, rythmer et contrôler votre narratif pour sceller durablement votre légitimité auprès des décideurs clés.",
              "Structure, pace and control your narrative to durably seal your legitimacy with key decision-makers."
            )}
          </p>
          <p className="mt-3 text-sm font-semibold" style={{ color: "#C9A84C" }}>
            {t("L'influence ne se décrète pas. Elle se construit dans le temps long.", "Influence is not decreed. It is built over the long term.")}
          </p>

          {/* Principe */}
          <div
            className="mt-5 max-w-[720px] mx-auto text-left text-sm italic leading-relaxed rounded-r-lg"
            style={{
              borderLeft: "3px solid #C9A84C",
              padding: "14px 20px",
              background: "rgba(201,168,76,0.06)",
              color: "#4a5568",
            }}
          >
            «&nbsp;{t(
              "La légitimité ne repose ni sur des actions isolées, ni sur des campagnes ponctuelles.",
              "Legitimacy is based neither on isolated actions nor on one-off campaigns."
            )}{" "}
            <strong className="not-italic" style={{ color: "#0D1B2A" }}>
              {t(
                "Elle résulte d'un dispositif structuré, combinant production du contenu, diffusion ciblée et maîtrise des temporalités d'influence.",
                "It results from a structured framework combining content production, targeted distribution and mastery of influence timelines."
              )}
            </strong>{" "}
            {t(
              "Le but est de transformer la visibilité en autorité, puis en ",
              "The goal is to transform visibility into authority, then into "
            )}
            <em style={{ color: "#C9A84C" }}>{t("pouvoir de décision", "decision-making power")}</em>.&nbsp;»
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs tracking-widest mb-4" style={{ color: "#8899aa" }}>
          ▸ {t("Cliquez sur chaque segment pour explorer les publications", "Click each segment to explore publications")}
        </p>

        {/* Icons Row */}
        <div className="grid grid-cols-5 max-w-[1400px] mx-auto mb-1.5 px-0" style={{ gridTemplateColumns: "1fr 1.2fr 1.2fr 1.2fr 1.3fr" }}>
          {segments.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1">
              <span className="text-2xl leading-none">{s.icon}</span>
            </div>
          ))}
        </div>

        {/* Timeline Track */}
        <div
          className="grid h-16 rounded-lg overflow-hidden mb-8 cursor-pointer"
          style={{ gridTemplateColumns: "1fr 1.2fr 1.2fr 1.2fr 1.3fr" }}
        >
          {segments.map((s, i) => (
            <div
              key={s.id}
              className="flex flex-col items-center justify-center relative transition-all duration-200"
              style={{ background: active === i ? s.activeBg : s.bg }}
              onClick={() => setActive(i)}
            >
              <span className="text-[15px] font-bold tracking-wide uppercase text-white">{s.label}</span>
              <span className="text-[9px] tracking-widest uppercase text-white/80 mt-0.5">{s.sub}</span>
              {i < 4 && (
                <span
                  className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-10"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "32px solid transparent",
                    borderBottom: "32px solid transparent",
                    borderLeft: `14px solid ${active === i ? s.activeBg : s.bg}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mb-6">
          {segments.map((s, i) => (
            <button
              key={s.id}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background: active === i ? "#C9A84C" : "rgba(13,27,42,0.15)",
                transform: active === i ? "scale(1.3)" : "scale(1)",
              }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-4 p-5 rounded-xl border mb-5" style={{ borderColor: "rgba(13,27,42,0.1)", background: "#fff" }}>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: current.bg + "22" }}
              >
                {current.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#0D1B2A" }}>
                  {current.panelTitle}
                  <span
                    className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded-full ml-3 align-middle"
                    style={{ background: current.badgeColor + "18", color: current.badgeColor }}
                  >
                    {current.badgeDest}
                  </span>
                </h3>
                <p className="text-[13px] mt-1 leading-relaxed" style={{ color: "#6b7c93" }}>{current.panelDesc}</p>
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {current.cards.map((card, ci) => (
                <div
                  key={ci}
                  className="rounded-xl border p-5 transition-all duration-200 hover:shadow-lg"
                  style={{ background: "#fff", borderColor: "rgba(13,27,42,0.08)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(13,27,42,0.08)";
                  }}
                >
                  <p className="text-[10px] tracking-widest uppercase font-semibold mb-2.5" style={{ color: card.tagColor }}>
                    {card.tag}
                  </p>
                  <h4 className="text-[15px] font-bold mb-2" style={{ color: "#0D1B2A" }}>{card.title}</h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#6b7c93" }}>{card.desc}</p>
                  <span className="block mt-2.5 text-[13px] italic" style={{ color: "#C9A84C" }}>{card.highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="flex justify-center gap-4 mt-7">
          <button
            onClick={goPrev}
            disabled={active === 0}
            className="px-6 py-2.5 rounded-lg border text-sm transition-colors disabled:opacity-40"
            style={{ borderColor: "rgba(13,27,42,0.15)", color: "#0D1B2A", background: "#fff" }}
          >
            ← {t("Précédent", "Previous")}
          </button>
          <button
            onClick={goNext}
            disabled={active === 4}
            className="px-6 py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-40"
            style={{ background: "#C9A84C", color: "#0D1B2A" }}
          >
            {t("Suivant", "Next")} →
          </button>
        </div>
      </div>
    </section>
  );
}
