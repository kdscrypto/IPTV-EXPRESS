
# Refonte de la page /home selon le design Stitch

## Analyse comparative du design Stitch vs. l'état actuel

En examinant l'image de référence Stitch et le code actuel, voici les différences identifiées section par section :

| Section | Actuel | Design Stitch |
|---------|--------|---------------|
| Navbar | Absente sur /home | Navbar fixe avec logo, liens (Home, About, Community, Supports, Contact), boutons Log in + Sign up vert |
| Hero | Fond abstrait avec texte + DynamicBackground | Plein écran avec image de fond (famille sur canapé + TV), titre "IPTV Express" en vert/blanc, sous-titre, CTA "Get Started Now" |
| Features | 8 features en grille 4 colonnes avec cartes glass | 8 features en grille 4×2 avec icônes vert et fond foncé, titre centré "Premium Features" |
| Pricing | 4 cartes en grille 3 colonnes (1month ne s'affiche pas) | 4 cartes en grille 4 colonnes compactes, "MOST POPULAR" badge, prix barrés, fond sombre cohérent |
| Testimonials | Grille 3 colonnes statique | 2 colonnes : colonne gauche = 2 avis empilés, colonne droite = FAQ accordion |
| Contact | Grand formulaire 3 colonnes | 2 colonnes : gauche = 3 méthodes (Live Chat, Email, Phone), droite = formulaire compact |
| Footer | Très détaillé, 4 colonnes | Minimaliste : logo + icônes paiement à droite, liens légaux + réseaux sociaux en bas |

## Fichiers à modifier

### 1. Nouveau composant : `src/components/HomeNavbar.tsx` (à créer)

Navbar fixe en haut de la page `/home` (absente actuellement) avec :
- Logo "IPTV Express" avec icône verte à gauche
- Liens de navigation centraux : Home | About | Community | Supports | Contact (liens de scroll internes)
- À droite : bouton "Log in" (outline) + bouton "Sign up" (vert arrondi, pointe vers `#pricing`)
- Fond `bg-black/90 backdrop-blur` fixe
- Version mobile : hamburger menu

### 2. `src/components/HeroSection.tsx`

Refonte complète du Hero :
- Section plein écran (`min-h-screen`) avec image de fond sombre (famille + TV)
- Utiliser l'image `src/assets/hero-image.jpg` déjà présente en fond full-bleed
- Overlay gradient sombre `from-black/80 via-black/50 to-transparent`
- Contenu aligné à gauche dans la partie inférieure-gauche :
  - Logo/titre "IPTV Express" grand, avec l'icône play en vert
  - Sous-titre : "Access over 15,000 Channels and 80,000 VOD in 4K quality. Compatible with all your favorite devices."
  - Bouton CTA vert arrondi "Get Started Now" scrollant vers `#pricing`
- Supprimer `DynamicBackground`, les éléments flottants et le `DemoModal`

### 3. `src/components/FeaturesSection.tsx`

Adapter au design Stitch :
- Titre "Premium Features" centré simple (sans sous-titre verbeux)
- Grille `grid-cols-2 md:grid-cols-4` pour afficher 8 icônes en 2 rangées × 4 colonnes
- Chaque carte : fond `bg-zinc-900/80` avec bordure subtile, icône vert dans carré centré en haut, titre en dessous, sans description verbose
- Les 8 features actuelles sont parfaites pour le design (15,000+ Channels, 80,000+ VOD, 4K/HD, Multi-language, All Devices, Secure Connection, 24/7 Support, Multi-connections)

### 4. `src/components/PricingSection.tsx`

Refonte vers 4 colonnes :
- Titre "Our Plans" centré
- Grille `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (4 plans côte à côte)
- Cartes plus compactes et dépouillées :
  - Nom du plan en titre
  - Prix barré + prix actuel en gros vert
  - 3 lignes de features avec ✓ (plus concis que 10 items)
  - Bouton "Choose this plan" vert
  - Carte "Popular" avec badge "MOST POPULAR" et bordure verte accentuée
- Fond de section dark cohérent

### 5. `src/components/TestimonialsSection.tsx` + `src/components/FAQSection.tsx`

Selon le design Stitch, ces deux sections sont présentées **côte à côte** en 2 colonnes :
- Colonne gauche : "Customer Testimonials" avec 2 avis empilés (cartes avec ★★★★★, texte, avatar circulaire, nom + "Verified Purchase")
- Colonne droite : "Frequently Asked Questions" avec accordion

Deux options :
- **Option A** : Modifier `Index.tsx` pour les rendre côte à côte dans un wrapper grid
- **Option B** : Fusionner les deux dans un nouveau composant `TestimonialsAndFAQ.tsx`

Choix retenu : **Option A** — wrapper dans `Index.tsx` avec `grid-cols-1 lg:grid-cols-2`, plus simple et non-destructif.

Il faudra aussi adapter `TestimonialsSection` pour ne montrer que 2 avis en format compact (avec avatar initiale cercle vert + badge "Verified Purchase"), et `FAQSection` pour retirer le CTA "Another Question" en bas.

### 6. `src/components/ContactSection.tsx`

Simplifier selon le design Stitch :
- Titre "Contact Our Team" centré
- 2 colonnes :
  - Gauche : 3 blocs (Live Chat / Email / Phone) avec icône vert, titre, sous-titre
  - Droite : formulaire compact avec 4 champs (Full name, Email, Subject, Message) + bouton "Send message" vert pleine largeur

### 7. `src/components/Footer.tsx`

Simplifier radicalement selon le design Stitch :
- Ligne supérieure : logo "Footer" (ou IPTV Express) à gauche + icônes paiement (Visa, Mastercard, Maestro, Amex) à droite
- Ligne inférieure : liens (Legal | Sitemap | Terms | Blog | Contact) à gauche + icônes réseaux sociaux (Facebook, Twitter, YouTube, Instagram) à droite
- Fond `bg-black` ou très sombre, sans le bloc disclaimer complexe

### 8. `src/pages/Index.tsx`

- Importer et ajouter `<HomeNavbar />` au-dessus du `<main>`
- Wrapper `TestimonialsSection` + `FAQSection` dans une `div` avec `className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto px-6"`
- Garder la logique de navigation vers `/checkout` intacte

## Ordre des sections final (conforme au design Stitch)

```text
HomeNavbar (fixe, nouvelle)
  ↓
HeroSection (image plein écran + titre + CTA)
  ↓
FeaturesSection (grille 8 features 4×2)
  ↓
PricingSection (4 colonnes)
  ↓
[grid-cols-2] TestimonialsSection | FAQSection
  ↓
ContactSection (simplifié 2 colonnes)
  ↓
Footer (minimaliste)
```

## Résumé des fichiers

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/components/HomeNavbar.tsx` | Créer | Navbar fixe avec logo, navigation, Log in + Sign up |
| `src/components/HeroSection.tsx` | Refonte | Image plein écran, titre IPTV Express, CTA |
| `src/components/FeaturesSection.tsx` | Adapter | Grille 4×2 compacte avec icônes vert |
| `src/components/PricingSection.tsx` | Adapter | 4 colonnes, badges, cartes compactes |
| `src/components/TestimonialsSection.tsx` | Simplifier | 2 avis empilés avec avatars + badges |
| `src/components/FAQSection.tsx` | Simplifier | Retirer CTA "Another Question" |
| `src/components/ContactSection.tsx` | Simplifier | 2 colonnes : méthodes + formulaire compact |
| `src/components/Footer.tsx` | Refonte | Footer minimaliste avec paiements + réseaux sociaux |
| `src/pages/Index.tsx` | Modifier | Ajouter navbar, wrapper grid pour Testimonials+FAQ |

## Notes techniques

- L'image `src/assets/hero-image.jpg` existante sera utilisée comme fond du Hero
- La logique `navigate('/checkout', { state })` dans `Index.tsx` reste intacte
- Les traductions `en.ts` et `fr.ts` existantes sont suffisantes — aucune nouvelle clé requise
- Le `DemoModal` et `DynamicBackground` seront retirés du Hero (non présents dans le design Stitch)
- Le padding-top du Hero sera ajusté pour compenser la navbar fixe (`pt-16` ou `pt-20`)
