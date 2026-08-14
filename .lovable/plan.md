# LOT MÉDIA — Conception uniquement (aucun fichier modifié)

Référence publiée à préserver : commit `d84381d` (« Ajouté la Galaxie décisionnelle »).

Question analytique : « Quels médias structurent la couverture du débat dans le corpus étudié, selon quelles métriques documentées et autour de quels sujets ? »

## 1. Audit factuel de la vue publiée

Vue actuelle (`#acteurs`, onglet MÉDIA) : titre « Sources internationales », bascule international/national, liste latérale avec recherche par domaine, fiche « profil de la source » avec score « INFLUENCE /100 », radar 4 axes, bloc « INDICATEURS NORMALISÉS », résumé textuel.

Problèmes constatés :
- Le classement principal est trié et titré par un score `score` présenté comme « INFLUENCE /100 » dont **aucune formule n'est documentée** dans les données ni dans le code. Il est repris tel quel du fichier source.
- Le radar mélange quatre axes non homogènes : `Influence` (= `score`, formule inconnue), `Portée` (= `reach` normalisé au max de la catégorie), `Mentions` (= `delta` = URL uniques normalisées au max), `Présence` (= moyenne arithmétique des trois précédents). Le quatrième axe est donc une **composite non indépendante** des trois autres : l'aire du radar n'a aucune signification.
- La normalisation est **relative à la catégorie affichée**, donc un média national et un média international ne sont pas comparables sur le même radar.
- `reach` est absent pour `lapress.ma` et `lapresse.ca` (`null`) : le radar affiche alors 0, ce qui se lit à tort comme « portée nulle ».
- Aucun sujet, aucune tonalité, aucune relation n'est affiché par média, alors que la vue est intitulée « analyse médias ».
- Aucun bloc méthodologique, aucune période, aucune source, aucune limite dans la vue.
- Pas de tableau accessible, pas de tri, pas de fiche imprimable, pas de comparaison.

## 2. Données réellement disponibles

Période : 29 juillet → 5 août 2026. Sources : `29.07_05.08 Liste des mentions - Presse Marocaine FR_AR.xlsx` (presse) ; corpus Partis et Leaders ; corpus Opinion citoyenne. Exclusions : `wikipedia.org`, `wiktionary.org`. Déduplication : URL canonique unique ; 2 168 lignes presse → 2 168 URL uniques ; 438 doublons retirés au total du corpus ; 0 conflit de tonalité sur la presse.

Deux catégories, 10 médias chacune.

Presse nationale (URL uniques · portée) : lapress.ma 99 · indisponible ; hespress.com 83 · 89 874 ; leseco.ma 80 · 69 847 ; lebrief.ma 73 · 7 803 ; le360.ma 68 · 143 018 ; ar.hibapress.com 65 · 40 334 ; lodj.ma 65 · 4 995 ; lareleve.ma 59 · 8 858 ; anrt.ma 54 · 40 334 ; fnh.ma 52 · 47 640. Total affiché : 708 URL uniques.

Presse internationale (URL uniques · portée) : prnewswire.com 1 · 81 642 ; lemonde.fr 1 · 65 827 ; radiofrance.fr 1 · 19 558 ; aljazeera.net 3 · 86 497 ; ouest-france.fr 1 · 11 631 ; dw.com 6 · 171 029 ; courrierinternational.com 5 · 2 549 ; huffingtonpost.fr 2 · 5 560 ; lapresse.ca 1 · indisponible ; 20min.ch 3 · 42 949. Total affiché : 24 URL uniques.

Champ par média : `name`, `party` (catégorie), `role`, `delta` (URL uniques), `reach`, `score`, `color`, `summary`.

Série temporelle disponible : un seul volume quotidien global de la presse marocaine (8 valeurs, 29.07 → 05.08), **non ventilable par média**.

## 3. Données et formules absentes — à ne pas simuler

- Formule du champ `score` / « influence /100 » : **absente**. Non documentée, non reproductible.
- Origine et méthode de mesure de `reach` : **absente** (le libellé actuel dit « portée estimée » sans méthode). Manquante pour 2 médias.
- Sujets par média : **absents**. Les 7 sujets n'existent qu'au niveau des acteurs et de l'opinion.
- Tonalité par média : **absente** (0 conflit de tonalité mesuré sur la presse, mais aucune ventilation positive/neutre/négative par domaine).
- Relations média-acteur, média-sujet, citation : **absentes**. Le graphe canonique ne contient que 28 nœuds (9 partis, 9 leaders, 7 sujets, 3 tonalités) et 128 relations entre eux : **aucun nœud média**.
- Série temporelle par média, langue par média, format, audience certifiée, ligne éditoriale : **absents**.

