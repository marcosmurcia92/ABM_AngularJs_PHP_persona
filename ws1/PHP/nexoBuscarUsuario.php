<?php 

include "clases/Usuario.php";

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	if($respuesta->datos->accion == "buscar")
		{
			echo json_encode(Usuario::TraerUnUsuario($respuesta->datos->dni));
		}
 ?>