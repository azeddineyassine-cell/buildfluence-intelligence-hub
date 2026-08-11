Exit code: 0
Wall time: 2.3 seconds
Output:
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import isdDecision from "@/assets/isd-decision.webp";
import face1Ip from "@/assets/face1-legislatives-maroc.png.asset.json";

const StrategicPrioritiesPanel = () => {
  const { t } = useLanguage();

  const priorities = [
    {
      eyebrow: t("Intelligence politique", "Political intelligence"),
      title: t(
        "1Ã¨re Plateforme dâ€™Intelligence Politique au Maroc",
        "Moroccoâ€™s first Political Intelligence Platform"
      ),
      meta: t("Partis Â· Leaders politiques", "Parties Â· Political leaders"),
      cta: t("Explorer la plateforme", "Explore the platform"),
      href: "/insights-resources/intelligence-politique",
      image: face1Ip.url,
    },
    {
      eyebrow: t("Ã‰tude nationale 2026", "National study 2026"),
      title: t(
        "MaturitÃ© en souverainetÃ© dÃ©cisionnelle",
        "Decision sovereignty maturity"
      ),
      meta: t("Autodiagnostic Â· 4 piliers Â· 13 dimensions", "Self-assessment Â· 4 pillars Â· 13 dimensions"),
      cta: t("Ã‰valuer ma maturitÃ©", "Assess my maturity"),
      href: "/insights-resources/enquete-isd",
      image: isdDecision,
    },
    {
      eyebrow: t("Benchmark international", "International benchmark"),
      title: t(
        "Agences de Promotion des Investissements",
        "Investment Promotion Agencies"
      ),
      meta: t("6 agences Â· 12 critÃ¨res Â· 6 leviers", "6 agencies Â· 12 criteria Â· 6 levers"),
      cta: t("Voir lâ€™analyse", "View the analysis"),
      href: "/benchmark-api-light.html",
      image: "/Benchmark_API_Drapeaux-1.webp",
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2 }}
      aria-label={t("Trois prioritÃ©s stratÃ©giques", "Three strategic priorities")}
      className="space-y-3"
    >
      <div className="flex items-center gap-3 pb-1">
        <span className="h-px w-8" style={{ background: "hsl(var(--gold))" }} />
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.24em]"
          style={{ color: "hsl(var(--gold))", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {t("Trois prioritÃ©s stratÃ©giques", "Three strategic priorities")}
        </p>
      </div>

      {priorities.map((priority, index) => (
        <a
          key={priority.href}
          href={priority.href}
          className="group grid min-h-[154px] grid-cols-[118px_1fr] overflow-hidden border transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: "hsl(var(--navy))",
            borderColor: "hsl(var(--gold) / 0.45)",
            borderRadius: "2px",
            boxShadow: "0 12px 30px -18px rgba(13, 27, 42, 0.7)",
          }}
        >
          <div className="relative overflow-hidden">
            <img
              src={priority.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--navy)/0.42)]" />
          </div>

          <div className="flex min-w-0 flex-col justify-center px-5 py-4">
            <p
              className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "hsl(var(--gold))", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {priority.eyebrow}
            </p>
            <h2 className="font-serif text-[20px] font-bold leading-[1.12] text-[#F5F1E8]">
              {priority.title}
            </h2>
            <p
              className="mt-2 text-[9px] uppercase tracking-[0.1em] text-[#F5F1E8]/65"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {priority.meta}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C9A84C]">
              {priority.cta}
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </a>
      ))}
    </motion.aside>
  );
};

export default StrategicPrioritiesPanel;

