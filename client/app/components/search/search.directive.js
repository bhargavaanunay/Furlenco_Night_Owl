
angular.module('NightOwl').directive('searchComponent', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope:{
			inputText: '=inputText',
			onSelectLocation: '&onSelectLocation'
		},
		controller: 'SearchController', //function($scope, $element, $attrs, $transclude) {},
		controllerAs: 'vm',
		bindToController: true,
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'components/search/search.html'
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		
	};
});