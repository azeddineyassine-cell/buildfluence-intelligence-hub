# Lot 3 — STRATEGIC SIGNALS > Galaxie décisionnelle (conception seule)

Commit de référence = version publiée : **`aa2e89a` — « Corrigé preview des sections »** (HEAD actuel). Tout rollback de ce lot revient à cet état.

Question décisionnelle : « Quels acteurs et sujets structurent le débat, et par quelles relations documentées ? »

## 1. Audit actualisé de l'existant

`public/intelligence-politique/strategic-signals.js` (lignes 116-141) :

- 4 secteurs angulaires en dur (`positionSector`, rayons 285 / 205 / 170 / 305) : les partis sont à l'extérieur, les sujets au centre — l'inverse de la hiérarchie décisionnelle, et les tonalités (r=305) sortent des couronnes d'acteurs.
- Chaque lien est une courbe quadratique dont le point de contrôle est le centre exact (`Q430,325`) : les 128 liens se superposent en un faisceau central illisible, et deux nœuds voisins semblent liés alors qu'ils ne le sont pas.
- Les types canoniques `influence / alliance / proximite / opposition` sont réécrits en `topic / positive / neutral / negative` (ligne 117) : le type de relation documenté est perdu à l'affichage.
- Aucun zoom, recentrage, réinitialisation, plein écran, recherche ni tableau accessible. Un seul `click` par nœud, pas de `tabindex`, pas de rôle ARIA, pas de tooltip.
- Aucune légende pédagogique : ni la signification du rayon, ni celle de la taille, ni l'avertissement anti-surinterprétation.
- viewBox 920×650 fixe : sur mobile les libellés se chevauchent et le SVG se réduit sans reflow.

## 2. Données réellement disponibles (vérifiées dans `canonical-monitoring-data.js`)

- **28 nœuds** : 9 partis, 9 acteurs (leaders), 7 sujets, 3 nœuds de tonalité (Positive 1 906, Neutre 1 784, Négative 3 731). Champs : `name`, `group`, `mentions`.
- **128 relations** `[a, b, value, type]`, types réellement présents : `influence` 52, `alliance` 30, `proximite` 25, `opposition` 21.
- Corpus : `graph.documents` 7 421 URL uniques ; `actorDocuments` 2 060 ; `opinionDocuments` 5 498 ; période 29.07 → 05.08.2026 ; exclusions wikipedia/wiktionary ; définition « une occurrence = une URL canonique unique ».
- Par parti / leader (`politicalParties`, `leaders`) : `canonicalName`, `score` (URL uniques), `tones {positive, neutral, negative}`, `color`. Par sujet (`topics`) : `mentions` + `tones`. `reach` et `delta` ne sont pas exploitables (`reach: null`, `delta = score`).
- **Absent** : série temporelle, sentiment par relation, géographie, données de sondage. Aucun filtre temporel, aucune tendance ne sera affiché.

## 3. Signification des catégories et des relations

| Catégorie | Sens | Nombre |
|---|---|---|
| Parti | Organisation politique citée | 9 |
| Leader | Personnalité politique citée | 9 |
| Sujet | Thème du débat public | 7 |
| Tonalité | Polarité documentée du corpus Opinion | 3 |

| Type canonique | Libellé affiché | Sens strict |
|---|---|---|
| `influence` | Exposition documentée | l'acteur et le sujet cooccurrent dans N URL uniques |
| `alliance` | Cooccurrence positive | sujet ↔ tonalité positive |
| `proximite` | Cooccurrence neutre | sujet ↔ tonalité neutre |
| `opposition` | Cooccurrence négative | sujet ↔ tonalité négative |

Les libellés « alliance / opposition » ne seront **jamais affichés tels quels** : ils décrivent une polarité de corpus, pas une position politique. Aucune cooccurrence n'est présentée comme influence, causalité, popularité ou intention de vote.

