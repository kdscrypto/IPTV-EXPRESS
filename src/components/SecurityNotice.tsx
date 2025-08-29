import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SecurityNotice = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="gradient-text">Sécurité & Confidentialité</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Vos données sont protégées par des standards de sécurité de niveau bancaire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chiffrement */}
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Chiffrement SSL/TLS</CardTitle>
                    <Badge variant="secondary" className="text-xs">256-bit</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Toutes vos données sont chiffrées en transit et au repos avec les protocoles 
                  de sécurité les plus avancés.
                </p>
              </CardContent>
            </Card>

            {/* Conformité RGPD */}
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Conformité RGPD</CardTitle>
                    <Badge variant="secondary" className="text-xs">EU Compliant</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Respect strict du Règlement Général sur la Protection des Données. 
                  Vos informations ne sont jamais partagées avec des tiers.
                </p>
              </CardContent>
            </Card>

            {/* Politique de confidentialité */}
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Transparence</CardTitle>
                    <Badge variant="secondary" className="text-xs">No Tracking</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Aucun tracking publicitaire, aucune revente de données. 
                  Nous collectons uniquement les informations nécessaires au service.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mesures de sécurité additionnelles */}
          <Card className="mt-8 glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Mesures de Protection Avancées
              </CardTitle>
              <CardDescription>
                Notre infrastructure de sécurité multicouche protège vos données 24h/24
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Protection des données</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Chiffrement AES-256 des données sensibles</li>
                    <li>• Authentification à deux facteurs disponible</li>
                    <li>• Sauvegarde automatique et sécurisée</li>
                    <li>• Surveillance en temps réel des accès</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Conformité réglementaire</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Certification ISO 27001 de nos partenaires</li>
                    <li>• Audits de sécurité réguliers</li>
                    <li>• Politique de rétention des données claire</li>
                    <li>• Droit à l'effacement garanti</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact sécurité */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Questions sur la sécurité ? Contactez notre équipe dédiée : 
              <a href="mailto:security@iptv-express.com" className="text-primary hover:underline ml-1">
                security@iptv-express.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityNotice;