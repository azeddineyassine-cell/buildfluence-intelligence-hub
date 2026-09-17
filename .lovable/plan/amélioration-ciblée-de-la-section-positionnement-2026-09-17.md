# Amélioration ciblée de la section Positionnement

## État vérifié avant intervention

- Les deux cartes existent déjà avec deux points de montage distincts : `landingWorldMapRoot` et `synthesisWorldMapRoot`.
- Elles utilisent déjà le même composant, la même liste de six pays et le même GeoJSON local.
- La carte d’ouverture est déjà limitée à l’aperçu ; la carte finale conserve zoom, déplacement, sélection et fiches analytiques.
- Les quatre intitulés de maturité sont actuellement dessinés dans le SVG et deux intitulés supérieurs restent trop proches de la ligne médiane.
- La Heatmap conserve ses 12 critères, six pays, 72 notes, échelle et détail latéral.
- Le bloc de synthèse décisionnelle placé après le Radar porte déjà le titre demandé ; il sera transformé en Verdict dans Positionnement, sans modifier l’onglet Décision séparé.
- Aucun fichier de production n’est actuellement modifié et la compilation est valide.

## Périmètre et fichiers

### Fichiers de production modifiés

1. `public/benchmark-api-vs-amdie.html`
   - terminologie, ancres, sous-menu Positionnement et défilement interne ;
   - placement extérieur des quatre intitulés de maturité ;
   - écran Verdict, point de montage de la trajectoire et lien vers le Simulateur existant ;
   - cadrage presque pleine largeur de la Synthèse géostratégique.
2. `src/components/benchmark/WorldBenchmarkMap.tsx`
   - rangée unique des six pays pour les deux cartes ;
   - composition 70/30 de la carte finale avec fiche latérale non superposée ;
   - comportements mobile, survol, focus, verrouillage et infobulle courte.
3. `src/components/benchmark/PositioningDecisionTrajectory.tsx` (nouveau)
   - accordéon décisionnel à trois étapes utilisant `MapPinned`, `Scale` et `MousePointerClick` de `lucide-react`.
4. `src/pages/BenchmarkApiVsAmdie.tsx`
   - montage du composant de trajectoire dans le document intégré, sur le même modèle que les deux cartes existantes.

`roadmap.md` sera uniquement actualisé pour le suivi de cette demande.

Aucune page, route, donnée, migration ou fonction backend ne sera créée ou modifiée. Aucun autre onglet ou prototype ne sera touché.

## 1. Carte mondiale du landing

- Conserver la carte à droite du texte d’ouverture.
- Déplacer la liste des pays hors de la surface cartographique, immédiatement au-dessus de la carte.
- Afficher, dans cet ordre, **Maroc | Türkiye | Égypte | Inde | Corée du Sud | Singapour** sur une seule ligne compacte, alignée à gauche.
- Sur mobile, conserver la ligne et permettre son défilement horizontal sans retour ni masquage de la carte.
- Signaler le pays actif par bordure gold ou fond ivory discret.
- Conserver uniquement le nom du pays dans l’infobulle du landing, sans fiche ni zoom.

## 2. Carte de maturité

- Donner à la section l’ancre stable `#positionnement-maturite`.
- Retirer les quatre textes de l’intérieur du SVG.
- Ajouter deux bandeaux alignés sur les deux moitiés du graphique : deux intitulés au-dessus et deux au-dessous.
- Conserver exactement les libellés FR/EN déjà documentés, sans le mot « Quadrant ».
- Ne modifier aucune coordonnée, bulle, valeur, couleur, axe ni interaction de `renderBubble()`.
- Adapter les bandeaux aux petites largeurs sans superposition avec le graphique.

## 3. Matrice comparative

- Donner à la section l’ancre stable `#positionnement-matrice`.
- Remplacer uniquement la terminologie et la hiérarchie éditoriale :
  - FR : **02 · MATRICE COMPARATIVE**, **Sur quels critères l’écart se creuse-t-il ?**, puis le sous-titre fourni ;
  - EN : **02 · COMPARATIVE MATRIX**, **Which criteria create the widest gap?**, puis le sous-titre fourni.
