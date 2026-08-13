# Ajustements ciblés — Strategic Signals (Influence narrative & Orbites)

Périmètre strict : `public/intelligence-politique/strategic-signals.js` et `strategic-signals.css` (bundle statique de la plateforme). Aucun autre onglet, aucune donnée canonique, aucun backend.

## Reformulation de chaque demande

1. **Pictogrammes de catégorie** — remplacer carré / cercle / losange / barre par des pictogrammes institutionnels : `Landmark` (parti), `UserRound` (leader), `MessagesSquare` (sujet), et pour les trois tonalités un pictogramme neutre cohérent (`Gauge`) puisque la demande ne les couvre pas. Présents dans la matrice, la légende, les tooltips et le tableau.
2. **Palette des quadrants** — Sous tension `#E06D4F` ; Risques latents orange dérivé corail/or `#C8823F` ; Signaux émergents vert pâle `#8FBF8A` ; Porteurs vert soutenu `#4E9A5F`. Application retenue : titre de quadrant, liseré interne, texture de fond très faible opacité — pas de remplissage plein.
3. **Axes** — axe X `BALANCE NARRATIVE` avec graduations −100 / 0 / +100 (extrémité gauche teintée corail, droite verte) ; axe Y `VISIBILITÉ RELATIVE` avec 0 en bas, 100 en haut et graduations intermédiaires discrètes (25 / 50 / 75). Positionnement strictement exact, aucun anticollision : la lisibilité des chevauchements passe par survol / focus / sélection et mise au premier plan.
4. **Tableau Classement** — tris conservés (visibilité, balance, URL uniques) + nouveau filtre d'affichage `Tous / Partis / Leaders / Sujets`. Clic sur une ligne → fiche détaillée (panneau) avec uniquement les données disponibles : nom, catégorie, visibilité relative, balance, URL uniques, sujet principal, répartition positif/neutre/négatif, relations thématiques, période et méthode. Fermeture par bouton et `Échap`, navigation clavier, ligne sélectionnée visuellement marquée.
5. **Cohérence** — carte d'analyse de droite conservée ; sélection synchronisée entre marqueur de matrice, ligne de classement et carte d'analyse.

## Recommandation sur le filtre du classement

Je recommande que le filtre d'affichage agisse **uniquement sur le tableau**, et non sur la matrice. Raison : les six filtres existants (Partis, Leaders, Sujets, Positif, Neutre, Négatif) pilotent déjà la matrice ; un second filtre agissant aussi sur le plan créerait deux sources de vérité contradictoires et rendrait le compteur d'entités ambigu. Le compteur du classement affichera le nombre filtré sur le total actif (ex. `9 / 17`).

## Points d'accessibilité et de cohérence signalés

- **Bundle statique** : `lucide-react` n'est pas utilisable dans ce dossier (HTML/CSS/JS natif, hors React). J'intégrerai les tracés SVG officiels des icônes Lucide citées, inline — même dessin, aucune icône inventée, aucun emoji.
- **Double codage obligatoire** : chaque quadrant conserve son libellé texte + sa texture, donc reste lisible en daltonisme et en impression monochrome. La couleur n'est jamais le seul porteur d'information.
- **Contraste** : les quatre teintes seront déclinées en deux jeux de tokens (clair / sombre) pour tenir AA sur le texte de libellé ; le vert pâle sera assombri en thème clair pour rester lisible sur `#FAF6ED`.
- **Taille des pictogrammes** : un pictogramme masque plus de surface qu'un point. Le centre géométrique de l'icône reste la coordonnée exacte, et un repère de 2 px marque la position sous l'icône afin que la vérité positionnelle reste vérifiable.
- **Tonalités** : la demande ne définit pas de pictogramme pour les trois nœuds de tonalité (Positive / Neutre / Négative) présents parmi les 28 entités ; je leur applique `Gauge` et le codage couleur de tonalité existant.

## Fichiers concernés

- `public/intelligence-politique/strategic-signals.js` — dictionnaires FR/EN/AR (nouveaux libellés : filtre de catégorie, fiche détaillée), rendu de la matrice (icônes, graduations d'axes, quadrants), rendu du classement (filtre + clic ligne), panneau fiche détaillée, synchronisation de sélection.
- `public/intelligence-politique/strategic-signals.css` — tokens de quadrants clair/sombre, textures, styles d'icônes, graduations d'axes, fiche détaillée, adaptations RTL et mobile.
- `public/intelligence-politique/index.html` — uniquement le bump de version des paramètres `?v=` des deux fichiers.

## Tests prévus

Playwright sur les 12 combinaisons FR/EN/AR × clair/sombre × 1440 px / 360 px : présence des 28 entités tous filtres actifs, exactitude des coordonnées (comparaison valeur ↔ position), filtre de classement, ouverture/fermeture de la fiche au clavier, synchronisation marqueur ↔ ligne ↔ carte d'analyse, absence de débordement horizontal, console à 0 erreur.
