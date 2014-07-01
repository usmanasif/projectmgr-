'use strict';

angular.module('projectmgrApp')
  .controller('QuestionlistCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
      if(!Sharedata.get('project')) {
        $location.path('/projectMgr');
        return;
      }

      $scope.project = Sharedata.get('project');
      var checklist = Sharedata.get('checklist');
      Api.get(settings.url + 'categories/' + $routeParams.id + '/questions.json')
      .then(function (data){
          if(data.error)
          {
            console.dir(data.error);
          }
          else
          {
            console.log($routeParams.id);
            var spinnerData =_.map(data.questions, function(question){
              return {key: question.id, value: question.body};
            });

            SpinningWheel.addSlot(spinnerData, 'left');
            SpinningWheel.open();
            $('#sw-slots li').addClass("small");
            $('#sw-wrapper').on("click", selectQuestionData);
          }
        }
      );

      Api.get(settings.url +'reports/'+ checklist.id +'/answers.json').
        then(function (data){
          if(data.error)
            {console.dir(error);
          }
          else
          {
            answers = data.answers;
          }
        });

      var questionId;
      var answers = [];

      var selectQuestionData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        questionId = selectedData.keys[0];
        $scope.isQuestionSelected = true;
        $scope.$apply();
      };

      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });

      $scope.selectAnswer = function(status){
        var answersToUpdate = _.find(answers, function (answ){
          return answ.question_id ==questionId;
        });
        answersToUpdate.status = status;
        $scope.isQuestionSelected = false;
        Api.patch(settings.url + 'projects/' + $scope.project.id + '/answers/' + answersToUpdate.id,
          {answer: answersToUpdate })
        .then(function (data){
          if (data.error){
            console.dir(error);
          } else {
            console.dir(data);
          } 
        });
      };

      $scope.changeResolve = function (){
        if ($scope.resolvedStatus == 'Resolved'){
          $scope.resolvedStatus = 'Unresolved';
        }
        else
        {
          $scope.resolvedStatus = 'Resolved';
        }
      };

      $scope.getResolveCss = function (){
        return $scope.resolvedStatus == 'Resolved' ? 'btn btn-info btn-block' : 'btn btn-warning btn-block';
      }

      $scope.getResolveIcon = function(){
        return $scope.resolvedStatus == 'Resolved' ? 'fa fa-check' : 'fa fa-ban';
      }

      $scope.takePic = function (){
        try
        {
          var options = {
            sourceType: 1,
            quality: 60,
            destinationType: Camera.DestinationType.FILE_URI
          };
          navigator.camera.getPicture(uploadPhoto,null,options);
        }
        catch(error){
          alert(error.message);
        }
      };

      function uploadPhoto(fileUrl){
        answersToUpdate.url = fileUrl;
      }

      function resetView() {
        $scope.resolvedStatus = "Unresolved";
      };

      resetView();


  }]);
