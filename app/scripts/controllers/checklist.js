'use strict';

angular.module('projectmgrApp')
  .controller('ChecklistCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
      if(!Sharedata.get('project')) {
        $location.path('/projectMgr');
        return;
      }

      var projectId = $routeParams.id;
      $scope.project = Sharedata.get('project');
      var checklistList = [];

      Api.get(settings.url + 'projects/'+ projectId +'/reports.json')
      .then(function (data){
        if(data.error)
        {
          console.dir(data.error);
        }
        else
        {
          console.dir(data);
          checklistList = data.obj['@reports'];
          
          var checklistMap = _.map(checklistList, function (checklist){
           var arr = checklist.name.split(" ");
            return {key : checklist.id, value : arr[arr.length - 1] };
          });

          SpinningWheel.addSlot(checklistMap, 'left', 5);
          SpinningWheel.setDoneAction(onSelectedCheckList);
          SpinningWheel.open();
        }
      });

      var onSelectedCheckList = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        var checkListId = selectedData.keys[0];
        var selectedChecklist = _.find(checklistList, function (checklist){
          return checklist.id === checkListId;
        });
        Sharedata.set('checklist', selectedChecklist);
        $location.path('/categoryList/' + checkListId);
        $scope.$apply();
      };

      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });
  }]);
