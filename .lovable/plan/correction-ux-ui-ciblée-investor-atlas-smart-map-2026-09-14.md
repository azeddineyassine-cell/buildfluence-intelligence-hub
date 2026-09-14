# Correction UX/UI ciblée — Investor Atlas Smart Map

## Périmètre garanti

La correction restera limitée à **Prototypes > Investor Atlas · Démonstrateur GIS**. Les autres onglets, prototypes, navigation, carte mondiale, accès Premium, langues et thèmes globaux ne seront pas modifiés.

Avant changement, l’état actuel sera conservé comme référence locale et les identifiants utilisés par `renderAll()` resteront présents. Toute nouvelle référence à l’interface sera protégée contre les éléments absents.

## Audit actuel

- L’Atlas vit dans `public/benchmark-api-vs-amdie.html` : styles `.iat-*` / `.atlas-*`, bloc `#atlas`, traductions Atlas, données `ATLAS_GEO` / `ATLAS_DATA` / `ATLAS_POI`, fonctions et état `renderAtlas()` / `iat*`.
- Les 12 géométries régionales, populations RGPH 2024, incitations, gouvernance, actifs et sources déjà vérifiés seront conservés.
- La vue Satellite est un état factice piloté par `iatMode`, `#iatModes` et `#iatSat`; elle peut être retirée sans toucher aux autres modules.
- Les actifs sont actuellement dessinés comme des `<circle>` SVG colorés. `lucide-react` est déjà installé dans le projet.
- L’Atlas reste aujourd’hui contraint par la largeur générale de `.wrap`, avec une carte trop petite et des filtres occupant le premier niveau visuel.

## Intervention

1. **Une seule vue décisionnelle**
   - Retirer le bouton Satellite, son panneau, ses messages et toute logique `iatMode` associée.
   - Afficher l’eyebrow localisé « SMART MAP · VUE DÉCISIONNELLE » / “SMART MAP · DECISION VIEW”.

2. **Composition immersive**
   - Donner au seul bloc Atlas une largeur `min(90vw, 1720px)` centrée.
   - Installer une composition desktop proche de 70/30, avec une scène cartographique de 680 px minimum, puis 580 px aux écrans intermédiaires.
   - Réduire les marges et cadres sans fonction, sans modifier le rythme des autres sections.

3. **Carte d’attractivité**
   - Préserver exactement les 12 tracés régionaux et la continuité nord-sud.
   - Ajouter texture ivoire, relief topographique discret, littoral et limites fines.
   - Mettre en scène sélection, survol, intensité des filtres et zoom animé vers la région choisie en 180–250 ms.
   - Autour de la région sélectionnée, révéler les actifs, pôles, secteurs et institutions déjà présents dans les données vérifiées.

4. **Pictogrammes Lucide**
   - Remplacer tous les marqueurs circulaires par des pictogrammes vectoriels locaux correspondant aux catégories demandées.
   - Utiliser `lucide-react` dans un composant Atlas dédié monté uniquement dans la zone cartographique, sans appel réseau ni nouvelle donnée.
   - Conserver les coordonnées, filtres, fiches, clavier, tactile et sélection existants.

5. **Filtres en accordéons**
   - Organiser les filtres en cinq accordéons : Région, Secteur du projet, Incitations, Atouts territoriaux et Acteurs publics.
   - Tous seront fermés par défaut ; un seul pourra être ouvert à la fois sur desktop.
   - Fermer l’accordéon actif par clic extérieur ou touche Échap.
   - Afficher un compteur de sélections sur chaque déclencheur et des puces actives compactes.
   - Conserver une recherche libre et proposer distinctement Effacer et Réinitialiser.
   - Sur mobile, regrouper les filtres dans un tiroir accessible, refermable et navigable au clavier.

6. **Quatre couches cartographiques**
   - Proposer exactement : Incitations, Écosystèmes, Actifs stratégiques et Gouvernance.
   - Renommer partout dans l’Atlas « Localisations clés » en « Actifs stratégiques » et traduire l’équivalent anglais.
   - Chaque couche produira une variation visuelle immédiate et identifiable sur la carte : intensité territoriale, constellations sectorielles, pictogrammes d’actifs ou institutions publiques.

