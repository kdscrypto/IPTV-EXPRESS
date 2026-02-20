import { Monitor, Zap, Smartphone, Headphones } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const FeaturesGrid = () => {
  const { t, language } = useLanguage();
  
  const icons = [Monitor, Zap, Smartphone, Headphones];
  const featureItems = translations[language].prelanding.features.items;

  return (
    <section id="features" className="py-16 sm:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Premium Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {featureItems.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300"
              >
                {/* Icon box */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
