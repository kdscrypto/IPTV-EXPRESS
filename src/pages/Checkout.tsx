import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Tv, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ActivationForm from "@/components/ActivationForm";
import NOWPaymentModal from "@/components/NOWPaymentModal";
import { useLanguage } from "@/hooks/useLanguage";

interface PlanState {
  planId: string;
  planName: string;
  price: number;
}

const planFeatures: Record<string, string[]> = {
  "1month": [
    "main.pricing.features.liveChannels",
    "main.pricing.features.moviesAndSeries",
    "main.pricing.features.fullHd",
    "main.pricing.features.connections2",
    "main.pricing.features.emailSupport",
  ],
  "3months": [
    "main.pricing.features.liveChannels",
    "main.pricing.features.moviesAndSeries",
    "main.pricing.features.fullHd",
    "main.pricing.features.connections3",
    "main.pricing.features.support247",
    "main.pricing.features.catchup7",
  ],
  "6months": [
    "main.pricing.features.liveChannels",
    "main.pricing.features.moviesAndSeries",
    "main.pricing.features.uhd4k",
    "main.pricing.features.connections5",
    "main.pricing.features.support247",
    "main.pricing.features.catchup14",
    "main.pricing.features.epg",
  ],
  "12months": [
    "main.pricing.features.liveChannels",
    "main.pricing.features.moviesAndSeries",
    "main.pricing.features.uhd4k",
    "main.pricing.features.connections5",
    "main.pricing.features.vipSupport",
    "main.pricing.features.catchup14",
    "main.pricing.features.epg",
    "main.pricing.features.premiumApps",
    "main.pricing.features.lifetimeUpdates",
  ],
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const selectedPlan = location.state as PlanState | null;

  const [nowPayment, setNowPayment] = useState<{
    isOpen: boolean;
    payment: any;
  }>({ isOpen: false, payment: null });

  useEffect(() => {
    if (!selectedPlan) {
      navigate("/home#pricing", { replace: true });
    }
  }, []);

  if (!selectedPlan) return null;

  const features = planFeatures[selectedPlan.planId] || planFeatures["1month"];
  const isPremium = selectedPlan.planId === "12months";
  const isPopular = selectedPlan.planId === "6months";

  const handlePaymentCreated = (payment: any) => {
    setNowPayment({ isOpen: true, payment });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/home#pricing")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t("main.activation.change")}</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">
              IPTV <span className="gradient-text">EXPRESS</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">{t("main.pricing.trust.securePayment")}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Page title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            {t("main.activation.title")}{" "}
            <span className="gradient-text">{t("main.activation.titleHighlight")}</span>
          </h1>
          <p className="text-muted-foreground">{t("main.activation.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Plan Summary — left column on desktop */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-primary/20 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-primary rounded-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  {t("main.activation.selectedPlan")}
                </span>
              </div>

              {/* Plan name & price */}
              <div className="mb-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-black leading-tight">
                    {selectedPlan.planName}
                  </h2>
                  {isPremium && (
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 shrink-0">
                      👑 PREMIUM
                    </Badge>
                  )}
                  {isPopular && (
                    <Badge className="bg-primary/20 text-primary border-primary/30 shrink-0">
                      ⚡ POPULAIRE
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black gradient-text">
                    ${selectedPlan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    / {t("main.pricing.month")}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/40 mb-5" />

              {/* Features list */}
              <ul className="space-y-2.5">
                {features.map((featureKey, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-primary" />
                    </div>
                    <span>{t(featureKey)}</span>
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="mt-6 pt-5 border-t border-border/40 grid grid-cols-1 gap-2">
                {[
                  { key: "main.pricing.trust.securePayment", icon: Shield },
                  { key: "main.pricing.trust.instantActivation", icon: CheckCircle },
                  { key: "main.pricing.trust.satisfactionGuarantee", icon: Star },
                ].map(({ key, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activation Form — right column on desktop */}
          <div className="lg:col-span-3">
            <ActivationForm
              selectedPlan={{
                id: selectedPlan.planId,
                name: selectedPlan.planName,
                price: selectedPlan.price,
              }}
              onClearPlan={() => navigate("/home#pricing")}
              onPaymentCreated={handlePaymentCreated}
              onNavigateBack={() => navigate("/home#pricing")}
            />
          </div>
        </div>
      </main>

      {/* NOWPayments modal */}
      <NOWPaymentModal
        isOpen={nowPayment.isOpen}
        onClose={() => setNowPayment({ isOpen: false, payment: null })}
        payment={nowPayment.payment}
      />
    </div>
  );
};

export default Checkout;
