
# Refonte de la PreLanding Page selon le design Stitch

## Analyse comparative

Le design Stitch apporte des changements visuels et structurels importants par rapport à la version actuelle :

| Section | Actuel | Design Stitch |
|---------|--------|---------------|
| Hero | Texte centré, fond abstrait | Layout 2 colonnes : texte gauche + image famille droite |
| Features | Grille 4 colonnes avec icônes | Grille 2x2 avec icônes dans des cartes plus larges |
| Devices | Icônes simples horizontales | 3 cartes avec aperçus visuels (captures d'écran) |
| Reviews | Grille 3 colonnes statique | Slider/carrousel 1 avis à la fois avec flèches |
| CTA Final | Fond gradient subtil | Bannière vert vif avec `bg-primary` dominant |
| Footer | Simple ligne | 2 colonnes : logo+liens + copyright+langue |

## Fichiers à modifier

### 1. `src/components/prelanding/PrelandingHero.tsx`

**Changement majeur** : passer du layout centré au layout 2 colonnes.

- Colonne gauche (texte) :
  - Headline en blanc : "Stop Overpaying for Cable TV." + sous-titre vert : "Get Unlimited Access Today."
  - Sous-texte : "Enjoy 10,000+ Channels, Premium Sports & Movies in Crystal Clear 4K — Starting at Just $9.98/month."
  - Bouton CTA : "Get Started →" avec style vert arrondi
  - Badges en bas : "4K Ultra HD | No Buffering | ✓ Trusted by 50,000+ cord-cutters worldwide"
- Colonne droite (image) :
  - Grande image de famille regardant la TV (utiliser une image Unsplash ou placeholder avec overlay foncé)
  - L'image prend environ 50% de la largeur en desktop, pleine largeur sur mobile (empilé)

Structure HTML approximative :
```
<section className="min-h-screen bg-black grid md:grid-cols-2">
  <div> {/* texte */} </div>
  <div> {/* image avec overlay */} </div>
</section>
```

Pour l'image : utiliser l'image hero existante dans `src/assets/hero-image.jpg` ou un placeholder sombre. L'image doit avoir un overlay gradient sombre à gauche pour fondre avec le texte.

### 2. `src/components/prelanding/FeaturesGrid.tsx`

**Changement** : passer de 4 colonnes à une grille 2x2 avec des cartes plus larges et un layout icon+texte côte à côte.

- Titre centré : "Premium Features"
- Grille `grid-cols-1 md:grid-cols-2` (2x2)
- Chaque carte : icône à gauche dans un carré vert/fond gris, titre + description à droite
- Fond légèrement différent du noir pur (gris très foncé `bg-zinc-900` ou `bg-card`)

Les 4 features restent identiques au contenu actuel (4K/FHD Quality, Anti-Freeze Technology, Multi-Device Support, 24/7 Support).

### 3. `src/components/prelanding/DeviceBanner.tsx`

**Refonte complète** : passer d'icônes simples à 3 cartes visuelles avec captures d'écran.

- Titre centré : "Supported Devices"
- Grille 3 colonnes avec des cartes rectangulaires qui montrent une image de prévisualisation du contenu sur chaque type d'écran
- Légendes en dessous : "Smart TV", "Android/iOS Devices", "Firestick/MAG Box"
- Utiliser des images placeholder sombres avec overlay de contenu IPTV simulé

Pour les images de prévisualisation : utiliser des URLs d'images Unsplash libres de droits montrant des interfaces TV/streaming (ex: TV avec interface media, tablette, télécommande firestick).

### 4. `src/components/prelanding/ReviewsSection.tsx`

**Refonte majeure** : passer de la grille 3 colonnes au slider/carrousel avec 1 avis affiché à la fois.

- Titre centré : "What Our Customers Say"
- Un seul avis visible : guillemets vert + photo de profil (avatar avec initiale ou image) + étoiles jaunes + texte + nom + lieu
- Flèches gauche/droite pour naviguer entre les avis
- State React `currentIndex` + fonctions `prev()` / `next()`
- Design de la carte : fond gris foncé, guillemets vert vif en haut à gauche, photo de profil circulaire

### 5. `src/components/prelanding/FinalCTA.tsx`

**Changement** : la section CTA doit avoir un fond vert vif dominant (pas juste un accent).

- Container avec `bg-primary/90` ou dégradé vert
- Titre blanc : "Ready to Cut the Cable?"
- Sous-titre blanc/semi-transparent
- Bouton blanc avec texte vert : "Get Your Free Trial Now"
- Note de garantie en blanc semi-transparent en bas

### 6. `src/components/prelanding/PrelandingFooter.tsx`

**Amélioration** : ajouter des liens de navigation dans le footer.

- Logo à gauche
- Liens centraux : Features | Reviews | FAQ | EN (sélecteur langue)
- Copyright à droite
- Liens Terms of Service | Privacy Policy à gauche en bas

### 7. `src/components/prelanding/StickyNavbar.tsx`

**Ajout** : lien "Devices" dans la navbar (actuellement il manque par rapport au design Stitch).

- Ajouter `scrollToSection("devices")` bouton dans la navbar desktop et mobile

### 8. `src/components/prelanding/DeviceBanner.tsx`

Ajouter `id="devices"` à la section pour que le lien navbar fonctionne.

## Image Hero

L'image de famille regardant la TV dans le design Stitch est la différence visuelle la plus impactante. Pour l'implémenter :
- Utiliser `src/assets/hero-image.jpg` déjà présente dans le projet
- Si l'image actuelle n'est pas adaptée, utiliser une image Unsplash en URL directe représentant une famille regardant la TV dans un salon confortable
- Appliquer un gradient overlay `from-black via-black/70 to-transparent` de gauche à droite pour fondre l'image avec le texte

## Ordre des sections (identique au design Stitch)

```
StickyNavbar (fixe)
PrelandingHero (texte gauche + image droite)
FeaturesGrid (grille 2x2)
DeviceBanner (3 cartes visuelles)
ReviewsSection (slider 1 avis)
PrelandingFAQ (accordéon - inchangé)
FinalCTA (fond vert vif)
PrelandingFooter (2 colonnes)
```

Note : La section `ComparisonSection` disparaît du design Stitch — elle sera supprimée de `PreLanding.tsx`.

## Résumé des changements

| Fichier | Type de changement |
|---------|-------------------|
| `src/pages/PreLanding.tsx` | Retirer `ComparisonSection` |
| `src/components/prelanding/PrelandingHero.tsx` | Refonte layout 2 colonnes + image |
| `src/components/prelanding/FeaturesGrid.tsx` | Grille 2x2 avec cards icon+texte côte à côte |
| `src/components/prelanding/DeviceBanner.tsx` | 3 cartes visuelles + id="devices" |
| `src/components/prelanding/ReviewsSection.tsx` | Slider carrousel 1 avis à la fois |
| `src/components/prelanding/FinalCTA.tsx` | Fond vert vif dominant |
| `src/components/prelanding/PrelandingFooter.tsx` | Footer 2 colonnes avec nav |
| `src/components/prelanding/StickyNavbar.tsx` | Ajouter lien "Devices" |
