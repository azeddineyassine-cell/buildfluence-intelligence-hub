# OPINION — Ajustements ciblés (référence : version publiée)

## Constat de l'audit

- `opinion-insights.js` (≈38 Ko) contient : SYNTHÈSE EXÉCUTIVE (4 cartes), barre d'outils avec recherche + filtres tonalité + boutons de tri, cockpit SVG Visibilité × Balance, fiche analytique, TABLEAU DES SUJETS, CROISEMENT SUJETS-ACTEURS (réseau global), TIMELINE et SIGNAUX DE CHANGEMENT à l'état « indisponible », module méthodologique.
- Données réellement disponibles et suffisantes pour les trois camemberts :
  - 7 sujets avec `mentions` + `tones` (corpus Opinion, 5 498 URL uniques) ;
  - `opinionBreakdowns.channels` : twitter 2 516, facebook 518, news 1 525, blogs 626, other 313 (total 5 498) ;
  - tonalités Opinion : positif 1 312, neutre 1 186, négatif 3 000 (total 5 498).
- Couleurs de tonalité actuellement incohérentes : dans OPINION `pos = var(--gold)`, `neu = var(--line)`, `neg = #E06D4F` ; Strategic Signals, Média et le tableau de bord utilisent leurs propres valeurs.
- « popularité / popularity / الشعبية » apparaît dans `opinion-insights.js` (intro, point H, avertissement) et `strategic-signals.js` (method, read3, gxLimit) — également en AR.
- Aucune série temporelle par sujet n'existe : TIMELINE et SIGNAUX doivent disparaître, pas rester à l'état vide.

## Travaux prévus

### 1. Tokens de tonalité uniques (toute la plateforme)
- Ajouter dans `styles.css` : `--tone-pos:#4E9A5F`, `--tone-neg:#E06D4F`, `--tone-neu:#7B8490`, plus variantes de remplissage/contour ajustées en thème sombre.
- Remplacer les valeurs locales de tonalité dans `opinion-insights.css/js`, `strategic-signals.css/js`, `media-view.css/js`, `monitoring.css`, `script.js`.
- Conserver systématiquement libellé + symbole (▲ positif, ■ neutre, ▼ négatif) ou texture, pour ne jamais dépendre de la seule couleur.

### 2. Vocabulaire éditorial
- Titre : « Cockpit du débat public » (FR), équivalents EN/AR.
- Reformulation contextuelle des avertissements, sans remplacement littéral :
  - FR : « Cette analyse ne constitue ni un sondage d'opinion, ni une mesure des intentions de vote. »
  - EN : « This analysis is neither an opinion poll nor a measure of voting intention. »
  - AR : formulation naturelle équivalente (لا يشكل هذا التحليل استطلاعا للرأي ولا قياسا لنوايا التصويت).
- Suppression de toute occurrence visible de « popularité / popularity / الشعبية » dans OPINION et Strategic Signals ; vérification finale par recherche globale.

### 3. Entrée en entonnoir : trois camemberts
- Nouvelle rangée en tête d'onglet, trois donuts SVG de dimension identique, alignés sur desktop, empilés sur mobile :
  1. SUJET DOMINANT DU DÉBAT PUBLIC — répartition réelle des 7 sujets, centre = sujet dominant + son poids documentaire ;
  2. RÉPARTITION PAR CANAL — 5 canaux canoniques ;
  3. RÉPARTITION PAR TONALITÉ — 1 312 / 1 186 / 3 000, aux tokens de tonalité.
- Aucun segment, pourcentage, tendance ou comparaison temporelle inventé.
- Sélection d'un segment du camembert 1 = sélection du sujet, synchronisée avec cockpit, tableau, fiche et vue locale des acteurs.

### 4. Tooltips analytiques + suppression de la synthèse exécutive
- Tooltip premium (survol, focus clavier, appui tactile) : libellé, volume, part du total, lecture analytique courte, limite méthodologique.
- Les enseignements des 4 cartes de SYNTHÈSE EXÉCUTIVE sont réinjectés dans les tooltips du camembert des sujets, puis le bloc est supprimé.
- Mobile : premier appui = détail, second = sélection ; fermeture explicite (bouton) et Échap.

### 5. Barre de commandes
- Suppression complète de « Rechercher un sujet » (champ, état, filtrage, libellés i18n).
- Suppression des boutons de tri isolés ; ne restent que les filtres de tonalité dominante + réinitialiser + mode focalisé, rééquilibrés.

### 6. Tri intégré au TABLEAU DES SUJETS
- En-têtes cliquables/focusables sur Occurrences (visibilité), Balance narrative, Acteurs associés : bascule croissant/décroissant, chevron directionnel, `aria-sort`, réordonnancement immédiat, ligne sélectionnée conservée.
- Le tableau reste en place et complet (7 sujets).

### 7. « ACTEURS ASSOCIÉS AU SUJET SÉLECTIONNÉ »
- Le croisement global devient une vue locale : sujet au centre, uniquement ses acteurs directement associés, volume réel de cooccurrences.
- Mise en page : graphe compact à gauche, panneau « Associations documentées » immédiatement visible à droite ; sur mobile, panneau juste sous le graphe.
- Survol/focus : nom, catégorie, nombre de cooccurrences, avertissement méthodologique (ni alliance, ni soutien, ni opposition, ni causalité).
- Aucune duplication de la Galaxie décisionnelle, qui reste la seule vue globale.

### 8. Suppressions
- TIMELINE et SIGNAUX DE CHANGEMENT retirés intégralement (markup, CSS, i18n, état) — aucune commande fantôme.
- Ajout dans la méthodologie : « Le corpus actuel ne permet pas de mesurer une évolution temporelle par sujet. Aucune tendance n'est extrapolée. »

### 9. « COMPRENDRE L'ANALYSE DE L'OPINION »
- Réécriture selon le texte FR fourni, avec adaptations éditoriales naturelles EN et AR ; conservation du bloc « Méthode et limites » factuel en dessous.

### 10. Ordre final
Titre + intro courte → trois camemberts → cockpit Visibilité × Balance → fiche analytique → tableau des sujets → acteurs associés + associations documentées → comprendre l'analyse → méthode et limites.

## Vérifications
Playwright en FR/EN/AR (RTL), clair/sombre, desktop (1280) et mobile (360) : exactitude des volumes et pourcentages, alignement des trois camemberts, tooltips survol/focus/tactile, tri perceptible, sélection synchronisée immédiate, absence de « popularité/popularity », cohérence vert/rouge/gris sur tous les onglets, absence de recherche/Timeline/Signaux, navigation clavier, aucun débordement horizontal, console vierge.

## Portée technique
Fichiers touchés : `public/intelligence-politique/opinion-insights.js`, `opinion-insights.css`, `index.html` (markup de la vue Opinion + versions de cache), `styles.css` (tokens), et ajustements ponctuels de tonalité dans `strategic-signals.css/js`, `media-view.css/js`, `monitoring.css`, `script.js`. Aucune donnée canonique, aucun calcul métier ni backend modifié.
