import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  
  const testimonialItems = translations[language].main.testimonials.items;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("main.testimonials.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("main.testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialItems.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/40"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary/60" />
                  <div className="flex gap-1">
                    {renderStars(5)}
                  </div>
                </div>
                
                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {testimonial.plan}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            {t("main.testimonials.joinCta")} <span className="font-semibold text-primary">{t("main.testimonials.satisfiedCustomers")}</span> {t("main.testimonials.trustUs")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
