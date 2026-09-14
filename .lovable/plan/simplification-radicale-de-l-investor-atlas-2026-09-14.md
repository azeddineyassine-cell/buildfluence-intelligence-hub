# Simplification radicale de l'Investor Atlas

## Périmètre

Uniquement **PROTOTYPES > Investor Atlas · Démonstrateur GIS**.

Fichiers concernés : `public/benchmark-api-vs-amdie.html` (blocs `#atlas`, styles `.atlas-*` / `.iat-*`, traductions Atlas, données `ATLAS_GEO` / `ATLAS_DATA` / `ATLAS_POI`, fonctions `renderAtlas()` et `iat*`) et `src/components/benchmark/InvestorAtlasMap.tsx`.

Aucun autre onglet, prototype, menu, carte mondiale, thème global ou verrouillage Premium ne sera touché. Aucune publication automatique. Toute référence à l'interface restera protégée pour ne jamais interrompre les autres onglets.

## Ce qui est supprimé

- les cinq menus accordéons de filtres et le tiroir mobile actuel ;
- le sélecteur de couches cartographiques concurrentes (Incitations / Écosystèmes / Actifs / Gouvernance) ;
- le passeport permanent occupant 30 % de l'écran ;
- les trois portes d'entrée « mode découverte » ;
- les rangées de puces actives redondantes ;
- le comparateur de deux régions et ses sélecteurs ;
- les badges de fiabilité affichés dans toute l'interface ;
- tout reste de vue Satellite, de message de clé cartographique et de point ou cercle coloré.

## Nouvelle composition

Largeur d'environ 94 % de l'écran. Carte de 680 à 760 px de haut selon l'écran. Aucun cadre vide.

```text
┌──────────────────────────────────────────────────────────┐
│ SMART MAP · INTELLIGENCE TERRITORIALE                    │
├───────────────┬──────────────────────────────────────────┤
│ ACTEURS       │ ÉCONOMIE : critères                      │
│ PUBLICS ET    │ ZONES ET INFRASTRUCTURES : critères      │
│ TERRITORIAUX  │ DÉMOGRAPHIE ET INCITATIONS : critères    │
├───────────────┼──────────────────────────────────────────┤
│ liste         │                                          │
│ dynamique     │           GRANDE CARTE DU MAROC          │
└───────────────┴──────────────────────────────────────────┘
```

Colonne acteurs : 250 à 290 px. Carte : tout l'espace restant. Fiche contextuelle : fenêtre flottante ouverte uniquement après sélection.

## 1. Colonne gauche : acteurs publics et territoriaux

Titre « ACTEURS PUBLICS ET TERRITORIAUX », sous-titre « Sélectionnez un interlocuteur pour afficher son territoire d'intervention. », champ de recherche simple.

Liste des douze Centres régionaux d'investissement, chaque ligne portant pictogramme institutionnel, nom, territoire et indicateur de sélection. Après sélection d'une région, révélation du Conseil régional, de la Wilaya, puis des préfectures, provinces et gestionnaires publics uniquement lorsqu'ils sont documentés.

Au clic : zoom immédiat sur la région, mise en évidence, ouverture de la fiche flottante, affichage des critères disponibles et du site officiel vérifié. Lien officiel ouvert dans un nouvel onglet de manière sécurisée ; sans URL officielle fiable, affichage de « Site officiel à confirmer ». Aucune URL ne sera inventée.

Icônes : CRI `BriefcaseBusiness`, Conseil régional `Landmark`, Wilaya `Building2`.

## 2. Trois lignes de filtres horizontaux

Boutons compacts à cocher, sans accordéon ni sous-menu, chaque clic produisant un changement immédiat sur la carte.

- **ÉCONOMIE** : Automobile, Aéronautique, Agro-industrie, Textile, Pharmacie et santé, Énergies renouvelables, Numérique et outsourcing, Logistique, Tourisme, Mines et chimie, Aquaculture, Services financiers. La sélection met en évidence les régions documentées, révèle les écosystèmes et actifs associés et atténue les territoires sans correspondance vérifiée.
- **ZONES ET INFRASTRUCTURES** : Zones industrielles, Zones d'accélération industrielle, Ports, Aéroports, Plateformes logistiques, Universités et écoles, Centres de recherche, Technopoles, Énergie, Connectivité ferroviaire, chacune avec son pictogramme distinct.
- **DÉMOGRAPHIE ET INCITATIONS** : Moins de 500 000 habitants, 500 000 à 2 millions, 2 à 5 millions, Plus de 5 millions, Prime territoriale 10 %, Prime territoriale 15 %, Hors prime territoriale. Les primes respectent leur périmètre légal au niveau province ou préfecture, sans généralisation à une région entière.

