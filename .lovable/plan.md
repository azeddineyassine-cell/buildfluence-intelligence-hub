# Proposition UX/UI et éditoriale — 4 vues (conception uniquement)

Aucun fichier n'est modifié à ce stade. Référence à préserver : commit `1b1460f`.

## Ce que contiennent réellement les données (audit factuel)

`canonical-monitoring-data.js` : 9 sections. 9 partis, 9 leaders, 10 médias nationaux, 10 médias internationaux, 7 sujets, `toneTotals`, `opinionBreakdowns` (canaux : twitter 2 516, facebook 518, news 1 525, blogs 626, autres 313 ; langues : fr 4 446, ar 1 033, autres 19), `graph` (28 nœuds, 128 relations, 7 421 URL). Types de relations : `alliance` 30, `proximite` 25, `opposition` 21, `influence` 52. Période : 29.07 au 05.08.2026. Total 8 993 URL uniques, 438 doublons retirés.

Données absentes, à ne pas simuler :
- Aucune série temporelle par sujet, acteur ou média. Le seul quotidien existant est le volume presse global (8 valeurs codées dans `script.js`).
- Aucune tonalité par média, aucun sujet dominant par média, aucune relation média-acteur.
- Aucune formule documentée derrière le champ `score` des médias (influence /100).
- Aucun événement daté ni annotation.
- Aucune métrique de centralité calculée (elle est dérivable des 128 relations).

## LOT 1 — Galaxie décisionnelle

Question décisionnelle : quels acteurs et sujets structurent le débat, et par quelles relations ?

Audit : disposition radiale figée, 3 anneaux décoratifs sans sémantique, taille = racine des URL, position = arbitraire, distance = non signifiante, aucune recherche, aucun zoom, aucun plein écran, aucun tableau équivalent, chevauchement des libellés en AR, sélection non clavier.

- Variante A « Galaxie sémantique en couronnes » : 4 couronnes réellement définies (noyau = sujets ; couronne 1 = acteurs à forte centralité ; couronne 2 = relais ; couronne 3 = périphériques), angle regroupé par catégorie, épaisseur du lien = URL de la relation, style du trait = type de relation (alliance, proximité, opposition, influence). Avantage : chaque encodage documenté. Limite : moins spectaculaire.
- Variante B « Graphe force-directed contraint » : positions calculées puis figées, mode focalisé par voisinage. Avantage : lecture des grappes. Limite : position non reproductible, risque d'interprétation d'une proximité comme alliance.

Recommandation : Variante A, avec le mode focalisé de B.

Wireframe desktop : bandeau titre + question ; barre d'outils (recherche entité, filtres catégorie et type de relation, zoom, recentrage, réinitialisation, plein écran, bascule graphe/tableau) ; scène 70 % ; colonne droite 30 % = fiche entité synchronisée + bloc « Lecture de la galaxie ». Mobile : barre d'outils condensée, scène pleine largeur pannable, fiche en panneau plein écran, tableau accessible en accordéon.

Contenu : fiche = identité, catégorie, URL uniques, balance narrative, centralité (degré pondéré, formule affichée), 3 relations les plus fortes avec leur type, limites. Bloc « Lecture » : nœud, lien, taille, couleur, distance, épaisseur ; conclusions autorisées ; interdits explicites (cooccurrence ≠ alliance ≠ influence ≠ causalité ≠ intention de vote).

Interactions : survol aperçu, clic sélection persistante, focalisation dédiée, clic lien = explication, Échap ferme, tabulation entre nœuds, focus visible, transitions courtes et `prefers-reduced-motion`.

## LOT 2 — À PROPOS

Question : qui est Buildfluence et pourquoi sa lecture est-elle crédible ?

Audit : 3 cartes génériques (Indépendance, Souveraineté, Responsabilité) + citation. Aucun positionnement, aucune expertise, aucune preuve, aucun fondateur, aucun CTA.

- Variante A « Dossier institutionnel en quatre blocs » : positionnement, 3 expertises convergeant vers Souveraineté décisionnelle, preuves et 3 cas, fondateur + CTA. Avantage : court, hiérarchisé. Limite : peu d'effet.
- Variante B « Bandeau narratif défilant » : lecture séquencée. Limite : plus long, moins consultable.

Recommandation : Variante A.

