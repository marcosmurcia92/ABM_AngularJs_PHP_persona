/*En esta oportunidad el juego evaluará tus
 aptitudes a partir de la cantidad de intentos, 
 por lo cual se informará lo siguiente:
1° intento: “usted es un Psíquico”.
2° intento: “excelente percepción”.
3° intento: “Esto es suerte”.
4° intento: “Excelente técnica”.
5° intento: “usted está en la media”.
Desde  6 Intentos hasta 10:”falta técnica”
Más de 10 intentos: “afortunado en el amor!!”.*/

var app = angular.module('angularIngreso', []);//mvc module vision controller, con bindfing se modifica automaticamente en la misma pagina sin refrescar.


app.controller('controlAdivina2', function($scope, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
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