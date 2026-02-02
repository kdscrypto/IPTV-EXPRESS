import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Clock, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
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
      title: t("main.contact.messageSent"),
      description: t("main.contact.messageResponse"),
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
      titleKey: "main.contact.liveChat",
      valueKey: "main.contact.available247",
      descriptionKey: "main.contact.instantSupport",
      actionKey: "main.contact.openChat"
    },
    {
      icon: Mail,
      titleKey: "main.contact.email",
      valueKey: "main.contact.emailAddress",
      descriptionKey: "main.contact.avgResponse",
      actionKey: "main.contact.sendEmail"
    },
    {
      icon: Phone,
      titleKey: "main.contact.phone",
      valueKey: "main.contact.phoneNumber",
      descriptionKey: "main.contact.phoneHours",
      actionKey: "main.contact.callNow"
    },
    {
      icon: Clock,
      titleKey: "main.contact.prioritySupport",
      valueKey: "main.contact.premiumClients",
      descriptionKey: "main.contact.vipAssistance",
      actionKey: "main.contact.vipAccess"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="gradient-text">{t("main.contact.title")}</span>
            <br />
            <span className="text-foreground">{t("main.contact.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("main.contact.subtitle")}
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
                      <CardTitle className="text-lg">{t(info.titleKey)}</CardTitle>
                      <CardDescription>{t(info.descriptionKey)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary mb-3">{t(info.valueKey)}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {t(info.actionKey)}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Emergency Contact */}
            <Card className="glass border-warning/30 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <MapPin className="w-5 h-5" />
                  {t("main.contact.technicalEmergency")}
                </CardTitle>
                <CardDescription>
                  {t("main.contact.majorOutages")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("main.contact.emergencyHotline")}
                </p>
                <Button variant="outline" size="sm" className="w-full border-warning/50 text-warning hover:bg-warning/10">
                  {t("main.contact.reportEmergency")}
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
                  {t("main.contact.sendMessage")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("main.contact.describeRequest")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-semibold">
                        {t("main.contact.fullName")}
                      </Label>
                      <Input
                        id="name"
                        placeholder={t("main.contact.namePlaceholder")}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="h-12 glass border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold">
                        {t("main.contact.emailLabel")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("main.contact.emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12 glass border-primary/20 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base font-semibold">
                      {t("main.contact.subject")}
                    </Label>
                    <Input
                      id="subject"
                      placeholder={t("main.contact.subjectPlaceholder")}
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="h-12 glass border-primary/20 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-semibold">
                      {t("main.contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t("main.contact.messagePlaceholder")}
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
                        {t("main.contact.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("main.contact.send")}
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 glass rounded-lg border border-success/30 bg-success/5">
                  <h4 className="font-semibold text-success mb-2">{t("main.contact.responseTime")}</h4>
                  <p className="text-sm text-muted-foreground">
                    • {t("main.contact.technicalSupport")} <strong>{t("main.contact.lessThan30min")}</strong><br />
                    • {t("main.contact.commercialQuestions")} <strong>{t("main.contact.lessThan2hours")}</strong><br />
                    • {t("main.contact.premiumClientsResponse")} <strong>{t("main.contact.instantPriority")}</strong>
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
