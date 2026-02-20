
# Restauration du fond dynamique TMDB dans le HeroSection

## Problème identifié

Lors de la refonte Stitch, le composant `DynamicBackground` (qui affiche les affiches de films/séries/sports récents provenant de l'API TMDB) a été entièrement supprimé du `HeroSection.tsx` et remplacé par une image fixe `hero-image.jpg`.

La capture d'écran de référence montre clairement que le fond doit afficher les affiches de contenus TMDB qui défilent automatiquement (films, séries, sport) — visibles comme un "mur de posters" côté droit du hero.

## Solution

Réintégrer `DynamicBackground` dans `HeroSection.tsx` en l'adaptant au nouveau design Stitch : le fond dynamique des affiches remplace l'image fixe, avec le texte et le CTA positionnés côté gauche par-dessus.

## Fichier à modifier : `src/components/HeroSection.tsx`

### Changements

1. **Supprimer** l'import et l'usage de `heroImage` (image fixe)
2. **Importer** `DynamicBackground`
3. **Remplacer** le `<img>` statique et ses overlays par `<DynamicBackground />`
4. **Adapter** les overlays : le `DynamicBackground` gère déjà ses propres gradients, mais on ajoutera un overlay supplémentaire `from-black via-black/70 to-transparent` de gauche à droite pour garantir la lisibilité du texte côté gauche, en cohérence avec le nouveau design

### Résultat attendu

```text
HeroSection (min-h-screen)
├── [Couche 0] DynamicBackground — affiches TMDB qui défilent (opacity 30%)
│                                  + gradients intégrés
├── [Couche 1] Overlay noir gauche → transparent (lisibilité texte)
└── [Couche 2] Contenu texte (z-10)
    ├── Badge "Premium IPTV Service"
    ├── Titre "IPTV Express"
    ├── Sous-titre "Access over 15,000 Channels..."
    ├── Bouton CTA "Get Started Now"
    └── Trust badges (4K | No Buffering | 50,000+)
```

Le fond animé TMDB sera visible à droite du hero (là où les gradients sont moins opaques), créant l'effet "mur de posters" visible dans votre capture de référence.

## Résumé

| Fichier | Action |
|---------|--------|
| `src/components/HeroSection.tsx` | Remplacer image fixe par `DynamicBackground` + ajuster overlay gauche |

Aucune autre modification nécessaire — `DynamicBackground.tsx` et `useMediaContent.ts` sont intacts et fonctionnels.
