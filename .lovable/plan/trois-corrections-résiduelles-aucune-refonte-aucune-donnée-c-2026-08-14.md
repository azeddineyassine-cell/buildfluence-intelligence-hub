# Trois corrections résiduelles (aucune refonte, aucune donnée canonique touchée)

## 1. Dernière occurrence de « Popularité »
- `public/intelligence-politique.html` (radar « Acteurs », axe du haut) : le visuel mesure la présence de l'acteur dans le corpus, pas une popularité. Libellé remplacé par **« Visibilité »**.
- Même libellé dans la maquette React équivalente (`src/pages/ip/IPActeurs.tsx`, tableau `DIMS`) pour éviter une divergence visible.
- Métadonnées de la page acteurs (`src/pages/IntelligencePolitique.tsx`) : « popularité » → « visibilité », « popularity » → « visibility ».
- Vérification finale par recherche globale de `popularit` (FR/EN/AR) sur toutes les interfaces visibles.

## 2. Tonalités Strategic Signals sur tokens globaux
- `strategic-signals.css` ligne 1 : les variables de tonalité deviennent `--ss-positive:var(--tone-pos)`, `--ss-neutral:var(--tone-neu)`, `--ss-negative:var(--tone-neg)` (le bloc de surcharge redondant en fin de fichier est supprimé).
- Séparation des usages **catégoriels** aujourd'hui branchés par erreur sur `--ss-positive` (partis : étoiles, bulles, marqueurs, légende, icône de tableau) : introduction d'un token dédié `--ss-party:#55b96b` conservant exactement la couleur actuelle.
- Sujets (`--ss-topic`), leaders (or) et libellés de quadrants restent inchangés ; seuls les éléments qui codent réellement une tonalité (rayons, étoiles positive/neutral/negative, tonebar, marqueurs et bulles de tonalité, dégradé du plan, tags NÉGATIF/POSITIF) passent aux tokens.

## 3. Nettoyage `opinion-insights.css`
Suppression des seuls sélecteurs sans usage confirmé dans le nouveau markup/JS :
`.oi-synthesis`, `.oi-syn-grid`, `.oi-syn`, `.oi-search`, `.oi-timeline`, `.oi-signals`, `.oi-unavailable`, `.oi-ghost`, `.oi-need`, `.oi-cross`, `.oi-linklist`, `.oi-sr`, ainsi que leurs déclarations dérivées (focus, responsive, RTL).
Tout sélecteur encore référencé est conservé tel quel.

## Vérifications
Playwright FR/EN/AR (RTL), clair/sombre, 1280 et 360 : OPINION identique hors corrections, vert/gris/rouge cohérents sur Opinion, Strategic Signals et Média, aucune régression sur Galaxie décisionnelle, Influence narrative et Orbites, navigation clavier/tactile, console vierge.
