/* ═══════════════════════════════════════════════════════════════════════════
 * SOFTPOWER DATA — Pillar II Soft Power & Influence (English mirror)
 * ═══════════════════════════════════════════════════════════════════════════ */
import type { SourceDetail, DestDetail, Country, Federation, Api, Coop, Logo } from "./softpower";

/* ─── 1. SOURCES BACK-OFFICE + Buildfluence Core ─── */
export const sourcesDataEn: Record<string, SourceDetail> = {
  veille: {
    eyebrow: "Pillar i — Captation",
    title: "Strategic Watch & Intelligence",
    tagline:
      "Real-time capture of weak sectoral, economic and geopolitical signals. Multi-source cross-analysis to anticipate disruptions and detect invisible dynamics.",
    cols: [
      { h: "6 dimensions captured", items: ["Web, media, social networks", "Sectoral databases & patents", "Dark web & deep web", "Key organisations & individuals", "Macroeconomic concepts", "Events & products"] },
      { h: "Processing", items: ["NLP & semantic analysis", "Criticality scoring", "Weak signal detection", "Training, support, change management", "Skills transfer"] },
      { h: "Deliverables", items: ["Structured intelligence reports", "Real-time targeted alerts", "Interactive dashboards", "Benchmarks & studies", "White papers", "Playbooks, etc."] },
    ],
    bfApport:
      "Buildfluence does not deliver raw data. Buildfluence delivers a strategic reading of the present that anticipates the future.",
  },
  ddd: {
    eyebrow: "Pillar ii — Captation",
    title: "Deep Due Diligence",
    tagline:
      "Securing decisions in uncertain environments. In-depth analysis of actors, influence networks and reputational risks before any strategic positioning.",
    cols: [
      { h: "Integrity Check", items: ["Identity verification", "International sanctions screening", "Initial reputation analysis"] },
      { h: "Strategic Risk Profiling", items: ["Capital structure mapping", "Historical litigation & disputes", "Influence network & affiliations"] },
      { h: "Regulatory Compliance", items: ["Targeted field investigation", "Activation of human sources", "Confidential actionable report"] },
    ],
    sources:
      "OFAC · EU Sanctions Map · ICIJ · Cbonds · The Law Society · US DoJ · FATF · Dun & Bradstreet · PitchBook",
    bfApport:
      "Buildfluence identifies the fragility zones and hidden levers that traditional DD approaches never see.",
  },
  bi: {
    eyebrow: "Pillar iii — Captation",
    title: "Business Intelligence",
    tagline:
      "Reading the competition before it imposes itself. Decoding country, sector and competitor strategies to identify high-leverage differentiation axes for attractiveness.",
    cols: [
      { h: "Economic analysis", items: ["Global investment flows", "Fine-grained sectoral dynamics", "Structured competitive benchmarking"] },
      { h: "Premium platforms", items: ["Growth Lab (Harvard)", "Statista, fDi Intelligence", "Factiva — press aggregator", "World Bank, Harvard Kennedy School", "Multi-source cross-analysis"] },
      { h: "Deliverables", items: ["In-depth sectoral studies", "Market mappings", "Comparative attractiveness reports"] },
    ],
    bfApport:
      "Buildfluence converts macro data into micro competitive advantage. Where others describe, Buildfluence prescribes.",
  },
  humint: {
    eyebrow: "Pillar iv — Captation",
    title: "HumInt — Human Intelligence",
    tagline:
      "Activating qualified networks to grasp decision-makers' real intentions. Bringing context, finely reading the balance of power, validating analyses on the ground.",
    cols: [
      { h: "Network of experts", items: ["Dedicated field analysts", "Network of specialised journalists", "Qualified primary sources"] },
      { h: "Added value", items: ["Non-digitised context", "Field verification", "Detection of invisible signals"] },
      { h: "Integration", items: ["Cross-analysis with OSINT", "Hypothesis validation", "Decision enrichment"] },
    ],
    bfApport:
      "OSINT gives the what. HumInt gives the why. Buildfluence orchestrates both to reveal hidden intentions.",
  },
  "bf-core": {
    eyebrow: "Decision-Making Infrastructure",
    title: "Buildfluence: The Central Operator",
    tagline:
      "An architecture designed to turn information into effective decision-making power. Buildfluence does not deliver bulky reports, but a capacity for anticipation and influence.",
    cols: [
      { h: "Captation", items: ["Cross OSINT + HumInt + BI", "Continuously augmented AI", "24/7 multi-source monitoring"] },
      { h: "Transformation", items: ["Go / Watch / No-Go scoring", "Actionable dashboards & DataViz", "Doing Business Platform"] },
      { h: "Diffusion", items: ["Targeted strategic publications", "Orchestrated influence & reach", "Activation of the ecosystem"] },
    ],
    bfApport:
      "See what others do not see. Decide ahead of time. Neutralise invisible risks. Identify the real attractiveness levers. Turn visibility into real influence.",
  },
};