### Métriques dérivées — approbation requise
Aucune n'est implémentée sans votre accord explicite :
1. **Balance narrative** = (positif − négatif) ÷ total, en % — déjà en usage ailleurs, réutilisée à l'identique.
2. **Visibilité relative** = `mentions` ÷ max(mentions de la même catégorie) × 100 — déjà en usage.
3. **Degré documenté** (proposé, remplace toute « centralité ») = nombre de relations documentées du nœud. Formule : `deg(n) = |{e : e.a = n ou e.b = n}|`. Simple, vérifiable, non normalisée, pas présentée comme un pouvoir.
4. **Poids relationnel cumulé** (proposé) = `Σ value` des relations du nœud, exprimé en URL uniques.
Aucune centralité de graphe (degré normalisé, intermédiarité, PageRank) ne sera introduite.

## 4. Deux variantes visuelles

**Variante A — Galaxie sémantique en couronnes (recommandée).** Quatre couronnes concentriques fixes, ordre du centre vers l'extérieur : Sujets → Leaders → Partis → Tonalités. Position angulaire **déterministe** : tri décroissant par `mentions` puis répartition à pas constant dans un secteur réservé à la catégorie, ancré sur un angle de départ fixe. Aucune force, aucun aléatoire : deux chargements donnent des positions identiques au pixel. Les liens sont des arcs dont la courbure dépend de la différence de couronne (pas du centre), ce qui évite le faisceau central. Avantage : lecture catégorielle immédiate, positions reproductibles, aucune proximité fortuite. Limite : les nœuds voisins sur une même couronne n'ont pas de sens relationnel — la légende le déclare explicitement.

**Variante B — Graphe force-directed complet.** Layout à forces sur les 128 liens. Avantage : les clusters relationnels apparaissent naturellement. Limite disqualifiante : positions non reproductibles et proximité visuelle lue à tort comme alliance. **Non retenue comme vue principale.**

**Complément retenu de B : mode focalisé.** Au clic sur un nœud, une vue « ego-graphe » à disposition déterministe : nœud sélectionné au centre, voisins directs sur un anneau unique trié par `value` décroissante, liens hors voisinage masqués. Aucune force, aucune animation aléatoire.

## 5. Wireframe desktop (≥ 1200 px)

```text
┌ GALAXIE DÉCISIONNELLE ──────────────── 29.07 → 05.08.2026 · 7 421 URL ┐
│ [Recherche…]  FILTRES (Partis)(Leaders)(Sujets)(Pos)(Neu)(Nég)        │
│ [Vue galaxie | Mode focalisé | Tableau]   [−][+][Recentrer][Réinit][⛶]│
├──────────────────── SCÈNE (SVG) ─────────────┬──── FICHE ANALYTIQUE ──┤
│            ○ ○ ○  couronne 4 — Tonalités     │ RNI · Parti politique  │
│         ▢ ▢ ▢ ▢  couronne 3 — Partis         │ URL uniques      187   │
│       ◉ ◉ ◉  couronne 2 — Leaders            │ Visibilité       100   │
│     ◆ ◆ ◆  couronne 1 — Sujets               │ Balance         +29 %  │
│         (noyau : période + volume)           │ Relations doc.     6   │
│                                              │ ▰▰▰▱▱ tonalités       │
├─ LECTURE DE LA GALAXIE ──────────────────────┤ RELATIONS DOCUMENTÉES  │
│ couronne = catégorie · taille = URL uniques  │ · Sebta / migration 53 │
│ épaisseur = URL de la relation · angle et    │ · Justice           36 │
│ voisinage = non signifiants                  │ MÉTHODE / LIMITES      │
└──────────────────────────────────────────────┴────────────────────────┘
```

## 6. Wireframe mobile (< 768 px)

```text
┌ GALAXIE DÉCISIONNELLE ─────────┐
│ [Recherche…]                   │
│ FILTRES (chips, scroll horiz.) │
│ [Galaxie|Focalisé|Tableau]     │
│ ┌ SVG carré, pinch + drag ───┐ │
│ │  couronnes simplifiées :   │ │
│ │  libellés au tap seulement │ │
│ └────────────────────────────┘ │
│ [−][+][Recentrer][Réinit][⛶]   │
│ ▸ FICHE ANALYTIQUE (dépliée    │
│   au tap, sous la scène)       │
│ ▸ TABLEAU (28 lignes)          │
│ ▸ LECTURE DE LA GALAXIE        │
└────────────────────────────────┘
```

