import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientProofStrip from "@/components/ClientProofStrip";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import SituationsSection from "@/components/SituationsSection";
import SolutionsSection from "@/components/SolutionsSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import InsightsSection from "@/components/InsightsSection";
import WhySection from "@/components/WhySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SignUpSection from "@/components/SignUpSection";
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
    <SuccessStoriesSection />
    <InsightsSection />
    <WhySection />
    <TestimonialsSection />
    <SignUpSection />
    <CTAFooter />
  </div>
);

export default Index;
