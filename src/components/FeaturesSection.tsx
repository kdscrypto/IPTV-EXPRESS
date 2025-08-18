import { Tv, Smartphone, Tablet, MonitorSpeaker, Zap, Globe, Shield, Clock } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Tv,
      title: "15,000+ Chaînes Live",
      description: "Toutes les chaînes françaises et internationales en direct, sport, cinéma, documentaires et plus encore."
    },
    {
      icon: MonitorSpeaker,
      title: "80,000+ Films & Séries",
      description: "Bibliothèque VOD complète avec les derniers blockbusters et séries TV en français et VOSTFR."
    },
    {
      icon: Zap,
      title: "Qualité 4K/HD",
      description: "Streaming en ultra haute définition avec une fluidité parfaite, sans coupure ni buffering."
    },
    {
      icon: Globe,
      title: "Multi-langues",
      description: "Contenu en français, anglais, arabe, espagnol et de nombreuses autres langues."
    },
    {
      icon: Smartphone,
      title: "Tous appareils",
      description: "Compatible avec Smart TV, Android, iOS, PC, MAG, Enigma2 et plus de 20 plateformes."
    },
    {
      icon: Shield,
      title: "Connexion sécurisée",
      description: "Serveurs ultra-rapides avec protection SSL et garantie de confidentialité totale."
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Assistance technique disponible à tout moment par chat, email ou téléphone."
    },
    {
      icon: Tablet,
      title: "Multi-connexions",
      description: "Jusqu'à 5 appareils connectés simultanément avec le même abonnement premium."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Fonctionnalités</span>
            <br />
            <span className="text-foreground">Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez pourquoi plus de 100,000 clients font confiance à notre service IPTV 
            pour leurs divertissements quotidiens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="glass p-8 rounded-2xl h-full transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary/20">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-primary p-4 rounded-2xl">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;