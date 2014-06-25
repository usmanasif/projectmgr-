'use strict';

angular.module('projectmgrApp')
  .controller('NewchecklistCtrl', ['$scope', '$location', 'Api',
    function ($scope, $location, Api) {
    $("#checklistForm").validate({
      rules: {
        nameTxt: {
          required: true,
          maxlength : 100
        },
        descriptionTxt: {
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
