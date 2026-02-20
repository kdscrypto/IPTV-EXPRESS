import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const PrelandingFooter = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-6 bg-black border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-border/30">
          {/* Logo */}
          <div className="text-lg font-bold">
            <span className="text-primary">IPTV</span>
            <span className="text-foreground"> EXPRESS</span>
          </div>

          {/* Nav links + Language */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <button onClick={() => scrollToSection("features")} className="hover:text-foreground transition-colors">
              {t("common.features")}
            </button>
            <button onClick={() => scrollToSection("reviews")} className="hover:text-foreground transition-colors">
              {t("common.reviews")}
            </button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-foreground transition-colors">
              {t("common.faq")}
            </button>
            <LanguageSwitcher />
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © Copyright IPTV Express.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-5 pt-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            {t("common.termsOfService")}
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            {t("common.privacyPolicy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PrelandingFooter;
