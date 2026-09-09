# Intégration du Benchmark API vs AMDIE

## Objectif
Remplacer l’ancien Benchmark API léger par le fichier interactif fourni, accessible à `/benchmark-api-vs-amdie`, en conservant exactement son contenu et son design.

## Mise en œuvre
- Installer le fichier fourni sous `public/benchmark-api-vs-amdie.html`, sans modifier son contenu interne.
- Ajouter une page React dédiée qui affiche ce fichier en plein écran dans un cadre isolé.
- Réutiliser l’état d’authentification existant : accès complet uniquement pour le rôle `premium`.
- Transmettre cet état au document par `?access=premium` au chargement, puis par `postMessage({ type: "bf-access", premium })` lors des changements de session.
- Retirer `public/benchmark-api-light.html` une fois la nouvelle page vérifiée.
- Conserver l’ancienne URL avec une redirection vers `/benchmark-api-vs-amdie`. Sur l’hébergement SPA actuel, cette redirection sera applicative et préservera la destination, mais le navigateur ne recevra pas un statut HTTP 301 serveur.
- Modifier uniquement la carte Benchmark API de l’accueil : « 12 leviers stratégiques » et nouveau lien.
- Mettre à jour l’entrée Benchmark de l’espace Premium pour utiliser la nouvelle adresse.

## Vérifications
- Contrôler les quatre onglets publics sans accès Premium.
- Contrôler les panneaux verrouillés de Prototypes et Décision sans accès Premium.
- Contrôler le contenu complet avec `?access=premium`, puis le passage dynamique par message.
- Vérifier les modes clair/sombre et FR/EN, y compris les panneaux verrouillés.
- Vérifier la redirection de l’ancienne URL et la carte d’accueil.
- Confirmer l’absence de « gratuit » et de tiret cadratin dans le fichier intégré.
- Vérifier que le site compile sans erreur et que le portrait fondateur reste correctement affiché.
