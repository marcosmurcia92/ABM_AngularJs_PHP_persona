<?php 

include "clases/Usuario.php";

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	if($respuesta->datos->accion == "insertar")
	{
		Usuario::InsertarUsuario($respuesta->datos->usuario);

		//echo json_encode($respuesta->datos->usuario);
	}

 ?>