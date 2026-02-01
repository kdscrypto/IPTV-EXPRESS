import { Tv, Smartphone, Tablet, Monitor, Flame } from "lucide-react";

const DeviceBanner = () => {
  const devices = [
    { icon: Tv, name: "Smart TV" },
    { icon: Smartphone, name: "Android" },
    { icon: Tablet, name: "Apple/iOS" },
    { icon: Flame, name: "Firestick" },
    { icon: Monitor, name: "MAG Box" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-black border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-center text-muted-foreground text-sm mb-8 uppercase tracking-widest font-medium">
          Compatible with all your devices
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {devices.map((device, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                <device.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {device.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceBanner;
