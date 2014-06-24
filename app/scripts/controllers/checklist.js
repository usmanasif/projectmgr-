'use strict';

angular.module('projectmgrApp')
  .controller('ChecklistCtrl', ['$scope', '$location', 'Api',
    function ($scope, $location, Api) {
    var numbers = [
      { key: '1', value:'Check list 1'},
      { key: '2', value:'Check list 2'},
      { key: '3', value:'Check list 3'},
      { key: '4', value:'Check list 4'},
      { key: '5', value:'Check list 5'},
      { key: '6', value:'Check list 6'},
      { key: '7', value:'Check list 7'},
      { key: '8', value:'Check list 8'}
    ];
    SpinningWheel.addSlot(numbers, 'center', 5);
    SpinningWheel.open();
    $("#sw-wrapper").on("click", function(){
      var selectedData = SpinningWheel.getSelectedValues();
      var checkListId = selectedData.keys[0];
      $location.path('/categoryList/' + checkListId);
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