Conséquence directe : le « graphe relationnel média-sujet » demandé **n'est pas constructible** à partir des données canoniques. Toute mise en réseau média-sujet serait une invention. Voir la proposition de substitution au point 8.

## 4. Classement principal proposé

Métrique de rang : **URL uniques dédupliquées** (`delta`), seule métrique documentée et reproductible.

Titre de la vue : « Présence documentée dans le corpus ». Sous-titre : « Classement par URL uniques dédupliquées ».

Colonnes : rang · média · catégorie · URL uniques · part de présence relative dans sa catégorie (URL du média ÷ total URL de la catégorie, en %) · portée déclarée (affichée comme donnée fournie non recalculée, ou « Donnée indisponible »).

Le score `score` est **retiré du classement, du rang et de tout libellé**. Il n'est pas affiché comme métrique. Mention explicite dans le module méthodologique : « Un score d'influence figure dans les fichiers sources ; sa formule n'étant pas documentée, il n'est pas utilisé dans cette vue. »

Les deux catégories restent classées **séparément** : 708 URL contre 24 URL, corpus et périmètres de collecte différents ; aucun classement mixte, aucune normalisation croisée.

## 5. Deux variantes de design

### Variante A — « Classement documenté » (recommandée)
Tableau-classement premium à barres horizontales, tri, recherche, sélection synchronisée, fiche analytique à droite, accès méthode.
- Avantages : chaque encodage repose sur une métrique documentée ; lecture immédiate pour une rédaction ; comparaison honnête ; entièrement accessible ; robuste face aux données manquantes.
- Limites : moins spectaculaire qu'un graphe ; ne montre pas de structure relationnelle (qui n'existe pas dans les données).

### Variante B — Remplacement du radar
Le radar est **supprimé** : ses axes ne sont ni indépendants ni comparables. Remplacement par un **profil à barres alignées** (small multiples), une ligne par métrique documentée, échelle explicite et valeur brute affichée :
1. URL uniques (valeur brute + barre normalisée au maximum de la catégorie, maximum nommé).
2. Part de présence relative dans la catégorie (%).
3. Portée déclarée (valeur brute + barre normalisée, ou état « Donnée indisponible » avec barre absente, jamais 0).
Comparaison de deux médias maximum : barres appariées dans le même cadre, écart affiché en valeur absolue et en points de pourcentage.
- Avantages : chaque axe reste lisible séparément, aucune aire trompeuse, les données manquantes sont représentables.
- Limites : moins « signature » visuellement qu'un radar ; nécessite un libellé d'échelle par ligne.

**Recommandation finale : Variante A comme structure de la vue, Variante B comme contenu de la fiche analytique.** Le radar actuel est retiré.

## 6. Wireframe desktop

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ANALYSE MÉDIAS · 29.07 → 05.08.2026                                      │
│ Présence documentée dans le corpus                                       │
│ Chapeau éditorial 3 lignes · [COMPRENDRE LE CLASSEMENT ▸]                │
├──────────────────────────────────────────────────────────────────────────┤
│ [PRESSE NATIONALE (10)] [PRESSE INTERNATIONALE (10)]   Recherche […]      │
│ Tri : URL uniques ▾ | Média A→Z | Portée déclarée                         │
├───────────────────────────────────────────┬──────────────────────────────┤
│ #  MÉDIA           URL   PART   PORTÉE    │ FICHE ANALYTIQUE             │
│ 01 lapress.ma  ▓▓▓▓▓▓▓ 99  14,0%   n. d.  │ lapress.ma                   │
│ 02 hespress.com▓▓▓▓▓▓ 83  11,7%  89 874   │ Presse nationale · rang 01/10│
│ 03 leseco.ma   ▓▓▓▓▓▓ 80  11,3%  69 847   │ URL uniques 99               │
│ …                                          │ Part de présence 14,0 %      │
│ ─ Total catégorie : 708 URL uniques ─      │ Portée déclarée : indispo.   │
│                                            │ Profil à barres alignées     │
│ [Comparer deux médias]  [Voir en tableau]  │ Sujets : indisponibles       │
│                                            │ Tonalité : indisponible      │
│                                            │ Relations : indisponibles    │
│                                            │ Période · Source · Limites   │
├───────────────────────────────────────────┴──────────────────────────────┤
│ RÉPARTITION DE LA PRÉSENCE (barres empilées 10 médias + reste)            │
├──────────────────────────────────────────────────────────────────────────┤
│ COMPRENDRE LE CLASSEMENT — 11 rubriques dépliables + avertissement        │
└──────────────────────────────────────────────────────────────────────────┘
```

## 7. Wireframe mobile

```text
ANALYSE MÉDIAS · 29.07 → 05.08.2026
Présence documentée dans le corpus
[Comprendre le classement ▸]
[NATIONALE] [INTERNATIONALE]   [Recherche]
Tri : URL uniques ▾
01 lapress.ma      99 ▓▓▓▓▓▓▓  14,0 %
02 hespress.com    83 ▓▓▓▓▓▓   11,7 %
  ↳ tap → fiche en panneau plein écran
     (Échap / bouton fermer, retour au rang sélectionné)
