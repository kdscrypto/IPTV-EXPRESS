import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const StickyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const goToPricing = () => {
    setIsMenuOpen(false);
    navigate("/home#pricing");
    setTimeout(() => {
      const pricingSection = document.getElementById("pricing");
      pricingSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-black tracking-tight">
              <span className="text-primary">IPTV</span>
              <span className="text-foreground"> EXPRESS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t("common.features")}
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t("common.reviews")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t("common.faq")}
            </button>
            <LanguageSwitcher />
            <Button
              onClick={goToPricing}
              className="font-semibold"
            >
              {t("common.getStarted")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
              >
                {t("common.features")}
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
              >
                {t("common.reviews")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
              >
                {t("common.faq")}
              </button>
              <Button
                onClick={goToPricing}
                className="w-full font-semibold"
              >
                {t("common.getStarted")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StickyNavbar;
