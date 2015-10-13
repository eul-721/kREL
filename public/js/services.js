var REGISTERATION_SUCCESS = 1;

kREL.factory('AuthService', function($http, Session){
  var authService = {};

  authService.login = function(credentials){ //authservice constructor
    return $http
      .post('/login', credentials)
      .then(function (res){
        Session.create(res.data.user.id, res.data.user.role);
        return res.data.user;
      });
  };

  authService.isAuthenticated = function(){
    return Session.userID;
  }

  authService.isAuthorized = function(authorizedRoles){
    if (!angular.isArray(authorizedRoles)){
      authorizedRoles = [authorizedRoles]
    }
    return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !==-1);
  };

  authService.register = function(credentials){
    return $http
      .post('/register',credentials)
      .then(function(res){
        return REGISTERATION_SUCCESS;
      })
  }

  return authService;
})


kREL.factory('Session', function(){
  var session = {};

  session.create = function (sessionId, userId, userRole){
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  session.destroy = function(){
    this.id = null;
    this.userId = null;
    this.userRole = null;
  }
  return session;
})
