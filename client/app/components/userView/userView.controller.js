
angular
	.module('NightOwl')
	.controller('UserViewController', UserViewController);

UserViewController.$inject = ['authenticationService'];

function UserViewController(authenticationService){
	var vm = this;
	
	vm.user = {};
	vm.viewShopTab = true;
	
	activate();

	function activate () {
		console.log('hello');
	}

	
}