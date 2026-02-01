const PrelandingFooter = () => {
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
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 IPTV EXPRESS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PrelandingFooter;
