import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const navigate = useNavigate();

  const goToPricing = () => {
    navigate("/#pricing");
    setTimeout(() => {
      const pricingSection = document.getElementById("pricing");
      pricingSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="cta" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Limited Time Offer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Ready to <span className="text-primary">Switch?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Join 50,000+ cord-cutters who are saving money and enjoying unlimited entertainment.
          </p>

          <Button
            onClick={goToPricing}
            size="xl"
            className="w-full sm:w-auto text-lg font-bold px-12 py-7 rounded-xl group"
            style={{ animation: "pulse-cta 2s ease-in-out infinite" }}
          >
            Get Your Free Trial Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-muted-foreground text-sm">
            <span>✓ No Credit Card Required</span>
            <span>✓ Cancel Anytime</span>
            <span>✓ Instant Access</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