## 7. Structure exacte des couronnes

| # | Rayon (viewBox 1000×1000, centre 500,500) | Contenu | Secteur angulaire | Ordre |
|---|---|---|---|---|
| noyau | 0-70 | période + 7 421 URL | — | — |
| 1 | 190 | 7 sujets | 0° → 360°, pas 51,43° | `mentions` décr. depuis −90° |
| 2 | 300 | 9 leaders | 0° → 360°, pas 40° | `mentions` décr. depuis −90° |
| 3 | 400 | 9 partis | 0° → 360°, pas 40° | `mentions` décr. depuis −90° |
| 4 | 470 | 3 tonalités | 3 ancres fixes −90° / 30° / 150° | Positive, Neutre, Négative |

Filtres actifs : les couronnes conservent leurs rayons ; seul le pas angulaire est recalculé sur les nœuds visibles, toujours de façon déterministe.

## 8. Signification des encodages

- **Couronne (rayon)** : catégorie uniquement. Jamais une importance.
- **Angle** : rang de volume dans la catégorie. **Déclaré non signifiant** comme mesure de proximité entre nœuds.
- **Taille du nœud** : `√(mentions)`, 4 paliers explicités en légende = volume d'URL uniques.
- **Couleur** : catégorie (or = partis, cyan = leaders, violet = sujets) + tonalités en corail / bleu / vert. Jamais un jugement de valeur.
- **Distance entre deux nœuds** : **aucune signification** — mention explicite dans la légende.
- **Épaisseur du lien** : `√(value)` = nombre d'URL uniques de la cooccurrence, 4 paliers.
- **Style du lien** : trait plein = exposition acteur-sujet ; trait pointillé = cooccurrence sujet-tonalité. La couleur du lien ne code pas un sentiment sur l'acteur.

## 9. Interactions

- **Recherche** : champ texte, correspondance sur nom et nom canonique, résultats en liste, `Entrée` sélectionne, `Échap` vide.
- **Filtres** : les 6 filtres existants conservés à l'identique.
- **Zoom** : molette (facteur exponentiel, deltaMode normalisé, listener non passif), boutons −/+ ancrés au centre, pinch tactile, bornes 0,6× → 4×.
- **Pan** : drag souris et tactile ; `touch-action: none` sur la scène.
- **Recentrage** : ramène le viewport sur le nœud sélectionné. **Réinitialisation** : zoom 1, pan 0, sélection par défaut, filtres restaurés.
- **Plein écran** : `requestFullscreen` sur le conteneur de scène, sortie par `Échap`, fallback = mode plein conteneur si l'API est refusée dans l'iframe.
- **Sélection** : clic / `Entrée` / `Espace` → fiche analytique synchronisée + voisins mis en avant, non-voisins atténués (jamais masqués sans mention).
- **Survol / focus** : tooltip nom + catégorie + URL uniques.
- **Mode focalisé** : bouton dédié, ego-graphe du nœud sélectionné.
- **Clavier** : `Tab` entre les contrôles, flèches ← → pour parcourir la couronne courante, ↑ ↓ pour changer de couronne, `Échap` pour quitter le plein écran ou vider la recherche.

## 10. Fiche analytique (uniquement des données disponibles)

Nom + nom canonique · catégorie · URL uniques · visibilité relative /100 · balance narrative % · nombre de relations documentées · poids relationnel cumulé · barre de tonalité positif/neutre/négatif avec valeurs absolues · liste des relations documentées (contrepartie, type reformulé, `value`) · période · bloc méthode et limites (« ni popularité, ni intention de vote, ni causalité »).

## 11. Mode tableau accessible

