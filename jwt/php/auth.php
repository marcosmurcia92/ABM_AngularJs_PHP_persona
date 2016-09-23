<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;


$DatosDelModeloPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModeloPorPost);

if($user->correo == 'usuario@usuario' && $user->clave == 'clave'){

	$key = "1234";
	$token["usuario"] = "unUsuario";
	$token["tipoUsuario"] = "admin";
	$token["iat"] = time();
	$token["exp"] = time()+20;

	$jwt = JWT::encode($token, $key);

	$ArrayConToken["MiTokenGeneradoEnPHP"] = $jwt;
}else{
	$ArrayConToken["MiTokenGeneradoEnPHP"] = false;
}



echo json_encode($ArrayConToken);

?>