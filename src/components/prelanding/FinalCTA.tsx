import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const FinalCTA = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const goToPricing = () => {
    navigate("/home#pricing");
    setTimeout(() => {
      const pricingSection = document.getElementById("pricing");
      pricingSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="cta" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-2xl overflow-hidden bg-primary p-10 sm:p-16 text-center relative">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              {t("prelanding.cta.title")}
            </h2>

            <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              {t("prelanding.cta.subtitle")}
            </p>

            <Button
              onClick={goToPricing}
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-bold px-10 py-6 rounded-full text-base"
            >
              {t("prelanding.cta.button")}
            </Button>

            <p className="mt-6 text-primary-foreground/60 text-sm">
              {t("prelanding.cta.guarantee")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
