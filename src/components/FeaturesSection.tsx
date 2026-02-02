import { Tv, Smartphone, Tablet, MonitorSpeaker, Zap, Globe, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const FeaturesSection = () => {
  const { t, language } = useLanguage();
  
  const icons = [Tv, MonitorSpeaker, Zap, Globe, Smartphone, Shield, Clock, Tablet];
  const featureItems = translations[language].main.features.items;

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">{t("main.features.title")}</span>
            <br />
            <span className="text-foreground">{t("main.features.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("main.features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => {
            const Icon = icons[index];
            return (
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
                        <Icon className="w-8 h-8 text-white" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
