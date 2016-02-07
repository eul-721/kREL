authSystem.controller('LoginController', ['$scope','$rootScope','$timeout','$location', 'AuthService', 'AUTH_EVENTS',function($scope,$rootScope,$timeout,$location, AuthService, AUTH_EVENTS ){
  "use strict";
  $scope.credentials = {
    username: '',
    password: '',
    email: ''
  };



  $scope.alert = {
    type: 'danger',
    msg: {
          'incorrectLogin' : 'Poi! Your login info was incorrect. Please try again.',
          'regError' : 'Poi! We were not able to register you at this time. Please try again later.'
        },
    show: false,
    closeAlert : function(){this.show = false; }
  };

  var alerts = {
    IncorrectLogin:{
      type: 'danger',
      msg: 'Poi! Your login info was incorrect. Please try again.'
    },
    SuccessfulLogin: {
      type: 'success',
      msg: 'Poi! Redirecting...'
    },
    RegistrationError: {
      type: 'danger',
      msg: 'Poi! We were not able to register you at this time. Please try again later.'
    },
    RegistrationSuccess : {
      type: 'success',
      msg: 'Poi Poi! You can now login with your created account.'
    }
  };

  $scope.alert = alerts.IncorrectLogin;

  $scope.alertVisible = false;


  $scope.formSelector = 'login';
  $scope.switchForms = function(){
    var wasLogin = ($scope.formSelector === 'login');
    $scope.formSelector = wasLogin ? 'register' : 'login';
    $scope.alert = wasLogin? alerts.RegistrationError : alerts.IncorrectLogin;
    console.log($scope.formSelector);
  };

  $scope.login = function(credentials){
    AuthService.login(credentials).then(function (user){
      $rootScope.$broadcast (AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);

      $scope.alert = alerts.SuccessfulLogin;
      showAlert();
      $timeout(function(){
        //TODO: Currently, this redirect targets another location. It needs to target the Single App version of Index.html instead.
        $location.path('/overview');
      },3000);
    }, function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      showAlert();
    });
  };

  $scope.register = function(credentials){
    AuthService.register(credentials).then(function(success){
      $scope.switchForms();
      $scope.alert = alerts.RegistrationSuccess;
      showAlert();
    }, function(){
      showAlert();
    });
  };

  var showAlert = function(){
    $scope.alertVisible = true;
    $timeout(function(){
      $scope.alertVisible = false;
    },3000);
  };

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };


}]);