/* ─── 2. DESTINATIONS ECOSYSTEM ─── */
export const destDataEn: Record<string, DestDetail> = {
  amdie: {
    eyebrow: "Ecosystem · Pillar i",
    title: "AMDIE / MICEPP",
    tagline:
      "Mission: Development of investment and exports of products and services in Morocco. Cornerstone of the Kingdom's economic attractiveness.",
    meta: [
      { l: "Investment Charter", v: "2023 Edition" },
      { l: "FDI target 2026", v: "MAD 550 Bn" },
      { l: "Job creation 2026", v: "500,000" },
    ],
    cols: [
      { h: "AMDIE perimeter", items: ["Steering of national attractiveness", "Morocco Now platform — Nation Branding", "Coordination of international missions", "Monitoring of major investment projects"] },
      { h: "Dedicated Buildfluence value", items: ["Tailor-made strategic newsletter", "Permanent Investment Observatory", "Watch on narrative dynamics around foreign companies in Morocco", "Fresh intelligence for Moroccan exporters", "Full sectoral reach"] },
    ],
    bfApport:
      "Turning Morocco Now from a communication campaign into a sovereign influence infrastructure, continuously fed by the Buildfluence mechanism.",
  },
  gouv: {
    eyebrow: "Ecosystem · Pillar ii",
    title: "Moroccan Government",
    tagline:
      "State agencies, public bodies, Regional Investment Centres. The institutional fabric that drives the Kingdom's public policies.",
    cols: [
      { h: "Perimeter", items: ["Sectoral ministries & agencies", "Public steering bodies", "12 CRIs — Regional Investment Centres", "Advisory councils & bodies"] },
      { h: "Buildfluence value", items: ["Steering with strategic lead time", "Continuous regulatory anticipation", "Dedicated territorial intelligence", "Regional competitiveness watch", "Doing Business monitoring for Morocco"] },
    ],
    bfApport:
      "In constrained environments, decision quality becomes a sovereignty lever. Buildfluence structures anticipation, arbitration and influence capacities at the heart of public action.",
  },
  medias: {
    eyebrow: "Ecosystem · Pillar viii",
    title: "Media & Prescribers",
    tagline:
      "Opinion leaders, qualified diaspora, specialised journalists. The narrative amplification layer that makes decisions visible and desirable.",
    cols: [
      { h: "Influence targets", items: ["Sectoral opinion leaders", "Qualified Moroccan diaspora abroad", "Specialised economic journalists", "Think tanks & expert circles"] },
      { h: "Activation strategy", items: ["Positioning as a source of authority", "Production of exclusive content", "Targeted and orchestrated speaking engagements", "Long-term mastery of the narrative"] },
    ],
    bfApport:
      "Credibility cannot be improvised. Buildfluence builds for you a constant media presence that turns visibility into lasting influence.",
  },
};

