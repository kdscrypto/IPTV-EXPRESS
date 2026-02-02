import { Shield, Clock, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { labelKey: "main.footer.about", href: "#about" },
    { labelKey: "main.footer.ourServices", href: "#features" },
    { labelKey: "main.footer.pricing", href: "#pricing" },
    { labelKey: "main.footer.blog", href: "#blog" },
    { labelKey: "main.footer.careers", href: "#careers" }
  ];

  const supportLinks = [
    { labelKey: "main.footer.helpCenter", href: "#help" },
    { labelKey: "main.footer.installation", href: "#setup" },
    { labelKey: "common.faq", href: "#faq" },
    { labelKey: "main.footer.contact", href: "#contact" },
    { labelKey: "main.footer.reportIssue", href: "#report" }
  ];

  const legalLinks = [
    { labelKey: "main.footer.legalNotice", href: "#legal" },
    { labelKey: "main.footer.privacy", href: "#privacy" },
    { labelKey: "main.footer.terms", href: "#terms" },
    { labelKey: "main.footer.cookies", href: "#cookies" },
    { labelKey: "main.footer.gdpr", href: "#gdpr" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-primary/20">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-primary p-1">
                <img 
                  src="/lovable-uploads/aba13bc0-ea36-4a76-998a-db598bc5a404.png" 
                  alt="IPTV Express Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">IPTV</h3>
                <p className="text-sm text-muted-foreground">Express</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("main.footer.description")}
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>{t("main.footer.secureService")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>{t("main.footer.support247")}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("main.footer.company")}</h4>
            <nav className="space-y-3">
              {companyLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("main.footer.support")}</h4>
            <nav className="space-y-3">
              {supportLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("main.footer.contactTitle")}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("main.footer.emailLabel")}</p>
                  <a 
                    href="mailto:support@iptv-express.fr" 
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    support@iptv-express.fr
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("main.footer.phoneLabel")}</p>
                  <a 
                    href="tel:+33142867392" 
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    +33 1 42 86 73 92
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("main.footer.addressLabel")}</p>
                  <p className="text-muted-foreground text-sm">
                    123 Avenue de la République<br />
                    75011 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-primary/20 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} IPTV Express. {t("main.footer.allRightsReserved")}
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                {t("main.footer.companyInfo")}
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>{t("main.footer.frenchService")}</span>
              <span>{t("main.footer.sslSecured")}</span>
              <span>{t("main.footer.uptime")}</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 glass rounded-lg border border-warning/30 bg-warning/5">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <strong>{t("main.footer.disclaimer")}</strong> {t("main.footer.disclaimerText")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
