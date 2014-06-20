'use strict';

angular.module('projectmgrApp')
  .controller('CategorylistCtrl', function ($scope) {
    $scope.categories  = [
      {id: 1, name: 'category 1'},
      {id: 2, name: 'category 2'},
      {id: 3, name: 'category 3'},
      {id: 4, name: 'category 4'}
    ];
  });
