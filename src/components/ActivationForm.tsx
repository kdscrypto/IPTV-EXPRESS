import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Smartphone, Tv, MonitorSpeaker, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivationFormData {
  email: string;
  confirmEmail: string;
  device: string;
  deviceInfo?: string;
}

const ActivationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ActivationFormData>({
    email: '',
    confirmEmail: '',
    device: '',
    deviceInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deviceOptions = [
    { value: 'smart-tv', label: 'Smart TV (Samsung, LG, Sony...)', icon: Tv },
    { value: 'android-tv', label: 'Android TV / TV Box', icon: MonitorSpeaker },
    { value: 'mobile', label: 'Smartphone / Tablette', icon: Smartphone },
    { value: 'computer', label: 'Ordinateur (Windows, Mac, Linux)', icon: MonitorSpeaker },
    { value: 'other', label: 'Autre appareil', icon: Shield }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (formData.email !== formData.confirmEmail) {
      toast({
        title: "Erreur de validation",
        description: "Les adresses email ne correspondent pas.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Demande d'activation envoyée !",
      description: "Vous recevrez vos identifiants par email dans les 5 minutes.",
    });

    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof ActivationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="activation" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-foreground">Formulaire</span>
              <br />
              <span className="gradient-text">d'Activation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Remplissez ce formulaire pour recevoir vos identifiants de connexion IPTV
            </p>
          </div>

          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                Informations d'activation
              </CardTitle>
              <CardDescription className="text-base">
                Vos informations sont sécurisées et utilisées uniquement pour l'activation de votre service
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Adresse email
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

                {/* Confirm Email */}
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail" className="text-base font-semibold">
                    Confirmez votre email
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    placeholder="Confirmez votre adresse email"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                    required
                    className="h-12 glass border-primary/20 focus:border-primary/50"
                  />
                </div>

                {/* Device Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Tv className="w-4 h-4 text-primary" />
                    Type d'appareil principal
                  </Label>
                  <Select value={formData.device} onValueChange={(value) => handleInputChange('device', value)}>
                    <SelectTrigger className="h-12 glass border-primary/20 focus:border-primary/50">
                      <SelectValue placeholder="Sélectionnez votre appareil" />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceOptions.map((device) => (
                        <SelectItem key={device.value} value={device.value}>
                          <div className="flex items-center gap-3">
                            <device.icon className="w-4 h-4" />
                            <span>{device.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Device Info (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="deviceInfo" className="text-base font-semibold">
                    Informations supplémentaires (optionnel)
                  </Label>
                  <Input
                    id="deviceInfo"
                    placeholder="Ex: Marque et modèle de votre appareil"
                    value={formData.deviceInfo}
                    onChange={(e) => handleInputChange('deviceInfo', e.target.value)}
                    className="h-12 glass border-primary/20 focus:border-primary/50"
                  />
                </div>

                {/* Security Notice */}
                <div className="glass p-4 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-primary mb-1">Sécurité & Confidentialité</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Vos données sont chiffrées et protégées. Nous ne partageons jamais vos informations 
                        avec des tiers et respectons strictement le RGPD.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting || !formData.email || !formData.confirmEmail || !formData.device}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Envoyer la demande d'activation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Formulaire", desc: "Remplissez vos informations" },
              { step: "2", title: "Validation", desc: "Nous traitons votre demande" },
              { step: "3", title: "Activation", desc: "Recevez vos identifiants par email" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary text-white rounded-full text-xl font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivationForm;