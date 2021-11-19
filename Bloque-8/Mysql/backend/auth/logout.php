<?php

include_once("../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$session_key = $object;

try
{
	$SQLCode = "SELECT id FROM user WHERE session_key = '$session_key'";
	$id = $connection->query($SQLCode)->fetch(PDO::FETCH_NUM)[0];

	$SQLCodeUpdate = "UPDATE user SET session_key = NULL WHERE id = '$id'";
	$rows = $connection->query($SQLCodeUpdate)->rowCount();
		
	echo json_encode(null);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>