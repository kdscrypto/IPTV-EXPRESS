import { useLanguage } from "@/hooks/useLanguage";

const DeviceBanner = () => {
  const { t } = useLanguage();

  const devices = [
    {
      label: "Smart TV",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=250&fit=crop&q=80",
      alt: "Smart TV showing IPTV streaming interface",
    },
    {
      label: "Android/iOS Devices",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&q=80",
      alt: "Mobile phone showing streaming app",
    },
    {
      label: "Firestick/MAG Box",
      image: "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&h=250&fit=crop&q=80",
      alt: "Firestick remote and streaming device",
    },
  ];

  return (
    <section id="devices" className="py-16 sm:py-20 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black">
            Supported Devices
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {devices.map((device, index) => (
            <div
              key={index}
              className="group rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300"
            >
              {/* Device image */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={device.image}
                  alt={device.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Label */}
              <div className="py-4 px-4 bg-secondary/30 text-center">
                <p className="font-semibold text-foreground text-sm">{device.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceBanner;
