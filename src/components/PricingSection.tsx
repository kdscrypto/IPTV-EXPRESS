import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap, Shield } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  premium?: boolean;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface PricingSectionProps {
  onSelectPlan: (planId: string, price: number) => void;
}

const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  const plans: PricingPlan[] = [
    {
      id: "3months",
      name: "Découverte",
      duration: "3 mois",
      price: 25,
      originalPrice: 45,
      features: [
        "15,000+ chaînes live",
        "80,000+ films & séries",
        "Qualité Full HD",
        "3 connexions simultanées",
        "Support par email",
        "Compatible tous appareils"
      ],
      icon: Zap
    },
    {
      id: "6months",
      name: "Populaire",
      duration: "6 mois",
      price: 30,
      originalPrice: 90,
      popular: true,
      features: [
        "15,000+ chaînes live",
        "80,000+ films & séries",
        "Qualité 4K Ultra HD",
        "5 connexions simultanées",
        "Support 24/7",
        "Compatible tous appareils",
        "Catch-up TV 7 jours",
        "EPG complet"
      ],
      icon: Star
    },
    {
      id: "12months",
      name: "Premium",
      duration: "12 mois",
      price: 45,
      originalPrice: 180,
      premium: true,
      features: [
        "15,000+ chaînes live",
        "80,000+ films & séries",
        "Qualité 4K Ultra HD",
        "5 connexions simultanées",
        "Support VIP prioritaire",
        "Compatible tous appareils",
        "Catch-up TV 14 jours",
        "EPG complet",
        "Accès applications premium",
        "Mise à jour gratuite à vie"
      ],
      icon: Crown
    }
  ];

  const getCardClassName = (plan: PricingPlan) => {
    if (plan.premium) {
      return "glass relative border-2 border-primary/50 bg-gradient-card hover:border-primary transform hover:scale-105 transition-all duration-500 overflow-hidden";
    }
    if (plan.popular) {
      return "glass relative border border-primary/30 bg-card hover:border-primary/50 transform hover:scale-105 transition-all duration-500";
    }
    return "glass relative border border-border bg-card hover:border-primary/30 transform hover:scale-105 transition-all duration-500";
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/5 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-foreground">Nos</span>
            <br />
            <span className="gradient-text">Abonnements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choisissez l'abonnement qui correspond à vos besoins. 
            Tous nos plans incluent un accès complet et sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={plan.id} className={getCardClassName(plan)}>
              {/* Premium Glow Effect */}
              {plan.premium && (
                <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-xl"></div>
              )}
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-primary">
                    ⚡ PLUS POPULAIRE
                  </div>
                </div>
              )}

              {/* Premium Badge */}
              {plan.premium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-primary">
                    👑 PREMIUM
                  </div>
                </div>
              )}

              <div className="relative p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl ${plan.premium ? 'bg-gradient-primary' : 'bg-primary/20'}`}>
                    <plan.icon className={`w-8 h-8 ${plan.premium ? 'text-white' : 'text-primary'}`} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-center mb-6">{plan.duration}</p>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {plan.originalPrice && (
                      <span className="text-2xl text-muted-foreground line-through">
                        {plan.originalPrice}€
                      </span>
                    )}
                    <span className="text-5xl font-black text-primary">
                      {plan.price}€
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.originalPrice && (
                      <span className="text-success font-semibold">
                        Économisez {plan.originalPrice - plan.price}€
                      </span>
                    )}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={plan.premium ? "premium" : plan.popular ? "hero" : "default"}
                  size="lg"
                  className="w-full"
                  onClick={() => onSelectPlan(plan.id, plan.price)}
                >
                  Choisir ce plan
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm">Activation instantanée</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm">Satisfaction garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;