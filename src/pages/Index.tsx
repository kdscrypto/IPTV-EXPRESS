import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import ActivationForm from "@/components/ActivationForm";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CryptoModal from "@/components/CryptoModal";

const Index = () => {
  const { toast } = useToast();
  const [cryptoModal, setCryptoModal] = useState({
    isOpen: false,
    planName: '',
    price: 0
  });

  // Configuration des plans (pourrait venir d'une API ou config)
  const getPlanName = (planId: string) => {
    const plans = {
      '3months': 'Découverte (3 mois)',
      '6months': 'Populaire (6 mois)', 
      '12months': 'Premium (12 mois)'
    };
    return plans[planId as keyof typeof plans] || 'Plan IPTV';
  };

  const handleSelectPlan = async (planId: string, price: number) => {
    try {
      // Simuler un appel API pour créer une session de paiement Stripe
      // En production, ceci appellerait votre backend avec l'edge function create-payment
      
      toast({
        title: "Configuration du paiement...",
        description: "Redirection vers Stripe en cours...",
      });

      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Pour la démo, on simule une erreur Stripe pour montrer le fallback crypto
      const simulateStripeError = Math.random() < 0.3; // 30% de chance d'erreur pour la démo
      
      if (simulateStripeError) {
        toast({
          title: "Service de paiement temporairement indisponible",
          description: "Nous vous proposons le paiement par cryptomonnaie comme alternative sécurisée.",
          variant: "destructive"
        });
        
        // Ouvrir automatiquement le modal crypto après un délai
        setTimeout(() => {
          setCryptoModal({
            isOpen: true,
            planName: getPlanName(planId),
            price
          });
        }, 2000);
        
        return;
      }

      // En production, vous recevriez l'URL de Stripe Checkout depuis votre backend
      // const stripeCheckoutUrl = `https://checkout.stripe.com/c/pay/...`;
      
      toast({
        title: "Redirection vers Stripe Checkout",
        description: "Une page sécurisée s'ouvre pour finaliser votre paiement.",
      });

      // Simuler l'ouverture de Stripe Checkout
      // En production: window.open(stripeCheckoutUrl, '_blank');
      console.log(`Redirection vers Stripe Checkout pour ${getPlanName(planId)} - ${price}€`);
      
      // Pour la démo, ouvrir une page Stripe générique
      window.open('https://stripe.com', '_blank');
      
    } catch (err) {
      console.error('Erreur lors de la création du paiement:', err);
      
      toast({
        title: "Erreur de connexion",
        description: "Problème technique. Le paiement cryptomonnaie est disponible.",
        variant: "destructive"
      });
      
      setCryptoModal({
        isOpen: true,
        planName: getPlanName(planId),
        price
      });
    }
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
            "name": "IPTV Premium",
            "description": "Service IPTV premium avec plus de 15000 chaînes TV et 80000 contenus VOD en qualité 4K",
            "url": "https://iptv-premium.com",
            "logo": "https://iptv-premium.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/iptvpremium",
              "https://twitter.com/iptvpremium"
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
                "name": "Abonnement IPTV 3 mois",
                "price": "25",
                "priceCurrency": "EUR",
                "description": "Accès à 15000+ chaînes TV et 80000 contenus VOD"
              },
              {
                "@type": "Offer", 
                "name": "Abonnement IPTV 6 mois",
                "price": "30",
                "priceCurrency": "EUR",
                "description": "Accès à 15000+ chaînes TV et 80000 contenus VOD en 4K"
              },
              {
                "@type": "Offer",
                "name": "Abonnement IPTV 12 mois Premium",
                "price": "45", 
                "priceCurrency": "EUR",
                "description": "Accès Premium avec support VIP et toutes les fonctionnalités"
              }
            ]
          })
        }}
      />

      {/* Sections principales */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <ActivationForm />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Modal de paiement crypto */}
      <CryptoModal
        isOpen={cryptoModal.isOpen}
        onClose={() => setCryptoModal({ ...cryptoModal, isOpen: false })}
        planName={cryptoModal.planName}
        price={cryptoModal.price}
      />

      {/* Bouton flottant pour paiement crypto (alternative) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setCryptoModal({
            isOpen: true,
            planName: 'IPTV Premium',
            price: 30
          })}
          className="glass p-4 rounded-full shadow-primary border border-primary/30 hover:border-primary/50 transition-smooth group"
          aria-label="Paiement cryptomonnaie"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">₿</span>
            <span className="text-sm font-medium hidden group-hover:block">
              Payer en crypto
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Index;