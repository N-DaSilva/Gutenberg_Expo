Procédure de restauration du backoffice :

- Télécharger la sauvegarde du site
- Extraire les fichiers de l'archive
- Importer la base de données des administrateurs dans le PHPmyadmin local
- Remplacer la connexion à la base de données dans connect.php par les informations de la base de données locale
- Modifier les liens et redirections :
    - Remplacer https://rgbagency.fr dans logout.php et checkSession.php, et https://rgbagency.fr/backoffice par l'URL locale de l'application React
    - Remplacer https://rgbagency.fr/backoffice/checkSession.php, https://rgbagency.fr/backoffice/logout.php et https://rgbagency.fr/backoffice/cconnect.php par l'URL locale des fichiers checkSession.php, logout.php et connect.php respectivement
    - Remplacer https://rgbagency.fr/api-reservation/api.php par l'adresse locale de l'API
- Effectuer la commande npm install à la racine, puis npm run dev pour lancer l'application React