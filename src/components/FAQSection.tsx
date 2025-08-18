import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Comment fonctionne l'IPTV et est-ce légal ?",
      answer: "L'IPTV (Internet Protocol Television) utilise votre connexion internet pour diffuser les contenus TV. Notre service respecte toutes les réglementations en vigueur et propose uniquement des contenus légalement distribués."
    },
    {
      question: "Quels appareils sont compatibles avec votre service ?",
      answer: "Notre service IPTV est compatible avec tous les appareils modernes : Smart TV (Samsung, LG, Sony), Android TV, iOS, Android, PC/Mac, MAG Box, Enigma2, Kodi, VLC et bien d'autres. Nous fournissons des guides d'installation détaillés pour chaque plateforme."
    },
    {
      question: "Quelle vitesse internet minimum est requise ?",
      answer: "Pour une expérience optimale, nous recommandons une connexion d'au moins 10 Mbps pour le HD et 25 Mbps pour la 4K. Une connexion stable est plus importante qu'une vitesse très élevée."
    },
    {
      question: "Combien d'appareils puis-je connecter simultanément ?",
      answer: "Selon votre abonnement : 3 connexions simultanées pour le plan Découverte, et 5 connexions pour les plans Populaire et Premium. Vous pouvez installer l'application sur un nombre illimité d'appareils."
    },
    {
      question: "Proposez-vous un essai gratuit ?",
      answer: "Oui, nous offrons un test gratuit de 24h pour que vous puissiez évaluer la qualité de notre service. Contactez notre support pour obtenir vos accès d'essai sans engagement."
    },
    {
      question: "Comment se déroule l'activation après paiement ?",
      answer: "Après validation de votre paiement, vous recevrez vos identifiants de connexion par email dans les 5 minutes. Nos équipes techniques sont disponibles 24/7 pour vous accompagner dans la configuration."
    },
    {
      question: "Que faire en cas de problème technique ?",
      answer: "Notre support technique est disponible 24/7 par chat en direct, email ou téléphone. Nous résolvons 95% des problèmes en moins de 30 minutes. Un guide de dépannage détaillé est également disponible."
    },
    {
      question: "Puis-je changer d'abonnement ou demander un remboursement ?",
      answer: "Vous pouvez upgrader votre abonnement à tout moment. Pour les remboursements, nous offrons une garantie satisfaction de 7 jours pour les nouveaux clients, sous conditions d'utilisation normale du service."
    },
    {
      question: "Les contenus sont-ils disponibles en français ?",
      answer: "Oui, nous proposons plus de 800 chaînes françaises (TF1, France 2, Canal+, etc.) ainsi qu'une large sélection de films et séries en VF et VOSTFR. Les programmes internationaux incluent souvent les sous-titres français."
    },
    {
      question: "Y a-t-il des frais cachés ou supplémentaires ?",
      answer: "Non, nos prix sont transparents et tout inclus. Aucun frais d'installation, de configuration ou de matériel supplémentaire. Le prix affiché est le prix final que vous payez."
    }
  ];

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
            <span className="text-foreground">Questions</span>
            <br />
            <span className="gradient-text">Fréquentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Retrouvez toutes les réponses à vos questions sur notre service IPTV premium. 
            Notre équipe est également disponible 24/7 pour vous accompagner.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
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
            <h3 className="text-2xl font-bold mb-4">Une autre question ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe support est disponible 24/7 pour répondre à toutes vos questions 
              et vous accompagner dans votre expérience IPTV.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-smooth font-medium"
              >
                Contacter le support
              </a>
              <a 
                href="mailto:support@iptv-premium.com" 
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg glass border border-primary/30 hover:border-primary/50 transition-smooth font-medium"
              >
                Email direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;