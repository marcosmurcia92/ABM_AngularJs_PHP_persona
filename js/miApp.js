var miApp = angular.module("AngularABM",['ui.router','angularFileUpload','satellizer']);

miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){

	$authProvider.loginUrl= 'http://marcosmurciautn.hol.es/ws1/PHP/server/jwt/php/auth.php';
	$authProvider.tokenName = 'MurciaLoginToken';
	$authProvider.tokenPrefix = 'Aplicacion';
	$authProvider.authHeader = 'data';

	$authProvider.github({
      clientId: 'd69b1192a7e78b5ee9ff',
      responseType: 'token',
      redirectUri: ''
    });

	$stateProvider
		.state(
			"inicio",
			{
				url:'/inicio',
				templateUrl:'inicio.html',
				controller:"controlInicio"
			}
		)
		.state(
			"login",
			{
				url:'/login',
				templateUrl:'login.html',
				controller:"LoginController"
			}
		)
		.state(
			"register",
			{
				url:'/register',
				templateUrl:'register.html',
				controller:"RegisterController"
			}
		)
		.state(
			"usuarios",
			{
				url:'/usuarios',
				templateUrl:'usuarioGrilla.html',
				controller:"ControlUsuariosGrilla"
			}
		)
		.state(
			"juegos",
			{
				url:'/juegos',
				abstract:true,
				templateUrl:'8TPs/abstractaJuegos.html'
			}
		)
		.state(
			"juegos.menu",
			{
				url:'/menu',
				views:{
					"juegoContenido":{
						templateUrl:'8TPs/juegosMenu.html',
						controller:'controlJuegosMenu'
					}
				}
			}
		)
		.state(
			"juegos.adivina1",
			{
				url:'/adivina1',
				views:{
					"juegoContenido":{
						templateUrl:'8TPs/adivina1.html',
						controller:'controlAdivina'
					}
				}
			}
		)
		.state(
			"juegos.adivina2",
			{
				url:'/adivina2',
				views:{
					"juegoContenido":{
						templateUrl:'8TPs/adivina2.html',
						controller:'controlAdivina2'
					}
				}
			}
		)
		.state(
			"persona",
			{
				url:'/persona',
				abstract:true,
				templateUrl:'abstractaPersona.html'
			}
		)
		.state(
			"persona.menu",
			{
				url:'/menu',
				views:{
					"contenido":{
						templateUrl:'personaMenu.html',
						controller:'controlPersonaMenu'
					}
				}
			}
		)
		.state(
			"persona.alta",
			{
				url:'/alta',
				views:{
					"contenido":{
						templateUrl:'personaAlta.html',
						controller:'controlPersonaAlta'
					}
				}
			}
		)
		.state(
			"persona.grilla",
			{
				url:'/grilla',
				views:{
					"contenido":{
						templateUrl:'personaGrilla.html',
						controller:'controlPersonaGrilla'
					}
				}
			}
		)
		.state(
			'persona.modificacion',
			{
				url: '/modificacion/{id}?:nombre:apellido:dni:foto:foto2:foto3',
				views:{
					"contenido":{
						templateUrl: 'personaAlta.html',
						controller: 'controlModificacion'
					}
				}
			}
		)
		.state(
			'persona.perfil',
			{
				url: '/perfil/{id}?:nombre:apellido:dni:foto:foto2:foto3',
				views:{
					"contenido":{
						templateUrl: 'personaPerfil.html',
						controller: 'controlPerfil'
					}
				}
			}
		)
	$urlRouterProvider.otherwise("/inicio");
});

miApp.run(function($rootScope){

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = toState.containerClass;
    });

});

miApp.controller("controlInicio",function($scope){

});

miApp.controller("controlPerfil",function($scope,$state,$auth,$stateParams){

	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

	$scope.persona = {};
	$scope.persona.id=$stateParams.id;
	$scope.persona.nombre=$stateParams.nombre;
	$scope.persona.apellido=$stateParams.apellido;
	$scope.persona.dni=$stateParams.dni;
	$scope.persona.foto=$stateParams.foto;
	$scope.persona.foto2=$stateParams.foto2;
	$scope.persona.foto3=$stateParams.foto3;


});

