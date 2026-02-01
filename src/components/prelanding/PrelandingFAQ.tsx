import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrelandingFAQ = () => {
  const faqs = [
    {
      question: "Do I need a satellite dish?",
      answer: "No! IPTV EXPRESS works entirely over the internet. All you need is a stable internet connection (minimum 10Mbps for HD, 25Mbps for 4K) and a compatible device.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 24-hour free trial so you can test our service before committing. No credit card required for the trial period.",
    },
    {
      question: "How fast is the setup?",
      answer: "Setup takes less than 5 minutes. After payment, you'll receive your login credentials instantly via email. Simply install our app and start streaming!",
    },
    {
      question: "What devices are supported?",
      answer: "We support Smart TVs (Samsung, LG, Sony), Android devices, iOS (iPhone/iPad), Amazon Firestick, MAG boxes, Windows PC, and Mac. Basically, if it connects to the internet, it works!",
    },
    {
      question: "Can I watch on multiple devices?",
      answer: "Yes! Depending on your plan, you can stream on 1-4 devices simultaneously. Perfect for families who want to watch different content at the same time.",
    },
    {
      question: "What if I have technical issues?",
      answer: "Our 24/7 customer support team is always available via WhatsApp, email, or live chat. Most issues are resolved within minutes.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about IPTV EXPRESS
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl border border-border px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PrelandingFAQ;
