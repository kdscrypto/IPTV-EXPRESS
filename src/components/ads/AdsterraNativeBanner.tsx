import { useEffect, useRef } from "react";

interface AdsterraNativeBannerProps {
  scriptSrc: string;
  containerId: string;
  className?: string;
}

const AdsterraNativeBanner = ({ scriptSrc, containerId, className = "" }: AdsterraNativeBannerProps) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Avoid duplicate injection
    if (document.querySelector(`script[src="${scriptSrc}"][data-container="${containerId}"]`)) {
      return;
    }

    try {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-container", containerId);
      script.src = scriptSrc;
      document.body.appendChild(script);
      scriptRef.current = script;
    } catch (error) {
      console.warn("Adsterra ad failed to load:", error);
    }

    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [scriptSrc, containerId]);

  return (
    <section className={`py-6 bg-zinc-950 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/40 mb-2 text-center tracking-wide uppercase">
            Sponsored
          </p>
          <div
            className="rounded-xl border border-border/50 bg-card/30 overflow-hidden"
            style={{ minHeight: 90 }}
          >
            <div id={containerId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsterraNativeBanner;
