import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Clock, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePaymentStatus } from "@/hooks/usePaymentStatus";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface NOWPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    payment_id: string;
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
    payment_url?: string;
  } | null;
}

const NOWPaymentModal = ({ isOpen, onClose, payment }: NOWPaymentModalProps) => {
  const { toast } = useToast();
  const { status, order } = usePaymentStatus(payment?.payment_id || null);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds

  useEffect(() => {
    if (!isOpen || !order) return;

    const expiresAt = new Date(order.expires_at).getTime();
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        toast({
          title: "Paiement expiré",
          description: "Le délai de paiement est dépassé. Veuillez créer une nouvelle commande.",
          variant: "destructive",
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isOpen, order, toast]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copié !",
        description: `${label} copié dans le presse-papiers`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier dans le presse-papiers",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'waiting':
        return {
          icon: <Clock className="w-12 h-12 text-yellow-500" />,
          title: "En attente du paiement",
          description: "Envoyez le montant exact à l'adresse ci-dessous",
          color: "text-yellow-500",
          badge: <Badge variant="outline" className="border-yellow-500 text-yellow-500">En attente</Badge>
        };
      case 'confirming':
        return {
          icon: <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />,
          title: "Confirmation en cours",
          description: "Votre paiement est en cours de confirmation sur la blockchain",
          color: "text-blue-500",
          badge: <Badge variant="outline" className="border-blue-500 text-blue-500">Confirmation</Badge>
        };
      case 'finished':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          title: "Paiement confirmé !",
          description: "Votre abonnement sera activé sous peu. Vous recevrez un email de confirmation.",
          color: "text-green-500",
          badge: <Badge className="bg-green-500 text-white">Confirmé</Badge>
        };
      case 'failed':
      case 'expired':
        return {
          icon: <AlertCircle className="w-12 h-12 text-red-500" />,
          title: "Paiement échoué",
          description: "Le paiement a échoué ou expiré. Veuillez réessayer.",
          color: "text-red-500",
          badge: <Badge variant="destructive">Échoué</Badge>
        };
      default:
        return {
          icon: <Clock className="w-12 h-12 text-gray-500" />,
          title: "Initialisation...",
          description: "Préparation du paiement",
          color: "text-gray-500",
          badge: <Badge variant="outline">Initialisation</Badge>
        };
    }
  };

  if (!payment) return null;

  const statusConfig = getStatusConfig();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${payment.pay_address}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Paiement Crypto
          </DialogTitle>
          <DialogDescription className="text-center">
            Paiement sécurisé via NOWPayments
          </DialogDescription>
        </DialogHeader>

        {/* Status */}
        <div className="flex flex-col items-center gap-4 py-6">
          {statusConfig.icon}
          {statusConfig.badge}
          <div className="text-center">
            <h3 className={`text-xl font-bold ${statusConfig.color}`}>
              {statusConfig.title}
            </h3>
            <p className="text-muted-foreground mt-2">
              {statusConfig.description}
            </p>
          </div>

          {/* Timer */}
          {status === 'waiting' && timeLeft > 0 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Temps restant</p>
              <p className="text-3xl font-bold text-primary">{formatTime(timeLeft)}</p>
            </div>
          )}
        </div>

        {/* Payment Details */}
        {(status === 'waiting' || status === 'confirming') && (
          <div className="space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-64 h-64"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Montant à envoyer</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">
                  {payment.pay_amount} {payment.pay_currency.toUpperCase()}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(payment.pay_amount.toString(), "Montant")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Address */}
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Adresse de paiement</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-mono break-all flex-1">
                  {payment.pay_address}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(payment.pay_address, "Adresse")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Instructions importantes
              </h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Envoyez <strong>exactement</strong> le montant indiqué</li>
                <li>• Utilisez uniquement le réseau {payment.pay_currency.toUpperCase()}</li>
                <li>• Le paiement expire dans {formatTime(timeLeft)}</li>
                <li>• La confirmation peut prendre quelques minutes</li>
              </ul>
            </div>

            {/* External payment button */}
            {payment.payment_url && (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => window.open(payment.payment_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ouvrir la page de paiement NOWPayments
              </Button>
            )}
          </div>
        )}

        {/* Success Actions */}
        {status === 'finished' && (
          <div className="space-y-4">
            <div className="glass p-4 rounded-lg border border-green-500/20 bg-green-500/10">
              <h4 className="font-semibold text-green-500 mb-2">🎉 Félicitations !</h4>
              <p className="text-sm text-muted-foreground">
                Votre abonnement IPTV sera activé dans les 5 prochaines minutes. 
                Un email de confirmation avec vos identifiants vous sera envoyé à <strong>{order?.email}</strong>.
              </p>
            </div>
            <Button className="w-full" onClick={onClose}>
              Fermer
            </Button>
          </div>
        )}

        {/* Failed Actions */}
        {(status === 'failed' || status === 'expired') && (
          <div className="space-y-4">
            <div className="glass p-4 rounded-lg border border-red-500/20 bg-red-500/10">
              <p className="text-sm text-muted-foreground">
                Besoin d'aide ? Contactez notre support via WhatsApp pour une assistance immédiate.
              </p>
            </div>
            <Button className="w-full" variant="outline" onClick={onClose}>
              Fermer et réessayer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NOWPaymentModal;
