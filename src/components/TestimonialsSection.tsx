import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const testimonialItems = translations[language].main.testimonials.items;

  // Only show first 2
  const displayed = testimonialItems.slice(0, 2);

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));

  return (
    <div className="py-16 px-2">
      <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
        Customer <span className="text-primary">Testimonials</span>
      </h2>

      <div className="space-y-5">
        {displayed.map((testimonial, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-primary/30 transition-colors"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-3">{renderStars()}</div>

            {/* Comment */}
            <p className="text-white/80 text-sm leading-relaxed mb-5">
              "{testimonial.comment}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                Verified Purchase
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
