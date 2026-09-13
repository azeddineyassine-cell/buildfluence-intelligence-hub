# Restauration ciblée du Benchmark API et drapeaux vectoriels

## Diagnostic confirmé
La dernière intégration a retiré le nœud HTML statique `#mapTitle`, mais `renderHero()` continue d’exécuter `el("mapTitle").textContent = ...`. Cette référence nulle déclenche une exception pendant `renderAll()` et empêche toutes les fonctions suivantes de remplir les onglets Positionnement, Le Duel, Foncier, Prototypes et Décision. Les contenus, données, traductions, styles et fonctions interactives sont toujours présents dans le fichier.

## Phase 1 — Restaurer les contenus
- Corriger uniquement la référence devenue invalide dans `public/benchmark-api-vs-amdie.html`, sans restaurer l’ancienne carte ni modifier les contenus.
- Conserver le composant React de carte, le fichier géographique local, les coordonnées, les liaisons, les tooltips, le zoom et la fusion Maroc–Sahara.
- Comparer le rendu actuel avec la révision fonctionnelle immédiatement antérieure à l’intégration de la carte pour vérifier qu’aucun autre bloc utile n’a disparu.

## Phase 2 — Tester les six onglets
- Ouvrir successivement Pourquoi, Positionnement, Le Duel, Foncier, Prototypes et Décision.
- Vérifier les titres, textes, graphiques, tableaux, contrôles, accordéons, prototypes et verrouillage Premium en français et en anglais, en clair et sombre.
- Confirmer l’absence de conteneurs vides et d’erreurs JavaScript avant de poursuivre.

## Phase 3 — Ajouter les drapeaux SVG locaux
- Créer les six fichiers locaux `public/flags/ma.svg`, `tr.svg`, `eg.svg`, `in.svg`, `kr.svg` et `sg.svg`.
- Remplacer les codes dans les marqueurs et la légende par ces drapeaux, avec libellés accessibles et zones interactives d’au moins 40 × 40 px.
- Ne modifier ni les coordonnées, ni les tracés, ni la géométrie Maroc–Sahara.

## Phase 4 — Validation finale
- Refaire les tests des six onglets, de la carte, du clic, du survol, du clavier, des langues et des thèmes.
- Vérifier les formats 1440, 1024, 768 et 390 px, ainsi que la console et la compilation.
- Produire une capture de chaque onglet restauré et rendre le détail des 14 tests, des fichiers restaurés et des fichiers de carte conservés.
