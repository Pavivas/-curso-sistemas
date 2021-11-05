<?php

include_once( "../database.php");

$json_body = file_get_contents('php://input');

//Deserializar: JSON->FormatoPHP 
//Transformamos texto JSON en objeto PHP para poder manipularlo con el lenguaje
$object = json_decode($json_body);

//Tomamos la informaciรณn necesaria del objeto recibido
$id = $object->id;

unset($_SESSION['data'][$id]);

echo json_encode($_SESSION['data']);


?>