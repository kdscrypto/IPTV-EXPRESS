import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Calendar, Tag, Zap } from 'lucide-react';
import { useMediaContent } from '@/hooks/useMediaContent';

interface DynamicBackgroundProps {
  className?: string;
}

const DynamicBackground = ({ className = '' }: DynamicBackgroundProps) => {
  const { content, loading } = useMediaContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || content.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, content.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [content.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % content.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [content.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <Zap className="w-4 h-4 text-red-500" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4 text-warning" />;
      default:
        return <Play className="w-4 h-4 text-primary" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return 'EN DIRECT';
      case 'upcoming':
        return 'BIENTÔT';
      default:
        return 'RÉCENT';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading || content.length === 0) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60 ${className}`}>
        <div className="w-full h-full bg-gradient-to-b from-transparent via-background/20 to-background/80 animate-pulse" />
      </div>
    );
  }

  const currentContent = content[currentIndex];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Background Images with Smooth Transitions */}
      <div className="relative w-full h-full">
        {content.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
              loading={index <= 2 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      {/* Content Information Overlay */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="max-w-md space-y-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
              currentContent.status === 'live' 
                ? 'bg-red-500/20 border-red-500/30 text-red-300'
                : currentContent.status === 'upcoming'
                ? 'bg-warning/20 border-warning/30 text-warning'
                : 'bg-primary/20 border-primary/30 text-primary'
            }`}>
              {getStatusIcon(currentContent.status)}
              {getStatusText(currentContent.status)}
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-foreground/10 backdrop-blur-md border border-foreground/20 text-foreground/70">
              <Tag className="w-3 h-3" />
              {currentContent.type.toUpperCase()}
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground drop-shadow-lg">
              {currentContent.title}
            </h3>
            {currentContent.description && (
              <p className="text-muted-foreground text-sm leading-relaxed drop-shadow-md line-clamp-2">
                {currentContent.description}
              </p>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {currentContent.genre && (
              <span className="font-medium">{currentContent.genre}</span>
            )}
            {currentContent.release_date && (
              <span>{formatDate(currentContent.release_date)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {content.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass hover:bg-foreground/10 transition-smooth group"
            aria-label="Contenu précédent"
          >
            <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass hover:bg-foreground/10 transition-smooth group"
            aria-label="Contenu suivant"
          >
            <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            {content.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
                aria-label={`Aller au contenu ${index + 1}`}
              />
            ))}
            {content.length > 5 && (
              <div className="w-2 h-2 rounded-full bg-foreground/20" />
            )}
          </div>
        </>
      )}

      {/* Auto-play Indicator */}
      {isAutoPlaying && content.length > 1 && (
        <div className="absolute top-6 right-6 z-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-foreground/70 font-medium">AUTO</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicBackground;