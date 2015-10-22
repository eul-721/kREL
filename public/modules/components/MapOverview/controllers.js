kREL.controller("MapOverviewController",['$scope','$loading','mapService',function($scope,$loading,mapService){
  $scope.loadOptions = {
    text: 'Loading map details...'
  };

  $scope.map = mapService.getSelectedMap();
  $scope.sorties = [];
  $scope.$watch(function(){return mapService.getSelectedMap();},function(newval, oldval){
    $scope.map = newval;
    $loading.start('loading-map-details');
    mapService.getMapSortiesForUser().then(function(res){
      $loading.finish('loading-map-details');
      $scope.sorties = res.data;
    });
  });
}]);
