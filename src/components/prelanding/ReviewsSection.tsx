import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const ReviewsSection = () => {
  const { t, language } = useLanguage();
  
  const reviewItems = translations[language].prelanding.reviews.items;

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            {t("prelanding.reviews.title")} <span className="text-primary">{t("prelanding.reviews.titleHighlight")}</span> {t("prelanding.reviews.titleEnd")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("prelanding.reviews.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviewItems.map((review, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/30 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
