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
