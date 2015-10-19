kREL.controller('SidebarController',['$scope', 'mapService', function($scope,mapService){

    $scope.mapsIndexes = {
      "1":[1,2,3,4,5,6],
      "2":[1,2,3,4,5],
      "3":[1,2,3,4,5],
      "4":[1,2,3,4,5],
      "5":[1,2,3,4,5],
      "6":[1,2,3]
    }
    $scope.selectMap = function(mapIndex,area){
      mapService.selectMap(mapIndex.toString() + '-' + area.toString())
    }
  }]);
