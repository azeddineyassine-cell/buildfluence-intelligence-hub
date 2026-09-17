import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { MapPinned, MousePointerClick, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "fr" | "en";

type Step = {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  Icon: typeof MapPinned;
};

const content: Record<Language, { steps: Step[]; cta: string }> = {
  fr: {
    steps: [
      {
        number: "01",
        title: "TERRITORIALISER",
        subtitle: "Rendre l’offre localisable",
        body: "Transformer les atouts nationaux en opportunités territoriales directement explorables : régions, foncier, infrastructures, écosystèmes, talents, incitations et interlocuteurs compétents.",
        Icon: MapPinned,
      },
      {
        number: "02",
        title: "OBJECTIVER",
        subtitle: "Rendre la décision comparable",
        body: "Permettre à l’investisseur de comparer les territoires, les coûts, les conditions d’implantation et les risques à partir de données vérifiables, sourcées et adaptées à son projet.",
        Icon: Scale,
      },
      {
        number: "03",
        title: "CONVERTIR",
        subtitle: "Passer de l’intérêt à l’action",
        body: "Activer un cockpit self-service investisseur qui transforme une sélection territoriale en démarche concrète : simulation, qualification du projet, préparation du dossier et mise en relation immédiate avec l’AMDIE, le CRI ou l’autorité compétente.",
        Icon: MousePointerClick,
      },
    ],
    cta: "Ouvrir le Simulateur ↗",

  },
  en: {
    steps: [
      {
        number: "01",
        title: "TERRITORIALISE",
        subtitle: "Make the offer locatable",
        body: "Turn national assets into directly explorable territorial opportunities: regions, land, infrastructure, ecosystems, talent, incentives and the relevant institutional contacts.",
        Icon: MapPinned,
      },
      {
        number: "02",
        title: "OBJECTIFY",
        subtitle: "Make the decision comparable",
        body: "Enable investors to compare territories, costs, establishment conditions and risks using verifiable, sourced data adapted to their project.",
        Icon: Scale,
      },
      {
        number: "03",
        title: "CONVERT",
        subtitle: "Move from interest to action",
        body: "Activate a self-service investor cockpit that turns a territorial selection into a concrete process: simulation, project qualification, application preparation and immediate connection with AMDIE, the CRI or the relevant authority.",
        Icon: MousePointerClick,
      },
    ],
    cta: "Open the Simulator",
    secondary: "Continue to the Geostrategic Synthesis",
  },
};

const STYLES = `
  .pdt-root{position:relative;margin-top:clamp(24px,4vh,44px);font-family:'DM Sans',sans-serif;color:var(--ink)}
  .pdt-track{position:absolute;left:8%;right:8%;top:70px;height:2px;background:var(--gold);transform:rotate(-4deg);transform-origin:center;opacity:.72;pointer-events:none}
  .pdt-grid{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,2vw,24px);align-items:start}
  .pdt-step{position:relative;margin-top:var(--pdt-rise);border:1px solid var(--rule);border-radius:2px;background:var(--card);overflow:hidden}
  .pdt-trigger{width:100%;min-height:108px;display:grid;grid-template-columns:42px 1fr 18px;gap:12px;align-items:center;padding:16px;border:0;background:transparent;color:var(--ink);text-align:left;cursor:pointer}
  .pdt-trigger:hover{background:color-mix(in srgb,var(--gold) 8%,var(--card))}
  .pdt-trigger:focus-visible{outline:2px solid var(--gold);outline-offset:-3px}
  .pdt-icon{width:38px;height:38px;display:grid;place-items:center;border:1px solid var(--gold);border-radius:2px;color:var(--gold)}
  .pdt-icon svg{width:19px;height:19px}
  .pdt-number{display:block;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;color:var(--gold);margin-bottom:4px}
  .pdt-title{display:block;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--ink)}
  .pdt-chevron{font-family:'JetBrains Mono',monospace;color:var(--gold);transform:rotate(0);transition:transform .2s ease}
  .pdt-trigger[aria-expanded="true"] .pdt-chevron{transform:rotate(45deg)}
  .pdt-panel{padding:0 16px 18px;border-top:1px solid var(--rule)}
  .pdt-subtitle{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;line-height:1.25;margin:15px 0 8px;color:var(--ink)}
  .pdt-body{font-size:13px;line-height:1.65;color:var(--ink-light)}
  .pdt-cta{width:100%!important;margin-top:16px!important;min-height:44px!important;border:1px solid var(--gold)!important;border-radius:2px!important;background:var(--gold)!important;color:#0D1B2A!important;font-family:'JetBrains Mono',monospace!important;font-size:9px!important;font-weight:700!important;letter-spacing:.1em!important;white-space:normal!important;text-transform:uppercase!important}
  .pdt-cta:hover{background:var(--gold-hover,var(--gold-soft))!important}
  .pdt-secondary{display:block;width:100%;margin-top:10px;padding:8px 4px;border:0;background:transparent;color:var(--ink-light);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-align:center;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
  .pdt-secondary:hover{color:var(--gold)}
  .pdt-secondary:focus-visible{outline:2px solid var(--gold);outline-offset:1px}
  @media(max-width:760px){
    .pdt-track{left:21px;right:auto;top:26px;bottom:26px;width:2px;height:auto;transform:none}
    .pdt-grid{grid-template-columns:1fr;gap:10px}
    .pdt-step{margin-top:0}
  }
  @media(prefers-reduced-motion:reduce){.pdt-chevron{transition:none}}
`;

interface PositioningDecisionTrajectoryProps {
  hostDocument: Document;
}

const PositioningDecisionTrajectory = ({ hostDocument }: PositioningDecisionTrajectoryProps) => {
  const [language, setLanguage] = useState<Language>(hostDocument.documentElement.lang === "en" ? "en" : "fr");
  const [openStep, setOpenStep] = useState<number | null>(null);

  useEffect(() => {
    const root = hostDocument.documentElement;
    const sync = () => setLanguage(root.lang === "en" ? "en" : "fr");
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, [hostDocument]);

  const openSimulator = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", "cout");
    window.open(`${window.location.pathname}?${params.toString()}`, "_blank", "noopener,noreferrer");
    const target = hostDocument.getElementById("synthese-geostrategique");
    target?.scrollIntoView({ behavior: "auto", block: "start" });
  };


  return (
    <div className="pdt-root">
      <style>{STYLES}</style>
      <div className="pdt-track" aria-hidden="true" />
      <div className="pdt-grid">
        {content[language].steps.map((step, index) => {
          const expanded = openStep === index;
          const panelId = `pdt-panel-${index}`;
          const { Icon } = step;
          return (
            <article className="pdt-step" style={{ "--pdt-rise": `${(2 - index) * 26}px` } as CSSProperties} key={step.number}>
              <button
                className="pdt-trigger"
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenStep(expanded ? null : index)}
              >
                <span className="pdt-icon"><Icon aria-hidden="true" /></span>
                <span><span className="pdt-number">{step.number}</span><span className="pdt-title">{step.title}</span></span>
                <span className="pdt-chevron" aria-hidden="true">+</span>
              </button>
              {expanded && (
                <div className="pdt-panel" id={panelId}>
                  <h4 className="pdt-subtitle">{step.subtitle}</h4>
                  <p className="pdt-body">{step.body}</p>
                  {index === 2 && (
                    <Button className="pdt-cta" type="button" onClick={openSimulator}>{content[language].cta}</Button>
                  )}

                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

interface PositioningDecisionTrajectoryPortalProps extends PositioningDecisionTrajectoryProps {
  mountNode: HTMLElement;
}

export const PositioningDecisionTrajectoryPortal = ({ mountNode, hostDocument }: PositioningDecisionTrajectoryPortalProps) =>
  createPortal(<PositioningDecisionTrajectory hostDocument={hostDocument} />, mountNode);
