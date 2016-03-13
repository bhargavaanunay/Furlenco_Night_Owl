
angular
	.module('NightOwl')
	.controller('LoginController', LoginController);

LoginController.$inject = ['$uibModalInstance','authenticationService'];

function LoginController($uibModalInstance, authenticationService){
	var vm = this;
	
	vm.user = {};
	vm.newUser = {};
	vm.onClickLogin = onClickLogin;
	vm.onClickSignUp = onClickSignUp;
	vm.isSignInPage = true;

	activate();

	function activate () {
		console.log('hello');
	}

	function onClickLogin (user) {
		authenticationService.login(user)
			.success(function(data){
				authenticationService.setUser(vm.user);
				if(data.result === "success"){
					$uibModalInstance.close();
				}
			});
	}
	function onClickSignUp (user) {
		authenticationService.signUp(user).success(function(data){
				if(data.result === "success"){
					vm.isSignInPage = true;
				}
			});
	}
}