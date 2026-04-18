import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

const DeepDueDiligence = () => {
  useEffect(() => {
    document.title = "Deep Due Diligence Buildfluence";
    const metaDesc = document.querySelector('meta[name="description"]');
    const desc = "Le risque n'est jamais visible. Il se loge dans l'angle mort. Investigation stratégique trois niveaux pour sécuriser vos engagements.";
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <iframe
          src="/deep-due-diligence.html"
          title="Deep Due Diligence — Cartographie interactive"
          className="w-full border-0 block"
          style={{ height: "calc(100vh - 80px)", minHeight: 900 }}
        />
      </main>
      <CTAFooter />
    </div>
  );
};

export default DeepDueDiligence;
