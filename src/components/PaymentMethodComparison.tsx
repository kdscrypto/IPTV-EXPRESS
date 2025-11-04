import { Card } from "@/components/ui/card";
import { Wallet, MessageSquare, CheckCircle, Clock } from "lucide-react";

const PaymentMethodComparison = () => {
  return (
    <div className="mt-8 glass p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-center">
        Pourquoi choisir le paiement crypto ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass p-4 border-primary/30">
          <div className="flex items-start gap-3">
            <Wallet className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Paiement Crypto</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Activation automatique instantanée</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>300+ cryptomonnaies acceptées</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Paiement sécurisé et anonyme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Aucune attente, disponible 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="glass p-4 border-border">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">WhatsApp Support</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>Traitement manuel (quelques heures)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>Contact direct avec le support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>Autres méthodes de paiement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>Assistance personnalisée</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethodComparison;