/* ─── 3. COUNTRIES (28) ─── */
export const countriesEn: Record<string, Country> = {
  FR: { flag: "🇫🇷", name: "France", category: "Key Country", isKey: true,
    sectors: "Automotive · Aerospace · Energy · Agri-food",
    description: "Morocco's leading commercial partner and historic investor. Strategic relationship consolidated by structuring bilateral agreements.",
    opportunities: ["Mapping of French decision-makers influencing FDI flows to Morocco","Watch on media narratives about Morocco's attractiveness in France","Intelligence on employer federations (MEDEF, AFEP)","Monitoring of political decisions impacting trade agreements","Identification of influence opportunities in French economic media"],
    bfApport: "Turning the historic relationship into a renewed competitive advantage. Buildfluence detects emerging decision-makers that classic diplomats do not see." },
  DE: { flag: "🇩🇪", name: "Germany", category: "Key Country", isKey: true,
    sectors: "Automotive industry · Chemicals · Green energy",
    description: "Morocco's second European partner. Strong industrial presence and growing interest in Moroccan renewable energy.",
    opportunities: ["Watch on German FDI flows to North Africa","Mapping of major industrial groups (BMW, Siemens, BASF)","Monitoring of the German-Moroccan Chamber of Commerce stance","Intelligence on GIZ programmes active in Morocco","Identification of German economic influencers"],
    bfApport: "German industry is looking for its Mediterranean hub. Buildfluence puts Morocco on the strategic radar of Mittelstand and conglomerates." },
  US: { flag: "🇺🇸", name: "United States", category: "Key Country", isKey: true,
    sectors: "Tech · Finance · Defense · Agribusiness",
    description: "Strategic ally of Morocco with a Free Trade Agreement unique in Africa. Defense partnership and growing technological cooperation.",
    opportunities: ["Watch on the Morocco-US Free Trade Agreement","Mapping of think tanks and lobbies influencing US policy in the Maghreb","Monitoring of major agencies (USAID, MCC, DFC)","Intelligence on US Congress decision-makers on Morocco-Sahara files","Influence opportunities in US economic media"],
    bfApport: "Morocco enjoys a unique position in Africa vis-à-vis the US. Buildfluence converts this diplomatic advantage into concrete investment flows." },
  GB: { flag: "🇬🇧", name: "United Kingdom", category: "Key Country", isKey: true,
    sectors: "Finance · Services · Energy · Agri-food",
    description: "Historic partner with a post-Brexit trade agreement. Morocco positions itself as the gateway to Africa for British companies.",
    opportunities: ["Post-Brexit watch on Morocco-UK commercial opportunities","Mapping of British investment funds active in Africa","Monitoring of UK-Morocco partnership agreements","Intelligence on FCDO decision-makers","Media opportunities in the British economic press"],
    bfApport: "Brexit reshuffled the cards. Buildfluence helps Morocco become the preferred African partner of the new United Kingdom." },
  JP: { flag: "🇯🇵", name: "Japan", category: "Key Country", isKey: true,
    sectors: "Automotive · Robotics · Energy · Chemicals",
    description: "First-rate technological partner. JICA cooperation finances major infrastructure projects. Growing interest in phosphates and green energy.",
    opportunities: ["Watch on JICA and JETRO investment strategies","Mapping of Japanese industrial groups (Toyota, Sumitomo)","Intelligence on access to African raw materials","Monitoring of Japanese diplomatic opportunities in Africa","Identification of Japanese influencers on Morocco"],
    bfApport: "Japan decides slowly but invests massively. Buildfluence calibrates approaches to Japanese tempo to turn interest into commitment." },
  CN: { flag: "🇨🇳", name: "China", category: "Key Country", isKey: true,
    sectors: "Infrastructure · Digital · Energy · Industry",
    description: "Massive investor in African infrastructure. China is developing a growing industrial and diplomatic presence in Morocco within the Belt & Road framework.",
    opportunities: ["Watch on Chinese investments (Belt & Road) in Morocco","Due Diligence of active Chinese partners and companies","Mapping of Chinese influence actors (media, think tanks, embassy)","Intelligence on Chinese geopolitical narratives on the Sahara issue","Monitoring of Chinese FDI flows — opportunities and risks"],
    bfApport: "Chinese investment brings capital and risk. Buildfluence separates structuring opportunities from weakening partnerships." },
  BE: { flag: "🇧🇪", name: "Belgium", category: "Key Country", isKey: true,
    sectors: "Logistics · Pharmaceuticals · Finance · Agri-food",
    description: "Gateway to European institutions. Strong Moroccan diaspora. Key European logistics and financial hub for Moroccan exporters.",
    opportunities: ["Watch on European decisions via Brussels","Mapping of European institutions influencing Morocco-EU relations","Intelligence on lobbies and NGOs active in Brussels","Identification of Belgian-European decision-makers favourable to the Morocco-EU partnership","Monitoring of Belgian media narratives"],
    bfApport: "Brussels is the epicentre of European regulation. Buildfluence turns the Moroccan diaspora into an operational influence network." },
  NL: { flag: "🇳🇱", name: "Netherlands", category: "Key Country", isKey: true,
    sectors: "Logistics · Agri-industry · Technology · Finance",
    description: "European logistics hub via Rotterdam. Strong tradition of international investment. Interest in Moroccan agricultural exports and logistics.",
    opportunities: ["Watch on commercial and logistics flows via Rotterdam","Mapping of Dutch investment funds in Africa","Intelligence on Dutch companies (Shell, Philips, ASML)","Monitoring of decisions by the NL-Morocco Chamber of Commerce","Influence opportunities in Dutch economic media"],
    bfApport: "The Netherlands sees Africa as a market. Buildfluence positions Morocco as the privileged logistics bridgehead." },
  ES: { flag: "🇪🇸", name: "Spain", category: "Key Country", isKey: true,
    sectors: "Tourism · Energy · Agri-food · Construction",
    description: "Geographical neighbour and leading proximity trading partner. Complex but complementary relations. Natural gateway to Europe for Moroccan exports.",
    opportunities: ["Watch on tensions and opportunities in the bilateral relationship","Mapping of Spanish groups (Inditex, Iberdrola, Telefónica)","Intelligence on Spanish positions on the Moroccan Sahara","Monitoring of Spanish media narratives on Morocco","Identification of pro-Morocco Spanish economic influencers"],
    bfApport: "Geographic proximity masks political complexity. Buildfluence reads the Madrid–Rabat subtexts that classical diplomacy keeps silent." },
  KR: { flag: "🇰🇷", name: "South Korea", category: "Key Country", isKey: true,
    sectors: "Automotive · Electronics · Energy · Chemicals",
    description: "Industrial and technological power in strong international growth. Strategic interest in Moroccan raw materials (phosphates, cobalt) and industrial zones.",
    opportunities: ["Watch on Korean investment strategies in North Africa","Mapping of Chaebols (Samsung, Hyundai, LG, POSCO)","Intelligence on Korea-Morocco cooperation agreements","Monitoring of opportunities in the K-Africa strategy","Identification of Korean decision-makers driving investments"],
    bfApport: "Chaebols decide in closed circuits. Buildfluence maps these circuits and injects Morocco as a priority option." },

  // ═══ 18 COMPETITORS ═══
  BG: { flag: "🇧🇬", name: "Bulgaria", category: "Competitor", isKey: false, score: 4, sectors: "Automotive · Textile · IT", description: "EU member with low costs, attractive for European relocations." },
  EG: { flag: "🇪🇬", name: "Egypt", category: "Competitor", isKey: false, score: 6, sectors: "Textile · Agri-food · Energy", description: "Large domestic market and strategic position on the Suez Canal." },
  CL: { flag: "🇨🇱", name: "Chile", category: "Competitor", isKey: false, score: 5, sectors: "Mining · Green energy · Agri-food", description: "South American leader in economic stability and free trade agreements." },
  HU: { flag: "🇭🇺", name: "Hungary", category: "Competitor", isKey: false, score: 5, sectors: "Automotive · Electronics · Pharma", description: "European manufacturing hub with strong Asian FDI presence." },
  KE: { flag: "🇰🇪", name: "Kenya", category: "Competitor", isKey: false, score: 4, sectors: "Tech · Agri · Financial services", description: "Technology and financial hub of East Africa." },
  LT: { flag: "🇱🇹", name: "Lithuania", category: "Competitor", isKey: false, score: 4, sectors: "Fintech · IT · Logistics", description: "Emerging EU fintech centre with a skilled workforce." },
  MX: { flag: "🇲🇽", name: "Mexico", category: "Competitor", isKey: false, score: 7, sectors: "Automotive · Aerospace · Agri-food", description: "Privileged access to the North American market via USMCA." },
  PL: { flag: "🇵🇱", name: "Poland", category: "Competitor", isKey: false, score: 6, sectors: "Automotive · IT · BPO", description: "Largest economy in Central Europe, strong FDI growth." },
  RW: { flag: "🇷🇼", name: "Rwanda", category: "Competitor", isKey: false, score: 3, sectors: "Tech · Tourism · Services", description: "African governance model, attractive for startups." },
  CZ: { flag: "🇨🇿", name: "Czech Republic", category: "Competitor", isKey: false, score: 6, sectors: "Automotive · Industry · R&D", description: "Mature industrial base at the heart of Europe." },
  SN: { flag: "🇸🇳", name: "Senegal", category: "Competitor", isKey: false, score: 4, sectors: "Agri · Fishing · Energy", description: "Gateway to Francophone West Africa." },
  SK: { flag: "🇸🇰", name: "Slovakia", category: "Competitor", isKey: false, score: 5, sectors: "Automotive · Electronics", description: "World's leading car producer per capita." },
  TH: { flag: "🇹🇭", name: "Thailand", category: "Competitor", isKey: false, score: 6, sectors: "Automotive · Electronics · Tourism", description: "ASEAN manufacturing hub with developed infrastructure." },
  TN: { flag: "🇹🇳", name: "Tunisia", category: "Competitor", isKey: false, score: 7, sectors: "Textile · Aerospace · IT · Automotive", description: "Direct competitor of Morocco on European markets." },
  TR: { flag: "🇹🇷", name: "Turkey", category: "Competitor", isKey: false, score: 8, sectors: "Automotive · Textile · Construction · Defense", description: "Regional industrial power with access to EU and Middle East markets." },
  VN: { flag: "🇻🇳", name: "Vietnam", category: "Competitor", isKey: false, score: 7, sectors: "Textile · Electronics · Agri", description: "Preferred destination for relocations from China." },
  ZA: { flag: "🇿🇦", name: "South Africa", category: "Competitor", isKey: false, score: 6, sectors: "Mining · Finance · Automotive", description: "Africa's leading industrialised economy." },
  IN: { flag: "🇮🇳", name: "India", category: "Competitor", isKey: false, score: 8, sectors: "IT · Pharma · Automotive · Textile", description: "Demographic and technological giant in strong growth." },
};