miApp.controller("controlPersonaMenu",function($scope,$state,$auth){

	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

	$scope.irAAlta=function(){
		$state.go('persona.alta');
	}
	$scope.irAGrilla=function(){
		$state.go('persona.grilla');
	}
});

miApp.controller("controlPersonaAlta",function($scope,$state,$auth,$http,FileUploader,personasSrv){

	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

  $scope.DatoTest="**alta**";
  

//inicio las variables
  $scope.SubidorDeArchivos=new FileUploader({url:personasSrv.TraerUrlFotos()});
  $scope.SubidorDeArchivos.queueLimit = 3;
  $scope.persona={};
  $scope.persona.nombre= "" ;
  $scope.persona.dni= "" ;
  $scope.persona.apellido= "" ;
  $scope.persona.foto="pordefecto.png";
  $scope.persona.foto2="pordefecto.png";
  $scope.persona.foto3="pordefecto.png";
  //$scope.foto="fotos/pordefecto.png";
  //$scope.persona.foto="fotos/pordefecto.png";
  $scope.SubidorDeArchivos.onSuccessItem=function(item, response, status, headers)
  {
	console.info("Ya guardé el archivo.", item, response, status, headers);
  };

  $scope.SubidorDeArchivos.onCompleteAll =function()
  {
  	personasSrv.AltaPersona(JSON.stringify($scope.persona))
	//$http.post('http://marcosmurciautn.hol.es/ws1/persona/'+ JSON.stringify($scope.persona))
	  .then(function(respuesta) {     	
			 //aca se ejetuca si retorno sin errores      	
		 console.log(respuesta.data);
		 $state.go("persona.perfil",{
		 	id:respuesta.data.id, 
		 	nombre:respuesta.data.nombre,
		 	apellido:respuesta.data.apellido,
		 	dni:respuesta.data.dni, 
		 	foto:respuesta.data.foto,
		 	foto2:respuesta.data.foto2,
		 	foto3:respuesta.data.foto3});

	},function errorCallback(response) {     		
			//aca se ejecuta cuando hay errores
			console.log( response);     			
	  });
  };


  $scope.Guardar=function(){
	console.log($scope.SubidorDeArchivos.queue);
	if($scope.SubidorDeArchivos.queue[0]!=undefined)
	{
		var nombreFoto = $scope.SubidorDeArchivos.queue[0]._file.name;
		$scope.persona.foto=nombreFoto;
	}
	if($scope.SubidorDeArchivos.queue[1]!=undefined)
	{
		var nombreFoto2 = $scope.SubidorDeArchivos.queue[1]._file.name;
		$scope.persona.foto2=nombreFoto2;
	}
	if($scope.SubidorDeArchivos.queue[2]!=undefined)
	{
		var nombreFoto3 = $scope.SubidorDeArchivos.queue[2]._file.name;
		$scope.persona.foto3=nombreFoto3;
	}
	$scope.SubidorDeArchivos.uploadAll();
  	console.log("persona a guardar:");
    console.log($scope.persona);

  }
});

