import { PlayCircle } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";

const HeroSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    pricingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Dynamic TMDB Background */}
      <DynamicBackground />

      {/* Left-to-right overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-24 pt-32" style={{ zIndex: 10 }}>
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary/20 border border-primary/40 p-1.5 rounded-lg">
              <PlayCircle className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Premium IPTV Service
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 text-white">
            IPTV{" "}
            <span className="text-primary">Express</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
            Access over{" "}
            <strong className="text-primary">15,000 Channels</strong> and{" "}
            <strong className="text-primary">80,000 VOD</strong> in 4K quality.
            Compatible with all your favorite devices.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30"
          >
            Get Started Now
            <PlayCircle className="w-5 h-5" />
          </button>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <span className="text-primary font-bold">✓</span> 4K Ultra HD
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1">
              <span className="text-primary font-bold">✓</span> No Buffering
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1">
              <span className="text-primary font-bold">✓</span> 50,000+ customers worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
