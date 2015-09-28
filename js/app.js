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
