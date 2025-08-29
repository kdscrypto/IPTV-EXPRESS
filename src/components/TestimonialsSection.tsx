import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  plan: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marie Dubois",
      location: "Paris, France",
      rating: 5,
      comment: "Service exceptionnel ! La qualité d'image est parfaite et j'ai accès à toutes mes chaînes préférées. L'installation a été très simple.",
      plan: "Premium 12 mois"
    },
    {
      id: 2,
      name: "Jean-Pierre Martin",
      location: "Lyon, France",
      rating: 5,
      comment: "Très satisfait de mon abonnement. Aucune coupure depuis 6 mois, qualité 4K au top et support client réactif.",
      plan: "Populaire 6 mois"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      location: "Marseille, France",
      rating: 5,
      comment: "Le meilleur service IPTV que j'ai testé ! Grand choix de chaînes internationales et VOD énorme. Je recommande vivement.",
      plan: "Premium 12 mois"
    },
    {
      id: 4,
      name: "Ahmed Benali",
      location: "Nice, France",
      rating: 5,
      comment: "Excellent rapport qualité-prix. Fonctionne parfaitement sur tous mes appareils, smartphone, tablette et Smart TV.",
      plan: "Découverte 3 mois"
    },
    {
      id: 5,
      name: "Claire Moreau",
      location: "Toulouse, France",
      rating: 5,
      comment: "Interface très intuitive et stabilité parfaite. Mes enfants adorent les chaînes jeunesse et moi les séries en VOD.",
      plan: "Populaire 6 mois"
    },
    {
      id: 6,
      name: "Karim Kassimi",
      location: "Strasbourg, France",
      rating: 5,
      comment: "Service irréprochable depuis le début. Qualité d'image excellente même en heure de pointe. Très content de mon choix.",
      plan: "Premium 12 mois"
    }
  ];

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
            Témoignages Clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez ce que nos clients satisfaits disent de notre service IPTV
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/40"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary/60" />
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
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
            Rejoignez plus de <span className="font-semibold text-primary">50,000 clients satisfaits</span> qui nous font confiance
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;