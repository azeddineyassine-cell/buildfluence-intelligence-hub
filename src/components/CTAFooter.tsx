import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange } from "./FormModals";
import { Link } from "react-router-dom";

const CTAFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formOpen, setFormOpen] = useState(false);
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: t("NOS SOLUTIONS", "OUR SOLUTIONS"),
      links: [
        { label: "Strategic Intelligence Lab", href: "/solutions/strategic-intelligence-lab" },
        { label: "Deep Due Diligence", href: "/solutions/deep-due-diligence" },
        { label: "Soft Power & Influence", href: "/solutions/soft-power-influence" },
      ],
    },
    {
      title: "STRATEGIC INNOVATION",
      links: [
        { label: "AI Powered Monitor", href: "/capacites/ai-powered-monitor" },
        { label: "Strategic Workflow", href: "/capacites/strategic-workflow" },
        { label: "Knowledge Capitalization", href: "/capacites/knowledge-capitalization" },
        { label: "Competitive Velocity Engine", href: "/capacites/competitive-velocity-engine" },
      ],
    },
    {
      title: "SUCCESS STORIES",
      links: [
        { label: t("Écosystème concurrentiel", "Competitive Ecosystem"), href: "/#success-stories" },
        { label: t("Gestion de crise", "Crisis Management"), href: "/#success-stories" },
        { label: t("Strat. & Ingénierie de Communication", "Strat. & Communication Engineering"), href: "/#success-stories" },
        { label: t("Influence & Soft Power", "Influence & Soft Power"), href: "/#success-stories" },
        { label: t("Due Diligence & Investissement", "Due Diligence & Investment"), href: "/#success-stories" },
      ],
    },
  ];

  return (
    <>
      {/* CTA */}
      <section
        ref={ref}
        className="py-[88px] px-12 text-center"
        style={{ background: 'hsl(30 20% 97%)', borderTop: '1px solid hsl(var(--border))' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-4 inline-block" style={{ color: 'hsl(var(--gold))' }}>
            {t("Passer à l'action", "Take action")}
          </p>
          <h2 className="font-serif text-[40px] font-black mb-[18px]" style={{ color: 'hsl(var(--navy))', letterSpacing: '-0.5px' }}>
            {t("Vos enjeux stratégiques", "Your strategic challenges")}
            <br />
            {t("méritent une réponse souveraine", "deserve a sovereign response")}
          </h2>
          <p className="text-[16px] mx-auto mb-10 leading-[1.7]" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '500px' }}>
            {t(
              "Nos engagements sont strictement confidentiels. Chaque mandat commence par un échange stratégique sans engagement pour qualifier la situation et définir le périmètre d'intervention.",
              "Our engagements are strictly confidential. Each mandate begins with a no-commitment strategic exchange to qualify the situation and define the scope of intervention."
            )}
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="inline-block px-10 py-4 text-[14px] font-bold tracking-[0.04em] transition-colors"
            style={{ background: 'hsl(var(--navy))', color: '#fff' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'hsl(218 50% 13%)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'hsl(var(--navy))')}
          >
            {t("Demander un échange confidentiel", "Request a confidential exchange")}
          </button>
        </motion.div>
      </section>

      <footer
        className="px-12 py-16"
        style={{ background: 'hsl(218 60% 9%)' }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div>
              <a href="/" className="text-[18px] font-bold text-white no-underline">
                Build<span style={{ color: 'hsl(var(--gold))' }}>fluence</span>
              </a>
              <p className="mt-3 text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Sovereign Decision Infrastructure
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[12px] no-underline transition-colors"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                        onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Sign up column */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Sign up
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {t("Recevez la dernière analyse de Buildfluence", "Receive the latest Buildfluence analysis")}
              </p>
              <p className="mt-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <Link to="/contact" className="no-underline underline-offset-2 hover:underline" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          <div className="border-t pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
              {t("© 2026 Buildfluence. Tous droits réservés.", "© 2026 Buildfluence. All rights reserved.")}
            </span>
            <div className="flex gap-6">
              {[
                { label: t("Vos situations critiques", "Your Critical Situations"), href: "#situations-critiques" },
                { label: "Insights & Resources", href: "#insights" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] no-underline transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default CTAFooter;
