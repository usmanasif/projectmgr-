'use strict';

angular.module('projectmgrApp')
  .controller('ProjectmgrCtrl', ['$scope', '$location',
    function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
