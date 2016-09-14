var miApp = angular.module("AngularABM",['ui.router']);

miApp.config(function($stateProvider,$urlRouterProvider){
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
				controller:"LoginRegisterController"
			}
		)
		.state(
			"register",
			{
				url:'/register',
				templateUrl:'register.html',
				controller:"LoginRegisterController"
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
						templateUrl:'8TPs/juegosMenu.html'
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
	$urlRouterProvider.otherwise("/juegos/adivina1");
});

miApp.run(function($rootScope){

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = toState.containerClass;
    });

});

miApp.controller("controlInicio",function($scope){

});

miApp.controller("controlPersonaMenu",function($scope,$state){
	$scope.irAAlta=function(){
		$state.go('persona.alta');
	}
	$scope.irAGrilla=function(){
		$state.go('persona.grilla');
	}
});

miApp.controller("controlPersonaAlta",function($scope){
  $scope.DatoTest="**alta**";

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
 $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="sinfoto";
  


  $scope.Guardar=function(){


  	console.log("persona a guardar:");
    console.log($scope.persona);

    
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
 	  .then(function(respuesta) {     	
 		     //aca se ejetuca si retorno sin errores      	
      	 console.log(respuesta.data);

    },function errorCallback(response) {     		
     		//aca se ejecuta cuando hay errores
     		console.log( response);     			
 	  });

  

  }
});

miApp.controller("controlPersonaGrilla",function($scope,$http){
  	$scope.DatoTest="**grilla**";
 	  console.log("Estoy en la Grilla");

    $scope.ListadoPersonas = [];

 	$http.get('http://www.mocky.io/v2/57c8ab91120000e613e76a88')
  .then(function(respuesta){
    //CORRECTO
    $scope.ListadoPersonas = respuesta.data;
    console.info("Volvio",respuesta.data);
  },function(error){
    //INCORRECTO
    $scope.ListadoPersonas = [];
    console.info("ERROR",error);
  });

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);
	}

 	$scope.Modificar=function(id){
 		
 		console.log("Modificar"+id);
 	}
});

miApp.controller('LoginRegisterController', function($scope, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
  	
  	$scope.dateNow = new Date();
  	console.log($scope.dateNow);
	/*$scope.jugador={};
	$scope.jugador.estadoC="empty";*/
 });

miApp.controller('controlAdivina', function($scope, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
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

miApp.controller('controlAdivina2', function($scope, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
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