À droite : compteur de résultats et bouton « Réinitialiser ».

Un critère sans résultat vérifié est désactivé. Une combinaison sans correspondance affiche « Aucun résultat vérifié pour cette combinaison. »

## 3. Carte centrale

Les douze régions, la continuité cartographique du nord au sud, le zoom régional et l'affichage territorial des primes sont conservés. Lisibilité, contraste, survol, sélection, animation de zoom, affichage des actifs et infobulles sont renforcés.

État initial : tout le Maroc, aucun filtre, message discret « Sélectionnez un acteur ou un critère pour explorer les opportunités territoriales. »

État après sélection : zoom fluide, région active en navy avec contour gold, autres régions atténuées, actifs filtrés visibles, synthèse contextuelle ouverte sur la carte.

## 4. Pictogrammes

Registre `lucide-react` : `Plane`, `Anchor`, `Factory`, `Warehouse`, `GraduationCap`, `Microscope`, `Cpu`, `Zap`, `Sun`, `Wind`, `TrainFront`, `BriefcaseBusiness`, `Landmark`, `Building2`. Pictogramme de 18 à 20 px, conteneur de 34 à 38 px, zone cliquable d'au moins 44 px, fond navy, contour gold, icône ivory, survol et focus visibles. La couleur n'est jamais le seul moyen de différenciation ; les marqueurs proches sont décalés pour éviter toute superposition.

Au clic sur un pictogramme : nom, type, ville, région, utilité pour l'investisseur et source officielle.

## 5. Fiche flottante

Ouverte uniquement après sélection d'un acteur, d'une région ou d'un actif, fermée par une icône `X`, sans jamais masquer la majorité de la carte. Contenu maximal : nom, promesse territoriale en une phrase, population, secteurs structurants, principaux actifs, incitation applicable, acteur public compétent, source, puis les deux actions « Explorer le territoire » et « Simuler une implantation ».

Après sélection d'une région et d'un secteur, la fiche ajoute « Pourquoi ce territoire correspond à votre projet » avec trois éléments au maximum : avantage sectoriel, actif facilitateur, acteur public à contacter. Le parcours institutionnel CRI, Conseil régional, Wilaya reste lisible et la région et le secteur sélectionnés sont transmis au Simulateur d'implantation.

## 6. Données et sources

Les statuts Vérifiée, Indicative et À consolider n'apparaissent plus dans l'expérience principale, uniquement dans le détail des sources avec organisme, année et lien officiel. Une information non confirmée devient « Information à confirmer ». Aucune donnée déjà vérifiée n'est supprimée ni réinterprétée. L'association du Golf Royal Dar Es Salam est corrigée sur Rabat-Salé-Kénitra.

## 7. Design

Palette navy, gold, ivory, paper, rule et alert imposée, rayon maximal de 2 px, titres Playfair Display, labels JetBrains Mono, interface DM Sans, or pour les actions sur navy. Aucun emoji, aucun dégradé décoratif, aucun point coloré, aucune animation purement décorative, accents français préservés, pas de tiret cadratin.

## 8. Validation bloquante

Test des douze acteurs, de chaque filtre des trois lignes, de plusieurs combinaisons, de la réactivité immédiate de la carte, de l'absence de tout point coloré, de chaque pictogramme, du zoom des douze régions, des liens officiels et du transfert vers le Simulateur. Contrôle FR et EN, clair et sombre, largeurs 1440, 1024, 768 et 390 px, console sans erreur et vérification que les autres onglets sont intacts.

## Livraison

Fichiers modifiés, contrôles supprimés, filtres fonctionnels, registre des pictogrammes, liens institutionnels ajoutés, résultats de tests détaillés et captures de l'état initial, après sélection d'un CRI, puis après combinaison secteur, infrastructure et population.
