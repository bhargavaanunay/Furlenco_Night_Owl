

angular
    .module('NightOwl')
    .controller('MainController', MainController);

function MainController() { 
	var vm = this;
	
	vm.user = {};
	
	activate();

	function activate () {
		console.log('hello');
	
	}

	function login(){

	}
	function logout () {
		
	}
}