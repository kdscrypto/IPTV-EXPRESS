import { useNavigate } from "react-router-dom";
import HomeNavbar from "@/components/HomeNavbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

// Adsterra Native Banner configurations — replace keys with your Adsterra dashboard keys
const nativeBannerConfig1 = {
  key: "YOUR_ADSTERRA_KEY_1",
  format: "iframe",
  height: 250,
  width: 0,
  params: {},
};

const nativeBannerConfig2 = {
  key: "YOUR_ADSTERRA_KEY_2",
  format: "iframe",
  height: 250,
  width: 0,
  params: {},
};

const Index = () => {
  const navigate = useNavigate();

  const getPlanName = (planId: string) => {
    const plans = {
      '1month': 'Starter (1 mois)',
      '3months': 'Découverte (3 mois)',
      '6months': 'Populaire (6 mois)',
      '12months': 'Premium (12 mois)'
    };
    return plans[planId as keyof typeof plans] || 'Plan IPTV';
  };

  const handleSelectPlan = (planId: string, price: number) => {
    navigate('/checkout', {
      state: {
        planId,
        planName: getPlanName(planId),
        price
      }
    });
  };

  return (
    <div className="min-h-screen bg-black font-inter">
      {/* JSON-LD Structured Data pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "IPTV Express",
            "description": "Service IPTV express avec plus de 15000 chaînes TV et 80000 contenus VOD en qualité 4K",
            "url": "https://iptv-express.fr",
            "logo": "/lovable-uploads/aba13bc0-ea36-4a76-998a-db598bc5a404.png",
            "offers": [
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 1 mois",
                "price": "15",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 12 mois Premium",
                "price": "60",
                "priceCurrency": "USD"
              }
            ]
          })
        }}
      />

      {/* Fixed Navbar */}
      <HomeNavbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        
        {/* Native Banner Ad #1 — between Features and Pricing */}
        <AdsterraNativeBanner atOptions={nativeBannerConfig1} />

        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* Testimonials + FAQ side by side */}
        <section className="bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <TestimonialsSection />
              <FAQSection />
            </div>
          </div>
        </section>

        {/* Native Banner Ad #2 — between FAQ and Contact */}
        <AdsterraNativeBanner atOptions={nativeBannerConfig2} />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
