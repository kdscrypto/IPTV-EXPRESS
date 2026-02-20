import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/i18n";

const ReviewsSection = () => {
  const { language } = useLanguage();
  const reviewItems = translations[language].prelanding.reviews.items;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i === 0 ? reviewItems.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === reviewItems.length - 1 ? 0 : i + 1));

  const review = reviewItems[currentIndex];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-black">
            What Our Customers Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex items-center gap-4">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-border bg-card hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center text-muted-foreground hover:text-primary"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Review card */}
          <div className="flex-1 rounded-2xl bg-card border border-border p-6 sm:p-8 relative overflow-hidden">
            {/* Big quote icon */}
            <Quote className="absolute top-5 left-5 w-10 h-10 text-primary/30" fill="currentColor" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-6">
              {/* Avatar */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40">
                <span className="text-primary font-black text-2xl">{review.name.charAt(0)}</span>
              </div>

              {/* Author info + stars */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="font-bold text-foreground">
                  {review.name},{" "}
                  <span className="font-normal text-muted-foreground text-sm">{review.location}</span>
                </p>
              </div>
            </div>

            {/* Review text */}
            <p className="text-foreground mt-5 leading-relaxed text-base sm:text-lg">
              "{review.text}"
            </p>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-border bg-card hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center text-muted-foreground hover:text-primary"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviewItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary w-6" : "bg-border"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
