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
	$urlRouterProvider.otherwise("/persona/alta");
});

miApp.controller("controlInicio",function($scope){

});

miApp.controller("controlPersonaMenu",function($scope){

});

miApp.controller("controlPersonaAlta",function($scope){

});