import { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import logoCentraleDanone from "@/assets/clients/centrale-danone.jpg";
import logoCidc from "@/assets/clients/cidc.jpg";
import logoMinistereSante from "@/assets/clients/ministere-sante.jpg";
import logoGinger from "@/assets/clients/ginger-international.jpg";
import logoRaja from "@/assets/clients/raja-club-athletic.jpg";
import logoOcp from "@/assets/clients/ocp.png";
import logoPresidenceSenegal from "@/assets/clients/presidence-senegal.jpg";
import logoAdd from "@/assets/clients/add.png";
import logoHopital from "@/assets/clients/hopital-mohammed-vi.png";
import photoSamiaKabbaj from "@/assets/clients/samia-kabbaj.jpg";
import photoHananFadlallah from "@/assets/clients/hanan-fadlallah.jpg";
import photoOlivierLaboue from "@/assets/clients/olivier-laboue.jpg";
import photoSanaeAlami from "@/assets/clients/sanae-alami.jpg";
import logoKfw from "@/assets/clients/kfw.png";

type Thematique =
  | "all"
  | "gestion-crise"
  | "desinformation"
  | "due-diligence"
  | "attractivite"
  | "influence"
  | "ecosysteme"
  | "communication";

type Secteur =
  | "all"
  | "agroalimentaire"
  | "sante"
  | "industrie"
  | "gouvernement"
  | "public"
  | "finance"
  | "sport"
  | "international";

type Logo = { label: string; italic?: boolean; image?: string; alt?: string };
type Resource = { type: string; text: string };
type Testimony = { initials: string; text: string; authorBold: string; authorRest: string; date?: string; photo?: string; photoAlt?: string };
type Story = {
  id: string;
  num: string;
  thematique: Exclude<Thematique, "all">;
  secteur: Exclude<Secteur, "all">;
  thematiqueLabel: string;
  miniTitle: string;
  miniPitch: string;
  miniSecteur: string;
  eyebrow: string;
  logos: Logo[];
  visualMain: React.ReactNode;
  resources?: Resource[];
  meta: { label: string; value: string }[];
  titleBefore: string;
  titleEm: string;
  titleAfter?: string;
  storytelling: string;
  mission: string;
  objectives: string[];
  methodo: string;
  kpis: { value: string; label: string }[];
  resultsExtra?: string;
  testimony?: Testimony;
  tags: string[];
};

const SuccessStoriesCSS = `
  :root {
    --bf-paper: #F4F1EA;
    --bf-paper-deep: #EDE8DD;
    --bf-navy: #0A1628;
    --bf-navy-soft: #142340;
    --bf-navy-deeper: #060E1B;
    --bf-gold: #C9A84C;
    --bf-gold-soft: #D9BC6A;
    --bf-ink: #1A1A1A;
    --bf-ink-soft: #4A4A4A;
    --bf-ink-muted: #7A7A7A;
  }
  .ss-page { background: var(--bf-paper); color: var(--bf-ink); font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.55; }
  .ss-page * { box-sizing: border-box; }
  .ss-header { max-width: 1200px; margin: 0 auto; padding: 120px 40px 40px; }
  .ss-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 16px; }
  .ss-title { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 48px; color: var(--bf-navy); line-height: 1.1; margin: 0 0 18px; max-width: 800px; }
  .ss-title em { font-style: italic; color: var(--bf-gold); font-weight: 400; }
  .ss-chapeau { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 21px; color: var(--bf-ink-soft); max-width: 720px; line-height: 1.4; margin: 0; }
  .ss-filters { max-width: 1200px; margin: 0 auto; padding: 40px 40px 0; border-top: 1px solid var(--bf-paper-deep); }
  .ss-filter-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .ss-filter-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-ink-muted); margin-right: 12px; min-width: 90px; }
  .ss-filter-btn { background: transparent; border: 1px solid var(--bf-paper-deep); color: var(--bf-ink-soft); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; padding: 7px 14px; cursor: pointer; border-radius: 0; transition: all 0.15s ease; letter-spacing: 0.02em; }
  .ss-filter-btn:hover { border-color: var(--bf-gold); color: var(--bf-navy); }
  .ss-filter-btn.active-thema { background: var(--bf-navy); border-color: var(--bf-navy); color: var(--bf-gold); font-weight: 500; }
  .ss-filter-btn.active-secteur { background: var(--bf-paper-deep); border-color: var(--bf-gold); color: var(--bf-navy); font-weight: 500; }
  .ss-mini-section { max-width: 1200px; margin: 32px auto 0; padding: 0 40px; }
  .ss-mini-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--bf-paper-deep); border: 1px solid var(--bf-paper-deep); }
  .ss-mini-card { background: #FAF8F2; padding: 18px 20px; cursor: pointer; transition: all 0.15s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 8px; min-height: 140px; }
  .ss-mini-card:hover { background: #FFFFFF; color: var(--bf-navy); }
  .ss-mini-card:hover .ss-mini-thema, .ss-mini-card:hover .ss-mini-secteur-line { color: var(--bf-gold); }
  .ss-mini-card:hover .ss-mini-title { color: var(--bf-navy); }
  .ss-mini-card:hover .ss-mini-pitch { color: var(--bf-ink-soft); }
  .ss-mini-num { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.2em; color: var(--bf-ink-muted); }
  .ss-mini-thema { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bf-gold); margin-left: 8px; }
  .ss-mini-title { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 16px; color: var(--bf-navy); line-height: 1.25; transition: color 0.15s ease; min-height: 44px; display: flex; align-items: center; }
  .ss-mini-logo-img { display: block; height: 40px; width: auto; max-width: 100%; max-height: 44px; object-fit: contain; }
  .ss-mini-pitch { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--bf-ink-muted); line-height: 1.45; margin-top: auto; }
  .ss-mini-secteur-line { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bf-ink-muted); margin-top: 4px; }
  .ss-hidden { display: none !important; }
  .ss-stories { max-width: 1200px; margin: 60px auto 0; padding: 0 40px 120px; }
  .ss-story { background: #FAF8F2; border: 1px solid var(--bf-paper-deep); margin-bottom: 60px; overflow: hidden; display: grid; grid-template-columns: 1fr 1.6fr; scroll-margin-top: 40px; }
  .ss-visual { background: #FFFFFF; padding: 32px 28px; color: var(--bf-paper); display: flex; flex-direction: column; min-height: 100%; }
  .ss-story-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 22px; line-height: 1.5; }
  .ss-logos { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid var(--bf-navy-soft); flex-wrap: wrap; }
  .ss-logo { background: var(--bf-paper); color: var(--bf-navy); font-family: 'Playfair Display', serif; font-weight: 600; font-size: 13px; padding: 9px 13px; border-radius: 0; line-height: 1.1; letter-spacing: 0.02em; white-space: pre-line; display: inline-flex; align-items: center; justify-content: center; min-height: 56px; }
  .ss-logo.italic { font-style: italic; font-size: 11px; }
  .ss-logo-img { display: block; height: 44px; width: auto; max-width: 160px; object-fit: contain; }
  .ss-visual-main { background: linear-gradient(135deg, var(--bf-navy-deeper), var(--bf-navy-soft)); border: 1px solid var(--bf-navy-soft); padding: 28px 20px; margin-bottom: 18px; text-align: center; color: var(--bf-ink-muted); font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; min-height: 160px; display: flex; align-items: center; justify-content: center; line-height: 1.5; position: relative; }
  .ss-visual-main::before { content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1px solid rgba(217, 188, 106, 0.15); pointer-events: none; }
  .ss-resources { margin-bottom: 22px; }
  .ss-res-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 12px; }
  .ss-res-link { display: block; padding: 9px 12px; margin-bottom: 6px; background: rgba(217, 188, 106, 0.05); border-left: 2px solid var(--bf-gold); color: rgba(244, 241, 234, 0.85); font-family: 'DM Sans', sans-serif; font-size: 12px; text-decoration: none; transition: all 0.15s ease; cursor: pointer; }
  .ss-res-link:hover { background: rgba(217, 188, 106, 0.12); color: var(--bf-gold); }
  .ss-res-type { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bf-gold); display: block; margin-bottom: 2px; }
  .ss-meta { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; line-height: 1.7; border-top: 1px solid var(--bf-navy-soft); padding-top: 16px; margin-top: auto; }
  .ss-meta-line { color: rgba(244, 241, 234, 0.55); margin-bottom: 4px; }
  .ss-meta-line strong { color: var(--bf-gold); font-weight: 500; }
  .ss-content { padding: 40px 44px; }
  .ss-num { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 14px; }
  .ss-story-title { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 32px; color: var(--bf-navy); line-height: 1.15; margin: 0 0 28px; }
  .ss-story-title em { font-style: italic; color: var(--bf-gold); font-weight: 500; }
  .ss-section-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 12px; margin-top: 24px; }
  .ss-section-label.first { margin-top: 0; }
  .ss-storytelling { font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--bf-ink); line-height: 1.7; margin-bottom: 28px; }
  .ss-mission { background: var(--bf-paper-deep); border-left: 2px solid var(--bf-gold); padding: 18px 22px; margin: 8px 0 28px; font-family: 'Playfair Display', serif; font-style: italic; font-size: 16px; color: var(--bf-navy); line-height: 1.5; font-weight: 500; }
  .ss-objectives { list-style: none; counter-reset: roman; margin: 0 0 28px; padding-left: 0; }
  .ss-objectives li { position: relative; padding-left: 38px; margin-bottom: 10px; font-size: 14.5px; color: var(--bf-ink); line-height: 1.55; counter-increment: roman; }
  .ss-objectives li::before { content: counter(roman, lower-roman) "."; position: absolute; left: 0; top: 0; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--bf-gold); font-weight: 500; width: 28px; text-align: right; padding-top: 3px; }
  .ss-methodo { font-family: 'DM Sans', sans-serif; font-size: 14.5px; color: var(--bf-ink); line-height: 1.65; margin-bottom: 32px; }
  .ss-results { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; background: var(--bf-navy); margin: 8px 0 18px; }
  .ss-kpi { padding: 24px 16px; text-align: center; border-right: 1px solid var(--bf-navy-soft); }
  .ss-kpi:last-child { border-right: none; }
  .ss-kpi-value { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 26px; color: var(--bf-gold); line-height: 1; margin-bottom: 8px; }
  .ss-kpi-label { font-family: 'DM Sans', sans-serif; font-size: 11.5px; color: rgba(244, 241, 234, 0.85); line-height: 1.4; font-weight: 300; }
  .ss-results-extra { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: var(--bf-ink-soft); text-align: center; margin-top: 4px; margin-bottom: 28px; padding: 0 10px; }
  .ss-testimony { background: #FAF8F2; border: 1px solid var(--bf-paper-deep); border-left: 3px solid var(--bf-gold); padding: 22px 26px; margin: 24px 0 0; display: flex; gap: 20px; align-items: flex-start; }
  .ss-test-photo { flex-shrink: 0; width: 72px; height: 72px; border-radius: 50%; background: var(--bf-paper-deep); border: 1px solid var(--bf-gold); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; color: var(--bf-navy); font-size: 16px; font-style: italic; overflow: hidden; }
  .ss-test-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
  .ss-test-body { flex: 1; min-width: 0; }
  .ss-test-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px; color: var(--bf-ink-soft); line-height: 1.55; margin-bottom: 14px; }
  .ss-test-author { font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--bf-navy); font-weight: 500; }
  .ss-test-author strong { font-weight: 600; }
  .ss-test-author span { color: var(--bf-ink-muted); font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 13px; margin-left: 6px; }
  .ss-tags { margin-top: 28px; padding-top: 22px; border-top: 1px solid var(--bf-paper-deep); font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bf-ink-muted); line-height: 1.8; }
  .ss-tags .sep { color: var(--bf-gold); margin: 0 6px; }
  @media (max-width: 980px) {
    .ss-story { grid-template-columns: 1fr; }
    .ss-visual { min-height: auto; }
    .ss-title { font-size: 36px; }
    .ss-story-title { font-size: 26px; }
    .ss-stories, .ss-filters, .ss-mini-section, .ss-header { padding-left: 20px; padding-right: 20px; }
    .ss-results { grid-template-columns: 1fr; }
    .ss-kpi { border-right: none; border-bottom: 1px solid var(--bf-navy-soft); }
    .ss-kpi:last-child { border-bottom: none; }
    .ss-testimony { flex-direction: column; gap: 14px; }
    .ss-filter-label { min-width: auto; width: 100%; margin-bottom: 4px; }
    .ss-content { padding: 28px 22px; }
    .ss-filter-select { min-width: 100%; }
  }
  .ss-filter-selects { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
  .ss-filter-select { background: #FFFFFF; border: 1px solid var(--bf-paper-deep); color: var(--bf-navy); font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 10px 32px 10px 14px; border-radius: 4px; cursor: pointer; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%23C9A84C%22%20d%3D%22M0%200l5%206%205-6z%22%2F%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 12px center; min-width: 220px; transition: border-color 0.15s ease; }
  .ss-filter-select:hover, .ss-filter-select:focus { border-color: var(--bf-gold); outline: none; }
  .ss-story-nav { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; padding-top: 22px; border-top: 1px solid var(--bf-paper-deep); }
  .ss-story-nav a { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; padding: 10px 16px; border: 1px solid var(--bf-paper-deep); color: var(--bf-navy); text-decoration: none; border-radius: 2px; background: #FFFFFF; transition: all 0.15s ease; }
  .ss-story-nav a:hover { border-color: var(--bf-gold); color: var(--bf-gold); }
  .ss-story-nav a.all { background: var(--bf-navy); color: var(--bf-gold); border-color: var(--bf-navy); margin-left: auto; }
  .ss-story-nav a.all:hover { background: var(--bf-navy-soft); color: var(--bf-gold); }
`;

const SuccessStoriesPage = () => {
  const { t } = useLanguage();
  const [thematique, setThematique] = useState<Thematique>("all");
  const [secteur, setSecteur] = useState<Secteur>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openStory = (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };


  const THEMATIQUES: { value: Thematique; label: string }[] = [
    { value: "all", label: t("Toutes", "All") },
    { value: "gestion-crise", label: t("Gestion de crise", "Crisis Management") },
    { value: "desinformation", label: t("Attaques & Désinformation", "Attacks & Disinformation") },
    { value: "due-diligence", label: t("Due Diligence & Investissement", "Due Diligence & Investment") },
    { value: "attractivite", label: t("Attractivité & Rayonnement", "Attractiveness & Outreach") },
    { value: "influence", label: t("Influence & Soft Power", "Influence & Soft Power") },
    { value: "ecosysteme", label: t("Écosystème Concurrentiel", "Competitive Ecosystem") },
    { value: "communication", label: t("Ingénierie de communication", "Communication engineering") },
  ];

  const SECTEURS: { value: Secteur; label: string }[] = [
    { value: "all", label: t("Tous", "All") },
    { value: "agroalimentaire", label: t("Agroalimentaire", "Agri-food") },
    { value: "sante", label: t("Santé", "Healthcare") },
    { value: "industrie", label: t("Industrie", "Industry") },
    { value: "gouvernement", label: t("Gouvernement", "Government") },
    { value: "public", label: t("Établissement public", "Public institution") },
    { value: "finance", label: t("Finance & Investissement", "Finance & Investment") },
    { value: "sport", label: t("Sport", "Sport") },
    { value: "international", label: t("Organisation internationale", "International organization") },
  ];

  const stories: Story[] = [
    {
      id: "story-01",
      num: "01",
      thematique: "gestion-crise",
      secteur: "agroalimentaire",
      thematiqueLabel: t("Gestion de crise", "Crisis Management"),
      miniTitle: "Centrale Danone",
      miniPitch: t("Trois semaines pour défaire deux ans de crise.", "Three weeks to undo two years of crisis."),
      miniSecteur: t("Agroalimentaire · 🇲🇦", "Agri-food · 🇲🇦"),
      eyebrow: t("Industrie agroalimentaire", "Agri-food industry"),
      logos: [{ label: "CENTRALE DANONE", image: logoCentraleDanone, alt: "Centrale Danone" }],
      visualMain: (
        <>
          [ {t("Capture média le360", "le360 media capture")}<br />
          <span style={{ color: "var(--bf-gold)" }}>"{t("Vidéo. Rumeurs et réseaux sociaux : quand Raïbi Jamila en paie le prix fort", "Video. Rumors and social media: when Raïbi Jamila pays the price")}"</span> ]
        </>
      ),
      resources: [
        { type: t("▶ Reportage exclusif", "▶ Exclusive report"), text: t("RTM, 45 minutes, 2017", "RTM, 45 minutes, 2017") },
        { type: t("📰 Article média", "📰 Media article"), text: t("le360.com, \"Quand Raïbi Jamila en paie le prix fort\"", "le360.com, \"When Raïbi Jamila pays the price\"") },
      ],
      meta: [
        { label: t("CLIENT", "CLIENT"), value: "Centrale Danone" },
        { label: t("PÉRIODE", "PERIOD"), value: "2015 / 2017" },
        { label: t("GÉOGRAPHIE", "GEOGRAPHY"), value: t("🇲🇦 Maroc", "🇲🇦 Morocco") },
      ],
      titleBefore: t("Trois semaines pour défaire ", "Three weeks to undo "),
      titleEm: t("deux ans", "two years"),
      titleAfter: t(" de crise", " of crisis"),
      storytelling: t(
        "Août 2015, région d'Agadir. Deux enfants meurent après avoir consommé Raïbi Jamila. Sur les réseaux sociaux, la sentence tombe en quelques heures : la marque est coupable. Pendant deux ans, une campagne de dénigrement va s'installer, vider les rayons et faire fondre 120 millions de dirhams de chiffre d'affaires. La contagion gagne les autres produits du groupe. Et personne ne sait qui orchestre l'attaque.",
        "August 2015, Agadir region. Two children die after consuming Raïbi Jamila. Within hours, social media delivers its verdict: the brand is guilty. Over two years, a disparagement campaign empties shelves and erodes MAD 120 million in revenue. The contagion spreads to the group's other products. And nobody knows who is orchestrating the attack."
      ),
      mission: t(
        "Identifier les origines réelles de la campagne de dénigrement, documenter l'innocence du produit, et reconstruire la confiance des consommateurs.",
        "Identify the true origins of the disparagement campaign, document the product's innocence, and rebuild consumer trust."
      ),
      objectives: [
        t("Récupérer et exploiter les pièces sanitaires officielles", "Retrieve and leverage official health records"),
        t("Cartographier les acteurs et profiler les comptes virulents", "Map the actors and profile the most virulent accounts"),
        t("Bâtir une contre-narrative documentée et activer un canal médiatique de masse", "Build a documented counter-narrative and activate a mass media channel"),
      ],
      methodo: t(
        "Déploiement d'une cellule de veille et d'intelligence économique dédiée. Analyse et décryptage des attaques en réseaux sociaux. Mapping et profiling des auteurs virulents. Récupération des documents sanitaires et du rapport d'autopsie. Construction d'un dossier d'innocentement et orchestration d'un reportage exclusif sur la chaîne nationale.",
        "Deployment of a dedicated intelligence and monitoring unit. Analysis and decoding of social media attacks. Mapping and profiling of virulent authors. Retrieval of sanitary documents and autopsy report. Construction of an exoneration file and orchestration of an exclusive report on the national channel."
      ),
      kpis: [
        { value: t("3 sem.", "3 wks"), label: t("pour juguler une crise de 2 ans", "to contain a 2-year crisis") },
        { value: "100 %", label: t("marque innocentée", "brand fully exonerated") },
        { value: "+14 %", label: t("parts de marché regagnées", "market share regained") },
      ],
      resultsExtra: t("+ Reportage exclusif de 45 minutes diffusé sur RTM", "+ Exclusive 45-minute report broadcast on RTM"),
      testimony: {
        initials: "SK",
        photo: photoSamiaKabbaj,
        photoAlt: "Samia Kabbaj Douiri, Centrale Danone",
        text: t(
          "\"Prestataire référencé chez nous depuis 2016, M. Azeddine Yassine (Buildfluence) a réalisé avec succès des missions pour Centrale Danone. Dès le début, M. Yassine a fait preuve d'un réel professionnalisme et d'une rigueur à toute épreuve. Nous le recommandons vivement.\"",
          "\"A referenced provider since 2016, Mr. Azeddine Yassine (Buildfluence) has successfully delivered missions for Centrale Danone. From the outset, Mr. Yassine has demonstrated genuine professionalism and unwavering rigor. We highly recommend him.\""
        ),
        authorBold: "Samia Kabbaj Douiri",
        authorRest: t(", Secrétaire Générale, Centrale Danone", ", Secretary General, Centrale Danone"),
        date: t("(lettre du 2 février 2020)", "(letter of February 2, 2020)"),
      },
      tags: [t("AGROALIMENTAIRE","AGRI-FOOD"), t("GESTION DE CRISE","CRISIS MANAGEMENT"), t("RÉHABILITATION DE MARQUE","BRAND REHABILITATION"), t("DÉSINFORMATION","DISINFORMATION"), t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-02",
      num: "02",
      thematique: "desinformation",
      secteur: "international",
      thematiqueLabel: t("Attaques & Désinformation","Attacks & Disinformation"),
      miniTitle: t("Cabinet européen d'intelligence","European intelligence firm"),
      miniPitch: t("Quand un boycott n'est pas un mouvement spontané.","When a boycott is not a spontaneous movement."),
      miniSecteur: t("Intelligence stratégique · 🇲🇦","Strategic intelligence · 🇲🇦"),
      eyebrow: t("Intelligence stratégique internationale","International strategic intelligence"),
      logos: [{ label: t("CABINET EUROPÉEN\nD'INTELLIGENCE","EUROPEAN\nINTELLIGENCE FIRM"), italic: true }],
      visualMain: (
        <>
          [ {t("Iconographie boycott 2018","2018 boycott iconography")}<br />
          <span style={{ color: "var(--bf-gold)" }}>#كلنا_مقاطعون</span> ]
        </>
      ),
      resources: [
        { type: t("📄 Étude indépendante","📄 Independent study"), text: t("EPGE, \"Le boycott d'avril 2018 au Maroc\", septembre 2019","EPGE, \"The April 2018 boycott in Morocco\", September 2019") },
      ],
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Cabinet européen d'intelligence","European intelligence firm") },
        { label: t("PÉRIODE","PERIOD"), value: "2018" },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc","🇲🇦 Morocco") },
      ],
      titleBefore: t("Quand un boycott n'est ","When a boycott is "),
      titleEm: t("pas","not"),
      titleAfter: t(" un mouvement spontané"," a spontaneous movement"),
      storytelling: t(
        "Avril 2018. Une vague de boycott sans précédent frappe trois marques emblématiques au Maroc : Centrale Danone, Sidi Ali, Afriquia. En quelques jours, des millions d'interactions, des pertes business massives, une psychose nationale. L'opinion croit à un réflexe citoyen. La donnée raconte autre chose : pages anonymes coordonnées, plus de 800 bots créés un mois avant le déclenchement, sponsorisation détectée, éléments de langage répliqués. L'opération est orchestrée. Reste à le prouver.",
        "April 2018. An unprecedented boycott wave hits three iconic brands in Morocco: Centrale Danone, Sidi Ali, Afriquia. Within days: millions of interactions, massive business losses, national psychosis. The public believes it is a civic reflex. The data tells another story: coordinated anonymous pages, more than 800 bots created a month before the trigger, detected sponsoring, replicated talking points. The operation is orchestrated. It remains to be proven."
      ),
      mission: t(
        "Identifier, analyser et cartographier les instigateurs d'une campagne de désinformation visant les produits de première nécessité au Maroc, pour le compte d'un cabinet européen d'intelligence stratégique de premier plan.",
        "Identify, analyze and map the instigators of a disinformation campaign targeting essential goods in Morocco, on behalf of a leading European strategic intelligence firm."
      ),
      objectives: [
        t("Décoder les moyens techniques (pages anonymes, bots, astroturfing, sponsoring)","Decode the technical means (anonymous pages, bots, astroturfing, sponsoring)"),
        t("Tracker les éléments de langage et reconstituer le réseau opérationnel","Track talking points and reconstruct the operational network"),
        t("Documenter l'orchestration et identifier la signature politique sous-jacente","Document the orchestration and identify the underlying political signature"),
      ],
      methodo: t(
        "Veille multicanale et OSINT approfondi sur Facebook, Twitter, YouTube. Analyse de plus de 4 000 posts originaux et 500 000 commentaires. Cartographie des comptes clés et de leurs interconnexions. Détection des bots par profilage comportemental. Tracking des éléments de langage et identification des facteurs de vulnérabilité instrumentalisés.",
        "Multi-channel monitoring and in-depth OSINT on Facebook, Twitter, YouTube. Analysis of over 4,000 original posts and 500,000 comments. Mapping of key accounts and their interconnections. Bot detection through behavioral profiling. Talking point tracking and identification of weaponized vulnerability factors."
      ),
      kpis: [
        { value: "800+", label: t("bots identifiés et profilés","bots identified and profiled") },
        { value: t("3 niveaux","3 levels"), label: t("technique, narratif, opérationnel","technical, narrative, operational") },
        { value: "100 %", label: t("chaîne d'orchestration documentée","orchestration chain documented") },
      ],
      testimony: {
        initials: "DG",
        text: t(
          "\"Partenaire depuis 2017, nous sollicitons M. Azeddine Yassine pour réaliser des missions concernant des études socio-économiques ou géopolitiques nécessitant la collecte de données, l'analyse des tendances et des recommandations facilitant des prises de décision éclairées. À chaque fois, M. Yassine a su travailler efficacement et ponctuellement pour répondre à nos demandes. Personne rigoureuse, organisée, perfectionniste et discrète. Approche en matière de gestion de tous projets qui dépasse nos exigences.\"",
          "\"A partner since 2017, we engage Mr. Azeddine Yassine for socio-economic and geopolitical studies requiring data collection, trend analysis and recommendations that enable informed decision-making. Each time, Mr. Yassine has worked efficiently and on time to meet our requests. A rigorous, organized, perfectionist and discreet professional. His project management approach exceeds our requirements.\""
        ),
        authorBold: t("Directeur Général","Managing Director"),
        authorRest: t(", cabinet européen d'intelligence stratégique",", European strategic intelligence firm"),
        date: t("(lettre du 2 mars 2020)","(letter of March 2, 2020)"),
      },
      tags: [t("INTELLIGENCE STRATÉGIQUE","STRATEGIC INTELLIGENCE"), t("DÉSINFORMATION","DISINFORMATION"), t("CARTOGRAPHIE D'ACTEURS","ACTOR MAPPING"), "OSINT", t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-03",
      num: "03",
      thematique: "attractivite",
      secteur: "international",
      thematiqueLabel: t("Attractivité & Rayonnement","Attractiveness & Outreach"),
      miniTitle: "CIDC / OCI",
      miniPitch: t("Faire renaître une organisation 38 ans après sa création.","Reviving an organization 38 years after its creation."),
      miniSecteur: t("Organisation internationale · 🇸🇦 OCI","International organization · 🇸🇦 OIC"),
      eyebrow: t("Organisation internationale","International organization"),
      logos: [{ label: "CIDC · OCI", image: logoCidc, alt: "CIDC – Islamic Centre for Development of Trade" }],
      visualMain: (
        <>
          [ Doing Business Platform<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Magazine TIJARIS bimensuel","+ Bi-monthly TIJARIS magazine")}</span> ]
        </>
      ),
      resources: [
        { type: t("🌐 Plateforme","🌐 Platform"), text: "Doing Business Platform · CIDC OIC" },
        { type: t("📖 Publication","📖 Publication"), text: t("Magazine TIJARIS, bimensuel","TIJARIS magazine, bi-monthly") },
      ],
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("CIDC (organe OCI)","ICDT (OIC body)") },
        { label: t("SIÈGE","HQ"), value: t("🇲🇦 Casablanca","🇲🇦 Casablanca") },
        { label: t("COUVERTURE","COVERAGE"), value: t("57 États membres","57 member states") },
        { label: t("PÉRIODE","PERIOD"), value: "2022 / 2023" },
      ],
      titleBefore: t("Faire renaître une organisation ","Reviving an organization "),
      titleEm: t("38 ans","38 years"),
      titleAfter: t(" après sa création"," after its creation"),
      storytelling: t(
        "Trente-huit ans après sa création, le CIDC peine à exister auprès de ses 57 États membres. Faible visibilité, sollicitation marginale, organisation perçue comme dépassée par les enjeux du commerce intra-OCI. Une nouvelle Direction Générale arrive, ambitieuse : transformer le centre en plateforme d'attractivité moderne, capable de générer du business réel entre ses pays membres. Restait à concevoir l'outil.",
        "Thirty-eight years after its creation, the ICDT struggles to exist for its 57 member states. Low visibility, marginal solicitation, an organization perceived as outdated by intra-OIC trade challenges. An ambitious new General Management arrives: transform the centre into a modern attractiveness platform able to generate real business between its member countries. The tool still needed to be designed."
      ),
      mission: t(
        "Concevoir et développer l'architecture d'une plateforme digitale d'attractivité et d'influence pour relancer la notoriété et l'utilité opérationnelle du CIDC.",
        "Design and develop the architecture of a digital attractiveness and influence platform to revive the ICDT's notoriety and operational usefulness."
      ),
      objectives: [
        t("Diagnostiquer les missions et le positionnement du CIDC","Audit the ICDT's missions and positioning"),
        t("Concevoir l'architecture d'une \"Doing Business Platform\" multi-composantes","Design the architecture of a multi-component \"Doing Business Platform\""),
        t("Transformer le CIDC en organisation orientée intelligence économique et insight-driven","Transform the ICDT into an economic-intelligence-driven, insight-driven organization"),
      ],
      methodo: t(
        "Compréhension fine des missions du CIDC, diagnostic opérationnel et stratégique. Conception de l'architecture digitale autour de six composantes : Business Ecosystem, Carte sectorielle interactive, Country Profile, Matchmaking, Knowledge Center, Outils décisionnels. Partenariat avec une solution spécialisée Halal. Production éditoriale soutenue (Lettre de Veille et magazine TIJARIS bimensuel).",
        "Fine understanding of the ICDT's missions, operational and strategic diagnosis. Design of the digital architecture around six components: Business Ecosystem, interactive sector map, Country Profile, Matchmaking, Knowledge Center, decision tools. Partnership with a specialized Halal solution. Sustained editorial production (Intelligence Letter and bi-monthly TIJARIS magazine)."
      ),
      kpis: [
        { value: "57", label: t("États membres OCI couverts","OIC member states covered") },
        { value: "6", label: t("composantes digitales déployées","digital components deployed") },
        { value: t("Bimensuel","Bi-monthly"), label: t("magazine TIJARIS lancé","TIJARIS magazine launched") },
      ],
      resultsExtra: t("+ Repositionnement du CIDC en organisation orientée Intelligence Économique et approche Insight-Driven","+ Repositioning of the ICDT as an Economic Intelligence and Insight-Driven organization"),
      tags: [t("ORGANISATION INTERNATIONALE","INTERNATIONAL ORGANIZATION"), t("PLATEFORME D'ATTRACTIVITÉ","ATTRACTIVENESS PLATFORM"), t("INTELLIGENCE ÉCONOMIQUE","ECONOMIC INTELLIGENCE"), "MATCHMAKING", t("🇲🇦 🇸🇦 OCI","🇲🇦 🇸🇦 OIC")],
    },
    {
      id: "story-04",
      num: "04",
      thematique: "gestion-crise",
      secteur: "sante",
      thematiqueLabel: t("Gestion de crise","Crisis Management"),
      miniTitle: t("Ministère de la Santé","Ministry of Health"),
      miniPitch: t("Stopper une psychose nationale en deux semaines.","Stopping a national panic in two weeks."),
      miniSecteur: t("Santé publique · 🇲🇦","Public health · 🇲🇦"),
      eyebrow: t("Santé publique","Public health"),
      logos: [{ label: t("MINISTÈRE\nDE LA SANTÉ\nMAROC","MINISTRY\nOF HEALTH\nMOROCCO"), italic: true, image: logoMinistereSante, alt: "Ministry of Health of Morocco" }],
      visualMain: (
        <>
          [ {t("Crisis Dashboard Grippe A H1N1","H1N1 Flu Crisis Dashboard")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Weekly Dashboard DICom","+ DICom Weekly Dashboard")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Ministère de la Santé","Ministry of Health") },
        { label: t("TÉMOIGNAGE","TESTIMONY"), value: "Dr Hanan Fadlallah" },
        { label: t("PÉRIODE","PERIOD"), value: "2018 / 2019" },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc","🇲🇦 Morocco") },
      ],
      titleBefore: t("Stopper une psychose nationale en ","Stopping a national panic in "),
      titleEm: t("deux semaines","two weeks"),
      storytelling: t(
        "2018. Le virus H1N1 frappe le Maroc. Une quarantaine de décès. Sur les réseaux sociaux, le silence du Ministère laisse un vide immédiatement comblé : rumeurs, fake news, désinformation organisée. La psychose s'installe, l'indignation citoyenne monte, l'autorité sanitaire perd la main. Pour reprendre le récit, il faut comprendre qui le fabrique. Et avec quelle intensité.",
        "2018. The H1N1 virus hits Morocco. About forty deaths. On social media, the Ministry's silence leaves a vacuum immediately filled: rumors, fake news, organized disinformation. Panic settles in, public indignation rises, the health authority loses control. To regain the narrative, it must be understood who is making it. And with what intensity."
      ),
      mission: t(
        "Piloter la communication de crise H1N1 et installer un dispositif de veille stratégique au sein de la Division de l'Information et de la Communication du Ministère.",
        "Steer H1N1 crisis communication and install a strategic intelligence system within the Ministry's Division of Information and Communication."
      ),
      objectives: [
        t("Mesurer en temps réel la perception publique et identifier les vecteurs de désinformation","Measure public perception in real time and identify disinformation vectors"),
        t("Outiller la Division Communication avec un baromètre d'image et des dashboards opérationnels","Equip the Communication Division with an image barometer and operational dashboards"),
        t("Former les cadres aux techniques d'intelligence économique appliquées à la santé publique","Train executives in economic intelligence techniques applied to public health"),
      ],
      methodo: t(
        "Déploiement d'une solution de veille et d'analyse stratégique. Fact-checking des contenus diffusés sur Facebook et YouTube. Décryptage et mapping des auteurs de messages nuisibles. Production de tableaux de bord hebdomadaires (Positionnement, Gouvernement, Partis politiques, Trending Public Opinion). Campagne digitale activant cadres du Ministère et experts externes.",
        "Deployment of a strategic monitoring and analysis solution. Fact-checking of content published on Facebook and YouTube. Decoding and mapping of authors of harmful messages. Weekly dashboards (Positioning, Government, Political parties, Trending Public Opinion). Digital campaign activating Ministry executives and external experts."
      ),
      kpis: [
        { value: t("2 sem.","2 wks"), label: t("pour atténuer la crise nationale","to mitigate the national crisis") },
        { value: t("Permanente","Permanent"), label: t("solution de veille installée","monitoring solution installed") },
        { value: t("Formation","Training"), label: t("cadres et journalistes DICom","DICom executives and journalists") },
      ],
      testimony: {
        initials: "HF",
        photo: photoHananFadlallah,
        photoAlt: "Dr Hanan Fadlallah, Ministry of Health",
        text: t(
          "\"Doté d'une vision exceptionnelle, des capacités d'analyse fine et de synthèse, les conseils de M. Azeddine Yassine étaient un appui fort pour la stratégie de communication du Ministère de la Santé. Son intervention a laissé des marques de valeurs : installation d'une solution de veille stratégique et de Data Intelligence, formation des cadres et des journalistes de la DICom, compréhension et cartographie de l'écosystème du Ministère, méthodologie d'extraction des insights de risques et prévention de crise.\"",
          "\"With exceptional vision and sharp analytical and synthesis abilities, Mr. Azeddine Yassine's advice was a strong support for the Ministry of Health's communication strategy. His intervention left lasting marks: installation of a strategic intelligence and Data Intelligence solution, training of DICom executives and journalists, mapping of the Ministry's ecosystem, methodology for extracting risk insights and crisis prevention.\""
        ),
        authorBold: "Dr Hanan Fadlallah",
        authorRest: t(", Cheffe de la Division de l'Information et de la Communication, Ministère de la Santé",", Head of the Information and Communication Division, Ministry of Health"),
        date: t("(lettre du 2 janvier 2020)","(letter of January 2, 2020)"),
      },
      tags: [t("SANTÉ PUBLIQUE","PUBLIC HEALTH"), t("COMMUNICATION DE CRISE","CRISIS COMMUNICATION"), "DATA INTELLIGENCE", "FACT-CHECKING", t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-05",
      num: "05",
      thematique: "attractivite",
      secteur: "sante",
      thematiqueLabel: t("Attractivité & Rayonnement","Attractiveness & Outreach"),
      miniTitle: "Ginger International",
      miniPitch: t("Quand l'intelligence stratégique sert l'attractivité hospitalière.","When strategic intelligence serves hospital attractiveness."),
      miniSecteur: t("Santé · 🇲🇦 🇫🇷 🇩🇪","Healthcare · 🇲🇦 🇫🇷 🇩🇪"),
      eyebrow: t("Coopération internationale & santé","International cooperation & healthcare"),
      logos: [{ label: "GINGER INTERNATIONAL", image: logoGinger, alt: "Ginger International" }, { label: "KFW", image: logoKfw, alt: "KfW Bankengruppe" }],
      visualMain: (
        <>
          [ {t("Mission tripartite","Tripartite mission")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("🇲🇦 Maroc · 🇫🇷 France · 🇩🇪 Allemagne","🇲🇦 Morocco · 🇫🇷 France · 🇩🇪 Germany")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Ginger International (France)","Ginger International (France)") },
        { label: t("BÉNÉFICIAIRE","BENEFICIARY"), value: t("Établissement hospitalier de référence","Reference hospital institution") },
        { label: t("BAILLEUR","FUNDER"), value: t("KFW (Banque Allemande)","KFW (German Bank)") },
        { label: t("PÉRIODE","PERIOD"), value: "2022 / 2023 · 🇲🇦 🇫🇷 🇩🇪" },
      ],
      titleBefore: t("Quand l'intelligence stratégique sert ","When strategic intelligence serves "),
      titleEm: t("l'attractivité hospitalière","hospital attractiveness"),
      storytelling: t(
        "2022. Un grand établissement hospitalier de référence à Casablanca fait face à un enjeu d'attractivité et de positionnement. Le bailleur allemand KFW finance une mission d'assistance technique stratégique, confiée au cabinet français Ginger International. Mission : moderniser la communication d'un acteur de santé majeur, en s'appuyant sur la Data, l'analyse et l'intelligence économique appliquées au secteur hospitalier.",
        "2022. A major reference hospital in Casablanca faces an attractiveness and positioning challenge. German funder KFW finances a strategic technical assistance mission entrusted to French firm Ginger International. Mission: modernize the communication of a major healthcare player by leveraging Data, analysis and economic intelligence applied to the hospital sector."
      ),
      mission: t(
        "Accompagner la transformation de la communication d'un grand établissement hospitalier marocain via une approche d'intelligence stratégique et de Data Influence, dans le cadre d'une mission financée par KFW.",
        "Support the communication transformation of a major Moroccan hospital through a strategic intelligence and Data Influence approach, within a KFW-funded mission."
      ),
      objectives: [
        t("Asseoir la notoriété et le positionnement de l'établissement","Establish the institution's notoriety and positioning"),
        t("Outiller les équipes communication avec des dispositifs d'aide à la décision basés sur l'IA","Equip communication teams with AI-based decision-support tools"),
        t("Produire des audits, recommandations et feuille de route opérationnelle","Produce audits, recommendations and operational roadmap"),
      ],
      methodo: t(
        "Benchmarks et analyses de situation approfondies. Déploiement d'une plateforme de données basée sur l'intelligence artificielle pour l'extraction et l'analyse de données stratégiques. Création de tableaux de bord et de rapports d'analyse pour le suivi de performance. Accompagnement opérationnel du département communication par enjeu et par cible.",
        "In-depth benchmarks and situational analyses. Deployment of an AI-based data platform for the extraction and analysis of strategic data. Creation of dashboards and analysis reports for performance tracking. Operational support of the communication department by issue and audience."
      ),
      kpis: [
        { value: t("11 mois","11 months"), label: t("de mission menée à terme","mission successfully delivered") },
        { value: t("Plateforme IA","AI platform"), label: t("déployée pour l'aide à la décision","deployed for decision support") },
        { value: t("Stratégie","Strategy"), label: t("de communication repositionnée","communication repositioned") },
      ],
      resultsExtra: t("+ Mission internationale tripartite : bailleur public allemand, cabinet français, expertise marocaine","+ Tripartite international mission: German public funder, French firm, Moroccan expertise"),
      testimony: {
        initials: "OL",
        photo: photoOlivierLaboue,
        photoAlt: "Olivier Laboue, Ginger International",
        text: t(
          "\"Mandaté pour un audit d'image, le cabinet Buildfluence a livré des solutions innovantes et créatives. La mission s'est distinguée par un professionnalisme exemplaire, une attention méticuleuse aux détails et un respect total des délais de livraison. Une vive recommandation pour tout projet alliant excellence opérationnelle et créativité.\"",
          "\"Engaged for an image audit, Buildfluence delivered innovative and creative solutions. The mission stood out for exemplary professionalism, meticulous attention to detail and full respect of delivery deadlines. A strong recommendation for any project combining operational excellence and creativity.\""
        ),
        authorBold: "Olivier Laboue",
        authorRest: t(", Directeur de Développement International, Ginger International",", International Development Director, Ginger International"),
      },
      tags: [t("COOPÉRATION INTERNATIONALE","INTERNATIONAL COOPERATION"), t("SANTÉ","HEALTHCARE"), "DATA INTELLIGENCE", t("ATTRACTIVITÉ HOSPITALIÈRE","HOSPITAL ATTRACTIVENESS"), "🇲🇦 🇫🇷 🇩🇪"],
    },
    {
      id: "story-06",
      num: "06",
      thematique: "desinformation",
      secteur: "sport",
      thematiqueLabel: t("Attaques & Désinformation","Attacks & Disinformation"),
      miniTitle: "Raja Club Athletic",
      miniPitch: t("Quand un club légendaire devient cible informationnelle.","When a legendary club becomes an informational target."),
      miniSecteur: t("Sport professionnel · 🇲🇦","Professional sport · 🇲🇦"),
      eyebrow: t("Sport professionnel & gouvernance","Professional sport & governance"),
      logos: [{ label: "RAJA CLUB ATHLETIC", image: logoRaja, alt: "Raja Club Athletic" }, { label: "MARSA MAROC", italic: true }],
      visualMain: (
        <>
          [ {t("Architecture de veille multi-dossiers","Multi-domain monitoring architecture")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("Sport, Gouvernance, Médias","Sport, Governance, Media")}</span> ]
        </>
      ),
      resources: [
        { type: t("📰 Couverture média","📰 Media coverage"), text: t("Africa Intelligence, \"La contre-offensive numérique du Raja\"","Africa Intelligence, \"Raja's digital counter-offensive\"") },
      ],
      meta: [
        { label: t("CLIENT","CLIENT"), value: "Raja Club Athletic" },
        { label: t("ACTIONNAIRE","SHAREHOLDER"), value: "Marsa Maroc (60%)" },
        { label: t("PÉRIODE","PERIOD"), value: t("Mission 2026 en cours","2026 mission in progress") },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc","🇲🇦 Morocco") },
      ],
      titleBefore: t("Quand un club légendaire devient ","When a legendary club becomes an "),
      titleEm: t("cible informationnelle","informational target"),
      storytelling: t(
        "2026. Le Raja Club Athletic, club le plus populaire du Maroc, entre dans une nouvelle ère : reprise par Marsa Maroc, nouveau président, nouvelle directrice générale issue du privé. La modernisation s'enclenche, et avec elle, les premières attaques informationnelles ciblant la direction. Articles de presse, posts coordonnés, screenshots viralisés. Sous l'apparence du débat sportif, une autre lecture émerge : celle d'une déstabilisation orchestrée des dirigeants au moment où le club retrouve sa stabilité institutionnelle.",
        "2026. Raja Club Athletic, Morocco's most popular club, enters a new era: takeover by Marsa Maroc, new president, new managing director from the private sector. Modernization kicks in, and with it the first informational attacks targeting management. Press articles, coordinated posts, viral screenshots. Behind the appearance of sports debate, another reading emerges: an orchestrated destabilization of executives just as the club regains its institutional stability."
      ),
      mission: t(
        "Mettre en place un dispositif de veille stratégique permanent et fournir une analyse de crise en temps réel face aux campagnes informationnelles ciblant la direction du club.",
        "Implement a permanent strategic monitoring system and provide real-time crisis analysis in response to informational campaigns targeting the club's management."
      ),
      objectives: [
        t("Structurer une plateforme de veille multi-dossiers (concurrentielle, réglementaire, sponsoring, technologique, sociétale)","Structure a multi-domain monitoring platform (competitive, regulatory, sponsoring, technological, societal)"),
        t("Détecter et analyser les attaques informationnelles ciblant les dirigeants","Detect and analyze informational attacks targeting executives"),
        t("Formuler des recommandations pro-actives de gestion de crise et de réponse stratégique","Issue proactive crisis management and strategic response recommendations"),
      ],
      methodo: t(
        "Architecture de veille sur six dossiers structurés : Botola Pro et compétitions africaines, FRMF/CAF/FIFA, sponsoring et investisseurs, technologies de performance et infrastructure, supporters et médias, modèles économiques internationaux. Analyse en temps réel des publications négatives, identification des sources et des chaînes de propagation, qualification des intentions, recommandations stratégiques.",
        "Monitoring architecture across six structured domains: Botola Pro and African competitions, FRMF/CAF/FIFA, sponsoring and investors, performance technologies and infrastructure, supporters and media, international economic models. Real-time analysis of negative publications, identification of sources and propagation chains, intent qualification, strategic recommendations."
      ),
      kpis: [
        { value: "6", label: t("dossiers de veille structurée","structured monitoring domains") },
        { value: "24/7", label: t("monitoring permanent","permanent monitoring") },
        { value: t("Réactif","Reactive"), label: t("analyse en moins de 24h","analysis in under 24h") },
      ],
      resultsExtra: t("+ Mission d'intelligence stratégique au service d'un acteur emblématique du sport marocain","+ Strategic intelligence mission serving an iconic player of Moroccan sport"),
      tags: [t("SPORT PROFESSIONNEL","PROFESSIONAL SPORT"), t("INTELLIGENCE STRATÉGIQUE","STRATEGIC INTELLIGENCE"), t("GESTION DE CRISE","CRISIS MANAGEMENT"), t("MONITORING NARRATIF","NARRATIVE MONITORING"), t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-07",
      num: "07",
      thematique: "ecosysteme",
      secteur: "industrie",
      thematiqueLabel: t("Écosystème Concurrentiel","Competitive Ecosystem"),
      miniTitle: "OCP Group",
      miniPitch: t("Briser l'encerclement informationnel d'un champion national.","Breaking the informational encirclement of a national champion."),
      miniSecteur: t("Industrie stratégique · 🇲🇦","Strategic industry · 🇲🇦"),
      eyebrow: t("Industrie stratégique nationale","National strategic industry"),
      logos: [{ label: "OCP GROUP", image: logoOcp, alt: "OCP Group" }],
      visualMain: (
        <>
          [ {t("Cartographie d'écosystème","Ecosystem mapping")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Matrice socio-dynamique","+ Socio-dynamic matrix")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: "OCP Group" },
        { label: t("POSTE","ROLE"), value: "Strategic Communication Manager" },
        { label: t("PÉRIODE","PERIOD"), value: "2014" },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc","🇲🇦 Morocco") },
      ],
      titleBefore: t("Briser l'encerclement informationnel d'un ","Breaking the informational encirclement of a "),
      titleEm: t("champion national","national champion"),
      storytelling: t(
        "De 2004 à 2014, OCP Group fait face à une série de campagnes de nuisance commerciale orchestrées sur trois échiquiers : géopolitique, concurrentiel, sociétal. La conséquence est mesurable : perte de notoriété, migration de clients vers la concurrence, brouillage du récit institutionnel d'un champion industriel marocain. Dans une industrie où la perception influence la valorisation, l'environnement informationnel devient un terrain stratégique à part entière.",
        "From 2004 to 2014, OCP Group faces a series of commercial-nuisance campaigns orchestrated across three chessboards: geopolitical, competitive, societal. The consequence is measurable: loss of notoriety, client migration to competitors, blurring of the institutional narrative of a Moroccan industrial champion. In an industry where perception drives valuation, the informational environment becomes a strategic battleground in its own right."
      ),
      mission: t(
        "Réaliser une analyse à 360° de l'environnement informationnel d'OCP, structurer un système de veille permanent et formuler les actions de contre-influence et de communication adaptées à chaque échiquier.",
        "Conduct a 360° analysis of OCP's informational environment, structure a permanent monitoring system, and define counter-influence and communication actions tailored to each chessboard."
      ),
      objectives: [
        t("Mettre en place un système de veille spécifique (image, compétitivité, marché)","Set up a dedicated monitoring system (image, competitiveness, market)"),
        t("Identifier et décrypter les nuisances sur les trois échiquiers (géopolitique, concurrentiel, sociétal)","Identify and decode nuisances on the three chessboards (geopolitical, competitive, societal)"),
        t("Outiller la Direction Générale avec un dispositif de reporting régulier permettant des prises de décision éclairées","Equip the General Management with a regular reporting system enabling informed decisions"),
      ],
      methodo: t(
        "Choix de l'outil de veille, formation des équipes, mise en œuvre de la solution. Méthodologie de collecte et d'analyse des informations à valeur ajoutée. Études, benchmark et décryptage des thématiques sensibles. Matrice socio-dynamique pour positionner et anticiper l'évolution des parties prenantes. Cartographie d'écosystème, scénarisation d'actions, feuille de route et outils décisionnels.",
        "Selection of monitoring tooling, team training, solution implementation. Methodology for collecting and analyzing high-value information. Studies, benchmark and decoding of sensitive issues. Socio-dynamic matrix to position and anticipate stakeholder evolution. Ecosystem mapping, action scenario building, roadmap and decision tools."
      ),
      kpis: [
        { value: t("3 échiquiers","3 chessboards"), label: t("analysés à 360°","analyzed at 360°") },
        { value: t("Permanent","Permanent"), label: t("dispositif de veille déployé","monitoring system deployed") },
        { value: t("Souverain","Sovereign"), label: t("reporting décisionnel haut niveau","top-level decision reporting") },
      ],
      testimony: {
        initials: "SA",
        photo: photoSanaeAlami,
        photoAlt: "Sanaë Alami Afilal, OCP Group",
        text: t(
          "\"Dans le cadre de ses responsabilités de Strategic Communication Manager au sein de la Direction de Communication Corporate OCP Group, Azeddine Yassine assumait les missions qui lui ont été conférées avec dévouement et menait ses projets avec professionnalisme. Doté des capacités d'analyse et de synthèse, Azeddine Yassine est intervenu en parfait conseiller apportant une plus-value certaine pour l'information décisionnelle.\"",
          "\"As Strategic Communication Manager within OCP Group's Corporate Communication Department, Azeddine Yassine carried out his missions with dedication and led his projects with professionalism. With strong analytical and synthesis abilities, he acted as a perfect advisor bringing real added value to decision-making information.\""
        ),
        authorBold: "Sanaë Alami Afilal",
        authorRest: t(", VP Chargée de mission, Direction Générale OCP Group",", VP, Special Advisor to the General Management, OCP Group"),
        date: t("(lettre du 3 mars 2020)","(letter of March 3, 2020)"),
      },
      tags: [t("INDUSTRIE STRATÉGIQUE","STRATEGIC INDUSTRY"), t("INTELLIGENCE COMPÉTITIVE","COMPETITIVE INTELLIGENCE"), t("CARTOGRAPHIE D'ÉCOSYSTÈME","ECOSYSTEM MAPPING"), t("CONTRE-INFLUENCE","COUNTER-INFLUENCE"), t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-08",
      num: "08",
      thematique: "influence",
      secteur: "gouvernement",
      thematiqueLabel: t("Influence & Soft Power","Influence & Soft Power"),
      miniTitle: t("Présidence du Sénégal","Presidency of Senegal"),
      miniPitch: t("Surveiller la notoriété d'un État en temps réel.","Monitoring a State's reputation in real time."),
      miniSecteur: t("Gouvernement · 🇸🇳","Government · 🇸🇳"),
      eyebrow: t("Gouvernement & souveraineté","Government & sovereignty"),
      logos: [{ label: t("PRÉSIDENCE\nDE LA RÉPUBLIQUE\nDU SÉNÉGAL","PRESIDENCY\nOF THE REPUBLIC\nOF SENEGAL"), italic: true, image: logoPresidenceSenegal, alt: "Presidency of the Republic of Senegal" }],
      visualMain: (
        <>
          [ {t("Cartographie stratégique","Strategic mapping")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Tendances émergentes IA","+ AI-driven emerging trends")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Présidence du Sénégal","Presidency of Senegal") },
        { label: t("MISSION","MISSION"), value: t("Veille à 360°","360° intelligence") },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇸🇳 Sénégal","🇸🇳 Senegal") },
      ],
      titleBefore: t("Surveiller la ","Monitoring the "),
      titleEm: t("notoriété d'un État","reputation of a State"),
      titleAfter: t(" en temps réel"," in real time"),
      storytelling: t(
        "Une présidence ouest-africaine fait face à un contexte de turbulence informationnelle aiguë. Sur les plateformes digitales, le récit se fragmente : tendances émergentes, signaux faibles, narratifs concurrents. Pour un cabinet présidentiel, la maîtrise de la perception devient une question de gouvernance. Il faut voir avant de réagir, comprendre avant de décider.",
        "A West-African presidency faces acute informational turbulence. On digital platforms, the narrative fragments: emerging trends, weak signals, competing narratives. For a presidential cabinet, perception mastery becomes a governance issue. One must see before reacting, understand before deciding."
      ),
      mission: t(
        "Mettre en place un dispositif de surveillance de la notoriété de l'État et du Chef de l'État, avec monitoring narratif en temps réel et alertes décisionnelles.",
        "Implement a monitoring system for the reputation of the State and the Head of State, with real-time narrative monitoring and decision-grade alerts."
      ),
      objectives: [
        t("Surveiller en temps réel l'image de l'État sur les plateformes digitales","Monitor the State's image on digital platforms in real time"),
        t("Identifier et décrypter les tendances émergentes et discours nuisibles","Identify and decode emerging trends and harmful narratives"),
        t("Fournir au cabinet présidentiel des outils d'aide à la décision pour adapter la stratégie de communication","Provide the presidential cabinet with decision-support tools to adapt communication strategy"),
      ],
      methodo: t(
        "Cartographie stratégique des interactions et alliances. Surveillance permanente des thématiques émergentes et de leur impact sur l'opinion. Détection des signaux faibles et évaluation des scénarios. Plateforme de veille dédiée à la collecte et l'analyse des données. Investigation digitale et solution de fact-checking.",
        "Strategic mapping of interactions and alliances. Permanent monitoring of emerging topics and their impact on public opinion. Weak-signal detection and scenario evaluation. Dedicated monitoring platform for data collection and analysis. Digital investigation and fact-checking solution."
      ),
      kpis: [
        { value: "24/7", label: t("monitoring narratif","narrative monitoring") },
        { value: t("Temps réel","Real time"), label: t("détection des signaux faibles","weak-signal detection") },
        { value: t("Décisionnel","Decision-grade"), label: t("rapports et alertes au cabinet","reports and alerts to the cabinet") },
      ],
      resultsExtra: t("+ Identification des dynamiques adverses et des vecteurs de désinformation, veille sur les secteurs stratégiques de l'État","+ Identification of adverse dynamics and disinformation vectors, monitoring of the State's strategic sectors"),
      tags: [t("GOUVERNEMENT","GOVERNMENT"), t("NOTORIÉTÉ D'ÉTAT","STATE REPUTATION"), t("MONITORING NARRATIF","NARRATIVE MONITORING"), t("INTELLIGENCE SOUVERAINE","SOVEREIGN INTELLIGENCE"), t("🇸🇳 SÉNÉGAL","🇸🇳 SENEGAL")],
    },
    {
      id: "story-09",
      num: "09",
      thematique: "attractivite",
      secteur: "public",
      thematiqueLabel: t("Attractivité & Rayonnement","Attractiveness & Outreach"),
      miniTitle: "ADD",
      miniPitch: t("Repositionner un acteur public dans son écosystème digital.","Repositioning a public player in its digital ecosystem."),
      miniSecteur: t("Établissement public · 🇲🇦","Public institution · 🇲🇦"),
      eyebrow: t("Établissement public & transformation digitale","Public institution & digital transformation"),
      logos: [{ label: "#ADD", image: logoAdd, alt: "Digital Development Agency" }, { label: "GITEX AFRICA", italic: true }],
      visualMain: (
        <>
          [ {t("Architecture digitale ADD","ADD digital architecture")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Benchmark international","+ International benchmark")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Agence de Développement du Digital","Digital Development Agency") },
        { label: t("PARTENARIAT","PARTNERSHIP"), value: "GITEX Africa Morocco" },
        { label: t("PÉRIODE","PERIOD"), value: "2022 / 2023" },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc","🇲🇦 Morocco") },
      ],
      titleBefore: t("Repositionner un acteur public dans son ","Repositioning a public player in its "),
      titleEm: t("écosystème digital","digital ecosystem"),
      storytelling: t(
        "Cinq ans après sa création, l'Agence de Développement du Digital cherche à consolider sa place dans l'écosystème digital national. Plusieurs initiatives ont été lancées, mais le positionnement mérite d'être clarifié pour faire de l'ADD un acteur incontournable de la transformation digitale marocaine. Une démarche d'audit, d'analyse et de feuille de route s'impose.",
        "Five years after its creation, the Digital Development Agency seeks to consolidate its place in the national digital ecosystem. Several initiatives have been launched, but the positioning deserves to be clarified to make ADD an essential player of Moroccan digital transformation. An audit, analysis and roadmap approach is required."
      ),
      mission: t(
        "Diagnostiquer le positionnement de l'ADD, analyser son empreinte digitale, et proposer une feuille de route pour renforcer son rôle d'acteur central du développement digital national.",
        "Diagnose ADD's positioning, analyze its digital footprint, and propose a roadmap to strengthen its role as a central player of national digital development."
      ),
      objectives: [
        t("Analyser les attributions de l'ADD, son organisation interne et l'écosystème digital national","Analyze ADD's mandate, internal organization and the national digital ecosystem"),
        t("Auditer l'empreinte digitale et benchmarker les meilleures pratiques internationales","Audit digital footprint and benchmark international best practices"),
        t("Proposer une feuille de route stratégique pour améliorer la perception et le rayonnement de l'ADD","Propose a strategic roadmap to improve ADD's perception and outreach"),
      ],
      methodo: t(
        "Diagnostic organisationnel via brainstorming, interviews des directeurs et analyse des verbatims. Analyse de l'empreinte digitale de l'agence. Benchmark des best practices internationales d'agences digitales nationales. Sondage et analyse de l'opinion publique. Solution de veille et d'analyse stratégique. Outils d'évaluation organisationnelle.",
        "Organizational diagnosis via brainstorming, director interviews and verbatim analysis. Analysis of the agency's digital footprint. Benchmark of international best practices of national digital agencies. Public opinion survey and analysis. Strategic monitoring and analysis solution. Organizational assessment tools."
      ),
      kpis: [
        { value: t("Audit","Audit"), label: t("organisationnel et digital complet","full organizational and digital audit") },
        { value: t("Cellule","Unit"), label: t("de veille mise en place","monitoring unit deployed") },
        { value: "GITEX Africa", label: t("partenariat stratégique recommandé","strategic partnership recommended") },
      ],
      resultsExtra: t("+ Diversification de la communication multicanale, formation des directeurs et chefs de département","+ Multi-channel communication diversification, training of directors and department heads"),
      tags: [t("ÉTABLISSEMENT PUBLIC","PUBLIC INSTITUTION"), t("TRANSFORMATION DIGITALE","DIGITAL TRANSFORMATION"), t("BENCHMARK INTERNATIONAL","INTERNATIONAL BENCHMARK"), t("FEUILLE DE ROUTE","ROADMAP"), t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-10",
      num: "10",
      thematique: "attractivite",
      secteur: "sante",
      thematiqueLabel: t("Attractivité & Rayonnement","Attractiveness & Outreach"),
      miniTitle: t("Hôpital Universitaire Med VI","Mohammed VI University Hospital"),
      miniPitch: t("Crédibiliser l'attractivité d'un hôpital universitaire de référence.","Building the credible attractiveness of a leading university hospital."),
      miniSecteur: t("Santé · 🇲🇦","Healthcare · 🇲🇦"),
      eyebrow: t("Santé & attractivité hospitalière","Healthcare & hospital attractiveness"),
      logos: [{ label: t("HUIM VI\nBOUSKOURA","HUIM VI\nBOUSKOURA"), italic: true, image: logoHopital, alt: "Mohammed VI International University Hospital – Bouskoura" }],
      visualMain: (
        <>
          [ Stakeholders Mapping<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Audit digital hospitalier","+ Hospital digital audit")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Hôpital Universitaire Med VI","Mohammed VI University Hospital") },
        { label: t("LOCALISATION","LOCATION"), value: "Bouskoura" },
        { label: t("PÉRIODE","PERIOD"), value: "2022" },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc","🇲🇦 Morocco") },
      ],
      titleBefore: t("Crédibiliser l'attractivité d'un ","Building the credible attractiveness of a "),
      titleEm: t("hôpital universitaire de référence","leading university hospital"),
      storytelling: t(
        "2022. L'Hôpital Universitaire International Mohammed VI, établissement de santé moderne situé à Bouskoura, souhaite renforcer son positionnement et son attractivité dans un écosystème hospitalier marocain compétitif. La direction générale et la direction de la communication mandatent une étude stratégique pour bâtir une feuille de route dédiée à la notoriété, à l'image institutionnelle et à l'engagement des acteurs clés (patients, médecins, partenaires).",
        "2022. The Mohammed VI International University Hospital, a modern healthcare institution located in Bouskoura, seeks to strengthen its positioning and attractiveness within a competitive Moroccan hospital ecosystem. General management and communication leadership commission a strategic study to build a roadmap dedicated to notoriety, institutional image and the engagement of key stakeholders (patients, doctors, partners)."
      ),
      mission: t(
        "Réaliser une étude stratégique sur l'image et la notoriété de l'établissement et activer les leviers d'attractivité ascendante via une approche d'intelligence et de communication ciblée.",
        "Carry out a strategic study on the institution's image and notoriety, and activate the levers of upward attractiveness through targeted intelligence and communication."
      ),
      objectives: [
        t("Asseoir la réputation aux niveaux régional, national et international","Establish reputation at regional, national and international levels"),
        t("Sceller le positionnement au sein de l'écosystème médical et de la santé au Maroc","Seal positioning within the medical and healthcare ecosystem in Morocco"),
        t("Crédibiliser l'attractivité auprès des patients et valoriser les médecins","Build credible attractiveness for patients and elevate physicians"),
      ],
      methodo: t(
        "Vingt jours d'immersion : meetings, entretiens individuels, séances de brainstorming, analyse des verbatims. Cartographie des parties prenantes (Stakeholders Mapping). Analyse de l'écosystème (emplacement géographique, environnement concurrentiel, acteurs clés). Audit digital approfondi (architecture, SEO, contenu, réseaux sociaux). Production d'une feuille de route stratégique en 18 recommandations opérationnelles.",
        "Twenty days of immersion: meetings, individual interviews, brainstorming sessions, verbatim analysis. Stakeholders Mapping. Ecosystem analysis (geographic location, competitive environment, key actors). In-depth digital audit (architecture, SEO, content, social media). Production of a strategic roadmap with 18 operational recommendations."
      ),
      kpis: [
        { value: t("18 reco.","18 recs"), label: t("stratégiques opérationnelles","operational strategic recommendations") },
        { value: t("Feuille de route","Roadmap"), label: t("différenciée par cible et enjeu","differentiated by audience and issue") },
        { value: "Stakeholders", label: t("écosystème complet cartographié","full ecosystem mapped") },
      ],
      resultsExtra: t("+ Stratégie de Content Intelligence par cible (DG, personnel, professionnels de santé, institutions)","+ Content Intelligence strategy by audience (GM, staff, health professionals, institutions)"),
      tags: [t("SANTÉ","HEALTHCARE"), t("ATTRACTIVITÉ HOSPITALIÈRE","HOSPITAL ATTRACTIVENESS"), "STAKEHOLDERS MAPPING", t("STRATÉGIE DE COMMUNICATION","COMMUNICATION STRATEGY"), t("🇲🇦 MAROC","🇲🇦 MOROCCO")],
    },
    {
      id: "story-11",
      num: "11",
      thematique: "due-diligence",
      secteur: "finance",
      thematiqueLabel: t("Due Diligence & Investissement","Due Diligence & Investment"),
      miniTitle: t("Due Diligence Internationale","International Due Diligence"),
      miniPitch: t("Lever le voile sur un investisseur en zone de risque.","Lifting the veil on an investor in a risk zone."),
      miniSecteur: t("Finance & Conformité · 🇲🇦 🌍","Finance & Compliance · 🇲🇦 🌍"),
      eyebrow: t("Deep Due Diligence & conformité","Deep Due Diligence & compliance"),
      logos: [{ label: t("CONFIDENTIEL\nNDA STRICT","CONFIDENTIAL\nSTRICT NDA"), italic: true }],
      visualMain: (
        <>
          [ {t("Cartographie d'investisseurs internationaux","Mapping of international investors")}<br />
          <span style={{ color: "var(--bf-gold)" }}>{t("+ Code feu vert / orange / rouge","+ Green / amber / red traffic-light code")}</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: t("Entreprise marocaine (NDA strict)","Moroccan company (strict NDA)") },
        { label: t("CIBLE","TARGET"), value: t("Capital-Risque sous sanctions","Venture Capital under sanctions") },
        { label: t("SECTEUR","SECTOR"), value: "IT / Tech" },
        { label: t("PÉRIODE","PERIOD"), value: "2024 · 🇲🇦 🌍" },
      ],
      titleBefore: t("Lever le voile sur un investisseur en ","Lifting the veil on an investor in a "),
      titleEm: t("zone de risque","risk zone"),
      storytelling: t(
        "Novembre 2024, Marrakech. Une entreprise marocaine s'apprête à entrer en relation d'affaires avec un fonds d'investissement issu d'une juridiction soumise à un régime de sanctions internationales, lors d'un rassemblement de quarante investisseurs étrangers. Avant tout engagement, une question s'impose : qui sont vraiment les acteurs derrière la société cible ? Quels liens, quels actionnaires, quels risques de conformité ? Une investigation Deep Due Diligence devient indispensable.",
        "November 2024, Marrakech. A Moroccan company is about to engage with an investment fund from a jurisdiction under international sanctions, at a gathering of forty foreign investors. Before any commitment, one question arises: who are the real actors behind the target company? Which links, which shareholders, which compliance risks? A Deep Due Diligence investigation becomes indispensable."
      ),
      mission: t(
        "Réaliser une radiologie d'honorabilité complète sur une société cible et ses investisseurs, dans un contexte de conformité internationale renforcée et de risque réputationnel.",
        "Conduct a full integrity radiology of a target company and its investors, in a context of reinforced international compliance and reputational risk."
      ),
      objectives: [
        t("Cibler une seule société dans le secteur Capital-Risque IT","Target a single company in the IT Venture Capital sector"),
        t("Mener une investigation informationnelle de conformité complète sur l'entreprise et ses investisseurs","Run a full compliance information investigation on the company and its investors"),
        t("Identifier les dynamiques adverses et vecteurs de risque","Identify adverse dynamics and risk vectors"),
      ],
      methodo: t(
        "Plateforme de veille dédiée à la collecte et l'analyse des données. Solution de Fact-Checking et de cartographie des dirigeants. Screening PEP, vérifications sanctions ONU/OFAC/UE. Audit KYC, LCB-FT, ESG. Cartographie des interconnexions entre dirigeants et entreprises dans différents pays. Analyse sur les secteurs stratégiques et les concurrents.",
        "Dedicated monitoring platform for data collection and analysis. Fact-Checking solution and executive mapping. PEP screening, UN/OFAC/EU sanctions checks. KYC, AML-CFT, ESG audit. Mapping of interconnections between executives and companies across countries. Analysis of strategic sectors and competitors."
      ),
      kpis: [
        { value: "400 M$", label: t("valorisation auditée","valuation audited") },
        { value: t("Code 3 niv.","3-level code"), label: t("vert / orange / rouge pour décision","green / amber / red for decision") },
        { value: t("NDA strict","Strict NDA"), label: t("confidentialité absolue","absolute confidentiality") },
      ],
      resultsExtra: t("+ Cartographie complète des interconnexions internationales et identification des risques de conformité","+ Full mapping of international interconnections and identification of compliance risks"),
      tags: [t("DEEP DUE DILIGENCE","DEEP DUE DILIGENCE"), t("CONFORMITÉ INTERNATIONALE","INTERNATIONAL COMPLIANCE"), "KYC / AML-CFT", t("CARTOGRAPHIE D'ACTEURS","ACTOR MAPPING"), "🇲🇦 🌍"],
    },
    {
      id: "story-12",
      num: "12",
      thematique: "communication",
      secteur: "sante",
      thematiqueLabel: t("Ingénierie de communication","Communication engineering"),
      miniTitle: t("Livre Blanc e-Santé","e-Health White Paper"),
      miniPitch: t("Quand la vision stratégique accélère la politique publique.","When strategic vision accelerates public policy."),
      miniSecteur: t("E-Santé · 🇲🇦 🌍","E-Health · 🇲🇦 🌍"),
      eyebrow: t("E-Santé & Innovation publique","E-Health & Public innovation"),
      logos: [
        { label: "UM5" },
        { label: "UM6SS" },
        { label: t("OMS","WHO") },
      ],
      visualMain: (
        <>
          [ {t("1er Livre Blanc national","1st national White Paper")}<br />
          <span style={{ color: "var(--bf-gold)" }}>"{t("La e-Santé au Maroc : Réalités, enjeux et leviers de développement","Morocco's e-Health: Realities, challenges and development levers")}"</span> ]
        </>
      ),
      meta: [
        { label: t("CLIENT","CLIENT"), value: "UM5 · UM6SS" },
        { label: t("PÉRIODE","PERIOD"), value: "2021 / 2022" },
        { label: t("GÉOGRAPHIE","GEOGRAPHY"), value: t("🇲🇦 Maroc · 🌍 International","🇲🇦 Morocco · 🌍 International") },
      ],
      titleBefore: t("Concevoir le 1er Livre Blanc sur la e-Santé au Maroc et ","Designing Morocco's 1st e-Health White Paper and "),
      titleEm: t("influencer la politique publique","influencing public policy"),
      storytelling: t(
        "Le Maroc ne disposait d'aucune cartographie structurée de son écosystème e-santé. L'Université Mohammed V de Rabat et UM6SS, en partenariat avec Buildfluence, lancent le chantier du 1er Livre Blanc sur la e-Santé au Maroc : une initiative inédite à l'échelle nationale, préfacée par le Directeur Général de l'OMS Dr Tedros Adhanom Ghebreyesus et trois ministres marocains. Un vide stratégique majeur à combler, une opportunité de positionner le Maroc comme hub régional de la santé numérique.",
        "Morocco had no structured mapping of its e-health ecosystem. Mohammed V University of Rabat and UM6SS, in partnership with Buildfluence, launched Morocco's first e-Health White Paper: an unprecedented national initiative, prefaced by WHO Director-General Dr Tedros Adhanom Ghebreyesus and three Moroccan ministers. A major strategic gap to fill, and an opportunity to position Morocco as a regional hub for digital health."
      ),
      mission: t(
        "Produire une analyse stratégique complète de la réalité e-santé au Maroc, identifier les freins structurels et formuler des recommandations actionnables à destination des décideurs publics et des acteurs de l'écosystème santé national.",
        "Produce a complete strategic analysis of e-health reality in Morocco, identify structural barriers and formulate actionable recommendations for public decision-makers and stakeholders of the national health ecosystem."
      ),
      objectives: [
        t("Cartographier l'écosystème national et international de la santé numérique sur 193 pays","Map the national and international digital health ecosystem across 193 countries"),
        t("Concevoir et analyser deux enquêtes digitales (qualitative et quantitative) auprès des professionnels et praticiens de la santé","Design and analyze two digital surveys (qualitative and quantitative) among health professionals and practitioners"),
        t("Produire l'intégralité des data visualisations, la méthodologie en mode projet et l'étude de marché mondial de la santé digitale","Produce all data visualizations, the project-mode methodology and the global digital health market study"),
        t("Formuler des recommandations stratégiques pour une Roadmap pragmatique e-santé au Maroc","Formulate strategic recommendations for a pragmatic e-Health roadmap in Morocco"),
      ],
      methodo: t(
        "Intelligence stratégique en mode projet : conception des questionnaires des deux enquêtes digitales et analyse des données (qualitative et quantitative). Étude de marché mondial de la santé digitale appuyée sur des indices internationaux (UN-EGDI, WIPO-GII) couvrant 193 pays. Réalisation de l'intégralité des data visualisations du document. Entretiens avec les professionnels et praticiens de la santé. Benchmark des meilleures pratiques internationales en e-santé.",
        "Strategic intelligence in project mode: design of questionnaires for both digital surveys and data analysis (qualitative and quantitative). Global digital health market study based on international indices (UN-EGDI, WIPO-GII) covering 193 countries. Full production of the document's data visualizations. Interviews with health professionals and practitioners. Benchmark of international best practices in e-health."
      ),
      kpis: [
        { value: t("1er Livre Blanc","1st White Paper"), label: t("e-Santé au Maroc · Initiative nationale inédite","e-Health in Morocco · Unprecedented national initiative") },
        { value: t("OMS + 3 Ministres","WHO + 3 Ministers"), label: t("Préfaces officielles et interventions ministérielles","Official prefaces and ministerial interventions") },
        { value: "190M MAD", label: t("Appel d'offres Ministère de la Santé 2024 · Système intelligent","Ministry of Health 2024 tender · Intelligent system") },
      ],
      resultsExtra: t("★ Les recommandations du Livre Blanc ont directement alimenté l'appel d'offres 2024 du Ministère de la Santé pour la mise en place d'un système de santé intelligent incluant le Dossier Patient Partagé national 360°.","★ The White Paper's recommendations directly fed the Ministry of Health's 2024 tender to deploy an intelligent health system including the national 360° Shared Patient Record."),
      tags: [t("E-SANTÉ","E-HEALTH"), t("TRANSFORMATION DIGITALE","DIGITAL TRANSFORMATION"), t("BENCHMARK INTERNATIONAL","INTERNATIONAL BENCHMARK"), t("POLITIQUE PUBLIQUE","PUBLIC POLICY"), t("RECHERCHE STRATÉGIQUE","STRATEGIC RESEARCH"), "🇲🇦 🌍"],
    },
  ];

  const matches = (s: Story) =>
    (thematique === "all" || s.thematique === thematique) &&
    (secteur === "all" || s.secteur === secteur);

  return (
    <div className="ss-page" style={{ minHeight: "100vh" }}>
      <style>{SuccessStoriesCSS}</style>
      <Navbar />

      <header className="ss-header">
        <div className="ss-eyebrow">SUCCESS STORIES</div>
        <h1 className="ss-title">
          {t("Là où l'", "Where ")}<em>{t("intelligence", "intelligence")}</em>
          <br />
          {t("change l'issue.", "changes the outcome.")}
        </h1>
        <p className="ss-chapeau">
          {t(
            "Des missions, des contextes critiques, une méthode constante. Comprendre avant d'agir, agir sans bruit, mesurer ce qui change vraiment.",
            "Missions, critical contexts, a constant method. Understand before acting, act without noise, measure what truly changes."
          )}
        </p>
      </header>

      <section className="ss-filters">
        <div className="ss-filter-selects">
          <select
            className="ss-filter-select"
            value={thematique}
            onChange={(e) => setThematique(e.target.value as Thematique)}
            aria-label={t("Filtrer par thématique", "Filter by topic")}
          >
            <option value="all">{t("Par Thématique ↓", "By Topic ↓")}</option>
            {THEMATIQUES.filter((th) => th.value !== "all").map((th) => (
              <option key={th.value} value={th.value}>{th.label}</option>
            ))}
          </select>
          <select
            className="ss-filter-select"
            value={secteur}
            onChange={(e) => setSecteur(e.target.value as Secteur)}
            aria-label={t("Filtrer par secteur", "Filter by sector")}
          >
            <option value="all">{t("Par Secteur ↓", "By Sector ↓")}</option>
            {SECTEURS.filter((s) => s.value !== "all").map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="ss-mini-section">
        <div className="ss-mini-grid">
          {stories.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => { e.preventDefault(); openStory(s.id); }}
              className={`ss-mini-card${matches(s) ? "" : " ss-hidden"}`}
            >
              <div>
                <span className="ss-mini-num">{s.num}.</span>
                <span className="ss-mini-thema">{s.thematiqueLabel}</span>
              </div>
              <div className="ss-mini-title">
                {s.logos[0]?.image ? (
                  <img
                    src={s.logos[0].image}
                    alt={s.logos[0].alt || s.miniTitle}
                    className="ss-mini-logo-img"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      if (img.parentElement) img.parentElement.textContent = s.miniTitle;
                    }}
                  />
                ) : (
                  s.miniTitle
                )}
              </div>
              <div className="ss-mini-pitch">{s.miniPitch}</div>
              <div className="ss-mini-secteur-line">{s.miniSecteur}</div>
            </a>
          ))}

        </div>
      </section>

      <main className="ss-stories">
        {stories.filter((s) => s.id === selectedId).map((s) => (
          <article key={s.id} id={s.id} className="ss-story">

            <div className="ss-visual">
              <div className="ss-story-eyebrow">
                {t("— Success Story · ", "— Success Story · ")}{s.num}
                <br />
                {s.eyebrow}
              </div>
              <div className="ss-logos">
                {s.logos.map((l, i) => (
                  <div key={i} className={`ss-logo${l.italic ? " italic" : ""}`}>
                    {l.image ? (
                      <img
                        src={l.image}
                        alt={l.alt || l.label}
                        className="ss-logo-img"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.style.display = "none";
                          if (img.parentElement) img.parentElement.textContent = l.label;
                        }}
                      />
                    ) : (
                      l.label
                    )}
                  </div>
                ))}
              </div>
              <div className="ss-visual-main">{s.visualMain}</div>
              {s.resources && s.resources.length > 0 && (
                <div className="ss-resources">
                  <div className="ss-res-label">{t("— Ressources liées", "— Related resources")}</div>
                  {s.resources.map((r, i) => (
                    <a key={i} href="#" className="ss-res-link" onClick={(e) => e.preventDefault()}>
                      <span className="ss-res-type">{r.type}</span>
                      {r.text}
                    </a>
                  ))}
                </div>
              )}
              <div className="ss-meta">
                {s.meta.map((m, i) => (
                  <div key={i} className="ss-meta-line">
                    <strong>{m.label}</strong> {m.value}
                  </div>
                ))}
              </div>
            </div>

            <div className="ss-content">
              <div className="ss-num">{t("SUCCESS STORY · ", "SUCCESS STORY · ")}{s.num} / 12</div>
              <h2 className="ss-story-title">
                {s.titleBefore}
                <em>{s.titleEm}</em>
                {s.titleAfter}
              </h2>

              <div className="ss-section-label first">{t("— Storytelling", "— Storytelling")}</div>
              <p className="ss-storytelling">{s.storytelling}</p>

              <div className="ss-section-label">{t("— Mission", "— Mission")}</div>
              <div className="ss-mission">{s.mission}</div>

              <div className="ss-section-label">{t("— Objectifs", "— Objectives")}</div>
              <ol className="ss-objectives">
                {s.objectives.map((o, i) => (<li key={i}>{o}</li>))}
              </ol>

              <div className="ss-section-label">{t("— Méthodologie", "— Methodology")}</div>
              <p className="ss-methodo">{s.methodo}</p>

              <div className="ss-section-label">{t("— Résultats", "— Results")}</div>
              <div className="ss-results">
                {s.kpis.map((k, i) => (
                  <div key={i} className="ss-kpi">
                    <div className="ss-kpi-value">{k.value}</div>
                    <div className="ss-kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>
              {s.resultsExtra && <p className="ss-results-extra">{s.resultsExtra}</p>}

              {s.testimony && (
                <div className="ss-testimony">
                  <div className="ss-test-photo">
                    {s.testimony.photo ? (
                      <img
                        src={s.testimony.photo}
                        alt={s.testimony.photoAlt || s.testimony.authorBold}
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.style.display = "none";
                          if (img.parentElement) img.parentElement.textContent = s.testimony!.initials;
                        }}
                      />
                    ) : (
                      s.testimony.initials
                    )}
                  </div>
                  <div className="ss-test-body">
                    <p className="ss-test-text">{s.testimony.text}</p>
                    <div className="ss-test-author">
                      <strong>{s.testimony.authorBold}</strong>
                      {s.testimony.authorRest}
                      {s.testimony.date && <span>{s.testimony.date}</span>}
                    </div>
                  </div>
                </div>
              )}

              <div className="ss-tags">
                {s.tags.map((tag, i) => (
                  <span key={i}>
                    {tag}
                    {i < s.tags.length - 1 && <span className="sep">·</span>}
                  </span>
                ))}
              </div>

              <nav className="ss-story-nav" aria-label={t("Navigation entre stories", "Stories navigation")}>
                {parseInt(s.num, 10) > 1 && (
                  <a href={`#story-${String(parseInt(s.num, 10) - 1).padStart(2, "0")}`}>
                    {t("← Story précédente", "← Previous Story")}
                  </a>
                )}
                {parseInt(s.num, 10) < stories.length && (
                  <a href={`#story-${String(parseInt(s.num, 10) + 1).padStart(2, "0")}`}>
                    {t("Story suivante →", "Next Story →")}
                  </a>
                )}
                <a className="all" href="/success-stories">
                  {t("↩ Toutes les Success Stories", "↩ All Success Stories")}
                </a>
              </nav>
            </div>
          </article>
        ))}
      </main>

      <CTAFooter />
    </div>
  );
};

export default SuccessStoriesPage;
