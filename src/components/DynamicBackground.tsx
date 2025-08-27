
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: number;
  title: string;
  type: "film" | "série" | "match";
  image: string;
  releaseDate: string;
  description: string;
  duration?: string;
  genre?: string;
}

// Données simulées des derniers contenus
const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: "Avatar: La Voie de l'Eau",
    type: "film",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
    releaseDate: "2024-01-15",
    description: "La suite épique de James Cameron dans le monde de Pandora",
    duration: "3h 12min",
    genre: "Science-Fiction"
  },
  {
    id: 2,
    title: "PSG vs Real Madrid",
    type: "match",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&h=1080&fit=crop",
    releaseDate: "2024-02-28",
    description: "Huitième de finale Champions League - Match retour",
    duration: "90min",
    genre: "Football"
  },
  {
    id: 3,
    title: "House of the Dragon",
    type: "série",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
    releaseDate: "2024-03-10",
    description: "Saison 2 de la série épique de fantasy",
    duration: "Episode 45min",
    genre: "Fantasy"
  },
  {
    id: 4,
    title: "Dune: Deuxième Partie",
    type: "film",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop",
    releaseDate: "2024-02-20",
    description: "La suite attendue de l'adaptation de Denis Villeneuve",
    duration: "2h 46min",
    genre: "Science-Fiction"
  },
  {
    id: 5,
    title: "France vs Italie",
    type: "match",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=1080&fit=crop",
    releaseDate: "2024-03-05",
    description: "Match amical international au Stade de France",
    duration: "90min",
    genre: "Football"
  }
];

const DynamicBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-défilement toutes les 5 secondes
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const currentItem = mediaItems[currentIndex];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "film": return "bg-blue-600";
      case "série": return "bg-purple-600";
      case "match": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isUpcoming = date > now;
    
    return {
      formatted: date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      isUpcoming
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="relative h-full w-full">
        <img 
          src={currentItem.image} 
          alt={currentItem.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Contrôles de navigation */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="glass hover:bg-white/20 text-white w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="glass hover:bg-white/20 text-white w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Informations du contenu */}
      <div className="absolute bottom-20 left-6 right-6 z-20">
        <div className="max-w-md space-y-4">
          {/* Badge du type */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(currentItem.type)}`}>
              {currentItem.type.toUpperCase()}
            </span>
            <span className="text-sm text-white/80 font-medium">
              {currentItem.genre}
            </span>
          </div>

          {/* Titre */}
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {currentItem.title}
          </h3>

          {/* Description */}
          <p className="text-white/90 text-sm leading-relaxed">
            {currentItem.description}
          </p>

          {/* Méta-informations */}
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {(() => {
                  const { formatted, isUpcoming } = formatDate(currentItem.releaseDate);
                  return `${isUpcoming ? 'Sortie le' : 'Sorti le'} ${formatted}`;
                })()}
              </span>
            </div>
            {currentItem.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{currentItem.duration}</span>
              </div>
            )}
          </div>

          {/* Bouton de lecture */}
          <Button 
            variant="hero" 
            size="lg"
            className="mt-4 group"
          >
            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            {currentItem.type === "match" ? "Regarder en direct" : "Regarder maintenant"}
          </Button>
        </div>
      </div>

      {/* Indicateurs de pagination */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicBackground;
