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
       //$.ajax("http://localhost:3000/projects/1/answers/1",{data:{authenticity_token:"f443c742584f5b591d349b9e78f62c77", status: "1"}, method:"patch"}).done(function(data){console.log(data);}); 
        //console.log(settings.url);
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
        if(status == "yes")
         status = 1;
        else if(status == "no")
         status = 2;
        else if(status == "na")
          status = 3;
        answersToUpdate.status = status;
        $scope.isQuestionSelected = false;
        console.log(answersToUpdate);
        //{data:{authenticity_token:"f443c742584f5b591d349b9e78f62c77", status: "1"}
        Api.patch(settings.url + 'projects/' + $scope.project.id + '/answers/' + answersToUpdate.id,
          {status: answersToUpdate.status })
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
