'use strict';

angular.module('projectmgrApp')
  .controller('NewprojectCtrl', ['$scope', '$location', 'Api', function ($scope, $location, Api) {
    $scope.gotoProjectMgr = function () {
      $location.path("/projectMgr");
    };

    $("#projectForm").validate({
      rules: {
        nameTxt: {
          required: true,
          maxlength : 100
        },
        addressTxt: {
          required: true,
          maxlength : 200
        },
        contactTxt: {
          required: true,
          maxlength : 200
        }
      },
      highlight: validateUtils.highlight,
      unhighlight: validateUtils.unhighlight,            
      errorPlacement: validateUtils.errorPlacement,
      submitHandler: function() {
          alert("success");
        }
      }
    );
  }]);
