<?php

include_once("../database.php");
include_once("../auth.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$password = $object->password;
$username = $object->username;
$id = $object->id;

try
{
	//Todo tipo de validación de información, debe ser realizada aquí de manera obligatoria
	//ANTES de enviar el comando SQL al motor de base de datos.

	$SQLCode = "UPDATE user SET username = '$username', password = '$password' where id='$id'";
	$connection->query($SQLCode);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (edit.php)', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>
