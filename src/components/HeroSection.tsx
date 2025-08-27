
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Arrière-plan dynamique */}
      <DynamicBackground />

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float opacity-30 z-10">
        <div className="w-20 h-20 rounded-full bg-primary/20 blur-xl"></div>
      </div>
      <div className="absolute bottom-40 left-10 animate-float opacity-20 z-10" style={{ animationDelay: '2s' }}>
        <div className="w-32 h-32 rounded-full bg-primary/15 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="glass p-2 rounded-lg">
              <PlayCircle className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-white/80 tracking-wide uppercase">
              Streaming Premium
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            <span className="gradient-text">IPTV</span>
            <br />
            <span className="text-white">Express</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Accédez à plus de <strong className="text-primary">15,000 chaînes</strong> et 
            <strong className="text-primary"> 80,000 VOD</strong> en qualité 4K. 
            Compatible avec tous vos appareils préférés.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToPricing}
              className="group"
            >
              Commencer maintenant
              <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
            </Button>
            <Button variant="glass" size="xl" onClick={() => setIsDemoOpen(true)}>
              Voir la démo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Sécurisé", desc: "Connexion cryptée SSL" },
              { icon: Users, title: "Multi-appareils", desc: "5 connexions simultanées" },
              { icon: PlayCircle, title: "Qualité 4K", desc: "Streaming haute définition" }
            ].map((feature, index) => (
              <div key={index} className="glass p-6 rounded-xl group hover:bg-white/10 transition-smooth">
                <feature.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};

export default HeroSection;
