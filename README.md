# 🎬 IPTV Premium - Application Web de Streaming

Une application web moderne et responsive pour vendre des abonnements IPTV avec paiements Stripe et cryptomonnaies.

## ✨ Fonctionnalités

### 🎯 Interface Utilisateur
- **Hero Section** - Design impactant avec CTA puissant
- **Section Fonctionnalités** - 15,000+ chaînes, 80,000 VOD, qualité 4K
- **Pricing Cards** - 3 formules (3 mois: 25€, 6 mois: 30€, 12 mois: 45€)
- **Formulaire d'Activation** - Collecte email et informations appareil
- **FAQ Interactive** - Réponses aux questions fréquentes
- **Contact** - Formulaire de contact et informations support
- **Footer Complet** - Liens légaux et informations entreprise

### 💳 Système de Paiement
- **Stripe Checkout** - Paiements sécurisés par carte (à configurer)
- **Paiements Crypto** - Bitcoin, Ethereum, USDT avec QR codes
- **Fallback Automatique** - Crypto proposé si Stripe indisponible

### 🎨 Design & UX
- **Thème Dark Moderne** - Couleurs bleu/violet avec gradients
- **Glass Morphism** - Effets de transparence et flou
- **Animations Fluides** - Transitions et effets visuels
- **Responsive Design** - Optimisé mobile, tablette, desktop
- **Typographie Inter** - Police moderne et lisible

### ♿ Accessibilité & SEO
- **Contrastes Optimisés** - Respecte les standards WCAG
- **Navigation Clavier** - Focus visible sur tous les éléments
- **Meta Tags Complets** - Titre, description, Open Graph
- **JSON-LD Schema** - Données structurées pour les moteurs de recherche
- **Aria Labels** - Labels d'accessibilité sur les actions

## 🚀 Technologies

- **React 18** - Framework frontend moderne
- **TypeScript** - Typage statique pour la robustesse
- **Tailwind CSS** - Framework CSS utilitaire
- **Shadcn/ui** - Composants UI prêts à l'emploi
- **Lucide React** - Icônes modernes et consistantes
- **Vite** - Build tool ultra-rapide

## 🛠️ Installation

```bash
# Cloner le repository
git clone <url-du-repo>

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## ⚙️ Configuration

### Variables à Personnaliser

Dans `src/pages/Index.tsx` :
```javascript
// Prix et plans
const plans = {
  '3months': { price: 25, name: 'Découverte' },
  '6months': { price: 30, name: 'Populaire' },
  '12months': { price: 45, name: 'Premium' }
};
```

Dans `src/components/CryptoModal.tsx` :
```javascript
// Adresses cryptomonnaies (à remplacer par vos adresses)
const cryptoAddresses = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x742d35Cc6634C0532925a3b8D4c2D5E2E8b74E3F",
  USDT: "0x742d35Cc6634C0532925a3b8D4c2D5E2E8b74E3F"
};
```

Dans `src/components/Footer.tsx` et `ContactSection.tsx` :
```javascript
// Informations de contact
const contactInfo = {
  email: "support@iptv-premium.com",
  phone: "+33 1 XX XX XX XX", 
  address: "123 Avenue de la République, 75011 Paris"
};
```

## 🔐 Configuration Stripe

### 1. Backend Edge Function

Créer une edge function `create-payment` :

```typescript
// supabase/functions/create-payment/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planId, price, planName } = await req.json();
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: `Abonnement IPTV ${planName}` },
          unit_amount: price, // Prix en centimes
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#pricing`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

### 2. Variables d'Environnement

Ajouter dans les secrets Supabase :
- `STRIPE_SECRET_KEY` - Clé secrète Stripe
- `STRIPE_PUBLISHABLE_KEY` - Clé publique Stripe (optionnel)

### 3. Webhook (Optionnel)

Pour traiter les paiements confirmés :

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "");
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Traiter le paiement confirmé
      // Envoyer email d'activation, etc.
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
```

## 🌐 Déploiement

### Frontend (Netlify/Vercel)
```bash
# Build de production
npm run build

# Déployer le dossier dist/
```

### Backend (Supabase Edge Functions)
```bash
# Installer Supabase CLI
npm install -g supabase

# Login et déploiement
supabase login
supabase functions deploy create-payment
supabase functions deploy stripe-webhook
```

## 🔧 Personnalisation

### Design System
Modifier les couleurs dans `src/index.css` :
```css
:root {
  --primary: 262 83% 58%; /* Couleur principale */
  --secondary: 240 10% 8%; /* Couleur secondaire */
  /* Ajuster les gradients et animations */
}
```

### Contenus
- Remplacer les textes dans chaque composant
- Ajouter/modifier les questions FAQ
- Personaliser les fonctionnalités listées
- Adapter les informations de contact

### Images
Générer de nouvelles images avec l'outil intégré ou remplacer `src/assets/hero-image.jpg`

## 📝 TODO Production

- [ ] Configurer les vraies clés Stripe
- [ ] Remplacer les adresses crypto par les vraies
- [ ] Mettre à jour les informations de contact
- [ ] Tester les paiements en mode test
- [ ] Configurer le webhook Stripe
- [ ] Ajouter Google Analytics
- [ ] Optimiser les images (WebP)
- [ ] Configurer un CDN
- [ ] Tests d'accessibilité complets

## 📄 Licences

- Code source : MIT
- Design : Propriétaire
- Images : Générées par IA (usage commercial autorisé)

## 🆘 Support

Pour toute question technique :
- Email : dev@iptv-premium.com
- Documentation : [docs.iptv-premium.com](https://docs.iptv-premium.com)

---

**Application IPTV Premium** - Une solution complète et moderne pour la vente d'abonnements IPTV 🚀