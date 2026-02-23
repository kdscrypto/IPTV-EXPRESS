import { useEffect, useRef } from "react";

interface AdsterraNativeBannerProps {
  scriptSrc: string;
  containerId: string;
  className?: string;
}

const AdsterraNativeBanner = ({ scriptSrc, containerId, className = "" }: AdsterraNativeBannerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !wrapperRef.current) return;
    loaded.current = true;

    try {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = scriptSrc;
      wrapperRef.current.appendChild(script);
    } catch (error) {
      console.warn("Adsterra ad failed to load:", error);
    }

    return () => {
      loaded.current = false;
    };
  }, [scriptSrc]);

  return (
    <section className={`py-6 bg-zinc-950 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/40 mb-2 text-center tracking-wide uppercase">
            Sponsored
          </p>
          <div
            ref={wrapperRef}
            className="rounded-xl border border-border/50 bg-card/30 overflow-hidden"
            style={{ minHeight: 250 }}
          >
            <div id={containerId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsterraNativeBanner;
