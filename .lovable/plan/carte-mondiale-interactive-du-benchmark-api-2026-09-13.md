# Carte mondiale interactive du Benchmark API

## Objectif
Remplacer uniquement la carte décorative du hero de `/benchmark-api-vs-amdie` par une carte mondiale vectorielle précise et interactive, tout en conservant le header, la navigation, les textes, les indicateurs, les données et le verrouillage Premium existants.

## Mise en œuvre
- Ajouter `react-simple-maps` et créer `WorldBenchmarkMap.tsx` avec une projection Equal Earth, `ZoomableGroup`, six marqueurs géolocalisés, cinq liaisons géodésiques depuis le Maroc, tooltips, sélection, clavier, clic extérieur et contrôles de zoom.
- Ajouter un fichier géographique mondial optimisé et local au projet, dérivé de Natural Earth. Fusionner géométriquement le Maroc et le Sahara occidental avant intégration afin de produire une seule surface sans frontière intérieure.
- Remplacer uniquement le SVG décoratif du hero statique par un point de montage. La page React injectera la carte dans ce point de montage à l’intérieur du document intégré, sans déplacer le contenu existant.
- Synchroniser la carte avec les changements de langue et de thème déjà pilotés par la page Benchmark, sans modifier leurs contrôles ni leur logique.
- Transformer la légende existante des six pays en commandes accessibles liées aux marqueurs, en conservant son intitulé FR/EN et sa place dans le hero.
- Conserver les appellations d’agences déjà validées dans le benchmark lorsqu’elles diffèrent du brief, puis signaler toute divergence dans le bilan.

## Design et comportement
- Appliquer les couleurs Buildfluence demandées en clair et sombre, sans couleurs distinctes par pays.
- Conserver la composition texte à gauche / carte à droite sur grand écran, puis placer la carte sous le texte sur mobile avec une hauteur minimale de 320 px.
- Garantir des cibles clavier et tactiles de 44 px, un focus visible, un tooltip contrasté et une animation désactivée avec `prefers-reduced-motion`.
- Désactiver le zoom à la molette ; proposer zoom avant, zoom arrière et réinitialisation.

## Fichiers prévus
- Modifier `package.json` et le fichier de verrouillage via l’installation de `react-simple-maps`.
- Créer `src/components/benchmark/WorldBenchmarkMap.tsx`.
- Créer `src/assets/maps/world-benchmark.geo.json`.
- Modifier `src/pages/BenchmarkApiVsAmdie.tsx` pour monter la carte dans le document intégré et synchroniser langue/thème.
- Modifier uniquement le point de montage et l’ancien rendu cartographique dans `public/benchmark-api-vs-amdie.html`.

## Vérifications
- Vérifier le build et l’absence d’erreurs nouvelles dans la console.
- Tester thème sombre et clair, langues FR/EN, zoom, déplacement, réinitialisation, hover, clic, Entrée, Espace, Échap, clic extérieur et légende bidirectionnelle.
- Contrôler visuellement les six positions, l’absence de séparation Maroc-Sahara et l’intégrité du reste de la page.
- Tester 1440 px, 1024 px, 768 px et 390 px, puis produire les captures desktop sombre, desktop claire et mobile.
- Fournir le résultat détaillé des 14 tests d’acceptation, les fichiers touchés, la bibliothèque, la source géographique et la méthode de fusion.
