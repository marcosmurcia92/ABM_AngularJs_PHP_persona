<?php
require_once"AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
  	public $email;
  	public $dni;
  	public $pass;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetEmail()
	{
		return $this->email;
	}
	public function GetDni()
	{
		return $this->dni;
	}
	public function GetPass()
	{
		return $this->pass;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetEmail($valor)
	{
		$this->email = $valor;
	}
	public function SetDni($valor)
	{
		$this->dni = $valor;
	}
	public function SetPass($valor)
	{
		$this->pass = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct()
	{
		
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->email."-".$this->dni."-".$this->pass;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	
	public static function TraerUnUsuario($dniParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios where dni =:dni");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:dni)");
		$consulta->bindValue(':dni', $dniParametro, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
					
	}

	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodosLosUsuarios() ");
		$consulta->execute();			
		$arrusuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrusuarios;
	}
	
	public static function BorrarUsuario($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from usuarios	WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarUsuario(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (email,dni,pass)values(:email,:dni,:pass)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarUsuario (:email,:dni,:pass)");
		$consulta->bindValue(':email',$usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(':dni', $usuario->dni, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $usuario->pass, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
