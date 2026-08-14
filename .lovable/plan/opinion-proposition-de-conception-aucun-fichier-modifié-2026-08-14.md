# OPINION — Proposition de conception (aucun fichier modifié)

Référence à préserver : commit **`e01500d`** (« Corrigé bug écouteurs média ») — dernière version publiée, onglet MÉDIA validé.

## 1. Audit factuel de la version publiée

Vue actuelle (`opinion-insights.js`, 166 lignes) : 4 visualisations synchronisées (camembert + histogramme + légende + panneau) sur 4 dimensions — sujets, canaux, tonalités, langues — plus un bloc « cadre de lecture ». Manques : aucun explorateur par sujet, aucun croisement sujets-acteurs, aucune balance narrative par sujet, aucune synthèse exécutive, aucune timeline, aucun tableau accessible.

## 2. Données réellement disponibles (`canonical-monitoring-data.js`)

Corpus Opinion citoyenne : `opinionRawRows` 7 132 → `opinionUniqueUrls` 5 498. Période 29.07 → 05.08.2026. Source `29.07_05.08 - Liste des Mentions opinion citoyenne.xlsx`. Exclusions : wikipedia.org, wiktionary.org. Conflits de tonalité opinion : 98. Graphe : 28 nœuds, 128 relations, 7 421 URL.

Sept sujets (`topics`), champ unique de volume = `mentions` (occurrences thématiques), plus tonalités :

| Sujet | Mentions | Positif | Neutre | Négatif | Balance* |
|---|---|---|---|---|---|
| Sebta / migration | 1 285 | 95 | 236 | 954 | −66,9 |
| Eau / sécheresse | 790 | 175 | 90 | 525 | −44,3 |
| Corruption | 752 | 29 | 23 | 700 | −89,2 |
| Emploi / chômage | 611 | 204 | 153 | 254 | −8,2 |
| Justice | 481 | 92 | 135 | 254 | −33,7 |
| Santé | 442 | 124 | 87 | 231 | −24,2 |
| Éducation | 337 | 147 | 111 | 79 | +20,2 |

*Balance narrative = (positif − négatif) / (positif + neutre + négatif) × 100, formule déjà utilisée ailleurs sur la plateforme.

Totaux tonalité corpus (`toneTotals`) : positif 1 312, neutre 1 186, négatif 3 000. Canaux : twitter 2 516, facebook 518, news 1 525, blogs 626, autres 313. Langues : fr 4 446, ar 1 033, autres 19.

**Relations sujets-acteurs documentées** (arêtes du graphe, type `influence`, valeur = cooccurrences) : Sebta / migration 12 acteurs, Justice 11, Emploi / chômage 10, Éducation 7, Eau / sécheresse 5, Santé 4, Corruption 3. Chaque sujet porte aussi 3 arêtes sujet-tonalité (`alliance` = positive, `proximite` = neutre, `opposition` = négative). Attention : le libellé technique du type d'arête ne doit jamais être affiché comme sens politique ; l'interface dira uniquement « association documentée (cooccurrence) ».

**Données temporelles : absentes.** Aucune série par sujet, par acteur ni par média. Le seul quotidien existant est le volume presse global (8 valeurs codées dans `script.js`), non ventilable par sujet. Conséquence : aucun mot d'évolution (accélération, recul, progression, rupture, émergence, tendance) ne sera employé.

Absent également : catégorie de sujet, portée/audience, score d'influence par sujet, événements datés, relation sujet-média.

Distinctions retenues dans les libellés : **volume** = mentions brutes du sujet ; **visibilité relative** = mentions / 4 698 occurrences thématiques × 100 (normalisée 0-100 sur le maximum) ; **tonalité** = répartition positif/neutre/négatif ; **balance narrative** = indice signé ; **relation documentée** = arête canonique ; **cooccurrence** = méthode de détection ; **évolution temporelle** = indisponible.

## 3. Synthèse exécutive proposée (4 enseignements, formulations statiques)

1. Sujet le plus visible sur la période : Sebta / migration, 1 285 occurrences thématiques, 27,4 % du total des sept sujets, 29.07-05.08.2026. Limite : présence documentaire, pas importance politique.
2. Balance la plus négative : Corruption, −89,2 sur 752 occurrences. Limite : cadrage des contenus, pas jugement des acteurs.
3. Seule balance positive : Éducation, +20,2 sur 337 occurrences. Limite : faible volume relatif.
4. Sujet associé au plus grand nombre d'acteurs documentés : Sebta / migration, 12 acteurs, 353 cooccurrences. Limite : cooccurrence, ni soutien ni opposition.

## 4. Visualisation principale — deux variantes

