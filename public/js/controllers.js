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
  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.alert = {
    type: 'danger',
    msg: 'Poi! Your login info was incorrect. Please try again.',
    show: false,
    closeAlert : function(){this.show = false; }
  }

  $scope.formSelector = 'login';
  $scope.switchForms = function(){
    console.log('ahahdasda');
    $scope.formSelector = ($scope.formSelector === 'login') ? 'register' : 'login';
    console.log($scope.formSelector);
  }

  $scope.login = function(credentials){
    AuthService.login(credentials).then(function (user){
      $rootScope.$broadcast (AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      $scope.alert.show = true;
    })
  }

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  }


}]);
