<?php
function dbConnect() {
    return new PDO('mysql:host=localhost;dbname=reservation_gutenberg;charset=utf8', 'root', '');
}

//_________________GETS____________________


function getAllReservations() {
    $db = dbConnect();
    $query = $db -> query('SELECT * FROM reservations JOIN tarifs ON reservations.tarif_fk = tarifs.tarif_id');
    return $query -> fetchAll(PDO::FETCH_ASSOC);
}

function getOneReservation($id) {
    $db = dbConnect();
    $query = $db -> prepare('SELECT * FROM reservations JOIN tarifs ON reservations.tarif_fk = tarifs.tarif_id WHERE resa_id = :id');
    $query -> bindParam(':id', $id, PDO::PARAM_INT);
    $query -> execute();
    return $query -> fetch(PDO::FETCH_ASSOC);
}



//________________POST (insert)________________


function postReservation($post){
    $db = dbConnect();
    $query = $db -> prepare('INSERT INTO reservations (dateheure, email, prenom, nom, tarif_fk) VALUES (:dateheure, :email, :prenom, :nom, :tarif)');

    $dateheure = date('Y-m-d H:i:s', strtotime($post['date']. ' ' . $post['heure']));


    if (is_array($post['nom'])) {
        for ($i = 0; $i < count($post['nom']); $i++) {
            $query -> bindParam(':dateheure', $dateheure, PDO::PARAM_STR);
            $query -> bindParam(':email', $post['email'], PDO::PARAM_STR);
            $query -> bindParam(':prenom', $post['prenom'][$i], PDO::PARAM_STR);
            $query -> bindParam(':nom', $post['nom'][$i], PDO::PARAM_STR);
            $query -> bindParam(':tarif', $post['tarif'][$i], PDO::PARAM_INT);
            $query -> execute();
        }
    } else {
        $query -> bindParam(':dateheure', $dateheure, PDO::PARAM_STR);
        $query -> bindParam(':email', $post['email'], PDO::PARAM_STR);
        $query -> bindParam(':prenom', $post['prenom'], PDO::PARAM_STR);
        $query -> bindParam(':nom', $post['nom'], PDO::PARAM_STR);
        $query -> bindParam(':tarif', $post['tarif'], PDO::PARAM_INT);
        $query -> execute();
    }
}


//_________________PUT (update)____________________


function updateReservation($id, $data){
    $db = dbConnect();
    $query = $db -> prepare('UPDATE reservations SET dateheure = :dateheure, email = :email, prenom = :prenom, nom = :nom, tarif_fk = :tarif WHERE resa_id = :id');

    $dateheure = date('Y-m-d H:i:s', strtotime($data['date'] . ' ' . $data['heure']));

    $query -> bindParam(':dateheure', $dateheure, PDO::PARAM_STR);
    $query -> bindParam(':email', $data['email'], PDO::PARAM_STR);
    $query -> bindParam(':prenom', $data['prenom'], PDO::PARAM_STR);
    $query -> bindParam(':nom', $data['nom'], PDO::PARAM_STR);
    $query -> bindParam(':tarif', $data['tarif'], PDO::PARAM_INT);
    $query -> bindParam(':id', $id, PDO::PARAM_INT);
    $query -> execute();
}



//_________________DELETE____________________


function deleteReservation($id){
    $db = dbConnect();
    $query = $db -> prepare('DELETE FROM reservations WHERE resa_id = :id');
    $query -> bindParam(':id', $id, PDO::PARAM_INT);
    $query -> execute();
}

?>