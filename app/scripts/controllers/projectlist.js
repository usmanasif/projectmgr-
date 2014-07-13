'use strict';

angular.module('projectmgrApp')
  .controller('ProjectlistCtrl', ['$scope', '$location', 'Api', 'Sharedata',
    function ($scope, $location, Api, Sharedata){
      Sharedata.clear();
      var projects = [];
      Api.get(settings.url + 'projects.json')
      .then(function(data){
          if(data.error)
          {
            console.dir(data.error);
          }
          else
          {
            projects = data;
            var spinnerData =_.map(data, function(project){
              return {key: project.id, value: project.name};
            });

            SpinningWheel.addSlot(spinnerData, 'left');
            SpinningWheel.setDoneAction(selectProjectData);
            SpinningWheel.open();
          }
        }
      );

      var selectProjectData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        var projectId = selectedData.keys[0];
        var selectedProject = _.find(projects, function (project){
          return project.id === projectId;
        });
        console.dir(selectedProject);
        Sharedata.set('project', selectedProject);
        $location.path('/checklist/' + projectId);
        $scope.$apply();
      };

      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });
  }]);
