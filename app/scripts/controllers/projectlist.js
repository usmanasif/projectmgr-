'use strict';

angular.module('projectmgrApp')
  .controller('ProjectlistCtrl', ['$scope', '$location', 'Api',
    function ($scope, $location, Api) {
    Api.get(settings.url + 'projects.json')
    .then(function(data){
        if(data.error)
        {
          console.dir(data.error);
        }
        else
        {
          var projects =_.map(data, function(project){
            return {key: project.id, value: project.name};
          });

          SpinningWheel.addSlot(projects, 'center');
          SpinningWheel.open();
          $("#sw-wrapper").on("click", selectProjectData);
        }
      }
    );

    var selectProjectData = function(){
      var selectedData = SpinningWheel.getSelectedValues();
      var projectId = selectedData.keys[0];
      $location.path('/checklist/' + projectId);
      $scope.$apply();
    };

    $scope.$on('$destroy', function() {
      SpinningWheel.destroy();
    });
  }]);
