'use strict';

angular.module('projectmgrApp')
  .controller('ProjectlistCtrl', ['$scope', '$location', 'Api',
    function ($scope, $location, Api) {
    var numbers = [
      { key: '1', value:'Project Name 1'},
      { key: '2', value:'Project Name 2'},
      { key: '3', value:'Project Name 3'},
      { key: '4', value:'Project Name 4'},
      { key: '5', value:'Project Name 5'},
      { key: '6', value:'Project Name 6'},
      { key: '7', value:'Project Name 7'},
      { key: '8', value:'Project Name 8'}
    ];
    SpinningWheel.addSlot(numbers, 'center', 5);
    SpinningWheel.open();
    $("#sw-wrapper").on("click", function(){
      var selectedData = SpinningWheel.getSelectedValues();
      var projectId = selectedData.keys[0];
      $location.path('/checklistmgr/' + projectId);
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
