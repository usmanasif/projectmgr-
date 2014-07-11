'use strict';

angular.module('projectmgrApp')
  .controller('FooterCtrl', ['$scope', '$location', 'Sharedata',
    function ($scope, $location, Sharedata) {
      var hasFooter = false;
      $scope.hasFooter = function () {
        return hasFooter;
      };

      $scope.hasSelectedProject = function() {
        return Sharedata.get('project') != null;
      };

      $scope.createProject = function(){
        Sharedata.clear();
        $location.path('/newProject');
      };

      $scope.openProject = function(){
        Sharedata.clear();
        $location.path('/projectlist');
      };

      $scope.reportIncident = function(){
        // fix this the id must be taken from common data service
        $location.path('/incidentReport/' + Sharedata.get('project').id);
      };

      $scope.openCheckList = function(){
        // fix this the id must be taken from common data service
        $location.path('/checklist/' + Sharedata.get('project').id);
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