miApp.controller("controlPersonaGrilla",function($scope,$http,$state,$auth,personasSrv){
	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

  	$scope.DatoTest="**grilla**";
 	
 	personasSrv.TraerTodos()
 	// $http.get('http://marcosmurciautn.hol.es/ws1/personas/', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
     			/*

					https://docs.angularjs.org/api/ng/service/$http

     			the response object has these properties:

				data – {string|Object} – The response body transformed with the transform functions.
				status – {number} – HTTP status code of the response.
				headers – {function([headerName])} – Header getter function.
				config – {Object} – The configuration object that was used to generate the request.
				statusText – {string} – HTTP status text of the response.
						A response status code between 200 and 299 is considered a success
						 status and will result in the success callback being called. 
						 Note that if the response is a redirect, XMLHttpRequest will 
						 transparently follow it, meaning that 
						 the error callback will not be called for such responses.
 	 */
 	 });
	/*$scope.Modificar=function(persona)
	{
		$state.go("modificacion", persona);
	};*/

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);


	personasSrv.BorrarPersona(persona.id)
	//$http.delete("http://marcosmurciautn.hol.es/ws1/persona/"+persona.id,{datos:{accion :"borrar",id:persona.id}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
	 .then(function(respuesta) {       
	         //aca se ejetuca si retorno sin errores        
	         console.log(respuesta.data);
			 personasSrv.TraerTodos()
			 //$http.get('http://marcosmurciautn.hol.es/ws1/personas/', { params: {accion :"traer"}})
			.then(function(respuesta) {     	

				 $scope.ListadoPersonas = respuesta.data;
				 console.log(respuesta.data);

			},function errorCallback(response) {
					 $scope.ListadoPersonas= [];
					console.log( response);
			 });

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

/*
     $http.post('PHP/nexoBorrar.php', 
      headers: 'Content-Type': 'application/x-www-form-urlencoded',
      params: {accion :"borrar",persona:persona})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

*/
 	}




 	/*$scope.Modificar=function(persona){
 		$http.post('PHP/nexoModificar.php', { datos: {accion :"modificar",persona:$scope.persona}})
		  .then(function(respuesta) {     	
				 //aca se ejetuca si retorno sin errores      	
			 console.log(respuesta.data);
			 location.href="formGrilla.html";

		},function errorCallback(response) {     		
				//aca se ejecuta cuando hay errores
				console.log( response);     			
		  });
 		/*console.log("Modificar"+id);
		$http.post("PHP/nexoBuscar.php", {datos:{accion:"buscar", id:id}})
		.then(function(respuesta)
		{
			var persona=respuesta.data;
			$state.go("alta");//location.href="formAlta.html";
			$scope.DatoTest=persona.nombre;
			console.log(persona);
		} ,function errorCallback(response) {        
			//aca se ejecuta cuando hay errores
			console.log(response);           
		});
 	}*/
});

miApp.controller('controlModificacion', function($scope, $http, $state, $auth, $stateParams, FileUploader, personasSrv)//, $routeParams, $location)
{
	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

	$scope.persona={};
	$scope.DatoTest="**Modificar**";
	$scope.SubidorDeArchivos=new FileUploader({url:personasSrv.TraerUrlFotos()});
	console.log($stateParams);//$scope.persona=$stateParams;
	$scope.persona.id=$stateParams.id;
	$scope.persona.nombre=$stateParams.nombre;
	$scope.persona.apellido=$stateParams.apellido;
	$scope.persona.dni=$stateParams.dni;
	$scope.persona.foto=$stateParams.foto;
	$scope.persona.foto2=$stateParams.foto2;
	$scope.persona.foto3=$stateParams.foto3;
	$scope.SubidorDeArchivos.onSuccessItem=function(item, response, status, headers)
	{
		personasSrv.ModificarPersona(JSON.stringify($scope.persona));
		//$http.put('http://marcosmurciautn.hol.es/ws1/persona/'+JSON.stringify($scope.persona), { datos: {accion :"modificar"}})
		.then(function(respuesta) 
		{
			//aca se ejetuca si retorno sin errores      	
			console.log(respuesta.data);
			$state.go("grilla");
		},
		function errorCallback(response)
		{
			//aca se ejecuta cuando hay errores
			console.log( response);     			
		});
		console.info("Ya guardé el archivo.", item, response, status, headers);
	};
	$scope.Guardar=function(persona)
	{
		if($scope.SubidorDeArchivos.queue[0]!=undefined)
		{
			var nombreFoto = $scope.SubidorDeArchivos.queue[0]._file.name;
			$scope.persona.foto=nombreFoto;
		}
		if($scope.SubidorDeArchivos.queue[1]!=undefined)
		{
			var nombreFoto2 = $scope.SubidorDeArchivos.queue[1]._file.name;
			$scope.persona.foto2=nombreFoto2;
		}
		if($scope.SubidorDeArchivos.queue[2]!=undefined)
		{
			var nombreFoto3 = $scope.SubidorDeArchivos.queue[2]._file.name;
			$scope.persona.foto3=nombreFoto3;
		}
		$scope.SubidorDeArchivos.uploadAll();
	}
});

