<?php

include_once("../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$__username = $object->auth->username;
$__password = $object->auth->password;

try
{
	$SQLCode = "SELECT COUNT(*) AS 'result'  FROM user WHERE username = '$__username' AND password = '$__password'";
	$result = $connection->query($SQLCode)->fetch(PDO::FETCH_NUM);

	if( $result[0] == 0 )
	{
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