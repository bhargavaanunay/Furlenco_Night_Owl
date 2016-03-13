
angular
	.module('NightOwl')
	.controller('HeaderController', HeaderController);

HeaderController.$inject = ['$uibModal', 'authenticationService','$state'];

function HeaderController($uibModal, authenticationService, $state){
	var vm = this;
	
	vm.user = {};
	// vm.onClickLogin = onClickLogin;
	// vm.onClickLogout = onClickLogout;
	vm.open = open;
	vm.isSignInPage = true;
	vm.logout = logout;

	activate();

	function activate () {
		console.log('hello');
		modalConfig = {
			size: 'md',
			animation: true
		};
		vm.user = authenticationService.getUser();
		if(vm.user.username){
			$state.go('shops');
		}
		else{
			$state.go('home');
		}
	}

	function logout(){
		authenticationService.logout();
		$state.go('home');
	}
	function open() {
		$uibModal
			.open({
				animation: modalConfig.animation,
				templateUrl: 'components/main/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm',
				size: modalConfig.size
		    })
	    	.result.then(function () {
		      	$state.go('shops');
		    }, function () {
		      	
		    });
    }
}