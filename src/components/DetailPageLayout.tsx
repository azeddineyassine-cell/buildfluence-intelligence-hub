import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange, FormDiagnostic } from "@/components/FormModals";

interface DetailPageLayoutProps {
  title: string;
  chapeau: string;
  children: ReactNode;
  ctas?: { label: string; action: string; formType?: "f1" | "f2" }[];
  situationContext?: string;
  prevSituation?: { label: string; path: string };
  nextSituation?: { label: string; path: string };
}

const DetailPageLayout = ({ title, chapeau, children, ctas, situationContext, prevSituation, nextSituation }: DetailPageLayoutProps) => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pb-6 pt-20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          
          >
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-lg italic text-muted-foreground">
              {chapeau}
            </p>

            <div className="mt-6 space-y-8">
              {children}
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
      <FormDiagnostic open={f2Open} onClose={() => setF2Open(false)} situation={situationContext || title} />
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

export const CaseStudy = ({ title, context, intervention, result, logo, image, image2 }: { title: string; context: string; intervention: string[]; result: string; logo?: string; image?: string; image2?: string }) => {
  const { t } = useLanguage();
  return (
  <div className="card-glass p-6">
    <div className={`flex flex-col gap-6 ${image ? 'md:flex-row md:items-start' : ''}`}>
      <div className="flex-1 min-w-0">
        <div>
          <p className="detail-subtitle text-lg font-bold">{t("Cas client :", "Client case:")}</p>
          {logo && <img src={logo} alt="" className="mt-2 h-16 w-auto object-contain" />}
          {!logo && <h3 className="detail-subtitle text-xl font-bold mt-2">{title}</h3>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{context}</p>
        <h4 className="detail-subtitle mt-3 text-xs font-bold uppercase tracking-wider text-primary">Notre intervention</h4>
        <DetailList items={intervention} />
        <h4 className="detail-subtitle mt-3 text-xs font-bold uppercase tracking-wider text-primary">Résultat</h4>
        <p className="mt-1.5 text-sm text-foreground/80">{result}</p>
      </div>
      {image && (
        <div className="flex-1 min-w-0">
          <img src={image} alt="" className="w-full rounded-sm" />
          {image2 && <img src={image2} alt="" className="mt-3 w-full rounded-sm" />}
        </div>
      )}
    </div>
  </div>
  );
};
