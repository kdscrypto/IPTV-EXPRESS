import { Check, Crown, Star, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface PricingPlan {
  id: string;
  name: string;
  durationMonths: number;
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
  const { t } = useLanguage();

  const plans: PricingPlan[] = [
    {
      id: "1month",
      name: "Starter",
      durationMonths: 1,
      price: 15,
      originalPrice: 30,
      features: [
        "15,000+ live channels",
        "80,000+ movies & series",
        "Full HD quality",
        "2 simultaneous connections",
        "Email support",
      ],
      icon: Zap,
    },
    {
      id: "3months",
      name: "Discovery",
      durationMonths: 3,
      price: 25,
      originalPrice: 50,
      features: [
        "15,000+ live channels",
        "80,000+ movies & series",
        "Full HD quality",
        "3 simultaneous connections",
        "24/7 support",
      ],
      icon: Zap,
    },
    {
      id: "6months",
      name: "Popular",
      durationMonths: 6,
      price: 45,
      originalPrice: 90,
      popular: true,
      features: [
        "15,000+ live channels",
        "80,000+ movies & series",
        "4K Ultra HD quality",
        "5 simultaneous connections",
        "24/7 support + EPG",
      ],
      icon: Star,
    },
    {
      id: "12months",
      name: "Premium",
      durationMonths: 12,
      price: 60,
      originalPrice: 120,
      premium: true,
      features: [
        "15,000+ live channels",
        "80,000+ movies & series",
        "4K Ultra HD quality",
        "5 simultaneous connections",
        "VIP priority support",
      ],
      icon: Crown,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Our <span className="text-primary">Plans</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            No contracts. Cancel anytime.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isHighlighted = plan.popular || plan.premium;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  plan.premium
                    ? "border-primary bg-gradient-to-b from-primary/10 to-zinc-900"
                    : plan.popular
                    ? "border-primary/60 bg-zinc-900"
                    : "border-zinc-800 bg-zinc-900"
                }`}
              >
                {/* Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {plan.popular ? "⚡ MOST POPULAR" : "👑 PREMIUM"}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-xl ${
                        isHighlighted ? "bg-primary/20" : "bg-zinc-800"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isHighlighted ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-none">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {plan.durationMonths} month{plan.durationMonths > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    {plan.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm mr-2">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-black text-primary">
                      ${plan.price}
                    </span>
                    {plan.originalPrice && (
                      <div className="mt-1">
                        <span className="text-xs text-green-400 font-semibold">
                          Save ${plan.originalPrice - plan.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectPlan(plan.id, plan.price)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] ${
                      isHighlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                    }`}
                  >
                    Choose this plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust line */}
        <div className="mt-10 text-center text-sm text-muted-foreground flex flex-wrap justify-center gap-6">
          <span>🔒 Secure payment</span>
          <span>⚡ Instant activation</span>
          <span>✓ Satisfaction guaranteed</span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
