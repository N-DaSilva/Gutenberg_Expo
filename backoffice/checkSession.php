<?php
header("Access-Control-Allow-Origin: https://rgbagency.fr");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    echo json_encode(['authenticated' => true, 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['authenticated' => false]);
}
?>