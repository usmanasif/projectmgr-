'use strict';

angular.module('projectmgrApp')
  .controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {
    var isBackAllowed = false;
    var isSendAllowed = false;
    $scope.isBackAllowed = function (){
      return isBackAllowed;
    };

    $scope.isSendAllowed = function (){
      return isSendAllowed;
    };

    $scope.gotoBack = function (){
      window.history.back();
    };

    var updateHeaderStatus = function () {
      var location = ($location.path().match(/\/\w+/)|| [])[0];
      console.log(location);

      switch (location) {
        case '/':
        case '/login':
          isBackAllowed = false;
          isSendAllowed = false;
          break;
        case '/newUser':
          isBackAllowed = true;
          isSendAllowed = false;
          break;
        case '/projectMgr':
        case '/categoryList':
        case '/questionList':
        case '/newProject':
        case '/incidentReport':
          isBackAllowed = true;
          isSendAllowed = true;
          break;
      }
    };

    $scope.$on('$locationChangeSuccess', updateHeaderStatus);

  }]);
