/*Al comenzar el juego generamos un número 
secreto del 1 al 100, en la pantalla del juego
 dispondremos de un cuadro de texto para ingresar
  un número y un botón “Verificar”, si el número 
  ingresado es el mismo que el número secreto se dará 
  por terminado el juego con un mensaje similar a este: 
“Usted es un ganador!!! y en solo X intentos”.
de no ser igual se debe informar si “falta…”  para llegar al número secreto  o si “se pasó…”  del número secreto.
*/


var app = angular.module('angularIngreso', []);//mvc module vision controller, con bindfing se modifica automaticamente en la misma pagina sin refrescar.


app.controller('controlAdivina', function($scope, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
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
	else{$scope.contadorIntentos= $scope.contadorIntentos+1;}
		 
	
	}




});



