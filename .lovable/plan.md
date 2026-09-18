# Reconstruction de l'onglet FONCIER

Page : `benchmark-api-vs-amdie` — onglet **Foncier** uniquement.

## Référence

La maquette `Maquette_Foncier_MedZ.html` définit la structure, la hiérarchie et
les messages. Elle est reprise intégralement, mais **re-stylée** avec les jetons
existants de la page (clair/sombre déjà en place, radius 2px, Navy/Gold
Buildfluence). Aucun code couleur codé en dur de la maquette n'est recopié.

## Structure finale de la section (six blocs, dans cet ordre)

1. **01 · LE PASSAGE CRITIQUE** — chaîne d'implantation en trois colonnes :
   AMDIE / Morocco Now · bloc de friction central · MedZ. Logos réels
   (`/logos/amdie.png`, `/morocco-now-logo.png`, `/logos/medz.png`).
2. **02 · LA PREUVE ATTENDUE** — quatre questions investisseur
   (Localisation, Coût, Preuve, Relais) avec définition de « preuve activable ».
3. **03 · OBSERVATIONS DATÉES SUR MEDZ** — trois constats datés
   (sept. 2024, mars 2023, 2016), chacun dépliable vers son constat documenté.
   Les dates remplacent tout compteur de retard.
4. **04 · BENCHMARK FONCTIONNEL** — matrice MedZ × JTC à cinq capacités et
   quatre colonnes (Capacité / Observation MedZ / Référence JTC / Priorité),
   avec les logos MedZ et JTC en en-tête et la note explicite :
   aucun score global affiché.
5. **05 · LE GUICHET INVESTISSEUR** — parcours en quatre temps
   (Rechercher, Comparer, Simuler, Engager) et vignette « Cockpit foncier ».
6. **06 · DÉCISION** — trois chantiers prioritaires avec leur livrable, puis
   le passage aux prototypes.

## Ce qui change dans le code

| Fichier | Nature de la modification |
|---|---|
| `public/benchmark-api-vs-amdie.html` | Remplacement du balisage de `<section id="foncier">`, du bloc CSS `/* FONCIER / MedZ vs JTC */`, des libellés FR/EN de la section et des fonctions de rendu qui l'alimentent (`urgency`, `guichet`, `jtcTable`, `provoc`). |

Aucun autre fichier n'est touché : pas de nouveau composant React, pas de
nouvelle route, pas de backend.

## Points technifiés

- Les anciens blocs `.urgency` (compteurs rouges), `.guichet`, `.jtc-table`
  (étoiles et totaux) et `.provoc` sont retirés au profit du nouveau modèle ;
  les scores globaux et les étoiles disparaissent conformément à la maquette.
- Tout le texte passe par le dictionnaire FR/EN existant ; aucune chaîne codée
  en dur dans le balisage.
- Les nouveaux styles réutilisent `var(--card)`, `var(--rule)`, `var(--ink)`,
  `var(--gold)`, `var(--hero-navy)` : le mode sombre fonctionne sans règle
  dédiée supplémentaire.
- Les constats datés sont dépliables au clavier (`button` + `aria-expanded`),
  et respectent `prefers-reduced-motion`.
- Ancre `#foncier`, entrée de sous-menu et numérotation `05` conservées.

## Logos institutionnels

Quatre logos réels, aucun redessiné ni retouché :
AMDIE (`/logos/amdie.png`), Morocco Now (`/morocco-now-logo.png`),
MedZ (`/logos/medz.png`) et le logo officiel JTC que vous venez de fournir,
enregistré tel quel sous `/logos/jtc.png`.

- Hauteur d'affichage homogène, ratio conservé (`object-fit: contain`), aucune
  déformation.
- Texte alternatif « JTC Singapore » pour le logo JTC.
- Lisibilité garantie en clair comme en sombre : les logos sont posés sur une
  pastille de fond neutre claire constante, indépendante du thème, de sorte que
  le bleu JTC et le fond ne se confondent jamais.

## Contrôles après implémentation

FR/EN, clair/sombre, 1440 / 1024 / 768 / 390 px, clavier et survol,
compilation, console sans nouvelle erreur, non-régression des autres onglets
(Positionnement, Duel, Atlas, Simulateur, Comparateur, Verdict), captures
clair/sombre en desktop et mobile. Aucune publication automatique.