`<table>` sémantique, 28 lignes, en-têtes cliquables (`aria-sort`) : Entité · Catégorie · URL uniques · Visibilité · Balance · Relations documentées · Poids cumulé. Clic ou `Entrée` sur une ligne = même sélection que la galaxie. C'est l'alternative textuelle complète de la scène SVG.

## 12. Contenus « Lecture de la galaxie » (FR/EN/AR)

1. Ce que montre la galaxie : les entités du débat et leurs cooccurrences documentées sur 7 421 URL uniques.
2. Comment lire : couronne = catégorie, taille = volume d'URL, épaisseur = volume de la relation.
3. Ce que la galaxie ne dit pas : l'angle et la distance ne signifient rien ; une cooccurrence n'est pas une influence, une alliance, une causalité, une popularité ou une intention de vote.
4. Méthode : URL canoniques uniques dédupliquées, wikipedia/wiktionary exclus, période 29.07 → 05.08.2026.

## 13. Fichiers concernés

- `public/intelligence-politique/strategic-signals.js` — vue galaxie seule (layout couronnes, contrôles, recherche, mode focalisé, tableau, fiche, clavier). Matrice et Orbites intactes.
- `public/intelligence-politique/strategic-signals.css` — styles de la scène, contrôles, plein écran, tableau, responsive, RTL, clair/sombre.
- `public/intelligence-politique/i18n.js` — nouvelles clés FR/EN/AR (≈ 35).
- `public/intelligence-politique/index.html` et `src/pages/IntelligencePolitiquePage.tsx` — bump de version `?v=` uniquement.

Non touchés : `canonical-monitoring-data.js`, `script.js`, `opinion-insights.*`, `styles.css`, section À propos, Média, Opinion, backend, base de données.

## 14. Risques

- Densité : 128 liens restent nombreux ; atténué par arcs inter-couronnes, atténuation au focus et mode focalisé.
- Plein écran dans l'iframe de la preview : peut être bloqué → fallback plein conteneur.
- Zoom molette et scroll de page : réglé par listener non passif + `preventDefault`.
- Régression sur Matrice / Orbites : périmètre limité aux fonctions `renderGalaxy` / `highlightGalaxy` et à leurs ajouts.
- Cache iframe : bump de version obligatoire, comme au lot précédent.

## 15. Rollback

Retour à `aa2e89a` (fichiers `strategic-signals.js`, `strategic-signals.css`, `i18n.js` et les deux bumps de version). Aucune migration, aucune donnée, aucun asset touché : le rollback est purement fichier.

## 16. Critères d'acceptation

28 nœuds présents tous filtres actifs · 128 relations affichées · positions identiques à deux chargements (comparaison de coordonnées) · aucun libellé tronqué en FR/EN/AR · zoom, pan, recentrage, réinitialisation, plein écran, recherche fonctionnels · tableau à 28 lignes triable · fiche synchronisée avec la scène et le tableau · parcours clavier complet sans piège de focus · 0 débordement horizontal à 360 px · 0 erreur console · Matrice, Orbites, À propos, Média, Opinion inchangés.

## 17. Plan de tests

Playwright sur 12 combinaisons FR/EN/AR × clair/sombre × 1440 px / 360 px :
- présence des 28 nœuds et 128 liens, égalité des coordonnées entre deux rendus ;
- chaque filtre : recomptage des nœuds et liens visibles ;
- recherche : requête « Akhan » → sélection attendue ;
- zoom in/out/recentrage/réinitialisation : vérification du `transform` et retour à l'état initial ;
- plein écran : entrée, sortie par `Échap`, fallback ;
- clavier : parcours flèches sur une couronne complète, `Entrée` = sélection ;
- tableau : 28 lignes, tri croissant/décroissant sur chaque colonne ;
- RTL arabe : direction du texte, `<bdi>` sur les termes latins, miroir des contrôles ;
- captures d'écran des 12 combinaisons pour revue visuelle ;
- console : 0 erreur.

Aucun fichier n'est modifié à ce stade. J'attends votre approbation pour implémenter.
