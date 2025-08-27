import { Tv, Shield, Clock, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "À propos", href: "#about" },
    { label: "Nos services", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Blog", href: "#blog" },
    { label: "Carrières", href: "#careers" }
  ];

  const supportLinks = [
    { label: "Centre d'aide", href: "#help" },
    { label: "Installation", href: "#setup" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Signaler un problème", href: "#report" }
  ];

  const legalLinks = [
    { label: "Mentions légales", href: "#legal" },
    { label: "Politique de confidentialité", href: "#privacy" },
    { label: "Conditions d'utilisation", href: "#terms" },
    { label: "Politique de cookies", href: "#cookies" },
    { label: "RGPD", href: "#gdpr" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-primary/20">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">IPTV</h3>
                <p className="text-sm text-muted-foreground">Express</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Le leader français de l'IPTV express avec plus de 15,000 chaînes 
              et 80,000 contenus VOD. Qualité 4K, support 24/7.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Service sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>Support 24/7 garanti</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Entreprise</h4>
            <nav className="space-y-3">
              {companyLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <nav className="space-y-3">
              {supportLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
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
                  <p className="font-medium">Téléphone</p>
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
                  <p className="font-medium">Adresse</p>
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
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} IPTV Express. Tous droits réservés.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Société française - SIRET : 123 456 789 00012
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>🇫🇷 Service français</span>
              <span>🔒 SSL sécurisé</span>
              <span>⚡ 99.9% uptime</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 glass rounded-lg border border-warning/30 bg-warning/5">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <strong>Disclaimer :</strong> Notre service IPTV respecte toutes les réglementations en vigueur. 
            Nous proposons uniquement des contenus légalement distribués et respectons les droits d'auteur. 
            L'utilisation de notre service est soumise à nos conditions d'utilisation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;