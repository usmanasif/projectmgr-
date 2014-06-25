'use strict';

angular.module('projectmgrApp')
  .controller('FooterCtrl', ['$scope', '$location',
    function ($scope, $location) {
      var hasFooter = false;
      $scope.hasFooter = function () {
        return hasFooter;
      };

      $scope.hasSelectedProject = function() {
        return 'disabled';
      };

      $scope.createProject = function(){
        $location.path('/newProject');
      };

      $scope.openProject = function(){
        $location.path('/projectlist');
      };

      $scope.reportIncident = function(){
        // fix this the id must be taken from common data service
        $location.path('/incidentReport/1');
      };

      $scope.openCheckList = function(){
        // fix this the id must be taken from common data service
        $location.path('checklistmgr/1');
      };

      var updateFooterStatus = function () {
        var location = ($location.path().match(/\/\w+/)|| [])[0];
        switch (location) {
          case '/':
          case '/login':
            hasFooter = false;
            break;
          default:
            hasFooter = true;
            break;
        }
      };

      $scope.$on('$locationChangeSuccess', updateFooterStatus);
  }]);