Total catégorie : 708 URL uniques
Répartition (barres empilées, défilement horizontal)
Comprendre le classement (accordéon)
```

## 8. Substitution du graphe relationnel

Les relations média-sujet et média-acteur étant absentes, aucun graphe n'est proposé. À sa place, deux modules rigoureux :

1. **Répartition de la présence** : barres empilées de la part de présence des 10 médias dans le total de leur catégorie, avec valeurs brutes au survol et équivalent tabulaire.
2. **Encadré « Ce que le corpus ne relie pas »** : mention explicite que le graphe canonique ne contient aucun nœud média, et que toute relation média-acteur, média-sujet, citation, coordination ou ligne éditoriale serait une extrapolation. Un emplacement est réservé pour une future version si une ventilation par média est fournie.

## 9. Fiche analytique du média

Nom officiel (jamais traduit, isolé en `bdi` en RTL) · catégorie · rang selon URL uniques · URL uniques · part de présence relative · portée déclarée ou « Donnée indisponible » · profil à barres alignées · sujets principaux : « Donnée indisponible dans le corpus presse » · tonalité : « Donnée indisponible dans le corpus presse » · relations documentées : « Aucune relation média présente dans le graphe canonique » · période · source (nom du fichier d'export) · méthode (URL canonique unique, déduplication, exclusions) · limites. Aucun `null`, `undefined`, `NaN`, aucune valeur vide.

## 10. Module « Comprendre le classement »

A. Pourquoi ce classement est utile — B. Ce qui est classé — C. Comment le rang est calculé — D. Comment lire les visualisations — E. Ce que le corpus ne relie pas (remplace « comment lire le graphe ») — F. Conclusions autorisées — G. Conclusions interdites — H. Sources et période — I. Déduplication et exclusions — J. Définitions des métriques — K. Date de mise à jour.

Avertissement affiché en tête du module et rappelé en pied de classement :
« Ce classement mesure la présence documentée des médias dans le corpus étudié. Il ne mesure pas automatiquement leur audience, leur crédibilité, leur qualité éditoriale ou leur influence globale. »

Conclusions autorisées : la fréquence de présence relative d'un domaine dans un corpus délimité, sur huit jours. Conclusions interdites : audience, crédibilité, qualité éditoriale, influence, orientation, part de marché, comparaison national/international.

## 11. Contenus éditoriaux (français, publiables)

Chapeau : « Cette vue recense les médias présents dans le corpus de veille du 29 juillet au 5 août 2026. Le classement repose sur une seule métrique : le nombre d'URL canoniques uniques, après déduplication et exclusion des sources encyclopédiques. Il permet de situer quels domaines ont porté la couverture du débat sur cette période, et à quelle intensité relative. Il ne mesure ni l'audience, ni la crédibilité, ni la qualité éditoriale des médias cités. Presse nationale et presse internationale sont classées séparément, leurs périmètres de collecte étant distincts. »

Note de rang : « Rang établi sur les URL uniques dédupliquées. Un score d'influence figure dans les fichiers sources ; sa formule n'étant pas documentée, il n'est ni affiché ni utilisé. »

## 12. Encodages visuels

Longueur de barre = URL uniques, normalisée au maximum de la catégorie (maximum nommé sous le graphique). Aucune couleur porteuse de jugement : barres en or `#C9A84C` sur papier `#FAF6ED`, média sélectionné en navy `#0D1B2A`, média comparé en or atténué `#8A7537`. Séparateurs `#D9CFBC`. Alerte `#E06D4F` réservée aux avertissements méthodologiques. Absence de donnée = zone hachurée neutre + libellé, jamais une barre nulle. Radius 2 px. Thème clair par défaut, thème sombre sur les mêmes tokens (papier → `#142235`, texte → `#F5F1E8`). Pictogrammes Lucide en SVG inline : `Newspaper`, `Globe`, `ArrowUpDown`, `Search`, `Info`, `AlertTriangle`, `Scale`. Transitions 200 ms, `prefers-reduced-motion` respecté, aucun mouvement permanent.

