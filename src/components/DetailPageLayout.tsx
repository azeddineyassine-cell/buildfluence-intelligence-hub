import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange, FormDiagnostic } from "@/components/FormModals";

export interface DetailPageLayoutProps {
  title: ReactNode;
  chapeau: ReactNode;
  children: ReactNode;
  sidebar?: ReactNode;
  ctas?: { label: string; action: string; formType?: "f1" | "f2" }[];
  situationContext?: string;
  prevSituation?: { label: string; path: string };
  nextSituation?: { label: string; path: string };
  titleClassName?: string;
  chapeauClassName?: string;
}

const DetailPageLayout = ({ title, chapeau, children, sidebar, ctas, situationContext, prevSituation, nextSituation, titleClassName, chapeauClassName }: DetailPageLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [f1Open, setF1Open] = useState(false);
  const [f2Open, setF2Open] = useState(false);

  const handleCta = (cta: { label: string; action: string; formType?: "f1" | "f2" }) => {
    if (cta.formType === "f1") setF1Open(true);
    else if (cta.formType === "f2") setF2Open(true);
    else { navigate(cta.action); window.scrollTo(0, 0); }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF6ED' }}>
      <Navbar />
      <section className="pb-10 pt-24">
        <div className="w-full px-6 lg:px-12" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[75%] mx-auto"
          >
            <h1
              className={`font-bold leading-[1.05] ${titleClassName || ''}`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontStyle: 'italic',
                color: '#0D1B2A',
              }}
            >
              {title}
            </h1>
            <p className={`mt-3 text-lg italic text-muted-foreground ${chapeauClassName || ''}`}>
              {chapeau}
            </p>

            <div className={`mt-6 ${sidebar ? 'flex flex-col lg:flex-row gap-8 lg:gap-12 items-start' : ''}`}>
              {/* Main content - left column */}
              <div className={`space-y-8 ${sidebar ? 'flex-1 min-w-0' : ''}`}>
                {children}
              </div>

              {/* Sticky sidebar - right column */}
              {sidebar && (
                <div className="w-full lg:w-[420px] lg:flex-shrink-0">
                  <div className="lg:sticky lg:top-24">
                    {sidebar}
                  </div>
                </div>
              )}
            </div>

            {ctas && ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {ctas.map((cta, i) => (
                  <button
                    key={cta.label}
                    onClick={() => handleCta(cta)}
                    className={i === 0 ? "btn-gold" : "btn-ghost-gold"}
                  >
                    {cta.label}
                  </button>
                ))}
              </div>
            )}

            {(prevSituation || nextSituation) && (
              <div className="mt-8 flex items-center justify-between">
                {prevSituation ? (
                  <Link to={prevSituation.path} onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    <ArrowLeft className="h-4 w-4" />
                    {t("Situation précédente", "Previous situation")}
                  </Link>
                ) : <span />}
                {nextSituation ? (
                  <Link to={nextSituation.path} onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    {t("Situation suivante", "Next situation")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : <span />}
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <CTAFooter />

      <FormStrategicExchange open={f1Open} onClose={() => setF1Open(false)} />
      <FormDiagnostic open={f2Open} onClose={() => setF2Open(false)} situation={situationContext || (typeof title === 'string' ? title : '')} />
    </div>
  );
};

export default DetailPageLayout;

export const DetailBlock = ({ title, children, id, className }: { title: string; children: ReactNode; id?: string; className?: string }) => (
  <div id={id} className={className}>
    {title && <h2 className="detail-subtitle text-2xl font-bold">{title}</h2>}
    <div className={`${title ? 'mt-4' : ''} text-sm leading-relaxed text-foreground/80`}>{children}</div>
  </div>
);

export const DetailList = ({ items }: { items: string[] }) => (
  <ul className="mt-3 space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
);

export const SectionBlock = ({ title, children, image, imageAlt, reverse = false }: { title?: string; children: ReactNode; image?: string; imageAlt?: string; reverse?: boolean }) => (
  <div className={`flex flex-col gap-6 md:flex-row md:items-start ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="flex-1 min-w-0">
      {title && <h3 className="detail-subtitle text-xl font-bold text-primary mb-3">{title}</h3>}
      {children}
    </div>
    {image && (
      <div className="flex-1 min-w-0">
        <img src={image} alt={imageAlt || ""} className="w-full rounded-sm" />
      </div>
    )}
  </div>
);

export const CaseStudy = ({ title, context, intervention, result, resultNode, logo, image, image2, imageCaption, image2Caption }: { title: string; context: string; intervention: string[]; result?: string; resultNode?: ReactNode; logo?: string; image?: string; image2?: string; imageCaption?: string; image2Caption?: string }) => {
  const { t } = useLanguage();
  return (
  <div className="p-6 rounded-sm border border-border" style={{ background: '#f3f4f6' }}>
    <div className={`flex flex-col gap-6 ${image ? 'md:flex-row md:items-start' : ''}`}>
      <div className="flex-1 min-w-0">
        <div>
          <p className="detail-subtitle text-lg font-bold">{t("Cas client :", "Client case:")}</p>
          {logo && <img src={logo} alt="" className="mt-2 h-16 w-auto object-contain" />}
          {!logo && <h3 className="detail-subtitle text-xl font-bold mt-2">{title}</h3>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{context}</p>
        <h4 className="detail-subtitle mt-3 text-xs font-bold uppercase tracking-wider text-primary">{t("Notre intervention", "Our intervention")}</h4>
        <DetailList items={intervention} />
        <h4 className="detail-subtitle mt-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#C0392B' }}>RÉSULTAT</h4>
        {resultNode ? (
          <div className="mt-2 rounded-lg p-4" style={{ background: '#ffffff', borderLeft: '4px solid #103E8C' }}>
            {resultNode}
          </div>
        ) : (
          <p className="mt-1.5 text-sm text-foreground/80">{result}</p>
        )}
      </div>
      {image && (
        <div className="flex-1 min-w-0">
          <img src={image} alt="" className="w-full rounded-sm" />
          {imageCaption && <p className="mt-1 text-xs italic text-muted-foreground">{imageCaption}</p>}
          {image2 && <img src={image2} alt="" className="mt-3 w-full rounded-sm" />}
          {image2Caption && <p className="mt-1 text-xs italic text-muted-foreground">{image2Caption}</p>}
        </div>
      )}
    </div>
  </div>
  );
};
