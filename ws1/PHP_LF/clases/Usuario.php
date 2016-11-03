<?php 
require_once"accesoDatos.php";
class Usuario {
	private $user;
	private $pass;
    private $email;
    private $nombre;
    private $apellido;

	public function getUser(){
		return $this->user;
	}

	public function setUser($user){
		$this->user = $user;
	}

	public function getPass(){
		return $this->pass;
	}

	public function setPass($pass){
		$this->pass = $pass;
	}
    
    public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}
    
    public function getNombre(){
		return $this->nombre;
	}

	public function setNombre($nombre){
		$this->nombre = $nombre;
	}
    
    public function getApellido(){
		return $this->apellido;
	}

	public function setApellido($apellido){
		$this->apellido = $apellido;
	}

	public function __construct(){

	}

	public static function ValidarUsuario($user, $pass){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario where username =:user and pass = :pass");
		$consulta->bindValue(':user', $user, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $pass, PDO::PARAM_STR);
		$consulta->execute();
		if($consulta->rowCount()==1){
			return true;
		} else {
			return false;
		}
	}
    
    public static function InsertarUsuario($usuario) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuario (username, pass, nombre, apellido, email) VALUES (:username,:pass,:nombre,:apellido,:email)");
        $consulta->bindValue(':username', $usuario->user, PDO::PARAM_STR);
        $consulta->bindValue(':pass', $usuario->pass, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuario->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':email', $usuario->email, PDO::PARAM_STR);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
 ?>