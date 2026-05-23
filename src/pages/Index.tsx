import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientProofStrip from "@/components/ClientProofStrip";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import SituationsSection from "@/components/SituationsSection";
import SolutionsSection from "@/components/SolutionsSection";
import AdvancedCapabilities from "@/components/AdvancedCapabilities";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewClientModal from "@/components/NewClientModal";

import CTAFooter from "@/components/CTAFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <NewClientModal />
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
