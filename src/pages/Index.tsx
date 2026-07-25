import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import ClientProofStrip from "@/components/ClientProofStrip";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import SituationsSection from "@/components/SituationsSection";
import SolutionsSection from "@/components/SolutionsSection";
import AdvancedCapabilities from "@/components/AdvancedCapabilities";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import CTAFooter from "@/components/CTAFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEO
      titleFr="Buildfluence • Intelligence stratégique, influence et due diligence"
      titleEn="Buildfluence • Strategic Intelligence, Influence and Due Diligence"
      descriptionFr="Buildfluence construit la souveraineté décisionnelle des gouvernements, grands comptes et institutions internationales : intelligence stratégique, veille, influence et due diligence augmentées par l'IA."
      descriptionEn="Buildfluence builds decision sovereignty for governments, large corporates and international institutions: strategic intelligence, monitoring, influence and due diligence, augmented by AI."
      path="/"
    />
    <Navbar />
    <HeroSection />
    <ClientProofStrip />
    <MissionSection />
    <StatsSection />
    <SituationsSection />
    <SolutionsSection />
    <AdvancedCapabilities />
    <SuccessStoriesSection />
    <TestimonialsSection />

    <CTAFooter />
  </div>
);

export default Index;
