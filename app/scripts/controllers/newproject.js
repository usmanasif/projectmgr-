'use strict';

angular.module('projectmgrApp')
  .controller('NewprojectCtrl', ['$scope', '$location', 'Api', 'Sharedata', 
    function ($scope, $location, Api, Sharedata) {
      Sharedata.clear();
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
          var promise = Api.post(settings.url + 'projects.json', $scope.project);
          promise.then(
            function (data){
              if(data.error)
              {
                $scope.showError = true;
              }else{
                $location.path('/projectMgr');
              }
            }
          );
        }
      }
    );
  }]);
