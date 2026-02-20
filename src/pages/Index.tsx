import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-background font-inter">
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
            "sameAs": [
              "https://www.facebook.com/iptvexpress",
              "https://twitter.com/iptvexpress"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33-1-XX-XX-XX-XX",
              "contactType": "customer service",
              "availableLanguage": "French",
              "areaServed": "FR"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 1 mois",
                "price": "15",
                "priceCurrency": "USD",
                "description": "Accès à 15000+ chaînes TV et 80000 contenus VOD"
              },
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 3 mois",
                "price": "25",
                "priceCurrency": "USD",
                "description": "Accès à 15000+ chaînes TV et 80000 contenus VOD"
              },
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 6 mois",
                "price": "45",
                "priceCurrency": "USD",
                "description": "Accès à 15000+ chaînes TV et 80000 contenus VOD en 4K"
              },
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 12 mois Premium",
                "price": "60",
                "priceCurrency": "USD",
                "description": "Accès Premium avec support VIP et toutes les fonctionnalités"
              }
            ]
          })
        }}
      />

      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
