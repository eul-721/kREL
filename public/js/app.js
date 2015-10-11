var kREL = angular.module('kREL', ['ngRoute', 'ui.router']);

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
}]);

kREL.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProider){
  // $stateProvider
  //   .state()
}])

kREL.constant("AUTH_EVENTS",{
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
  }
).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})



// kREL.service('Session', function(){
//   this.create = function (sessionId, userId, userRole){
//     this.id = sessionId;
//     this.userId = userId;
//     this.userRole = userRole;
//   };
//   this.destroy = function(){
//     this.id = null;
//     this.userId = null;
//     this.userRole = null;
//   }
// })


// kREL.factory('AuthService',
//   ['$q', '$timeout', '$http',
//     function($q, $timeout, $http){
//       var user = null;
//
//       return({
//         isLoggedIn: isLoggedIn,
//         getUserStatus: getUserStatus,
//         login: login,
//         logout: logout,
//         register: register
//       })
//     }]
// )



// module.config(['$httpProvider', function($httpProvider) {
//   $httpProvider.interceptors.push(function($q, $location){
//     return {
//       response: function(response){
//         //do something on success
//         return response;
//       },
//       responseError: function(response){
//         if (response.status === 4051)
//           $location.url('/login');
//         return $q.reject(response);
//       }
//     }
//   })
// }]);
