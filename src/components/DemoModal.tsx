import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 120; // 2 minutes demo

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video progress
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            clearInterval(interval);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black border-primary/20">
        <DialogHeader className="absolute top-4 left-4 z-10">
          <DialogTitle className="text-white text-lg">
            Démo IPTV Express - Interface et Qualité 4K
          </DialogTitle>
        </DialogHeader>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Video Container */}
        <div className="relative w-full h-full bg-gradient-to-br from-background via-primary/20 to-background/50 flex items-center justify-center">
          {/* Demo Content Simulation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-8">
              {/* Simulated Video Player */}
              <div className="relative bg-black/80 rounded-lg p-8 border border-primary/30">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {/* Channel Grid Simulation */}
                  {[
                    { name: "TF1 HD", category: "Généraliste", quality: "4K" },
                    { name: "France 2 HD", category: "Généraliste", quality: "4K" },
                    { name: "Canal+ Sport", category: "Sport", quality: "4K" },
                    { name: "Netflix Originals", category: "VOD", quality: "4K" },
                    { name: "Disney+ Premium", category: "Famille", quality: "4K" },
                    { name: "Prime Video", category: "VOD", quality: "4K" }
                  ].map((channel, index) => (
                    <div key={index} className="glass p-4 rounded-lg text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="text-white font-semibold text-sm">{channel.name}</h4>
                      <p className="text-primary text-xs">{channel.category}</p>
                      <span className="inline-block bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                        {channel.quality}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats Display */}
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">15,000+</div>
                    <div className="text-white text-sm">Chaînes TV</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">80,000+</div>
                    <div className="text-white text-sm">Films & Séries</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-white text-sm">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Features Showcase */}
              <div className="grid grid-cols-2 gap-6 max-w-2xl">
                <div className="glass p-6 rounded-lg text-left">
                  <h4 className="text-primary font-semibold mb-2">Multi-appareils</h4>
                  <p className="text-white/80 text-sm">Compatible TV, smartphone, tablette, PC</p>
                </div>
                <div className="glass p-6 rounded-lg text-left">
                  <h4 className="text-primary font-semibold mb-2">Qualité 4K</h4>
                  <p className="text-white/80 text-sm">Streaming ultra haute définition</p>
                </div>
                <div className="glass p-6 rounded-lg text-left">
                  <h4 className="text-primary font-semibold mb-2">EPG Complet</h4>
                  <p className="text-white/80 text-sm">Guide TV 7 jours avec enregistrement</p>
                </div>
                <div className="glass p-6 rounded-lg text-left">
                  <h4 className="text-primary font-semibold mb-2">Support 24/7</h4>
                  <p className="text-white/80 text-sm">Assistance technique instantanée</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <div className="flex-1 flex items-center gap-3">
                <span className="text-white text-sm">{formatTime(currentTime)}</span>
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all"
                    style={{ width: `${(currentTime / totalTime) * 100}%` }}
                  />
                </div>
                <span className="text-white text-sm">{formatTime(totalTime)}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;