import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SituationsSection from "@/components/SituationsSection";
import SolutionsSection from "@/components/SolutionsSection";
import InnovationSection from "@/components/InnovationSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import InsightsSection from "@/components/InsightsSection";
import WhySection from "@/components/WhySection";
import CTAFooter from "@/components/CTAFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <SituationsSection />
    <SolutionsSection />
    <InnovationSection />
    <SuccessStoriesSection />
    <InsightsSection />
    <WhySection />
    <CTAFooter />
  </div>
);

export default Index;
