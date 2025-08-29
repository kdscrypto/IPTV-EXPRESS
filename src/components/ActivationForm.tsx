import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Smartphone, Tv, MonitorSpeaker, Shield, CheckCircle, X, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToWhatsApp, getDeviceLabel } from "@/utils/whatsapp";
import { sanitizeEmail, sanitizeDeviceInfo, isValidEmail, isValidDevice, checkRateLimit } from "@/utils/validation";
import { handleFormError, validateFormData, logSecureError } from "@/utils/errorHandler";

interface ActivationFormData {
  email: string;
  confirmEmail: string;
  device: string;
  deviceInfo?: string;
}

interface SelectedPlan {
  id: string;
  name: string;
  price: number;
}

interface ActivationFormProps {
  selectedPlan?: SelectedPlan | null;
  onClearPlan?: () => void;
}

const ActivationForm = ({ selectedPlan, onClearPlan }: ActivationFormProps) => {
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

    try {
      // Rate limiting check
      if (!checkRateLimit(formData.email, 3, 300000)) { // 3 requests per 5 minutes
        toast({
          title: "Trop de tentatives",
          description: "Veuillez patienter 5 minutes avant de renvoyer le formulaire.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Comprehensive form validation
      const validation = validateFormData({
        email: formData.email,
        confirmEmail: formData.confirmEmail,
        device: formData.device,
        deviceInfo: formData.deviceInfo
      });

      if (!validation.isValid) {
        toast({
          title: "Erreur de validation",
          description: validation.errors[0],
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      if (!selectedPlan) {
        toast({
          title: "Plan non sélectionné",
          description: "Veuillez d'abord choisir un plan d'abonnement.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Input sanitization
      const sanitizedEmail = sanitizeEmail(formData.email);
      const sanitizedDeviceInfo = sanitizeDeviceInfo(formData.deviceInfo || '');

      // Préparer les données pour WhatsApp avec les données sanitized
      const whatsappData = {
        email: sanitizedEmail,
        device: getDeviceLabel(formData.device),
        deviceInfo: sanitizedDeviceInfo,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price
      };

      // Envoyer vers WhatsApp
      const message = sendToWhatsApp(whatsappData);

      // Log successful submission securely
      logSecureError({
        type: 'form_submission_success',
        email: sanitizedEmail.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partially redact email for logs
        plan: selectedPlan.name
      }, 'WhatsApp Form Submission');

      toast({
        title: "Redirection vers WhatsApp",
        description: "Votre demande est automatiquement transférée à notre support.",
      });

      // Réinitialiser le formulaire après envoi
      setTimeout(() => {
        setFormData({
          email: '',
          confirmEmail: '',
          device: '',
          deviceInfo: ''
        });
        onClearPlan?.();
      }, 2000);

    } catch (error) {
      // Use secure error handling
      handleFormError(error, toast);
      logSecureError(error, 'WhatsApp Form Submission Error');
    } finally {
      setIsSubmitting(false);
    }
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
                Vos informations sont sécurisées et envoyées directement à notre support WhatsApp
              </CardDescription>
              
              {/* Plan sélectionné */}
              {selectedPlan && (
                <div className="mt-4 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-gradient-primary text-white">
                        Plan sélectionné
                      </Badge>
                      <span className="font-semibold text-lg">
                        {selectedPlan.name} - {selectedPlan.price}€
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onClearPlan?.();
                        // Retourner à la section pricing
                        const pricingSection = document.getElementById('pricing');
                        if (pricingSection) {
                          pricingSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Changer
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Message si aucun plan sélectionné */}
              {!selectedPlan && (
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <ArrowUp className="w-5 h-5 text-destructive" />
                    <div>
                      <p className="font-semibold text-destructive">Plan non sélectionné</p>
                      <p className="text-sm text-muted-foreground">
                        Veuillez d'abord choisir un plan d'abonnement ci-dessus
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
                  disabled={isSubmitting || !formData.email || !formData.confirmEmail || !formData.device || !selectedPlan}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Envoyer vers WhatsApp Support
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Sélection", desc: "Choisissez votre plan IPTV" },
              { step: "2", title: "Formulaire", desc: "Remplissez vos informations" },
              { step: "3", title: "WhatsApp", desc: "Envoi automatique vers le support" }
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