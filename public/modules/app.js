//submodules
var authSystem = angular.module('authSystem',[]);

var kREL = angular.module('kREL', ['ngRoute','ngCookies', 'ngAnimate', 'ui.router','ui.bootstrap','authSystem']);



kREL.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/overview',{
        templateUrl : 'views/overview.html'
      }).
      when('/login',{
        templateUrl: 'modules/components/authSystem/login.html',
        controller: 'LoginController'
      }).
      otherwise({
        redirectTo: '/#'
      })
}]);

kREL.constant("kREL-CONSTANTS",{
  "NEEDS_AUTH" : ['/overview']
})

kREL.run(['$rootScope', '$location', 'AuthService', "kREL-CONSTANTS",function($rootScope, $location, AuthService, kRELCONSTANTS){
  $rootScope.$on('$routeChangeStart', function(event){

    if(kRELCONSTANTS.NEEDS_AUTH.indexOf($location.path()) != -1){

      if(!AuthService.isAuthenticated()){
        console.log('DENY ACCESS');
        event.preventDefault();
        $location.path('/login');

      }else{

      }
    }

  })
}])
