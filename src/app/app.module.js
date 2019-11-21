(function () {

	'use strict';

	angular
		.module('app', [
			// módulos externos
			'ngRoute', 
			'datatables',
			'datatables.bootstrap', 
			// módulo pessoal
			'app.uf'])
		.constant('toastr', toastr);

})();