import { PlayCircle, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: "Legal", href: "#legal" },
    { label: "Sitemap", href: "#sitemap" },
    { label: "Terms", href: "#terms" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="container mx-auto px-6 py-8">
        {/* Top Row: Logo + Payment Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <PlayCircle className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-black text-white">
              IPTV <span className="text-primary">Express</span>
            </span>
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "BTC"].map((method) => (
              <div
                key={method}
                className="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-400"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Legal Links + Social Icons */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Legal Links + Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
            <span className="text-xs text-zinc-600">
              © {currentYear} IPTV Express
            </span>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-zinc-500 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
