angular.module('NightOwl', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

angular.module('NightOwl').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider.
        state('home',{
            url: "/",
            templateUrl: "components/main/main.html",
            controller: "MainController",
            controllerAs: "vm"
        }).
        state('shops',{
            url: "/shops",
            templateUrl: "components/userView/userView.html",
            controller: "UserViewController",
            controllerAs: "vm"
        });


    $urlRouterProvider.otherwise('');

});


angular.module('NightOwl').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('NightOwl')
    .value('baseUrl', 'http://192.168.2.59:8080');