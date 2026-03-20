import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Situation pages
import DeciderSansVisibilite from "./pages/situations/DeciderSansVisibilite";
import AttaquesInformationnelles from "./pages/situations/AttaquesInformationnelles";
import DeficitAttractivite from "./pages/situations/DeficitAttractivite";
import CrisesNonMaitrisees from "./pages/situations/CrisesNonMaitrisees";
import PerteVelocite from "./pages/situations/PerteVelocite";
import DeficitInfluence from "./pages/situations/DeficitInfluence";
import InvestirSousRisque from "./pages/situations/InvestirSousRisque";
import GouvernerSousPression from "./pages/situations/GouvernerSousPression";

// Solution pages
import StrategicIntelligenceLab from "./pages/solutions/StrategicIntelligenceLab";
import DeepDueDiligence from "./pages/solutions/DeepDueDiligence";
import SoftPowerInfluence from "./pages/solutions/SoftPowerInfluence";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />

            {/* Situations */}
            <Route path="/situations/decider-sans-visibilite" element={<DeciderSansVisibilite />} />
            <Route path="/situations/attaques-informationnelles" element={<AttaquesInformationnelles />} />
            <Route path="/situations/deficit-attractivite" element={<DeficitAttractivite />} />
            <Route path="/situations/crises-non-maitrisees" element={<CrisesNonMaitrisees />} />
            <Route path="/situations/perte-velocite" element={<PerteVelocite />} />
            <Route path="/situations/deficit-influence" element={<DeficitInfluence />} />
            <Route path="/situations/investir-sous-risque" element={<InvestirSousRisque />} />
            <Route path="/situations/gouverner-sous-pression" element={<GouvernerSousPression />} />

            {/* Solutions */}
            <Route path="/solutions/strategic-intelligence-lab" element={<StrategicIntelligenceLab />} />
            <Route path="/solutions/deep-due-diligence" element={<DeepDueDiligence />} />
            <Route path="/solutions/soft-power-influence" element={<SoftPowerInfluence />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
