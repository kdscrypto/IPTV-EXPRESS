import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface PricingPlan {
  id: string;
  nameKey: string;
  durationKey: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  premium?: boolean;
  featuresKeys: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface PricingSectionProps {
  onSelectPlan: (planId: string, price: number) => void;
}

const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  const { t, language } = useLanguage();

  const plans: PricingPlan[] = [
    {
      id: "1month",
      nameKey: "main.pricing.plans.starter",
      durationKey: "main.pricing.month",
      durationMonths: 1,
      price: 15,
      originalPrice: 30,
      featuresKeys: [
        "main.pricing.features.liveChannels",
        "main.pricing.features.moviesAndSeries",
        "main.pricing.features.fullHd",
        "main.pricing.features.connections2",
        "main.pricing.features.emailSupport",
        "main.pricing.features.allDevices"
      ],
      icon: Zap
    },
    {
      id: "3months",
      nameKey: "main.pricing.plans.discovery",
      durationKey: "main.pricing.months",
      durationMonths: 3,
      price: 25,
      originalPrice: 50,
      featuresKeys: [
        "main.pricing.features.liveChannels",
        "main.pricing.features.moviesAndSeries",
        "main.pricing.features.fullHd",
        "main.pricing.features.connections3",
        "main.pricing.features.emailSupport",
        "main.pricing.features.allDevices"
      ],
      icon: Zap
    },
    {
      id: "6months",
      nameKey: "main.pricing.plans.popular",
      durationKey: "main.pricing.months",
      durationMonths: 6,
      price: 45,
      originalPrice: 90,
      popular: true,
      featuresKeys: [
        "main.pricing.features.liveChannels",
        "main.pricing.features.moviesAndSeries",
        "main.pricing.features.uhd4k",
        "main.pricing.features.connections5",
        "main.pricing.features.support247",
        "main.pricing.features.allDevices",
        "main.pricing.features.catchup7",
        "main.pricing.features.epg"
      ],
      icon: Star
    },
    {
      id: "12months",
      nameKey: "main.pricing.plans.premium",
      durationKey: "main.pricing.months",
      durationMonths: 12,
      price: 60,
      originalPrice: 120,
      premium: true,
      featuresKeys: [
        "main.pricing.features.liveChannels",
        "main.pricing.features.moviesAndSeries",
        "main.pricing.features.uhd4k",
        "main.pricing.features.connections5",
        "main.pricing.features.vipSupport",
        "main.pricing.features.allDevices",
        "main.pricing.features.catchup14",
        "main.pricing.features.epg",
        "main.pricing.features.premiumApps",
        "main.pricing.features.lifetimeUpdates"
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
            <span className="text-foreground">{t("main.pricing.title")}</span>
            <br />
            <span className="gradient-text">{t("main.pricing.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("main.pricing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className={getCardClassName(plan)}>
              {/* Premium Glow Effect */}
              {plan.premium && (
                <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-xl"></div>
              )}
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-primary">
                    {t("main.pricing.mostPopular")}
                  </div>
                </div>
              )}

              {/* Premium Badge */}
              {plan.premium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-primary">
                    {t("main.pricing.premium")}
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
                <h3 className="text-2xl font-bold text-center mb-2">{t(plan.nameKey)}</h3>
                <p className="text-muted-foreground text-center mb-6">{plan.durationMonths} {t(plan.durationKey)}</p>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {plan.originalPrice && (
                      <span className="text-2xl text-muted-foreground line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-black text-primary">
                      ${plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.originalPrice && (
                      <span className="text-success font-semibold">
                        {t("main.pricing.save")} ${plan.originalPrice - plan.price}
                      </span>
                    )}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.featuresKeys.map((featureKey, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{t(featureKey)}</span>
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
                  {t("main.pricing.choosePlan")}
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
              <span className="text-sm">{t("main.pricing.trust.securePayment")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm">{t("main.pricing.trust.instantActivation")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm">{t("main.pricing.trust.satisfactionGuarantee")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
