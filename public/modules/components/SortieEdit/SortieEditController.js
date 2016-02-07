kREL.controller("SortieEditController",['$scope','$loading','$routeParams','mapService',function($scope,$loading,$routeParams,mapService){
  'use strict';
  var selectedMap = $routeParams.mapId;
  mapService.selectMap(selectedMap);
  $scope.map = selectedMap;
  // $scope.fuel = 0;
  // $scope.ammo = 0;
  // $scope.steel = 0;
  // $scope.bauxite = 0;

  console.log($scope.map);
  $scope.submitSortie = function(){
    console.log($scope);
  };

}]);
