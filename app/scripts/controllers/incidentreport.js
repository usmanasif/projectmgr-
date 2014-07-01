'use strict';

angular.module('projectmgrApp')
  .controller('IncidentreportCtrl', ['$scope', '$location', '$routeParams','Api',
    function ($scope, $location, $routeParams, Api){
      $scope.report = {project_id : $routeParams["id"]};

      $("#reportForm").validate({
        rules: {
          typeTxt : {
            required: true
          },
          yourNameTxt : {
            required: true,
            maxlength: 100
          },
          jobTitleTxt : {
            required: true
          },
          injuryDateTxt : {
            required: true,
            maxlength: 100
          },
          injuryTimeTxt : {
            required: true,
            maxlength: 100
          },
          witnessesTxt : {
            required: true,
            maxlength: 500
          },
          locationTxt : {
            required: true,
            maxlength: 100
          },
          circumstancesTxt : {
            required: true,
            maxlength: 1000
          },
          descriptionTxt : {
            required: true,
            maxlength: 1000
          },
          injuriesTypeTxt : {
            required: true,
            maxlength: 1000
          },
          ppeTxt : {
            required: true,
            maxlength: 100
          },
          assistanceProvidedTxt: {
            required: true,
            maxlength: 1000
          }
        },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          $("form [type=submit]").button('loading');
          Api.post(settings.url + 'projects/' + $scope.report.project_id +'/incidents',
            {incident : $scope.report})
          .then(function (data){
            if (data.error){
              alert(data.error);
            } else {
              alert('Saved!');
              $location.path('/projectMgr');
            }
          })
          .finally(function(){
            $("form [type=submit]").button('reset');
          });
        }
      });

      $scope.takePic = function (){
        var options = {
          sourceType: 1,
          quality: 60,
          destinationType: Camera.DestinationType.FILE_URI
        };
        navigator.camera.getPicture(uploadPhoto,null,options);
      };

      function uploadPhoto(fileUrl){
          $scope.report.file = fileUrl;
      }
  }]);