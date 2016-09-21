<?php 

include "clases/Personas.php";

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	if($respuesta->datos->accion == "insertar")
	{
		if($respuesta->datos->persona->foto!="pordefecto.png")
		{
			$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
			$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			unlink($rutaVieja);
			$respuesta->datos->persona->foto=$rutaNueva;
		}
		if($respuesta->datos->persona->foto2!="pordefecto.png")
		{
			$rutaVieja="../fotos/".$respuesta->datos->persona->foto2;
			$rutaNueva=$respuesta->datos->persona->dni."B.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			unlink($rutaVieja);
			$respuesta->datos->persona->foto2=$rutaNueva;
		}
		if($respuesta->datos->persona->foto3!="pordefecto.png")
		{
			$rutaVieja="../fotos/".$respuesta->datos->persona->foto3;
			$rutaNueva=$respuesta->datos->persona->dni."C.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			unlink($rutaVieja);
			$respuesta->datos->persona->foto3=$rutaNueva;
		}
		Persona::InsertarPersona($respuesta->datos->persona);

		echo json_encode($respuesta->datos->persona);
	}

 ?>