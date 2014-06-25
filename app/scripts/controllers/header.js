'use strict';

angular.module('projectmgrApp')
  .controller('HeaderCtrl', ['$scope', '$location',
    function ($scope, $location) {
      var isBackAllowed = true;
      var isHomeAllowed = true;
      $scope.isBackAllowed = function (){
        return isBackAllowed;
      };

      $scope.isHomeAllowed = function (){
        return isHomeAllowed;
      };

      $scope.gotoHome = function (){
        $location.path('/projectMgr');
      }

      $scope.gotoBack = function (){
        window.history.back();
      };

      var updateHeaderStatus = function () {
        var location = ($location.path().match(/\/\w+/)|| [])[0];

        switch (location) {
          case '/':
          case '/login':
            isBackAllowed = false;
            isHomeAllowed = false;
            break;
          default:
            isBackAllowed = true;
            isHomeAllowed = true;
            break;
        }
      };

      $scope.$on('$locationChangeSuccess', updateHeaderStatus);

  }]);
