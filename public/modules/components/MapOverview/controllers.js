kREL.controller("MapOverviewController",['$scope','$loading','$location','mapService',function($scope,$loading,$location,mapService){
  "use strict";
  $scope.loadOptions = {
    text: 'Loading map details...'
  };

  $scope.map = mapService.getSelectedMap();
  $scope.sortieGroups = [];
  $scope.newSortie = function(){
    $location.path('/newsortie/' + $scope.map);
  };
  $scope.$watch(function(){
    return mapService.getSelectedMap();
  },function(newval, oldval){

      $scope.map = newval;
      $loading.start('loading-map-details');
      mapService.getMapSortieGroupsForUser().then(function(res){
        $loading.finish('loading-map-details');
        $scope.sortieGroups = res.data;
      });
  });
}]);