## 13. Interactions

Sélection d'un média (clic, Entrée, Espace) → classement, barres et fiche synchronisés. Comparaison de deux médias maximum, troisième sélection refusée avec message. Filtre par catégorie (données disponibles) ; aucun filtre par sujet (données absentes). Recherche incrémentale sur le nom de domaine avec compte de résultats et état vide explicite. Tri sur URL uniques, nom, portée déclarée ; les médias sans portée sont regroupés en fin de tri avec libellé, jamais en 0. Tooltips documentés indiquant métrique, valeur brute et dénominateur. Navigation clavier : Tab jusqu'à la liste, ↑ ↓ entre rangs, Entrée pour sélectionner, Échap ferme fiche mobile, comparaison et module méthodologique. Focus visible or 2 px. Mode tableau accessible : `table` sémantique avec `scope`, `aria-sort`, légende, équivalent de chaque graphique.

## 14. Fichiers potentiellement concernés

- `public/intelligence-politique/index.html` — section `#acteurs` uniquement.
- `public/intelligence-politique/styles.css` (ou un `media-view.css` dédié) — styles de la vue MÉDIA.
- `public/intelligence-politique/script.js` — suppression de `drawRadar` et de l'axe composite de `prepareMedia` pour la vue MÉDIA, rendu du classement, de la fiche et du module méthodologique.
- `public/intelligence-politique/i18n.js` — libellés FR/EN/AR.
- `src/pages/IntelligencePolitiquePage.tsx` — incrément de version du cache uniquement.

Aucune modification de `canonical-monitoring-data.js`, du backend, de Supabase, ni des onglets À PROPOS, Strategic Signals, OPINION, TABLEAU DE BORD, CLASSEMENT, ARCHITECTURE.

## 15. Risques

Retrait du radar et du score « influence » : perte d'un visuel attendu, compensée par le profil à barres et l'explication méthodologique. Barre de progression relative pouvant être lue comme part de marché : dénominateur affiché systématiquement. Presse internationale à très faibles volumes (1 à 6 URL) : risque de sur-interprétation, atténué par un avertissement dédié dans cette catégorie. Régression de style due au cache d'iframe : incrément de version obligatoire. Débordement des noms de domaine latins en RTL : isolation `bdi dir="ltr"`.

## 16. Rollback

Retour au commit `d84381d`. Modifications confinées à quatre fichiers de `public/intelligence-politique/` plus l'incrément de version ; aucune migration, aucune donnée touchée, donc revert direct sans effet de bord.

## 17. Critères d'acceptation

Rang exclusivement fondé sur les URL uniques. Mot « influence » absent de la vue MÉDIA. Radar supprimé. Aucun `null`/`undefined`/`NaN`/champ vide affiché. Les deux médias sans portée affichent « Donnée indisponible ». Totaux vérifiés : 708 URL nationales, 24 URL internationales, 10 + 10 médias. Aucune relation média-acteur ou média-sujet affichée. Module méthodologique complet et avertissement présents. Chaque graphique doublé d'un équivalent tabulaire. Parcours clavier complet, focus visible, Échap fonctionnel. 0 erreur console, 0 débordement horizontal.

## 18. Plan de tests

FR, EN, AR × clair/sombre × desktop 1280 et mobile 390 : 12 combinaisons capturées. RTL : ordre des colonnes inversé, barres alignées à droite, noms de domaine en `bdi` non inversés, chiffres non inversés. Clavier : parcours complet sans souris, sélection, comparaison, ouverture/fermeture du module, Échap. Données : vérification des 20 médias, des deux totaux, des deux portées absentes. Non-régression : ouverture successive des sept onglets, redessin des canvas OPINION et Strategic Signals après changement de thème et de langue.

En attente de votre approbation avant toute écriture de fichier.
