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
          var user = {user: $scope.user};
          console.dir(user);
          var promise = Api.post(settings.url + 'users/sign_in.json', {data : user});
          $("form [type=submit]").button('loading');
          promise.then(
            function (data){
              if(data && data.user)
              {
                window.sessionStorage.token = data.authenticity_token;
                window.sessionStorage.user = data.user.email;
                //TODO: save the user at session storage
                $location.path('/projectMgr');
              }
              else
              {
                $scope.invalidCredentials = true;
              }
            }
          );

          promise.finally(function (){
            $("form [type=submit]").button('reset');
          });
        }
    });
  }]);
