
# Ajout du choix de stablecoin pour les paiements crypto

## Problème identifié

Actuellement, dans `supabase/functions/create-payment/index.ts`, la devise de paiement est codée en dur :
```typescript
pay_currency: 'btc', // Default to BTC, user can change on payment page
```
L'utilisateur n'a **aucun moyen** de choisir une autre devise avant de lancer le paiement. La modal `NOWPaymentModal` affiche simplement l'adresse BTC générée.

## Solution

Ajouter un **sélecteur de crypto-devise** dans `ActivationForm.tsx`, visible uniquement quand le mode "crypto" est sélectionné. L'utilisateur choisit sa devise **avant** de soumettre le formulaire. Cette devise est ensuite transmise à l'edge function qui la passe à NOWPayments.

## Devises proposées

| Devise | Symbole | Type |
|--------|---------|------|
| Bitcoin | BTC | Crypto volatile |
| USDT (TRC20) | USDTTRC20 | Stablecoin |
| USDT (ERC20) | USDTE | Stablecoin |
| USDC | USDC | Stablecoin |
| LTC | LTC | Crypto alternatif |

Les stablecoins (USDT, USDC) sont particulièrement utiles car leur valeur est indexée sur le dollar, évitant les fluctuations de cours entre le moment du choix et le paiement.

## Flux utilisateur

```text
ActivationForm → Choisit "Paiement Crypto"
  → Sélecteur de devise apparaît (BTC / USDT TRC20 / USDT ERC20 / USDC / LTC)
    → Soumet le formulaire avec la devise choisie
      → Edge function crée le paiement NOWPayments avec la bonne devise
        → NOWPaymentModal affiche l'adresse correcte pour la devise choisie
```

## Fichiers à modifier

### 1. `src/components/ActivationForm.tsx`

Ajouter un state `selectedCrypto` (défaut: `'btc'`) et un sélecteur visuel avec des badges/boutons pour chaque devise, affiché uniquement quand `paymentMethod === 'crypto'`.

```typescript
const [selectedCrypto, setSelectedCrypto] = useState<string>('btc');

const cryptoOptions = [
  { value: 'btc', label: 'Bitcoin', symbol: 'BTC', icon: '₿', type: 'volatile' },
  { value: 'usdttrc20', label: 'USDT (TRC20)', symbol: 'USDT', icon: '₮', type: 'stable' },
  { value: 'usdte', label: 'USDT (ERC20)', symbol: 'USDT', icon: '₮', type: 'stable' },
  { value: 'usdc', label: 'USD Coin', symbol: 'USDC', icon: '$', type: 'stable' },
  { value: 'ltc', label: 'Litecoin', symbol: 'LTC', icon: 'Ł', type: 'volatile' },
];
```

Le sélecteur se présentera sous forme de grille de boutons avec :
- Nom et symbole de la devise
- Badge "Stablecoin" en vert pour USDT et USDC (prix fixe en USD)
- Badge "Crypto" en orange pour BTC et LTC
- Mise en évidence visuelle de la devise sélectionnée

La devise est passée dans l'appel à l'edge function :
```typescript
body: {
  ...
  payCurrency: selectedCrypto,  // nouveau champ
}
```

### 2. `supabase/functions/create-payment/index.ts`

- Ajouter `payCurrency` à l'interface `PaymentRequest`
- Valider que la devise est dans la liste des devises acceptées
- Remplacer `pay_currency: 'btc'` par `pay_currency: payCurrency`

```typescript
interface PaymentRequest {
  ...
  payCurrency?: string;
}

const validCurrencies = ['btc', 'usdttrc20', 'usdte', 'usdc', 'ltc'];
const payCurrency = requestBody.payCurrency && validCurrencies.includes(requestBody.payCurrency.toLowerCase())
  ? requestBody.payCurrency.toLowerCase()
  : 'btc'; // fallback BTC si invalide
```

### 3. `src/i18n/translations/en.ts` et `fr.ts`

Ajouter les clés de traduction pour le sélecteur de devise :
```typescript
cryptoSelector: "Select your payment currency",
stablecoin: "Stablecoin",
stablecoinNote: "Fixed price — no exchange rate risk",
```

## Interface du sélecteur (aperçu)

```text
┌─────────────────────────────────────────────────────────┐
│  Select your payment currency                            │
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  ₿ BTC   │  │  ₮ USDT     │  │  ₮ USDT      │     │
│  │  Bitcoin │  │  TRC20      │  │  ERC20       │     │
│  │  [Crypto]│  │ [Stablecoin]│  │ [Stablecoin] │     │
│  └──────────┘  └──────────────┘  └──────────────┘     │
│                                                         │
│  ┌──────────┐  ┌──────────┐                            │
│  │  $ USDC  │  │  Ł LTC   │                            │
│  │  USD Coin│  │ Litecoin │                            │
│  │[Stablecoin] │  [Crypto]│                            │
│  └──────────┘  └──────────┘                            │
│                                                         │
│  ℹ️ Stablecoins are pegged to the USD — no price       │
│     fluctuation risk between selection and payment.    │
└─────────────────────────────────────────────────────────┘
```

## Résumé des fichiers

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/components/ActivationForm.tsx` | Modifier | Ajouter sélecteur de devise crypto |
| `supabase/functions/create-payment/index.ts` | Modifier | Accepter et utiliser `payCurrency` |
| `src/i18n/translations/en.ts` | Modifier | Ajouter clés pour sélecteur de devise |
| `src/i18n/translations/fr.ts` | Modifier | Ajouter clés en français |

## Notes techniques

- L'edge function est re-déployée après modification
- Le fallback `btc` garantit la compatibilité si la devise n'est pas fournie
- Les codes devise NOWPayments sont sensibles à la casse (minuscules) — validation côté serveur incluse
- Aucune migration de base de données nécessaire (la colonne `pay_currency` existe déjà dans `orders`)
