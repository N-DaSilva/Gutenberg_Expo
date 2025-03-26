API de réservation de l'exposition Gutenberg : et l'encre fuse


Méthodes :

- GET : renvoie toutes les réservations ou une seule si l'id est transmise dans l'URL (?id=[valeur de l'ID])

- POST : ajoute une réservation dans la base de donnée. renvoie 'success' = true si l'insertion se fait correctement
    Champs de formulaire :
    "nom" (str), "prenom" (str), "email" (str), "date" (str), "heure" (str), "tarif" (int)

- PUT : modifie une réservation (préciser ID dans l'URL). Repréciser toutes les valeurs. Même champs de formulaire que pour POST. Envoyer les données en x-www-form-urlencoded.

- DELETE : supprime une réservation (préciser ID dans l'URL).


Procédure de restauration de l'API :

- Télécharger la sauvegarde de l'API
- Extraire les fichiers de l'archive
- Importer la base de données de réservation dans le PHPmyadmin local
- Modifier la connexion à la base de données dans model.php, y mettre les informations de la base de données locale