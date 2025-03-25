<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Se connecter au backoffice</title>
    <link rel="stylesheet" href="form.css">
</head>
<body>
    <form action="connect.php" method="post">
        <label for="login">Login</label>
        <input type="text" name="login" id="login" required>
        <label for="mdp">Mot de passe</label>
        <input type="password" name="mdp" id="mdp" required>
        <button type="submit">Se connecter</button>
    </form>
    <?php
    var_dump($_SESSION);

    if (isset($_POST['login']) && isset($_POST['mdp'])) {
        $login = $_POST['login'];
        $mdp = $_POST['mdp'];
        $db = new PDO('mysql:host=localhost;dbname=admins_gutenberg', 'root', '');


        $query = $db->prepare('SELECT * FROM utilisateurs WHERE login = :login');
        $query->execute(['login' => $login]);
        $user = $query->fetch();
        if ($user && password_verify($mdp, $user['mdp'])) {
            $_SESSION['user'] = $user;
            header('Location: https://rgbagency.fr/backoffice/');
            exit();
        } else {
            echo 'Mauvais identifiants';
        }
    }
    ?>
</body>
</html>