Blocs : 01 Sovereign Decision Infrastructure (formulation inchangée) + 4 capacités ; 02 Strategic Intelligence / Soft Power & Influence / Deep Due Diligence, une phrase chacune ; 03 preuves vérifiées (depuis 2015, 47 missions sur 4 continents, gouvernements et institutions, 25 ans d'expérience du fondateur distingués des missions Buildfluence) + 3 cas en Situation / Intervention / Résultat vérifié, sélectionnés parmi les Success Stories déjà publiées ; 04 fondateur Azeddine Yassine, Fondateur & Managing Director, bio 60-80 mots, 3 marqueurs, LinkedIn discret, puis CTA or « DÉCOUVRIR BUILDFLUENCE » vers https://buildfluence.ai et lien secondaire Success Stories.

Éléments en attente de votre validation avant rédaction : photographie, biographie, marqueurs de crédibilité, toute citation, et les 3 cas retenus.

## LOT 3 — OPINION

Question : quels sujets structurent le débat et lesquels exigent l'attention ?

Audit : 7 sujets, 4 vues synchronisées (camembert, histogramme, légende, panneau), pas de synthèse exécutive, pas de timeline, pas de croisement acteurs-sujets, pas de bloc méthodologie complet.

- Variante A « Cockpit visibilité × balance » : bandeau de 3 à 5 enseignements + matrice visibilité/balance des 7 sujets + explorateur thématique + timeline honnête. Avantage : réaliste au regard des données. Limite : pas de dynamique par sujet.
- Variante B « Constellation de sujets reliés aux acteurs » : sujets au centre, acteurs rattachés via les 128 relations. Avantage : montre qui porte quel sujet. Limite : redondance avec la galaxie.

Recommandation : Variante A, en intégrant le croisement acteurs-sujets de B dans l'explorateur.

Timeline : la granularité quotidienne n'existe que pour le volume presse global. La timeline affichera donc cette seule série documentée, avec libellé explicite du périmètre, et un état « Donnée indisponible » avec la liste des données nécessaires pour les séries par sujet. Aucune annotation d'événement ne sera créée sans source.

Module « Signaux de changement » : sans deux périodes comparables, il affichera « Donnée indisponible » et les données requises. Aucune variation ne sera inventée.

Bloc méthodologie : ce que la vue mesure, comment, ce qu'elle ne mesure pas (ni sondage, ni popularité, ni intention de vote, ni représentativité), sources, période, limites.

## LOT 4 — MÉDIA

Question : quelles sources structurent la couverture, et selon quelles mesures ?

Audit : liste + profil + radar 4 axes (Influence, Portée relative, Mentions relatives, Présence éditoriale). Problème méthodologique majeur : « Présence éditoriale » est la moyenne des trois autres axes, donc non indépendante ; le radar additionne visuellement des dimensions non homogènes. La formule du champ influence n'est documentée nulle part.

- Variante A « Classement documenté + barres comparatives » : remplacement du radar par des barres normalisées par dimension, avec un repère de comparaison explicite (médiane du corpus), plus le dossier « Comprendre le classement ». Avantage : rigoureux, publiable. Limite : moins « premium » visuellement.
- Variante B « Radar conservé, corrigé » : suppression de l'axe composite, 3 axes indépendants, séries superposables (2 médias maximum), tableau équivalent. Avantage : familier aux rédactions. Limite : 3 axes restent peu lisibles en radar.

Recommandation : Variante A comme visualisation principale, Variante B en option secondaire.

Dossier « COMPRENDRE LE CLASSEMENT » : utilité, obtention, lecture des visuels, conclusions autorisées et interdites, sources, période, déduplication, exclusions (wikipedia.org, wiktionary.org), taille d'échantillon, définitions des métriques, date de mise à jour. Le graphe relationnel de cette vue précisera que les liens disponibles sont des relations acteur-sujet et sujet-tonalité, et non des relations média-acteur, qui n'existent pas dans les données.

Point de blocage à trancher : soit vous fournissez la formule exacte du score d'influence des médias, soit ce champ est affiché comme « indicateur fourni, formule non documentée » et exclu du classement principal, qui reposera alors sur les URL uniques.

## Direction artistique et technique

Tokens officiels uniquement (Navy #0D1B2A, #1A2D44, #142235, #08111C ; Or #C9A84C, #D4B866, #8A7537, #E0C88A ; Ivoire #F5F1E8 ; Papier #FAF6ED ; Séparateur #D9CFBC ; Alerte #E06D4F), radius 2 px, Playfair Display / Cormorant Garamond italic / JetBrains Mono / DM Sans, thème clair par défaut, pas de flash sombre, redessin au changement de thème et de taille, FR/EN/AR RTL avec isolation `bdi` des noms propres, clavier et focus visibles, tableaux alternatifs, états chargement / erreur / vide / donnée indisponible, aucun débordement horizontal, console sans erreur.

Fichiers concernés (aucun autre) : `public/intelligence-politique/strategic-signals.js` et `.css` (lot 1), `index.html` section `#apropos` et `styles.css` (lot 2), `opinion-insights.js` et `.css` (lot 3), `index.html` section `#acteurs`, `script.js` fonctions radar et profil, `monitoring.css` (lot 4). Aucune donnée canonique, aucune formule de classement, aucune route, aucun onglet tiers, aucun backend Supabase.

## Séquencement, risques, tests

Ordre proposé : Lot 2 (le plus court et sans risque de calcul), puis Lot 1, puis Lot 4, puis Lot 3. Chaque lot fait l'objet d'une approbation séparée.

Rollback : chaque lot reste confiné à ses fichiers ; retour au commit `1b1460f` fichier par fichier.

Non-régression : après chaque lot, contrôle Playwright des 7 onglets, des 3 langues, des 2 thèmes, du zéro erreur console et de l'intégrité affichée des chiffres (9 partis, 9 leaders, 28 nœuds, 128 relations, 7 421 URL du graphe, 8 993 URL au total).

Critères d'acceptation par lot : chaque encodage visuel est expliqué dans l'interface ; toute donnée absente est déclarée « Donnée indisponible » ; aucun chiffre nouveau n'apparaît ; navigation clavier complète ; parité FR/EN/AR ; RTL correct visuellement, pas seulement textuellement.

## Décisions attendues de votre part

1. Lot 2 : photographie, biographie, marqueurs, citation, choix des 3 cas.
2. Lot 4 : formule du score d'influence des médias, ou exclusion de ce champ.
3. Lot 3 : fourniture éventuelle de séries temporelles par sujet, sinon timeline limitée au volume presse global.
4. Ordre des lots et lot à démarrer.
