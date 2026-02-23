

# Integration des Native Banners Adsterra

## Objectif
Integrer des publicites Native Banner d'Adsterra sur le site de maniere non intrusive, en preservant le design dark/streaming existant et sans impacter les fonctionnalites (formulaire contact, checkout, navigation, animation TMDB).

## Composant a creer

### `src/components/ads/AdsterraNativeBanner.tsx`
Composant reutilisable et isole qui :
- Accepte une prop `atOptions` (objet de configuration Adsterra : `key`, `format`, `height`, `width`, `params`)
- Utilise `useEffect` pour injecter dynamiquement le script Adsterra (`createElement('script')`) dans un conteneur `ref`
- Nettoie le script au demontage (cleanup dans `useEffect`) pour eviter les fuites memoire
- Affiche un conteneur avec `min-height` pour eviter le layout shift pendant le chargement
- S'integre visuellement au theme sombre : fond `bg-zinc-950`, bordures `border-zinc-800/50`, coins arrondis
- Ajoute un petit label discret "Sponsored" en haut pour la transparence

### Points techniques importants
- Le script Adsterra sera charge via `document.createElement('script')` et non via `dangerouslySetInnerHTML` (plus propre et plus facile a nettoyer)
- Le composant sera enveloppe dans un `div` responsive : pleine largeur sur mobile, `max-w-4xl` centre sur desktop
- Un `try/catch` protege l'injection du script pour eviter qu'un echec publicitaire ne casse le site

## Emplacements dans `src/pages/Index.tsx`

Deux emplacements strategiques, places entre les sections de contenu :

```text
HomeNavbar
HeroSection
FeaturesSection
>>> Native Banner #1 <<<
PricingSection
Testimonials + FAQ
>>> Native Banner #2 <<<
ContactSection
Footer
```

**Pourquoi ces emplacements :**
- **Entre Features et Pricing** : l'utilisateur a vu les fonctionnalites, la pub se place naturellement avant la decision d'achat, sans interrompre le flux de conversion
- **Entre FAQ et Contact** : zone de "respiration" apres les informations, avant le formulaire de contact

**Emplacements evites volontairement :**
- Pas sur le HeroSection (ne pas masquer l'animation TMDB)
- Pas dans/autour du PricingSection (ne pas distraire pendant la conversion)
- Pas sur la page `/checkout` (ne pas perturber le paiement)
- Pas sur la page `/prelanding` (page d'acquisition, doit rester epuree)

## Pages exclues
- `/checkout` : page de paiement, aucune pub
- `/prelanding` : page d'acquisition, aucune pub
- `/admin` : dashboard admin, aucune pub

Les pubs ne seront ajoutees que dans `Index.tsx` (page `/home`).

## Configuration Adsterra

Le composant utilisera des valeurs placeholder pour `atOptions.key`. L'utilisateur devra :
1. Se connecter au dashboard Adsterra
2. Creer un placement "Native Banner"
3. Recuperer la cle (`key`) fournie
4. Remplacer les valeurs placeholder dans le code

## Impact sur les fonctionnalites existantes

| Fonctionnalite | Impact |
|---|---|
| Animation TMDB (HeroSection) | Aucun -- pub placee apres FeaturesSection |
| Formulaire de contact | Aucun -- pub placee avant ContactSection, pas a l'interieur |
| Checkout / paiement | Aucun -- pas de pub sur `/checkout` |
| Navigation (HomeNavbar) | Aucun -- navbar fixe non modifiee |
| SEO (JSON-LD) | Aucun -- structured data non modifie |
| Prelanding | Aucun -- pas de pub sur `/prelanding` |
| Performance | Minimal -- scripts charges en `async`, cleanup au demontage |

## Fichiers modifies

| Fichier | Action |
|---|---|
| `src/components/ads/AdsterraNativeBanner.tsx` | Creer -- composant reutilisable |
| `src/pages/Index.tsx` | Modifier -- ajouter 2 emplacements de Native Banner entre les sections |

