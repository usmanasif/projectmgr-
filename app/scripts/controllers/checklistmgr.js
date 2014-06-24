'use strict';

angular.module('projectmgrApp')
  .controller('ChecklistmgrCtrl', ['$scope', '$location',
    function ($scope, $location) {
      $scope.gotoNewCheckList = function() {
        $location.path('/newchecklist');
      };

      $scope.gotoCheckListList = function(){
        $location.path('/checklist');
      };
  }]);
