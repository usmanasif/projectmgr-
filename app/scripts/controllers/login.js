'use strict';

angular.module('projectmgrApp')
  .controller('LoginCtrl', ['$scope','$location', 'Api', function ($scope, $location, Api) {
    $scope.gotoNewUser = function (){
      $location.path("/newUser");

    };
    $("#loginForm").validate({
      rules: {
        usernameTxt: {
          required: true,
          email: true,
          minlength: 6,
          maxlength : 100
          },
          passwordTxt: {
            required: true,
            maxlength : 100
          }
        },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          var promise = Api.post(settings.url + 'users/sign_in.json', $scope.user);
          promise.sucess(function (data){
            console.dir(data)
          });

          promise.error(function (err){
            console.dir(err);
          });
        }
    });
  }]);
