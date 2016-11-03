<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;


$DatosDelModeloPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModeloPorPost);

if($user->correo == 'admin@admin' && $user->clave == 'admin'){

	$key = "1234";
	$token["usuario"] = "Administrador";
	$token["usrDni"] = $user->dni;
	$token["tipoUsuario"] = "admin";
	$token["iat"] = time();
	$token["exp"] = time()+1000;

	$jwt = JWT::encode($token, $key);

	$ArrayConToken["MurciaLoginToken"] = $jwt;
}else{
	$ArrayConToken["MurciaLoginToken"] = false;
}



echo json_encode($ArrayConToken);

?>