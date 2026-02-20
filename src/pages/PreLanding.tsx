import StickyNavbar from "@/components/prelanding/StickyNavbar";
import PrelandingHero from "@/components/prelanding/PrelandingHero";
import FeaturesGrid from "@/components/prelanding/FeaturesGrid";
import DeviceBanner from "@/components/prelanding/DeviceBanner";
import ReviewsSection from "@/components/prelanding/ReviewsSection";
import PrelandingFAQ from "@/components/prelanding/PrelandingFAQ";
import FinalCTA from "@/components/prelanding/FinalCTA";
import PrelandingFooter from "@/components/prelanding/PrelandingFooter";

const PreLanding = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <StickyNavbar />
      <PrelandingHero />
      <FeaturesGrid />
      <DeviceBanner />
      <ReviewsSection />
      <PrelandingFAQ />
      <FinalCTA />
      <PrelandingFooter />
    </div>
  );
};

export default PreLanding;
