angular
    .module('NightOwl')
    .service('authenticationService', function authenticationService($http, baseUrl, $window){
	
	var user;

	function getUser () {
		user = user || JSON.parse($window.localStorage.getItem('user'));
		return user || {};
	}
	function setUser (newUser) {
		user = newUser;
		$window.localStorage.setItem('user', JSON.stringify(user));
	}
	function logout(){
		$window.localStorage.removeItem('user');
		user = {};
	}

	function login (user) {
		var request = {
			method: 'POST',
			url: baseUrl + '/login/',
			data: user,
			headers: {
			   'Content-Type': 'application/json'
		 	}
		};
		return $http.post(baseUrl + '/login/',user);
	}

	function signUp (user) {
		return $http.post(baseUrl + '/signup/',user);
	}

	return {
		login: login,
		logout: logout,
		signUp: signUp,
		getUser: getUser,
		setUser: setUser
	}
});