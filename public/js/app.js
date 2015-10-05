var kREL = angular.module('kREL', ['ngRoute']);

kREL.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/map/:mapId',{
        templateUrl: 'views/map-record.html',
        controller: 'MapDetailsController'
      }).
      otherwise({
        redirectTo: '/#'
      })
}])

kREL.factory('AuthService',
  ['$q', '$timeout', '$http',
    function($q, $timeout, $http){
      var user = null;

      return({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register
      })
    }]
)

module.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(function($q, $location){
    return {
      response: function(response){
        //do something on success
        return response;
      },
      responseError: function(response){
        if (response.status === 4051)
          $location.url('/login');
        return $q.reject(response);
      }
    }
  })
}]);
