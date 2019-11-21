(function () {
	
	'use strict';
	
	angular
		.module('app.uf')
		.controller('UnidadeFederativaCtrl', CtrlForm);
	
	CtrlForm.$inject = ['$http', 'DTColumnBuilder', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'datatables', 'toastr'];
	
	function CtrlForm($http,
			DTColumnBuilder, 
			DTOptionsBuilder, 
			DTColumnDefBuilder,
			datatables,
			toastr) {
		/* jshint validthis: true */
		var vm = this;

		var endPointUf = 'http://31.220.54.212:8080/celk-app/rs/uf';

		vm.abrir = abrir;
		vm.atualizar = atualizar;
		vm.carregar = carregar;
		vm.registrar = registrar;
		vm.remover = remover;

		criarTabela();
		initToastr();

		function abrir() {
			delete vm.model;
			$('#modalUf').modal('show');
		}

		function atualizar() {
    		$http.put(endPointUf + '/' + vm.model.id, vm.model).then(success).catch(error);

	    	function error(response) {
	    		toastr.error("Ocorreu um erro ao atualizar o registro.");
	    	}

	    	function success(response) {
	    		toastr[response.data.message[0].tipo](response.data.message[0].mensagem);

	    		if (response.data.status == 'true') {
	    			lerDadosTabela();
	    			$('#modalUf').modal('hide');
	    		}
	    	}
    	}

		function carregar(id) {
			$http.get(endPointUf + '/' + id).then(success).catch(error);

	    	function error(response) {
	    		toastr.error("Ocorreu um erro ao ler os dados do registro.");
	    	}

	    	function success(response) {
	    		vm.model = response.data.data.UnidadeFederativaDto;
	    		$('#modalUf').modal('show');
	    	}
		}

    	function criarTabela() {
    		vm.tabela = {};
		    vm.tabela.opcoes = DTOptionsBuilder.newOptions()
		    	.withPaginationType('full_numbers')
		    	.withDisplayLength(10)
		    	.withLanguage(datatables.ptbr)
		    	.withBootstrap();

		    vm.tabela.colunas = [
	        	DTColumnDefBuilder.newColumnDef(0),
	        	DTColumnDefBuilder.newColumnDef(1),
	        	DTColumnDefBuilder.newColumnDef(2).notSortable()
	    	];

	    	lerDadosTabela();
    	}	    

		function initToastr() {
			toastr.options.timeOut = 3000;
			toastr.options.progressBar = true;
			toastr.options.closeButton = true;
	        toastr.options.positionClass = 'toast-bottom-right';
	        toastr.options.preventDuplicates = true;
		}

    	function lerDadosTabela() {
    		$http.get(endPointUf).then(success).catch(error);

	    	function error(response) {
	    		toastr.error("Ocorreu um erro ao carregar a lista.");
	    	}

	    	function success(response) {
	    		vm.lista = response.data.data.ArrayList;
	    	}
    	}

    	function registrar() {
    		$http.post(endPointUf, vm.model).then(success).catch(error);

	    	function error(response) {
	    		toastr.error("Ocorreu um erro ao criar o registro.");
	    	}

	    	function success(response) {
	    		toastr[response.data.message[0].tipo](response.data.message[0].mensagem);

	    		if (response.data.status == 'true') {
	    			lerDadosTabela();
	    			$('#modalUf').modal('hide');
	    		}
	    	}
    	}

    	function remover(id) {
    		$.confirm({
    			title: "Confirmação",
				content: "Tem certeza de que deseja excluir?",
				buttons: {
					confirm: {
						text: 'Sim, remover!',
						btnClass: "btn btn-danger",
						action: function () {
							$http.delete(endPointUf + '/' + id, vm.model).then(success).catch(error);
						}
					},
					cancel: {
						text: 'Não',
						btnClass: "btn btn-default",
						action: function () {}
					}
				}			    		        
			});	

			function error(response) {
	    		toastr.error("Ocorreu um erro ao remover o registro.");
	    	}

	    	function success(response) {
	    		toastr[response.data.message[0].tipo](response.data.message[0].mensagem);

	    		if (response.data.status == 'true') {
	    			lerDadosTabela();
	    		}
	    	}
    	}
	}
			
})(); 	