miApp.controller('LoginController', function($scope,$state, $http, $auth, usuariosSrv) {
  	
	$scope.usuario = {};
	$scope.usuario.clave = "";
	$scope.usuario.dni = "";
	$scope.usuario.correo = "";
	$scope.errorExistente = false;
	$scope.errorAdmin = false;

	$scope.isAuthenticated = $auth.isAuthenticated();

	if($auth.isAuthenticated()){
		console.info("token",$auth.getPayload());
		console.info("token2",$auth.getToken());
	}else{
		console.info("no token",$auth.getPayload());
		console.info("no token2",$auth.getToken());
	}

  	$scope.IniciarSesion = function(){
  		usuariosSrv.TraerUsuario($scope.usuario.dni)
  		//$http.get('http://marcosmurciautn.hol.es/ws1/usuario/'+$scope.usuario.dni, { 
  		//	datos: {accion :"buscar",dni:$scope.usuario.dni}})
		  .then(function(respuesta) {     	    	
			 console.log("Usuario: " + respuesta.data);
			 if(respuesta.data != "false"){
				 	$auth.login($scope.usuario)
				  .then(function(response) {
				  	console.info("Correcto",response);
				  	if(!response.data.MurciaLoginToken){
				  		console.log("NO ES ADMIN");
				  		$scope.errorAdmin= true;
				  	}else{
				  		$state.go("inicio");
				  	}
				  	
				  })
				  .catch(function(response) {
				  	console.info("Error",response);

				  });
			}else{
				$scope.errorExistente = true;   
			}

		},function errorCallback(response) {     		
				//aca se ejecuta cuando hay errores
				console.log( response); 
				$scope.errorExistente = true;    			
		  });
  		
  	}

  	$scope.LoginGitHub = function(){
  		$auth.authenticate('github')
  		.then(function(success) {
          console.info("Success",success);
        })
        .catch(function(error) {
          console.info("ERROR",error);
        });
  	}

  	$scope.LogOut = function()
  	{
  		$auth.logout();
  		$state.reload();
  	}

  	$scope.GoToMenu = function(){
		$state.go("inicio");
  	}
  	
 });

miApp.controller('RegisterController', function($scope, $http, usuariosSrv) {
  	
  	$scope.dateNow = new Date();
  	console.log($scope.dateNow);


  $scope.Registrar=function(){
  	console.log("usuario a guardar:");
    console.log($scope.usuario);

    usuariosSrv.RegistrarUsuario(JSON.stringify($scope.usuario))
	//$http.post('http://marcosmurciautn.hol.es/ws1/usuario/', { datos: {accion :"insertar",usuario:$scope.usuario}})
	  .then(function(respuesta) {     	
			 //aca se ejetuca si retorno sin errores      	
		 console.log(respuesta.data);

	},function errorCallback(response) {     		
			//aca se ejecuta cuando hay errores
			console.log( response);     			
	  });
  }
	/*$scope.jugador={};
	$scope.jugador.estadoC="empty";*/
 });

