import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SituationsSection from "@/components/SituationsSection";
import ClientProofStrip from "@/components/ClientProofStrip";
import SolutionsSection from "@/components/SolutionsSection";
import AdvancedCapabilities from "@/components/AdvancedCapabilities";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import InsightsSection from "@/components/InsightsSection";
import WhySection from "@/components/WhySection";
import CTAFooter from "@/components/CTAFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <SituationsSection />
    <ClientProofStrip />
    <SolutionsSection />
    <AdvancedCapabilities />
    <SuccessStoriesSection />
    <InsightsSection />
    <WhySection />
    <CTAFooter />
  </div>
);

export default Index;
