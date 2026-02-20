import { Tv, MonitorSpeaker, Zap, Globe, Smartphone, Shield, Clock, Tablet } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const FeaturesSection = () => {
  const { t, language } = useLanguage();

  const icons = [Tv, MonitorSpeaker, Zap, Globe, Smartphone, Shield, Clock, Tablet];
  const featureItems = translations[language].main.features.items;

  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Premium <span className="text-primary">Features</span>
          </h2>
        </div>

        {/* 4×2 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featureItems.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-primary/40 hover:bg-zinc-900 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
