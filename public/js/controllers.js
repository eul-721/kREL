kREL.controller('SidebarController',['$scope', function($scope){
    $scope.mapsIndexes = {
      "1":[1,2,3,4,5,6],
      "2":[1,2,3,4,5],
      "3":[1,2,3,4,5],
      "4":[1,2,3,4,5],
      "5":[1,2,3,4,5],
      "6":[1,2,3]
    }
  }]);

kREL.controller('LoginController', ['$scope','$rootScope', 'AuthService', 'AUTH_EVENTS',function($scope,$rootScope, AuthService, AUTH_EVENTS ){
  console.log(AUTH_EVENTS);

  console.log(AuthService)
  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function(credentials){
    AuthService.login(credentials).then(function (user){
      $rootScope.$broadcast (AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    })
  }

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  }


}]);
