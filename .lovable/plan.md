
# Page dédiée au formulaire d'activation (Checkout)

## Problème identifié

Actuellement dans `src/pages/Index.tsx`, le clic sur "Choisir ce plan" :
1. Appelle `setSelectedPlan()` pour stocker le plan
2. Tente de scroller vers `#activation` — mais cette section n'est montée dans le DOM qu'**après** le `setState`, donc le scroll échoue
3. Affiche un simple toast "Plan sélectionné" qui ne guide pas l'utilisateur

Le formulaire `ActivationForm` est monté conditionnellement avec `{selectedPlan && <ActivationForm />}`, rendant la navigation impossible.

## Solution : Page `/checkout` dédiée

Créer une page autonome `/checkout` qui affiche exclusivement le formulaire d'activation. Quand le visiteur clique sur "Choisir ce plan", il est **navigué vers cette nouvelle page** avec les informations du plan passées via le `state` de React Router (pas de query params visibles dans l'URL).

## Flux utilisateur

```text
Page /home#pricing
  → Visiteur clique "Choisir ce plan"
    → navigate('/checkout', { state: { planId, planName, price } })
      → Page /checkout s'affiche avec formulaire pré-rempli
        → Formulaire soumis → Modal de paiement (NOWPayments)
          → Bouton "Retour aux plans" pour revenir à /home#pricing
```

## Fichiers à créer

### `src/pages/Checkout.tsx` (nouvelle page)

Page dédiée avec :
- Header minimaliste avec logo "IPTV EXPRESS" et bouton retour
- Résumé du plan sélectionné (nom, durée, prix) en haut de page, bien visible
- Formulaire `ActivationForm` en dessous
- Si aucun plan n'est passé via le state (accès direct à `/checkout`), redirection automatique vers `/home#pricing`
- Fond sombre cohérent avec le reste du site

### Structure de la page Checkout :
```text
┌─────────────────────────────────────────────┐
│  ← Retour aux plans         IPTV EXPRESS    │
├─────────────────────────────────────────────┤
│                                             │
│  📦 Plan sélectionné                        │
│  ┌─────────────────────────────────────┐   │
│  │ Premium (12 mois)        $60        │   │
│  │ ✓ 15,000+ chaînes live              │   │
│  │ ✓ 4K Ultra HD...                    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  📝 Formulaire d'activation                 │
│  [Email] [Confirm Email] [Device] [Submit]  │
│                                             │
└─────────────────────────────────────────────┘
```

## Fichiers à modifier

### `src/App.tsx`
Ajouter la nouvelle route `/checkout` :
```typescript
import Checkout from "./pages/Checkout";
// ...
<Route path="/checkout" element={<Checkout />} />
```

### `src/pages/Index.tsx`
Modifier `handleSelectPlan` pour naviguer vers `/checkout` au lieu de scroller :
```typescript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleSelectPlan = (planId: string, price: number) => {
  navigate('/checkout', {
    state: {
      planId,
      planName: getPlanName(planId),
      price
    }
  });
};
```
Supprimer le toast "Plan sélectionné" et la logique de scroll obsolète.
Retirer `{selectedPlan && <ActivationForm />}` du JSX (le formulaire vit maintenant dans sa propre page).
Retirer les states `selectedPlan`, `nowPayment` et `cryptoModal` de `Index.tsx` (ils migrent vers `Checkout.tsx`).

### `src/components/ActivationForm.tsx`
Légère modification : ajouter un prop optionnel `onNavigateBack` pour le bouton "Changer de plan", qui navigue vers `/home#pricing` au lieu de tenter un scroll interne. Toute la logique de paiement reste dans le composant.

## Détails techniques

### Passage du plan via React Router state
```typescript
// Dans Index.tsx - navigation
navigate('/checkout', {
  state: { planId: '12months', planName: 'Premium (12 mois)', price: 60 }
});

// Dans Checkout.tsx - lecture
import { useLocation, useNavigate } from 'react-router-dom';
const location = useLocation();
const selectedPlan = location.state as { planId: string; planName: string; price: number } | null;

// Redirection si accès direct sans plan
useEffect(() => {
  if (!selectedPlan) navigate('/home#pricing', { replace: true });
}, []);
```

### Gestion du NOWPaymentModal
Le state `nowPayment` et le composant `<NOWPaymentModal>` seront déplacés dans `Checkout.tsx`, puisque c'est là que le paiement est initié.

### Traductions
Les textes de la page Checkout utilisent les clés déjà existantes dans `src/i18n/translations/en.ts` et `fr.ts` (section `main.activation.*`) — aucune nouvelle clé nécessaire.

## Résumé des fichiers

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/pages/Checkout.tsx` | Créer | Nouvelle page dédiée au checkout |
| `src/App.tsx` | Modifier | Ajouter route `/checkout` |
| `src/pages/Index.tsx` | Modifier | Remplacer scroll par `navigate('/checkout')`, nettoyer les states obsolètes |
| `src/components/ActivationForm.tsx` | Modifier mineure | Adapter le bouton "Changer de plan" pour naviguer vers `/home#pricing` |

## Avantages de cette approche

- UX claire : le visiteur voit immédiatement le formulaire sur une page dédiée
- URL partageable (`/checkout`) même si le state est perdu à l'actualisation (redirection automatique)
- Séparation des responsabilités : `Index.tsx` affiche le catalogue, `Checkout.tsx` gère le paiement
- Compatible avec le système i18n existant (aucune clé à ajouter)
- Compatible mobile : pas de problème de scroll sur petits écrans
