<?php 

include "clases/Personas.php";

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	if($respuesta->datos->accion == "buscar")
		{
			echo json_encode(Persona::TraerUnaPersona($respuesta->datos->id));
		}
 ?>