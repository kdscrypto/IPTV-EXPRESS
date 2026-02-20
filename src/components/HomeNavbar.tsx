import { useState } from "react";
import { PlayCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-lg">
            <PlayCircle className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-black text-foreground">
            IPTV <span className="text-primary">Express</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/30 text-foreground hover:border-primary hover:text-primary"
          >
            Log in
          </Button>
          <Button
            size="sm"
            onClick={scrollToPricing}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 font-semibold"
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-primary/10 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-primary/10">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 text-foreground hover:border-primary"
            >
              Log in
            </Button>
            <Button
              size="sm"
              onClick={scrollToPricing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold"
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeNavbar;
