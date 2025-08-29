import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Shield, Users } from "lucide-react";
import DemoModal from "@/components/DemoModal";
import DynamicBackground from "@/components/DynamicBackground";

const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
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
              Streaming Premium
            </span>
          </div>

          {/* Logo principal */}
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/aba13bc0-ea36-4a76-998a-db598bc5a404.png" 
              alt="IPTV Express Logo" 
              className="h-32 md:h-40 lg:h-48 w-auto object-contain"
            />
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed mx-auto text-center">
            Accédez à plus de <strong className="text-primary">15,000 chaînes</strong> et 
            <strong className="text-primary"> 80,000 VOD</strong> en qualité 4K. 
            Compatible avec tous vos appareils préférés.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 sm:justify-end mt-4">
            <Button variant="glass" size="lg" onClick={() => setIsDemoOpen(true)}>
              Voir la démo
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToPricing}
              className="group"
            >
              Commencer maintenant
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