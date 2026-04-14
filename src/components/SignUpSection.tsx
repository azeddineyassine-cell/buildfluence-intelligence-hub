import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignUpSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", consent: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast.error(t("Veuillez accepter la politique de confidentialité.", "Please accept the privacy policy."));
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        organization: form.company,
        form_type: "newsletter",
      });
      if (error) throw error;
      supabase.functions.invoke('send-email', {
        body: {
          formType: "newsletter",
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          organization: form.company,
        },
      });
      toast.success(t("Inscription réussie !", "Sign up successful!"));
      setForm({ firstName: "", lastName: "", email: "", company: "", consent: false });
    } catch {
      toast.error(t("Une erreur est survenue.", "An error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="py-[72px] px-12" style={{ background: "hsl(var(--navy))" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-[600px]"
      >
        <h3 className="font-serif text-[28px] font-bold text-white mb-2">Sign up</h3>
        <p className="text-[14px] mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
          {t("Recevez la dernière analyse de Buildfluence", "Receive the latest Buildfluence analysis")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full px-4 py-3 text-[14px] rounded-sm border bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            />
            <input
              type="text"
              placeholder="Last name"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full px-4 py-3 text-[14px] rounded-sm border bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 text-[14px] rounded-sm border bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          />
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-4 py-3 text-[14px] rounded-sm border bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          />
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-white/20 accent-primary"
            />
            <span className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t(
                "En soumettant ce formulaire, j'accepte la politique de confidentialité de Buildfluence.",
                "By submitting this form, I accept Buildfluence's privacy policy."
              )}
            </span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-10 py-3.5 text-[13px] font-bold uppercase tracking-wider transition-all"
            style={{ background: "hsl(var(--gold))", color: "#fff" }}
          >
            {loading ? "..." : "SIGN UP"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default SignUpSection;
