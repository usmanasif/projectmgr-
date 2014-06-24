'use strict';

angular.module('projectmgrApp')
  .controller('ProjectmgrCtrl', ['$scope', '$location',
    function ($scope, $location) {
      $scope.gotoNewProject = function (){
        $location.path('/newProject');
      };
      $scope.gotoProjectList = function (){
        $location.path('/projectlist');
      };
  }]);
