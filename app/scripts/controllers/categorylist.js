'use strict';

angular.module('projectmgrApp')
  .controller('CategorylistCtrl', ['$scope', '$location', 'Api',
    function ($scope, $location, Api) {
    var numbers = [
      { key: '1', value:'Category 1'},
      { key: '2', value:'Category 2'},
      { key: '3', value:'Category 3'},
      { key: '4', value:'Category 4'},
      { key: '5', value:'Category 5'},
      { key: '6', value:'Category 6'},
      { key: '7', value:'Category 7'},
      { key: '8', value:'Category 8'}
    ];
    SpinningWheel.addSlot(numbers, 'center', 5);
    SpinningWheel.open();
    $("#sw-wrapper").on("click", function(){
      var selectedData = SpinningWheel.getSelectedValues();
      var categoryId = selectedData.keys[0];
      $location.path('/questionList/' + categoryId);
      $scope.$apply();
    });
    

    Api.get(settings.url + 'projects.json')
    .then(function(data){

      }, function(error){

    });

    $scope.$on('$destroy', function() {
      SpinningWheel.destroy();
    });
  }]);
