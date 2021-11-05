<?php

include_once( "database.php" );

try
{
	//Todo tipo de validaciÃ³n de informaciÃ³n, debe ser realizada aquÃ­ de manera obligatoria
	//ANTES de enviar el comando SQL al motor de base de datos.
	
	$SQLCode = "SELECT * FROM user"; 
	$result = $connection->query($SQLCode)->fetchAll(PDO::FETCH_NUM);

	echo json_encode($result);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>