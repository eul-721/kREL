var REGISTERATION_SUCCESS = 1;

kREL.factory('AuthService', function($http,$cookies, Session){
  var authService = {};

  authService.login = function(credentials){ //authservice constructor
    return $http
      .post('/login', credentials)
      .then(function (res){
        Session.create(res.data.user._id, res.data.user.role);
        $cookies.put('user',res.data.user._id);
        return res.data.user;
      });
  };

  authService.isAuthenticated = function(){
    //$cookies.get('user')
    return $cookies.get('user');
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

  var randomGUID = function(){
      function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
  }

  session.create = function (userId, userRole){
    console.log(randomGUID());
    this.id = randomGUID();
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

kREL.factory('mapService',function($http,$cookies){
  var currentSelectedMap = "";

  var _selectMap = function(map){
    currentSelectedMap = map
  };

  var _getSelectedMap = function(){
    return currentSelectedMap;
  };

  var _getMapSortiesForUser = function(){
    if(!$cookies.get('user'))
      return 'ERROR : USER NOT LOGGED IN';

    console.log(currentSelectedMap);
    return $http.get('/api/sortie?map=' + currentSelectedMap);
  }

  //var getSelectedMapOverviewForUser(user)

  return {
    selectMap: _selectMap,
    getSelectedMap : _getSelectedMap,
    getMapSortiesForUser : _getMapSortiesForUser
  };
});
