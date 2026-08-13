# Refonte UX/UI — Matrice d'influence narrative & Orbites thématiques

Périmètre strict : onglet **Strategic Signals**, vues « Influence narrative » et « Orbites thématiques ». Aucune modification des données canoniques, du Tableau de bord, de l'Opinion, du Média, de l'Architecture ni du backend.

## 1. Analyse de l'interface actuelle

Implémentation observée (`public/intelligence-politique/strategic-signals.js` + `strategic-signals.css`) :

- **Influence narrative** : un plan en pourcentages, `x = 50 + balance/2`, `y = 8 + visibilité×0,82`, fond en trois bandes de tonalité (corail / bleu / vert). Les fiches sont placées par une boucle anti-collision qui **déplace les points de leur vraie position** (jusqu'à 30 itérations, ±4,5 %). Conséquence : la lecture positionnelle n'est plus fiable, les 28 entités se lisent comme un nuage décoratif, et il n'existe ni quadrants nommés, ni tooltip riche, ni navigation clavier, ni alternative tabulaire.
- **Orbites thématiques** : un SVG 820×470 avec anneaux concentriques autour d'un acteur. Esthétique « système solaire » : l'angle ne signifie rien, seul le rayon encode le poids relationnel, et cette convention n'est pas explicitée. Pas de zoom, pas de recentrage, pas de parcours clavier, pas de tableau équivalent.
- **Métriques réellement disponibles** (aucune autre ne doit être inventée) :
  - `urls` — URL uniques dédupliquées par entité (acteurs : `score`, sujets : `mentions`, tonalités : totaux graphe) ;
  - `visibility` — part relative /100 dans sa famille (max de la famille = 100) ;
  - `balance` — (positif − négatif) ÷ total, en % ;
  - `tones` — décomposition positif / neutre / négatif ;
  - `links` / poids de relation acteur→sujet (`value`) et nombre de relations ;
  - période unique : 29.07 → 05.08.2026. **Il n'existe pas de série temporelle** : aucun filtre temporel ne sera proposé.
  - Filtres existants conservés tels quels : Partis, Leaders, Sujets, Positif, Neutre, Négatif.
- Point de contexte technique important : cette plateforme est un **bundle statique HTML/CSS/JS** servi depuis `public/`, encapsulé côté React par `IntelligencePolitiquePage` / `IPShell`. La refonte se fera donc en HTML/CSS/JS natif dans ce bundle (React/Tailwind/Framer Motion ne s'y appliquent pas), sauf si vous préférez une réécriture React de la rubrique — voir question Q1.

## 2. Deux variantes de design

### Variante A — « Matrice analytique à quadrants + arbre relationnel radial contraint »

**Matrice.** Un plan cartésien franc, quadrillé, avec axes nommés :
- X = **Balance narrative** (−100 → +100), zéro marqué par un axe continu doré fin ;
- Y = **Visibilité relative** (0 → 100).
Quatre quadrants nommés et numérotés, différenciés **sans dépendre de la couleur** (libellé en JetBrains Mono en angle de quadrant + trame de fond distincte : uni, hachures fines 45°, pointillés, croisillons) :
- Q1 haut-droite — **PORTEURS** (forte visibilité, balance positive) ;
- Q2 haut-gauche — **SOUS TENSION** (forte visibilité, balance négative) → seul quadrant autorisé à porter l'accent d'alerte `#E06D4F` ;
- Q3 bas-gauche — **RISQUES LATENTS** ;
- Q4 bas-droite — **SIGNAUX ÉMERGENTS**.
Marqueurs : rectangles 2 px, **taille encodant uniquement `urls`** (échelle racine carrée, 4 paliers explicités en légende). Forme encodant la catégorie : carré = parti, rond = leader, losange = sujet, barre = tonalité. Position exacte, **aucun déplacement anti-collision** : les chevauchements sont gérés par opacité de bordure + mise au premier plan au survol/focus, jamais par déplacement.

**Orbites.** Arbre radial à orbites hiérarchisées : noyau = acteur ou sujet sélectionné, orbite 1 = relations directes documentées, orbite 2 = sujets co-exposés via un autre acteur. Rayon = rang de force (décile de `value`), épaisseur du lien = `value`, taille du nœud = `urls`. L'angle est réparti uniformément et **déclaré non signifiant** dans la légende.

*Avantages* : lecture décisionnelle immédiate, encodages tous justifiés, quadrants nommés = vocabulaire commun en comité. *Limites* : à 28 entités les recouvrements restent réels dans les zones denses ; l'orbite 2 dépend d'une co-occurrence dérivée qu'il faut assumer comme « dérivée » et non mesurée.

### Variante B — « Matrice + bandeau de rang, orbites en graphe de dépendance latéral »

**Matrice.** Même plan à quadrants, mais couplé à une **colonne de classement** à droite listant les entités triées par visibilité, avec micro-barre de balance : la matrice donne la topologie, la liste donne l'ordre exact. Le survol synchronise les deux.

**Orbites.** Remplacement du radial par un **graphe orienté en couches horizontales** (acteur → sujets → tonalités), type Sankey épuré : largeur de flux = `value`. Zéro ambiguïté d'encodage.

*Avantages* : lisibilité maximale à forte densité, aucun encodage décoratif, excellent en RTL (miroir simple). *Limites* : perd la métaphore « orbites » explicitement demandée dans la nomenclature de la rubrique, et rend moins visible la notion de centralité / périphérie.

## 3. Recommandation

**Variante A pour les deux vues, augmentée de deux emprunts à B** :
1. un **panneau « Classement » repliable** sous la matrice (tri visibilité / balance / URL) qui sert aussi d'alternative accessible ;
2. une **vue Tableau** commutable pour les orbites (colonnes : sujet, poids de relation, part d'exposition, tonalité dominante, URL).

Justification : A conserve la grammaire analytique de la rubrique et le vocabulaire de quadrants attendu par des décideurs, tandis que les deux emprunts couvrent la densité, l'accessibilité et le mobile sans introduire de métrique fictive.

## 4. Wireframes textuels

### Desktop (≥ 1200 px)
```text
┌ STRATEGIC SIGNALS ─────────────────────────────── 29.07 → 05.08.2026 ┐
│ [Galaxie] [Influence narrative*] [Orbites]                            │
│ FILTRES  (Partis)(Leaders)(Sujets)  (Positif)(Neutre)(Négatif)        │
├───────────────────────────────── MATRICE ────────┬──── PANNEAU ───────┤
│ VISIBILITÉ                                       │ CADRE D'ANALYSE    │
│ 100┤ Q2 SOUS TENSION      │ Q1 PORTEURS          │ ┌──────────────┐   │
│    │  ▢ hachures          │  ▢ uni               │ │ RNI          │   │
│    │        ◇             │      ●               │ │ Parti · 187  │   │
│  50┼──────────────────────┼──────────────────    │ └──────────────┘   │
│    │ Q3 RISQUES LATENTS   │ Q4 ÉMERGENTS         │ Visibilité   100   │
│    │  ▢ pointillés        │  ▢ croisillons       │ Balance     −32 %  │
│   0└──────────────────────┴──────────────────    │ URL uniques  187   │
│      −100      BALANCE NARRATIVE       +100      │ ▰▰▰▱▱ tonalités    │
│ LÉGENDE  ■parti ●leader ◆sujet ▬tonalité         │ LECTURE            │
│          taille = URL uniques (4 paliers)        │ · relations top 2  │
│ ▸ CLASSEMENT (28)  tri: visibilité ▾             │ MÉTHODE            │
└──────────────────────────────────────────────────┴────────────────────┘
```

```text
┌ ORBITES THÉMATIQUES ──────────── [Graphe*] [Tableau] ┬── PANNEAU ─────┐
│ NOYAU  ( PARTIS ▾ )  ( LEADERS ▾ )                   │ RELATION       │
│                                                      │ RNI ↔ Sebta    │
│         ◇ Sebta ──────────┐        ⟲ recentrer       │ poids 954      │
│   ◇ Économie ──── ( RNI ) ┼── ◇ Éducation   +  −     │ 34 % exposition│
│         ◇ Santé ──────────┘        ⌂ réinit.         │ ton dominant − │
│   orbite 1 = relation directe · orbite 2 = co-exposé │                │
│   épaisseur = poids · taille = URL · angle non signif.│               │
└──────────────────────────────────────────────────────┴────────────────┘
```

### Mobile (< 768 px)
```text
[Influence narrative ▾]        ← sélecteur de vue compact
FILTRES  ⌄ (accordéon)
┌ VUE FOCALISÉE ───────────────┐
│ Quadrant : Q2 SOUS TENSION ▾ │  ← navigation par quadrant
│ 1 ● Akhannouch  V100  −28 %  │
│ 2 ◆ Sebta       V 96  −41 %  │
│ 3 ■ RNI         V 87  −32 %  │
└──────────────────────────────┘
[ Voir la matrice en plein écran ]   ← optionnel, pinch-zoom
Panneau d'analyse empilé en dessous.
```
Sur mobile, les orbites basculent par défaut sur la **vue Tableau** ; le graphe reste accessible en plein écran.

## 5. Hiérarchie visuelle, interactions, états

**Hiérarchie** : 1) titre de vue (Playfair Display 700) → 2) axes et noms de quadrants (JetBrains Mono 600, capitales espacées 0,08em) → 3) marqueurs → 4) légende et méthode (DM Sans, `--muted`).

