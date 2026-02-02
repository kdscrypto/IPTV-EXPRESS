import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Tv, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const PrelandingHero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const goToPricing = () => {
    navigate("/#pricing");
    setTimeout(() => {
      const pricingSection = document.getElementById("pricing");
      pricingSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Abstract gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" style={{ animation: "glow-pulse 4s ease-in-out infinite" }} />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center" style={{ animation: "slide-up 0.8s ease-out" }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("main.hero.streamingPremium")}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            {t("prelanding.hero.headline").split("Cable TV")[0]}
            <span className="text-primary">Cable TV.</span>
            <br />
            <span className="text-foreground">{t("prelanding.hero.headline").includes("Arrêtez") ? "Obtenez un accès illimité aujourd'hui." : "Get Unlimited Access Today."}</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("prelanding.hero.subheadline")}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={goToPricing}
              size="xl"
              className="w-full sm:w-auto text-lg font-bold px-10 py-6 rounded-xl"
              style={{ animation: "pulse-cta 2s ease-in-out infinite" }}
            >
              <Play className="w-5 h-5 mr-2" />
              {t("prelanding.hero.cta")}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-primary" />
              <span>4K Ultra HD</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>No Buffering</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-primary">★★★★★</span>
              <span>{t("prelanding.hero.trusted")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default PrelandingHero;
