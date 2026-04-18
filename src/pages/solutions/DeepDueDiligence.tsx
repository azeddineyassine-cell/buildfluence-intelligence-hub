import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DeepDueDiligence = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Deep Due Diligence Buildfluence";
    const metaDesc = document.querySelector('meta[name="description"]');
    const desc =
      "Le risque n'est jamais visible. Il se loge dans l'angle mort. Investigation stratégique trois niveaux pour sécuriser vos engagements.";
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  // Intercept clicks within the iframe to support hash navigation to outer form + level anchors
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // Intercept #contact-brief CTA → scroll outer form
      doc.querySelectorAll('a[href="#contact-brief"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });

      // Handle level anchors from outer hash
      const outerHash = window.location.hash;
      if (outerHash && /^#level-[123]$/.test(outerHash)) {
        const target = doc.getElementById(outerHash.slice(1));
        if (target) {
          setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
        }
      }
    } catch {
      // cross-origin safety; same-origin so should not occur
    }
  };

  // Also react to hash change on the outer page
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      if (!h) return;
      if (/^#level-[123]$/.test(h)) {
        const doc = iframeRef.current?.contentDocument;
        const target = doc?.getElementById(h.slice(1));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (h === "#contact-brief") {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") || "").toString(),
      email: (fd.get("email") || "").toString(),
      phone: (fd.get("phone") || "").toString(),
      organization: (fd.get("organization") || "").toString(),
      need: (fd.get("need") || "").toString(),
      scope: (fd.get("scope") || "").toString(),
      message: (fd.get("message") || "").toString(),
      nda: fd.get("nda") ? "Oui" : "Non",
    };
    const messageBlob = Object.entries(payload)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const { error } = await supabase.from("contact_submissions").insert({
      form_type: "deep_due_diligence_brief",
      name: payload.name || "—",
      email: payload.email || "noreply@buildfluence.com",
      organization: payload.organization || null,
      phone: payload.phone || null,
      topic: payload.need || null,
      message: messageBlob,
    });

    if (!error) {
      await supabase.functions.invoke("send-email", {
        body: {
          formType: "deep_due_diligence_brief",
          name: payload.name,
          email: payload.email,
          organization: payload.organization,
          phone: payload.phone,
          topic: payload.need,
          message: messageBlob,
        },
      });
    }

    setSubmitting(false);
    if (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Brief envoyé",
      description: "Un analyste senior vous recontacte sous 48h ouvrées.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#FAF6ED",
    border: "1px solid #D9CFBC",
    color: "#0D1B2A",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "DM Sans, sans-serif",
    borderRadius: 2,
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#0D1B2A",
    fontWeight: 500,
    marginBottom: 6,
    display: "block",
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF6ED" }}>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <iframe
          ref={iframeRef}
          src="/deep-due-diligence.html"
          title="Deep Due Diligence — Cartographie interactive"
          onLoad={handleIframeLoad}
          className="w-full border-0 block"
          style={{ height: "calc(100vh - 80px)", minHeight: 1200 }}
        />

        {/* Formulaire de brief confidentiel */}
        <section
          id="contact-brief"
          ref={formRef}
          style={{
            background: "#0D1B2A",
            color: "#F5F1E8",
            padding: "80px 24px",
            scrollMarginTop: 100,
          }}
        >
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                · Brief confidentiel ·
              </p>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 18,
                }}
              >
                Décrivez-nous votre dossier.
              </h2>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 18,
                  fontStyle: "italic",
                  color: "#d4b866",
                  maxWidth: 620,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Un analyste senior vous recontacte sous 48h ouvrées, sous couvert de confidentialité.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                background: "#FAF6ED",
                color: "#0D1B2A",
                padding: "40px 36px",
                border: "1px solid #C9A84C",
                display: "grid",
                gap: 20,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Nom complet *</label>
                  <input name="name" required maxLength={120} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Société *</label>
                  <input name="organization" required maxLength={150} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Email professionnel *</label>
                  <input name="email" type="email" required maxLength={200} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input name="phone" type="tel" maxLength={40} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Type de besoin *</label>
                  <select name="need" required style={{ ...inputStyle, appearance: "auto" }}>
                    <option value="">Sélectionner...</option>
                    <option value="Investissement">Investissement</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Acquisition">Acquisition</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Périmètre estimé (M$)</label>
                  <input name="scope" maxLength={40} placeholder="Optionnel" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Message libre</label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder="Décrivez le contexte du dossier…"
                  style={{ ...inputStyle, fontFamily: "DM Sans, sans-serif", resize: "vertical" }}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 12.5,
                  color: "#0D1B2A",
                  lineHeight: 1.5,
                }}
              >
                <input type="checkbox" name="nda" required style={{ marginTop: 4 }} />
                <span>
                  J'accepte la confidentialité et les conditions <strong>NDA</strong> de Buildfluence.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: "#C9A84C",
                  color: "#0D1B2A",
                  border: "none",
                  padding: "16px 28px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.6 : 1,
                  borderRadius: 2,
                }}
              >
                {submitting ? "Envoi..." : "Envoyer le brief confidentiel →"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <CTAFooter />
    </div>
  );
};

export default DeepDueDiligence;
