
angular.module('NightOwl').directive('headerComponent', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		controller: 'HeaderController', //function($scope, $element, $attrs, $transclude) {},
		controllerAs: 'vm',
		bindToController: true,
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'components/header/header.html',
		scope:{
			user: '=?user'
		}
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		
	};
});