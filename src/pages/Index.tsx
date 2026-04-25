import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientProofStrip from "@/components/ClientProofStrip";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import SituationsSection from "@/components/SituationsSection";
import SolutionsSection from "@/components/SolutionsSection";
import AdvancedCapabilities from "@/components/AdvancedCapabilities";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import InsightsSection from "@/components/InsightsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import CTAFooter from "@/components/CTAFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
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
    <InsightsSection />
    
    <CTAFooter />
  </div>
);

export default Index;
