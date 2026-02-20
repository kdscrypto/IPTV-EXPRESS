import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const FAQSection = () => {
  const { language } = useLanguage();
  const faqItems = translations[language].main.faq.items;

  return (
    <div id="faq" className="py-16 px-2">
      <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
        Frequently <span className="text-primary">Asked Questions</span>
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.slice(0, 6).map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 data-[state=open]:border-primary/40 transition-colors"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4 text-sm font-semibold text-white hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-muted-foreground leading-relaxed text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
