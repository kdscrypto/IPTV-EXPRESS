import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PaymentSuccessNotificationProps {
  order: {
    plan_name: string;
    email: string;
  };
}

const PaymentSuccessNotification = ({ order }: PaymentSuccessNotificationProps) => {
  return (
    <Card className="glass border-green-500/50 bg-green-500/10 p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-500/20 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-500 mb-2">
            Paiement confirmé !
          </h3>
          <p className="text-muted-foreground mb-4">
            Votre abonnement <strong>{order.plan_name}</strong> a été activé avec succès.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Email de confirmation envoyé à <strong>{order.email}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Vos identifiants de connexion vous seront envoyés sous 5 minutes</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Support disponible 24/7 via WhatsApp</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentSuccessNotification;
