import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Bitcoin, Coins, DollarSign, QrCode, Clock, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
}

const CryptoModal = ({ isOpen, onClose, planName, price }: CryptoModalProps) => {
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Ces adresses seraient configurables via des variables d'environnement
  const cryptoAddresses = {
    BTC: {
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      network: "Bitcoin (BTC)",
      icon: Bitcoin,
      color: "text-orange-500"
    },
    ETH: {
      address: "0x742d35Cc6634C0532925a3b8D4c2D5E2E8b74E3F",
      network: "Ethereum (ETH)",
      icon: Coins,
      color: "text-blue-500"
    },
    USDT: {
      address: "0x742d35Cc6634C0532925a3b8D4c2D5E2E8b74E3F",
      network: "USDT (ERC-20)",
      icon: DollarSign,
      color: "text-green-500"
    }
  };

  const copyToClipboard = async (address: string, currency: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(currency);
      toast({
        title: "Adresse copiée !",
        description: `L'adresse ${currency} a été copiée dans votre presse-papiers.`,
      });
      setTimeout(() => setCopiedAddress(null), 3000);
    } catch (err) {
      toast({
        title: "Erreur de copie",
        description: "Impossible de copier l'adresse. Veuillez la sélectionner manuellement.",
        variant: "destructive"
      });
    }
  };

  const generateQRCode = (address: string) => {
    // En production, utilisez une vraie API de génération de QR code
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            Paiement Cryptomonnaie
          </DialogTitle>
          <DialogDescription className="text-base">
            Payez votre abonnement <strong>{planName}</strong> ({price}€) avec vos cryptomonnaies préférées
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions */}
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                Instructions de paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded text-primary font-bold text-xs w-6 h-6 flex items-center justify-center">1</div>
                  <div>
                    <p className="font-semibold">Choisissez votre crypto</p>
                    <p className="text-muted-foreground">Bitcoin, Ethereum ou USDT</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded text-primary font-bold text-xs w-6 h-6 flex items-center justify-center">2</div>
                  <div>
                    <p className="font-semibold">Envoyez le montant exact</p>
                    <p className="text-muted-foreground">À l'adresse indiquée</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded text-primary font-bold text-xs w-6 h-6 flex items-center justify-center">3</div>
                  <div>
                    <p className="font-semibold">Activation automatique</p>
                    <p className="text-muted-foreground">Dans les 10 minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crypto Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(cryptoAddresses).map(([currency, details]) => (
              <Card key={currency} className="glass border-primary/20 hover:border-primary/40 transition-smooth">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full ${details.color} bg-current/10`}>
                      <details.icon className={`w-8 h-8 ${details.color}`} />
                    </div>
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {currency}
                    <Badge variant="outline" className="text-xs">
                      {details.network}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Montant: <strong className="text-primary">{price}€ équivalent</strong>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* QR Code */}
                  <div className="text-center">
                    <div className="inline-block p-3 bg-white rounded-lg">
                      <img 
                        src={generateQRCode(details.address)} 
                        alt={`QR Code ${currency}`}
                        className="w-32 h-32"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Scannez avec votre wallet
                    </p>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Adresse de paiement :</p>
                    <div className="glass p-3 rounded-lg border border-primary/20">
                      <p className="text-xs font-mono break-all text-center">
                        {details.address}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => copyToClipboard(details.address, currency)}
                    >
                      {copiedAddress === currency ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-success" />
                          Copiée !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copier l'adresse
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notes */}
          <Card className="glass border-warning/30 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Informations importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">⏱️ Délais de traitement</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Bitcoin : 30-60 minutes</li>
                    <li>• Ethereum : 5-15 minutes</li>
                    <li>• USDT : 5-15 minutes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔒 Sécurité</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Adresses vérifiées</li>
                    <li>• Transactions sécurisées</li>
                    <li>• Aucun frais caché</li>
                  </ul>
                </div>
              </div>
              <div className="pt-3 border-t border-warning/20">
                <p className="text-warning font-semibold">
                  ⚠️ Envoyez uniquement la cryptomonnaie correspondante à l'adresse. 
                  Tout envoi incorrect sera définitivement perdu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="premium" 
              size="lg" 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Paiement en attente",
                  description: "Nous surveillons les transactions sur toutes les adresses crypto.",
                });
              }}
            >
              <Clock className="w-5 h-5 mr-2" />
              J'ai effectué le paiement
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Fermer
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Besoin d'aide avec le paiement crypto ? 
              <a href="#contact" className="text-primary hover:underline ml-1">
                Contactez notre support 24/7
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoModal;