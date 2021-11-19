<?php

include_once("../database.php" );
include_once("../auth.php");

try
{
	//Todo tipo de validación de información, debe ser realizada aquí de manera obligatoria
	//ANTES de enviar el comando SQL al motor de base de datos.
	
	$SQLCode = "SELECT * FROM user"; 
	$result = $connection->query($SQLCode)->fetchAll(PDO::FETCH_NUM);

	echo json_encode($result);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (read.php)', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>
