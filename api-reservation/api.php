<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include 'model.php';
$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method)
{
    case 'OPTIONS':
        http_response_code(204);
        break;
    case 'GET':
        if(isset($_GET["id"])){
            $result = getOneReservation($_GET["id"]);
        }
        else{
            $result = getAllReservations();
        }
        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
    case 'POST':
        postReservation($_POST);

        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Line added successfully'), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
        
    case 'PUT':
        if (isset($_GET["id"])){
            parse_str(file_get_contents("php://input"), $putData);
            var_dump($putData);
            updateReservation($_GET["id"],$putData);

            header('Content-Type: application/json');
            echo json_encode(array('message' => 'Line updated successfully'), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            header('Content-Type: application/json');
            echo json_encode(array('message' => 'Missing line id'), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;
    case 'DELETE':
        deleteReservation($_GET["id"]);
        break;
    default:
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Invalid request method'), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
}