<?php

include_once("../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$session_key = $object->auth;

try
{
	$SQLCode = "SELECT id FROM user WHERE session_key = '$session_key'";
	$id = $connection->query($SQLCode)->fetch(PDO::FETCH_NUM)[0];

	if( $id != null )
	{
		//echo json_encode($session_key);
	}
	else
	{
		echo json_encode(null);
		die();
	}
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}


?>