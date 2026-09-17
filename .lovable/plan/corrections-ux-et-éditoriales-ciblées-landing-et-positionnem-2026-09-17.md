# Corrections UX et éditoriales ciblées — Landing et Positionnement

## État contrôlé avant intervention

- Point de restauration courant : révision `1a2b27040f34f34ea2eeb063893f05d8c5faabae`.
- La carte React n’est actuellement montée qu’une fois, dans `#worldMapRoot`, à la fin de Positionnement ; le landing ne contient plus de point de montage.
- Les ajouts éditoriaux déjà présents dans Positionnement seront conservés et ajustés, sans être recréés en double.
- Les données et calculs restent centralisés dans les sources existantes : `AG`, `MATRIX`, `ORDER`, `DIAG`, `NOTE`, `SRCURL` et le GeoJSON local.
- Aucun changement ne concernera Le Duel, Foncier, Prototypes, Investor Atlas, Comparateur, Simulateur, accès Premium, routes ou backend.

## Fichiers concernés

1. `public/benchmark-api-vs-amdie.html`
   - restaurer la zone cartographique du landing avec un identifiant distinct ;
   - ajuster uniquement les blocs `#m1`, `#m2`, `#m3` et leur rendu éditorial ;
   - exposer en lecture seule au composant cartographique les données déjà présentes, sans les recopier ni les modifier.
2. `src/components/benchmark/WorldBenchmarkMap.tsx`
   - rendre la carte réutilisable avec les modes `landing` et `synthesis` ;
   - conserver une seule définition des pays, une seule source GeoJSON et une seule logique géographique ;
   - différencier uniquement le niveau d’interaction et le contenu affiché.
3. `src/pages/BenchmarkApiVsAmdie.tsx`
   - détecter les deux points de montage distincts et créer deux portails React indépendants.

Aucun autre fichier de production ne sera modifié.

## 1. Deux cartes, deux usages, aucune duplication de données

### Carte d’ouverture

- Ajouter `#landingWorldMapRoot` dans le landing et rétablir une composition desktop en deux colonnes : texte à gauche, carte à droite sur environ 44–48 % de la largeur utile.
- Monter `WorldBenchmarkMap` avec `mode="landing"`.
- Afficher les six pays et les mêmes liaisons géographiques, depuis les mêmes coordonnées et le même GeoJSON.
- Placer les six drapeaux en haut à gauche de la carte, sur une ou deux lignes selon la largeur.
- Limiter l’interaction au nom du pays au survol, au focus ou au toucher ; aucune fiche détaillée et aucun panneau analytique.
- Préserver une composition compacte sur mobile, sans vide inutile.

### Carte finale

- Renommer le point final en `#synthesisWorldMapRoot` et monter `WorldBenchmarkMap` avec `mode="synthesis"`.
- Conserver les six pays, liaisons, zoom, déplacement, réinitialisation, sélection et légende.
- Ajouter la fiche analytique détaillée, accessible et verrouillable.

### Architecture technique

- `BenchmarkApiVsAmdie.tsx` conservera deux références de montage distinctes, sans réutiliser un même identifiant DOM.
- Les deux instances consommeront `benchmarkLocations` et `world-benchmark.geo.json` depuis le même composant.
- La carte finale lira les champs existants de `AG`, `MATRIX`, `ORDER` et les diagnostics disponibles dans le document intégré via une interface de lecture étroite ; aucune copie des valeurs ne sera créée dans React.
- Les états de zoom, survol et sélection seront indépendants entre les deux instances.

## 2. Carte de maturité — quatre quadrants intégrés

- Supprimer la rangée séparée actuellement rendue dans `#posQuad1`.
- Dans `renderBubble()`, placer les quatre intitulés directement dans leurs zones :
  - bas gauche : **Vitrine institutionnelle** ;
  - haut gauche : **Promotion active mais peu outillée** ;
  - bas droite : **Outils numériques sans conversion** ;
  - haut droite : **Plateforme d’investissement intégrée**.
- Supprimer le mot « Quadrant » en français et son équivalent en anglais.
- Ne modifier ni coordonnées, bulles, axes, scores, couleurs ni calculs.
- Utiliser JetBrains Mono 9–10 px, avec contraste clair/sombre ; sur petit écran, déplacer uniquement le libellé devenu trop contraint vers le bord ou juste à côté de sa zone.

## 3. Heatmap — introduction et familles simplifiées

- Conserver le titre, le texte d’introduction existant et le cadrage analytique `02` déjà ajouté.
- Supprimer uniquement le bloc DOM `#m2method` et son rendu ; conserver l’échelle 1 à 5 et toute la grille.
- Présenter **Attirer / Convaincre / Convertir** comme trois cadres équilibrés :
  - trois colonnes de même hauteur à 1440 et 1024 px ;
  - deux colonnes sur tablette ;
  - une colonne sur mobile ;
  - ordre et textes intacts, sans troncature.
- Ne modifier aucune note, échelle, cellule, détail latéral ou méthode.

## 4. Radar — cadrage rationalisé

