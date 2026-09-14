# Refonte de l'Investor Atlas (Prototypes)

## Périmètre confirmé

Un seul fichier est concerné : `public/benchmark-api-vs-amdie.html`, et uniquement les blocs de l'Investor Atlas :
le style `.atlas-*`, les clés de traduction `atlas*`/`poi*`, les données `ATLAS_GEO` / `ATLAS_DATA` / `ATLAS_POI`,
et les fonctions `renderAtlas()` / `atlasCard()` / `atlasPoiCard()`.

Aucune modification de : Pourquoi, Positionnement, Le Duel, Foncier, Décision, les deux autres prototypes,
la navigation, la carte mondiale d'accueil, le verrouillage Premium, le clair/sombre global, ni aucun autre fichier.
Toute référence au DOM ajoutée sera protégée (null-safe) pour ne jamais interrompre l'affichage des autres onglets.

## Audit des données actuelles

- Populations : valeurs obsolètes ou inexactes dans `ATLAS_GEO` (exemples relevés : Guelmim-Oued Noun 414 489,
  Laâyoune 340 748, Dakhla 114 021, Casablanca-Settat affichée 6,83 M). Toutes les 12 valeurs seront remplacées
  par les populations légales RGPH 2024 du HCP, avec année et source affichées.
- Incitations : le zonage est aujourd'hui présenté au niveau régional (« jusqu'à 15 % » pour une région entière).
  Sera repris au niveau province/préfecture, avec les taux de la loi-cadre 03-22 et du décret 2-23-1
  (emploi 5/7/10 %, genre 3 %, métiers d'avenir 3 %, durable 3 %, intégration locale 3 %, territoriale A 10 %,
  territoriale B 15 %, sectorielle 5 %, plafond de cumul 30 % de l'investissement primable).
  L'expression « prime communale » n'apparaîtra pas.
- Actifs (ports, aéroports, universités, zones, technopoles) : conservés, mais chacun recevra un statut de
  vérification et une source (ONDA, ANP/Tanger Med, MEDZ/CRI, établissements officiels).
- Acteurs publics (CRI, Conseil régional, Wilaya) : absents aujourd'hui, à créer pour les 12 régions.
- Toute valeur non vérifiable affichera « Donnée à consolider », jamais un chiffre estimé.

## Ce qui sera construit

1. Nouveau texte d'introduction FR/EN demandé, titre conservé, et badge de fiabilité :
   « PROTOTYPE DÉCISIONNEL · DONNÉES VÉRIFIÉES ET SOURCÉES » lorsque tous les blocs affichés sont vérifiés,
   sinon « PROOF OF CONCEPT · DONNÉES PARTIELLEMENT INDICATIVES ». Le badge sera calculé, pas écrit en dur.
2. Mise en page premium deux colonnes : carte et outils ~65 %, passeport territorial ~35 %.
   Palette et typographies Buildfluence, rayon 2 px, sans dégradé ni emoji.
3. Deux modes : **Vue Décision** (par défaut) — carte vectorielle des 12 régions, territoire continu du nord
   au sud sans frontière intérieure, survol, sélection, couches, mise en évidence des filtres, regroupement des
   marqueurs denses — et **Vue Satellite**. Le bouton « Explorer ce territoire en 3D » n'apparaît que si une clé
   Google Maps est fournie par variable d'environnement et que le service se charge ; sinon repli automatique
   en satellite 2D, et si aucune clé n'est disponible la Vue Décision reste pleinement fonctionnelle avec un
   message explicite. Aucune clé ne sera écrite dans le code.
4. Barre de filtres : régions (multi + « toutes »), secteurs, acteurs publics, atouts territoriaux, incitations,
   recherche libre, compteur de résultats, puces de filtres actifs, réinitialisation, comparateur.
5. Quatre couches : Incitations (graduation + détail taux/territoire/conditions/source/date), Écosystèmes
   (constellation de hubs et liens, sans aplat régional uniforme), Actifs clés (pictogrammes SVG locaux,
   marqueurs 32–40 px, cible 44 px), Gouvernance territoriale (fiches CRI/Conseil/Wilaya).
6. Passeport territorial en 7 blocs (identité, positionnement économique, incitations, connectivité et actifs,
   acteurs publics, lecture Buildfluence spécifique à chaque région, sources) et CTA
   « Simuler une implantation dans cette région » transmettant région, secteur, actifs et langue au Simulateur.
7. Comparateur de deux régions, indicateurs de même définition/unité/année uniquement, sans score global
   artificiel, se terminant par une réponse argumentée à « Quelle région correspond le mieux au projet ? ».
8. Modèle de données : chaque valeur portera `value`, `unit`, `geographicLevel`, `referenceYear`,
   `sourceOrganization`, `sourceTitle`, `sourceUrl`, `publicationDate`, `lastVerifiedAt`, `status`.

## Accessibilité et responsive

Clavier, focus visible, libellés ARIA, tooltips accessibles, contraste AA, information jamais portée par la seule
couleur. Tests à 1440, 1024, 768 et 390 px ; sur mobile filtres repliables, carte d'abord, passeport en dessous.

## Vérifications avant livraison

Les 12 régions, chaque filtre seul puis combinés, les quatre couches, les deux vues, le repli sans clé Google,
le comparateur, le CTA Simulateur, FR/EN, clair/sombre, console sans erreur, et ouverture des six onglets
principaux pour confirmer qu'aucun contenu n'a disparu. Livraison avec fichiers modifiés, données corrigées,
catalogue des sources, données restées indicatives et captures (Vue Décision, Vue Satellite, passeport, comparateur).

## Point à confirmer

La Vue Satellite nécessite une clé cartographique. Sans connexion Google Maps configurée, je livrerai la Vue
Satellite en état indisponible explicite (Vue Décision intacte), puis l'activerai dès que la clé sera en place.
