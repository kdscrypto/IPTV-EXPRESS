import { useEffect, useRef } from "react";

interface AtOptions {
  key: string;
  format: string;
  height: number;
  width: number;
  params: Record<string, unknown>;
}

interface AdsterraNativeBannerProps {
  atOptions: AtOptions;
  className?: string;
}

const AdsterraNativeBanner = ({ atOptions, className = "" }: AdsterraNativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Set global atOptions for Adsterra
      (window as any).atOptions = atOptions;

      // Create and inject script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;
      script.async = true;
      containerRef.current.appendChild(script);
      scriptRef.current = script;
    } catch (error) {
      console.warn("Adsterra ad failed to load:", error);
    }

    return () => {
      // Cleanup on unmount
      try {
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
          scriptRef.current = null;
        }
      } catch {
        // Silent cleanup failure
      }
    };
  }, [atOptions.key]);

  return (
    <section className={`py-6 bg-zinc-950 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/40 mb-2 text-center tracking-wide uppercase">
            Sponsored
          </p>
          <div
            ref={containerRef}
            className="rounded-xl border border-border/50 bg-card/30 overflow-hidden"
            style={{ minHeight: atOptions.height || 250 }}
          />
        </div>
      </div>
    </section>
  );
};

export default AdsterraNativeBanner;