**Interactions** :
- survol → surélévation 2 px, mise au premier plan, tooltip ;
- clic → sélection unique, synchronise matrice + orbites + panneau droit ;
- `Tab` → parcours des marqueurs par rang de visibilité décroissant ; `←/→` navigue dans le quadrant courant, `Entrée` sélectionne, `Échap` désélectionne ;
- anneau de focus doré 2 px, jamais retiré ;
- orbites : boutons **recentrer**, **zoom +/−**, **réinitialiser** (icônes lucide : `crosshair`, `zoom-in`, `zoom-out`, `rotate-ccw`, `table`, `network`).

**Tooltip détaillé** (contenu strictement dérivé des données) : nom, catégorie, URL uniques, visibilité /100, balance %, répartition positif/neutre/négatif, sujet principal, nombre de relations, période.

**États** : chargement (squelette de grille + libellés d'axes, sans spinner) ; vide après filtrage (message « Aucune entité active pour ces filtres » + bouton *réactiver tous les filtres*) ; donnée indisponible (mention « Non disponible », jamais 0) ; erreur de chargement des données canoniques (bloc sobre avec relance).

## 6. Signification de chaque encodage

| Encodage | Signification | Source |
|---|---|---|
| Position X | Balance narrative (−100 → +100) | `(pos − neg) ÷ total` |
| Position Y | Visibilité relative /100 | part du max de la famille |
| Taille du marqueur | URL uniques (échelle √, 4 paliers) | `urls` |
| Forme du marqueur | Catégorie (parti / leader / sujet / tonalité) | `kind` |
| Trame du quadrant | Quadrant analytique | dérivé X/Y |
| Rouge `#E06D4F` | Uniquement alerte Q2 sous tension | dérivé |
| Rayon d'orbite | Rang de force de la relation | `value` |
| Épaisseur de lien | Poids de relation | `value` |
| Angle | **Non signifiant** (déclaré en légende) | — |

Aucun encodage ne mélange fréquence, portée, influence, sentiment et co-occurrence : la balance est explicitement du sentiment agrégé, la visibilité une part de fréquence documentée, le poids de relation une co-exposition documentée.

## 7. Composants et fichiers concernés

- `public/intelligence-politique/strategic-signals.js` — vues `positions` et `orbits`, tooltips, clavier, tri, vue tableau, redraw sur `bf:theme` et `resize`.
- `public/intelligence-politique/strategic-signals.css` — quadrants, trames, marqueurs 2 px, tokens clair/sombre, surcharges RTL, points de rupture 1000 / 768 / 360 px.
- `public/intelligence-politique/i18n.js` — nouvelles clés FR/EN/AR (quadrants, légende, contrôles, tableau, états), isolation `<bdi>` pour les termes latins en arabe.
- Non modifiés : `canonical-monitoring-data.js`, `script.js`, `monitoring.css`, `opinion-insights.*`, et tout le code React hors `IntelligencePolitiquePage` (aucune modification prévue).

## 8. Critères d'acceptation et plan de tests

Critères :
1. les 28 entités restent présentes filtres tous actifs (9 partis, 9 leaders, 7 sujets, 3 tonalités) ;
2. aucune valeur canonique modifiée ; aucun chiffre recalculé ;
3. position des marqueurs = valeurs exactes, sans déplacement anti-collision ;
4. quadrants identifiables en niveaux de gris ;
5. parcours clavier complet et tooltips visibles au focus ;
6. alternative tabulaire disponible dans les deux vues ;
7. FR / EN / AR + RTL corrects ; clair / sombre lisibles (contraste ≥ 4,5:1 sur le texte) ;
8. redessin correct au changement de thème et au redimensionnement ;
9. aucun débordement horizontal à 1440 / 1024 / 834 / 360 px ;
10. console : 0 erreur.

Plan de tests : Playwright sur 12 combinaisons (3 langues × 2 thèmes × 2 vues), captures desktop et mobile ; test de comptage d'entités par filtre ; test clavier `Tab`/`Entrée`/`Échap` ; test de synchronisation sélection matrice ↔ orbites ↔ panneau ; test de bascule de thème avec vérification des couleurs recalculées ; relevé console.

## 9. Questions ouvertes

1. La rubrique est aujourd'hui un bundle statique dans `public/`. Je propose de refondre en HTML/CSS/JS natif dans ce bundle (cohérent avec l'existant, aucun risque de régression). Confirmez-vous, ou souhaitez-vous une réécriture React/TS/Tailwind/Framer Motion de ces deux vues ?
2. Les noms de quadrants proposés (PORTEURS / SOUS TENSION / RISQUES LATENTS / SIGNAUX ÉMERGENTS) vous conviennent-ils, et quel seuil de visibilité sépare haut et bas : 50 ou la médiane observée ?
3. Aucune série temporelle n'existe dans les données : je n'ajoute donc aucun filtre temporel. Confirmez-vous ?
4. L'orbite 2 (« sujets co-exposés via un autre acteur ») est une relation **dérivée** des relations documentées. La conservez-vous, avec mention explicite « relation dérivée », ou la supprime-t-on pour rester strictement au documenté ?
5. Les portraits `person-*.png` doivent-ils rester dans la matrice, ou passe-t-on aux avatars génériques SVG comme ailleurs sur la plateforme ?
