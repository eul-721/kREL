kREL.controller("MapOverviewController",['$scope','$loading','mapService',function($scope,$loading,mapService){
  $scope.loadOptions = {
    text: 'Loading map details...'
  };

  $scope.map = mapService.getSelectedMap();
  $scope.sortieGroups = [];
  $scope.$watch(function(){return mapService.getSelectedMap();},function(newval, oldval){
    $scope.map = newval;
    $loading.start('loading-map-details');
    mapService.getMapSortieGroupsForUser().then(function(res){
      $loading.finish('loading-map-details');
      $scope.sortieGroups = res.data;
    });
  });
}]);
