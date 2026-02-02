import { useLanguage } from "@/hooks/useLanguage";

const PrelandingFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-black border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="text-lg font-bold">
            <span className="text-primary">IPTV</span>
            <span className="text-foreground"> EXPRESS</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              {t("common.termsOfService")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t("common.privacyPolicy")}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {t("prelanding.footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PrelandingFooter;
