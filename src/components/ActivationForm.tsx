import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Smartphone, Tv, MonitorSpeaker, Shield, CheckCircle, X, ArrowUp, Wallet, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToWhatsApp, getDeviceLabel } from "@/utils/whatsapp";
import { supabase } from "@/integrations/supabase/client";
import PaymentMethodComparison from "@/components/PaymentMethodComparison";
import { useLanguage } from "@/hooks/useLanguage";

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
  onPaymentCreated?: (payment: any) => void;
}

const ActivationForm = ({ selectedPlan, onClearPlan, onPaymentCreated }: ActivationFormProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ActivationFormData>({
    email: '',
    confirmEmail: '',
    device: '',
    deviceInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'whatsapp'>('crypto');

  const deviceOptions = [
    { value: 'smart-tv', labelKey: 'main.activation.smartTv', icon: Tv },
    { value: 'android-tv', labelKey: 'main.activation.androidTv', icon: MonitorSpeaker },
    { value: 'mobile', labelKey: 'main.activation.mobile', icon: Smartphone },
    { value: 'computer', labelKey: 'main.activation.computer', icon: MonitorSpeaker },
    { value: 'other', labelKey: 'main.activation.otherDevice', icon: Shield }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (formData.email !== formData.confirmEmail) {
      toast({
        title: t("main.activation.validationError"),
        description: t("main.activation.emailMismatch"),
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!selectedPlan) {
      toast({
        title: t("main.activation.noPlanSelected"),
        description: t("main.activation.selectPlanFirst"),
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (paymentMethod === 'crypto') {
        // Create payment via NOWPayments
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: {
            planId: selectedPlan.id,
            planName: selectedPlan.name,
            price: selectedPlan.price,
            email: formData.email,
            device: formData.device,
            deviceInfo: formData.deviceInfo,
          }
        });

        if (error) throw error;

        if (data?.success) {
          toast({
            title: t("main.activation.paymentCreated"),
            description: t("main.activation.cryptoInitialized"),
          });

          // Call parent callback with payment data
          onPaymentCreated?.(data.payment);

          // Reset form
          setTimeout(() => {
            setFormData({
              email: '',
              confirmEmail: '',
              device: '',
              deviceInfo: ''
            });
          }, 1000);
        }
      } else {
        // Send to WhatsApp (old method)
        const whatsappData = {
          email: formData.email,
          device: getDeviceLabel(formData.device),
          deviceInfo: formData.deviceInfo || '',
          planName: selectedPlan.name,
          planPrice: selectedPlan.price
        };

        sendToWhatsApp(whatsappData);

        toast({
          title: t("main.activation.redirectWhatsapp"),
          description: t("main.activation.requestTransferred"),
        });

        // Reset form
        setTimeout(() => {
          setFormData({
            email: '',
            confirmEmail: '',
            device: '',
            deviceInfo: ''
          });
          onClearPlan?.();
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t("main.activation.error"),
        description: error instanceof Error ? error.message : t("main.activation.tryAgain"),
        variant: "destructive"
      });
    }

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
              <span className="text-foreground">{t("main.activation.title")}</span>
              <br />
              <span className="gradient-text">{t("main.activation.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("main.activation.subtitle")}
            </p>
          </div>

          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                {t("main.activation.activationInfo")}
              </CardTitle>
              <CardDescription className="text-base">
                {t("main.activation.secureInfo")}
              </CardDescription>
              
              {/* Plan sélectionné */}
              {selectedPlan && (
                <div className="mt-4 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-gradient-primary text-white">
                        {t("main.activation.selectedPlan")}
                      </Badge>
                      <span className="font-semibold text-lg">
                        {selectedPlan.name} - ${selectedPlan.price}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onClearPlan?.();
                        const pricingSection = document.getElementById('pricing');
                        if (pricingSection) {
                          pricingSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4 mr-1" />
                      {t("main.activation.change")}
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
                      <p className="font-semibold text-destructive">{t("main.activation.noPlanSelected")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("main.activation.selectPlanFirst")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    {t("main.activation.paymentMethod")}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'crypto'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Wallet className={`w-8 h-8 ${paymentMethod === 'crypto' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-semibold">{t("main.activation.cryptoPayment")}</span>
                        <span className="text-xs text-muted-foreground text-center">
                          {t("main.activation.cryptoDescription")}
                        </span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                          {t("main.activation.recommended")}
                        </Badge>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'whatsapp'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <MessageSquare className={`w-8 h-8 ${paymentMethod === 'whatsapp' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-semibold">{t("main.activation.whatsappSupport")}</span>
                        <span className="text-xs text-muted-foreground text-center">
                          {t("main.activation.whatsappDescription")}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    {t("main.activation.emailAddress")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("main.activation.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-12 glass border-primary/20 focus:border-primary/50"
                  />
                </div>

                {/* Confirm Email */}
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail" className="text-base font-semibold">
                    {t("main.activation.confirmEmail")}
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    placeholder={t("main.activation.confirmEmailPlaceholder")}
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
                    {t("main.activation.deviceType")}
                  </Label>
                  <Select value={formData.device} onValueChange={(value) => handleInputChange('device', value)}>
                    <SelectTrigger className="h-12 glass border-primary/20 focus:border-primary/50">
                      <SelectValue placeholder={t("main.activation.selectDevice")} />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceOptions.map((device) => (
                        <SelectItem key={device.value} value={device.value}>
                          <div className="flex items-center gap-3">
                            <device.icon className="w-4 h-4" />
                            <span>{t(device.labelKey)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Device Info (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="deviceInfo" className="text-base font-semibold">
                    {t("main.activation.additionalInfo")}
                  </Label>
                  <Input
                    id="deviceInfo"
                    placeholder={t("main.activation.additionalInfoPlaceholder")}
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
                      <p className="font-semibold text-primary mb-1">{t("main.activation.security")}</p>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("main.activation.securityText")}
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
                      {t("main.contact.sending")}
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'crypto' ? (
                        <>
                          <Wallet className="w-5 h-5 mr-2" />
                          {t("main.activation.proceedCrypto")}
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-5 h-5 mr-2" />
                          {t("main.activation.sendWhatsapp")}
                        </>
                      )}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Payment Method Comparison */}
          <PaymentMethodComparison />

          {/* Process Steps */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", titleKey: "main.activation.step1", descKey: "main.activation.step1Desc" },
              { step: "2", titleKey: "main.activation.step2", descKey: "main.activation.step2Desc" },
              { step: "3", titleKey: "main.activation.step3", descKey: "main.activation.step3Desc" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary text-white rounded-full text-xl font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivationForm;
