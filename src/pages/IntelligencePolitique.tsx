import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIPTheme } from "@/contexts/ThemeContext";
import IPClassements from "./ip/IPClassements";
import IPCartographie from "./ip/IPCartographie";
import IPActeurs from "./ip/IPActeurs";
import IPDynamiques from "./ip/IPDynamiques";

type PanelSlug =
  | "dashboard"
  | "classements"
  | "opinion"
  | "cartographie"
  | "acteurs"
  | "dynamiques"
  | "methodologie"
  | "a-propos";


interface Props {
  panel?: PanelSlug;
}

const SEO_BY_PANEL: Record<PanelSlug, { titleFr: string; titleEn: string; descFr: string; descEn: string; path: string }> = {
  "dashboard": {
    titleFr: "Intelligence Politique · Législatives Maroc 2026",
    titleEn: "Political Intelligence · Morocco Legislative 2026",
    descFr: "Plateforme d'analyse de données Buildfluence pour les législatives Maroc 2026. IBDN®, cartographie narrative, opinion, acteurs. Maquette de démonstration.",
    descEn: "Buildfluence data-analysis platform for Morocco's 2026 legislative election. IBDN®, narrative graph, opinion, actors. Demonstration mockup.",
    path: "/insights-resources/intelligence-politique",
  },
  "classements": {
    titleFr: "Classements · Intelligence Politique",
    titleEn: "Rankings · Political Intelligence",
    descFr: "Classement IBDN® des partis et personnalités politiques. Progressions et reculs. Maquette de démonstration Buildfluence.",
    descEn: "IBDN® ranking of parties and political figures. Gains and losses. Buildfluence demonstration mockup.",
    path: "/insights-resources/intelligence-politique/classements",
  },
  "opinion": {
    titleFr: "Opinion · Intelligence Politique",
    titleEn: "Opinion · Political Intelligence",
    descFr: "Analyse thématique du débat public marocain : pouvoir d'achat, emploi, santé, éducation, sécurité. Maquette de démonstration.",
    descEn: "Thematic analysis of Moroccan public debate: purchasing power, employment, health, education, security. Demonstration mockup.",
    path: "/insights-resources/intelligence-politique/opinion",
  },
  "cartographie": {
    titleFr: "Cartographie Territoriale · Intelligence Politique",
    titleEn: "Territorial Mapping · Political Intelligence",
    descFr: "Cartographie des dynamiques politiques par région marocaine. Maquette de démonstration Buildfluence.",
    descEn: "Mapping of political dynamics by Moroccan region. Buildfluence demonstration mockup.",
    path: "/insights-resources/intelligence-politique/cartographie",
  },
  "acteurs": {
    titleFr: "Acteurs · Intelligence Politique",
    titleEn: "Actors · Political Intelligence",
    descFr: "Analyse multidimensionnelle des acteurs politiques : popularité, crédibilité, influence, mobilisation, engagement, leadership.",
    descEn: "Multidimensional analysis of political actors: popularity, credibility, influence, mobilization, engagement, leadership.",
    path: "/insights-resources/intelligence-politique/acteurs",
  },
  "dynamiques": {
    titleFr: "Dynamiques Politiques · Intelligence Politique",
    titleEn: "Political Dynamics · Political Intelligence",
    descFr: "Cartographie relationnelle des rapports de force : partis, leaders, sujets de débat et opinion citoyenne. Maquette de démonstration Buildfluence.",
    descEn: "Relational mapping of power dynamics: parties, leaders, debate topics and citizen opinion. Buildfluence demonstration mockup.",
    path: "/insights-resources/intelligence-politique/dynamiques-politiques",
  },
  "methodologie": {

    titleFr: "Méthodologie · Intelligence Politique",
    titleEn: "Methodology · Political Intelligence",
    descFr: "Méthodologie de l'IBDN® : huit dimensions, gouvernance et sources. Buildfluence, infrastructure souveraine de décision.",
    descEn: "IBDN® methodology: eight dimensions, governance and sources. Buildfluence, sovereign decision infrastructure.",
    path: "/insights-resources/intelligence-politique/methodologie",
  },
  "a-propos": {
    titleFr: "À propos · Intelligence Politique",
    titleEn: "About · Political Intelligence",
    descFr: "Buildfluence, infrastructure souveraine de décision. Ce projet relève de l'analyse de données, pas du conseil.",
    descEn: "Buildfluence, sovereign decision infrastructure. This project is data analysis, not consulting.",
    path: "/insights-resources/intelligence-politique/a-propos",
  },
};

const SLUG_TO_ROUTE: Record<string, string> = {
  "dashboard": "/insights-resources/intelligence-politique",
  "classements": "/insights-resources/intelligence-politique/classements",
  "opinion": "/insights-resources/intelligence-politique/opinion",
  "cartographie": "/insights-resources/intelligence-politique/cartographie",
  "acteurs": "/insights-resources/intelligence-politique/acteurs",
  "dynamiques": "/insights-resources/intelligence-politique/dynamiques-politiques",

  "methodologie": "/insights-resources/intelligence-politique/methodologie",
  "a-propos": "/insights-resources/intelligence-politique/a-propos",
};

const IFRAME_PANELS = new Set<PanelSlug>(["dashboard", "opinion", "methodologie", "a-propos"]);

const IntelligencePolitique = ({ panel = "dashboard" }: Props) => {
  const { lang } = useLanguage();
  const { theme } = useIPTheme();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const meta = SEO_BY_PANEL[panel];
  const useIframe = IFRAME_PANELS.has(panel);

  useEffect(() => {
    if (!useIframe) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [useIframe]);

  // Sync URL when the iframe user clicks internal tabs
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data as { type?: string; slug?: string } | undefined;
      if (!d || d.type !== "ip-tab" || !d.slug) return;
      const target = SLUG_TO_ROUTE[d.slug];
      if (target && target !== window.location.pathname) {
        navigate(target, { replace: false });
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [navigate]);

  // When the panel prop changes (and we're on iframe route), sync the iframe panel
  useEffect(() => {
    if (!useIframe) return;
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage({ type: "ip-set-panel", slug: panel }, "*");
  }, [panel, useIframe]);

  // Sync theme changes to the iframe (in case the parent flips theme while iframe stays mounted)
  useEffect(() => {
    if (!useIframe) return;
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage({ type: "ip-set-theme", theme }, "*");
  }, [theme, useIframe]);

  const seo = (
    <SEO
      titleFr={meta.titleFr}
      titleEn={meta.titleEn}
      descriptionFr={meta.descFr}
      descriptionEn={meta.descEn}
      path={meta.path}
    />
  );

  if (panel === "classements") return (<>{seo}<IPClassements /></>);
  if (panel === "cartographie") return (<>{seo}<IPCartographie /></>);
  if (panel === "acteurs") return (<>{seo}<IPActeurs /></>);

  return (
    <>
      {seo}
      <div style={{ position: "fixed", inset: 0, background: theme === "light" ? "#FAF6ED" : "#0D1B2A" }}>
        <iframe
          ref={iframeRef}
          src={`/intelligence-politique.html?lang=${lang}&panel=${panel}&theme=${theme}`}
          title="Intelligence Politique"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    </>
  );
};

export default IntelligencePolitique;
