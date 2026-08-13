# Ajustements — Légende verticale et fiche détaillée en colonne droite

Périmètre strict : `public/intelligence-politique/strategic-signals.js`, `strategic-signals.css`, et le bump `?v=` dans `index.html`. Aucune donnée canonique, aucun calcul, aucun autre onglet, aucun backend.

## 1. Légende verticale sur quatre lignes

La ligne condensée actuelle (`legShapes` : « carré parti · cercle leader · losange sujet · barre tonalité ») est supprimée. À la place, quatre lignes, chacune avec le pictogramme placé avant l'intitulé, alignement en colonne régulière (gouttière fixe pour l'icône) et interligne compact :

- `Landmark` — Parti politique
- `UserRound` — Leader politique
- `MessagesSquare` — Sujet du débat
- `Gauge` — Tonalité : positif / neutre / négatif

Sous ces quatre lignes, on conserve dans l'ordre : la taille du marqueur (paliers d'URL uniques), la couleur des quadrants, le repère central, le seuil de séparation, l'aide clavier.

Distinction analytique explicite : la ligne « couleur des quadrants » est reformulée pour indiquer qu'elle code une position analytique (visibilité × balance), et non une tonalité. La ligne `Gauge` reste la seule à parler de tonalité.

FR / EN / AR : nouvelles clés de traduction (`legParty`, `legLeader`, `legTopic`, `legTone`, reformulation de `legQuad`). En RTL, l'icône passe automatiquement à droite du texte via `flex` logique et `border-inline`/`margin-inline`, sans règle miroir manuelle.

## 2. Fiche détaillée déplacée dans la colonne droite existante

Aujourd'hui `.ss-detail` vit dans `.ss-rank-body`, en grille `1fr 300px` : le tableau se resserre à la sélection. Ce comportement est supprimé.

Exploitation de la colonne droite :

- La colonne `.ss-analysis` (aside blanc à droite du contenu principal, aujourd'hui : carte d'analyse + tonalités + lecture décisionnelle + note méthodologique) devient l'hôte de la fiche.
- Un conteneur `#ss-detail` est déplacé **à la fin de `.ss-analysis`**, après la note méthodologique, dans la grande zone actuellement vide — pas de nouvelle colonne, pas de nouvelle grille.
- `.ss-rank-body` repasse en colonne unique : le tableau garde toujours 100 % de largeur, aucune colonne ne se resserre ni ne disparaît.
- La fiche est séparée de la carte d'analyse par un filet or et un titre `FICHE DÉTAILLÉE`, pour que les deux blocs se lisent comme un ensemble continu.
- Anti-redondance : la carte d'analyse affiche déjà visibilité, URL uniques, balance, sujet principal, relations, répartition de tonalité. La fiche ne les répète pas ; elle porte le quadrant et sa définition, le seuil appliqué, le détail chiffré des relations thématiques de l'entité, la période et la méthode. Si l'entité de la fiche est celle déjà sélectionnée dans la carte (cas normal, sélection synchronisée), aucun doublon n'apparaît.
- Sélection : clic sur une ligne → `selected` sur la ligne, marqueur de matrice mis en avant, carte d'analyse mise à jour, fiche remplie. Un autre clic remplace le contenu. Le bouton de fermeture et `Échap` masquent la fiche sans toucher à la largeur du tableau.
- Sticky : `.ss-analysis` reçoit `position:sticky; top:<hauteur en-tête>; max-height:calc(100vh - offset); overflow:auto` au-dessus de 1050 px, afin que la fiche reste consultable pendant le défilement du classement sans masquer l'en-tête ni les onglets.

## Mobile (≤ 1050 px)

La colonne d'analyse passe déjà sous le contenu. La fiche s'affiche donc sous la carte d'analyse, sous le tableau, en flux normal, pleine largeur, sans sticky et sans défilement horizontal (valeurs longues en `overflow-wrap`). Option plein écran écartée : elle ajouterait une couche modale non nécessaire puisque l'espace vertical est disponible. Après ouverture, défilement doux vers la fiche pour qu'elle soit visible immédiatement.

## Vérification

Playwright sur FR / EN / AR × clair / sombre × 1440 px et 360 px : largeur du tableau inchangée à la sélection, présence des 4 lignes de légende avec pictogramme en tête, fiche rendue dans la colonne droite, fermeture au bouton et à `Échap`, synchronisation marqueur ↔ ligne ↔ carte, non-régression de la vue Orbites thématiques (graphe, table, zoom, sélecteurs), absence de débordement horizontal, console à 0 erreur.