export function getCompetitorBfApportEn(score: number): string {
  if (score >= 8) return "Direct competitor at the top. Buildfluence delivers a fine analysis of its hidden weaknesses and the sectors where Morocco can take the lead.";
  if (score >= 7) return "Aggressive competitor on the same markets as Morocco. Buildfluence identifies investors targeted simultaneously and calibrates counter-offensives.";
  if (score >= 5) return "Solid but not insurmountable competitor. Buildfluence maps its fragility points to reposition Morocco as a credible alternative.";
  return "Emerging competitor to watch. Buildfluence anticipates its rise to preserve Morocco's competitive advantage.";
}

export const competitorOpportunitiesEn = [
  "Comparative analysis of Morocco's strengths vs this competitor",
  "Identification of sectors where Morocco can regain the advantage",
  "Watch on this competitor's attractiveness strategies",
  "Intelligence on simultaneously-targeted investors",
  "Recommendations to strengthen Moroccan competitive positioning",
];

/* ─── 4. FEDERATIONS (7) ─── */
export const fedDataEn: Record<string, Federation> = {
  cgem: { full: "General Confederation of Moroccan Enterprises", role: "Morocco's leading employer organisation · Cross-cutting representation", apport: "Buildfluence feeds CGEM with shared sectoral intelligence to position Moroccan employers in public arbitrations." },
  asmex: { full: "Moroccan Association of Exporters", role: "Representation of exporters · International promotion", apport: "Fresh intelligence on target markets, watch on emerging tariff barriers, identification of sectoral opportunities." },
  amica: { full: "Moroccan Association for the Automotive Industry & Trade", role: "Moroccan automotive sector · 220+ suppliers", apport: "Watch on European and Asian carmaker strategies, anticipation of relocations, mapping of purchasing decision-makers." },
  amip: { full: "Moroccan Association of the Pharmaceutical Industry", role: "Drug industry · Health sovereignty", apport: "Intelligence on global pharmaceutical flows, AFCRMP regulatory watch, monitoring of international tenders." },
  amith: { full: "Moroccan Association of Textile and Clothing Industries", role: "Textile sector · Export Europe & Africa", apport: "Continuous Tunisia/Vietnam/Turkey competitive benchmark, watch on responsible-purchasing policies of European principals." },
  cnt: { full: "National Tourism Council", role: "Steering of the national tourism strategy", apport: "Watch on global tourism trends, analysis of competing strategies (Egypt, Tunisia, Turkey), monitoring of Morocco's international perception." },
  fenagri: { full: "National Agri-food Federation", role: "Agri-food industry · Food security", apport: "Intelligence on global agricultural value chains, watch on export opportunities in Africa, monitoring of EU sanitary barriers." },
};

