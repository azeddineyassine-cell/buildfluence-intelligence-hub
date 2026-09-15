# Amélioration ciblée de Positionnement

## Périmètre confirmé

L’intervention couvre uniquement la phase de navigation **Positionnement · Où se situe le Maroc ?**, composée actuellement des sections `m1`, `m2` et `m3` :

1. carte de maturité Tech / Data et Marketing ;
2. grille des 12 critères ;
3. radar comparatif.

Les sections **Le Duel**, **Foncier**, **Prototypes**, **Investor Atlas**, **Comparateur**, **Simulateur**, les accès Premium, la navigation générale, les routes et le backend resteront inchangés.

## Fichiers qui seront modifiés

- `public/benchmark-api-vs-amdie.html`
- `src/components/benchmark/WorldBenchmarkMap.tsx`

`src/pages/BenchmarkApiVsAmdie.tsx` restera inchangé : le point de montage conservera l’identifiant `worldMapRoot`, même après son déplacement.

## État de restauration

- État de référence identifié : révision `2289df06ea612275e4c46c7b8347686a303d2c85` du 15 septembre 2026 à 15:19:27 UTC.
- Le diff actuel des fichiers concernés est vide avant intervention.
- Aucun fichier n’a été modifié pendant l’audit.

## Blocs identifiés et intervention prévue

### 1. Cadrage exécutif

Ajouter au début de la séquence Positionnement le cadrage bilingue demandé : eyebrow, titre, introduction et constats **Position / Écart / Priorité**.

### 2. Trois grilles existantes

Conserver les visualisations et leur logique :

- `#m1` : graphique de maturité `#bubbleSvg`, alimenté par `AG` et rendu par `renderBubble()` / `showBub()` ;
- `#m2` : matrice `#matrixTable`, alimentée par `MATRIX`, `DIAG`, `NOTE` et `SRCURL`, rendue par `renderMatrix()` / `showMx()` ;
- `#m3` : radar `#radarSvg`, alimenté par `MATRIX`, `ORDER` et `AG`, rendu par `renderRadar()`.

Avant chaque grille, ajouter le numéro, la question stratégique et l’explication de mesure. Après chaque grille, ajouter quatre blocs d’interprétation distincts : **Ce que montre la grille**, **Ce que cela signifie**, **Risque pour le Maroc**, **Décision à instruire**.

Pour la première grille :
- afficher les explications accessibles des axes sans modifier leurs variables ni coordonnées ;
- afficher les quatre désignations de quadrants demandées ;
- renforcer visuellement Morocco Now sans changer sa position ou son score ;
- réorganiser la fiche existante à partir des seuls champs déjà documentés dans `AG`, sans créer de faits.

Pour la grille des critères :
- conserver les 12 critères dans leur ordre et avec leurs notes actuelles ;
- ajouter des repères visuels **Attirer / Convaincre / Convertir** uniquement lorsque le rattachement est explicitement défendable par les données existantes ; sinon conserver le critère sans attribution arbitraire ;
- préserver la note, le diagnostic, les impacts, la solution, le gain et la source dans le détail latéral ;
- rendre l’échelle 1 à 5 plus lisible sans modifier sa définition.

### 3. Synthèse décisionnelle

Ajouter après le radar la synthèse fournie, puis les priorités **Territorialiser / Objectiver / Convertir**. Elle sera présentée comme une interprétation éditoriale, jamais comme une nouvelle mesure.

### 4. Carte mondiale finale, fusion sans doublon

- Retirer seulement l’ancienne carte interne `.bmap-wrap`, devenue redondante.
- Déplacer le point de montage de la carte vectorielle existante depuis l’en-tête vers la fin de Positionnement, après la synthèse.
- Conserver la projection, les six pays, leurs coordonnées, les liaisons et les contrôles existants.
- Ajouter le cadrage **Synthèse géostratégique** demandé.
- Remplacer le tooltip minimal par une fiche contextuelle accessible et bilingue.
- Alimenter chaque fiche exclusivement depuis les champs déjà présents dans `AG` et les sources existantes. Toute rubrique absente affichera **Information à consolider** / **Information to be consolidated**.
- Différencier la fiche Maroc et reprendre exactement le cap demandé.
- Gérer survol avec maintien vers la fiche, clic verrouillé/déverrouillé, toucher, bouton de fermeture, Tab, Entrée, Espace, Échap et focus visible.

## Données garanties inchangées

Aucune modification de valeur ou de méthodologie dans `AG`, `MATRIX`, `DIAG`, `NOTE`, `SRCURL`, `ORDER` ou les coordonnées géographiques. Aucun score, critère, pays, source, date, unité ou calcul ne sera ajouté ou recalculé.

Les textes d’interprétation spécifiques aux trois grilles et aux fiches pays seront dérivés uniquement des formulations déjà présentes dans le benchmark. En cas d’absence documentaire, la mention de consolidation sera utilisée.

## Validation après implémentation

- Vérifier les 17 contrôles demandés, avec un résultat explicite pour chacun.
- Tester FR/EN et clair/sombre.
- Tester souris, toucher simulé et clavier.
- Contrôler l’absence d’erreurs dans la console et l’intégrité des autres onglets.
- Capturer les rendus à 1440, 1024, 768 et 390 px.
- Ne rien publier.
