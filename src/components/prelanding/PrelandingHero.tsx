import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import heroImage from "@/assets/hero-image.jpg";

const PrelandingHero = () => {
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
    <section className="relative min-h-screen bg-black overflow-hidden pt-16 sm:pt-20">
      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left column - Text */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 md:py-0 relative z-10 order-2 md:order-1">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            <span className="text-foreground">Stop Overpaying<br />for Cable TV.</span>
            <br />
            <span className="text-primary">Get Unlimited<br />Access Today.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md leading-relaxed">
            Enjoy 10,000+ Channels, Premium Sports & Movies in Crystal Clear 4K — Starting at Just{" "}
            <span className="text-foreground font-semibold">$9.98/month.</span>
          </p>

          {/* CTA Button */}
          <div className="mb-10">
            <Button
              onClick={goToPricing}
              size="lg"
              className="text-base font-bold px-8 py-6 rounded-full group"
              style={{ animation: "pulse-cta 2s ease-in-out infinite" }}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-secondary/50 text-xs font-bold text-foreground">4K</div>
              <span>4K Ultra HD</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-secondary/50">
                <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>No Buffering</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-secondary/50">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>{t("prelanding.hero.trusted")}</span>
            </div>
          </div>
        </div>

        {/* Right column - Image */}
        <div className="relative order-1 md:order-2 min-h-[300px] md:min-h-full">
          <img
            src={heroImage}
            alt="Family watching IPTV on Smart TV"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient overlay - fade to black on left for desktop, bottom for mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden" />
        </div>
      </div>
    </section>
  );
};

export default PrelandingHero;
