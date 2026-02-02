import { Check, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const ComparisonSection = () => {
  const { t, language } = useLanguage();
  
  const oldCable = translations[language].prelanding.comparison.oldCableItems;
  const iptvExpress = translations[language].prelanding.comparison.iptvExpressItems;

  return (
    <section className="py-20 sm:py-28 bg-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            {t("prelanding.comparison.title")} <span className="text-primary">{t("prelanding.comparison.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("prelanding.comparison.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Old Cable */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-destructive/20 hover:border-destructive/40 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-muted-foreground">{t("prelanding.comparison.oldCable")}</h3>
            </div>
            <ul className="space-y-4">
              {oldCable.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IPTV EXPRESS */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-primary/30 hover:border-primary/50 transition-colors relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">{t("prelanding.comparison.iptvExpress")}</h3>
              </div>
              <ul className="space-y-4">
                {iptvExpress.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
