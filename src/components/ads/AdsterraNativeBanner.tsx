import { useEffect, useRef, useState } from "react";

interface AdsterraNativeBannerProps {
  scriptSrc: string;
  containerId: string;
  className?: string;
}

const AdsterraNativeBanner = ({ scriptSrc, containerId, className = "" }: AdsterraNativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Don't inject if already loaded globally for this container
    const existingScript = document.querySelector(
      `script[data-ad-container="${containerId}"]`
    );
    if (existingScript) {
      setAdLoaded(true);
      return;
    }

    // Wait for the container to be in the DOM before injecting
    const timer = setTimeout(() => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`Adsterra: container #${containerId} not found in DOM`);
        return;
      }

      try {
        const script = document.createElement("script");
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.setAttribute("data-ad-container", containerId);
        script.src = scriptSrc;

        script.onload = () => setAdLoaded(true);
        script.onerror = () => console.warn("Adsterra: script failed to load");

        // Adsterra invoke.js must be appended to document.body
        document.body.appendChild(script);
      } catch (error) {
        console.warn("Adsterra ad injection error:", error);
      }
    }, 100); // Small delay to ensure React has rendered the container

    return () => clearTimeout(timer);
    // Intentionally NOT removing the script on unmount:
    // Adsterra scripts are designed to persist and removing them
    // prevents ads from loading on SPA re-navigation.
  }, [scriptSrc, containerId]);

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
            style={{ minHeight: adLoaded ? undefined : 90 }}
          >
            <div id={containerId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsterraNativeBanner;