/* ─── 5. API (9) ─── */
export const apiDataEn: Record<string, Api> = {
  investhk: { full: "InvestHK", country: "🇭🇰 Hong Kong", apport: "Hong Kong excels at capturing regional headquarters. Buildfluence decodes its method to adapt the model to Morocco." },
  edbsg: { full: "Economic Development Board Singapore", country: "🇸🇬 Singapore", apport: "Singapore is the global benchmark for FDI attractiveness. Buildfluence delivers the playbooks Singapore does not share publicly." },
  apexbrasil: { full: "Apex-Brasil", country: "🇧🇷 Brazil", apport: "Apex-Brasil massively mobilises the diaspora for exports. Buildfluence transposes the method to the Moroccan diaspora." },
  investlt: { full: "Invest Lithuania", country: "🇱🇹 Lithuania", apport: "Lithuania attracts fintech with limited resources. A case study in operational efficiency for Morocco." },
  investmx: { full: "Invest Mexico", country: "🇲🇽 Mexico", apport: "Mexico capitalises on USMCA. Buildfluence analyses how Morocco can activate the same lever with AGOA and the EU." },
  investvn: { full: "Invest Vietnam", country: "🇻🇳 Vietnam", apport: "Vietnam has become the alternative value chain to China. Buildfluence delivers the lessons for North Africa." },
  investcl: { full: "InvestChile", country: "🇨🇱 Chile", apport: "Chile structured its promotion around institutional stability. A reference for Morocco's attractiveness communication." },
  investsa: { full: "Trade & Investment South Africa", country: "🇿🇦 South Africa", apport: "South Africa remains the gateway to Africa for many. Buildfluence positions Morocco as a credible alternative." },
  czechinvest: { full: "CzechInvest", country: "🇨🇿 Czech Republic", apport: "CzechInvest turned a post-communist country into an EU industrial hub. A model of accelerated industrialisation." },
};