7. **Passeport régional valorisant**
   - Ajouter une promesse territoriale spécifique, dérivée uniquement des données régionales vérifiées existantes.
   - Présenter quatre indicateurs synthétiques comparables, puis six blocs repliables : identité, potentiel projet, incitations, actifs/connectivité, acteurs publics, sources et méthodologie.
   - Structurer la Lecture Buildfluence en constats, conditions de pertinence et points à confirmer, sans score artificiel.
   - Ajouter les actions Comparer, Simuler et Consulter les acteurs publics.

8. **Acteurs publics et liens web**
   - Afficher pour chacune des 12 régions le CRI avec `BriefcaseBusiness`, le Conseil régional avec `Landmark` et la Wilaya avec `Building2`.
   - Pour chaque organisme : nom officiel, rôle, territoire couvert, URL officielle vérifiée et bouton « Accéder au site officiel ».
   - Ouvrir les liens dans un nouvel onglet avec `target="_blank"` et `rel="noopener noreferrer"`.
   - Ne jamais inventer d’URL ; afficher « Site officiel à confirmer » lorsqu’aucune source officielle fiable n’est disponible.

9. **Fiabilité des données**
   - Conserver les statuts Vérifiée, Indicative et À consolider sous une forme discrète dans la vue principale.
   - Déplacer le détail de traçabilité dans « Sources et méthodologie » : organisme, année, URL, date de vérification et statut.
   - Ne supprimer, réinterpréter ni compléter arbitrairement aucune donnée déjà vérifiée.

10. **Cohérence et synchronisation**
   - Synchroniser systématiquement région sélectionnée, filtres, marqueurs, actifs, passeport et comparaison.
   - Corriger explicitement l’association du Golf Royal Dar Es Salam : Rabat-Salé-Kénitra, jamais Tanger-Tétouan-Al Hoceïma.
   - Éliminer les états incohérents et garantir qu’aucun panneau vide ne subsiste, y compris après combinaison ou réinitialisation des filtres.

11. **Mode de découverte**
   - Au chargement : aucun filtre arbitraire présélectionné et vue nationale complète.
   - Proposer trois entrées : Explorer par région, Partir d’un secteur et Identifier les meilleurs actifs.
   - Afficher un résumé dynamique et factuel des résultats et critères actifs.

12. **Conclusion**
   - Remplacer l’ancien « À retenir » par le titre : « De la lecture territoriale à la présélection d’implantation ».
   - Utiliser exactement le texte : « L’Investor Atlas croise les caractéristiques du projet, les capacités territoriales, les incitations applicables et les interlocuteurs publics. Il transforme la carte en première étape d’un parcours d’investissement documenté et activable. »
   - Fournir la traduction anglaise dans le seul périmètre Atlas.

13. **Contrôle bloquant des pictogrammes**
   - Aucun cercle SVG coloré ne subsistera comme représentation d’un actif, secteur ou acteur public.
   - `Plane` sera utilisé pour chaque aéroport ; chaque autre catégorie utilisera son pictogramme Lucide spécifique selon le registre défini.
   - Les pictogrammes conserveront contraste et lisibilité en thèmes clair et sombre.
   - Chaque marqueur disposera d’un tooltip et d’une interaction au clic, au clavier et au toucher.
   - Les marqueurs proches seront regroupés en clusters fonctionnels, développables pour accéder aux actifs individuels.

## Vérifications

- Les 12 régions, filtres combinés, passeport, comparaison et CTA Simulateur restent fonctionnels.
- Aucun point coloré, bouton Satellite, panneau indisponible ou message de clé cartographique ne subsiste.
- Les cinq accordéons, leur exclusivité desktop, le clic extérieur, Échap, les compteurs, la recherche, Effacer, Réinitialiser et le tiroir mobile sont vérifiés.
- Les quatre couches produisent chacune un changement visuel distinct ; les clusters et tous les pictogrammes sont fonctionnels.
- Les acteurs publics, liens officiels sécurisés, statuts de fiabilité et détails de sources sont contrôlés région par région.
- La synchronisation région/filtres/marqueurs/actifs/passeport/comparaison est testée, notamment Golf Royal Dar Es Salam dans Rabat-Salé-Kénitra.
- Vérification FR/EN, clair/sombre, clavier, tactile, mouvement réduit et largeurs 1440/1024/768/390.
- Contrôle des six onglets principaux, des deux autres prototypes, du verrouillage Premium et de la console.
