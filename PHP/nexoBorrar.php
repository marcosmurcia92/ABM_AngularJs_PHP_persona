<?php 

include "clases/Personas.php";

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	if($respuesta->datos->accion == "borrar")
		{
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				unlink("../fotos/".$respuesta->datos->persona->foto);
			}
			if($respuesta->datos->persona->foto2!="pordefecto.png")
			{
				unlink("../fotos/".$respuesta->datos->persona->foto2);
			}
			if($respuesta->datos->persona->foto3!="pordefecto.png")
			{
				unlink("../fotos/".$respuesta->datos->persona->foto3);
			}
			Persona::BorrarPersona($respuesta->datos->persona->id);
		}




 ?>