miApp.controller("ControlUsuariosGrilla",function($scope,$http,$state,$auth,usuariosSrv){
	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

  	$scope.DatoTest="**grilla usuarios**";
 	
 	usuariosSrv.TraerTodos()
 	//$http.get('http://marcosmurciautn.hol.es/ws1/usuarios', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoUsuarios = respuesta.data;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoUsuarios= [];
     		console.log( response);
 	 });

 	$scope.Borrar=function(usuario){
		console.log("borrar"+usuario);

	usuariosSrv.BorrarUsuario(usuario.id)
	//$http.delete("http://marcosmurciautn.hol.es/ws1/usuario/"+usuario.id,{datos:{accion :"borrar",id:usuario.id}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
	 .then(function(respuesta) {       
	         //aca se ejetuca si retorno sin errores        
	         console.log(respuesta.data);
	         usuariosSrv.TraerTodos()
			 //$http.get('http://marcosmurciautn.hol.es/ws1/usuarios', { params: {accion :"traer"}})
			.then(function(respuesta) {     	

				 $scope.ListadoUsuarios = respuesta.data;
				 console.log(respuesta.data);

			},function errorCallback(response) {
					 $scope.ListadoUsuarios= [];
					console.log( response);
			 });

    },function errorCallback(response) {       
        console.log( response);           
    });
 	}

});

miApp.controller('controlJuegosMenu', function($scope,$state,$auth, $http) {
  
  	if(!$auth.isAuthenticated()){
		$state.go("login");
	}
});

miApp.controller('controlAdivina', function($scope,$state,$auth, $http) {
  
  	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

  $scope.numeroSecreto=0;
   $scope.contadorIntentos=0;
   $scope.resultadoF=3;
   $scope.alerta="";
   $scope.numero = 0;

   $scope.comenzar=function(){
	 $scope.numeroSecreto=parseInt(Math.floor(Math.random()*100)+1);
	}
	$scope.verificar=function(){
		if($scope.numero> $scope.numeroSecreto)
			{
				 $scope.alerta="se paso del numero secreto";
			}
		if($scope.numero< $scope.numeroSecreto)
			{
				$scope.alerta="casi pero no! el numero es mas grande";
			}
		if($scope.numero== $scope.numeroSecreto)
			{
				$scope.alerta="usted es el ganador!!!";
			 
			}
		else{
			$scope.contadorIntentos= $scope.contadorIntentos+1;
		}
	}
});

miApp.controller('controlAdivina2', function($scope,$state,$auth, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
  
	if(!$auth.isAuthenticated()){
		$state.go("login");
	}

  $scope.numeroSecreto=0;
   $scope.contadorIntentos=0;
   $scope.resultadoF=3;
   $scope.alerta="";
   $scope.numero = 0;
  
   $scope.comenzar=function(){
	 $scope.numeroSecreto=parseInt(Math.floor(Math.random()*100)+1);
	}

	$scope.verificar=function(){
		if($scope.numeroSecreto != 0){
		
			if($scope.numero> $scope.numeroSecreto)
				{
					 $scope.alerta="se paso del numero secreto";
				}
			
			if($scope.numero< $scope.numeroSecreto)
				{
					$scope.alerta="casi pero no! el numero es mas grande";
				}

			if($scope.numero== $scope.numeroSecreto)
				{
				 	if($scope.contadorIntentos <= 1){
						$scope.alerta="UD es un Psiquico!";
					}else if($scope.contadorIntentos == 2){
						$scope.alerta="Excelente percepción!";
					}else if($scope.contadorIntentos == 3){
						$scope.alerta="Esto es Suerte!";
					}else if($scope.contadorIntentos == 4){
						$scope.alerta="Excelente técnica!";
					}else if($scope.contadorIntentos == 5){
						$scope.alerta="Usted está en la media!";
					}else if($scope.contadorIntentos >= 6 && $scope.contadorIntentos < 10){
						$scope.alerta="Falta técnica!";
					}else if($scope.contadorIntentos >= 10){
						$scope.alerta="Afortunado en el Amor! *.*";
					}
					$scope.numeroSecreto = 0;
				}
			else{$scope.contadorIntentos= $scope.contadorIntentos+1;}
		}else{
			$scope.alerta="INICIE EL JUEGO PARA VERIFICAR";
		}
	}
});