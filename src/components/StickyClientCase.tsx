import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DetailList } from "@/components/DetailPageLayout";

interface StickyClientCaseProps {
  logo?: string;
  title: string;
  sector?: string;
  context: string;
  contextItems?: string[];
  intervention: string[];
  result?: string;
  resultItems?: string[];
  resultNode?: ReactNode;
}

const StickyClientCase = ({ logo, title, sector, context, contextItems, intervention, result, resultItems, resultNode }: StickyClientCaseProps) => {
  const { t } = useLanguage();
  return (
    <div className="rounded-lg border border-border/60 overflow-hidden" style={{ background: '#f3f4f6' }}>
      {/* Header */}
      <div className="px-5 py-4" style={{ background: '#ffffff' }}>
        <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">{t("Cas client", "Client case")}</p>
        {logo && <img src={logo} alt="" className="mt-3 h-14 w-auto object-contain" />}
        {!logo && <h3 className="mt-2 text-base font-bold text-foreground">{title}</h3>}
      </div>

      <div className="px-5 py-4 space-y-4 text-sm">
        {/* Sector */}
        {sector && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("Secteur", "Sector")}</p>
            <p className="mt-1 text-foreground/80">{sector}</p>
          </div>
        )}

        {/* Context */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("Contexte", "Context")}</p>
          {contextItems ? (
            <DetailList items={contextItems} />
          ) : (
            <p className="mt-1 text-foreground/80 leading-relaxed">{context}</p>
          )}
        </div>

        {/* Intervention */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("Notre intervention", "Our intervention")}</p>
          <DetailList items={intervention} />
        </div>

        {/* Impact / Result */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#C0392B' }}>
            {t("IMPACT", "IMPACT")}
          </p>
          {resultNode ? (
            <div className="mt-2">{resultNode}</div>
          ) : resultItems ? (
            <ul className="mt-2 space-y-1.5">
              {resultItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-foreground/80">
                  <span className="text-primary font-bold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-foreground/80 leading-relaxed">{result}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyClientCase;
