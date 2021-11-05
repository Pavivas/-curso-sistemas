<?php

include_once("../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$password = $object->password;
$username = $object->username;

try
{
	$SQLCode = "SELECT COUNT(*) AS 'result'  FROM user WHERE username = '$username' AND password = '$password'";
	$result = $connection->query($SQLCode)->fetch(PDO::FETCH_NUM);

	//SHA256, MD5

	if( $result[0] == 0 )
	{
		echo json_encode(false);
	}
	else
	{
		echo json_encode(true);
	}
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>