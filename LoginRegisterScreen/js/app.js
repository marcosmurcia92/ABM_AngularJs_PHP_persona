var app = angular.module('SalaDeJuegosApp', []);//mvc module vision controller, con binding se modifica automaticamente en la misma pagina sin refrescar.


app.controller('LoginRegisterController', function($scope, $http) {//cuando se dispara la funcion automaticamente es referenciado al js y html
  	
  	$scope.dateNow = new Date();
  	console.log($scope.dateNow);
	/*$scope.jugador={};
	$scope.jugador.estadoC="empty";*/
 });