/* ─── 6. COOP (9) ─── */
export const coopDataEn: Record<string, Coop> = {
  giz: { full: "Deutsche Gesellschaft für Internationale Zusammenarbeit", country: "🇩🇪 Germany", apport: "GIZ massively funds the energy transition in Morocco. Buildfluence maps programmes aligned with your strategy." },
  afd: { full: "French Development Agency", country: "🇫🇷 France", apport: "AFD is Morocco's historic donor. Buildfluence identifies active windows and co-financing opportunities." },
  jica: { full: "Japan International Cooperation Agency", country: "🇯🇵 Japan", apport: "JICA finances large-scale infrastructure (HSR, ports). Buildfluence anticipates the next major eligible projects." },
  bei: { full: "European Investment Bank", country: "🇪🇺 European Union", apport: "EIB co-finances green and industrial projects. Buildfluence connects your projects to the most relevant EIB instruments." },
  pnud: { full: "United Nations Development Programme", country: "🇺🇳 UN", apport: "UNDP drives the 2030 agenda in Morocco. Buildfluence aligns your initiatives on SDG priorities to secure co-financing." },
  bm: { full: "World Bank", country: "🌍 International", apport: "The World Bank produces Doing Business and finances reforms. Buildfluence anticipates upcoming rankings and priority themes." },
  berd: { full: "European Bank for Reconstruction and Development", country: "🇪🇺 Europe", apport: "EBRD finances the private sector. Buildfluence identifies financing windows suited to Moroccan SMEs and mid-caps." },
  isdb: { full: "Islamic Development Bank", country: "🕌 OIC", apport: "IsDB finances Muslim countries. Buildfluence activates this often-underused lever for strategic projects." },
  bad: { full: "African Development Bank", country: "🌍 Africa", apport: "AfDB is the pan-African development instrument. Buildfluence positions Morocco as the privileged hub for continental financing." },
};

/* ─── 7. AMDIE LOGOS ─── */
export const logoDataEn: Record<string, Logo> = {
  amdie: { name: "AMDIE", full: "Moroccan Agency for the Development of Investments and Exports", apport: "Buildfluence is positioned as a strategic intelligence partner to turn AMDIE into a globalised attractiveness operator." },
  micepp: { name: "MICEPP", full: "Ministry of Industry, Trade and Small and Medium Enterprises and the Economy", apport: "Buildfluence supports MICEPP with a continuous reading of global industrial dynamics to calibrate national strategy." },
  moroccoNow: { name: "Morocco Now", full: "Nation Branding Platform · International attractiveness campaign", apport: "Buildfluence turns Morocco Now from a marketing campaign into a sovereign influence infrastructure, fed by the full mechanism." },
};
