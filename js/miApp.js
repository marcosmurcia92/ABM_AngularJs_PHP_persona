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
	$urlRouterProvider.otherwise("/persona/grilla");
});

miApp.controller("controlInicio",function($scope){

});

miApp.controller("controlPersonaMenu",function($scope){

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