<?php
require_once"accesoDatos.php";
class Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $apellido;
    public $email;
  	public $dni;
  	public $foto;
	public $edad;
	public $estadoCivil;
	public $sexo;
	public $fecha;
	public $pass;
	public $csharp;
	public $php;
	public $visual;
	public $html;
	public $javascritp;
	public $java;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetApellido()
	{
		return $this->apellido;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetDni()
	{
		return $this->dni;
	}
	public function GetFoto()
	{
		return $this->foto;
	}
    public function GetEmail()
    {
        return $this->email;
    }
    public function GetEdad()
    {
        return $this->edad;
    }
	public function GetSexo()
    {
        return $this->sexo;
    }
	public function GetEstadoCivil()
    {
        return $this->estadoCivil;
    }
	public function GetFecha()
    {
        return $this->fecha;
    }
	public function GetPass()
    {
        return $this->pass;
    }
	public function GetCsharp()
    {
        return $this->csharp;
    }
	public function GetPhp()
    {
        return $this->php;
    }
	public function GetVisual()
    {
        return $this->visual;
    }
	public function GetHtml()
    {
        return $this->html;
    }
	public function GetJavascript()
    {
        return $this->javascript;
    }
	public function GetJava()
    {
        return $this->java;
    }

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetDni($valor)
	{
		$this->dni = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
    public function SetEmail($valor)
    {
        $this->email = $valor;
    }
    public function SetEdad($valor)
    {
        $this->edad = $valor;
    }
	public function SetEstadoCivil($valor)
    {
        $this->estadoCivil = $valor;
    }
	public function SetSexo($valor)
    {
        $this->sexo = $valor;
    }
	public function SetFecha($valor)
    {
        $this->fecha = $valor;
    }
	public function SetPass($valor)
    {
        $this->pass = $valor;
    }
	public function SetCsharp($valor)
    {
        $this->csharp = $valor;
    }
	public function SetPhp($valor)
    {
        $this->php = $valor;
    }
	public function SetVisual($valor)
    {
        $this->visual = $valor;
    }
	public function SetHtml($valor)
    {
        $this->html = $valor;
    }
	public function SetJavascript($valor)
    {
        $this->javascript = $valor;
    }
	public function SetJava($valor)
    {
        $this->java = $valor;
    }
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($dni != NULL){
			$obj = Persona::TraerUnaPersona($id);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->dni = $obj->dni;
			$this->foto = $obj->foto;
            $this->email = $obj->email;
            $this->edad = $obj->edad;
			$this->estadoCivil = $obj->estadoCivil;
			$this->sexo = $obj->sexo;
			$this->fecha = $obj->fecha;
			$this->csharp = $obj->csharp;
			$this->php = $obj->php;
			$this->visual = $obj->visual;
			$this->html = $obj->html;
			$this->javascript = $obj->javascript;
			$this->java = $obj->java;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->apellido."-".$this->nombre."-".$this->dni."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaPersona($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;	
					
	}
	
	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}
	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPersona($persona)
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
            update persona 
            set nombre=:nombre,
            apellido=:apellido,
            email=:email,
            dni=:dni,
            edad=:edad,
            estadoCivil=:estadoCivil,
            sexo=:sexo,
            fecha=:fecha,
            pass=:pass,
            csharp=:csharp,
            php=:php,
            visual=:visual,
            html=:html,
            javascript=:javascript,
            java=:java,
            foto=:foto
            WHERE id=:id");
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersona(:id,:nombre,:apellido,:foto)");
        $consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':email', $persona->email, PDO::PARAM_STR);
        $consulta->bindValue(':dni', $persona->dni, PDO::PARAM_STR);
        $consulta->bindValue(':edad', $persona->edad, PDO::PARAM_INT);
        $consulta->bindValue(':estadoCivil', $persona->estadoCivil, PDO::PARAM_STR);
        $consulta->bindValue(':sexo', $persona->sexo, PDO::PARAM_STR);
        $consulta->bindValue(':fecha', $persona->fecha, PDO::PARAM_STR);
        $consulta->bindValue(':pass', $persona->pass, PDO::PARAM_STR);
        $consulta->bindValue(':csharp', $persona->csharp, PDO::PARAM_BOOL);
        $consulta->bindValue(':php', $persona->php, PDO::PARAM_BOOL);
        $consulta->bindValue(':visual', $persona->visual, PDO::PARAM_BOOL);
        $consulta->bindValue(':html', $persona->html, PDO::PARAM_BOOL);
        $consulta->bindValue(':java', $persona->java, PDO::PARAM_BOOL);
        $consulta->bindValue(':javascript', $persona->javascript, PDO::PARAM_BOOL);
        $consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
        return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto,email,edad,estadoCivil,sexo,fecha,pass,csharp,php,visual,html,java,javascript)values(:nombre,:apellido,:dni,:foto,:email,:edad,:estadoCivil,:sexo,:fecha,:pass,:csharp,:php,:visual,:html,:java,:javascript)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':email', $persona->email, PDO::PARAM_STR);
        $consulta->bindValue(':dni', $persona->dni, PDO::PARAM_STR);
        $consulta->bindValue(':edad', $persona->edad, PDO::PARAM_INT);
        $consulta->bindValue(':estadoCivil', $persona->estadoCivil, PDO::PARAM_STR);
        $consulta->bindValue(':sexo', $persona->sexo, PDO::PARAM_STR);
        $consulta->bindValue(':fecha', $persona->fecha, PDO::PARAM_STR);
        $consulta->bindValue(':pass', $persona->pass, PDO::PARAM_STR);
        $consulta->bindValue(':csharp', $persona->csharp, PDO::PARAM_BOOL);
        $consulta->bindValue(':php', $persona->php, PDO::PARAM_BOOL);
        $consulta->bindValue(':visual', $persona->visual, PDO::PARAM_BOOL);
        $consulta->bindValue(':html', $persona->html, PDO::PARAM_BOOL);
        $consulta->bindValue(':java', $persona->java, PDO::PARAM_BOOL);
        $consulta->bindValue(':javascript', $persona->javascript, PDO::PARAM_BOOL);
        $consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	public static function TraerPersonasTest()
	{
		$arrayDePersonas=array();

		$persona = new stdClass();
		$persona->id = "4";
		$persona->nombre = "rogelio";
		$persona->apellido = "agua";
		$persona->dni = "333333";
		$persona->foto = "333333.jpg";

		//$objetJson = json_encode($persona);
		//echo $objetJson;
		$persona2 = new stdClass();
		$persona2->id = "5";
		$persona2->nombre = "Bañera";
		$persona2->apellido = "giratoria";
		$persona2->dni = "222222";
		$persona2->foto = "222222.jpg";

		$persona3 = new stdClass();
		$persona3->id = "6";
		$persona3->nombre = "Julieta";
		$persona3->apellido = "Roberto";
		$persona3->dni = "888888";
		$persona3->foto = "888888.jpg";

		$arrayDePersonas[]=$persona;
		$arrayDePersonas[]=$persona2;
		$arrayDePersonas[]=$persona3;
		 
		

		return  $arrayDePersonas;
				
	}	


}
