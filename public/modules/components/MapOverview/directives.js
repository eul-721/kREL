(function () {
  "use strict";
  kREL.directive('sortieAccordionGroup', function(){
    return {
        restrict: 'AE',
        //replace: 'true',
        //template: '<span>{{sortie._id}}</span>',
        templateUrl: '/views/map-record-overview.html',
        link: function(scope, elem, attrs){
          console.log(scope);
          console.log(elem);
          console.log(attrs);
        }
    };
  });

  kREL.directive('mapRecord',['mapService',function(mapService){
      return {
        restrict: 'AE',
        scope: {
          sortieGroup: '='
        },
        templateUrl: '/views/map-record-overview-template.html',
        link: function(scope, elem, attrs){
          mapService.getMapSortiesByYearMonthForUser(scope.sortieGroup.year,scope.sortieGroup.month).then(function(res){
            scope.sorties = res.data;
            scope.sorties.forEach(function(ele,i,arr){
              var date = new Date(ele.date);
              var year = date.getUTCFullYear();
              var month = date.getUTCMonth()+1;
              var day = date.getUTCDate();
              var hours = date.getUTCHours();
              var minutes = date.getUTCMinutes();
              arr[i].date = month + "/" + day + " " + hours + ":" + minutes;
            });
          });
        }
      };
    }]);

}());
