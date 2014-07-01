'use strict';

angular.module('projectmgrApp')
  .controller('ProjectmgrCtrl', ['$scope', '$location', 'Sharedata',
    function ($scope, $location, Sharedata) {
      Sharedata.clear();
      $scope.gotoNewProject = function (){
        $location.path('/newProject');
      };
      $scope.gotoProjectList = function (){
        $location.path('/projectlist');
      };
  }]);
