(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/uf', {
				templateUrl: 'src/app/uf/uf.html?' + new Date().getTime(),
				controller: 'UnidadeFederativaCtrl',
				controllerAs: 'vm'
			});

		$routeProvider.otherwise({redirectTo: '/uf'});
		// $locationProvider.html5Mode(true);		
	}
})();