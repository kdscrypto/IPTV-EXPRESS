import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import DemoModal from "@/components/DemoModal";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground className="z-0" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float opacity-30">
        <div className="w-20 h-20 rounded-full bg-primary/20 blur-xl"></div>
      </div>
      <div className="absolute bottom-40 left-10 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <div className="w-32 h-32 rounded-full bg-primary/15 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="glass p-2 rounded-lg">
              <PlayCircle className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {t("main.hero.streamingPremium")}
            </span>
          </div>

          {/* Titre principal */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            <span className="gradient-text">{t("main.hero.title1")}</span>
            <br />
            <span className="text-foreground">{t("main.hero.title2")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            {t("main.hero.description")} <strong className="text-primary">{t("main.hero.channels")}</strong> {t("main.hero.and")}
            <strong className="text-primary"> {t("main.hero.vod")}</strong> {t("main.hero.descriptionEnd")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 sm:justify-end mt-4">
            <Button variant="glass" size="lg" onClick={() => setIsDemoOpen(true)}>
              {t("main.hero.demo")}
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToPricing}
              className="group"
            >
              {t("main.hero.cta")}
              <PlayCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            </Button>
          </div>

        </div>
      </div>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};

export default HeroSection;
