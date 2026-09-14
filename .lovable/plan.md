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

## Vérifications

- Les 12 régions, filtres combinés, passeport, comparaison et CTA Simulateur restent fonctionnels.
- Aucun point coloré, bouton Satellite, panneau indisponible ou message de clé cartographique ne subsiste.
- Vérification FR/EN, clair/sombre, clavier, tactile, mouvement réduit et largeurs 1440/1024/768/390.
- Contrôle des six onglets principaux, des deux autres prototypes, du verrouillage Premium et de la console.
