angular
  .module('app')
  .service('personasSrv', function ($http) {
  		var urlFotos = 'http://marcosmurciautn.hol.es/ws1/PHP/nexoFoto.php';
  		var urlUnoSolo = 'http://marcosmurciautn.hol.es/ws1/persona/';
  		var urlTodos = 'http://marcosmurciautn.hol.es/ws1/personas/';

  		function traerUrlABM(parametro){
	      if(!parametro){
	        return urlUnoSolo;
	      }else{
	        return urlUnoSolo + parametro;
	      }
	    };

  		function traerUrlTodos(){
	        return urlTodos;
	    };

	   	this.TraerUrlFotos = function(){
	   		return urlFotos;
	   	};

	   	this.AltaPersona = function(jsonPersona){
	   		return $http.post(traerUrlABM(jsonPersona));
	   	}

	   	this.TraerTodos = function(){
	   		return $http.get(traerUrlTodos());
	   	};

	   	this.BorrarPersona = function(idPersona){
	   		return $http.delete(traerUrlABM(idPersona));
	   	}

	   	this.ModificarPersona = function(jsonPersona){
	   		return $http.put(traerUrlABM(jsonPersona));
	   	};
  })

  .service('usuariosSrv', function ($http) {
  		var urlFotos = 'http://marcosmurciautn.hol.es/ws1/PHP/nexoFoto.php';
  		var urlUnoSolo = 'http://marcosmurciautn.hol.es/ws1/usuario/';
  		var urlTodos = 'http://marcosmurciautn.hol.es/ws1/usuarios/';

  		function traerUrlABM(parametro){
	      if(!parametro){
	        return urlUnoSolo;
	      }else{
	        return urlUnoSolo + parametro;
	      }
	    };

  		function traerUrlTodos(){
	        return urlTodos;
	    };

	   	this.TraerUrlFotos = function(){
	   		return urlFotos;
	   	};

	   	this.TraerTodos = function(){
	   		return $http.get(traerUrlTodos());
	   	};

	   	this.TraerUsuario = function(dni){
	   		return $http.get(traerUrlABM(dni));
	   	}

	   	this.RegistrarUsuario = function(jsonUsuario){
	   		return $http.post(traerUrlABM(jsonUsuario));
	   	}

	   	this.BorrarUsuario = function(idUsuario){
	   		return $http.delete(traerUrlABM(idUsuario));
	   	}
  })