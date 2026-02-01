import { Monitor, Zap, Smartphone, Headphones } from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: Monitor,
      title: "4K / FHD Quality",
      description: "Crystal clear streaming in Ultra HD resolution. No pixelation, ever.",
    },
    {
      icon: Zap,
      title: "Anti-Freeze Technology",
      description: "Advanced buffering system ensures smooth playback without interruptions.",
    },
    {
      icon: Smartphone,
      title: "Multi-Device Support",
      description: "Watch on Smart TV, Phone, Tablet, or PC. Your choice, your freedom.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our expert team is always ready to help you with any issues.",
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Premium <span className="text-primary">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for the ultimate streaming experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
