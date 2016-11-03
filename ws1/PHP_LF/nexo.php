<?php 

include "clases/Personas.php";
include "clases/Usuario.php";
// $_GET['accion'];
if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}
    

	

}
else{
//var_dump($_REQUEST);
	//echo "<br>";
	//var_dump($_POST['datos']);
	
	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	var_dump($respuesta);
    
    if($respuesta->datos->accion=="registrar"){
        echo Usuario::InsertarUsuario($respuesta->datos->usuario);
    }
    
    if($respuesta->datos->accion=="borrar"){
        echo Persona::BorrarPersona($respuesta->datos->id);
    }
	//echo $respuesta->datos->persona->nombre;

	//Persona::InsertarPersona($respuesta->datos->persona);


}



 ?>