**Variante A — Cockpit « Visibilité × Balance narrative » (à étudier en priorité).** X = balance de −100 à +100, Y = visibilité relative 0-100, taille = mentions, une seule forme (aucune catégorie de sujet n'existe dans les données). Question : quels sujets combinent forte visibilité et climat dégradé ? Avantages : deux indicateurs documentés, sept points lisibles, sélection synchronisée. Limites : pas d'axe temporel, sensible à la formule de balance. Risque : lire un point négatif comme un rejet populaire — neutralisé par une note d'axe et le rappel « corpus délimité ». Zones : uniquement deux repères neutres (axe balance 0 et médiane de visibilité), sans quadrants nommés. Desktop : plan 2/3 + fiche 1/3. Mobile : plan carré pannable + tableau trié en accordéon.

**Variante B — Constellation sujets-acteurs.** 7 sujets en positions déterministes (angle par rang de visibilité), acteurs placés selon leur rattachement, liens = arêtes canoniques, épaisseur = cooccurrences, mode focalisé au clic. Question : quels acteurs sont documentés avec quel sujet ? Avantages : rend visible le croisement. Limites : 52 arêtes acteur-sujet, encombrement en arabe. Risque : proximité lue comme alliance — neutralisé par légende explicite et absence de toute position aléatoire.

**Recommandation :** Variante A comme visualisation principale, Variante B intégrée en second module (section 7) avec mode focalisé. Les deux partagent la même sélection.

## 5. Wireframes

```text
DESKTOP (max 1600)
┌ bandeau : kicker OPINION CITOYENNE | titre | intro | période ─────────────┐
├ synthèse exécutive : 4 cartes (métrique, valeur, limite) ─────────────────┤
├ barre d'outils : recherche sujet | filtres tonalité | tri | réinitialiser ┤
├ COCKPIT visibilité × balance (2/3) │ FICHE ANALYTIQUE SUJET (1/3) ────────┤
├ tableau accessible des 7 sujets (colonnes triables) ──────────────────────┤
├ CROISEMENT SUJETS-ACTEURS : constellation focalisée + liste des liens ────┤
├ TIMELINE : état « DONNÉES TEMPORELLES INDISPONIBLES » + contrôles inertes ┤
├ SIGNAUX DE CHANGEMENT : « DONNÉE INDISPONIBLE » + prérequis listés ───────┤
└ COMPRENDRE L'ANALYSE DE L'OPINION (A→K) + avertissement encadré ──────────┘

MOBILE (360)
bandeau → synthèse (carrousel vertical) → outils condensés → cockpit carré
→ fiche en panneau plein écran → tableau accordéon → constellation focalisée
→ timeline (état indisponible) → signaux (indisponible) → méthodologie
```

## 6. Explorateur thématique (fiche analytique)

Nom, mentions, visibilité relative, balance narrative, positif/neutre/négatif (valeurs + parts), acteurs associés avec volume de cooccurrence, relations documentées, période, source, méthode, limites. Tout champ absent affiche « Donnée indisponible » ; jamais `null`, `undefined`, `NaN`, ni valeur estimée. Bloc « DONNÉES NON DISPONIBLES » : série temporelle, portée, relation sujet-média.

## 7. Timeline et Signaux de changement

Séries par sujet inexistantes → la Timeline est conçue (emplacement, contrôles de période, zoom, comparaison, activation de sujets, annotations) mais publiée à l'état vide : titre « DONNÉES TEMPORELLES INDISPONIBLES » + texte imposé, contrôles visibles et désactivés (`aria-disabled`), aucune courbe d'exemple. Aucune maquette conceptuelle ne sera injectée dans la version publiée. Signaux de changement : cadre présent, valeur « DONNÉE INDISPONIBLE », puis liste des prérequis (volume et tonalité par sujet et par jour sur au moins deux périodes homogènes, méthode de dédoublonnage constante, événements datés qualifiés). Aucun seuil, aucune alerte inventée. Distinction affichée : corrélation temporelle observée / événement documenté / interprétation validée / causalité non établie.

## 8. Interactions

Sélection croisée cockpit ↔ tableau ↔ constellation ↔ fiche, recherche de sujet, filtres tonalité documentés, mode focalisé, tooltips riches (sujet, mentions, part, balance, acteurs), réinitialisation, navigation clavier complète (tabulation entre points, Entrée/Espace, flèches dans le tableau), focus visible, Échap ferme la fiche, cibles tactiles ≥ 44 px, tableau accessible équivalent, transitions 200 ms et `prefers-reduced-motion`. Aucune particule, 3D, animation permanente ou effet décoratif.

## 9. Design

Tokens officiels uniquement (navy #0D1B2A, #1A2D44, #142235, #08111C ; or #C9A84C, #D4B866, #8A7537, #E0C88A ; ivoire #F5F1E8, papier #FAF6ED, séparateur #D9CFBC, alerte #E06D4F). Rayon 2 px, thème clair par défaut, Playfair Display / Cormorant Garamond italic / JetBrains Mono / DM Sans. Encodage tonalité : positif = or #C9A84C, neutre = séparateur #D9CFBC, négatif = alerte #E06D4F, chacun doublé d'une texture pour l'accessibilité daltonienne. Aucun tiret cadratin dans l'interface, accents préservés, FR/EN/AR avec RTL et isolation `bdi` des noms anglais.

## 10. Périmètre, fichiers, risques, tests

Fichiers concernés : `public/intelligence-politique/opinion-insights.js` (réécriture), `opinion-insights.css` (réécriture), `index.html` (section `#opinion` et cache-bust uniquement). Aucun autre onglet, aucune donnée canonique, aucun calcul existant, aucune fonction backend ou Supabase.

Risques : régression du cache des scripts ; libellés arabes longs dans le cockpit ; lecture abusive de la balance. Mitigations : cache-bust versionné, mesure des libellés en AR avant publication, notes d'axe et avertissement permanent.

Rollback : retour à `e01500d` pour les trois fichiers, sans effet sur les autres vues.

Critères d'acceptation : 7 sujets et leurs valeurs identiques aux données canoniques ; aucune valeur inventée ; aucun `null`/`NaN` ; timeline et signaux à l'état indisponible ; aucun mot d'évolution ; avertissement visible ; MÉDIA, À PROPOS et Strategic Signals inchangés.

Plan de tests : FR/EN/AR avec RTL, thèmes clair et sombre, desktop 1440 px et mobile 360 px sans débordement, parcours clavier complet (tabulation, Entrée, Échap, flèches), synchronisation des quatre modules, `prefers-reduced-motion`, console sans erreur, vérification visuelle par capture.