- Remplacer les mentions d’interface liées à cette section dans le sous-menu et le cadrage du Radar, sans réécrire les textes d’autres onglets ou prototypes qui décrivent encore leur source historique.
- Conserver intégralement `MATRIX`, `ORDER`, les 12 critères, les six pays, les notes, l’échelle, le détail latéral et les interactions.

## 4. Sous-menu Positionnement

- Structurer uniquement le sous-menu Positionnement avec deux groupes : **ANALYSES** et **DÉCISION**.
- Ajouter cinq entrées vers :
  1. `#positionnement-maturite`
  2. `#positionnement-matrice`
  3. `#positionnement-radar`
  4. `#verdict-buildfluence`
  5. `#synthese-geostrategique`
- Les liens activeront la phase Positionnement puis défileront dans la même page, sans rechargement.
- Ajouter un décalage de défilement tenant compte des deux menus fixes.
- Mettre à jour l’état actif au défilement et au focus, avec navigation clavier complète.

## 5. Verdict Buildfluence et trajectoire

- Transformer le bloc décisionnel déjà placé après le Radar en écran `#verdict-buildfluence`, sans déplacer ni modifier l’onglet Verdict de la phase Décision.
- Afficher l’eyebrow et le titre exacts demandés ; conserver l’explication existante avec une largeur de lecture limitée.
- Donner au bloc une hauteur desktop cible comprise entre 75 et 85 % de la fenêtre, sans imposer cette hauteur sur mobile.
- Remplacer les trois résumés statiques par une trajectoire ascendante à ligne gold : Territorialiser, Objectiver, Convertir.
- Les trois en-têtes et icônes resteront toujours visibles ; les détails seront fermés au chargement ; une seule étape pourra être ouverte.
- Gérer clic, toucher, Entrée, Espace, focus visible et mouvement réduit.
- Utiliser exactement les contenus français fournis et leurs traductions anglaises cohérentes.
- Ajouter dans Convertir le CTA **ACTIVER MON PARCOURS D’IMPLANTATION**, relié au Simulateur existant par navigation interne simple, sans inventer de transmission de critères.

## 6. Synthèse géostratégique

- Donner au bloc final l’ancre `#synthese-geostrategique` et une largeur `min(96vw, 1760px)`, alignée avec le bord gauche du menu principal.
- Conserver titre, introduction, pays, liaisons, coordonnées, données, contrôles et fiches.
- Placer la rangée unique des six pays au-dessus de la composition.
- Sur desktop, utiliser une grille approximative 70/30 : carte à gauche, fiche analytique persistante à droite.
- La fiche ne recouvrira plus la carte. Le survol ou focus mettra à jour la fiche ; clic ou toucher verrouillera la sélection ; Échap et fermeture la déverrouilleront.
- L’infobulle de carte restera courte : pays et organisme uniquement.
- Sur mobile, pays défilables horizontalement, carte pleine largeur, fiche sous la carte.
- Conserver les rubriques et contenus actuels, y compris **CAP À ATTEINDRE POUR LE MAROC**, les scores et sources existants, avec le fallback documentaire prévu.

## Garanties de données et de comportement

- Aucune modification de `AG`, `MATRIX`, `ORDER`, `DIAG`, `NOTE`, `SRCURL`, des scores, coordonnées, axes ou couleurs d’identification.
- Aucun changement des calculs, de la méthodologie, du Premium, des routes ou du backend.
- Les deux cartes continueront à partager `benchmarkLocations` et `world-benchmark.geo.json`.
- Aucune publication automatique.

## Validation après implémentation

- Vérifier explicitement les 27 contrôles fournis, avec un résultat individuel.
- Comparer avant/après les données, scores, critères, sources et coordonnées ciblés.
- Tester FR/EN, clair/sombre, clavier, toucher simulé, survol, verrouillage, Échap et mouvement réduit.
- Contrôler les largeurs 1440, 1024, 768 et 390 px et produire une capture à chacune.
- Vérifier la navigation des cinq ancres, le CTA vers le Simulateur, l’absence de chevauchement et l’intégrité des autres onglets/prototypes.
- Vérifier la compilation et la console, puis fournir la liste exacte des fichiers modifiés et les captures, sans déploiement.