- Conserver le Radar immédiatement après la Heatmap, son titre, son introduction, sa légende, ses contrôles et Morocco Now toujours visible.
- Reformuler les quatre clés comme questions de lecture, sans les présenter comme des données :
  - **Étendue** — Quelle surface du parcours investisseur le dispositif couvre-t-il ?
  - **Régularité** — La couverture est-elle équilibrée ou présente-t-elle des ruptures ?
  - **Spécialisation** — Sur quelles fonctions le dispositif se distingue-t-il réellement ?
  - **Rupture** — À quels endroits Morocco Now décroche-t-il du parcours ?
- Afficher quatre cadres égaux sur une ligne à 1440 et 1024 px, deux colonnes sur tablette, une sur mobile.
- Supprimer uniquement le bandeau `#m3ti` / `#m3note` « À retenir ».
- Conserver intégralement `renderRadar()`, `radarState`, les douze axes, notes, couleurs, activation individuelle et commandes globales.

## 5. Cadres d’interprétation

- Conserver les quatre cadres après chacune des trois grilles : **Ce que montre la grille**, **Ce que cela signifie**, **Risque pour le Maroc**, **Décision à instruire**.
- Renforcer leur fond avec le fallback `#F1E8D5`, puis `color-mix(in srgb, var(--gold) 10%, var(--paper))`.
- Conserver texte navy, bordure `var(--rule)`, accent gold discret et rayon maximal de 2 px.
- Disposition : quatre colonnes égales sur desktop, deux sur tablette, une sur mobile.

## 6. Fiche analytique de la carte finale

Pour chaque pays, afficher :

1. **Pays et organisme** ;
2. **Modèle dominant** ;
3. **Ce que le dispositif maîtrise** — deux éléments maximum ;
4. **Ce qu’il maîtrise moins** — deux éléments maximum ;
5. **Effet pour l’investisseur** ;
6. **Enseignement pour le Maroc**, ou **Cap à atteindre** pour Morocco Now ;
7. **Score global** existant ;
8. **Source** institutionnelle existante.

Règles de contenu :

- Le modèle et les formulations qualitatives proviendront uniquement des champs documentés de `AG`, des diagnostics/fiches existants et de leurs sources.
- Les notes de `MATRIX` pourront seulement identifier les critères à examiner ; elles ne serviront pas seules à affirmer une cause ou un bénéfice.
- Une force ou limite ne sera affichée que si elle est corroborée par un contenu qualitatif existant ; sinon : **Information à consolider** / **Information to be consolidated**.
- Aucun score, source, fait, causalité ou recommandation factuelle ne sera inventé.
- Pour Morocco Now, la dernière rubrique deviendra **Cap à atteindre** et synthétisera seulement les forces, ruptures et priorité déjà établies par les trois grilles.

Ergonomie :

- panneau de 320 à 380 px sur desktop, hauteur naturelle, fond navy, texte ivory, labels et bordure gold, rayon 2 px maximum ;
- placement automatique dans les limites de la carte, sans masquer les contrôles ni plusieurs pays inutilement ;
- repère visuel vers le pays actif ;
- survol avec maintien vers la fiche, clic ou toucher pour verrouiller, bouton de fermeture et Échap pour fermer ;
- accès identique au clavier par Tab, Entrée et Espace ; un seul pays actif à la fois.

## Ordre final garanti

1. Landing : texte d’ouverture + carte d’aperçu.
2. Cadrage exécutif de Positionnement.
3. Carte de maturité et interprétation.
4. Heatmap et interprétation.
5. Radar et interprétation.
6. Synthèse décisionnelle.
7. Carte mondiale finale et fiches analytiques.

## Garanties de périmètre

- Valeurs inchangées dans `AG`, `MATRIX`, `ORDER`, `DIAG`, `NOTE`, `SRCURL` et les coordonnées géographiques.
- Aucun changement de méthodologie, score, axe, source, couleur d’identification ou interaction analytique existante.
- Aucun changement hors landing et Positionnement, hormis l’adaptation strictement nécessaire de la page React pour monter les deux cartes.
- Aucune publication automatique.

## Validation après implémentation

Contrôler explicitement les 20 points demandés, notamment :

- présence simultanée des deux cartes avec `landingWorldMapRoot` et `synthesisWorldMapRoot` ;
- drapeaux en haut à gauche du landing et absence de fiche détaillée sur cette instance ;
- quatre libellés dans leurs quadrants sans chevauchement de bulle ;
- suppression de la légende de quadrants, du mode de notation et du bandeau Radar « À retenir » ;
- dispositions 3 colonnes Heatmap et 4 colonnes Radar à 1440 et 1024 px ;
- fond renforcé des cadres d’interprétation ;
- complétude, traçabilité et comportement accessible des six fiches pays ;
- identité stricte des notes, scores, axes, sources et données avant/après ;
- FR/EN, clair/sombre, souris, toucher et clavier ;
- formats 1440, 1024, 768 et 390 px avec captures ;
- intégrité des autres onglets/prototypes et console sans erreur ;
- absence de publication.
