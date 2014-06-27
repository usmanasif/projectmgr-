'use strict';

angular.module('projectmgrApp')
  .controller('CategorylistCtrl', ['$scope', '$location', 'Api', 'Sharedata',
    function ($scope, $location, Api, Sharedata){
      $scope.project = Sharedata.get('project');
      Api.get(settings.url + 'categories.json')
      .then(function(data){
          if(data.error)
          {
            console.dir(data.error);
          }
          else
          {
            var spinnerData =_.map(data, function(category){
              return {key: category.id, value: category.name};
            });

            SpinningWheel.addSlot(spinnerData, 'center');
            SpinningWheel.open();
            $("#sw-wrapper").on("click", selectCategoryData);
          }
        }
      );

      var selectCategoryData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        var categoryId = selectedData.keys[0];
        $location.path('/questionList/' + categoryId);
        $scope.$apply();
      };
      
      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });
  }]);
