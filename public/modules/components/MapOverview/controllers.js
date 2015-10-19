kREL.controller("MapOverviewController",['$scope','mapService',function($scope,mapService){
  $scope.map = mapService.getSelectedMap();
  $scope.sorties = [];
  $scope.$watch(function(){return mapService.getSelectedMap()},function(newval, oldval){
    $scope.map = newval;
    mapService.getMapSortiesForUser().then(function(res){
      
      $scope.sorties = res.data;
    })
  })
}])
