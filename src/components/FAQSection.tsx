import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const FAQSection = () => {
  const { t, language } = useLanguage();
  
  const faqItems = translations[language].main.faq.items;

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-foreground">{t("main.faq.title")}</span>
            <br />
            <span className="gradient-text">{t("main.faq.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("main.faq.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass border border-primary/20 rounded-lg px-6 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 text-center">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">{t("main.faq.anotherQuestion")}</h3>
            <p className="text-muted-foreground mb-6">
              {t("main.faq.supportAvailable")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-smooth font-medium"
              >
                {t("main.faq.contactSupport")}
              </a>
              <a 
                href="mailto:support@iptv-premium.com" 
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg glass border border-primary/30 hover:border-primary/50 transition-smooth font-medium"
              >
                {t("main.faq.directEmail")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
