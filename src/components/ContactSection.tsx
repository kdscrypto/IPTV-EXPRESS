import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Clock, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "Chat en direct",
      value: "Disponible 24/7",
      description: "Support instantané via notre chat",
      action: "Ouvrir le chat"
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@iptv-premium.com",
      description: "Réponse sous 2h en moyenne",
      action: "Envoyer un email"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 XX XX XX XX",
      description: "Lun-Dim : 8h-22h",
      action: "Appeler maintenant"
    },
    {
      icon: Clock,
      title: "Support prioritaire",
      value: "Clients Premium",
      description: "Assistance VIP dédiée",
      action: "Accès VIP"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="gradient-text">Contactez</span>
            <br />
            <span className="text-foreground">Notre Équipe</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une question, besoin d'aide ou d'informations ? Notre équipe support 
            est disponible 24/7 pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="glass border-primary/20 hover:border-primary/40 transition-smooth group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                      <CardDescription>{info.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary mb-3">{info.value}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Emergency Contact */}
            <Card className="glass border-warning/30 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <MapPin className="w-5 h-5" />
                  Urgence technique
                </CardTitle>
                <CardDescription>
                  Pour les interruptions de service majeures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Hotline disponible 24/7 pour les problèmes critiques affectant votre service IPTV.
                </p>
                <Button variant="outline" size="sm" className="w-full border-warning/50 text-warning hover:bg-warning/10">
                  Signaler une urgence
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Send className="w-6 h-6 text-primary" />
                  Envoyez-nous un message
                </CardTitle>
                <CardDescription className="text-base">
                  Décrivez votre demande et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-semibold">
                        Nom complet *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Votre nom et prénom"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="h-12 glass border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12 glass border-primary/20 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base font-semibold">
                      Sujet *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Objet de votre message"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="h-12 glass border-primary/20 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-semibold">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre demande en détail..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={6}
                      className="glass border-primary/20 focus:border-primary/50 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="premium" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 glass rounded-lg border border-success/30 bg-success/5">
                  <h4 className="font-semibold text-success mb-2">Temps de réponse</h4>
                  <p className="text-sm text-muted-foreground">
                    • Support technique : <strong>Moins de 30 minutes</strong><br />
                    • Questions commerciales : <strong>Moins de 2 heures</strong><br />
                    • Clients Premium : <strong>Support prioritaire instantané</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;