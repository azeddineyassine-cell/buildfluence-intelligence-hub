# Plan ciblé · Simulateur des coûts d'investissement

## Périmètre strict
- Modifier uniquement le simulateur accessible depuis l'entrée Prototypes : « Simulateur des coûts d'investissement » et l'ancre `#cout`.
- Ne pas modifier Investor Atlas, Comparateur de compétitivité, Positionnement, Le Duel, Foncier, Décision, navigation globale, footer, route ou mécanisme d'ouverture/fermeture.
- Conserver les liens existants pointant vers le simulateur, sans créer de nouveau point d'entrée.
- Ne pas publier automatiquement.

## Fichier qui sera modifié
- `public/benchmark-api-vs-amdie.html`

Aucun autre fichier ne sera modifié, sauf si une contrainte bloquante apparaît pendant l'intégration. Dans ce cas, je m'arrêterai avant d'élargir le périmètre.

## Ce qui sera remplacé dans le simulateur
- Remplacement du contenu actuel de la section `#cout` par la maquette fournie, adaptée au thème, au style et au fonctionnement existants de la page.
- Conservation de l'entrée de menu « Simulateur des coûts d'investissement » et de l'ancre `#cout`.
- Conservation de l'action de fermeture/retour existante du simulateur.

## Contenu à intégrer
1. Parcours des données A à F avec rôles au survol et insight fixe.
2. Niveau 1 : classement comparatif avec onglets Projet / Priorités, sliders, préréglages, verdict, classement des 6 pays, mode « Tous les pays » / « Maroc vs ».
3. Tableau Pays pleine largeur avec 6 pays fixes, cellules numériques éditables, coût projeté calculé et statut cliquable à trois états.
4. Niveau 2 : Business case Maroc avec modes Par taille / Par budget, secteurs, régimes fiscaux, horizon, hypothèses avancées et formule corrigée sans impôt négatif.
5. Devise uniquement sur le Niveau 2, avec taux indicatifs.
6. KPI, bascule Coûts / Rentabilité, infobulles, seuil de rentabilité.
7. Structure des coûts en histogramme proportionnel, format « 45 M MAD (33%) ».
8. Bloc « Comprendre le calcul » repliable.
9. Bouton « Télécharger le rapport (PDF) » via impression navigateur, avec vrai logo Buildfluence existant, méthode, tableaux Niveau 1 et Niveau 2, contact institutionnel.

## Contraintes de marque
- Titres Playfair Display, texte DM Sans, chiffres JetBrains Mono.
- Chrome de marque strictement navy / or.
- Vert et rouge uniquement dans la data-visualisation.
- Mode sombre : réutiliser les tokens de couleur déjà définis ailleurs sur le site pour les fonds, textes et bordures de l'interface du simulateur. Ne pas inventer de nouvelle palette sombre.
- Les couleurs de data-visualisation restent identiques en mode clair et sombre : barres de classement, structure des coûts, graphe empilé, courbe de trésorerie et repères positif/négatif.
- Aucun tiret cadratin dans le texte ajouté.
- Mot « gratuit » interdit.
- Pas de refonte des autres modules.

## Validation
- Vérifier que l'ancre `#cout` et les liens existants vers le simulateur fonctionnent.
- Vérifier que les autres entrées Prototypes restent inchangées.
- Vérifier les interactions clavier, souris et tactile raisonnables.
- Vérifier le mode clair et sombre.
- Vérifier 1440, 1024, 768 et 390 px.
- Vérifier la console et l'absence d'erreur nouvelle.
- Fournir la liste exacte des fichiers modifiés à la fin.
