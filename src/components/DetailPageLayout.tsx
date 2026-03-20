import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DetailPageLayoutProps {
  title: string;
  chapeau: string;
  children: ReactNode;
  ctas?: { label: string; action: string }[];
}

const DetailPageLayout = ({ title, chapeau, children, ctas }: DetailPageLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pb-20 pt-32">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("Retour", "Back")}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg italic text-muted-foreground">
              {chapeau}
            </p>

            <div className="mt-12 space-y-12">
              {children}
            </div>

            {ctas && ctas.length > 0 && (
              <div className="mt-16 flex flex-wrap gap-4">
                {ctas.map((cta) => (
                  <button
                    key={cta.label}
                    onClick={() => navigate(cta.action)}
                    className="rounded bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-navy"
                  >
                    {cta.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <CTAFooter />
    </div>
  );
};

export default DetailPageLayout;

export const DetailBlock = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h2 className="font-serif text-2xl font-bold">{title}</h2>
    <div className="mt-4 text-sm leading-relaxed text-foreground/80">{children}</div>
  </div>
);

export const DetailList = ({ items }: { items: string[] }) => (
  <ul className="mt-3 space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
        {item}
      </li>
    ))}
  </ul>
);

export const CaseStudy = ({ title, context, intervention, result }: { title: string; context: string; intervention: string[]; result: string }) => (
  <div className="rounded border border-border bg-secondary p-8">
    <h3 className="font-serif text-xl font-bold">{title}</h3>
    <p className="mt-3 text-sm text-muted-foreground">{context}</p>
    <h4 className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">Notre intervention</h4>
    <DetailList items={intervention} />
    <h4 className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">Résultat</h4>
    <p className="mt-2 text-sm text-foreground/80">{result}</p>
  </div>
);
