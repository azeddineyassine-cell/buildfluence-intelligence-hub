import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const insights = [
  { type: "Baromètre d'investissement", title: "Guerre informationnelle : les nouvelles armes de déstabilisation", description: "Décryptage des mécanismes de désinformation utilisés contre les institutions souveraines et les grands groupes industriels.", summary: "Résumé de l'analyse — contenu détaillé à définir selon les spécifications du projet." },
  { type: "Baromètre d'investissement", title: "Due diligence approfondie : au-delà de la conformité", description: "Pourquoi les méthodologies classiques de due diligence laissent 70% des risques dans l'angle mort des décideurs.", summary: "Résumé de la note — contenu détaillé à définir selon les spécifications du projet." },
  { type: "Baromètre d'investissement", title: "Souveraineté décisionnelle à l'ère de l'IA", description: "Intervention sur les enjeux de souveraineté informationnelle et la transformation des infrastructures décisionnelles.", summary: "Résumé de la conférence — contenu détaillé à définir selon les spécifications du projet." },
];

const InsightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Demande envoyée", description: "Vous recevrez l'étude par email." });
    setOpenIndex(null);
  };

  return (
    <section id="insights" className="relative py-28" ref={ref} style={{ background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Insights & Resources</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#0D1B2A' }}>
            Éclairages stratégiques
          </h2>
          <p className="mt-4 text-base" style={{ color: '#5A6170' }}>
            Analyses, guides et notes stratégiques au service de la compréhension des enjeux majeurs
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {insights.map((item, i) => (
            <motion.button
              key={item.title}
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex cursor-pointer flex-col rounded-sm border p-7 text-left transition-all hover:shadow-lg"
              style={{ background: '#FFFFFF', borderColor: '#E5E7EB', borderTop: '2px solid hsl(43 50% 54% / 0.3)' }}
            >
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" style={{ color: 'hsl(43 50% 54%)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'hsl(43 50% 54%)' }}>{item.type}</span>
              </div>
              <h3 className="font-serif text-base font-bold leading-snug" style={{ color: '#0D1B2A' }}>{item.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed" style={{ color: '#6B7280' }}>{item.description}</p>
              <span className="mt-4 text-xs font-medium transition-colors" style={{ color: 'hsl(43 50% 54%)' }}>
                Lire & télécharger →
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
        {openIndex !== null && (
          <DialogContent className="sm:max-w-xl" style={{ background: '#0D1B2A', border: '1px solid hsl(220 20% 20%)', color: '#F0EDE6' }}>
            <DialogHeader>
              <DialogTitle className="font-serif text-lg" style={{ color: '#F0EDE6' }}>{insights[openIndex].title}</DialogTitle>
            </DialogHeader>
            <div className="mt-2 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'hsl(43 50% 54%)' }}>{insights[openIndex].type}</p>
                <p className="mt-2 text-sm" style={{ color: '#8A8F9E' }}>{insights[openIndex].summary}</p>
              </div>
              <form onSubmit={handleDownload} className="space-y-3">
                <Input required name="name" placeholder="Nom" style={{ background: 'hsl(210 40% 12%)', borderColor: 'hsl(220 20% 20%)', color: '#F0EDE6' }} />
                <Input required type="email" name="email" placeholder="Email" style={{ background: 'hsl(210 40% 12%)', borderColor: 'hsl(220 20% 20%)', color: '#F0EDE6' }} />
                <Input name="org" placeholder="Organisation" style={{ background: 'hsl(210 40% 12%)', borderColor: 'hsl(220 20% 20%)', color: '#F0EDE6' }} />
                <Input name="fonction" placeholder="Fonction" style={{ background: 'hsl(210 40% 12%)', borderColor: 'hsl(220 20% 20%)', color: '#F0EDE6' }} />
                <button type="submit" className="btn-gold w-full text-[11px]">Télécharger l'étude</button>
              </form>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default InsightsSection;